<template>
  <div>

    <Head>
      <Title>History</Title>
      <Meta name="title" content="History" />
      <Meta name="og:title" content="History" />
    </Head>

    <NuxtLayout>

      <div class="grid grid-cols-12 gap-4">
        <div class="lg:col-span-9 col-span-12">
          <div>
          <PageTitle>History</PageTitle>
        </div>
        <div class="mt-5 mb-14">
          <div class="w-full grid lg:grid-cols-4 sm:grid-cols-4 grid-cols-2 gap-4">
            <div class="col-span-1" v-for="item in latestStories" :key="item.id">
              <ItemProductNormal :dataProduct="item" />
            </div>
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
const config = useRuntimeConfig();
const myHistoryStore = useMyHistoryStore();
myHistoryStore.loadHistory();

const latestStories = myHistoryStore.history.reverse()
const vnwaStore = useMyVnwaStore()
const vnwa = ref([]);
await vnwaStore.fetchVnwaData()
vnwa.value = vnwaStore.vnwa
</script>