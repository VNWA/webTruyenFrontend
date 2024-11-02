import { defineStore } from 'pinia'

export const useMyVnwaStore = defineStore('vnwa', {
  state: () => ({
    vnwa: {}
  }),
  actions: {
    fetchVnwaData() {
      try {
        // if (this.vnwa) {
        const config = useRuntimeConfig()
        const response = fetch(config.public.apiBase + '/get-data-web');
        if (response.ok) {
          const data = response.json();
          this.vnwa = data;
        }
        // }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }
  }
});

