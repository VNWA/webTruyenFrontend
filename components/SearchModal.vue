<template>
  <div>
    <div class="fixed z-10 w-full  h-screen top-0 left-0 bg-black/90 pb-5  flex items-start py-16 justify-center " v-if="isSearch == true">

      <div class="page-content bg-slate-900	p-5 rounded-md w-full h-full  max-h-full overflow-y-scroll">
        <div class="flex items-center justify-between mb-5  font-bold">
          <h3 class="text-xl text-white/80">Search</h3>
          <button class="text-white active:bg-sky-500" @click="closeSearchModal">
            <icon name="ic:outline-close" class="text-4xl text-red-500" />
          </button>
        </div>
        <div class="flex w-full h-12 bg-white text-black/80 relative">
          <input type="text" class="w-full h-full ps-12 pe-5" @input="search" placeholder="Input search keyword ....">
          <div class="  w-12 h-12 flex items-center justify-center absolute top-0 left-0">
            <icon name="fa6-solid:magnifying-glass" class="lg:text-xl text-base text-yellow-500 font-bold" />
          </div>
        </div>
        <div class="">
          <div class="flex items-center justify-center mt-5 h-32 " v-if="dataSearch.length <= 0">
            <span class="text-white/60">Not Found </span>
          </div>
          <ul v-else class="">
            <li class="relative mb-3 block" v-for="(item, index) in dataSearch">
              <NuxtLink :to="'/manga/' + item.slug">
                <div class="grid grid-cols-12  w-full  bg-black/50 hover:bg-black  relative text-white/80 hover:text-sky-500">
                  <div class="col-span-3  flex items-start justify-center p-1">
                    <NuxtImg  alt="manhwa18" :src=" item.url_avatar" class="w-auto  h-24" loading="lazy"  width="70" height="140" />
                  </div>
                  <div class="col-span-9 p-1 py-3">
                    <h3 class="text-sm font-bold  text-white/90 mb-2">{{ item.name }}</h3>
                    <div class="flex items-center justify-start">
                      <h5 class="text-xs  text-white/50 ms-2"> {{ item.full_name }}</h5>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>

      </div>


    </div>
  </div>
</template>
<script>
export default {

  methods: {
    closeSearchModal() {
      this.$emit('close', false);
    },
    search(event) {
      // Lấy giá trị từ input
      const searchText = event.target.value;
      // Gọi hàm tìm kiếm với giá trị đã nhập
      this.fetchSearchResults(searchText);
    },
  },
  props: {
    isSearch: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const config = useRuntimeConfig();
    // Sử dụng useFetch để gửi yêu cầu tìm kiếm
    const dataSearch = ref([]);
    const fetchSearchResults = async (searchText) => {
      searchText = searchText.trim();
      if (searchText !== '') {
        try {
          const response = await fetch(config.public.apiBase + '/get-search-suggest/' + searchText);

          if (response.ok) {
            const data = await response.json();
            // Xử lý dữ liệu kết quả ở đây
            dataSearch.value = data;
          } else {
            console.error('Error fetching search results:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
        }

      };
    }
    return {
      fetchSearchResults, dataSearch
    };
  },
}
</script>
<style></style>