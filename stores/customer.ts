import { defineStore } from 'pinia';

interface Customer {
  username: string;
  email: string;
  password: string;
}

interface Product {
  url_avatar: string;
  name: string;
  slug: string;
}

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customer: null as Customer | null,
    newNotificationsCount: 0,
    token: null as string | null,
    notifications: {},
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    /**
     * Clear toàn bộ session và dữ liệu liên quan.
     */
    clearSession() {
      this.token = null;
      this.customer = null;
      this.newNotificationsCount = 0;
      this.notifications = {};
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token'); // Xóa token khỏi localStorage chỉ khi ở client
      }
    },

    /**
     * Lưu token vào state và localStorage.
     */
    saveSession(token: string) {
      this.token = token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token); // Lưu token vào localStorage chỉ khi ở client
      }else{
        console.log('no')
      }
    },

    /**
     * Load token và thông tin khách hàng từ localStorage khi khởi động.
     */
    loadCustomerFromStorage() {
      if (typeof window !== 'undefined') {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
          this.token = savedToken;
      
        }
      }
    },

    /**
     * Fetch danh sách các dịch vụ đăng nhập xã hội.
     */
    async fetchSocialServices() {
      if (!this.token) return null;

      try {
        const config = useRuntimeConfig();
        const response = await fetch(`${config.public.apiBase}/get-login-social-services`);
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          return null;
        }
      } catch (error) {
        console.error('Fetch Social Services Error:', error);
      }
    },

    /**
     * Lấy thông tin khách hàng từ API.
     */
    async fetchCustomer() {
      if (!this.token) return;

      try {
        const config = useRuntimeConfig();
        const response = await fetch(`${config.public.apiBase}/customer`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });

        if (!response.ok) throw new Error('Token hết hạn');
        const data = await response.json();
        this.customer = data.customer;
      } catch (error) {
        console.error('Fetch Customer Error:', error);
        this.clearSession();
      }
    },

    /**
     * Đăng nhập và lưu token.
     */
    async login(username: string, password: string) {
      const { $toast } = useNuxtApp();
      try {
        const config = useRuntimeConfig();
        const response = await fetch(`${config.public.apiBase}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          $toast.error(errorData.message);
          throw new Error(errorData.message);
        }

        const data = await response.json();
        this.saveSession(data.token);
      } catch (error) {
        console.error('Login Error:', error);
        throw error;
      }
    },

    /**
     * Đăng xuất và xóa session.
     */
    async logout() {
      try {
        const config = useRuntimeConfig();
        if (this.token) {
          await fetch(`${config.public.apiBase}/logout`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${this.token}` },
          });
        }
        this.clearSession();
      } catch (error) {
        console.error('Logout Error:', error);
      }
    },

    /**
     * Lấy danh sách thông báo mới.
     */
    async loadCountNewNotification() {
      if (!this.token) {
        return;
      }

      try {
        const config = useRuntimeConfig();
        const response = await fetch(`${config.public.apiBase}/count-new-notification`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });

        if (!response.ok) throw new Error('Failed to fetch notifications');
        const data = await response.json();
        this.newNotificationsCount = data.countNewNotification;
      } catch (error) {
        console.error('Notification Fetch Error:', error);
      }
    },

    /**
     * Đăng ký khách hàng mới.
     */
    async register(customerData: Omit<Customer, 'token'> & { password_confirmation: string }) {
      const router = useRouter();
      try {
        const config = useRuntimeConfig();
        const response = await fetch(`${config.public.apiBase}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(customerData),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw errorData;
        }
        const data = await response.json();
        this.saveSession(data.token);  // Lưu token vào session
      } catch (error) {
        console.error('Register Error:', error);
        throw error;
      }
    },

    /**
     * Đánh dấu thông báo là đã xem.
     */
    async setIsViewNotifications() {
      if (!this.token) {
        return;
      }

      try {
        const config = useRuntimeConfig();
        await fetch(`${config.public.apiBase}/set-is-view-notfications`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${this.token}` },
        });
      } catch (error) {
        console.error('Set View Notification Error:', error);
      }
    },

    /**
     * Lấy danh sách thông báo.
     */
    async loadNotifications() {
      if (!this.token) {
        return;
      }

      try {
        const config = useRuntimeConfig();
        const response = await fetch(`${config.public.apiBase}/notifications`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });

        if (!response.ok) throw new Error('Failed to fetch notifications');
        this.notifications = await response.json();
      } catch (error) {
        console.error('Fetch Notifications Error:', error);
      }
    },

    /**
     * Lấy danh sách sản phẩm yêu thích từ API.
     */
    async fetchWishlist() {
      if (!this.token) {
        return;
      }

      try {
        const config = useRuntimeConfig();
        const response = await fetch(`${config.public.apiBase}/wishlists`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });

        if (!response.ok) throw new Error('Failed to fetch wishlist');

        const wishlistData = await response.json();
        return wishlistData;
      } catch (error) {
        console.error('Fetch Wishlist Error:', error);
      }
    },

    /**
     * Kiểm tra xem sản phẩm có trong danh sách yêu thích không.
     */
    async checkProductIsWishlist(slug: string) {
      if (!this.token) {
        console.log('no load check because not login')
        return false;
      }

      try {
        const config = useRuntimeConfig();
        const response = await fetch(`${config.public.apiBase}/check-product-is-wishlist/` + slug, {
          headers: { Authorization: `Bearer ${this.token}` },
        });

        if (!response.ok){
          console.log(response)
          return false
        } 
        const status = await response.json();
        return status.status;
      } catch (error) {
        console.error('Fetch Wishlist Error:', error);
        return false;
      }
    },

    /**
     * Thêm hoặc xóa sản phẩm khỏi danh sách yêu thích.
     */
    async toggleWishlist(slug: string) {
      const { $toast } = useNuxtApp();
      if (!this.token) {
        $toast.error('Please Login');
        return;
      }

      try {
        const config = useRuntimeConfig();
        const response = await fetch(`${config.public.apiBase}/toggle-wishlist`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
        });

        if (!response.ok){
          console.log(response)
          return false
        } 
        const data = await response.json();

        $toast.success(data.message);

      } catch (error) {
        console.error('Toggle Wishlist Error:', error);
        $toast.error('Something went wrong. Please try again.');
      }
    },
  },
});
