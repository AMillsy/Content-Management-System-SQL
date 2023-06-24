use employee_db;

SELECT * FROM department;

/*VIEWING ROLES*/

-- SELECT role.id,role.title, department.name as role_department, role.salary FROM role
-- INNER JOIN department ON role.department_id = department.id;


/*VIEWING EMPLOYEES*/

-- SELECT employee.id,employee.first_name,COALESCE(employee.last_name,"") as last_name,role.title as job_title,role.salary as salary, CONCAT(COALESCE(managers.first_name,"")," ",COALESCE(managers.last_name,"")) as manager FROM employee
-- INNER JOIN role ON employee.role_id = role.id
-- LEFT JOIN employee AS managers ON employee.manager_id = managers.id
-- ORDER BY employee.id;

