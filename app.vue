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
    { name: 'monetag', content: 'cac41a73e707d7bf37f01f545e2542ce' },
    { name: 'og:description', content: 'Manga Mới chất lượng cao miễn phí. Xem phim hd VietSub. Manga thuyết minh chất lượng HD. Kho phim chuẩn nhanh online hay hấp dẫn.' },
    { name: 'description', content: 'Manga Mới chất lượng cao miễn phí. Xem phim hd VietSub. Manga thuyết minh chất lượng HD. Kho phim chuẩn nhanh online hay hấp dẫn.' },
    { name: 'image', content: '/logo.jpeg' },
    { name: 'og:image', content: '/logo.jpeg' },
  ],
  // script: [
  //     // Thêm tệp JavaScript từ thư mục public
  //     { src: '/adsExoclick.js', body: true } // Sử dụng body: true để thêm script vào cuối thẻ body
  //   ]

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