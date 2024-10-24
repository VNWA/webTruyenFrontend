<template>
   <div class="w-full">
      <Swiper :grabCursor="true" slidesPerView="1" :breakpoints="{
         '640': {
            slidesPerView: 2,
            spaceBetween: 5,
         },
         '768': {
            slidesPerView: 2,
            spaceBetween: 5,
         },

      }" :autoplay="{ delay: 7000, disableOnInteraction: false, }" :pagination="{
         clickable: true,
      }" :modules="[SwiperAutoplay, SwiperPagination]" class="mySwiper w-full pb-16" style="padding-bottom: 30px;">
         <SwiperSlide class="md:p-3  " v-for="item in data">

            <NuxtLink :to="'/truyen/' + item.slug">

               <div class=" w-full slide-item flex items-end relative md:bg-black/30 bg-black/10  text-white transition ease-in-out delay-150 md:hover:-translate-y-1 md:hover:scale-110 hover:bg-indigo-500 duration-300">

                  <div class="w-full h-full absolute top-0 left-0 -z-50">

                     <NuxtImg v-if="item.url_bg" quality="100" format="webp" :src=" item.url_bg" size="sm:50vw md:150vw lg:400vw" alt="webtoonx" loading="lazy" width="400" height="200" class="w-full h-full " />
                     <NuxtImg v-else quality="80" format="webp" src="meta_image.png" alt="webtoonx" size="sm:50vw md:150vw lg:400vw" loading="lazy" width="400" height="200" class="w-full h-full " />
                  </div>

                  <div class="w-full p-3 text-white ">
                     <p class="text-base font-bold">{{ item.name }}</p>
                     <p class="text-sm">{{ item.yearName }}</p>
                  </div>
                  <div class="min-w-28 text-center">
                     <div class="bg-sky-600 text-black uppercase md:px-3 px-1 md:py-2 py-1 text-xs font-bold">
                        {{ item.newEpisode }}
                     </div>
                  </div>
               </div>
            </NuxtLink>
         </SwiperSlide>

      </Swiper>
   </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
export default {

   props: {
      data: Object
   },
  
}
</script>
<style scoped>
.slide-item {
   height: 200px;
   background-size: cover;
}

.slide-item h3 {
   max-height: 23px;
   overflow: hidden;
   display: -webkit-box;
   -webkit-line-clamp: 1;
   -webkit-box-orient: vertical;
}

@media only screen and (max-width: 500px) {
   .slide-item {
      height: 195px;
   }
}
</style>