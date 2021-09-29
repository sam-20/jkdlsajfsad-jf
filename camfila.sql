-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 29, 2021 at 12:21 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `camfila`
--

-- --------------------------------------------------------

--
-- Table structure for table `commentedmessages`
--

CREATE TABLE `commentedmessages` (
  `row_id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `commentmsg_id` bigint(20) DEFAULT NULL,
  `commentedmsg_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `commentedmessages`
--

INSERT INTO `commentedmessages` (`row_id`, `user_id`, `commentmsg_id`, `commentedmsg_id`) VALUES
(1, 2, 21, 15),
(2, 2, 22, 14),
(3, 3, 23, 22),
(4, 2, 24, 23),
(5, 1, 25, 24),
(6, 3, 26, 24),
(7, 2, 27, 22),
(10, 2, 30, 14),
(11, 2, 31, 30),
(12, 2, 32, 31),
(13, 2, 33, 22),
(14, 2, 34, 22),
(15, 2, 35, 34),
(16, 2, 36, 14),
(17, 2, 37, 29),
(18, 2, 38, 37),
(19, 1, 40, 39),
(20, 3, 41, 40),
(21, 1, 42, 41),
(22, 3, 44, 43),
(23, 2, 45, 44),
(24, 2, 47, 46),
(25, 2, 48, 47),
(26, 2, 49, 48),
(27, 2, 51, 50),
(28, 2, 53, 52),
(29, 2, 54, 46),
(30, 2, 55, 54),
(31, 2, 56, 54),
(32, 2, 57, 56),
(33, 2, 58, 57),
(34, 2, 59, 58),
(39, 2, 72, 71),
(40, 2, 73, 71),
(41, 2, 74, 72),
(42, 4, 77, 76),
(43, 4, 78, 75),
(44, 4, 79, 76),
(45, 2, 80, 76),
(46, 2, 81, 75),
(47, 2, 82, 81),
(48, 2, 84, 83),
(49, 2, 85, 75),
(50, 2, 87, 83),
(51, 2, 88, 87),
(52, 4, 89, 76),
(53, 2, 90, 78),
(54, 1, 91, 78),
(55, 3, 92, 78),
(56, 2, 93, 91),
(57, 2, 94, 91),
(58, 2, 101, 100),
(59, 1, 110, 91),
(60, 2, 112, 111),
(61, 3, 113, 111),
(62, 2, 114, 113),
(63, 2, 115, 113),
(64, 2, 116, 113),
(65, 2, 118, 117),
(66, 2, 119, 117),
(67, 1, 120, 117),
(68, 2, 121, 117),
(69, 2, 122, 117),
(70, 2, 123, 117),
(71, 2, 124, 120),
(72, 2, 125, 117),
(73, 2, 126, 117),
(74, 2, 127, 120),
(75, 2, 128, 127),
(76, 2, 130, 129),
(77, 3, 131, 129),
(78, 3, 132, 129),
(79, 2, 134, 133),
(80, 2, 135, 133),
(81, 3, 136, 133),
(82, 3, 137, 127),
(83, 3, 138, 127),
(84, 3, 139, 76),
(85, 3, 140, 129),
(86, 2, 141, 111),
(87, 2, 145, 143),
(88, 4, 146, 142),
(89, 1, 147, 144),
(90, 4, 148, 144),
(91, 4, 149, 144),
(95, 2, 158, 139),
(96, 2, 159, 139),
(97, 2, 160, 139),
(98, 2, 161, 76),
(99, 2, 162, 76),
(100, 2, 163, 76),
(101, 2, 164, 156),
(102, 2, 165, 158),
(103, 6, 166, 147),
(104, 6, 167, 166),
(105, 8, 0, 193),
(106, 8, 195, 193),
(107, 8, 196, 193),
(108, 8, 0, 193),
(109, 8, 197, 196),
(110, 8, 198, 196),
(111, 8, 199, 196),
(112, 8, 200, 198),
(113, 9, 204, 196),
(115, 2, 219, 218),
(118, 5, 224, 223),
(119, 2, 225, 224),
(121, 2, 231, 230),
(122, 2, 232, 230),
(123, 1, 234, 233),
(124, 1, 235, 233),
(125, 1, 236, 235),
(126, 1, 237, 236),
(127, 1, 238, 236),
(128, 1, 239, 236),
(129, 1, 240, 236),
(130, 2, 244, 242),
(131, 2, 271, 269),
(132, 2, 273, 272),
(133, 2, 274, 248),
(134, 2, 279, 278),
(135, 2, 299, 298),
(136, 2, 302, 301),
(137, 2, 303, 301),
(138, 2, 303, 275),
(139, 1, 304, 279),
(140, 2, 321, 320),
(141, 2, 323, 322),
(142, 2, 324, 322),
(143, 6, 328, 326),
(144, 6, 330, 327),
(145, 6, 333, 301),
(146, 6, 334, 326),
(147, 6, 335, 326),
(148, 6, 336, 279),
(149, 2, 339, 338);

-- --------------------------------------------------------

--
-- Table structure for table `dm`
--

CREATE TABLE `dm` (
  `dm_msg_id` bigint(20) NOT NULL,
  `loggedinuser_id` bigint(20) DEFAULT NULL,
  `user2_id` bigint(20) DEFAULT NULL,
  `dm_msg` text DEFAULT NULL,
  `dm_msg_media` text DEFAULT NULL,
  `dm_audio_recorded` text DEFAULT NULL,
  `dm_audio_name` text DEFAULT NULL,
  `dm_audio_duration` text DEFAULT NULL,
  `dm_video` text DEFAULT NULL,
  `dm_video_thumbnail` text DEFAULT NULL,
  `dm_file_name` text DEFAULT NULL,
  `dm_file_path` text DEFAULT NULL,
  `dm_file_mime_type` text DEFAULT NULL,
  `dm_file_size` text DEFAULT NULL,
  `dm_msg_time` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dm`
--

INSERT INTO `dm` (`dm_msg_id`, `loggedinuser_id`, `user2_id`, `dm_msg`, `dm_msg_media`, `dm_audio_recorded`, `dm_audio_name`, `dm_audio_duration`, `dm_video`, `dm_video_thumbnail`, `dm_file_name`, `dm_file_path`, `dm_file_mime_type`, `dm_file_size`, `dm_msg_time`) VALUES
(1, 11, 13, 'yo james', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10:21'),
(2, 13, 12, 'hi may', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10:21'),
(3, 13, 11, 'scotty wosop', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10:22'),
(4, 11, 13, 'cool ur end?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10:23'),
(5, 13, 12, 'u\'d there?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:50'),
(6, 13, 12, 'hellooooooooooooooooo!', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:51'),
(10, 12, 13, 'hi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:54'),
(11, 12, 13, 'how?\nlol', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:54'),
(12, 13, 12, 'im james', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:55'),
(13, 12, 13, 'im mary', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:55'),
(14, 13, 11, 'adey bro', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:10'),
(15, 11, 13, 'so when u go go ?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:10'),
(16, 13, 11, 'maybe today', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:10'),
(17, 13, 11, 'or moro after the paper  anknow sure', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:10'),
(18, 13, 11, 'why u dey biz??', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:10'),
(19, 11, 13, 'oh notin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:10'),
(20, 13, 11, 'stubm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:12'),
(21, 13, 11, 'asdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:12'),
(22, 11, 13, 'im scotty\n', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:20'),
(23, 11, 13, 'im scotty ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:20'),
(24, 11, 13, 'im scotty', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:20'),
(25, 13, 11, 'im james', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:20'),
(26, 13, 11, 'im james', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:20'),
(27, 13, 11, 'i am james', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:20'),
(28, 11, 13, 'i am scotty parker', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:21'),
(29, 11, 13, 'so when u go go?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:21'),
(30, 13, 11, 'maybe today', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:22'),
(31, 13, 11, 'or moro after the paper', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:22'),
(32, 13, 11, 'why u dey biz?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:22'),
(33, 11, 13, 'oh notin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:22'),
(34, 13, 11, 'ah this ting they fuckup  0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:22'),
(35, 11, 13, 'u see erhn?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:22'),
(36, 13, 11, 'damn', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:26'),
(37, 13, 11, 'how canwe work it out', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:35'),
(38, 13, 11, 'how?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:36'),
(39, 13, 11, 'what??', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:36'),
(40, 13, 11, 'how can we work it out?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:41'),
(41, 13, 3, 'yo sammy yestee u go joshua ein der?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:42'),
(42, 13, 1, 'mari', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:52'),
(43, 13, 4, 'ah?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:53'),
(44, 13, 4, 'jvh', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:55'),
(45, 13, 5, 'yo ray', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23:44'),
(46, 2, 4, 'shous', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23:50'),
(47, 2, 11, 'yooooo scott', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23:51'),
(48, 4, 5, 'asd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23:55'),
(49, 4, 2, 'yeah wosoop', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23:56'),
(50, 13, 2, 'yo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23:56'),
(51, 13, 6, 'mike phelan ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23:57'),
(52, 13, 12, 'nice to meet u mary\nbeen a long time', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:00'),
(53, 13, 1, 'mariaaaaaaaaa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:02'),
(54, 13, 6, 'lol', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:04'),
(55, 2, 8, 'yo jeff', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:17'),
(56, 2, 1, 'tarkowski', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11:20'),
(57, 1, 2, 'yes?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11:20'),
(59, 2, 1, 'sdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11:21'),
(60, 2, 1, 'sdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11:21'),
(61, 2, 1, 'fsdffcsd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11:21'),
(63, 1, 2, 'okay\nwhi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11:21'),
(64, 1, 2, 'now', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11:21'),
(66, 2, 11, 'yes', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:07'),
(67, 1, 2, 'what?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:16'),
(68, 1, 2, 'ag', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:16'),
(69, 1, 2, 'lk', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:18'),
(70, 2, 11, 'm,', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:18'),
(71, 1, 2, 'sfd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:18'),
(73, 1, 2, 'ahhhhhh', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:18'),
(74, 1, 2, 'fsd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:18'),
(75, 2, 1, 'fd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:19'),
(76, 2, 1, 'sdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:19'),
(77, 2, 1, 'shit', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:34'),
(78, 2, 1, 'good', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:34'),
(79, 11, 13, 'dont know mate', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:37'),
(80, 11, 13, 'know whay', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:38'),
(81, 11, 13, 'fasd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:38'),
(82, 11, 13, 'afsdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:39'),
(83, 11, 13, 'asd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:39'),
(84, 11, 13, 'asdfasfffasdfa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:39'),
(85, 11, 13, 'adsdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:39'),
(86, 13, 11, 'lol', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:40'),
(87, 11, 13, '??', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:41'),
(88, 11, 13, 'yo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:54'),
(89, 13, 11, 'yeah wosop', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:54'),
(90, 13, 11, 'h', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:58'),
(91, 13, 11, 'jk', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:58'),
(92, 11, 13, 'damn', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:02'),
(93, 11, 13, '  n ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:10'),
(94, 11, 13, 'jj        klj', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:10'),
(95, 11, 13, 'lk', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:10'),
(96, 11, 13, 'me', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:20'),
(97, 11, 13, 'yes you', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:20'),
(98, 11, 13, 'dgf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:21'),
(99, 11, 13, ',.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:21'),
(100, 11, 13, '\'', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:21'),
(101, 11, 13, ',..,', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:21'),
(102, 11, 13, 'kj', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:22'),
(103, 13, 12, 'nice to meet u mary been a long time yeah really long', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:58'),
(104, 13, 12, 'nice to meet u mary been a very long time yeah really really long', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:59'),
(105, 2, 1, 'asdjkl', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:14'),
(106, 2, 1, 'sdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:14'),
(107, 2, 1, 'youus', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:14'),
(109, 2, 1, 'asdfjf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:24'),
(110, 2, 4, 'chale a base \nsakov midsem dden a make slwo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '22:30'),
(111, 2, 8, 'i just died so what?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '19:37'),
(112, 2, 8, 'zombie zombie e e e', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '19:38'),
(113, 2, 1, 'ive got these scars', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11:38'),
(114, 1, 2, 'remind me to forget', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11:38'),
(115, 1, 2, 'what?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:23'),
(116, 2, 1, 'thank God', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:23'),
(117, 2, 1, 'yo Mandy', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:23'),
(118, 1, 2, 'yeah wosop', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:23'),
(119, 2, 1, 'a do the something la!', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:24'),
(120, 1, 2, 'yo blinks', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:24'),
(122, 2, 1, 'allllllright!', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:25'),
(123, 2, 1, 'go', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:26'),
(124, 1, 2, 'where?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:26'),
(125, 1, 2, 'fas', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:26'),
(126, 1, 2, 'fsd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:27'),
(129, 2, 1, 'la sl la lsa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:28'),
(130, 11, 13, 'pills and potions', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '18:30'),
(131, 11, 2, 'wasnt ungreatful', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '18:30'),
(132, 1, 11, 'hi ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10:13'),
(133, 11, 1, 'hey', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10:13'),
(134, 1, 11, 'what\'s up?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10:13'),
(135, 1, 11, 'chalee notin better', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11:47'),
(136, 5, 11, 'baby!', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11:49'),
(137, 5, 11, 'lalalalaa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11:49'),
(138, 5, 11, 'forgive me', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11:56'),
(139, 5, 11, 'new love', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11:57'),
(140, 5, 11, 'it comes back to u ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11:58'),
(141, 5, 11, 'it comes back to u', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:00'),
(142, 5, 11, 'ee', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:02'),
(143, 5, 11, 'ah', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:04'),
(144, 5, 11, 'raindere', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:04'),
(145, 5, 11, 'whoa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:05'),
(146, 5, 11, 'whoa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:09'),
(147, 5, 11, 'common', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:09'),
(148, 4, 11, 'reality holes', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:16'),
(149, 4, 11, 'shotop', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:18'),
(150, 4, 11, 'genuine', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:30'),
(151, 15, 11, 'u better be good', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:35'),
(152, 16, 11, 'pleasae dont wake em', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:39'),
(154, 16, 11, 'thikn', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:46'),
(155, 16, 11, 'who', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:48'),
(156, 16, 11, 'this one\'s for me', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:49'),
(159, 16, 11, 'yeah', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:50'),
(160, 16, 11, 'only in summer time', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:51'),
(161, 6, 11, 'tragic endings', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:53'),
(162, 6, 11, 'jh', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:03'),
(163, 6, 11, 'asdfghj', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:03'),
(164, 6, 11, 'koko', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:06'),
(165, 6, 11, 'okay', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:06'),
(166, 6, 11, 'yo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:03'),
(167, 6, 11, 'the night is still young', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:09'),
(168, 6, 11, 'thie', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:11'),
(169, 6, 11, 'what the fuck', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:11'),
(170, 11, 6, 'yes!!!!!!!!!!!!!!!!!!!!!!!!!!!!', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:11'),
(171, 6, 11, 'thank God', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:11'),
(172, 11, 6, 'ah', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:11'),
(173, 6, 11, 'lol', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:11'),
(174, 6, 11, 'the night is t', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:12'),
(175, 6, 11, 'oh', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:12'),
(176, 6, 11, 'good', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:12'),
(177, 6, 11, 'afsd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:13'),
(178, 11, 6, 'the night is still youn', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:15'),
(179, 6, 11, 'and so are we', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:15'),
(180, 6, 11, 'sadf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:30'),
(181, 6, 11, 'so are we', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:31'),
(182, 6, 11, 'sdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:31'),
(183, 6, 11, 'so are wer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:35'),
(184, 6, 11, 'by', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:36'),
(185, 11, 6, 'yo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:37'),
(186, 6, 11, 'yea wosop', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '00:37'),
(187, 6, 11, 'sdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '01:32'),
(188, 2, 11, 'jkldsjfas;klfjdasjfsf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '22:07'),
(189, 11, 2, 'pofjasd;flasjfalsjflsfn', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '22:07'),
(190, 2, 11, 'eeeeeeeeeeee', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '22:07'),
(191, 11, 2, 'fasd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '01:02'),
(192, 2, 11, 'fsda', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '01:02'),
(193, 16, 2, 'tonight i\'d call u ', 'messagemedia/msg_media14-04-49.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '01:05'),
(194, 2, 4, 'pills and potions', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:17'),
(195, 2, 4, '  ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23:18'),
(196, 2, 16, 'd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23:53'),
(197, 2, 16, 'fsdadfsfsddf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11:34'),
(198, 2, 16, 'dfgs', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11:38'),
(199, 2, 16, 'a;jldfaj;df;sd; fj;asfdkljf;ajfdkljfaj;fkjskdfjasdklfa;jfklasfja;dklfjajfask;fjsdjfaskfthe name of my school', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11:46'),
(200, 2, 16, 'aaaaaaakllaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaremind me to forget \ngot i tall', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '16:15'),
(201, 2, 16, 'forget', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '16:30'),
(203, 2, 1, 'oo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '16:32'),
(204, 2, 1, 'wall fof fdsa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '16:32'),
(205, 2, 1, 'chale wosop', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '16:33'),
(206, 2, 1, 'scars', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '16:34'),
(208, 2, 1, 'white thrash party !', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '16:48'),
(209, 2, 16, '', 'messagemedia/msg_media14-04-49.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '16:48'),
(210, 2, 16, 'afaf', 'messagemedia/msg_media14-08-11.jpg\r\n', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '17:10'),
(214, 2, 16, 'fds', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '02:15'),
(216, 2, 16, 'you', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '02:17'),
(218, 2, 1, 'need ur therapy!', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '02:22'),
(221, 2, 13, '', 'dmmessagemedia/msg_media02-54-47.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '02:54'),
(223, 13, 2, 'ookay', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '02:59'),
(224, 2, 1, 'lets make memory\ntoday', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '03:17'),
(226, 2, 13, '', 'dmmessagemedia/msg_media08-51-41.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '08:51'),
(228, 16, 2, 'nu\'in', 'dmmessagemedia/msg_media09-06-09.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '09:06'),
(229, 16, 2, '', 'dmmessagemedia/msg_media09-06-27.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '09:06'),
(232, 2, 1, 'a\nb', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '02:11'),
(233, 2, 1, 'a\nb', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '02:11'),
(235, 2, 1, 'a\nb', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '02:12'),
(236, 2, 1, 'a\nb', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '02:13'),
(237, 2, 1, 'a\nb', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '02:13'),
(238, 2, 1, 'fsdfa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '02:14'),
(239, 1, 13, 'yjhf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '17:07'),
(240, 2, 8, 'sdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '01:53'),
(241, 2, 8, 'aa\naa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '01:53'),
(242, 2, 8, 'boy o boy\nyes', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '01:54'),
(243, 2, 8, 'fa\nfa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '01:57'),
(244, 2, 8, 'jj\njj', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '01:59'),
(245, 2, 8, 'lol\ndamn!', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '02:00'),
(246, 2, 8, 'a\nb', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '02:02'),
(247, 2, 1, 'kfsf\nfasjk', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '02:13'),
(252, 2, 11, 'fsdafasd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '18:35'),
(253, 2, 4, 'lol', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10:15'),
(255, 2, 8, 'damn!', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '16:37'),
(256, 2, 16, 'jdlas', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:18'),
(257, 2, 3, 'amoako', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23:57'),
(258, 2, 6, 'mike', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23:57'),
(259, 15, 16, 'yo bro', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '01:08'),
(260, 16, 15, 'yeah man', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '01:08'),
(261, 15, 12, 'yo asante', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '01:10'),
(262, 12, 15, 'yoo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '01:10'),
(263, 2, 8, 'loving', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:36'),
(264, 2, 8, 'dark', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:36'),
(265, 2, 8, 'me', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:36'),
(266, 2, 4, 'show a lil loving', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '08:28'),
(267, 2, 4, 'fasfa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '08:28'),
(268, 2, 4, 'bbbbbbbbbbbbbbbbbbbb', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '08:33'),
(269, 2, 11, 'fdafasddfffffffffffff', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '08:35'),
(271, 2, 4, NULL, NULL, 'Array', NULL, '5 sec', NULL, NULL, NULL, NULL, NULL, NULL, '08:51'),
(272, 2, 4, NULL, NULL, 'Array', NULL, '5 sec', NULL, NULL, NULL, NULL, NULL, NULL, '08:51'),
(273, 2, 4, NULL, NULL, 'Array', NULL, '8 sec', NULL, NULL, NULL, NULL, NULL, NULL, '08:52'),
(274, 2, 4, NULL, NULL, 'Array', NULL, '8 sec', NULL, NULL, NULL, NULL, NULL, NULL, '08:52'),
(275, 2, 4, NULL, NULL, 'Array', NULL, '2 sec', NULL, NULL, NULL, NULL, NULL, NULL, '08:52'),
(276, 2, 4, NULL, NULL, 'Array', NULL, '2 sec', NULL, NULL, NULL, NULL, NULL, NULL, '08:52'),
(277, 2, 4, NULL, NULL, 'Array', NULL, '7 sec', NULL, NULL, NULL, NULL, NULL, NULL, '09:02'),
(278, 2, 4, NULL, NULL, 'Array', NULL, '5 sec', NULL, NULL, NULL, NULL, NULL, NULL, '09:03'),
(279, 2, 4, NULL, NULL, 'Array', NULL, '-1 sec', NULL, NULL, NULL, NULL, NULL, NULL, '16:21'),
(280, 2, 4, NULL, NULL, 'Array', NULL, '-1 sec', NULL, NULL, NULL, NULL, NULL, NULL, '16:22'),
(281, 2, 4, NULL, NULL, 'Array', NULL, '4 sec', NULL, NULL, NULL, NULL, NULL, NULL, '16:25'),
(282, 2, 4, NULL, NULL, 'Array', NULL, '2 sec', NULL, NULL, NULL, NULL, NULL, NULL, '16:25'),
(283, 2, 4, NULL, NULL, 'dmchatsaudiofiles/Array', NULL, '4 sec', NULL, NULL, NULL, NULL, NULL, NULL, '16:31'),
(284, 2, 4, NULL, NULL, 'dmchatsaudiofiles/Array', NULL, '2 sec', NULL, NULL, NULL, NULL, NULL, NULL, '16:35'),
(285, 2, 4, NULL, NULL, 'dmchatsaudiofiles/Array.mp3', NULL, '3 sec', NULL, NULL, NULL, NULL, NULL, NULL, '16:36'),
(286, 2, 4, NULL, NULL, 'dmchatsaudiofiles/Array', NULL, '4 sec', NULL, NULL, NULL, NULL, NULL, NULL, '16:36'),
(287, 2, 4, NULL, NULL, 'dmchatsaudiofiles/Array', NULL, '1 sec', NULL, NULL, NULL, NULL, NULL, NULL, '16:37'),
(288, 2, 4, NULL, NULL, 'dmchatsaudiofiles/', NULL, '2 sec', NULL, NULL, NULL, NULL, NULL, NULL, '16:40'),
(289, 2, 4, NULL, NULL, 'dmchatsaudiofiles/Array', NULL, '3 sec', NULL, NULL, NULL, NULL, NULL, NULL, '16:47'),
(290, 2, 4, NULL, NULL, 'dmchatsaudiofiles/record303201918619.mp3', NULL, '3 sec', NULL, NULL, NULL, NULL, NULL, NULL, '17:06'),
(291, 2, 4, NULL, NULL, 'dmchatsaudiofiles/record303201918745.mp3', NULL, '3 sec', NULL, NULL, NULL, NULL, NULL, NULL, '17:07'),
(292, 2, 4, NULL, NULL, 'dmchatsaudiofiles/record30320191888.mp3', NULL, '4 sec', NULL, NULL, NULL, NULL, NULL, NULL, '17:08'),
(293, 2, 11, NULL, NULL, 'dmchatsaudiofiles/Array', NULL, '2 sec', NULL, NULL, NULL, NULL, NULL, NULL, '17:26'),
(294, 2, 4, NULL, NULL, 'dmchatsaudiofiles/', NULL, '6 sec', NULL, NULL, NULL, NULL, NULL, NULL, '16:55'),
(295, 2, 4, NULL, NULL, 'dmchatsaudiofiles/', NULL, '3 sec', NULL, NULL, NULL, NULL, NULL, NULL, '16:58'),
(296, 2, 4, NULL, NULL, 'dmchatsaudiofiles/', NULL, '4 sec', NULL, NULL, NULL, NULL, NULL, NULL, '16:59'),
(297, 2, 4, NULL, NULL, 'dmchatsaudiofiles/', NULL, '6 sec', NULL, NULL, NULL, NULL, NULL, NULL, '17:00'),
(298, 2, 4, NULL, NULL, 'dmchatsaudiofiles/Array', NULL, '7 sec', NULL, NULL, NULL, NULL, NULL, NULL, '17:02'),
(299, 2, 4, NULL, NULL, 'dmchatsaudiofiles/', NULL, '6 sec', NULL, NULL, NULL, NULL, NULL, NULL, '17:03'),
(300, 2, 4, NULL, NULL, 'dmchatsaudiofiles/0', NULL, '6 sec', NULL, NULL, NULL, NULL, NULL, NULL, '17:05'),
(301, 2, 4, NULL, NULL, 'dmchatsaudiofiles/', NULL, '6 sec', NULL, NULL, NULL, NULL, NULL, NULL, '17:08'),
(302, 2, 4, NULL, NULL, 'dmchatsaudiofiles/Array', NULL, '5 sec', NULL, NULL, NULL, NULL, NULL, NULL, '17:20'),
(303, 2, 4, NULL, NULL, 'dmchatsaudiofiles/Array', NULL, '4 sec', NULL, NULL, NULL, NULL, NULL, NULL, '17:22'),
(304, 2, 4, NULL, NULL, 'dmchatsaudiofiles/Array', NULL, '3 sec', NULL, NULL, NULL, NULL, NULL, NULL, '17:23'),
(305, 2, 4, NULL, NULL, 'dmchatsaudiofiles/Array', NULL, '8 sec', NULL, NULL, NULL, NULL, NULL, NULL, '17:25'),
(316, 2, 8, '', 'dmmessagemedia/msg_media02-33-37.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '02:33'),
(323, 2, 4, 'yo chale sup', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:59'),
(324, 2, 4, 'what?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:24'),
(325, 2, 4, NULL, NULL, '/storage/emulated/0/Android/data/io.ionic.starter/files/record1242019122927.mp3', NULL, '6 sec', NULL, NULL, NULL, NULL, NULL, NULL, '12:25'),
(326, 2, 4, NULL, NULL, '/storage/emulated/0/Android/data/io.ionic.starter/files/record1242019123217.mp3', NULL, '11 sec', NULL, NULL, NULL, NULL, NULL, NULL, '12:28'),
(327, 2, 4, NULL, NULL, '/storage/emulated/0/Android/data/io.ionic.starter/files/record1242019123622.mp3', NULL, '3 sec', NULL, NULL, NULL, NULL, NULL, NULL, '12:32'),
(328, 2, 4, NULL, NULL, '/storage/emulated/0/Android/data/io.ionic.starter/files/record1242019123854.mp3', NULL, '2 sec', NULL, NULL, NULL, NULL, NULL, NULL, '12:34'),
(329, 2, 6, NULL, NULL, '/storage/emulated/0/Android/data/io.ionic.starter/files/record1242019125926.mp3', NULL, '6 sec', NULL, NULL, NULL, NULL, NULL, NULL, '12:55'),
(330, 2, 4, NULL, NULL, '/storage/emulated/0/Android/data/io.ionic.starter/files/record124201913936.mp3', NULL, '4 sec', NULL, NULL, NULL, NULL, NULL, NULL, '13:05'),
(331, 2, 4, NULL, NULL, '/storage/emulated/0/Android/data/io.ionic.starter/files/record124201913956.mp3', NULL, '7 sec', NULL, NULL, NULL, NULL, NULL, NULL, '13:05'),
(332, 2, 4, NULL, NULL, '/storage/emulated/0/Android/data/io.ionic.starter/files/record1242019131713.mp3', NULL, '14 sec', NULL, NULL, NULL, NULL, NULL, NULL, '13:13'),
(333, 2, 4, NULL, NULL, '/storage/emulated/0/Android/data/io.ionic.starter/files/record1242019135016.mp3', NULL, '6 sec', NULL, NULL, NULL, NULL, NULL, NULL, '13:46'),
(334, 2, 4, NULL, NULL, '/storage/emulated/0/Android/data/io.ionic.starter/files/record124201914950.mp3', NULL, '4 sec', NULL, NULL, NULL, NULL, NULL, NULL, '17:49'),
(335, 2, 4, NULL, NULL, '/storage/emulated/0/Android/data/io.ionic.starter/files/record1242019141020.mp3', NULL, '8 sec', NULL, NULL, NULL, NULL, NULL, NULL, '17:50'),
(336, 4, 2, NULL, NULL, '/storage/emulated/0/Android/data/io.ionic.starter/files/record124201914263.mp3', NULL, '9 sec', NULL, NULL, NULL, NULL, NULL, NULL, '18:05'),
(337, 4, 2, NULL, NULL, '/storage/emulated/0/Android/data/io.ionic.starter/files/record1242019142826.mp3', NULL, '5 sec', NULL, NULL, NULL, NULL, NULL, NULL, '18:08'),
(338, 4, 2, NULL, NULL, '/storage/emulated/0/Android/data/io.ionic.starter/files/record1242019142956.mp3', NULL, '5 sec', NULL, NULL, NULL, NULL, NULL, NULL, '18:09'),
(339, 2, 4, NULL, NULL, '/storage/emulated/0/Android/data/io.ionic.starter/files/record124201915316.mp3', NULL, '5 sec', NULL, NULL, NULL, NULL, NULL, NULL, '18:43'),
(340, 2, 4, NULL, NULL, '/storage/emulated/0/Android/data/io.ionic.starter/files/record124201915355.mp3', NULL, '10 sec', NULL, NULL, NULL, NULL, NULL, NULL, '18:43'),
(379, 2, 13, NULL, NULL, NULL, NULL, NULL, '/storage/emulated/0/WhatsApp/Media/WhatsApp Video/VID-20190405-WA0008.mp4', 'dmchatsvideothumbnails/thumbnail14-07-43.jpg', NULL, NULL, NULL, NULL, '14:07'),
(380, 2, 13, 'elastic hera', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:08'),
(427, 2, 13, 'sunflower', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '20:20'),
(432, 2, 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DOC-20190516-WA0000.pdf', 'file:///mnt/shared/shared/comp/DOC-20190516-WA0000.pdf', 'application/pdf', '37.8 MB', '03:19'),
(433, 2, 13, NULL, NULL, 'file:///storage/emulated/0/recording375016630.3gpp', 'recording375016630.3gpp', '6 sec', NULL, NULL, NULL, NULL, NULL, NULL, '03:20'),
(434, 13, 2, NULL, NULL, 'file:///storage/emulated/0/recording1526737016.3gpp', 'recording1526737016.3gpp', '6 sec', NULL, NULL, NULL, NULL, NULL, NULL, '09:51'),
(435, 13, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Discrete Mathematics and its Applications - Rosen - 0-07-288008-2.pdf', 'file:///mnt/shared/shared/comp/Discrete Mathematics and its Applications - Rosen - 0-07-288008-2.pdf', 'application/pdf', '178.6 MB', '09:52'),
(436, 13, 2, NULL, NULL, NULL, NULL, NULL, '/storage/emulated/0/WhatsApp/Media/WhatsApp Animated Gifs/VID-20190417-WA0018.mp4', 'dmchatsvideothumbnails/thumbnail09-56-01.jpg', NULL, NULL, NULL, NULL, '09:56'),
(438, 2, 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'entre2019pdf.pdf', 'file:///storage/emulated/0/WhatsApp/Media/WhatsApp Documents/entre2019pdf.pdf', 'application/pdf', '1.8 MB', '16:54'),
(440, 2, 13, NULL, NULL, NULL, NULL, NULL, '/storage/emulated/0/WhatsApp/Media/WhatsApp Video/VID-20190502-WA0005.mp4', 'dmchatsvideothumbnails/thumbnail16-55-16.jpg', NULL, NULL, NULL, NULL, '16:55'),
(441, 2, 13, '', 'dmmessagemedia/msg_media16-56-17.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '16:56'),
(442, 2, 16, 'yo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:32'),
(443, 16, 2, 'yeah wosop', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:33'),
(446, 16, 2, 'ah what htis?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:35'),
(448, 16, 2, 'fuck what?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:35'),
(449, 16, 2, 'oh notin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:36'),
(451, 16, 2, 'shuuu', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:36'),
(452, 16, 2, 'jkhbbj', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:38'),
(453, 16, 2, 'aawa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:38'),
(454, 16, 2, 'come on', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:40'),
(455, 16, 2, 'aa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13:41'),
(473, 2, 16, 'jkj', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '20:39'),
(477, 2, 13, 'asdfaf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '20:44'),
(482, 2, 13, 'b', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '20:50'),
(483, 2, 1, 'afasdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '09:50'),
(484, 2, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'barringer_e3_tb_06-2.pdf', 'file:///storage/emulated/0/WhatsApp/Media/WhatsApp Documents/barringer_e3_tb_06-2.pdf', 'application/pdf', '293.9 KB', '12:05'),
(485, 2, 1, NULL, NULL, 'file:///storage/emulated/0/recording-31710833.3gpp', 'recording-31710833.3gpp', '5 sec', NULL, NULL, NULL, NULL, NULL, NULL, '12:06'),
(486, 2, 1, NULL, NULL, NULL, NULL, NULL, '/storage/emulated/0/WhatsApp/Media/WhatsApp Video/VID-20190525-WA0003.mp4', 'dmchatsvideothumbnails/thumbnail12-07-09.jpg', NULL, NULL, NULL, NULL, '12:07'),
(487, 2, 1, '', 'dmmessagemedia/msg_media12-09-14.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:09'),
(488, 1, 11, 'sup', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '18:40'),
(489, 1, 2, NULL, NULL, NULL, NULL, NULL, 'file:///storage/emulated/0/WhatsApp/Media/WhatsApp Video/VID-20190525-WA0010.mp4', 'dmchatsvideothumbnails/thumbnail19-50-24.jpg', NULL, NULL, NULL, NULL, '19:50'),
(490, 1, 11, '', 'file:///msg_media23-57-23.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23:57'),
(491, 1, 11, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23:59'),
(493, 1, 2, 'kljafjldkjaf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11:45'),
(494, 2, 1, '9z713f/YZfXZdJfbRQT8::d011fa76dc7c1329758d62072bd5a487', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '21:30'),
(495, 2, 1, '7oFpfaCv::55192a3336785022f151f6d4ec85c784', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '21:31'),
(496, 2, 1, 'slCuqRw1G7oHJDpe1vA97Aw=::c03a935f376fe2fdad0508a86f6333af', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '21:34'),
(497, 2, 1, 'gddgsdfsdfsaf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '16:55'),
(498, 2, 1, 'mliljijif', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:07'),
(499, 2, 1, 'asdfghj/', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '09:45'),
(500, 2, 1, 'ghg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23:05'),
(501, 2, 16, 'hg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:41'),
(502, 2, 11, 'fsd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:42'),
(503, 2, 16, 'cxz', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:44'),
(504, 2, 16, 'fasdfsafs', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:44'),
(505, 2, 4, 'efsd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:45'),
(506, 2, 15, 'afsdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12:45'),
(507, 2, 16, 'foo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '16:01'),
(508, 2, 16, 'aicon', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '16:02'),
(509, 2, 16, 'be put odnw', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '16:03'),
(510, 2, 16, 'sfs', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '08:12'),
(511, 2, 16, 'hurhhhhh', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '08:13'),
(512, 2, 1, 'river', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '15:51'),
(513, 2, 1, '', 'dmmessagemedia/msg_media10-26-50.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10:26'),
(514, 2, 1, 'Hello', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '18:02'),
(515, 1, 2, 'Hi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '15:07'),
(516, 1, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '4_5893193256124024675.ehi', 'file:///storage/emulated/0/Telegram/Telegram Documents/4_5893193256124024675.ehi', '', '', '15:17'),
(517, 1, 2, NULL, NULL, 'file:///storage/emulated/0/Sounds/Voice%20001.m4a', 'Voice 001.m4a', '6 sec', NULL, NULL, NULL, NULL, NULL, NULL, '15:18'),
(518, 2, 16, 'jhk', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:45'),
(519, 2, 16, 'yo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:52'),
(520, 2, 16, 'wosoop', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:52'),
(521, 2, 16, 'odanic any', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:56'),
(522, 2, 16, 'higher', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:56'),
(523, 2, 16, 'yes', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:58'),
(524, 2, 16, 'what', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:58'),
(525, 2, 16, 'heart', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14:59'),
(526, 2, 16, 'attack', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '15:00'),
(527, 2, 16, 'afdsjk;d', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '19:27'),
(528, 2, 16, 'khjghvjv', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '21:50');

-- --------------------------------------------------------

--
-- Table structure for table `friendship`
--

CREATE TABLE `friendship` (
  `friendship_id` bigint(20) NOT NULL,
  `follower_id` bigint(20) DEFAULT NULL,
  `followed_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `friendship`
--

INSERT INTO `friendship` (`friendship_id`, `follower_id`, `followed_id`) VALUES
(25, 5, 4),
(27, 1, 3),
(35, 3, 4),
(41, 3, 5),
(44, 1, 5),
(45, 6, 1),
(46, 5, 2),
(63, 4, 1),
(71, 4, 3),
(72, 4, 2),
(73, 4, 5),
(77, 1, 6),
(79, 5, 1),
(81, 2, 13),
(92, 13, 2),
(95, 2, 11),
(101, 1, 2),
(102, 4, 6),
(103, 15, 16),
(105, 6, 2);

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `group_id` bigint(20) NOT NULL,
  `group_name` varchar(100) NOT NULL,
  `group_profile_pic` text DEFAULT NULL,
  `group_admin_id` bigint(20) DEFAULT NULL,
  `student_year_eligibility` text DEFAULT NULL,
  `about` text DEFAULT NULL,
  `members_joined` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`group_id`, `group_name`, `group_profile_pic`, `group_admin_id`, `student_year_eligibility`, `about`, `members_joined`) VALUES
(1, 'Computer Science 3', NULL, NULL, '3', 'IT programming', '12'),
(2, 'Biological Science 1', NULL, NULL, '1', 'Genetics, anatomy', '42'),
(3, 'Medicine 2', NULL, NULL, '2', 'dentistry and anatomy', '0'),
(4, 'Computer Science 4', NULL, NULL, '4', 'networking, security', '66'),
(5, 'Pharmacy 4', NULL, NULL, '4', 'drugs\r\nthey don\'t do drugs please...lol', '1'),
(6, 'Telecom Engineering 3', NULL, NULL, '3', 'telecommunications infrastructure', '1'),
(7, 'Materials Engineering 2', NULL, NULL, '2', 'chemical compositions', '14'),
(8, 'Pensa Knust', NULL, NULL, 'all', 'brighten the corner where u are ', '0'),
(9, 'Mathematics 4', NULL, NULL, '4', 'theories', '177'),
(10, 'Scisca', NULL, NULL, 'all', 'science', '4'),
(11, 'Ghamsu', NULL, NULL, 'all', 'methodist church', '76'),
(83, 'micky', NULL, 2, NULL, '', '4'),
(84, 'notinaget', NULL, 2, NULL, 'noi', '1'),
(85, 'better', NULL, 2, NULL, '', '1'),
(86, 'khalid', NULL, 2, NULL, '', '1'),
(87, 'afs', NULL, 2, NULL, '', '1'),
(88, 'mygroup', NULL, 2, NULL, 'computer seecurity assignment', '4'),
(89, 'uenr computer science', NULL, 6, NULL, '', '8'),
(90, 'my computer science fellas', NULL, 2, NULL, '', '1'),
(91, 'fsda', NULL, 2, NULL, '', '3'),
(92, 'new', NULL, 2, NULL, '', '0');

-- --------------------------------------------------------

--
-- Table structure for table `group_membership`
--

CREATE TABLE `group_membership` (
  `row_id` bigint(20) NOT NULL,
  `group_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `group_membership`
--

INSERT INTO `group_membership` (`row_id`, `group_id`, `user_id`) VALUES
(8, 7, 13),
(9, 10, 16),
(14, 2, 1),
(27, 8, 2),
(128, 83, 2),
(129, 83, 1),
(136, 83, 3),
(137, 8, 13),
(138, 84, 2),
(139, 8, 11),
(140, 85, 2),
(141, 86, 2),
(142, 87, 2),
(143, 88, 2),
(144, 88, 3),
(145, 88, 6),
(146, 88, 5),
(147, 83, 4),
(148, 4, 2),
(149, 89, 6),
(150, 89, 1),
(151, 89, 2),
(152, 89, 3),
(153, 89, 4),
(155, 89, 5),
(156, 89, 8),
(157, 89, 9),
(158, 90, 2),
(160, 91, 14),
(161, 91, 12),
(162, 91, 3),
(167, 5, 2),
(170, 1, 2),
(171, 2, 2),
(172, 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `lastdmmessage`
--

CREATE TABLE `lastdmmessage` (
  `id` bigint(20) NOT NULL,
  `user1_id` bigint(20) DEFAULT NULL,
  `user2_id` bigint(20) DEFAULT NULL,
  `lastmsg_id` bigint(20) DEFAULT NULL,
  `permission_status` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lastdmmessage`
--

INSERT INTO `lastdmmessage` (`id`, `user1_id`, `user2_id`, `lastmsg_id`, `permission_status`) VALUES
(1, 11, 13, 130, 'accept'),
(2, 13, 12, 104, 'accept'),
(8, 4, 5, 48, 'accept'),
(10, 13, 6, 54, 'accept'),
(15, 5, 11, 147, 'accept'),
(16, 4, 11, 150, 'accept'),
(17, 15, 11, 151, 'accept'),
(18, 16, 11, 160, 'accept'),
(19, 6, 11, 187, 'accept'),
(22, 2, 15, 506, 'pending'),
(23, 2, 5, NULL, 'accept'),
(38, 2, 3, 257, 'rejected'),
(39, 15, 16, 260, 'accept'),
(40, 15, 12, 262, 'accept'),
(42, 2, 11, 502, 'accept'),
(43, 2, 6, NULL, 'accept'),
(46, 2, 4, 505, 'accept'),
(60, 2, 16, 528, 'rejected'),
(63, 2, 13, NULL, 'accept'),
(64, 2, 1, 517, 'accept');

-- --------------------------------------------------------

--
-- Table structure for table `lastgroupmessage`
--

CREATE TABLE `lastgroupmessage` (
  `row_id` bigint(20) NOT NULL,
  `group_id` bigint(20) DEFAULT NULL,
  `sender_id` bigint(20) DEFAULT NULL,
  `lastmsg_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lastgroupmessage`
--

INSERT INTO `lastgroupmessage` (`row_id`, `group_id`, `sender_id`, `lastmsg_id`) VALUES
(1, 4, 2, 32),
(3, 10, 2, 30),
(4, 7, NULL, NULL),
(6, 2, 1, 31),
(7, 11, 2, 34),
(17, 83, 1, 54),
(18, 8, NULL, NULL),
(19, 85, NULL, NULL),
(20, 87, NULL, NULL),
(21, 88, 6, 56),
(22, 86, NULL, NULL),
(23, 89, 6, 57),
(24, 84, NULL, NULL),
(25, 90, NULL, NULL),
(26, 92, NULL, NULL),
(27, 1, NULL, NULL),
(28, 3, NULL, NULL),
(29, 5, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `likedmessages`
--

CREATE TABLE `likedmessages` (
  `row_id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `likedmsg_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `likedmessages`
--

INSERT INTO `likedmessages` (`row_id`, `user_id`, `likedmsg_id`) VALUES
(2, 1, 14),
(3, 2, 28),
(5, 2, 31),
(6, 2, 32),
(7, 2, 30),
(8, 2, 23),
(12, 2, 34),
(39, 2, 45),
(51, 2, 47),
(63, 2, 50),
(67, 2, 24),
(73, 2, 53),
(170, 2, 58),
(234, 1, 84),
(235, 1, 83),
(247, 2, 87),
(249, 4, 76),
(254, 3, 78),
(255, 2, 90),
(256, 2, 87),
(257, 1, 110),
(260, 2, 103),
(261, 2, 100),
(262, 2, 101),
(263, 2, 97),
(264, 2, 93),
(278, 2, 16),
(279, 3, 100),
(280, 5, 103),
(281, 1, 103),
(282, 2, 142),
(283, 3, 142),
(284, 4, 142),
(286, 4, 144),
(292, 6, 142),
(297, 6, 145),
(302, 5, 129),
(303, 5, 133),
(304, 5, 124),
(305, 5, 100),
(415, 2, 154),
(416, 2, 76),
(419, 2, 139),
(423, 6, 167),
(426, 1, 221),
(427, 5, 223),
(429, 2, 224),
(430, 5, 225),
(432, 2, 223),
(433, 1, 224),
(435, 1, 225),
(440, 2, 78),
(512, 2, 298),
(513, 2, 289),
(514, 2, 301),
(515, 2, 144),
(528, 2, 302),
(529, 2, 294),
(530, 1, 280),
(531, 1, 305),
(532, 1, 301),
(533, 2, 320),
(534, 4, 320),
(535, 2, 324),
(536, 2, 325),
(537, 2, 327),
(538, 6, 281),
(539, 6, 276),
(543, 6, 280),
(544, 6, 261),
(545, 6, 304),
(550, 6, 327),
(551, 6, 143),
(552, 6, 144),
(578, 6, 279);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` bigint(20) NOT NULL,
  `message` text DEFAULT NULL,
  `message_media` text DEFAULT NULL,
  `likes` bigint(20) DEFAULT NULL,
  `comments` bigint(20) DEFAULT NULL,
  `date_created` text DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`message_id`, `message`, `message_media`, `likes`, `comments`, `date_created`, `user_id`) VALUES
(14, 'amoako', NULL, 1, 2, '22:14', 3),
(15, 'maria', NULL, 0, 0, '22:14', 1),
(16, 'samuel', NULL, 1, 0, '22:14', 2),
(21, 'yo maria wosop', NULL, 0, 0, '17:34', 2),
(22, 'teming u post ma assignment gimmie?', NULL, 0, 3, '17:39', 2),
(23, 'yeah sammy a do', NULL, 1, 0, '18:17', 3),
(24, 'thanks', NULL, 1, 2, '18:18', 2),
(25, 'welcome bro', NULL, 0, 0, '18:22', 1),
(26, 'vhim', NULL, 0, 0, '18:23', 3),
(28, 'lol wah bi ur own??', NULL, 1, 0, '18:30', 2),
(29, 'a weak saf', NULL, 0, 1, '18:30', 2),
(30, 'why u dey bell ur own name???', NULL, 1, 1, '18:45', 2),
(31, 'u see say he fool paa hahaha', NULL, 1, 1, '18:46', 2),
(32, 'ah u dey mind am??', NULL, 1, 0, '18:56', 2),
(33, 'why u dey biz??', NULL, 0, 0, '19:26', 2),
(34, 'abi a for biz kwasia', NULL, 1, 1, '19:26', 2),
(35, 'jon', NULL, 0, 0, '23:55', 2),
(36, 'amoako do u what??', NULL, 0, 0, '02:52', 2),
(37, 'sakov??', NULL, 0, 1, '02:54', 2),
(38, 'sakov u aboa', NULL, 0, 0, '02:55', 2),
(39, 'who get Glass ein hd movie for there?', NULL, 0, 1, '02:57', 3),
(40, 'i do u can please come for it at indece ', NULL, 0, 1, '02:57', 1),
(41, 'oh nice nice \nroom number please?', NULL, 0, 1, '02:58', 3),
(42, 'east wing room 104', NULL, 0, 0, '02:59', 1),
(43, 'we walking the wire', NULL, 0, 1, '10:57', 3),
(44, 'love ', NULL, 2, 1, '10:57', 3),
(45, 'sweetie', NULL, 1, 0, '13:09', 2),
(46, 'see', NULL, 1, 2, '13:48', 2),
(47, 'see me', NULL, 1, 1, '13:48', 2),
(48, 'why?', NULL, 0, 1, '14:17', 2),
(49, 'damn', NULL, 0, 0, '21:29', 2),
(50, 'a', NULL, 1, 1, '23:44', 2),
(51, 'b', NULL, 0, 0, '23:44', 2),
(52, 'c', NULL, 0, 1, '23:50', 2),
(53, 'd', NULL, 1, 0, '23:51', 2),
(54, 'fh', NULL, 0, 2, '10:34', 2),
(55, 'yes', NULL, 0, 0, '10:43', 2),
(56, 'ffjj', NULL, 0, 1, '10:43', 2),
(57, 'jasdlf', NULL, 0, 1, '12:04', 2),
(58, 'better', NULL, 1, 1, '12:10', 2),
(71, 'normal message', NULL, 4, 2, '16:23', 2),
(72, 'comment', NULL, 0, 1, '16:24', 2),
(73, 'im a hero', NULL, 0, 0, '23:30', 2),
(74, 'shot down', NULL, 0, 0, '13:50', 2),
(75, '', 'messagemedia/msg_media14-04-49.jpg', 0, 3, '14:04', 4),
(76, '', 'messagemedia/msg_media14-05-53.jpg', 2, 8, '14:05', 4),
(77, 'ross barkley', NULL, 0, 0, '14:06', 4),
(78, '', 'messagemedia/msg_media14-08-11.jpg', 2, 3, '14:08', 4),
(80, 'knjkb', NULL, 0, 0, '14:13', 2),
(81, 'xfghf', NULL, 0, 1, '14:13', 2),
(82, 'fsd', NULL, 0, 0, '20:32', 2),
(83, 'try', NULL, 1, 2, '20:45', 2),
(84, 'testing', NULL, 1, 0, '20:45', 2),
(87, 'try what?', NULL, 2, 1, '23:45', 2),
(88, 'aweak saf', NULL, 0, 0, '23:45', 2),
(90, '??', NULL, 1, 0, '02:23', 2),
(91, 'loaded shot gun', NULL, 0, 3, '02:25', 1),
(92, 'look out down below', NULL, 0, 0, '12:15', 3),
(93, 'mat', NULL, 1, 0, '19:42', 2),
(94, 'console.log(Refresh started);\nconsole.log(this.mymodulevariables.globaluserid);\nthis.pinnedmsgids = []; //clear all messages in the pinnedmessages array\nthis.loadpinnedmessages();  //load new pinned messages into pinned messages array\nthis.likedmsgids =[]; // clear all the messages in the likedtable array\nthis.loadlikedmessages(); //load newly liked messages into the liked messages array\nthis.messagetablerows = [];  //clear all messaegs in the messages array\nthis.loadallmessages(); //load new m', NULL, 0, 0, '12:35', 2),
(95, 'jkfsdfkjas', NULL, 0, 0, '12:36', 2),
(96, 'console.log(Refresh started);\nconsole.log(this.mymodulevariables.globaluserid);\nthis.pinnedmsgids = []; //clear all messages in the pinnedmessages array\nthis.loadpinnedmessages();  //load new pinned messages into pinned messages array\nthis.likedmsgids =[]; // clear all the messages in the likedtable array\nthis.loadlikedmessages(); //load newly liked messages into the liked messages array\nthis.messagetablerows = [];  //clear all messaegs in the messages array\nthis.loadallmessages(); //load new m', NULL, 0, 0, '12:36', 2),
(97, 'yo u post ma assignment gimme like for real i really need this assignment', NULL, 1, 0, '23:34', 2),
(98, '-', NULL, 0, 0, '23:48', 2),
(99, '\"', NULL, 0, 0, '00:00', 2),
(100, '&#39', NULL, 3, 1, '00:25', 2),
(101, 'super sonic speed', NULL, 1, 0, '00:36', 2),
(103, 'i\'d go again', NULL, 3, NULL, NULL, 5),
(110, 'real yeah ', NULL, 1, 0, '12:15', 1),
(111, 'on which day is 6th march please?', NULL, 0, 3, '20:25', 1),
(112, 'this wednesday', NULL, 0, 0, '20:26', 2),
(113, 'the day u were born', NULL, 0, 3, '20:31', 3),
(114, 'hahaaa  u messop o', NULL, 0, 0, '20:34', 2),
(115, 'dont mind him okay', NULL, 0, 0, '20:35', 2),
(116, 'chalw wo', NULL, 0, 0, '20:36', 2),
(117, 'who will take me out this vals day?', NULL, 0, 8, '20:38', 1),
(118, 'me!!!!', NULL, 0, 0, '20:38', 2),
(119, 'maria me', NULL, 0, 0, '20:41', 2),
(120, 'pleaseee', NULL, 0, 2, '20:42', 1),
(121, 'oh mari', NULL, 0, 0, '20:42', 2),
(122, 'moi', NULL, 0, 0, '20:44', 2),
(123, 'i will okay ', NULL, 0, 0, '20:49', 2),
(124, 'please what', NULL, 1, 0, '21:00', 2),
(125, 'oh marai', NULL, 0, 0, '21:03', 2),
(126, 'should work noow', NULL, 0, 0, '21:26', 2),
(127, 'bull shit', NULL, 0, 3, '21:35', 2),
(128, 'yeah shite', NULL, 0, 0, '21:42', 2),
(129, 'yo sammy u no come the class?', NULL, 1, 4, '21:49', 3),
(130, 'chale some movement bi o ', NULL, 0, 0, '21:49', 2),
(131, 'ma own comment', NULL, 0, 0, '21:54', 3),
(132, 'yes yes', NULL, 0, 0, '21:54', 3),
(133, 'abeg who get got episodes?', NULL, 1, 3, '21:58', 3),
(135, 'mnb', NULL, 0, 0, '21:59', 2),
(136, 'nv bn', NULL, 0, 0, '22:00', 3),
(137, 'lol', NULL, 0, 0, '22:00', 3),
(138, 'okay', NULL, 0, 0, '15:18', 3),
(139, 'yo jake', NULL, 1, 3, '15:18', 3),
(142, 'raised to life \nthe same power ', NULL, 4, 1, '11:14', 5),
(143, 'one', NULL, 1, 1, '12:01', 5),
(144, 'two', NULL, 3, 3, '12:01', 5),
(145, 'ah waht this', NULL, 1, 0, '12:02', 2),
(147, 'much better ', NULL, 0, 1, '12:03', 1),
(154, 'this is a message', NULL, 2, 0, '12:09', 2),
(155, 'damn!', NULL, 0, 0, '21:11', 2),
(156, 'yes thank you Lord', NULL, 0, 1, '21:12', 2),
(157, 'i know that u want me dead', NULL, 0, 0, '21:38', 2),
(158, 'yeah wosop', NULL, 0, 1, '22:56', 2),
(159, 'better', NULL, 0, 0, '22:56', 2),
(160, 'nothing feels better tahtn this', NULL, 0, 0, '22:57', 2),
(161, 'all the others', NULL, 0, 0, '23:00', 2),
(162, 'hey', NULL, 0, 0, '23:00', 2),
(163, 'ah', NULL, 0, 0, '23:00', 2),
(164, 'go and iron ', NULL, 0, 0, '23:02', 2),
(166, 'text me', NULL, 0, 1, '12:35', 6),
(167, 'Hello Creative people\r\nPlease have a look at Courier Delivery Mobile Application Design\r\nPlease have a look full view here:', NULL, 1, 0, '22:11', 6),
(168, 'eden hazard', NULL, 0, 0, '22:11', 6),
(169, 'mese aga y3we', NULL, 0, 0, '19:46', 4),
(170, 'i\'d come to u', NULL, 7, 8, '12:09', 4),
(171, 'i\'d come to u', NULL, 99, 98, '12:09', 4),
(172, 'looking\'d come to u', NULL, 7, 8, '12:09', 4),
(173, 'yes', NULL, 0, 0, '21:25', 4),
(174, '\"\"', NULL, 0, 0, '21:32', 4),
(175, 'come on', NULL, 0, 0, '21:33', 4),
(176, '\"yes\"', NULL, 0, 0, '21:33', 4),
(177, '\"dont\"', NULL, 0, 0, '21:34', 4),
(178, '\"erhn?\"', NULL, 0, 0, '21:34', 4),
(179, 'food', NULL, 9, 3, '12:00', 3),
(180, 'fo\'od', NULL, 9, 3, '12:00', 3),
(181, 'sjkfd', NULL, 0, 0, '21:53', 4),
(182, 'sia', NULL, 0, 0, '21:53', 4),
(183, '/hmm/', NULL, 0, 1, '21:55', 4),
(184, '/lol/', NULL, 0, 0, '21:55', 4),
(185, ';;sdkf', NULL, 0, 0, '21:57', 4),
(186, '$postjson[messageDB]', NULL, 0, 0, '22:06', 4),
(187, 'me', NULL, 0, 0, '22:06', 4),
(188, 'ah', NULL, 0, 0, '22:06', 4),
(189, 'i\'d come', NULL, 0, 0, '22:06', 4),
(190, 'thank God\nthanks finally\'d this\'d sehit\'', NULL, 0, 0, '22:08', 4),
(191, '\'', NULL, 0, 0, '22:08', 4),
(192, 'who\'d go to the beach witm mo\'i?', NULL, 0, 0, '22:19', 5),
(193, '\n\n/**when the user opens the notification page it means he\'s seen the messages there now..we want to update the read_status of those notifications in the page\n       * so that our local notifications plugin will only display notifications which have their read_status set to \"unread\"\n       */\n      for (var key in this.notificationsmessagetablerows) {\n\n        //for follow notifications\n        if ((this.notificationsmessagetablerows[key].notmsg_type_fetched = \"follow\") && (this.notificationsmessagetablerows[key].read_status_fetched = \"unread\")) {\n          //now we are updating by setting read_status to \"read\" where msg type= follow and the sender and receiver id are given\n          let body = {\n            mydbfunc: \'updatefollowreadstatus\',\n            senderidDB: this.notificationsmessagetablerows[key].senderID_fetched,\n            receiveridDB : this.mymodulevariables.globaluserid\n          };\n\n          //post data to api\n          this.postPvdr.postData(body, \'mydbapicommands.php\').subscribe(data => {\n          });\n        }\n\n\n        //for like notification\n      }', NULL, 0, 4, '22:42', 8),
(194, '\'notmsg_id_fetched\' => $row[\'notmsg_id\'],\n            \'notmsg_type_fetched\' => $row[\'notmsg_type\'],\n            \'read_status_fetched\' => $row[\'read_status\'],\n            \'date_created_fetched\' => $row[\'date_created\'],\n            \'senderID_fetched\' => $row[\'senderID\'],\n            \'senderUsername_fetched\' => $row[\'senderUsername\'],\n            \'senderProfilepic_fetched\' => $row[\'senderProfilepic\'],\n            \'senderMessageID_fetched\' => $row[\'senderMessageID\'],\n            \'senderMessage_fetched\' => $row[\'senderMessage\'],\n            \'senderMessagemedia_fetched\' => $row[\'senderMessagemedia\']\n            \'senderMessagelikes_fetched\' => $row[\'senderMessagelikes\'],\n            \'senderMessagecomments_fetched\' => $row[\'senderMessagecomments\'],\n            \'senderMessagedate_fetched\' => $row[\'senderMessagedate\'],\n            \'receiverID_fetched\' => $row[\'receiverID\'],\n            \'receiverUsername_fetched\' => $row[\'receiverUsername\'],\n            \'receiverProfilepic_fetched\' => $row[\'receiverProfilepic\'],\n            \'receiverMessageID_fetched\' => $row[\'receiverMessageID\'],\n            \'receiverMessage_fetched\' => $row[\'receiverMessage\'],\n            \'receiverMessagemedia_fetched\' => $row[\'receiverMessagemedia\']\n            \'receiverMessagelikes_fetched\' => $row[\'receiverMessagelikes\'],\n            \'receiverMessagecomments_fetched\' => $row[\'receiverMessagecomments\'],\n            \'receiverMessagedate_fetched\' => $row[\'receiverMessagedate\']', NULL, 0, 0, '22:43', 8),
(195, 'sdf', NULL, 0, 0, '22:47', 8),
(196, 'a', NULL, 0, 4, '22:47', 8),
(197, 'i', NULL, 0, 0, '08:42', 8),
(198, 'b', NULL, 0, 1, '08:42', 8),
(199, 'i\'d', NULL, 0, 0, '08:42', 8),
(200, 'one day we\'d wake up and this will all be a dream', NULL, 0, 0, '08:45', 8),
(201, '\'', NULL, 0, 0, '08:53', 9),
(202, '\"', NULL, 0, 0, '08:53', 9),
(203, 'once upon a time i wouldn\'t have been able to do this', NULL, 0, 0, '08:54', 9),
(204, 'woul\'d u ?', NULL, 0, 0, '08:54', 9),
(215, 'fool\'s price', NULL, 0, 0, '15:04', 4),
(216, 'herculesa', NULL, 0, 0, '15:09', 4),
(217, 'damn!', NULL, 0, 0, '21:32', 1),
(218, 'north korea', NULL, 0, 1, '11:51', 2),
(219, 'ashes', NULL, 0, 0, '11:51', 2),
(221, 'sdfhflksdf', NULL, 1, 0, '13:33', 2),
(222, 'what?', NULL, 0, 0, '18:15', 1),
(223, 'mummy', NULL, 2, 1, '18:28', 1),
(224, 'we are the mummy', NULL, 2, 1, '18:29', 5),
(225, 'sdf', NULL, 2, 0, '18:38', 2),
(226, 'that\'s  gonna be epic!', 'messagemedia/msg_media23-43-09.jpg', 0, 0, '23:43', 2),
(229, 'real\'d epic', NULL, 0, 0, '01:38', 2),
(230, 'it\'s beauty in the struggle', 'messagemedia/msg_media16-27-08.jpg', 0, 2, '16:27', 2),
(231, 'i\'d need to come ', NULL, 0, 0, '16:28', 2),
(232, '', 'messagemedia/msg_media16-28-44.jpg', 0, 0, '16:28', 2),
(233, 'sd', NULL, 0, 2, '16:32', 1),
(234, 'g', NULL, 0, 0, '16:33', 1),
(235, 'kj', NULL, 0, 1, '16:51', 1),
(236, 'usa', NULL, 0, 4, '16:53', 1),
(237, 'aD', NULL, 0, 0, '16:53', 1),
(238, 'saf', NULL, 0, 0, '16:58', 1),
(239, 'tom', NULL, 0, 0, '16:58', 1),
(240, 'please', NULL, 0, 0, '16:59', 1),
(241, 'me', NULL, 0, 0, '17:40', 1),
(242, 'press on', NULL, 0, 1, '23:35', 2),
(243, 'we going down down', NULL, 0, 0, '13:07', 2),
(244, 'lalalalalla', NULL, 0, 0, '14:19', 2),
(245, 'u\'d be mine', NULL, 0, 0, '18:14', 11),
(246, 'work!', NULL, 0, 0, '18:50', 11),
(247, 'came on', NULL, 0, 0, '18:51', 11),
(248, 'by', NULL, 0, 1, '21:06', 11),
(249, 'sdf', NULL, 0, 0, '21:11', 11),
(250, 'aaa', NULL, 0, 0, '21:19', 11),
(251, 'jj', NULL, 0, 0, '21:21', 11),
(252, 'the night is still young', NULL, 0, 0, '21:24', 11),
(253, 'aaaaaaaaaaaaa', NULL, 0, 0, '21:24', 11),
(254, 'ss', NULL, 0, 0, '21:29', 11),
(255, 'dfg', NULL, 0, 0, '21:29', 11),
(256, 'so are we', NULL, 0, 0, '21:33', 11),
(257, 'and soare ', NULL, 0, 0, '21:33', 11),
(258, 'sdaf', NULL, 0, 0, '21:35', 11),
(259, 'i never worry life is a journey', NULL, 0, 0, '21:35', 11),
(260, 'and so are we', NULL, 0, 0, '21:35', 11),
(261, 'pop pop', NULL, 1, 0, '21:36', 11),
(262, 'yy', NULL, 0, 0, '21:38', 11),
(263, 'fff', NULL, 0, 0, '21:38', 11),
(264, 'nice', NULL, 0, 0, '21:38', 11),
(265, 'aafasf', NULL, 0, 0, '21:38', 11),
(266, 'error koraa suro me', NULL, 0, 0, '22:05', 11),
(267, 'llll', NULL, 0, 0, '22:06', 11),
(268, 'send message', NULL, 0, 0, '22:06', 11),
(269, 'remind me to forget', NULL, 0, 1, '23:01', 11),
(270, '   ', NULL, 0, 0, '23:17', 2),
(271, '  ', NULL, 0, 0, '23:20', 2),
(272, '\'', NULL, 0, 1, '23:53', 2),
(273, '\'', NULL, 0, 0, '23:53', 2),
(274, 'its going to get esasiser some how but not today \nnot today at fj;alsdf;ajf;ajfk;aj;fajdflkjasfsdfjklajfkjdsfkdjakfkafjkdjfkajfkasjfakfla;df there fsj;;afdfs', NULL, 0, 0, '03:17', 2),
(275, 'only in summer time', 'messagemedia/msg_media09-12-05.jpg', 0, 1, '09:12', 16),
(276, '', 'messagemedia/msg_media11-05-18.jpg', 1, 0, '11:05', 2),
(277, 'shit!', NULL, 0, 0, '11:06', 2),
(278, 'damn', NULL, 0, 1, '11:22', 1),
(279, 'u that?', 'messagemedia/msg_media11-23-14.jpg', 1, 2, '11:23', 2),
(280, 'itachi uchiha', 'messagemedia/msg_media11-27-30.jpg', 2, 0, '11:27', 2),
(281, 'we made u all', NULL, 1, 0, '02:57', 1),
(282, 'all', NULL, 0, 0, '02:57', 1),
(283, 'fasd', NULL, 0, 0, '02:58', 1),
(284, 'afsdfada', NULL, 0, 0, '02:58', 1),
(285, 'hey', NULL, 0, 0, '10:00', 1),
(286, 'yous', NULL, 0, 0, '10:00', 1),
(287, 'damn', NULL, 0, 0, '10:32', 1),
(288, 'adfs', NULL, 0, 0, '10:32', 1),
(289, 'fsd', NULL, 1, 0, '13:02', 2),
(290, 'mb m', NULL, 0, 0, '13:05', 2),
(291, 'adsf', NULL, 0, 0, '13:08', 2),
(292, 'nb ,', NULL, 0, 0, '13:10', 1),
(293, 'nm m', NULL, 0, 0, '13:12', 1),
(294, 'smike', NULL, 1, 0, '13:12', 1),
(295, ',', NULL, 0, 0, '13:13', 1),
(296, 'issue', NULL, 0, 0, '13:15', 2),
(297, 'nn', NULL, 0, 0, '13:16', 2),
(298, 'seeding', NULL, 1, 1, '14:06', 2),
(299, 'its em and u', NULL, 0, 0, '18:42', 2),
(300, 'i \ncan e\nse', NULL, 0, 0, '01:57', 2),
(301, 'good\ngood', NULL, 2, 3, '02:04', 2),
(302, 'what is good?\ne?', NULL, 1, 0, '02:06', 2),
(304, 'over my family i\'d put u first', NULL, 1, 0, '19:25', 1),
(305, 'i\'d hold on the poems i\'d write u', NULL, 1, 0, '19:28', 2),
(306, 'damn', NULL, 0, 0, '10:01', 1),
(307, 'aaaaaaaa', NULL, 0, 0, '10:01', 1),
(308, 'aaaaaaaa', NULL, 0, 0, '10:02', 1),
(309, 'slowwwwwwww', NULL, 0, 0, '10:05', 1),
(310, 'saassa', NULL, 0, 0, '10:06', 2),
(311, 'ladjsfs', NULL, 0, 0, '10:06', 1),
(312, 'fsadf', NULL, 0, 0, '09:42', 2),
(313, 'fasdfasdf', NULL, 0, 0, '09:43', 2),
(314, 'coo', NULL, 0, 0, '09:55', 2),
(315, 'lakfjaf', NULL, 0, 0, '09:56', 2),
(316, 'alkfjaslf', NULL, 0, 0, '10:02', 2),
(317, 'aaa', NULL, 0, 0, '10:04', 2),
(318, 'i am hacik', NULL, 0, 0, '10:05', 2),
(319, 'aaaaaaaaa', NULL, 0, 0, '10:07', 2),
(320, 'hello wor', NULL, 2, 1, '14:06', 2),
(321, 'yo sammy this app is lit', NULL, 0, 0, '14:07', 2),
(322, 'thunderclousss', NULL, 0, 2, '20:31', 2),
(323, 'these thundercoulds', NULL, 0, 0, '20:31', 2),
(324, 'nothing feels better', NULL, 1, 0, '01:28', 2),
(325, 'this i sa amdesa', NULL, 1, 0, '09:20', 2),
(326, 'this is a new message', NULL, 0, 3, '14:07', 2),
(327, 'fdsdfa', NULL, 2, 1, '08:56', 2),
(328, 'helloooooooooooooooooo...............', NULL, 0, 0, '11:26', 6),
(329, 'funny', NULL, 0, 0, '12:16', 6),
(330, 'yesssssssssssss', NULL, 0, 0, '12:17', 6),
(331, 'black magic', NULL, 0, 0, '13:44', 6),
(332, 'ole ole ole ole', NULL, 0, 0, '13:45', 6),
(333, 'wah?', NULL, 0, 0, '14:36', 6),
(334, 'ive been doing me', NULL, 0, 0, '06:08', 6),
(335, 'if they ask', NULL, 0, 0, '06:08', 6),
(336, 'aye', NULL, 0, 0, '06:17', 6),
(337, 'welcome to camfila 2.0 Advertise your products on this open world plaform. Be free to contact admin for any help. Cheers!!', NULL, 0, 0, '11:52', 2),
(338, 'hlelhldhfakdfasf', NULL, 0, 1, '10:28', 2),
(339, 'in too deep', NULL, 0, 0, '15:02', 2),
(340, 'jhv', NULL, 0, 0, '15:09', 2);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notmsg_id` bigint(20) NOT NULL,
  `notmsg_type` text DEFAULT NULL,
  `sender_id` bigint(20) DEFAULT NULL,
  `sender_msg_id` bigint(20) DEFAULT NULL,
  `receiver_id` bigint(20) DEFAULT NULL,
  `receiver_msg_id` bigint(20) DEFAULT NULL,
  `date_created` text DEFAULT NULL,
  `read_status` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notmsg_id`, `notmsg_type`, `sender_id`, `sender_msg_id`, `receiver_id`, `receiver_msg_id`, `date_created`, `read_status`) VALUES
(2, 'like', 4, NULL, 1, 15, '22:17', 'read'),
(3, 'comment', 4, 76, 1, 15, '00:03', 'read'),
(13, 'like', 2, NULL, 5, 103, '19:03', 'read'),
(31, 'like', 3, NULL, 2, 100, '19:24', 'read'),
(40, 'comment', 2, 127, 1, 120, '21:35', 'read'),
(41, 'comment', 2, 128, 2, 127, '21:42', 'read'),
(42, 'comment', 2, 130, 3, 129, '21:49', 'read'),
(43, 'comment', 3, 131, 3, 129, '21:54', 'read'),
(44, 'comment', 3, 132, 3, 129, '21:54', 'read'),
(46, 'comment', 2, 135, 3, 133, '21:59', 'read'),
(47, 'comment', 3, 136, 3, 133, '', 'read'),
(48, 'comment', 3, 137, 2, 127, '22:00', 'read'),
(50, 'comment', 3, 138, 2, 127, '15:18', 'read'),
(51, 'comment', 3, 139, 4, 76, '15:18', 'read'),
(56, 'like', 1, NULL, 5, 103, '22:16', 'read'),
(57, 'follow', 3, NULL, 5, NULL, '10:03', 'read'),
(59, 'like', 2, NULL, 5, 142, '11:15', 'read'),
(60, 'like', 3, NULL, 5, 142, '11:47', 'read'),
(61, 'like', 4, NULL, 5, 142, '11:53', 'read'),
(63, 'comment', 2, 145, 5, 143, '12:02', 'read'),
(65, 'like', 4, NULL, 5, 144, '10:07', 'read'),
(68, 'like', 6, NULL, 5, 142, '09:51', 'read'),
(69, 'follow', 6, NULL, 1, NULL, '11:54', 'read'),
(77, 'like', 6, NULL, 2, 145, '23:13', 'read'),
(78, 'follow', 5, NULL, 2, NULL, '23:13', 'read'),
(88, 'like', 5, NULL, 3, 129, '22:02', 'read'),
(89, 'like', 5, NULL, 3, 133, '22:02', 'read'),
(90, 'like', 5, NULL, 2, 124, '22:02', 'read'),
(91, 'like', 5, NULL, 2, 100, '22:02', 'read'),
(134, 'like', 2, NULL, 5, 144, '00:17', 'read'),
(137, 'like', 2, NULL, 4, 76, '11:30', 'read'),
(138, 'comment', 2, 158, 3, 139, '22:56', 'unread'),
(139, 'comment', 2, 159, 3, 139, '22:56', 'unread'),
(140, 'like', 2, NULL, 3, 139, '22:57', 'unread'),
(141, 'comment', 2, 160, 3, 139, '22:57', 'unread'),
(142, 'comment', 2, 161, 4, 76, '23:00', 'read'),
(143, 'comment', 2, 162, 4, 76, '23:00', 'read'),
(144, 'comment', 2, 163, 4, 76, '23:00', 'read'),
(145, 'comment', 2, 164, 2, 156, '23:02', 'read'),
(148, 'comment', 6, 166, 1, 147, '12:35', 'read'),
(149, 'comment', 6, 167, 6, 166, '22:11', 'read'),
(163, 'follow', 4, NULL, 1, NULL, '17:58', 'read'),
(165, 'comment', 8, 195, 8, 193, '22:47', 'read'),
(166, 'comment', 8, 196, 8, 193, '22:47', 'read'),
(167, 'comment', 8, 197, 8, 196, '08:42', 'read'),
(168, 'comment', 8, 198, 8, 196, '08:42', 'read'),
(169, 'comment', 8, 199, 8, 196, '08:42', 'read'),
(170, 'comment', 8, 200, 8, 198, '08:45', 'read'),
(171, 'comment', 9, 204, 8, 196, '08:54', 'read'),
(184, 'follow', 4, NULL, 3, NULL, '15:07', 'unread'),
(185, 'follow', 4, NULL, 2, NULL, '15:07', 'read'),
(186, 'follow', 4, NULL, 5, NULL, '15:12', 'read'),
(190, 'follow', 1, NULL, 6, NULL, '21:26', 'read'),
(192, 'comment', 2, 219, 2, 218, '11:51', 'read'),
(197, 'like', 1, NULL, 2, 221, '18:24', 'read'),
(198, 'like', 5, NULL, 1, 223, '18:28', 'read'),
(199, 'comment', 5, 224, 1, 223, '18:29', 'read'),
(201, 'follow', 5, NULL, 1, NULL, '18:30', 'read'),
(202, 'like', 2, NULL, 5, 224, '18:37', 'read'),
(203, 'comment', 2, 225, 5, 224, '18:38', 'read'),
(204, 'like', 5, NULL, 2, 225, '18:41', 'read'),
(207, 'follow', 2, NULL, 13, NULL, '02:10', 'read'),
(210, 'like', 2, NULL, 1, 223, '11:19', 'read'),
(211, 'like', 1, NULL, 5, 224, '11:19', 'unread'),
(214, 'like', 1, NULL, 2, 225, '11:20', 'read'),
(223, 'comment', 2, 231, 2, 230, '16:28', 'read'),
(224, 'comment', 2, 232, 2, 230, '16:28', 'read'),
(225, 'comment', 1, 234, 1, 233, '16:33', 'read'),
(226, 'comment', 1, 235, 1, 233, '16:51', 'read'),
(227, 'comment', 1, 236, 1, 235, '16:53', 'read'),
(228, 'comment', 1, 237, 1, 236, '16:53', 'read'),
(229, 'comment', 1, 238, 1, 236, '16:58', 'read'),
(230, 'comment', 1, 239, 1, 236, '16:58', 'read'),
(231, 'comment', 1, 240, 1, 236, '16:59', 'read'),
(232, 'comment', 2, 244, 2, 242, '14:19', 'read'),
(234, 'follow', 13, NULL, 2, NULL, '14:53', 'read'),
(235, 'comment', 2, 271, 11, 269, '23:20', 'unread'),
(236, 'comment', 2, 273, 2, 272, '23:53', 'read'),
(238, 'comment', 2, 274, 11, 248, '03:17', 'unread'),
(239, 'comment', 2, 279, 1, 278, '11:23', 'read'),
(241, 'follow', 2, NULL, 11, NULL, '23:03', 'unread'),
(242, 'comment', 2, 299, 2, 298, '18:42', 'read'),
(243, 'comment', 2, 302, 2, 301, '02:06', 'read'),
(250, 'follow', 1, NULL, 2, NULL, '09:12', 'read'),
(255, 'like', 2, NULL, 1, 294, '12:47', 'read'),
(256, 'like', 1, NULL, 2, 280, '19:24', 'read'),
(257, 'comment', 1, 304, 2, 279, '19:25', 'read'),
(258, 'follow', 4, NULL, 6, NULL, '23:57', 'read'),
(259, 'like', 1, NULL, 2, 305, '12:22', 'read'),
(260, 'like', 1, NULL, 2, 301, '12:22', 'read'),
(261, 'follow', 15, NULL, 16, NULL, '01:07', 'read'),
(262, 'like', 4, NULL, 2, 320, '14:07', 'read'),
(263, 'comment', 2, 321, 2, 320, '14:07', 'read'),
(264, 'comment', 2, 323, 2, 322, '20:31', 'read'),
(265, 'comment', 2, 324, 2, 322, '01:28', 'read'),
(266, 'like', 6, NULL, 1, 281, '13:32', 'unread'),
(267, 'like', 6, NULL, 2, 276, '13:33', 'read'),
(271, 'like', 6, NULL, 2, 280, '02:26', 'read'),
(272, 'like', 6, NULL, 11, 261, '02:32', 'unread'),
(273, 'like', 6, NULL, 1, 304, '02:43', 'unread'),
(278, 'like', 6, NULL, 2, 327, '11:22', 'read'),
(279, 'like', 6, NULL, 5, 143, '11:23', 'unread'),
(280, 'like', 6, NULL, 5, 144, '11:23', 'unread'),
(282, 'comment', 6, 328, 2, 326, '11:26', 'read'),
(306, 'like', 6, NULL, 2, 279, '11:56', 'read'),
(311, 'comment', 6, 330, 2, 327, '12:17', 'read'),
(313, 'follow', 6, NULL, 2, NULL, '13:18', 'read'),
(318, 'comment', 6, 333, 2, 301, '14:36', 'read'),
(319, 'comment', 6, 334, 2, 326, '06:08', 'read'),
(320, 'comment', 6, 335, 2, 326, '06:08', 'read'),
(321, 'comment', 6, 336, 2, 279, '06:17', 'read'),
(327, 'comment', 2, 339, 2, 338, '15:02', 'read');

-- --------------------------------------------------------

--
-- Table structure for table `pinnedmessages`
--

CREATE TABLE `pinnedmessages` (
  `pin_id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `msg_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pinnedmessages`
--

INSERT INTO `pinnedmessages` (`pin_id`, `user_id`, `msg_id`) VALUES
(12, 2, 28),
(14, 2, 76),
(36, 1, 84),
(81, 3, 78),
(82, 2, 78),
(84, 1, 95),
(96, 6, 167),
(100, 2, 268),
(101, 2, 260),
(102, 2, 259),
(103, 2, 264),
(105, 2, 261),
(106, 2, 244),
(107, 2, 257),
(108, 1, 294),
(109, 1, 280),
(110, 1, 277),
(111, 4, 305),
(119, 2, 279),
(120, 2, 337);

-- --------------------------------------------------------

--
-- Table structure for table `specific_group_messages`
--

CREATE TABLE `specific_group_messages` (
  `grp_msg_id` bigint(20) NOT NULL,
  `group_id` bigint(20) DEFAULT NULL,
  `sender_id` bigint(20) DEFAULT NULL,
  `grp_msg` text DEFAULT NULL,
  `grp_msg_time` text DEFAULT NULL,
  `grp_msg_media` text DEFAULT NULL,
  `grp_audio_name` text DEFAULT NULL,
  `grp_audio_recorded` text DEFAULT NULL,
  `grp_audio_duration` text DEFAULT NULL,
  `grp_video` text DEFAULT NULL,
  `grp_video_thumbnail` text DEFAULT NULL,
  `grp_file_name` text DEFAULT NULL,
  `grp_file_path` text DEFAULT NULL,
  `grp_file_mime_type` text DEFAULT NULL,
  `grp_file_size` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `specific_group_messages`
--

INSERT INTO `specific_group_messages` (`grp_msg_id`, `group_id`, `sender_id`, `grp_msg`, `grp_msg_time`, `grp_msg_media`, `grp_audio_name`, `grp_audio_recorded`, `grp_audio_duration`, `grp_video`, `grp_video_thumbnail`, `grp_file_name`, `grp_file_path`, `grp_file_mime_type`, `grp_file_size`) VALUES
(1, 10, 2, 'cs 4', '10:26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 10, 2, 'fading', '08:11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 10, 2, 'faded', '08:13', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 10, 2, 'a;sf', '08:27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 10, 2, 'asdf', '08:27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 10, 2, 'dgh', '08:27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 10, 2, 'hfghdghdf', '08:27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 10, 2, 'hfgndfgbdf', '08:27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 10, 2, 'hh54h5h54', '08:27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 10, 2, 'sdfggsdfsggdf\'', '08:27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 10, 2, 'gfsdgsdfgsdg', '08:27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 10, 2, 'vbcbgfbt', '08:27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, 10, 2, '54yh45h5', '08:27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 10, 2, 'h54h45g', '08:27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 10, 2, '', '08:53', 'groupmessagemedia/msg_media08-53-27.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 10, 2, '', '08:53', 'groupmessagemedia/msg_media08-53-49.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 10, 2, '', '08:54', 'groupmessagemedia/msg_media08-54-15.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(18, 10, 2, '', '08:56', 'groupmessagemedia/msg_media08-56-21.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 10, 2, '', '08:58', 'groupmessagemedia/msg_media08-58-04.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(20, 10, 2, 'stonebwoy', '09:02', 'groupmessagemedia/msg_media09-02-19.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(21, 10, 2, 'f\'antasy', '09:02', 'groupmessagemedia/msg_media09-02-39.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(22, 10, 16, '', '09:09', 'groupmessagemedia/msg_media09-09-57.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(24, 10, 2, 'nice', '09:19', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(27, 4, 2, 'jhkgjg', '14:14', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(28, 8, 2, 'damn!', '01:33', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(29, 10, 2, 'hjk\njh', '02:25', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(30, 10, 2, 'kj', '02:26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(31, 2, 1, 'hey guys!', '11:42', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(32, 4, 2, 'ghjcjkbj', '04:56', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(33, 8, 2, 'ljka;jsfajfsd', '04:57', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(34, 11, 2, 'asdfa', '08:35', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(35, 8, 2, 'aaa', '08:35', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(39, 83, 16, 'yo', '13:31', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(40, 83, 2, 'yup', '20:57', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(41, 83, 2, 'aha', '20:58', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(42, 83, 2, 'this is damn!', '10:06', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(43, 83, 2, 'vhim', '11:54', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(44, 83, 2, NULL, '12:11', NULL, NULL, NULL, NULL, NULL, NULL, 'company policies.docx', 'file:///storage/emulated/0/WhatsApp/Media/WhatsApp Documents/company policies.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '30.2 KB'),
(45, 83, 2, NULL, '12:13', NULL, 'recording-444352908.3gpp', 'file:///storage/emulated/0/recording-444352908.3gpp', '6 sec', NULL, NULL, NULL, NULL, NULL, NULL),
(46, 83, 2, NULL, '12:14', NULL, NULL, NULL, NULL, '/storage/emulated/0/WhatsApp/Media/WhatsApp Video/VID-20190502-WA0008.mp4', 'groupchatsvideothumbnails/thumbnail12-14-15.jpg', NULL, NULL, NULL, NULL),
(47, 83, 2, '', '12:15', 'groupmessagemedia/msg_media12-15-31.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(48, 8, 2, NULL, '12:16', NULL, NULL, NULL, NULL, NULL, NULL, 'IMG-20190522-WA0013.jpg', 'file:///storage/emulated/0/WhatsApp/Media/WhatsApp Images/IMG-20190522-WA0013.jpg', 'image/jpeg', '98.2 KB'),
(49, 8, 2, NULL, '12:16', NULL, 'recording359899847.3gpp', 'file:///storage/emulated/0/recording359899847.3gpp', '3 sec', NULL, NULL, NULL, NULL, NULL, NULL),
(50, 8, 2, NULL, '12:17', NULL, NULL, NULL, NULL, '/storage/emulated/0/WhatsApp/Media/WhatsApp Video/VID-20190502-WA0038.mp4', 'groupchatsvideothumbnails/thumbnail12-17-50.jpg', NULL, NULL, NULL, NULL),
(51, 8, 2, '', '12:19', 'groupmessagemedia/msg_media12-19-06.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(52, 83, 1, 'ei', '19:21', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(53, 83, 1, NULL, '19:51', NULL, NULL, NULL, NULL, 'file:///storage/emulated/0/WhatsApp/Media/WhatsApp Video/VID-20190514-WA0005.mp4', 'groupchatsvideothumbnails/thumbnail19-51-10.jpg', NULL, NULL, NULL, NULL),
(54, 83, 1, '', '23:56', 'groupmessagemedia/msg_media23-56-53.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(55, 88, 2, 'hello people', '14:06', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(56, 88, 6, 'hello bro', '13:35', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(57, 89, 6, 'When a user receives a new message and the contract is not his friend, the user has the will to accept or decline the message. For every person a user chats with privately, they can send an audio, video, file, images or even call that user as well.', '13:36', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `useraccount`
--

CREATE TABLE `useraccount` (
  `user_id` bigint(20) NOT NULL,
  `refnumber` int(10) NOT NULL,
  `username` varchar(20) NOT NULL,
  `userpassword` varchar(20) NOT NULL,
  `profile_pic` text DEFAULT NULL,
  `about` text DEFAULT NULL,
  `user_phonenumber` text DEFAULT NULL,
  `user_email` text DEFAULT NULL,
  `user_website` text DEFAULT NULL,
  `date_joined` text DEFAULT NULL,
  `default_group_id` bigint(20) DEFAULT NULL,
  `date_leaving` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `useraccount`
--

INSERT INTO `useraccount` (`user_id`, `refnumber`, `username`, `userpassword`, `profile_pic`, `about`, `user_phonenumber`, `user_email`, `user_website`, `date_joined`, `default_group_id`, `date_leaving`) VALUES
(1, 20100389, 'mary', 'sharapova', NULL, 'nugs organizer', '0556378894', 'senndywind@gmail.com', '', 'February, 2019', 2, 'August, 2023'),
(2, 20382837, 'samuel', 'ttt', NULL, 'sciences', '0503658364', 'blacknx292@gmail.com', 'liverpoolfc.com\ngoal.com\ntwitter.com', 'February, 2019', 4, 'August, 2023'),
(3, 20457812, 'douglas', 'doncashes43', 'userprofilepics/img_user16-12-23.jpg', 'Uenr computer science  student', '0240459036', 'doncashes43@gmail.com', NULL, 'September, 2017', 4, 'September, 2021'),
(4, 20346765, 'micheal', 'roberts', 'userprofilepics/img_user26-12-22.jpg', 'carots\n\nin disguis', '02339292983', 'dauiel@hotmail.com', 'ip.com\nseek.com', 'February, 2019', 3, NULL),
(5, 20387463, 'ray', 'jackson', 'userprofilepics/img_user16-16-22.jpg', 'Regular user', '0244578973', 'rayjsackson34@yahoo.com', NULL, 'February, 2019', 5, NULL),
(6, 20997845, 'mike', 'phelan', 'userprofilepics/img_user16-12-22.jpg', 'biology', '0576849244', 'pheloan23@gmail.com', '', 'March, 2019', 6, NULL),
(8, 20338476, 'jeff', 'kay', 'userprofilepics/img_user16-16-22.jpg', 'scisca president', '0501078833', 'jeffjef123@gmail.com', 'ipmc.com', 'March, 2019', 9, NULL),
(9, 20884277, 'ryan', 'kent', 'userprofilepics/img_user16-12-22.jpg', 'organa', '0501431879', 'kent22@hotmail.com', NULL, 'March, 2019', 7, NULL),
(11, 20387756, 'eunice', 'piro', NULL, '', '0208157838', NULL, NULL, 'March, 2019', 4, NULL),
(12, 20983467, 'asante', 'abuzey', NULL, '', '0233848572', NULL, NULL, 'March, 2019', 6, NULL),
(13, 20123456, 'alabi', 'joshua', NULL, '3rd year student', '0244272837', NULL, NULL, 'March, 2019', 7, NULL),
(14, 14, 'morgan', 'freeman', NULL, '', '', '', '', NULL, 2, NULL),
(15, 15, 'charles', 'doe', NULL, 'who do  uthink u are', '', '', '', '', 9, NULL),
(16, 45, 'elliot', 'john', NULL, '', '', '', '', NULL, 9, NULL),
(18, 55, 'yb', 'rock', 'userprofilepics/img_user02-46-49.jpg', '', NULL, NULL, NULL, 'April, 2019', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `commentedmessages`
--
ALTER TABLE `commentedmessages`
  ADD PRIMARY KEY (`row_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `commentedmsg_id` (`commentedmsg_id`);

--
-- Indexes for table `dm`
--
ALTER TABLE `dm`
  ADD PRIMARY KEY (`dm_msg_id`),
  ADD KEY `loggedinuser_id` (`loggedinuser_id`),
  ADD KEY `user2_id` (`user2_id`);

--
-- Indexes for table `friendship`
--
ALTER TABLE `friendship`
  ADD PRIMARY KEY (`friendship_id`),
  ADD KEY `follower_id` (`follower_id`),
  ADD KEY `followed_id` (`followed_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`),
  ADD KEY `group_admin_id` (`group_admin_id`);

--
-- Indexes for table `group_membership`
--
ALTER TABLE `group_membership`
  ADD PRIMARY KEY (`row_id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `lastdmmessage`
--
ALTER TABLE `lastdmmessage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user1_id` (`user1_id`),
  ADD KEY `user2_id` (`user2_id`),
  ADD KEY `lastmsg_id` (`lastmsg_id`);

--
-- Indexes for table `lastgroupmessage`
--
ALTER TABLE `lastgroupmessage`
  ADD PRIMARY KEY (`row_id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `lastmsg_id` (`lastmsg_id`);

--
-- Indexes for table `likedmessages`
--
ALTER TABLE `likedmessages`
  ADD PRIMARY KEY (`row_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `likedmsg_id` (`likedmsg_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notmsg_id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `sender_msg_id` (`sender_msg_id`),
  ADD KEY `receiver_id` (`receiver_id`),
  ADD KEY `receiver_msg_id` (`receiver_msg_id`);

--
-- Indexes for table `pinnedmessages`
--
ALTER TABLE `pinnedmessages`
  ADD PRIMARY KEY (`pin_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `msg_id` (`msg_id`);

--
-- Indexes for table `specific_group_messages`
--
ALTER TABLE `specific_group_messages`
  ADD PRIMARY KEY (`grp_msg_id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Indexes for table `useraccount`
--
ALTER TABLE `useraccount`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `refnumber` (`refnumber`),
  ADD UNIQUE KEY `userpassword` (`userpassword`),
  ADD KEY `default_group_id` (`default_group_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `commentedmessages`
--
ALTER TABLE `commentedmessages`
  MODIFY `row_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- AUTO_INCREMENT for table `dm`
--
ALTER TABLE `dm`
  MODIFY `dm_msg_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=529;

--
-- AUTO_INCREMENT for table `friendship`
--
ALTER TABLE `friendship`
  MODIFY `friendship_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `group_membership`
--
ALTER TABLE `group_membership`
  MODIFY `row_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;

--
-- AUTO_INCREMENT for table `lastdmmessage`
--
ALTER TABLE `lastdmmessage`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `lastgroupmessage`
--
ALTER TABLE `lastgroupmessage`
  MODIFY `row_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `likedmessages`
--
ALTER TABLE `likedmessages`
  MODIFY `row_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=584;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=341;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notmsg_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=328;

--
-- AUTO_INCREMENT for table `pinnedmessages`
--
ALTER TABLE `pinnedmessages`
  MODIFY `pin_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT for table `specific_group_messages`
--
ALTER TABLE `specific_group_messages`
  MODIFY `grp_msg_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `useraccount`
--
ALTER TABLE `useraccount`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `commentedmessages`
--
ALTER TABLE `commentedmessages`
  ADD CONSTRAINT `commentedmessages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `useraccount` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `commentedmessages_ibfk_2` FOREIGN KEY (`commentedmsg_id`) REFERENCES `messages` (`message_id`) ON DELETE CASCADE;

--
-- Constraints for table `dm`
--
ALTER TABLE `dm`
  ADD CONSTRAINT `dm_ibfk_1` FOREIGN KEY (`loggedinuser_id`) REFERENCES `useraccount` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `dm_ibfk_2` FOREIGN KEY (`user2_id`) REFERENCES `useraccount` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `friendship`
--
ALTER TABLE `friendship`
  ADD CONSTRAINT `friendship_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `useraccount` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `friendship_ibfk_2` FOREIGN KEY (`followed_id`) REFERENCES `useraccount` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`group_admin_id`) REFERENCES `useraccount` (`user_id`);

--
-- Constraints for table `group_membership`
--
ALTER TABLE `group_membership`
  ADD CONSTRAINT `group_membership_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `group_membership_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `useraccount` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `lastdmmessage`
--
ALTER TABLE `lastdmmessage`
  ADD CONSTRAINT `lastdmmessage_ibfk_1` FOREIGN KEY (`user1_id`) REFERENCES `useraccount` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `lastdmmessage_ibfk_2` FOREIGN KEY (`user2_id`) REFERENCES `useraccount` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `lastdmmessage_ibfk_3` FOREIGN KEY (`lastmsg_id`) REFERENCES `dm` (`dm_msg_id`) ON DELETE CASCADE;

--
-- Constraints for table `lastgroupmessage`
--
ALTER TABLE `lastgroupmessage`
  ADD CONSTRAINT `lastgroupmessage_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `lastgroupmessage_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `useraccount` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `lastgroupmessage_ibfk_3` FOREIGN KEY (`lastmsg_id`) REFERENCES `specific_group_messages` (`grp_msg_id`) ON DELETE CASCADE;

--
-- Constraints for table `likedmessages`
--
ALTER TABLE `likedmessages`
  ADD CONSTRAINT `likedmessages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `useraccount` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likedmessages_ibfk_2` FOREIGN KEY (`likedmsg_id`) REFERENCES `messages` (`message_id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `useraccount` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `useraccount` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`sender_msg_id`) REFERENCES `messages` (`message_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_3` FOREIGN KEY (`receiver_id`) REFERENCES `useraccount` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_4` FOREIGN KEY (`receiver_msg_id`) REFERENCES `messages` (`message_id`) ON DELETE CASCADE;

--
-- Constraints for table `pinnedmessages`
--
ALTER TABLE `pinnedmessages`
  ADD CONSTRAINT `pinnedmessages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `useraccount` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pinnedmessages_ibfk_2` FOREIGN KEY (`msg_id`) REFERENCES `messages` (`message_id`) ON DELETE CASCADE;

--
-- Constraints for table `specific_group_messages`
--
ALTER TABLE `specific_group_messages`
  ADD CONSTRAINT `specific_group_messages_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `specific_group_messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `useraccount` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `useraccount`
--
ALTER TABLE `useraccount`
  ADD CONSTRAINT `useraccount_ibfk_1` FOREIGN KEY (`default_group_id`) REFERENCES `groups` (`group_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
