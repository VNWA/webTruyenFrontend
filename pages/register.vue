<template>
  <NuxtLayout>
 
 <div>
    <div class="flex items-center justify-center ">
      <div class="bg-gray-50 p-4 shadow-md my-6 border" style="max-width: 35rem;">
        <div class="font-medium text-3xl text-center">
Register
        </div>
        <!-- <div class="text-gray-600 text-center border-b pb-4 mb-6 ">
          Tengo cuenta y quiero iniciar sesión
        </div> -->
        <form @submit.prevent="handleRegister">
         
          
          <div class="my-2">
            <div class="grid grid-cols-1 gap-3">
              <div>
                <label class="text-sm" for="username">User Name <span class="text-primary">*</span></label>

                <input v-model="form.username" id="username"
                  class=" px-3 focus:border-gray-400 focus:outline-none  border border-solid border-gray-300  w-full py-3"
                  type="text" required>
                <p v-if="errors.username" class="text-red-500 text-xs mt-1">{{ errors.username }}</p>

              </div>
              <div>
              </div>
            </div>
          </div>
          <div class="my-2">
            <div class="grid grid-cols-1 gap-3">
              <div>
                <label class="text-sm" for="email">E-mail </label>

                <input v-model="form.email" id="email"
                  class=" px-3 focus:border-gray-400 focus:outline-none  border border-solid border-gray-300  w-full py-3"
                  type="email">
                <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>

              </div>
              <div>
              </div>
            </div>
          </div>
         
          <div class="my-2">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-sm" for="password">Password<span class="text-primary">*</span></label>
                <input v-model="form.password" id="password" required
                  class="px-3 focus:border-gray-400 focus:outline-none  border border-solid border-gray-300  w-full py-3"
                  type="password">
                <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
              </div>
              <div>
                <label class="text-sm" for="password_confirmation">Confirm Password<span
                    class="text-primary">*</span></label>
                <input v-model="form.password_confirmation" id="password_confirmation" required
                  class="px-3 focus:border-gray-400 focus:outline-none  border border-solid border-gray-300  w-full py-3"
                  type="password">
                <p v-if="errors.password_confirmation" class="text-red-500 text-xs mt-1">{{ errors.password_confirmation
                  }}</p>
              </div>
            </div>
          </div>
        <p v-if="errorMessage" class="text-red-500 text-center mt-3">{{ errorMessage }}</p>
         
          <div class="flex justify-between mt-4 items-center">
          <div class="text-sm">
            <span class="text-primary">*</span> - Already have an account

            <div class="my-1">
              <NuxtLink to="/login" class="text-primary underline" >Login</NuxtLink>
            </div>
          
          </div>
          <div>
            <button type="submit"
              class="text-xl mr-2 text-white bg-cyan-500 px-5 py-3 transition duration-300 hover:bg-cyan-400">
            Regsiter
            </button>
          </div>
        </div>


        </form>
      </div>
    </div>
  </div>
</NuxtLayout>

</template>

<script setup>
const router = useRouter();
const customerStore = useCustomerStore();
onMounted(() => {
  customerStore.loadCustomerFromStorage();
  if (customerStore.isAuthenticated) {
    router.push('/user'); // Điều hướng đến trang đăng nhập
  }
})

const form = reactive({
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const errors = ref({
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
});


const clearErrors = () => {
  Object.keys(errors.value).forEach(key => {
    errors.value[key] = '';
  });
}


const handleRegister = async () => {
  clearErrors();

 

  // Kiểm tra mật khẩu
  if (form.password !== form.password_confirmation) {
    errors.value.password_confirmation = 'Nhập mật khẩu giống nhau';
    return false;
  }

  if (form.password.length <= 6) {
    errors.value.password = 'Nhập mật khẩu lớn hơn 6 kí tự';
    return false;
  }

 

  try {
    await customerStore.register(form);
    router.push('/user')
  } catch (error) {
    const errorsResponse = error;
    errors.value = Object.fromEntries(
      Object.entries(errorsResponse.errors).map(([key, messages]) => [
        key, messages.join(', ') // Chuyển đổi mảng lỗi thành chuỗi
      ])
    );
  }
}
</script>


<style></style>