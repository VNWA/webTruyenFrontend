<template>
  <div style="background-image: url('/background.png');">
    <header class="w-full  flex justify-center ">
      <div class="page-content w-full h-full lg:bg-black/70 shadow-lg shadow-cyan-500/50  bg-zinc-950">
        <div class="flex items-center justify-between w-full h-full lg:px-3 px-2 py-2">
          <div class="lg:hidden block">
            <button aria-label="Show Menu" v-if="!isMobileMenu" @click="isMobileMenu = !isMobileMenu"
              class="h-8 w-8 bg-gray-800/50  flex items-center justify-center me-3 active:bg-sky-500">
              <Icon name="material-symbols:menu" class="text-4xl text-white" />
            </button>
            <button aria-label="Show Menu" v-else @click="isMobileMenu = !isMobileMenu"
              class="h-8 w-8 bg-gray-800/50 rounded flex items-center justify-center me-3  text-white active:text-red-500">
              <Icon name="mdi:close-outline" class="text-4xl" />
            </button>
          </div>
          <div class=" h-full flex items-center ">

            <div class="lg:w-56 lg:h-full  w-auto h-8    flex items-center justify-center">
              <NuxtLink to="/" class="h-full">
                <h3 v-if="!vnwa" class="text-white/80 font-bold text-xl">webtoonx</h3>
                <NuxtImg v-else-if="vnwa && vnwa.dataWeb" class="logo w-full h-auto max-h-full"
                  :src="vnwa.dataWeb.url_avatar_full" width="200" alt="webtoonx" />
              </NuxtLink>
            </div>
            <div class="h-full lg:block hidden">
              <ul class="header-menu">

                <li>
                  <NuxtLink to="/truyen">
                    Truyện Mới
                  </NuxtLink>
                </li>

                <li>
                  <span>
                    Thể loại
                    <span style="margin-top: -10px;">
                      <icon name="fa6-solid:sort-down" />
                    </span>
                  </span>
                  <div class=" sub-menu z-10  absolute top-full left-0 bg-black/90">
                    <ul class="grid grid-cols-12 gap-4 w-full p-5 " v-if="vnwa && vnwa.dataType.length > 0">
                      <li class="col-span-4" v-for="item in vnwa.dataType">
                        <NuxtLink :to="'/the-loai-' + item.slug"
                          class="text-base w-full text-white/80 flex items-center justif-start">
                          <icon name="fa6-solid:caret-right" class="text-xl me-2" /> {{ item.name }}
                        </NuxtLink>
                      </li>
                    </ul>

                  </div>
                </li>

                <li>
                  <span>
                    Quốc gia
                    <span style="margin-top: -10px;">
                      <icon name="fa6-solid:sort-down" />
                    </span>
                  </span>
                  <div class=" sub-menu z-10  absolute top-full left-0 bg-black/90">
                    <ul class="grid grid-cols-12 gap-4 w-full p-5 " v-if="vnwa && vnwa.dataNation.length > 0">
                      <li class="col-span-4" v-for="item in vnwa.dataNation">
                        <NuxtLink :to="'/quoc-gia-' + item.slug"
                          class="text-base w-full text-white/80 flex items-center justif-start">
                          <icon name="fa6-solid:caret-right" class="text-xl me-2" /> {{ item.name }}
                        </NuxtLink>
                      </li>
                    </ul>

                  </div>
                </li>
              </ul>

            </div>

          </div>


          <button aria-label="Show Modal Search"
            class="flex relative h-12 min-w-12 w-auto md:px-1 items-center md:justify-between justify-center md:bg-sky-500/90 text-black rounded  active:bg-sky-500">
            <div class="absolute z-10 top-0 left-0 w-full h-full " @click="isSearchModal = true"></div>
            <span class="text-white me-3 md:block hidden">
              <input type="text" disabled placeholder="Tìm kiếm"
                class="text-black bg-black/80 h-10 px-3 cursor-pointer rounded">
            </span>
            <icon name="fa6-solid:magnifying-glass" class="md:text-xl text-lg -z-1 me-1 md:text-black text-white" />
          </button>


        </div>
      </div>
    </header>

    <SearchModal :isSearch="isSearchModal" @close="handleSearchModalClose" />

    <div class="absolute z-10 w-full  bg-black/90 pb-5 " v-if="isMobileMenu">
      <div class="capitalize">
        <ul class="text-white/80 text-xl">
          <li class="  font-bold    border-b border-gray-100/20">
            <NuxtLink to="/">
              <h3 class="  py-3 px-3  font-bold active:bg-sky-500">
                Trang chủ
              </h3>
            </NuxtLink>

          </li>
          <li class="  font-bold    border-b border-gray-100/20">
            <NuxtLink to="/truyen">
              <h3 class="  py-3 px-3  font-bold active:bg-sky-500">
                Truyện Mới
              </h3>
            </NuxtLink>

          </li>


          <li class="font-bold   border-b border-gray-100/20">
            <span>
              <h3 class=" py-3 px-3  font-bold active:bg-sky-500">
                Thể loại
              </h3>
            </span>
            <div class="w-full ">
              <div class="grid grid-cols-2">
                <div class="col-span-1 " v-for="item in vnwa.dataType">
                  <NuxtLink :to="'/the-loai-' + item.slug">
                    <h5 class="px-3 py-2 font-medium text-base  active:text-sky-600">
                      - {{ item.name }}
                    </h5>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </li>
          <li class="font-bold   border-b border-gray-100/20">
            <span>
              <h3 class=" py-3 px-3  font-bold active:bg-sky-500">
                Quốc gia
              </h3>
            </span>
            <div class="w-full ">
              <div class="grid grid-cols-2">
                <div class="col-span-1 " v-for="item in vnwa.dataNation">
                  <NuxtLink :to="'/quoc-gia-' + item.slug" class="text-white/60">
                    <h5 class="px-3 py-2 font-medium text-base  active:text-sky-600">
                      - {{ item.name }}
                    </h5>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>



    <div class="w-full flex items-center justify-center pb-24">
      <div class="page-content w-full ">
        <div class="min-h-screen w-full bg-black/70 shadow-lg shadow-yellow-500/20">
          <div class="lg:border border-b border-l border-solid border-yellow-500 p-2 text-sm text-white/80 text-center">
            <strong> Hoang Sa</strong> and <strong>Truong Sa</strong> archipelagos belong to Vietnam
            <GetIpComponent />
          </div>

          <div class="w-full mt-3">
            <div class="grid grid-cols-12 gap-0">
              <div class="lg:col-span-9 col-span-12">
                <div class="p-5 border-t border-r border-solid border-stone-500 h-full">
                  <slot />
                </div>
              </div>
              <div class="lg:col-span-3 col-span-12">
                <div class="p-5 border-t  border-solid border-stone-500 h-full">


                  <div class="w-full sticky top-0 left-0">
                    <div class="flex items-center justify-between mb-3 w-full">
                      <div class="w-full">
                        <div class="mb-3">
                          <h3 class="border-l-4 border-sky-500 border-solid text-xl pl-3 text-white/80 font-bold">
                            Lịch sử
                          </h3>
                        </div>
                        <div class="max-h-[500px] overflow-y-scroll w-full">
                          <ul>
                            <li v-for="story in sortedHistory" :key="story.id" class="mb-5">
                              <div class="grid grid-cols-12 gap-4">
                                <div class="col-span-4">
                                  <NuxtLink :to="'/truyen/' + story.slug" class="hover:text-cyan-500">
                                    <div>
                                      <NuxtImg :src="story.image" width="80" class="max-w-[80px] h-auto" />
                                    </div>
                                  </NuxtLink>
                                </div>
                                <div class="col-span-8">
                                  <div class="py-1">
                                    <h4 class="text-white/80 font-bold">{{ story.title }}</h4>
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
          </div>


        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
const vnwaStore = useMyVnwaStore()
const vnwa = ref([]);
await vnwaStore.fetchVnwaData()
vnwa.value = vnwaStore.vnwa
const myHistoryStore = useMyHistoryStore()

onMounted(() => {
  myHistoryStore.loadHistory() // Tải lịch sử từ Local Storage
})

// Sắp xếp lịch sử theo thứ tự mới nhất trước
const sortedHistory = computed(() => {
  return myHistoryStore.history.slice().reverse() // Đảo ngược mảng để hiển thị mới nhất trước
})
const isMobileMenu = ref(false);
const isSearchModal = ref(false);
const handleSearchModalClose = (newValue) => {
  console.log(newValue);
  isSearchModal.value = newValue;
};
</script>

<style scoped>
header {
  height: 70px;
  width: 100%;
  background-color: rgba(15, 15, 15, .9);
  box-shadow: 0 1px 5px rgba(0, 0, 0, .4);
  border-bottom: 1px solid #000;
}

.router-link-active {
  color: skyblue !important;
}

header .logo {
  width: auto;
  height: 55px;
}

@media only screen and (min-width: 960px) {


  header ul.header-menu {
    display: flex;
    align-items: center;
    justify-content: left;
    height: 100%;
    padding-left: 10px;
  }


  header ul.header-menu>li {
    height: 100%;
    position: relative;
  }

  header ul.header-menu>li>a,
  header ul.header-menu>li>span {
    font-size: 17px;
    color: white;
    opacity: 0.7;
    padding: 0 15px;
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;
    justify-content: center;
  }

  header ul.header-menu>li a:hover {
    color: rgb(79, 121, 226);
    opacity: 1;
  }

  header .sub-menu {
    display: none;
    min-width: 500px;
    font-size: 14px;
    max-width: 600px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 2);
  }

  header .sub-menu li a {
    width: 100%;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
  }

  header ul.header-menu>li:hover .sub-menu {
    display: block;
  }
}

@media only screen and (max-width: 960px) {

  header {
    height: 50px;
  }

  header .logo {
    height: 45px;
  }
}
</style>