<template>
  <div class="ads_banner">
    <div ref="bannerContainer" v-html="cleanedContent"></div>
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
  computed: {
    // Loại bỏ các script khỏi content để chúng không tự động chạy
    cleanedContent() {
      return this.content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    },
  },
  mounted() {
    if (process.client) {
      this.$nextTick(() => {
        this.loadExternalScript("//cdn.tsyndicate.com/sdk/v1/n.js")
          .then(() => this.executeInlineScripts())
          .catch((error) => console.error("Lỗi khi tải script:", error));
      });
    }
  },
  methods: {
    loadExternalScript(src) {
      return new Promise((resolve, reject) => {
        // Kiểm tra nếu script từ CDN đã tồn tại
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
        } else {
          const script = document.createElement("script");
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        }
      });
    },
    executeInlineScripts() {
      // Tìm và thực thi các script nội bộ từ nội dung HTML
      const scripts = this.content.match(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi) || [];
      scripts.forEach((scriptTag) => {
        const inlineScript = document.createElement("script");
        inlineScript.innerHTML = scriptTag.replace(/<script\b[^>]*>|<\/script>/gi, "");
        document.body.appendChild(inlineScript);
      });
    },
  },
};
</script>

<style scoped>
.ads_banner {
  /* Tùy chỉnh CSS nếu cần */
}
</style>
