export default defineNuxtRouteMiddleware(async (to, from) => {
    const customerStore = useCustomerStore();
    // Tải thông tin khách hàng từ localStorage
    customerStore.loadCustomerFromStorage();

    // Chờ cho việc tải token hoàn tất (nếu cần)
    await new Promise(resolve => setTimeout(resolve, 0)); // Chờ để đảm bảo state đã được cập nhật

    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!customerStore.isAuthenticated) {
        return navigateTo('/login'); // Điều hướng đến trang đăng nhập
    }
});