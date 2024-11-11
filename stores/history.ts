import { defineStore } from 'pinia';

export interface Story {
  id: number;
  name: string;
  slug: string;
  url_avatar: string;
  viewChapter: {
    name: string;
    slug: string;
  };
  timestamp?: number; // Thêm thuộc tính để ghi lại thời gian xem
}

export const useMyHistoryStore = defineStore({
  id: 'myHistoryStore',
  state: () => ({
    history: [] as Story[],
    viewedChapters: [] as string[] // Mảng chứa các URL của chapter đã xem
  }),
  getters: {
    isChapterViewed: (state) => (chapterUrl: string) => {
      return state.viewedChapters.includes(chapterUrl);
    },
    getHistory: (state) => state.history,
    getLatestStories: (state) => {
      return [...state.history].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    }
  },
  actions: {
    addChapterUrl(chapterUrl: string) {
      if (!this.viewedChapters.includes(chapterUrl)) {
        this.viewedChapters.push(chapterUrl);
        this.saveChapterViewToLocalStorage();
      }
    },
    loadChapterViewFromLocalStorage() {
      if (process.client) {
        try {
          const storedChapters = JSON.parse(localStorage.getItem('viewedChapters') || '[]');
          this.viewedChapters = storedChapters;
        } catch (error) {
          console.error('Failed to load viewed chapters from localStorage:', error);
        }
      }
    },
    saveChapterViewToLocalStorage() {
      if (process.client) {
        localStorage.setItem('viewedChapters', JSON.stringify(this.viewedChapters));
      }
    },
    addToHistory(story: Omit<Story, 'viewChapter'>, chapter?: { name: string; slug: string }) {
      const exists = this.history.find(item => item.id === story.id);
      const newStory: Story = {
        ...story,
        viewChapter: chapter || { name: '', slug: '' },
        timestamp: Date.now()
      };

      if (!exists) {
        this.history.push(newStory);
      } else {
        exists.viewChapter = chapter || { name: '', slug: '' };
        exists.timestamp = Date.now();
      }

      this.saveHistoryToLocalStorage();
    },
    clearHistory() {
      this.history = [];
      if (process.client) {
        localStorage.removeItem('history');
      }
    },
    removeFromHistory(storyId: number) {
      this.history = this.history.filter(item => item.id !== storyId);
      this.saveHistoryToLocalStorage();
    },
    loadHistory() {
      if (process.client) {
        try {
          const historyFromStorage: Story[] = JSON.parse(localStorage.getItem('history') || '[]');
          this.history = historyFromStorage;
        } catch (e) {
          console.error('Failed to load history from localStorage:', e);
        }
      }
    },
    saveHistoryToLocalStorage() {
      if (process.client) {
        localStorage.setItem('history', JSON.stringify(this.history));
      }
    },
    loadFromLocalStorage() {
      this.loadChapterViewFromLocalStorage();
      this.loadHistory();
    }
  }
});
