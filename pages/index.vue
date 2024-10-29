<template>
  <div>

    <Title>Read The Indomitable Martial King Manhwa </Title>
    <Meta name="title" content="Read The Indomitable Martial King Manhwa " />
    <Meta name="og:title" content="Read The Indomitable Martial King Manhwa " />

    <NuxtLayout>

      <div v-if="!loading">
        <div>
          <Slide :data="highlightProducts" />
        </div>
        <div class="grid grid-cols-12 gap-6">
          
          <div class="lg:col-span-9 col-span-12 ">
            <div class="mt-5 mb-14">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <CateTittle class="mb-3">Latest Manga Update</CateTittle>
                </div>
              </div>
              <div class="w-full grid lg:grid-cols-4 sm:grid-cols-4 grid-cols-2 gap-4">
                <div class="col-span-1" v-for="item in newProducts.data">
                  <div class="mb-3">
                    <ItemProductNormal :dataProduct="item" />
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-center mt-10 mb-3" v-if="newProducts.last_page > 1">

                <Pagination :urlPage="'/manga'" :totalPage="newProducts.last_page"
                  :current_page="newProducts.current_page" @change-page="handleChangePage" />
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
                        Top Views
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




    </NuxtLayout>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const vnwaStore = useMyVnwaStore()
const vnwa = ref([]);
await vnwaStore.fetchVnwaData()
vnwa.value = vnwaStore.vnwa
const highlightProducts = ref([])
const newProducts = ref([])
const loading = ref(true)

// Hàm lấy dữ liệu từ API với số trang
const fetchProducts = async (page = 1) => {
  loading.value = true;
  const response = await fetch(`${config.public.apiBase}/get-data-home?page=${page}`);
  const data = await response.json();
  if (response.ok) {
    highlightProducts.value = data.highlightProducts
    newProducts.value = data.newProducts;
  } else {
    console.error(response);
  }
  loading.value = false;

};

// Gọi API lần đầu
await fetchProducts();

// Hàm xử lý khi trang thay đổi
const handleChangePage = async (page) => {
  await fetchProducts(page);
};



</script>

<style></style>