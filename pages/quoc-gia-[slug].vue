<template>
  <div>
    <Title> {{ title }}</Title>
    <Meta name="title" :content="meta_title" />
    <Meta name="og:title" :content="meta_title" />
    <Meta name="image" :content="meta_image" />
    <Meta name="og:image" :content="meta_image" />
    <Meta name="description" :content="meta_desc" />
    <Meta name="og:description" :content="meta_desc" />
    <NuxtLayout>
      <div v-if="isLoading">Loading...</div>
      <div v-else>
        <div>
          <PageTitle>Truyện {{ title }}</PageTitle>
        </div>
        <div class="mt-5 mb-14">
          <div class="w-full grid lg:grid-cols-4 sm:grid-cols-4 grid-cols-2 gap-4">
            <div class="col-span-1" v-for="item in products.data" :key="item.id">
                <ItemProductNormal :dataProduct="item" />
            </div>
          </div>
          <div class="flex items-center justify-center mt-10 mb-3" v-if="products.last_page > 1">

            <Pagination :urlPage="'/quoc-gia-' + route.params.slug" :totalPage="products.last_page"
              :current_page="products.current_page" @change-page="handleChangePage" />
          </div>
        </div>
      </div>
    </NuxtLayout>

  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const route = useRoute();
const products = ref([])
const nation = ref([])
const title = ref('')
const meta_title = ref('')
const meta_desc = ref('')
const meta_image = ref('')
const isLoading = ref(false);
const fetchProducts = async (page = 1) => {
  isLoading.value = true;
  const response = await fetch(`${config.public.apiBase}/get-data-products-by-nation/${route.params.slug}?page=${page}`);
  const data = await response.json();
  if (response.ok) {
    title.value = data.title
    meta_title.value = data.meta_title
    meta_image.value = data.meta_image
    meta_desc.value = data.meta_desc
    products.value = data.products
    nation.value = data.nation
  } else {
    console.error(response);
  }
  isLoading.value = false;
};

fetchProducts();
const handleChangePage = async (page) => {
  await fetchProducts(page);
};
</script>

<style></style>