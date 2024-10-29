<template>
  <div>
    <NuxtLayout>
      <UserPanel>

        <div class="bg-gray-50 w-full border">
          <div class="p-8">
            <h1 class="text-3xl text-center font-medium border-b pb-4 mb-5">Email
            </h1>
            <form @submit.prevent="handleSubmit">

              <div class="grid grid-cols-1 gap-8 my-2">
                <div>
                  <label for="email" class="text-sm">E-mail <span class="text-primary">*</span></label>
                  <input id="email" type="email"
                    class="pl-3 border focus:border-gray-400 focus:outline-none w-full py-3" required />
                </div>
                <div></div>
              </div>

              <div class="my-4">

              </div>
              <div class="my-2 flex justify-center">
                <button type="submit" class="bg-cyan-500 text-white py-4 px-3 hover:bg-cyan-600 duration-300">Guardar
                  cambios</button>
              </div>

            </form>
          </div>
        </div>
      </UserPanel>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
});
const handleSubmit = () => {
};
</script>
