DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS retailers;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS statuses;

CREATE TABLE statuses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$'),
    phone BIGINT NOT NULL CHECK (phone >= 1000000 AND phone <= 9999999999), -- 7 to 10 digits
    address TEXT NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE retailers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$'),
    phone BIGINT NOT NULL CHECK (phone >= 1000000 AND phone <= 9999999999),
    address TEXT NOT NULL,
    description TEXT
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$'),
    phone BIGINT NOT NULL CHECK (phone >= 1000000 AND phone <= 9999999999),
    ssn CHAR(9) NOT NULL CHECK (ssn ~ '^[0-9]{9}$'),
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    retailer_id INT NOT NULL REFERENCES retailers(id) ON DELETE CASCADE,
    customer_id INT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    status_id INT REFERENCES statuses(id) ON DELETE SET NULL,
    tracking_number BIGINT,
    shipping_method INT NOT NULL CHECK (shipping_method BETWEEN 1 AND 2),
    package_weight DECIMAL(10,2) NOT NULL CHECK (package_weight > 0),
    cost_weight DECIMAL(10,2) NOT NULL CHECK (cost_weight > 0)
);
