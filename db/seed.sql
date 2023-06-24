INSERT INTO department(name)
VALUES("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO role(title,salary,department_id)
VALUES("Marketing lead",100000,1),
("Marketing Junior", 50000,1),
("Lead Engineer", 125000,2),
("Junior Engineer",80000,2 ),
("Accountant", 90000,3),
("Legal Admin", 150000,4),
("Lawyer", 185000,4);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES("Adam","Mills",3,null),
("Jack",null,4,1),
("John","Jones",1,null),
("Zach","Roans",6,3),
("Alex","Park",7,null),
("Sam","Allan",2,2),
("Jason","Doe",1,null),
("Hick",null,5,null);