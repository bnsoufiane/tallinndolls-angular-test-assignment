--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `invoice_id` varchar(255) NOT NULL,
    `amount` FLOAT NOT NULL,
    `due_on` date NOT NULL,
    `sell_price` FLOAT NOT NULL,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


