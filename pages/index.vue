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
              <div>
                <div>
                  <CateTittle class="mb-3"> Latest update manga</CateTittle>
                </div>
              </div>
              <div class="w-full grid lg:grid-cols-4 sm:grid-cols-4 grid-cols-2 gap-4">
                <div class="col-span-1" v-for="item in newUpdatedProducts">
                  <div class="mb-3">
                    <ItemProductNormal :dataProduct="item" />
                  </div>
                </div>
                <div>
                  <NuxtLink to="/manga?arange=new-updated">
                    <div class="w-full h-full bg-black/80  p-3 shadow hover:bg-cyan-500/50 shadow-cyan-500">
                      <div class="flex items-center justify-center border border-white w-full h-full">
                        <div>
                          <div class="text-center mb-4">
                            <Icon name="material-symbols:tab-new-right-sharp" class="text-4xl text-white" />
                          </div>
                          <h3 class="text-white font-bold">View More</h3>
                        </div>
                      </div>
                    </div>

                  </NuxtLink>
                </div>
              </div>
            </div>

            <div class="mt-5 mb-14" v-if="rawProducts.length > 0">
              <div>
                <div>
                  <CateTittle class="mb-3"> Latest Raw manga</CateTittle>
                </div>
              </div>
              <div class="w-full grid lg:grid-cols-4 sm:grid-cols-4 grid-cols-2 gap-4">
                <div class="col-span-1" v-for="item in rawProducts">
                  <div class="mb-3">
                    <ItemProductNormal :dataProduct="item" />
                  </div>
                </div>
                <div>
                  <NuxtLink to="/manga?arange=new-updated&&category=1">
                    <div class="w-full h-full bg-black/80  p-3 shadow hover:bg-cyan-500/50 shadow-cyan-500">
                      <div class="flex items-center justify-center border border-white w-full h-full">
                        <div>
                          <div class="text-center mb-4">
                            <Icon name="material-symbols:tab-new-right-sharp" class="text-4xl text-white" />
                          </div>
                          <h3 class="text-white font-bold">View More</h3>
                        </div>
                      </div>
                    </div>

                  </NuxtLink>
                </div>
              </div>
            </div>

            <div class="mt-5 mb-14" v-if="subProducts.length > 0">
              <div>
                <div>
                  <CateTittle class="mb-3"> Latest Sub manga</CateTittle>
                </div>
              </div>
              <div class="w-full grid lg:grid-cols-4 sm:grid-cols-4 grid-cols-2 gap-4">
                <div class="col-span-1" v-for="item in subProducts">
                  <div class="mb-3">
                    <ItemProductNormal :dataProduct="item" />
                  </div>
                </div>
                <div>
                  <NuxtLink to="/manga?arange=new-updated&category=2">
                    <div class="w-full h-full bg-black/80  p-3 shadow hover:bg-cyan-500/50 shadow-cyan-500">
                      <div class="flex items-center justify-center border border-white w-full h-full">
                        <div>
                          <div class="text-center mb-4">
                            <Icon name="material-symbols:tab-new-right-sharp" class="text-4xl text-white" />
                          </div>
                          <h3 class="text-white font-bold">View More</h3>
                        </div>
                      </div>
                    </div>

                  </NuxtLink>
                </div>
              </div>
            </div>

            <div class="mt-5 mb-14" v-if="newProducts.length > 0">
              <div>
                <div>
                  <CateTittle class="mb-3"> New manga</CateTittle>
                </div>
              </div>
              <div class="w-full grid lg:grid-cols-4 sm:grid-cols-4 grid-cols-2 gap-4">
                <div class="col-span-1" v-for="item in newProducts">
                  <div class="mb-3">
                    <ItemProductNormal :dataProduct="item" />
                  </div>
                </div>
                <div>
                  <NuxtLink to="/manga?arange=new-created">
                    <div class="w-full h-full bg-black/80  p-3 shadow hover:bg-cyan-500/50 shadow-cyan-500">
                      <div class="flex items-center justify-center border border-white w-full h-full">
                        <div>
                          <div class="text-center mb-4">
                            <Icon name="material-symbols:tab-new-right-sharp" class="text-4xl text-white" />
                          </div>
                          <h3 class="text-white font-bold">View More</h3>
                        </div>
                      </div>
                    </div>

                  </NuxtLink>
                </div>
              </div>
            </div>











          </div>
          <div class="lg:col-span-3 col-span-12">
            <div class="p-5 border-t  border-solid border-stone-500 h-full">
              <div class="mb-5 text-white relative">
                <LastComments />
              </div>

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
                            <div class="col-span-1">
                              <div class="flex items-center justify-center h-full w-full">
                                <h5 class="font-bold text-white text-xl">
                                  {{ index + 1 }}

                                </h5>
                              </div>
                            </div>
                            <div class="col-span-4">
                              <NuxtLink :to="'/manga/' + item.slug" class="hover:text-cyan-500">
                                <div>
                                  <NuxtImg :src="item.url_avatar" width="80" class="max-w-[80px] w-full h-auto" />
                                </div>
                              </NuxtLink>
                            </div>
                            <div class="col-span-7">
                              <div class="py-1">
                                <h4 class="text-white/80  text-base font-bold ms-1 line-clamp-2">{{ item.name }}</h4>
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
const loading = ref(true)
const newUpdatedProducts = ref([])
const newProducts = ref([])
const rawProducts = ref([])
const subProducts = ref([])

// Hàm lấy dữ liệu từ API với số trang
const fetchProducts = async (page = 1) => {
  loading.value = true;
  const response = await fetch(`${config.public.apiBase}/get-data-home?page=${page}`);
  const data = await response.json();
  if (response.ok) {
    highlightProducts.value = data.highlightProducts
    newUpdatedProducts.value = data.newUpdatedProducts;
    newProducts.value = data.newProducts;
    rawProducts.value = data.rawProducts;
    subProducts.value = data.subProducts;
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