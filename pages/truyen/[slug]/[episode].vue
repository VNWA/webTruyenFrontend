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
              <NuxtLink :to="'/truyen'" class="text-base text-sky-700">Truyện</NuxtLink>
            </li>
            <li class="mr-3">
              <Icon name="material-symbols:keyboard-double-arrow-right" class="text-white/60 text-xl" />
            </li>
            <li class="mr-3">
              <NuxtLink :to="'/truyen/' + route.params.slug" class="text-base text-white/50 font-bold">{{ productName }}
              </NuxtLink>
            </li>
            <li class="mr-3">
              <Icon name="material-symbols:keyboard-double-arrow-right" class="text-white/60 text-xl" />
            </li>
            <li class="mr-3">
              <NuxtLink :to="'/truyen/' + route.params.slug + '/' + route.params.episode"
                class="text-base text-white/50 font-bold">
                {{ episode.name }}
              </NuxtLink>
            </li>

          </ul>

          <div class="sticky top-0 left-0 w-full px-3 py-2 bg-white">
            <div class="flex items-center justify-between gap-4">
              <div>
                <NuxtLink v-if="prev_episode" :to="'/truyen/' + route.params.slug + '/' + prev_episode.slug">
                  <button class="hover:bg-cyan-600/80 bg-teal-500 text-white bold lg:px-10 px-2 py-2  rounded-md">
                    <icon name="material-symbols-light:arrow-left-alt" class="lg:text-3xl text-2xl font-bold" />
                  </button>
                </NuxtLink>
                <button v-else class=" bg-gray-500/80 text-white/80 bold  lg:px-10 px-2    py-2 rounded-md">
                  <icon name="material-symbols-light:arrow-left-alt" class="lg:text-3xl text-2xl font-bold" />
                </button>
              </div>
              <div>
                <div class="lg:w-[200px] w-[150px]">
                  <select v-model="selected" @change="changeEpisode"
                    class="w-full  text-black/80 font-bold bg-white border-2 border-solid border-black/70 px-3 py-2">
                    <option v-for="(item, index) in episodes" :key="index" :value="item.slug">{{ item.name }}
                    </option>
                  </select>
                </div>

              </div>
              <div>
                <NuxtLink v-if="next_episode" :to="'/truyen/' + route.params.slug + '/' + next_episode.slug">
                  <button class="hover:bg-cyan-600/80 bg-teal-500 text-white bold  lg:px-10 px-2  py-2 rounded-md">
                    <icon name="material-symbols-light:arrow-right-alt" class="lg:text-3xl text-2xl font-bold" />
                  </button>
                </NuxtLink>
                <button v-else class=" bg-gray-500/80 text-white/80 bold  lg:px-10 px-2  py-2 rounded-md ">
                  <icon name="material-symbols-light:arrow-right-alt" class="lg:text-3xl text-2xl font-bold" />
                </button>


              </div>
            </div>
          </div>

          <div class="my-3">
            <ul class="flex items-center justify-center gap-4">
              <li v-for="(item,index) in episode.servers " :key="index" >
                <button :class="{'bg-yellow-600 text-white': index === pageIndex}" @click="()=>{pageContent = item.images;pageIndex = index; }" class="px-3 py-1 bg-green-700/50 rounded-md">Sever {{ index+1 }}</button>
              </li>
            </ul>
          </div>
          <div class="my-5 min-h-screen">
           <ul>
            <li v-for="(item,index) in pageContent" :key="index" class="border-b">
              <NuxtImg :src="item" class="w-full h-auto" />
            </li>
           </ul>
          </div>
        </div>





    </NuxtLayout>
  </div>
</template>

<script setup>

const title = ref('Truyện tranh mới nhất')
const meta_title = ref('Truyện tranh mới nhất')
const meta_image = ref('/images/website/logo-nettruyen.png')
const meta_desc = ref('Truyện tranh mới nhất')
const episode = ref([])
const next_episode = ref(null)
const prev_episode = ref(null)
const episodes = ref([])
const productName = ref('')
const config = useRuntimeConfig();
const route = useRoute();
const selected = ref('');
const response = await fetch(config.public.apiBase + '/' + 'get-episode/' + route.params.slug + '/' + route.params.episode);
const data = await response.json();

const pageIndex = ref(0)
const pageContent = ref([])

if (response.ok) {
  title.value = data.title
  meta_title.value = data.meta_title
  meta_image.value = data.meta_desc
  meta_desc.value = data.meta_image
  episode.value = data.episode
  episodes.value = data.episodes
  productName.value = data.product_name
  next_episode.value = data.next_episode
  prev_episode.value = data.prev_episode
  selected.value = route.params.episode
  if (data.episode.servers.length > 0) {
    pageContent.value = data.episode.servers[0].images
  }
} else {
  console.error(response)
}
const router = useRouter();
const changeEpisode = () => {
  router.push('/truyen/' + route.params.slug + '/' + selected.value)
}

</script>

<style></style>
