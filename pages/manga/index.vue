<template>
  <div>
    <Title>Manga</Title>
    <Meta name="title" content="Manga " />
    <Meta name="og:title" content="Manga " />

    <NuxtLayout>
      <div>
        <div>
          <PageTitle>Manga</PageTitle>
        </div>
        <div class="mt-5 mb-14">
          <div class="grid grid-cols-12 gap-6">

            <div class="lg:col-span-9 col-span-12 ">
              <div class="border bg-black/80 px-3 py-2 mb-5">
                <div class="flex items-center justify-between w-full lg:gap-5 gap-2">
                  <div class="lg:flex items-center justify-start gap-4 text-white lg:text-base text-sm">
                    <label :for="'radio1'"
                      class="flex items-center justify-start gap-4 font-bold  px-1 py-2 cursor-pointer">
                      <input type="radio" id="radio1" :value="0" v-model="is_complete"
                        @change="handleFilterChange">
                      <span>In progress</span>
                    </label>
                    <label :for="'radio2'"
                      class="flex items-center justify-start gap-4 font-bold  px-1 py-2 cursor-pointer">
                      <input type="radio" id="radio2" :value="1" v-model="is_complete"
                        @change="handleFilterChange">
                      <span>Completed</span>
                    </label>
                  </div>
                  <div>
                    <select v-model="arange" @change="handleFilterChange" class="lg:w-[200px] w-34 border px-3 py-2 lg:text-base text-sm">
                      <option value="most-view">Most View</option>
                      <option value="most-favourite">Most Favourite </option>
                      <option value="a-z">A - Z</option>
                      <option value="z-a">Z - A</option>
                      <option value="new-updated">New Updated</option>
                      <option value="old-updated">Old Updated</option>
                      <option value="new-created">New Created</option>
                      <option value="old-created">Old Created</option>
                    </select>
                 <div class="lg:hidden block w-34 border px-3 py-1 mt-3 bg-cyan-500/50 text-white text-center" @click="isFilterMenu = true">

                      <Icon name="material-symbols:filter-alt-outline-sharp" class="text-2xl" />
                   
                 </div>
                  </div>
                </div>
              </div>
              <div v-if="loading" class="py-5 text-center text-white font-bold text-lg">Loading...</div>
              <div v-else>
                <div v-if=" products.data && products.data.length>0">
                <div  class="w-full grid lg:grid-cols-4 sm:grid-cols-4 grid-cols-2 gap-4">
                <div class="col-span-1" v-for="item in products.data" :key="item.id">
                  <ItemProductNormal :dataProduct="item" />
                </div>
              </div>
              <div class="flex items-center justify-center mt-10 mb-3" v-if="products.last_page > 1">

                <Pagination :urlPage="'/manga'" :totalPage="products.last_page" :current_page="products.current_page"
                  @change-page="handleChangePage" />
              </div>
            </div>
            <div v-else class="py-5 text-center text-white font-bold text-lg">No suitable manga found</div>
              </div>
             
            </div>
            <div class="lg:col-span-3 col-span-12 ">
              <div  class="lg:block  lg:bg-white/0 bg-black lg:sticky fixed w-full h-screen top-0 left-0 p-3 overflow-auto" :class="{ 'block': isFilterMenu, 'hidden': !isFilterMenu }">
                <div class="lg:hidden text-white flex items-center justify-between gap-4 py-3 mb-3">
                  <h3 class="font-bold text-white text-xl">Filter</h3> <button @click="isFilterMenu = false"> <Icon name="material-symbols:close-rounded" class="text-white text-4xl" /> </button>
                </div>
              <div class="border px-2 py-3 text-white  bg-black/60 mb-3">
                <h3 class="text-center font-bold  text-lg mb-3"> Categories</h3>
                <hr class="my-3">
                <div class="px-3">

                  <div class="mb-1" v-for="(item, index) in vnwa.categories" :key="index">

                    <label :for="'checkbox' + item.id"
                      class="flex items-center justify-start gap-4 font-bold text-base px-1 py-2 cursor-pointer">
                      <input type="checkbox" :id="'checkbox'+ item.id" :value="item.id" v-model="selectedCategories"
                        @change="handleFilterChange">
                      <span>{{ item.name }}</span>
                    </label>
                  </div>

                </div>
              </div>
              <div class="border px-2 py-3 text-white  bg-black/60 mb-3">
                <h3 class="text-center font-bold  text-lg mb-3"> Types</h3>
                <hr class="my-3">
                <div class="px-3">
                  <div class="mb-1" v-for="(item, index) in vnwa.dataType" :key="index">

                    <label :id="'checkboxType' + item.id"
                      class="flex items-center justify-start gap-4 font-bold text-base px-1 py-2 cursor-pointer">
                      <input type="checkbox" :id="'checkboxType' + item.id" :value="item.id" v-model="selectedTypes"
                        @change="handleFilterChange">
                      <span>{{ item.name }}</span>
                    </label>
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
const isFilterMenu = ref(false)
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();

const vnwa = ref([]);
const vnwaStore = useMyVnwaStore();
const products = ref([]);
const loading = ref(true);
const selectedCategories = ref([]); // Lưu trữ các category đã chọn
const selectedTypes = ref([])
const arange =ref('new-updated')
const is_complete =ref(0)
// Fetch data lần đầu khi component mounted
onMounted(() => {
  if (route.query.category) {
    selectedCategories.value = route.query.category.split(',').map(cat => cat.trim());
  }
  if (route.query.type) {
    selectedTypes.value = route.query.type.split(',').map(item => item.trim());
  }
  if (route.query.arange) {
    arange.value = route.query.arange;
  }
  if (route.query.is_complete) {
    is_complete.value = route.query.is_complete;
  }
  handleFilterChange()
  vnwaStore.fetchVnwaData();
  vnwa.value = vnwaStore.vnwa;
  fetchProducts(); // Lấy sản phẩm khi trang load lần đầu
});

// Hàm lấy dữ liệu sản phẩm từ API
const fetchProducts = async (page = 1) => {
  loading.value = true;

  const params = new URLSearchParams(route.query);
  const queryString = params.toString();

  const response = await fetch(
    `${config.public.apiBase}/get-data-products-in-filter?page=${page}&${queryString}`
  );

  const data = await response.json();
  if (response.ok) {
    products.value = data.products;
  } else {
    console.error(response);
  }
  loading.value = false;
};
const handleFilterChange = () => {
  const query = {};
  const categories = selectedCategories.value;
  const types = selectedTypes.value;

  // Chỉ thêm vào query nếu có giá trị
  if (categories.length) {
    query.category = categories.join(','); // Nối các category bằng dấu phẩy
  }
  if (types.length) {
    query.type = types.join(','); // Nối các type bằng dấu phẩy
  }
  if (arange.value) {
    query.arange = arange.value; // Nối các type bằng dấu phẩy
  }
  if (is_complete.value) {
    query.is_complete = is_complete.value; // Nối các type bằng dấu phẩy
  }else{
    query.is_complete = 0; // Nối các type bằng dấu phẩy

  }
  

  router.push({ query }); // Cập nhật URL
};
const handleChangePage = async (page) => {
  await fetchProducts(page);
};
// Watch để gọi lại API khi URL thay đổi
watch(
  () => route.query,
  () => {
    fetchProducts(); // Gọi API mỗi lần URL thay đổi
  }
);
</script>