<template>
  <div>
    <div class="mb-3">
                      <h3 class="border-l-4 border-sky-500 border-solid text-xl pl-3 text-white/80 font-bold">
                       New Comments
                      </h3>
                    </div>

   <div class="max-h-[200px] overflow-auto mt-3">
    <div v-html="scripts"></div>
   </div>
</div>
</template>

<script setup>
  const  scripts = "<script src='https://manhwa18.disqus.com/recent_comments_widget.js?num_items=5&hide_mods=0&hide_avatars=0&avatar_size=32&excerpt_length=50'><\/script>"

</script>

<style scoped>
/* Bạn có thể thêm style tùy chỉnh nếu cần */
</style>
