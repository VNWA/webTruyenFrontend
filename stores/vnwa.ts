import { defineStore } from 'pinia'

export const useMyVnwaStore = defineStore('vnwa', {
  state: () => ({
    vnwa: {}
  }),
  actions: {
    async fetchVnwaData() {
      try {
        const config = useRuntimeConfig()
        const response = await fetch(config.public.apiBase + '/get-data-web');
        const data = await response.json();
        this.vnwa = data;
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }
  }
});

