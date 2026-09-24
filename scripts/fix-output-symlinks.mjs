// Nitro дедуплицирует одинаковые версии пакетов (например entities@7.0.1,
// нужный и напрямую, и через @vue/compiler-core, и через parse-entities)
// через симлинки на общее хранилище .output/server/node_modules/.nitro/*.
// Эти симлинки создаются с АБСОЛЮТНЫМ путём локальной машины сборки.
//
// При заливке .output на хостинг (zip/FTP/rsync без -l) симлинк либо не
// сохраняется вовсе, либо сохраняется, но указывает на путь вида
// "/d/WEB3/nuxtjs_uz/..." — на сервере такого пути не существует, поэтому
// require() падает с "Cannot find module 'entities/decode'" и т.п.
//
// Скрипт проходит по .output и заменяет каждый симлинк реальной копией
// файла/директории, на которую он указывает — после этого папку можно
// архивировать и переносить куда угодно без хвостов на build-машину.
import { readdirSync, lstatSync, realpathSync, rmSync, cpSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../.output', import.meta.url))

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    const stat = lstatSync(full)

    if (stat.isSymbolicLink()) {
      const target = realpathSync(full)
      rmSync(full, { recursive: true, force: true })
      cpSync(target, full, { recursive: true, dereference: true })
      console.log(`[fix-output-symlinks] ${full} -> копия ${target}`)
      continue
    }

    if (stat.isDirectory()) {
      walk(full)
    }
  }
}

walk(root)
console.log('[fix-output-symlinks] готово, симлинков в .output больше нет')
