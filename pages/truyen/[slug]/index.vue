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
              <NuxtLink to="/" class="text-base text-sky-700">Trang chủ</NuxtLink>
            </li>
            <li class="mr-3">
              <Icon name="material-symbols:keyboard-double-arrow-right" class="text-white/60 text-xl" />
            </li>
            <li class="mr-3">
              <NuxtLink :to="'/truyen/'" class="text-base text-sky-700">Truyện</NuxtLink>
            </li>
            <li class="mr-3">
              <Icon name="material-symbols:keyboard-double-arrow-right" class="text-white/60 text-xl" />
            </li>
            <li class="mr-3">
              <NuxtLink :to="'truyen/' + product.slug" class="text-base text-white/50 font-bold">{{ product.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="grid grid-cols-12" v-if="product">
          <div class="lg:col-span-2 col-span-12 lg:mb-0 mb-5 ">
            <div class="flex justify-center">

              <NuxtImg :src="product.url_avatar" class="lg:w-full w-40 h-auto" loading="lazy" alt="webtoonx"
                width="200" />
            </div>
          </div>
          <div class="lg:col-span-10 col-span-12 sm:py-2  pl-5">
            <h1 class="sm:text-3xl  font-bold text-2xl  text-white mb-5">{{ product.name }}</h1>
            <h3 class="sm:text-base font-bold  text-xs text-white/50 mb-5">{{ product.full_name }}</h3>
            <div class="flex items-center justify-start gap-4 text-white font-bold mb-3">
              <div>
                Quốc gia:
              </div>
              <div>
                <h3 v-if="product.nation">{{ product.nation.name }}</h3>
                <h3 v-else>Đang cập nhập</h3>
              </div>
            </div>
            <div class="flex items-center justify-start gap-4 text-white font-bold mb-3">
              <div>Thể Loại: </div>
              <div>
                <div v-if="product.types.length > 0" v-for="(item, index) in product.types" :key="index" class="flex items-center justify-start gap-4 flex-wrap">
                  <NuxtLink :to="'/the-loai-' + item.slug">
                    <span class="bg-white text-black px-3 hover:bg-blue-500 hover:text-white">
                      {{ item.name }}
                    </span>
                  </NuxtLink>

                </div>
                <div v-else class="text-white">Đang cập nhập</div>

              </div>

            </div>
            <!-- <span class="bg-sky-500 px-3 py-1 uppercase text-white font-bold sm:text-base text-xs ">
                
            </span> -->
            <div class="mt-5" v-if="product.episodes.length > 0">
              <div class="flex items-center justify-start gap-6">
                <div>
                  <NuxtLink :to="'/truyen/' + product.slug + '/' + product.episodes[0].slug">
                    <button
                      class="text-white bg-gray-800 active:bg-red-500 sm:px-5 px-3 sm:py-2 py-1 sm:text-xl text-base  font-bold flex items-center justify-center shadow shadow-cyan-500/50">
                      Đọc mới nhất
                    </button>
                  </NuxtLink>

                </div>
                <div v-if="product.episodes.length >1">
                  <NuxtLink :to="'/truyen/' + product.slug + '/' + product.episodes[product.episodes.length-1].slug">
                    <button
                      class="text-white bg-blue-800 active:bg-red-500 sm:px-5 px-3 sm:py-2 py-1 sm:text-xl text-base  font-bold flex items-center justify-center shadow shadow-blue-500/50">
                      Đọc từ đầu
                    </button>
                  </NuxtLink>
                </div>
              </div>

            </div>
            <div class="w-full py-3">
              <h3 class=" text-xl mb-3 text-white/80 font-bold">
                Tóm tắt
              </h3>
              <div class="ps-3">
                <div v-if="product.desc" v-html="product.desc" class="text-white/60 text-base"></div>
                <div v-else>
                  <h5 class="text-white/80">
                    Đang cập nhập </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="">
          <ul class="flex items-center justify-start  list_types flex-wrap my-1">
            <li v-for="item in product.types" class="text-sky-700 text-sm font-bold me-3 my-2  ">
              <NuxtLink to="" class="cursor-pointer hover:text-white">Truyện {{ item.name }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="w-full border-y-4 border-solid border-white/20 py-3">
          <h3 class=" text-xl mb-3 text-white/80 font-bold">
            Chọn tập
          </h3>
          <ul class="flex flex-wrap items-center justify-start">
            <li v-for="item in product.episodes" class="ms-3 mb-3 ">
              <NuxtLink :to="'/truyen/' + product.slug + '/' + item.slug">
                <button class="bg-gray-500 text-white hover:bg-sky-600 px-3 rounded py-1">{{ item.name }}</button>
              </NuxtLink>
            </li>
          </ul>
        </div>


    </NuxtLayout>
  </div>
</template>

<script setup>

const title = ref('Truyện tranh mới nhất')
const meta_title = ref('Truyện tranh mới nhất')
const meta_image = ref('/images/website/logo-nettruyen.png')
const meta_desc = ref('Truyện tranh mới nhất')
const product = ref([])

const config = useRuntimeConfig();
const route = useRoute();
const myHistoryStore = useMyHistoryStore() // Khởi tạo store

const response = await fetch(config.public.apiBase + '/' + 'get-detail-product/' + route.params.slug);
const data = await response.json();
if (response.ok) {
  title.value = data.title
  meta_title.value = data.meta_title
  meta_image.value = data.meta_image
  meta_desc.value = data.meta_desc
  product.value = data.product


  const storyData = {
    id: product.value.id,
    title: product.value.name,
    slug: product.value.slug,
    image: product.value.url_avatar
  }
  myHistoryStore.addToHistory(storyData)

} else {
  console.error(response)
}
</script>

<style></style>
