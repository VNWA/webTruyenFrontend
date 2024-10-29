<template>
    <div class=" pt-20">
      <div class="grid grid-cols-12 gap-3">
        <div class="col-span-2">
          <UserSidebarMenu />
        </div>
        <div class="col-span-10">
          
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
  
  <style scoped>
  </style>
  