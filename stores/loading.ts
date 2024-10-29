import { defineStore } from 'pinia'

export const useMyLoadingStore = defineStore({
  id: 'myLoadingStore',
  state: () => ({
    isLoading: false,

   }),
  actions: {
    start() {
      this.isLoading = true;
    },
    stop() {
      this.isLoading = false;
    },
  }
})
