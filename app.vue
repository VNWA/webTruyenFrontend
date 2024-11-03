<template>
  <div class="h-screen">
    <NuxtLoadingIndicator />
    <NuxtPage />
  </div>


</template>
<script setup>

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Manhwa18` : 'Manhwa18';
  },
  meta: [
    { name: 'title', content: 'Read Manhwa Online For Free [Big Collection] at Manhwa18' },
    { name: 'og:title', content: 'Read Manhwa Online For Free [Big Collection] at Manhwa18' },
    { name: 'og:description', content: 'Read Manhwa Online For Free - We have the latest high-quality collection of Manhwa with all of the updated chapters on daily.' },
    { name: 'description', content: 'Read Manhwa Online For Free - We have the latest high-quality collection of Manhwa with all of the updated chapters on daily.' },
    { name: 'image', content: '/logo.jpeg' },
    { name: 'og:image', content: '/logo.jpeg' },
  ]

});
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>