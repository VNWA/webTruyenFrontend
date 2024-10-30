<template>
    <div>
        <div class="relative product-item" v-if="dataProduct">
            <div class="logo transition-all duration-300 rounded-lg overflow-hidden">
                <NuxtLink :to="'/manga/' + dataProduct.slug" class="w-full">
                    <div class="flex items-center justify-center  w-full h-full ">
                        <NuxtImg quality="80" format="webp" :src="dataProduct.url_avatar"
                            class="transition ease-in-out delay-150 bg-blue-500 	 w-full h-auto  duration-300"
                            loading="lazy" alt="webtoonx" width="150" height="250" />
                        <div
                            class="absolute w-full h-full bg-black/5material-symbols-light:eye-tracking0 flex items-center justify-center play-icon   transition-all duration-150 delay-100	">
                            <Icon name="material-symbols-light:eye-tracking"
                                class="text-white transition-all duration-300" />
                        </div>
                        <div class="absolute left-0 top-0" v-if="dataProduct.highlight == 1">
                            <div class="bg-red-600 uppercase px-1 py-1 z-20	rounded-lg  font-bold text-white">
                                Hot
                            </div>
                        </div>
                    </div>

                </NuxtLink>
            </div>
            <div class="text-white text-sm mt-3 mb-1 capitalize ">
                <NuxtLink :to="'/manga/' + dataProduct.slug">

                    <h3 class="font-bold line-clamp-1  hover:text-sky-500 text-base">
                        {{ dataProduct.name }}
                    </h3>
                </NuxtLink>

                <div v-if="view || reversedChapters.length > 0" class="flex items-start justify-between gap-4 mt-3">
                    <div>
                        <div v-if="reversedChapters.length > 0">
                            <div v-for="(item, index) in reversedChapters" :key="index" class="mb-3">
                                <NuxtLink :to="'/manga/' + dataProduct.slug + '/' + item.slug">
                                    <span class="px-1 line-clamp-1 rounded  bg-transparent  border border-solid border-gray-500 hover:bg-sky-500/70">
                                        {{ item.name }}
                                    </span>

                                </NuxtLink>
                            </div>

                        </div>
                        <div v-else>
                            <span class="px-1 rounded block bg-sky-500/50">
                                Updating ..
                            </span>
                        </div>
                    </div>
                  
                    <div>
                        <div class="text-white/80 mb-3 flex items-center justify-end gap-2">
                        <Icon name="fa6-regular:eye" class="text-xl" /> <span class="w-6">{{ formatViews(view) }} </span>
                    </div>
                    <div class="text-white/80  flex items-center justify-end gap-2">
                        <Icon name="material-symbols:bookmark-add" class="text-xl" />   <span class="w-6">{{  formatViews(dataProduct.countWishlist) }} </span>
                    </div>
                    </div>
                </div>
            </div>



        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    dataProduct: Object

})
const view = ref(0);
view.value = props.dataProduct.views

const formatViews = (views) => {
    if (views >= 1000) {
        // Lấy số nguyên và hai chữ số thập phân
        return (views / 1000).toFixed(0) + 'k'; // Chỉ giữ số nguyên
    }
    return views; // Trả về số nguyên nếu dưới 1000
};
const reversedChapters = computed(() => {
    if(props.dataProduct.newEpisode){

        return [...props.dataProduct.newEpisode].reverse(); // Đảo ngược mảng chapters
    }else{
        return []
    }
});
</script>
<style lang="css">

</style>