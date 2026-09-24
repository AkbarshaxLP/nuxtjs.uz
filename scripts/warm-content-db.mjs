// @nuxt/content v3 не кладёт готовую БД в билд — contents.sqlite создаётся
// и наполняется ЛЕНИВО, прямо на сервере, при первом запросе к каждой
// коллекции (frontend_ru, frontend_uz, backend_ru, backend_uz). Это разовый
// импорт на 10-20+ секунд, который требует записи на диск.
//
// На нестабильном окружении (shared-хостинг/Passenger, где процесс может
// быть убит/перезапущен посреди этого импорта) он не успевает завершиться
// и коллекция навсегда остаётся в состоянии ready=0 — все запросы к ней
// после этого либо виснут (ждут ready, которое не наступит), либо падают
// в 404, если сама запись не смогла закоммититься из-за прав на запись.
//
// Скрипт запускает собранный сервер ЛОКАЛЬНО (где запись точно работает),
// обходит по одному разу каждую пару направление+локаль — этого достаточно,
// чтобы queryCollectionNavigation прогнал импорт всей коллекции и
// закоммитил ready=1 в contents.sqlite — и останавливает сервер. Уже
// наполненный contents.sqlite едет в .output вместе с остальным билдом:
// на хостинге серверу останется только читать её, без единой записи.
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const serverEntry = fileURLToPath(new URL('../.output/server/index.mjs', import.meta.url))
const port = process.env.WARM_PORT || 3399

// Должно совпадать с направлениями/локалями из content.config.ts и
// nuxt.config.ts (i18n.locales). en скрыт из роутинга — не прогреваем.
const directions = ['frontend', 'backend']
const localePrefixes = ['', '/uz']
const routes = localePrefixes.flatMap(prefix => directions.map(direction => `${prefix}/${direction}`))

function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const tryOnce = () => {
      fetch(url).then(() => resolve()).catch((err) => {
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Сервер не поднялся за ${timeoutMs}мс: ${err.message}`))
          return
        }
        setTimeout(tryOnce, 300)
      })
    }
    tryOnce()
  })
}

async function main() {
  const child = spawn(process.execPath, [serverEntry], {
    env: { ...process.env, PORT: String(port), HOST: '127.0.0.1' },
    stdio: ['ignore', 'pipe', 'pipe']
  })

  let stderr = ''
  child.stderr.on('data', (chunk) => { stderr += chunk.toString() })

  const shutdown = () => new Promise((resolve) => {
    child.once('exit', resolve)
    child.kill('SIGTERM')
    setTimeout(() => child.kill('SIGKILL'), 5000)
  })

  try {
    const base = `http://127.0.0.1:${port}`
    await waitForServer(base)

    for (const route of routes) {
      const url = `${base}${route}`
      const startedAt = Date.now()
      const res = await fetch(url)
      const elapsed = Date.now() - startedAt
      if (!res.ok) {
        throw new Error(`${route} -> HTTP ${res.status}`)
      }
      console.log(`[warm-content-db] ${route} прогрет за ${elapsed}мс`)
    }

    console.log('[warm-content-db] все коллекции наполнены, contents.sqlite готова к загрузке на хостинг')
  } catch (err) {
    console.error('[warm-content-db] ошибка прогрева:', err.message)
    if (stderr) console.error(stderr)
    process.exitCode = 1
  } finally {
    await shutdown()
  }
}

main()
