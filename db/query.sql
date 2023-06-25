use employee_db;

-- SELECT * FROM employee;

-- SELECT id FROM employee
-- WHERE first_name = "Hick" and last_name IS NULL ;

-- SELECT id FROM employee
-- WHERE first_name = "Adam" and last_name = "Mills";



SELECT * FROM employee;

SELECT * FROM department;

SELECT * FROM role;

/*VIEWING ROLES*/

-- SELECT role.id,role.title, department.name as role_department, role.salary FROM role
-- INNER JOIN department ON role.department_id = department.id;


/*VIEWING EMPLOYEES*/

-- SELECT employee.id,employee.first_name,COALESCE(employee.last_name,"") as last_name,role.title as job_title,department.name as department,role.salary as salary, CONCAT(COALESCE(managers.first_name,"")," ",COALESCE(managers.last_name,"")) as manager FROM employee
-- INNER JOIN role ON employee.role_id = role.id
-- INNER JOIN department ON role.department_id = department.id
-- LEFT JOIN employee AS managers ON employee.manager_id = managers.id
-- ORDER BY employee.id;

