<template>
  <NuxtLayout>

    <div class="flex items-center justify-center">
      <div class="bg-gray-50 p-6 my-10 border rounded-md shadow-md" >
        <div class="border-b pb-5 pt-2">
          <h1 class="font-medium text-3xl text-center">Login</h1>
        </div>
        <form @submit.prevent="handleLogin">
          <div class="my-4">
            <label for="username" class="text-sm">
              User Name<span class="text-primary">*</span>
            </label>
            <input id="username" type="text" class="pl-3 border focus:border-gray-400 focus:outline-none w-full py-3"
              v-model="username" required />
          </div>
          <div class="my-4">
            <label for="password" class="text-sm">
              Password <span class="text-primary">*</span>
            </label>
            <input id="password" type="password"
              class="pl-3 border focus:border-gray-400 focus:outline-none w-full py-3" v-model="password" required />
          </div>
          <div class="flex justify-between mt-4 items-center">
            <div class="text-sm">
              <span class="text-primary">*</span> - don't account
              <div class="my-1">
                <NuxtLink to="/register" class="text-primary underline">Register</NuxtLink>
              </div>

            </div>
            <div>
              <button type="submit"
                class="text-xl mr-2 text-white bg-cyan-500 px-5 py-3 transition duration-300 hover:bg-cyan-400">
                Login
              </button>
            </div>
          </div>
          <p v-if="errorMessage" class="text-red-500 text-center mt-3">{{ errorMessage }}</p>
        </form>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup>
const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const customerStore = useCustomerStore();
const loadingStore = useMyLoadingStore();
onMounted(() => {
  customerStore.loadCustomerFromStorage();
  if (customerStore.isAuthenticated) {
    router.push('/user'); // Navigate to the user page
  }
})
useSeoMeta({
  title: 'Login',
  ogTitle: 'Login',
})

const handleLogin = async () => {
  loadingStore.start();
  errorMessage.value = ''; // Reset error message
  try {
    await customerStore.login(username.value, password.value);
     router.back();
  } catch (error) {
    // Display error message if login fails
    errorMessage.value = error.message || 'Login failed. Please try again.';
  }
  loadingStore.stop();

};
</script>

<style scoped></style>
