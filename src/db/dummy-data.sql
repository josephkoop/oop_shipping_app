-- Insert into statuses
INSERT INTO statuses (name) VALUES 
    ('Ordered'),
    ('Shipped'),
    ('Delivered'),
    ('Delayed');

-- Insert into customers
INSERT INTO customers (name, email, phone, address, username, password) VALUES 
    ('John Doe', 'john.doe@example.com', 1234567890, '123 Main St', 'johndoe', 'password123'),
    ('Jane Smith', 'jane.smith@example.com', 2345678901, '456 Elm St', 'janesmith', 'securepass'),
    ('Michael Johnson', 'michael.j@example.com', 3456789012, '789 Oak St', 'michaelj', 'pass456'),
    ('Emily Brown', 'emily.b@example.com', 4567890123, '101 Pine St', 'emilyb', 'browniepass'),
    ('David White', 'david.w@example.com', 5678901234, '202 Maple St', 'davidw', 'whitepass');

-- Insert into retailers
INSERT INTO retailers (name, email, phone, address, description) VALUES 
    ('Titan Electronics', 'support@titanelectronics.com', 6789012345, '12 Market St', 'High-end electronics and gadgets'),
    ('Moda Trends', 'info@modatrends.com', 7890123456, '34 Commerce Ave', 'Fashion and apparel retailer'),
    ('Home Haven', 'contact@homehaven.com', 8901234567, '56 Trade Rd', 'Furniture and home essentials'),
    ('Green Grocers', 'sales@greengrocers.com', 9012345678, '78 Business Ln', 'Organic and fresh grocery supplier'),
    ('AllGoods Superstore', 'help@allgoods.com', 1234567890, '90 Retail Park', 'General merchandise and household goods');

-- Insert into employees
INSERT INTO employees (name, email, phone, ssn, username, password) VALUES 
    ('Alice Johnson', 'alice.j@example.com', 2345678901, '123456789', 'alicej', 'alicepass'),
    ('Bob Williams', 'bob.w@example.com', 3456789012, '234567890', 'bobw', 'bobsecure'),
    ('Charlie Davis', 'charlie.d@example.com', 4567890123, '345678901', 'charlied', 'charliepass'),
    ('Diana Roberts', 'diana.r@example.com', 5678901234, '456789012', 'dianar', 'robertspass'),
    ('Edward Miller', 'edward.m@example.com', 6789012345, '567890123', 'edwardm', 'millerpass');

-- Insert into orders
INSERT INTO orders (retailer_id, customer_id, status_id, tracking_number, shipping_method, package_weight, cost_weight) VALUES 
    (1, 1, 1, 1111111111, 1, 2.5, 15.00),
    (2, 2, 2, 2222222222, 2, 3.0, 20.00),
    (3, 3, 3, 3333333333, 1, 1.5, 10.00),
    (4, 4, 4, 4444444444, 2, 4.2, 25.00),
    (5, 5, 1, 5555555555, 1, 2.0, 12.00),
    (1, 3, 2, 6666666666, 2, 5.0, 30.00),
    (2, 4, 3, 7777777777, 1, 3.5, 18.00),
    (3, 5, 4, 8888888888, 2, 6.0, 35.00),
    (4, 1, 1, 9999999999, 1, 2.8, 14.00),
    (5, 2, 2, 1010101010, 2, 4.5, 28.00);