<template>
     <div>
          <div class="w-full" id="topRatingProduct">
               <ul>

                    <template v-for="(item, index) in data">
                         <template v-if="index == 0">
                              <li class="relative mb-3 ">
                                   <NuxtLink :to="'/manga/' + item.slug" class="">

                                        <NuxtImg v-if="item.url_bg" quality="80" format="webp" :src="item.url_bg"
                                             class=" hover:brightness-50 w-full  h-auto" loading="lazy" alt="Manhwa18"
                                             width="200" height="150" />
                                        <NuxtImg v-else quality="80" format="webp" src="meta_image.png"
                                             class=" hover:brightness-50 w-full  h-auto" loading="lazy" alt="Manhwa18"
                                             width="200" height="150" />

                                        <div class="absolute bottom-0 left-0 p-2">
                                             <h4 class="text-sm  text-white">{{ item.name }}</h4>
                                             <h5 class="text-sm  text-white/50"> {{ item.yearName }}</h5>
                                        </div>
                                   </NuxtLink>
                              </li>
                         </template>
                         <template v-else>
                              <li class="relative mb-3">
                                   <NuxtLink :to="'/manga/' + item.slug">
                                        <div
                                             class="grid grid-cols-12  w-full h-24 bg-black/50 hover:bg-black overflow-hidden text-white/80 hover:text-sky-500 ">
                                             <div class="col-span-3 h-full flex items-start justify-center p-1">
                                                  <NuxtImg :src="item.url_avatar" class="w-full  h-auto" loading="lazy"
                                                       alt="Manhwa18" width="70" height="140" />

                                             </div>
                                             <div class="col-span-9 h-full p-1 py-3">
                                                  <h4 class="text-sm font-bold  text-white/90 mb-2">{{ item.name }}</h4>
                                                  <div class="flex items-center justify-start">
                                                       <div
                                                            class="flex items-center justify-start px-2 py-1 border border-solid border-white/50 rounded">
                                                            <Icon name="material-symbols:kid-star" class="text-sm" />
                                                            <span class="text-xs ms-1">{{ item.rating }}</span>
                                                       </div>
                                                       <h5 class="text-xs  text-white/50 ms-2"> {{ item.yearName }}</h5>
                                                  </div>
                                             </div>


                                        </div>
                                   </NuxtLink>
                              </li>
                         </template>
                    </template>




               </ul>

          </div>
     </div>
</template>

<script>
export default {
     props: {
          data: Object // Định nghĩa props 'data' nhận một object
     },
     computed: {
          sortedProducts() {
               // Sắp xếp sản phẩm theo trường "rating"
               if (this.data && this.data.products) {
                    return this.data.products.sort((a, b) => b.rating - a.rating);
               } else {
                    return [];
               }
          }
     },

};
</script>

<style scoped>
#topRatingProduct ul li h4 {
     max-height: 37px;
     overflow: hidden;
     display: -webkit-box;
     -webkit-line-clamp: 2;
     -webkit-box-orient: vertical;
     text-overflow: ellipsis;

}
</style>