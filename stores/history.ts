// stores/myHistoryStore.ts
import { defineStore } from 'pinia'

export interface Story {
  id: number;
  title: string;
  slug: string;
  image: string;
}

export const useMyHistoryStore = defineStore({
  id: 'myHistoryStore',
  state: () => ({ 
    history: [] as Story[]
  }),
  actions: {
    addToHistory(story: Story) {
      const exists = this.history.some(item => item.id === story.id)
      if (!exists) {
        this.history.push(story)
        this.saveToLocalStorage()
      }
    },
    clearHistory() {
      this.history = []
      if (process.client) {
        localStorage.removeItem('history')
      }
    },
    loadHistory() {
      if (process.client) {
        const historyFromStorage: Story[] = JSON.parse(localStorage.getItem('history') || '[]')
        this.history = historyFromStorage
      }
    },
    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('history', JSON.stringify(this.history))
      }
    }
  }
})
