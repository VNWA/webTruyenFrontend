import { defineStore } from 'pinia'

export const useMyVnwaStore = defineStore('vnwa', {
  state: () => ({
    vnwa: {}
  }),
  actions: {
    async fetchVnwaData() {
      try {
        // Kiểm tra nếu vnwa là một đối tượng rỗng hoặc không có dữ liệu
        if (!this.vnwa || Object.keys(this.vnwa).length === 0) {
          const config = useRuntimeConfig()
          const response = await fetch(config.public.apiBase + '/get-data-web');

          // Kiểm tra xem phản hồi có thành công hay không
          if (response.ok) {
            const data = await response.json();
            this.vnwa = data;
          } else {
            console.error('Network response was not ok:', response.statusText);
          }
        }
      } catch (error) {
        console.error('Error fetching vnwa data:', error);
      }
    }
  }
});
