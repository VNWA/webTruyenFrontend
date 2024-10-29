<template>
  <div>
    <div class=" ">
      <div class="grid grid-cols-12 lg:gap-8 gap-4 w-full">
        <div class="lg:col-span-3 col-span-12">
          <div class="bg-black/50 text-white font-bold border lg:sticky top-0 left-0">
            <div class="p-5">
              <ul class="">
                <li class="border-b lg:py-3" v-for="(item, index) in menuItems" :key="index">
                  <NuxtLink aria-label="VNWA Link" class="user_sidebar_menu_item" :to="item.link">
                    <div class="py-2 flex items-center gap-3">
                      <div class="lg:p-2 p-1 flex items-center justify-center rounded-sm">
                        <Icon class="lg:w-6 lg:h-6 w-4 h-4 text-gray-500" :name="item.icon" />
                      </div>
                      <div>{{ item.label }}</div>
                    </div>
                  </NuxtLink>
                </li>
                <li class="border-b lg:py-3">
                  <button @click="logout" class="user_sidebar_menu_item">
                    <div class="py-2 flex items-center gap-3">
                      <div class="lg:p-2 p-1  flex items-center justify-center rounded-sm">
                        <Icon class="lg:w-6 lg:h-6 w-4 h-4  text-gray-500" name="material-symbols-light:logout-sharp" />
                      </div>
                      <div>Logout</div>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="lg:col-span-9 col-span-12">
          <slot />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>

const router = useRouter()
const menuItems = [
  { label: 'Notification', link: { path: '/user/' }, icon: 'line-md:account' },
  { label: 'Bookmark', link: { path: '/user/bookmark' }, icon: 'material-symbols:bookmark-heart' },
  // { label: 'Change Password', link: { path: '/user/change-password' }, icon: 'teenyicons:password-outline' },
];
const customerStore = useCustomerStore()
const logout = async () => {
  await customerStore.logout();
  await router.push('/');
};
</script>

<style scoped>
.user_sidebar_menu_item:hover div>div:first-child {
  background-color: cyan;
}

.user_sidebar_menu_item.router-link-active div>div:first-child {
  background-color: cyan;
}
</style>
