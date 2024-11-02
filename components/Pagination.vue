<template>
  <div>
    <nav class="pagination" aria-label="Page navigation example" v-if="current_page">
      <ul class="flex items-center -space-x-px h-10 text-base">
        <li v-if="current_page > 1">
          <button
            @click="goToPage(current_page - 1)"
            class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
          </button>
        </li>

        <template v-if="totalPage <= 8">
          <li v-for="i in totalPage" :key="i">
            <button
              @click="goToPage(i)"
              :class="['px-4 h-10', { 'bg-cyan-500 font-bold': i === current_page }]"
              class="border border-gray-300 text-white hover:bg-gray-100 hover:text-gray-700"
            >
              {{ i }}
            </button>
          </li>
        </template>

        <template v-else>
          <!-- Hiển thị 5 trang đầu -->
          <template v-for="i in 5" :key="i">
            <li v-if="i <= 5">
              <button
                @click="goToPage(i)"
                :class="['px-4 h-10', { 'bg-cyan-500 font-bold': i === current_page }]"
                class="border border-gray-300 text-white hover:bg-gray-100 hover:text-gray-700"
              >
                {{ i }}
              </button>
            </li>
          </template>

          <!-- Dấu "..." nếu cần -->
          <li v-if="current_page > 6">
            <span class="px-4 h-10">...</span>
          </li>

          <!-- Hiển thị trang hiện tại và một trang trước/ sau -->
          <li v-if="current_page > 5">
            <button
              @click="goToPage(current_page - 1)"
              :class="['px-4 h-10', { 'bg-cyan-500 font-bold': current_page - 1 === current_page }]"
              class="border border-gray-300 text-white hover:bg-gray-100 hover:text-gray-700"
            >
              {{ current_page - 1 }}
            </button>
          </li>

        

          <li v-if="current_page < totalPage - 5" class="h-full">
            <button
                class="border border-gray-300 text-white hover:bg-gray-100 hover:text-gray-700 h-full w-10"
              >
              ...
              </button>
          </li>

          <!-- Hiển thị 3 trang cuối -->
          <template v-for="i in 3" :key="i">
            <li v-if="totalPage - i + 1 > 5">
              <button
                @click="goToPage(totalPage - i + 1)"
                :class="['px-4 h-10', { 'bg-cyan-500 font-bold': totalPage - i + 1 === current_page }]"
                class="border border-gray-300 text-white hover:bg-gray-100 hover:text-gray-700"
              >
                {{ totalPage - i + 1 }}
              </button>
            </li>
          </template>
        </template>

        <li v-if="current_page < totalPage">
          <button
            @click="goToPage(current_page + 1)"
            class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 9l4-4-4-4"/>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
const props = defineProps({
  current_page: Number,
  totalPage: Number,
});

// Emit sự kiện khi trang thay đổi
const emit = defineEmits(['change-page']);

const goToPage = (page) => {
  emit('change-page', page);
};
</script>
