<template>
   <div class="w-full">
      <Swiper :grabCursor="true":effect="'coverflow'" :centeredSlides="true" :breakpoints="{
      '640': {
        slidesPerView: 1,
        spaceBetween: 20,
      },
     
      '1024': {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    }" :loop="true"
         :coverflowEffect="{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
         }"  :autoplay="{ 
            delay: 7000, disableOnInteraction: false
             }"
          :pagination="{
         clickable: true,
      }"
       :modules="[SwiperAutoplay,SwiperEffectCoverflow, SwiperPagination]" 
       class="mySwiper w-full pb-16" style="padding-bottom: 30px;">
         <SwiperSlide class="md:p-3  " v-for="item in data">

            <NuxtLink :to="'/manga/' + item.slug">

               <div
                  class=" w-full slide-item flex items-end relative md:bg-black/30 bg-black/10  text-white transition ease-in-out delay-150 md:hover:-translate-y-1 md:hover:scale-110 hover:bg-indigo-500 duration-300">

                  <div class="w-full h-full absolute top-0 left-0 -z-50 flex items-center justify-center overflow-hidden rounded-lg">

                     <NuxtImg v-if="item.url_avatar" quality="100" format="webp" :src="item.url_avatar"
                        size="sm:50vw md:150vw lg:400vw" alt="Manhwa18" loading="lazy" width="200" height="400"
                        class="w-full lg:h-full h-auto " />
                     <NuxtImg v-else quality="80" format="webp" src="meta_image.png" alt="Manhwa18"
                        size="sm:50vw md:150vw lg:400vw" loading="lazy" width="200" height="400"
                        class="w-full h-full " />
                  </div>

                  <div class="w-full p-3 text-white ">
                     <p class="text-base font-bold line-clamp-1">{{ item.name }}</p>
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
   height: 350px;
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