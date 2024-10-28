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
                  <span>
                    Type
                    <span style="margin-top: -10px;">
                      <icon name="fa6-solid:sort-down" />
                    </span>
                  </span>
                  <div class=" sub-menu z-10  absolute top-full left-0 bg-black/90">
                    <ul class="grid grid-cols-12 gap-4 w-full p-5 " v-if="vnwa && vnwa.dataType.length > 0">
                      <li class="col-span-4" v-for="item in vnwa.dataType">
                        <NuxtLink :to="'/type-' + item.slug"
                          class="text-base w-full text-white/80 flex items-center justif-start">
                          <icon name="fa6-solid:caret-right" class="text-xl me-2" /> {{ item.name }}
                        </NuxtLink>
                      </li>
                    </ul>

                  </div>
                </li>
                <li>
                  <NuxtLink to="/history">
                  History
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/trending">
                    Trending
                  </NuxtLink>
                </li>
              </ul>

            </div>

          </div>


          <button aria-label="Show Modal Search"
            class="bg-white/90 text-black w-10 h-10 rounded-full flex items-center justify-center" @click="isSearchModal = true">
          
            <icon name="fa6-solid:magnifying-glass" class="md:text-xl text-lg -z-1 me-1 text-black" />
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
                Home
              </h3>
            </NuxtLink>

          </li>
         


          <li class="font-bold   border-b border-gray-100/20">
            <span>
              <h3 class=" py-3 px-3  font-bold active:bg-sky-500">
                Type
              </h3>
            </span>
            <div class="w-full ">
              <div class="grid grid-cols-2">
                <div class="col-span-1 " v-for="item in vnwa.dataType">
                  <NuxtLink :to="'/type-' + item.slug">
                    <h5 class="px-3 py-2 font-medium text-base  active:text-sky-600">
                      - {{ item.name }}
                    </h5>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </li>
          <li class="  font-bold    border-b border-gray-100/20">
            <NuxtLink to="/history">
              <h3 class="  py-3 px-3  font-bold active:bg-sky-500">
                History
              </h3>
            </NuxtLink>

          </li>
          <li class="  font-bold    border-b border-gray-100/20">
            <NuxtLink to="/trending">
              <h3 class="  py-3 px-3  font-bold active:bg-sky-500">
                Trending
              </h3>
            </NuxtLink>

          </li>
        </ul>
      </div>
    </div>



    <div class="w-full flex items-center justify-center pb-24">
      <div class="page-content w-full ">
        <div class="min-h-screen w-full bg-black/70 shadow-lg shadow-yellow-500/20">
          <div class="lg:border border-b border-l border-solid border-yellow-500 p-2 text-sm text-white/80 text-center">
            <strong> Hoang Sa</strong> and <strong>Truong Sa</strong> archipelagos belong to Vietnam
            <!-- <GetIpComponent /> -->
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
                            Top Views
                          </h3>
                        </div>
                        <div class=" w-full">
                          <ul>
                            <li v-for="(item,index) in vnwa.topViewProducts" :key="index" class="mb-5">
                              <div class="grid grid-cols-12 gap-4">
                                <div class="col-span-4">
                                  <NuxtLink :to="'/manga/' + item.slug" class="hover:text-cyan-500">
                                    <div>
                                      <NuxtImg :src="item.url_avatar" width="80" class="max-w-[80px] h-auto" />
                                    </div>
                                  </NuxtLink>
                                </div>
                                <div class="col-span-8">
                                  <div class="py-1">
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
          </div>


        </div>
      </div>
    </div>


    <button @click="scrollToTop" v-if="showScrollButton"
      class="fixed z-20 lg:bottom-14 lg:right-14 bottom-10 right-2 w-14 h-14  border border-black bg-white text-black  border-solid rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
      :class="{
        'animate-slide-up': showScrollButton,
        'animate-slide-down': !showScrollButton
      }">
      <Icon name="lets-icons:arrow-alt-ltop" class="text-5xl" />
    </button>

  </div>
</template>

<script setup>
const vnwaStore = useMyVnwaStore()
const vnwa = ref([]);
await vnwaStore.fetchVnwaData()
vnwa.value = vnwaStore.vnwa



const isMobileMenu = ref(false);
const isSearchModal = ref(false);
const handleSearchModalClose = (newValue) => {
  console.log(newValue);
  isSearchModal.value = newValue;
};



const showScrollButton = ref(false)

const handleScroll = () => {
  const scrollPosition = window.scrollY
  const scrollThreshold = 200
  showScrollButton.value = scrollPosition > scrollThreshold
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
const nuxtApp = useNuxtApp()

nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0)
  isMenuOpen.value = false
  isSearchOpen.value = false
  isCartOpen.value = false
})
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