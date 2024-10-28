<template>
    <div>
        <div class="relative product-item" v-if="dataProduct">
            <div class="logo transition-all duration-300 rounded-lg overflow-hidden">
                <NuxtLink :to="'/manga/' + dataProduct.slug">
                    <div class="flex items-center justify-center  ">
                        <NuxtImg quality="80" format="webp" :src="dataProduct.url_avatar"
                            class="transition ease-in-out delay-150 bg-blue-500 	 w-100 duration-300" loading="lazy"
                            alt="webtoonx" width="200" height="150" />
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

                    <h3 class="font-bold line-clamp-2 hover:text-sky-500">
                        {{ dataProduct.name }}
                    </h3>
                </NuxtLink>

                <div class="flex items-center justify-between gap-4 mt-3">
                    <div >

                    <span v-if="reversedChapters.length >0" class="px-1 line-clamp-1 rounded block bg-sky-500/50">
                        {{ reversedChapters[0].name }}
                    </span>
                    <span v-else class="px-1 rounded block bg-sky-500/50">
                        Updating ..
                                        </span>
                </div>
                    <span class="text-white/80 ">
                        <Icon name="fa6-regular:eye" class="text-xl" /> {{ formatViews(view) }}
                    </span>
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
if (props.dataProduct.views <= 100) {
    view.value = 100 + Math.floor(Math.random() * 100);
} else {
    view.value = props.dataProduct.views
}
const formatViews = (views) => {
  if (views >= 1000) {
    // Lấy số nguyên và hai chữ số thập phân
    return (views / 1000).toFixed(0) + 'k'; // Chỉ giữ số nguyên
  }
  return views; // Trả về số nguyên nếu dưới 1000
};
const reversedChapters = computed(() => {
    return [...props.dataProduct.newEpisode].reverse(); // Đảo ngược mảng chapters
});
</script>
<style lang="css">
.product-item {
    width: 100%;
    cursor: pointer;
}

.product-item:active {
    color: skyblue;
}



@media only screen and (min-width: 960px) {

    .product-item .logo {
        width: 100%;
        height: 200px;
        display: flex;
        align-items: top;
        justify-content: center;
        position: relative;
        overflow: hidden;
        font-size: 10px;
    }
}

@media only screen and (max-width: 960px) {

    .product-item .logo {
        width: 100%;
        height: 250px;
        display: flex;
        align-items: top;
        justify-content: center;
        position: relative;
        overflow: hidden;
        font-size: 10px;
    }
}

@media only screen and (min-width: 501px) {


    .product-item .logo:hover img {
        transform: translateY(0.25rem);
        transform: scale(1.25);
    }

    .product-item .logo .play-icon {
        opacity: 0;
    }

    .product-item .logo:hover .play-icon {
        opacity: 1;
    }

    .product-item .logo .play-icon svg {
        font-size: 70px;

    }

    .product-item .logo:hover .play-icon svg {
        font-size: 50px;

    }
}

@media only screen and (max-width: 500px) {
    .product-item .logo .play-icon {
        display: none;
    }

    .product-item .logo {
        width: 100%;
        height: 210px;
        display: flex;
        align-items: top;
        justify-content: center;
        position: relative;
        overflow: hidden;
        font-size: 10px;
    }
}
</style>