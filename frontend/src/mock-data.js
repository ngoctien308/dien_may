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

export const mockComments = [
    {
        comment_id: 1,
        product_id: 1,
        user_id: "user_2abc123def456",
        comment_content: "Sản phẩm rất tốt, giao hàng nhanh. Máy đẹp, chạy mượt mà! Camera chụp ảnh cực kỳ đẹp, màn hình sắc nét.",
        comment_rating: 5,
        created_at: "2025-01-15T10:30:00Z",
        updated_at: "2025-01-15T10:30:00Z"
    },
    {
        comment_id: 2,
        product_id: 1,
        user_id: "user_2xyz789ghi012",
        comment_content: "Chất lượng ổn, giá hơi cao nhưng xứng đáng. Camera chụp đẹp lắm. Pin trâu, dùng cả ngày không lo hết pin.",
        comment_rating: 4,
        created_at: "2025-01-14T14:20:00Z",
        updated_at: "2025-01-14T14:20:00Z"
    },
    {
        comment_id: 3,
        product_id: 1,
        user_id: "user_2mno345pqr678",
        comment_content: "Mình rất hài lòng với sản phẩm này. Pin trâu, màn hình đẹp! Thiết kế sang trọng, cảm giác cầm rất chắc chắn.",
        comment_rating: 5,
        created_at: "2025-01-13T09:15:00Z",
        updated_at: "2025-01-13T09:15:00Z"
    },
    {
        comment_id: 4,
        product_id: 1,
        user_id: "user_2stu901vwx234",
        comment_content: "Máy chạy mượt mà, không bị lag. Camera chụp ảnh rất đẹp, đặc biệt là chế độ chụp đêm. Giá hơi cao nhưng chất lượng xứng đáng.",
        comment_rating: 4,
        created_at: "2025-01-12T16:45:00Z",
        updated_at: "2025-01-12T16:45:00Z"
    },
    {
        comment_id: 5,
        product_id: 1,
        user_id: "user_2yza567bcd890",
        comment_content: "iPhone 15 Pro Max thực sự là một kiệt tác! Hiệu năng vượt trội, camera chuyên nghiệp, thiết kế đẹp mắt. Đáng đồng tiền bát gạo!",
        comment_rating: 5,
        created_at: "2025-01-11T11:30:00Z",
        updated_at: "2025-01-11T11:30:00Z"
    },
    {
        comment_id: 6,
        product_id: 1,
        user_id: "user_2efg123hij456",
        comment_content: "Màn hình Super Retina XDR rất đẹp, màu sắc chân thực. Pin dùng được cả ngày, sạc nhanh. Hệ điều hành iOS mượt mà, không bị lag.",
        comment_rating: 5,
        created_at: "2025-01-10T13:20:00Z",
        updated_at: "2025-01-10T13:20:00Z"
    },
    {
        comment_id: 7,
        product_id: 1,
        user_id: "user_2klm789nop012",
        comment_content: "Thiết kế khung titan rất sang trọng và bền bỉ. Camera 48MP chụp ảnh cực kỳ sắc nét. Giá hơi cao nhưng chất lượng xứng đáng.",
        comment_rating: 4,
        created_at: "2025-01-09T08:15:00Z",
        updated_at: "2025-01-09T08:15:00Z"
    },
    {
        comment_id: 8,
        product_id: 1,
        user_id: "user_2qrs345tuv678",
        comment_content: "Chip A17 Pro mạnh mẽ, chạy game mượt mà không bị lag. Camera chụp ảnh đẹp, đặc biệt là chế độ chụp chân dung. Rất hài lòng với sản phẩm!",
        comment_rating: 5,
        created_at: "2025-01-08T15:45:00Z",
        updated_at: "2025-01-08T15:45:00Z"
    }
]