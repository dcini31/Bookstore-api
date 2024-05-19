
---------- Deliverable 1: ----------

CREATE DATABASE Bookstore;

use Bookstore;

----- Create Authors table -----
CREATE TABLE Authors (
  author_id INT PRIMARY KEY IDENTITY,
  name VARCHAR(255) NOT NULL
);

----- Create Books table -----
CREATE TABLE Books (
  book_id INT PRIMARY KEY IDENTITY,
  title VARCHAR(255) NOT NULL,
  author_id INT FOREIGN KEY REFERENCES Authors(author_id),
  price DECIMAL(5,2) NOT NULL,
  quantity INT NOT NULL
);

----- Create Customers table -----
CREATE TABLE Customers (
  customer_id INT PRIMARY KEY IDENTITY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  address VARCHAR(255)
);

----- Create Orders table -----
CREATE TABLE Orders (
  order_id INT PRIMARY KEY IDENTITY,
  customer_id INT FOREIGN KEY REFERENCES Customers(customer_id),
  order_date DATE NOT NULL
);

-- Create OrderDetails -----
CREATE TABLE OrderDetails (
  order_id INT FOREIGN KEY REFERENCES Orders(order_id),
  book_id INT FOREIGN KEY REFERENCES Books(book_id),
  quantity INT NOT NULL,
  PRIMARY KEY (order_id, book_id)
);

---------- Deliverable 2: ----------


----- Authors data -----
DECLARE @count INT = 1;

WHILE @count <= 10
BEGIN
  INSERT INTO Authors (name)
  VALUES ('Author Name' + CAST(@count AS VARCHAR(10))); 
  SET @count = @count + 1;
END;

----- Books data -----
DECLARE @count INT = 1;
WHILE @count <= 10
BEGIN
  
  DECLARE @random_price DECIMAL(5,2) = FLOOR(RAND() * (50.00 - 10.00 + 1)) + 10.00;

  DECLARE @random_quantity INT = FLOOR(RAND() * (100 - 1 + 1)) + 1;
  
  INSERT INTO Books (title, author_id, price, quantity)
  VALUES ('Book Title' + CAST(@count AS VARCHAR(10)), @count, @random_price, @random_quantity);
  SET @count = @count + 1;
END;

----- Customers -----
DECLARE @count INT = 1;
WHILE @count <= 10
BEGIN
  INSERT INTO Customers (name, email, address)
  VALUES ('Customer Name' + CAST(@count AS VARCHAR(10)), 'customer' + CAST(@count AS VARCHAR(10)) + '@example.com', 'Address' + CAST(@count AS VARCHAR(10)));
  SET @count = @count + 1;
END;

----- Orders -----
DECLARE @count INT = 1;
WHILE @count <= 10
BEGIN
  DECLARE @order_date DATE = DATEADD(DAY, @count - 1, '2024-05-01');
  INSERT INTO Orders (customer_id, order_date)
  VALUES (@count, @order_date);
  SET @count = @count + 1;
END;

----- Order Details -----
DECLARE @order_id INT = 1;
DECLARE @total_per_order INT = 1;

WHILE @order_id <= 10
BEGIN
  INSERT INTO OrderDetails (order_id, book_id, quantity)
  SELECT @order_id, book_id, FLOOR(RAND() * (20 - 1 + 1)) + 1
  FROM (
      SELECT book_id, ROW_NUMBER() OVER (ORDER BY NEWID()) AS rn
      FROM Books
  ) AS RandomBooks
  WHERE rn <= @total_per_order;

  SET @order_id = @order_id + 1;
END;

---------- Deliverable 3: ----------

----- Books by Specific Author -----
SELECT * FROM Books WHERE author_id = (SELECT author_id FROM Authors WHERE name = 'Author Name1');

----- Total books sold -----
SELECT SUM(quantity) AS total_books_sold
FROM OrderDetails;

----- Total revenue from total orders -----
SELECT SUM(od.quantity * b.price) AS total_revenue
FROM OrderDetails od
JOIN Books b ON od.book_id = b.book_id;

----- Top 5 best selling books -----
SELECT TOP 5 b.title, SUM(od.quantity) AS total_sold
FROM OrderDetails od
JOIN Books b ON od.book_id = b.book_id
GROUP BY b.title
ORDER BY total_sold DESC;

----- Customers that spent the most to least -----
SELECT  c.customer_id, c.name, SUM(od.quantity * b.price) AS total_spent
FROM OrderDetails od
JOIN Orders o ON od.order_id = o.order_id
JOIN Customers c ON o.customer_id = c.customer_id
JOIN Books b ON od.book_id = b.book_id
GROUP BY c.customer_id, c.name
ORDER BY total_spent DESC




TRUNCATE TABLE OrderDetails;
TRUNCATE TABLE Orders;
DROP TABLE Authors;
DROP TABLE Books;
DROP TABLE Customers;