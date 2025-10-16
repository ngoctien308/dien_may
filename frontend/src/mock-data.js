export const sampleProducts = [
    {
        id: 1,
        name: "Iphone 15 Pro Max",
        price: 199000,
        images: ["/anh1.jpg", "/anh2.jpg", "/anh3.jpg"],
        discount: 40,
        description:
            "iPhone 15 Pro Max là chiếc điện thoại cao cấp nhất của Apple với chip A17 Pro mạnh mẽ, camera 48MP chuyên nghiệp, màn hình Super Retina XDR 6.7 inch và khung titan bền bỉ. Thiết kế sang trọng, hiệu năng vượt trội cùng hệ sinh thái iOS hoàn hảo.",
        variants: [
            {
                name: "Dung lượng",
                options: ["64GB", "128GB", "256GB", "512GB"],
            },
            {
                name: "Màu sắc",
                options: ["Titan Tự Nhiên", "Titan Xanh", "Titan Trắng", "Titan Đen"],
            },
        ]
    }
]

export const reviews = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        rating: 5,
        date: "15/01/2025",
        comment: "Sản phẩm rất tốt, giao hàng nhanh. Máy đẹp, chạy mượt mà!",
    },
    {
        id: 2,
        name: "Trần Thị B",
        rating: 4,
        date: "10/01/2025",
        comment: "Chất lượng ổn, giá hơi cao nhưng xứng đáng. Camera chụp đẹp lắm.",
    },
    {
        id: 3,
        name: "Lê Văn C",
        rating: 5,
        date: "05/01/2025",
        comment: "Mình rất hài lòng với sản phẩm này. Pin trâu, màn hình đẹp!",
    },
]