import { defineStore } from 'pinia';

interface Customer {
  username: string;
  email: string;
  password: string;
}

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customer: null as Customer | null,  // Tạm giữ thông tin khách hàng khi cần
    token: null as string | null,       // Token phiên đăng nhập
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,  // Xác định người dùng đã đăng nhập hay chưa
  },

  actions: {
    // Load token từ cookie khi ứng dụng khởi chạy
    loadCustomerFromStorage() {
      const cookie = useCookie('token'); // Sử dụng useCookie
      const savedToken = cookie.value; // Lấy token từ cookie
      if (savedToken) {
        this.token = savedToken;
        this.fetchCustomer(); // Lấy thông tin khách hàng với token
      }
    },
    // async sendOtp(email: string) {
    //   try {
    //     const config = useRuntimeConfig();
    //     const response = await fetch(`${config.public.apiBase}/send-otp`, {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ email: email }),
    //     });
    //     if (!response.ok) {
    //       const errorData = await response.json();
    //       throw new Error(errorData.message || 'OTP verification failed.');
    //     }
    //   } catch (error) {
    //     throw error;
    //   }
    // },

    // // Xác thực OTP
    // async verifyOtp(otp: string, email: string) {
    //   try {
    //     const config = useRuntimeConfig();
    //     const response = await fetch(`${config.public.apiBase}/verify-otp`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ email: email, otp: otp }),

    //     });

    //     if (!response.ok) {
    //       const errorData = await response.json();
    //       throw new Error(errorData.message || 'OTP verification failed.');
    //     }

    //   } catch (error) {
    //     throw error;
    //   }
    // },
    // Đăng ký tài khoản khách hàng mới
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
    async login(email: string, password: string) {
      const router = useRouter();
      try {
        const config = useRuntimeConfig();
        const response = await fetch(`${config.public.apiBase}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
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
        if (!this.token) throw new Error('Chưa có token xác thực');
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
          this.customer = customerData;  // Chỉ lưu tạm trong phiên
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
