<template>
  <div>
    <Title> {{ title }}</Title>
    <Meta name="title" :content="meta_title" />
    <Meta name="og:title" :content="meta_title" />
    <Meta name="image" :content="meta_image" />
    <Meta name="og:image" :content="meta_image" />
    <Meta name="description" :content="meta_desc" />
    <Meta name="og:description" :content="meta_desc" />
    <NuxtLayout>

      <div>
        <ul class="flex flex-wrap items-center justify-start mb-5 font-medium  ">
          <li class="mr-3">
            <NuxtLink to="/" class="text-base text-sky-700">Home</NuxtLink>
          </li>
          <li class="mr-3">
            <Icon name="material-symbols:keyboard-double-arrow-right" class="text-white/60 text-xl" />
          </li>
          <li class="mr-3">
            <NuxtLink :to="'/manga/'" class="text-base text-sky-700">Manga</NuxtLink>
          </li>
          <li class="mr-3">
            <Icon name="material-symbols:keyboard-double-arrow-right" class="text-white/60 text-xl" />
          </li>
          <li class="mr-3">
            <NuxtLink :to="'manga/' + product.slug" class="text-base text-white/50 font-bold">{{ product.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="grid grid-cols-12 gap-4">
        <div class="lg:col-span-9 col-span-12">
          <div class="grid grid-cols-12" v-if="product">
            <div class="lg:col-span-2 col-span-12 lg:mb-0 mb-5 ">
              <div class="flex justify-center">

                <NuxtImg :src="product.url_avatar" class="lg:w-full w-40 h-auto" loading="lazy" alt="webtoonx"
                  width="200" />
              </div>
            </div>
            <div class="lg:col-span-10 col-span-12 sm:py-2  lg:pl-5">
              <h1 class="sm:text-3xl  font-bold text-2xl  text-white mb-5">{{ product.name }}</h1>
              <h3 class="sm:text-base font-bold  text-xs text-white/50 mb-5">{{ product.full_name }}</h3>

              <div class="mb-5 flex items-center justify-start gap-5">

                <div class="" v-if="product">
                  <button class="text-gray-500  flex items-center justify-start gap-1" @click="handleToggleWishlist">
                    <Icon :class="{ 'text-cyan-500': isBookmark }" class="text-4xl"
                      name="material-symbols:bookmark-add" />
                    <span class="text-lg text-white font-bold">{{ count_wishlist }}</span>
                  </button>
                </div>
                <div class="" v-if="product">
                  <div class="text-gray-500  flex items-center justify-start gap-1">
                    <Icon class="text-4xl" name="material-symbols-light:visibility-rounded" />
                    <span class="text-lg text-white font-bold">{{ product.views }}</span>
                  </div>
                </div>
              </div>
              <div class="mb-3 flex items-start justify-start text-white gap-4">
                <h3>Types:</h3>
                <div v-if="product.types.length >0" >
                  <ul class="flex flex-wrap items-start justify-start gap-2">
                    <li v-for="(item,index) in product.types" :key="index" class="mb-2">
                      <NuxtLink :to="'/manga?type='+item.id">
                           <span class="border px-2 py-1 rounded-lg hover:bg-blue-500">
                            {{ item.name }}
                           </span>
                      </NuxtLink>
                    </li>
                   
                  </ul>
                </div>
                <div v-else class=""> Updating</div>
              </div>
              <div class="w-full py-3">
                <h3 class=" text-xl mb-3 text-white/80 font-bold">
                  Summary </h3>
                <div class="ps-3">
                  <div v-if="product.desc" v-html="product.desc" class="text-white/60 text-base"></div>
                  <div v-else>
                    <h5 class="text-white/80">
                      Updating </h5>
                  </div>
                </div>
              </div>
              <div class="mt-5">
                <div v-if="product.episodes.length > 2" class="flex items-center justify-start gap-6">

                  <div v-if="product.episodes.length > 1">
                    <NuxtLink :to="'/manga/' + product.slug + '/' + product.episodes[product.episodes.length - 1].slug">
                      <button
                        class="text-white   rounded-lg bg-blue-800 active:bg-red-500 sm:px-5 px-3 sm:py-2 py-1 sm:text-xl text-base  font-bold flex items-center justify-center shadow shadow-blue-500/50">
                        Read First
                      </button>
                    </NuxtLink>
                  </div>
                  <div>
                    <NuxtLink :to="'/manga/' + product.slug + '/' + product.episodes[0].slug">
                      <button
                        class="text-white  rounded-lg  bg-gray-800 active:bg-red-500 sm:px-5 px-3 sm:py-2 py-1 sm:text-xl text-base  font-bold flex items-center justify-center shadow shadow-cyan-500/50">
                        Read Last
                      </button>
                    </NuxtLink>

                  </div>
                </div>
                <div v-else class="flex items-center justify-start gap-6">
                  <div>

                    <button
                      class="text-white  rounded-lg  bg-gray-800 active:bg-red-500 sm:px-5 px-3 sm:py-2 py-1 sm:text-xl text-base  font-bold flex items-center justify-center shadow shadow-cyan-500/50">
                      Updating....
                    </button>


                  </div>
                </div>

              </div>
              <div class="flex flex-wrap items-center justify-start gap-6 mt-5">

                <div>
                  <ShareButtons />

                </div>
              </div>

            </div>
          </div>


          <div class="w-full border-y-4 border-solid border-white/20 py-3 mb-4">
            <div class=" flex items-center justify-start gap-6 mb-5">
              <Icon name="fxemoji:markschaptersymbol" class="text-4xl" />
              <h3 class=" text-xl  text-white/80 font-bold">
                {{ product.name }} Chappters
              </h3>
            </div>

            <div class="overflow-y-scroll lg:max-h-[400px] max-h-[300px]">
              <ul class="lg:px-10 px-2 dri">
                <li v-for="item in product.episodes" class="mb-3">
                  <NuxtLink :to="'/manga/' + product.slug + '/' + item.slug"
                    class=" text-white hover:text-sky-600 lg:px-3 px-1 h-12 block py-1">
                    <div class="flex items-center justify-between gap-4 border-b border-solid boder-gray-800  py-1">
                      <h4> {{ item.name }}</h4>
                      <h5 class="text-gray-500 lg:text-sm text-xs  uppercase">{{ item.update_time }}</h5>
                    </div>
                  </NuxtLink>

                </li>
              </ul>

            </div>
          </div>
          <div v-if="isComment" class="w-full py-3">
            <h3 class=" text-xl mb-3 text-white/80 font-bold">
              <DisqusCount :identifier="route.fullPath" />

            </h3>
            <div class="">

              <DisqusComments :identifier="route.fullPath" />

            </div>
          </div>
        </div>
        <div class="lg:col-span-3 col-span-12">
          <div class="p-5 border-t  border-solid border-stone-500 h-full">


            <div class="w-full sticky top-0 left-0">
              <div class="flex items-center justify-between mb-3 w-full">
                <div class="w-full">
                  <div class="mb-3">
                    <h3 class="border-l-4 border-sky-500 border-solid text-xl pl-3 text-white/80 font-bold">
                      Top Trending
                    </h3>
                  </div>
                  <div class=" w-full">
                    <ul>
                      <li v-for="(item, index) in vnwa.topViewProducts" :key="index" class="mb-5">
                        <div class="grid grid-cols-12 gap-4">
                          <div class="col-span-4">
                            <NuxtLink :to="'/manga/' + item.slug" class="hover:text-cyan-500">
                              <div>
                                <NuxtImg :src="item.url_avatar" width="80" class="max-w-[80px] h-auto" />
                              </div>
                            </NuxtLink>
                          </div>
                          <div class="col-span-8">
                            <div class="py-1 ms-1">
                              <h4 class="text-white/80 font-bold">{{ item.name }}</h4>
                            </div>
                          </div>
                        </div>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </NuxtLayout>
  </div>
</template>

<script setup>


const title = ref('Manga  mới nhất')
const meta_title = ref('Manga  mới nhất')
const meta_image = ref('/images/website/logo-netmanga.png')
const meta_desc = ref('Manga  mới nhất')
const product = ref([])
const router = useRouter();
const vnwaStore = useMyVnwaStore()
const vnwa = ref([]);

await vnwaStore.fetchVnwaData()
vnwa.value = vnwaStore.vnwa
const config = useRuntimeConfig();
const route = useRoute();
const loadingStore = useMyLoadingStore()
const myHistoryStore = useMyHistoryStore() // Khởi tạo store
const isComment = ref(false);
const customerStore = useCustomerStore();
const count_wishlist = ref(0)

const updateCountWishlist = async () => {
  const response = await fetch(config.public.apiBase + '/' + 'get-wishlist-count-with-product/' + route.params.slug);
  if (response.ok) {
    const data = await response.json();
    count_wishlist.value = data.count_wishlist
  }

}

const response = await fetch(config.public.apiBase + '/' + 'get-detail-product/' + route.params.slug);
const data = await response.json();
if (response.ok) {
  title.value = data.title
  meta_title.value = data.meta_title
  meta_image.value = data.meta_image
  meta_desc.value = data.meta_desc
  product.value = data.product
  await fetch(config.public.apiBase + '/' + 'increment-views/' + route.params.slug)
  await updateCountWishlist()

  const storyData = {
    id: product.value.id,
    name: product.value.name,
    slug: product.value.slug,
    url_avatar: product.value.url_avatar
  }
  myHistoryStore.addToHistory(storyData)

} else {
  console.error(response)
}
const isBookmark = ref(false);

onMounted(() => {
  isComment.value = true;
  if (customerStore.isAuthenticated) {

    customerStore.fetchWishlist();
    isBookmark.value = customerStore.isWishlist(product.value.slug)
  }
})

const handleToggleWishlist = () => {
  if (customerStore.isAuthenticated) {
    loadingStore.start();
    updateCountWishlist()

    customerStore.toggleWishlist(product.value.slug);
    customerStore.fetchWishlist();
    isBookmark.value = !isBookmark.value
    loadingStore.stop();
  } else {
    router.push('/login')
  }

};


</script>

<style></style>
