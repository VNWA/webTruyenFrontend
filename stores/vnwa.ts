import { defineStore } from 'pinia'

export const useMyVnwaStore = defineStore('vnwa', {
  state: () => ({
    vnwa: {},
    loading: false,
    error: null as string | null,
    lastFetched: null as number | null
  }),
  actions: {
    async fetchVnwaData() {
      try {
        const now = new Date().getTime();
        const ttl = 5 * 60 * 1000; // 5 phút

        if (!this.vnwa || Object.keys(this.vnwa).length === 0 || (this.lastFetched && now - this.lastFetched > ttl)) {
          this.loading = true;
          this.error = null;

          const config = useRuntimeConfig();
          const response = await fetch(config.public.apiBase + '/get-data-web');

          if (response.ok) {
            const data = await response.json();
            this.vnwa = data;
            this.lastFetched = now;
          } else {
            this.error = 'Network response was not ok: ' + response.statusText;
            console.error(this.error);
          }
        }
      } catch (error) {
        this.error = (error as Error).message;
        console.error(this.error);
      } finally {
        this.loading = false;
      }
    }
  }
});
