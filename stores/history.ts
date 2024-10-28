import { defineStore } from 'pinia'

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
    history: [] as Story[]
  }),
  getters: {
    getHistory: (state) => {
      return state.history;
    },
    getLatestStories: (state) => {
      // Sắp xếp danh sách theo timestamp giảm dần (mới nhất trước)
      return [...state.history].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    }
    
  },
  actions: {
    addToHistory(story: Omit<Story, 'viewChapter'>, chapter?: { name: string; slug: string }) {
      const exists = this.history.find(item => item.id === story.id);

      // Tạo đối tượng story với đầy đủ các trường
      const newStory: Story = {
        ...story,
        viewChapter: chapter || { name: '', slug: '' }, // Nếu không có chapter, để trống
        timestamp: Date.now() // Cập nhật timestamp
      };

      if (!exists) {
        // Nếu không tồn tại, thêm mới
        this.history.push(newStory);
      } else {
        // Nếu tồn tại, chỉ cập nhật timestamp và viewChapter
        exists.viewChapter = chapter || { name: '', slug: '' };
        exists.timestamp = Date.now(); // Cập nhật timestamp
      }

      this.saveToLocalStorage();
    },
    clearHistory() {
      this.history = [];
      if (process.client) {
        localStorage.removeItem('history');
      }
    },
    removeFromHistory(storyId: number) {
      this.history = this.history.filter(item => item.id !== storyId);
      this.saveToLocalStorage();
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
    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('history', JSON.stringify(this.history));
      }
    }
  }
});
