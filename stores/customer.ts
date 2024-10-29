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
    newNotificationsCount: 0 as number,
    token: null as string | null,
    wishlistItems: {} as Record<string, Product>,
    notifications: {}

  }),

  getters: {
    isAuthenticated: (state) => !!state.token,   // Xác định người dùng đã đăng nhập hay chưa
    isWishlist: (state) => {
      return (slug: string) => !!state.wishlistItems[slug]; // Trả về true nếu slug tồn tại trong wishlistItems
    }
  },

  actions: {
    async loadCountNewNotifcation() {
      try {
        if (!this.token) {
          this.clearSession();
          // throw new Error('Chưa có token xác thực');
          return;
        }

        const config = useRuntimeConfig();
        const response = await fetch(`${config.public.apiBase}/count-new-notification`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        });

        if (!response.ok) {

          throw new Error('eroor 1');
        }

        const data = await response.json();
        this.newNotificationsCount = data.countNewNotification;


      } catch (error) {
        this.clearSession();

        // console.error('Fetch count Notfi Error:', error);
      }
    },
    async setIsViewNotifications() {
      if (!this.token) {
        this.clearSession();
        throw new Error('Chưa có token xác thực');
        return;
      }
      const config = useRuntimeConfig();
      try {

        const response = await fetch(`${config.public.apiBase}/set-is-view-notfications`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        if (!response.ok) console.log(data.message);
      } catch (error) {
        this.clearSession();

      }

    },
    async loadNotifications() {
      if (!this.token) {
        this.clearSession();
        throw new Error('Chưa có token xác thực');
        return;
      }
      const config = useRuntimeConfig();

      try {
        const response = await fetch(`${config.public.apiBase}/notifications`, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch wishlist');

        const data = await response.json();

        this.notifications = data;
      } catch (error) {
        console.error('Fetch Wishlist Error:', error);
      }
    },

    async fetchWishlist() {
      if (!this.token) {
        this.clearSession();
        throw new Error('Chưa có token xác thực');
        return;
      }

      const config = useRuntimeConfig();
      try {
        const response = await fetch(`${config.public.apiBase}/wishlists`, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch wishlist');

        const wishlistData = await response.json();

        this.wishlistItems = wishlistData.reduce((acc: Record<string, Product>, product: Product) => {
          acc[product.slug] = product; // Sử dụng slug làm key
          return acc;
        }, {});
      } catch (error) {
        console.error('Fetch Wishlist Error:', error);
      }
    },

    async toggleWishlist(slug: string) {

      const { $toast } = useNuxtApp();
      const config = useRuntimeConfig();
      if (!this.token) {
        $toast.error('Please Login');
        return;
      }

      try {
        const response = await fetch(`${config.public.apiBase}/toggle-wishlist`, {
          method: 'POST', // Sử dụng POST để thêm hoặc xóa
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }), // Gửi slug trong body
        });

        if (!response.ok) throw new Error('Failed to update wishlist');

        if (this.wishlistItems[slug]) {
          delete this.wishlistItems[slug]; // Xóa nếu đã tồn tại
          $toast.info('Product has been removed from your wishlist');
        } else {
          const product: Product = await response.json(); // Lấy thông tin sản phẩm từ response
          this.wishlistItems[slug] = product; // Thêm sản phẩm vào wishlist
          $toast.success('Product has been added to your wishlist');
        }
      } catch (error) {
        console.error('Wishlist Error:', error);
        $toast.error('Something went wrong. Please try again.');
      }
    },



    loadCustomerFromStorage() {
      const cookie = useCookie('token'); // Sử dụng useCookie
      const savedToken = cookie.value; // Lấy token từ cookie
      if (savedToken) {
        this.token = savedToken;
        this.fetchCustomer(); // Lấy thông tin khách hàng với token
      }
    },




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
          throw new Error(errorData.message);
        }

        const data = await response.json();
        this.saveSession(data.token);  // Lưu token vào session
      } catch (error) {
        console.error('Register Error:', error);
        throw error;
      }
    },

    // Đăng nhập và lưu token vào session
    async login(username: string, password: string) {
      const router = useRouter();
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
          $toast.error(errorData.message)
          throw new Error(errorData.message);
        }

        const data = await response.json();
        this.saveSession(data.token);  // Lưu token


      } catch (error) {
        console.error('Login Error:', error);
        throw error;
      }
    },

    async logout() {
      try {
        const config = useRuntimeConfig();
        if (this.token) {
          await fetch(`${config.public.apiBase}/logout`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${this.token}` },
          });
        }
        this.clearSession();  // Xóa dữ liệu khỏi state và cookie
      } catch (error) {
        console.error('Logout Error:', error);
      }
    },

    // Lấy thông tin khách hàng từ server bằng token
    async fetchCustomer() {
      try {
        if (!this.token) {
          throw new Error('Chưa có token xác thực');
          return;
        }
        if (!this.customer) {

          const config = useRuntimeConfig();
          const response = await fetch(`${config.public.apiBase}/customer`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${this.token}`,
            },
          });

          if (!response.ok) {
            this.clearSession();  // Xóa token nếu hết hạn
            throw new Error('Lấy thông tin khách hàng thất bại');
          }

          const customerData = await response.json();
          this.customer = customerData.customer;  // Chỉ lưu tạm trong phiên
        }

      } catch (error) {
        console.error('Fetch Customer Error:', error);
      }
    },

    // Lưu token vào state và cookie
    saveSession(token: string) {
      this.token = token;
      const cookie = useCookie('token'); // Sử dụng cookie
      cookie.value = token; // Lưu token vào cookie
    },

    // Xóa token và thông tin khách hàng khỏi state và cookie
    clearSession() {
      this.token = null;
      this.customer = null;
      const cookie = useCookie('token'); // Sử dụng cookie
      cookie.value = ''; // Xóa token khỏi cookie
    },
  },
});
