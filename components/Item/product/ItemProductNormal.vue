<template>
    <div>
        <div class="relative product-item" v-if="dataProduct">
            <div class="logo transition-all duration-300">
                <NuxtLink :to="'/truyen/' + dataProduct.slug">
                    <NuxtImg quality="80" format="webp" :src="dataProduct.url_avatar"
                        class="transition ease-in-out delay-150 bg-blue-500 	 w-100 duration-300" loading="lazy"
                        alt="webtoonx" width="200" height="150" />
                    <div
                        class="absolute w-full h-full bg-black/5material-symbols-light:eye-tracking0 flex items-center justify-center play-icon   transition-all duration-150 delay-100	">
                        <Icon name="material-symbols-light:eye-tracking"
                            class="text-white transition-all duration-300" />
                    </div>
                    <div class="absolute left-0 top-0" v-if="dataProduct.highlight == 1">
                        <div class="bg-red-600 uppercase px-2 py-1 z-20	  font-bold text-white">
                            Nổi bật
                        </div>
                    </div>
                </NuxtLink>
            </div>
            <div class="text-white text-sm mt-3 mb-1 capitalize ">
                <h3 class="font-bold line-clamp-2 hover:text-sky-500">
                    {{ dataProduct.name }}
                </h3>
                <div class="text-center mt-3">
                    <ul>
                        <li class="mb-3 hover:text-sky-500" v-for="(item, index) in dataProduct.newEpisode">
                            <NuxtLink :to="'/truyen/' + dataProduct.slug + '/' + item.slug">
                                {{ item.name }}
                            </NuxtLink>

                        </li>
                    </ul>
                </div>
            </div>



        </div>
    </div>
</template>
<script>
export default {
    props: {
        dataProduct: Object
    },

}
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