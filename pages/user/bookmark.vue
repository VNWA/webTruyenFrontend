<template>
  <div>
    <NuxtLayout>
      <UserPanel>
        <div class="w-full border">
          <div class="p-8 min-h-screen">
            <h1 class="text-3xl text-white text-center font-medium border-b pb-4 mb-5">Bookmark</h1>
            <div v-if="customerStore.wishlistItems.length === 0" class="text-white text-center">
              <p>Không có sản phẩm nào trong wishlist.</p>
            </div>
            <div class="grid lg:grid-cols-4 grid-cols-2 gap-4 text-white">
              <div  v-for="(item,index) in customerStore.wishlistItems" :key="index">
              <div>
                <div class="relative product-item" v-if="item">
                  <div class="logo transition-all duration-300 rounded-lg overflow-hidden">
                    <NuxtLink :to="'/manga/' + item.slug">
                      <div class="flex items-center justify-center  w-full h-full">
                        <NuxtImg quality="80" format="webp" :src="item.url_avatar"
                          class="transition ease-in-out delay-150 bg-blue-500 	 w-100 duration-300" loading="lazy"
                          alt="Manhwa18" width="200" height="150" />
                        <div
                          class="absolute w-full h-full bg-black/5material-symbols-light:eye-tracking0 flex items-center justify-center play-icon   transition-all duration-150 delay-100	">
                          <Icon name="material-symbols-light:eye-tracking"
                            class="text-white transition-all duration-300" />
                        </div>
                        <div class="absolute left-0 top-0" v-if="item.highlight == 1">
                          <div class="bg-red-600 uppercase px-1 py-1 z-20	rounded-lg  font-bold text-white">
                            Hot
                          </div>
                        </div>
                      </div>

                    </NuxtLink>
                  </div>
                  <div class="text-white text-sm mt-3 mb-1 capitalize ">
                    <NuxtLink :to="'/manga/' + item.slug">

                      <h3 class="font-bold line-clamp-2 hover:text-sky-500">
                        {{ item.name }}
                      </h3>
                    </NuxtLink>


                  </div>



                </div>
              </div>
            </div>
             
            </div>
          </div>
        </div>
      </UserPanel>
    </NuxtLayout>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
});
const customerStore = useCustomerStore(); // Khởi tạo store khách hàng
// Lấy wishlist khi component được mounted
onMounted(async () => {
  await customerStore.fetchWishlist();
});

// Phương thức toggle wishlist
const toggleWishlist = async (slug) => {
  await customerStore.toggleWishlist(slug);
  await customerStore.fetchWishlist(); // Cập nhật lại wishlist sau khi thay đổi
};
</script>

<style scoped>
/* Bạn có thể thêm CSS ở đây nếu cần */
</style>
