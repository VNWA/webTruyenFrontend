<template>
  <div>
    <Title>Truyện tranh mới nhất</Title>
    <Meta name="title" content="Truyện tranh mới nhất" />
    <Meta name="og:title" content="Truyện tranh mới nhất" />

    <NuxtLayout>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div>
          <PageTitle>Truyện mới nhất</PageTitle>
        </div>
        <div class="mt-5 mb-14">
          <div class="w-full grid lg:grid-cols-4 sm:grid-cols-4 grid-cols-2 gap-4">
            <div class="col-span-1" v-for="item in products.data" :key="item.id">
                <ItemProductNormal :dataProduct="item" />
            </div>
          </div>
          <div class="flex items-center justify-center mt-10 mb-3" v-if="products.last_page > 1">

            <Pagination :urlPage="'/truyen'" :totalPage="products.last_page" :current_page="products.current_page"
              @change-page="handleChangePage" />
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const config = useRuntimeConfig();

const products = ref([]);
const loading = ref(false);

// Hàm lấy dữ liệu từ API với số trang
const fetchProducts = async (page = 1) => {
  loading.value = true;
  const response = await fetch(`${config.public.apiBase}/get-data-products?page=${page}`);
  const data = await response.json();
  if (response.ok) {
    products.value = data.products;
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
