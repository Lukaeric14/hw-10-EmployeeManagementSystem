INSERT INTO department (department_name)
VALUES 
    ('Management'),
    ('Accounting'),
    ('Sales'),
    ('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('CEO', 650000, 1),
    ('CFO', 230000, 1),
    ('Sales Director', 120000, 3),
    ('Accountant', 47000, 2),
    ('Marketing Associate', 40000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Luka', 'Eric', 1, NULL),
    ('Bristol', 'Corinne', 3, 2),
    ('Adelle', 'Irma', 2, 2),
    ('Nikole', 'Cathleen', 4, 2),
    ('Ron', 'Kieron', 4, NULL),
    ('Amelia', 'Collyn', 5, 1),
    ('Winthrop', 'Eula', 5, 1);


