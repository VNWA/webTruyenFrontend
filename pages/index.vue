<template>
  <div>

    <Title>Read The Indomitable Martial King Manhwa </Title>
    <Meta name="title" content="Read The Indomitable Martial King Manhwa " />
    <Meta name="og:title" content="Read The Indomitable Martial King Manhwa " />

    <NuxtLayout>
      
        <div v-if="!loading">
          <div >
            <Slide :data="highlightProducts" />
          </div>
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

<Pagination :urlPage="'/manga'" :totalPage="newProducts.last_page" :current_page="newProducts.current_page"
  @change-page="handleChangePage" />
</div>
          </div>
         
        </div>


  

    </NuxtLayout>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

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