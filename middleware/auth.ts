// auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
    const customerStore = useCustomerStore();

    // Tải thông tin khách hàng từ localStorage (giả sử loadCustomerFromStorage là bất đồng bộ)
    await customerStore.loadCustomerFromStorage();

    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!customerStore.isAuthenticated) {
        return navigateTo('/login'); // Điều hướng đến trang đăng nhập nếu không được xác thực
    }
});
