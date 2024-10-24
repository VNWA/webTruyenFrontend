<template lang="">
 <div>
  <div  class="iframe_video relative">
  <div class="absolute w-full h-full bg-black/50 top-0 left-0" v-if="isAds">
   <a @click="isAds = false" href="https://atservineor.com/4/7164441" target="_blank">
   <div class="w-full h-full flex items-center justify-center"> 
    <Icon name = "material-symbols:play-circle" class="text-white" style="font-size:100px"/>
   </div>
   </a>
  </div>
  <div v-else class="w-full h-full">
  <div class="p-5 w-full h-full"  v-if="type== 'video'">
    <video    controls autoplay controlsList="nodownload" oncontextmenu="return false;">
  <source :src="embed_url" type="video/mp4">
  <source src="https://t4.ftcdn.net/jpg/03/70/42/69/360_F_370426939_YwozPjAdQbT5k2lviyfmkNl2z2u0CSxb.jpg" type="video/ogg">
</video>

  </div>
  <div  v-else class="h-full w-full">

    <iframe class="metaframe rptss" :src="embed_url" frameborder="0" scrolling="no" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>
  </div>


  </div>
 </div> 
 </div>
</template>
<script>
export default {
  methods: {
    isTypeVideo(url) {
      if (url.endsWith('.mp4')) {
        return 'mp4';
      } else if (url.endsWith('.m3u8')) {
        return 'm3u8';
      } else {
        return null;
      }
    }
  },
  data() {
    return {
      isAds: false,
    }
  },
  props: {
    embed_url: String,
    type: String,
  },

}
</script>
<style scoped>
@media only screen and (min-width: 500px) {
  .iframe_video {
    width: 100%;
    height: 440px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
  }
}

@media only screen and (max-width: 500px) {
  .iframe_video {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
  }
}

.iframe_video iframe,
.iframe_video video {
  width: 100%;
  height: 100%;
}
</style>