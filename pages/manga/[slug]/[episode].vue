<template>
  <div>

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
            <NuxtLink :to="'/manga'" class="text-base text-sky-700">Manga</NuxtLink>
          </li>
          <li class="mr-3">
            <Icon name="material-symbols:keyboard-double-arrow-right" class="text-white/60 text-xl" />
          </li>
          <li class="mr-3">
            <NuxtLink :to="'/manga/' + route.params.slug" class="text-base text-white/50 font-bold">{{ productName }}
            </NuxtLink>
          </li>
          <li class="mr-3">
            <Icon name="material-symbols:keyboard-double-arrow-right" class="text-white/60 text-xl" />
          </li>
          <li class="mr-3">
            <NuxtLink :to="'/manga/' + route.params.slug + '/' + route.params.episode"
              class="text-base text-white/50 font-bold">
              {{ episode.name }}
            </NuxtLink>
          </li>

        </ul>
        <div v-if="adsBannerTop" class="ads_banner text-white">
          <div v-if="adsBannerTop.isImage == 1 && adsBannerTop.image">
            <a :href="adsBannerTop.link" target="_blank" rel="noopener noreferrer">
              <NuxtImg :src="adsBannerTop.image" width="500" loading="lazy" class="w-full" />

            </a>
          </div>
          <div v-else-if="adsBannerTop.isImage == 0 && adsBannerTop.iframe">
            <div>
              <AdBanner :content="adsBannerTop.iframe" />
            </div>
          </div>
        </div>
        <div class="sticky top-0 left-0 w-full px-3 py-2 bg-white">
          <div class="flex items-center justify-between gap-4">
            <div>
              <NuxtLink v-if="prev_episode" :to="'/manga/' + route.params.slug + '/' + prev_episode.slug">
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
              <NuxtLink v-if="next_episode" :to="'/manga/' + route.params.slug + '/' + next_episode.slug">
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
        <div v-if="adsBannerMiddle" class="ads_banner text-white">
          <div v-if="adsBannerMiddle.isImage == 1 && adsBannerMiddle.image">
            <a :href="adsBannerMiddle.link" target="_blank" rel="noopener noreferrer">
              <NuxtImg :src="adsBannerMiddle.image" width="500" loading="lazy" class="w-full" />

            </a>
          </div>
          <div v-else-if="adsBannerMiddle.isImage == 0 && adsBannerMiddle.iframe">
            <div>
              <AdBanner :content="adsBannerMiddle.iframe" />
            </div>
          </div>
        </div>
        <div class="my-3">
          <ul class="flex items-center justify-center gap-4">
            <li v-for="(item, index) in episode.servers " :key="index">
              <button :class="{ 'bg-yellow-600 text-white': index === pageIndex }"
                @click="() => { pageContent = item.images; pageIndex = index; }"
                class="px-3 py-1 bg-green-700/50 rounded-md">Sever {{ index + 1 }}</button>
            </li>
          </ul>
        </div>
        <div class="my-5 min-h-screen">
          <ul class="max-w-3xl mx-auto">
            <li v-for="(item, index) in pageContent" :key="index" class="">
              <NuxtImg alt="manhwa18" :src="item" class="w-full h-auto" />
            </li>
          </ul>
        </div>
        <div class="mt-3 border w-full h-full px-2 py-2">
          <div class=" text-center font-bold text-cyan-500" v-html="productDesc"></div>
        </div>
        <div class="flex items-center justify-center my-3">
          <ShareButtons />
        </div>
        <div v-if="adsBannerEnd" class="ads_banner text-white">
          <div v-if="adsBannerEnd.isImage == 1 && adsBannerEnd.image">
            <a :href="adsBannerEnd.link" target="_blank" rel="noopener noreferrer">
              <NuxtImg :src="adsBannerEnd.image" width="500" loading="lazy" class="w-full" />

            </a>
          </div>
          <div v-else-if="adsBannerEnd.isImage == 0 && adsBannerEnd.iframe">
            <div>
              <AdBanner :content="adsBannerEnd.iframe" />
            </div>
          </div>
        </div>
        <div v-if="isComment" class="w-full border-y-4 border-solid border-white/20 py-3">
          <h3 class=" text-xl mb-3 text-white/80 font-bold">

          </h3>
          <div class="">

            <DisqusComments :identifier="route.fullPath" />

          </div>
        </div>
      </div>





    </NuxtLayout>
  </div>
</template>

<script setup>

const episode = ref([])
const next_episode = ref(null)
const prev_episode = ref(null)
const episodes = ref([])
const productName = ref('')
const productDesc = ref('')
const config = useRuntimeConfig();
const route = useRoute();
const selected = ref('');
const adsBannerEnd = ref([])
const adsBannerMiddle = ref([])
const adsBannerTop = ref([])

const historyStore = useMyHistoryStore();

const response = await fetch(config.public.apiBase + '/' + 'get-episode/' + route.params.slug + '/' + route.params.episode);
const isComment = ref(false);

const pageIndex = ref(0)
const pageContent = ref([])
const router = useRouter();

if (response.ok) {
  const data = await response.json();




  useServerSeoMeta({
    ogTitle: () => data.meta.metaTitle,
    title: () => data.meta.metaTitle,
    description: () => data.meta.metaDesc,
    ogDescription: () => data.meta.metaDesc,
    ogImage: () => data.meta.metaImage,
    ogImageUrl: () => data.meta.metaImage,
    twitterCard: () => 'summary_large_image',
    twitterTitle: () => data.meta.metaTitle,
    twitterDescription: () => data.meta.metaDesc,
    twitterImage: () => data.meta.metaImage
  })

  episode.value = data.episode
  episodes.value = data.episodes

  productDesc.value = data.product_desc
  productName.value = data.product_name
  next_episode.value = data.next_episode
  prev_episode.value = data.prev_episode
  adsBannerEnd.value = data.adsBannerEnd
  adsBannerMiddle.value = data.adsBannerMiddle
  adsBannerTop.value = data.adsBannerTop

  selected.value = route.params.episode
  if (data.episode.servers.length > 0) {
    pageContent.value = data.episode.servers[0].images
  }
  await fetch(config.public.apiBase + '/' + 'increment-views/' + route.params.slug)

} else {
  console.error(response)
}
const changeEpisode = () => {
  router.push('/manga/' + route.params.slug + '/' + selected.value)
}
onMounted(() => {
  const currentChapterUrl = route.fullPath;
  if (!historyStore.isChapterViewed(currentChapterUrl)) {
    historyStore.addChapterUrl(currentChapterUrl);
  }
  isComment.value = true;
});
</script>

<style></style>
