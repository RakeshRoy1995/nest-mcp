-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 30, 2026 at 02:11 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mcp_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`) VALUES
(1, 'Electronics', 'Electronic gadgets and devices'),
(2, 'Books', 'Books and literature'),
(3, 'Clothing', 'Men and Women clothing'),
(4, 'Home & Kitchen', 'Home appliances and kitchenware'),
(5, 'Toys & Games', 'Toys and games for kids'),
(6, 'Sports', 'Sports gear and equipment'),
(7, 'Beauty', 'Beauty and personal care'),
(8, 'Automotive', 'Car accessories and tools'),
(9, 'Health', 'Health and wellness products'),
(10, 'Stationery', 'Office and school stationery');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `categoryId` int(11) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `categoryId`, `stock`) VALUES
(75, 'Smartphone', 699.99, 'Latest smartphone model', 1, 50),
(76, 'Laptop', 1200.00, 'High performance laptop', 1, 30),
(77, 'Headphones', 199.99, 'Noise-cancelling headphones', 1, 100),
(78, 'Tablet', 450.00, '10 inch tablet', 1, 40),
(79, 'E-reader', 129.99, 'Digital book reader', 2, 70),
(80, 'Novel: The Great Adventure', 19.99, 'Exciting fiction novel', 2, 200),
(81, 'Textbook: Physics 101', 79.99, 'Educational textbook', 2, 150),
(82, 'T-Shirt', 25.00, 'Cotton t-shirt', 3, 300),
(83, 'Jeans', 45.00, 'Denim jeans', 3, 250),
(84, 'Dress', 65.00, 'Summer dress', 3, 100),
(85, 'Blender', 89.99, 'Kitchen blender', 4, 80),
(86, 'Microwave', 150.00, 'Compact microwave oven', 4, 60),
(87, 'Coffee Maker', 79.99, 'Automatic coffee maker', 4, 90),
(88, 'Action Figure', 29.99, 'Superhero figure', 5, 150),
(89, 'Puzzle 1000 pieces', 19.99, 'Jigsaw puzzle', 5, 200),
(90, 'Football', 39.99, 'Official size football', 6, 120),
(91, 'Tennis Racket', 89.99, 'Professional racket', 6, 50),
(92, 'Lipstick', 15.99, 'Matte lipstick', 7, 180),
(93, 'Shampoo', 12.50, 'Hair shampoo', 7, 200),
(94, 'Car Vacuum', 49.99, 'Portable car vacuum cleaner', 8, 70),
(95, 'First Aid Kit', 29.99, 'Emergency kit', 9, 100),
(96, 'Vitamins Pack', 24.99, 'Daily vitamins', 9, 90),
(97, 'Notebook', 5.99, 'A5 notebook', 10, 300),
(98, 'Pen Set', 9.99, 'Pack of 5 pens', 10, 500);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_8b0be371d28245da6e4f4b6187` (`name`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ff56834e735fa78a15d0cf21926` (`categoryId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK_ff56834e735fa78a15d0cf21926` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
