-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 19, 2025 lúc 11:03 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `dien_may`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'Điện thoại'),
(2, 'Laptop'),
(4, 'Âm thanh'),
(5, 'Màn hình');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `comment_content` varchar(1000) NOT NULL,
  `comment_rating` int(11) DEFAULT NULL,
  `user_id` varchar(100) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `comments`
--

INSERT INTO `comments` (`comment_id`, `comment_content`, `comment_rating`, `user_id`, `product_id`, `created_at`) VALUES
(4, 'KOKOK', 5, 'user_34669WZ8c9zAyTK618AmrMtPIkT', 14, '2025-10-19 08:45:20'),
(5, 'OK', 5, 'user_34669WZ8c9zAyTK618AmrMtPIkT', 12, '2025-10-19 08:46:41'),
(6, 'spam à', 3, 'user_34669WZ8c9zAyTK618AmrMtPIkT', 12, '2025-10-19 08:46:45');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `liked_products`
--

CREATE TABLE `liked_products` (
  `like_id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `product_id` int(11) NOT NULL,
  `liked_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_price` decimal(10,2) NOT NULL,
  `product_discount` int(11) DEFAULT 0,
  `specifications` text DEFAULT NULL,
  `description` varchar(500) NOT NULL,
  `category_id` int(11) NOT NULL,
  `image1` varchar(100) NOT NULL,
  `image2` varchar(100) NOT NULL,
  `image3` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_price`, `product_discount`, `specifications`, `description`, `category_id`, `image1`, `image2`, `image3`) VALUES
(12, 'Điện thoại Samsung Galaxy S25 Plus', 20900000.00, 10, 'Độ phân giải camera:Camera siêu rộng 12MP,Bộ nhớ trong:256GB,Mạng di động:5G,Số khe SIM:2 nano SIM + Esim,Hệ điều hành:Android 15', 'Samsung Galaxy S25 Plus là một trong những mẫu flagship mới nhất năm 2025 của Samsung, mang đến sự nâng cấp toàn diện từ thiết kế, màn hình, hiệu năng, camera đến công nghệ AI thông minh. Với những cải tiến đáng giá, Galaxy S25 Plus hứa hẹn sẽ là lựa chọn hoàn hảo cho những ai tìm kiếm một chiếc smartphone mạnh mẽ, thời thượng và đa năng. Galaxy S25 Plus sở hữu màn hình Dynamic AMOLED 2X 6.7 inch với độ phân giải QHD+ (3120 x 1440 pixels), hỗ trợ tần số quét 120Hz và độ sáng lên đến 2600 nits, m', 1, 'http://localhost:3000/uploads/1760765431943-samsungs25.jpg', 'http://localhost:3000/uploads/1760765431947-samsung25-2.jpg', 'http://localhost:3000/uploads/1760765431948-sss25-3.jpg'),
(14, 'Màn hình Edra EGM27F100H (27 inch/FHD/IPS/100Hz/1ms) - Chính hãng', 1984000.00, 0, 'Kích thước màn hình:27 inch,Độ phân giải:Full HD (1920x1080),Tấm nền:IPS,Độ sáng:250 cd/m²', 'Màn hình Edra EGM27F100H là một trong những màn hình tầm trung được thiết kế để đáp ứng nhu cầu của nhiều đối tượng khách hàng, từ nhân viên văn phòng đến game thủ phổ thông. Với kích thước 27 inch, độ phân giải Full HD (1920x1080) và tấm nền IPS, màn hình này mang đến hình ảnh sắc nét, màu sắc trung thực cùng góc nhìn rộng. Bên cạnh đó, tần số quét 100Hz giúp hình ảnh hiển thị mượt mà hơn, hỗ trợ tốt cho các tác vụ đồ họa nhẹ hoặc chơi game giải trí.', 5, 'http://localhost:3000/uploads/1760860164597-man1.jpg', 'http://localhost:3000/uploads/1760860164598-man2.jpg', 'http://localhost:3000/uploads/1760860164600-man3.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_versions`
--

CREATE TABLE `product_versions` (
  `version_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `version_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_versions`
--

INSERT INTO `product_versions` (`version_id`, `product_id`, `version_name`) VALUES
(24, 12, 'Xanh dương đậm'),
(25, 12, 'Xanh lá'),
(26, 12, 'Xanh da trời'),
(28, 14, 'Đen');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `liked_products`
--
ALTER TABLE `liked_products`
  ADD PRIMARY KEY (`like_id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `products_category_fk` (`category_id`);

--
-- Chỉ mục cho bảng `product_versions`
--
ALTER TABLE `product_versions`
  ADD PRIMARY KEY (`version_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `liked_products`
--
ALTER TABLE `liked_products`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `product_versions`
--
ALTER TABLE `product_versions`
  MODIFY `version_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `liked_products`
--
ALTER TABLE `liked_products`
  ADD CONSTRAINT `liked_products_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_fk` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `product_versions`
--
ALTER TABLE `product_versions`
  ADD CONSTRAINT `product_versions_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
