<template>
  <div class="ads_banner">
    <div ref="bannerContainer" v-html="content"></div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  mounted() {
    if (process.client) {
      // Lấy các script từ nội dung HTML
      this.$nextTick(() => {
        const scripts = this.$refs.bannerContainer.querySelectorAll("script");
        scripts.forEach((oldScript) => {
          const newScript = document.createElement("script");
          newScript.innerHTML = oldScript.innerHTML;
          // Copy thuộc tính của script gốc sang script mới
          Array.from(oldScript.attributes).forEach(attr =>
            newScript.setAttribute(attr.name, attr.value)
          );
          // Gắn script mới vào DOM
          oldScript.parentNode.replaceChild(newScript, oldScript);
        });
      });
    }
  },
};
</script>

<style scoped>
.ads_banner {
  margin-bottom: 10px;
}

.ads_banner iframe {
  width: 100%;
  max-height: 200px;
}
</style>
