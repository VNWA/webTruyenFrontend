<template>
    <div class=" pt-20">
        <div class="grid grid-cols-12 gap-3">
            <div class="col-span-2">
                <UserSidebarMenu />
            </div>
            <div class="col-span-10">
                <div class="bg-gray-50 w-full border">
                    <div class="p-8">
                        <h1 class="text-3xl text-center font-medium border-b pb-4 mb-5">Mis datos</h1>
                        <form @submit.prevent="handleSubmit">
                            <div>
                                <label for="nombre" class="text-sm">Nombre <span class="text-primary">*</span></label>
                                <input id="nombre" type="text"
                                    class="pl-3 border focus:border-gray-400 focus:outline-none w-full py-3" required />
                            </div>
                            <div>
                                <label for="apellido" class="text-sm">Apellido <span
                                        class="text-primary">*</span></label>
                                <input id="apellido" type="text"
                                    class="pl-3 border focus:border-gray-400 focus:outline-none w-full py-3" required />
                            </div>
                            <div class="mt-4 flex justify-between items-center">
                                <div class="text-sm">
                                    <span class="text-primary">*</span> - campos obligatorios
                                </div>
                                <button type="submit"
                                    class="bg-primary uppercase text-white py-4 px-3 hover:bg-rose-300 duration-300">Guardar
                                    cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
});
const handleSubmit = () => {
};
</script>

<style scoped></style>