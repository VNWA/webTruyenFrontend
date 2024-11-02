<template>
 <div>
  <h3 class="hidden" v-if="clientIp">{{ clientIp }}</h3>
  <h3 class="hidden" v-if="data">{{ data.ip }}</h3>
 </div>
</template>

<script  setup>
const {  data } = useFetch('https://api.ipify.org?format=json', {
 lazy: true
});
const clientIp = useCookie('clientIp');

watch(data, () => {
 if (data.value) {
  clientIp.value = data.value.ip;
  console.log('yesip');
 } else {
  console.log('no data ip');
 }
});
</script>

<style></style>