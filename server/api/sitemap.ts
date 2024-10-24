// Định nghĩa kiểu dữ liệu cho một bài viết
interface Post {
    slug: string;
    updated_at: string | number | Date;
}

// Hàm để tạo sitemap từ dữ liệu lấy được
export default defineSitemapEventHandler(async (e) => {
    // Hàm lấy dữ liệu từ API
    async function fetchData(): Promise<Post[]> {
        const config = useRuntimeConfig();
        const response = await fetch(config.public.apiBase + '/get-data-sitemap');
        const data = await response.json();
        return data;
    }

    const posts = await fetchData();

    // Chuyển đổi dữ liệu thành định dạng phù hợp
    const formattedPosts = posts.map((post: Post) => ({
        _path: `${post.slug}`,
        modifiedAt: new Date(post.updated_at),
    }));

    // Tạo sitemap từ dữ liệu đã được định dạng
    return Promise.all(formattedPosts.map((post) => ({
        loc: post._path,
        lastmod: post.modifiedAt,
    })));
});