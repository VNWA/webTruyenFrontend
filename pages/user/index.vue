<template>
  <div>
    <NuxtLayout>
      <UserPanel>
        <div class="w-full border">
          <div class="p-8 max-h-screen overflow-y-auto">
            <h1 class="text-3xl text-white text-center font-medium border-b pb-4 mb-5">Notifications</h1>
            <div v-if="customerStore.notifications.length === 0" class="text-white text-center">
              <p>Không có thông báo.</p>
            </div>
            <div class="py-3 px-5 text-white">
              <ul>
                <li v-for="(item, index) in customerStore.notifications" :key="index" class="mb-4">
                 <NuxtLink :to="item.link ? `/manga/${item.link}` : '/user'"  >
                  <div :class="{'bg-cyan-500/80 text-white':item.is_view == 0}"
                    class="border bg-white/80 text-black font-bold px-3 py-3 text-lg capitalize ">
                    <div>
                     <span class="text-white bg-red-500 px-1 rounded-full py-1 text-xs me-1" v-if="item.is_view == 0">New</span>  {{ item.message }}
                    </div>
                    
                  </div>
                 </NuxtLink>

                </li>


              </ul>


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
  if(customerStore.token){

    await customerStore.loadNotifications();
    await customerStore.setIsViewNotifications();
  }
});


</script>

<style scoped>
/* Bạn có thể thêm CSS ở đây nếu cần */
</style>
