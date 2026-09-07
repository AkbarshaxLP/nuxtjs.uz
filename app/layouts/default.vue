<template>
  <div class="flex min-h-screen flex-col bg-default">
    <AppHeader />
    <InterviewQuestionSearch />
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
