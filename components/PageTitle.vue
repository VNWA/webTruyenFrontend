<template>
 <div>
  <div class="page-title">
   <h1 class="text-3xl font-bold text-white">
    <slot />
   </h1>
  </div>
 </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.page-title {
 display: flex;
 align-items: center;
 justify-content: center;
 padding: 10px 0;
 overflow: hidden;

}

.page-title h1 {
 text-align: center;
 font-size: 2rem;
 width: 100%;
}

.page-title::after,
.page-title::before {
 content: '';
 display: inline-block;
 height: 3px;
 position: relative;
 vertical-align: middle;
 width: 50%;
 background-color: aliceblue;
}
</style>