<template>
    <div>
        <Head>
            <Title>History</Title>
      <Meta name="title" content="History" />
      <Meta name="og:title" content="History" />
            </Head>
  
      <NuxtLayout>
     
        <div >
          <div>
            <PageTitle>History</PageTitle>
          </div>
          <div class="mt-5 mb-14">
            <div class="w-full grid lg:grid-cols-4 sm:grid-cols-4 grid-cols-2 gap-4">
              <div class="col-span-1" v-for="item in latestStories" :key="item.id">
                <div>
        <div class="relative product-item" v-if="item">
            <div class="logo transition-all duration-300 rounded-lg overflow-hidden">
                <NuxtLink :to="'/manga/' + item.slug">
                    <div class="flex items-center justify-center  ">
                        <NuxtImg quality="80" format="webp" :src="item.url_avatar"
                            class="transition ease-in-out delay-150 bg-blue-500 	 w-100 duration-300" loading="lazy"
                            alt="webtoonx" width="200" height="150" />
                        <div
                            class="absolute w-full h-full bg-black/5material-symbols-light:eye-tracking0 flex items-center justify-center play-icon   transition-all duration-150 delay-100	">
                            <Icon name="material-symbols-light:eye-tracking"
                                class="text-white transition-all duration-300" />
                        </div>
                        <div class="absolute left-0 top-0" v-if="item.highlight == 1">
                            <div class="bg-red-600 uppercase px-1 py-1 z-20	rounded-lg  font-bold text-white">
                                Hot
                            </div>
                        </div>
                    </div>

                </NuxtLink>
            </div>
            <div class="text-white text-sm mt-3 mb-1 capitalize ">
                <NuxtLink :to="'/manga/' + item.slug">

                    <h3 class="font-bold line-clamp-2 hover:text-sky-500">
                        {{ item.name }}
                    </h3>
                </NuxtLink>

                
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
  </script>
  