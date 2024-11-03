<template>
  <div>
    <Title>Trending</Title>
    <Meta name="title" content="Trending" />
    <Meta name="og:title" content="Trending" />

    <NuxtLayout>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <PageTitle>Trending</PageTitle>
        <div class="mt-5 mb-14">
          <div class="w-full grid lg:grid-cols-4 sm:grid-cols-4 grid-cols-2 gap-4">
            <div class="col-span-1" v-for="item in products.data" :key="item.id">
              <ItemProductNormal :dataProduct="item" />
            </div>
          </div>
          <div class="flex items-center justify-center mt-10 mb-3" v-if="hasMultiplePages">
            <Pagination 
              :urlPage="'/manga'" 
              :totalPage="products.last_page" 
              :current_page="products.current_page"
              @change-page="handleChangePage" 
            />
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

const products = ref([]);
const loading = ref(false);
useServerSeoMeta({
    ogTitle: () => "Trending",
    title: () => "Trending",
  })
// Hàm kiểm tra có nhiều trang hay không
const hasMultiplePages = computed(() => products.value.last_page > 1);

// Hàm lấy dữ liệu từ API với số trang
const fetchProducts = async (page = 1) => {
  loading.value = true;
  try {
    const response = await fetch(`${config.public.apiBase}/get-data-products?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    products.value = data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false;
  }
};

// Gọi API lần đầu
onMounted(() => {
  fetchProducts();
});

// Hàm xử lý khi trang thay đổi
const handleChangePage = async (page) => {
  await fetchProducts(page);
};
</script>
