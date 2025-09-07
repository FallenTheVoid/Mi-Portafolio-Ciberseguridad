# Análisis Forense en Base de Datos SQL

**Resumen Ejecutivo**

Este proyecto demuestra la capacidad de usar consultas SQL para investigar posibles incidentes de seguridad en una organización. Al utilizar filtros como AND, OR y NOT, se pueden aislar registros específicos de bases de datos de empleados e intentos de inicio de sesión. Este proceso es fundamental para la recopilación de información forense y para tomar decisiones de seguridad informadas.

-----------

**Habilidades Demostradas**

- Análisis forense: Uso de consultas de bases de datos para investigar incidentes de seguridad.

- Manejo de consultas SQL: Creación de consultas complejas para filtrar datos.

- Uso de filtros SQL: Aplicación de AND, OR, NOT y LIKE para obtener resultados precisos.

- Resolución de problemas: Capacidad de traducir un problema de seguridad a una consulta de base de datos.

-------------

**Documentación técnica:** 

**Creación y Estructura de la Base de Datos**

Para este proyecto, utilicé SQLite para simular un entorno de base de datos. Este sistema es ideal para pruebas, ya que no requiere un servidor y almacena todos los datos en un solo archivo.

**Creación de Tablas**

Se crearon dos tablas para el análisis forense: 

employees para la información de los empleados:

<img width="427" height="139" alt="image" src="https://github.com/user-attachments/assets/976103f8-9416-4895-b6ff-d3e172abb19f" />


log_in_attempts para los registros de intentos de inicio de sesión:


<img width="516" height="287" alt="image" src="https://github.com/user-attachments/assets/09350635-f523-4d3f-841b-27aca4b741ce" />


**Lógica de los Comandos de Creación:**

- CREATE TABLE: Esta es la instrucción principal que le dice a SQLite que se creará una tabla.

- Paréntesis (): Los paréntesis definen los límites de la tabla. Todo lo que está dentro de ellos son las columnas que contendrá.

- id INTEGER PRIMARY KEY: Define la columna id. INTEGER es un tipo de dato para números enteros y PRIMARY KEY es una restricción que asegura que cada id será único y exclusivo, sirviendo como identificador para cada registro.

- name TEXT NOT NULL: Define la columna en este caso name. TEXT es el tipo de dato para texto, y NOT NULL es una restricción que asegura que la columna nunca pueda quedar vacía.

- office TEXT: Define la columna office con el tipo de dato TEXT. A diferencia de otras columnas, no tiene la restricción NOT NULL, lo que significa que un registro podría no tener un valor en esta columna.

-------------------

**Inserción de Datos de Prueba**

Para simular el escenario, se insertaron datos de prueba en ambas tablas.

**employees**

<img width="835" height="167" alt="image" src="https://github.com/user-attachments/assets/f67dc3a5-0147-4e07-afbb-485067e7ba7b" />


**log_in_attempts** 

<img width="1026" height="283" alt="image" src="https://github.com/user-attachments/assets/e8a7ecc3-f7df-435c-96a3-cbc3e87e7604" />

**Lógica del Comando INSERT INTO:**

- INSERT INTO: Es la instrucción principal para agregar nuevos registros a una tabla.

- Listado de Columnas: En (name, department, office), los paréntesis especifican las columnas en las que se insertarán los datos. Usar esta lista es una buena práctica que asegura que los valores se inserten en el lugar correcto.

- VALUES: Es la palabra clave que precede a la lista de valores que se van a insertar. Los valores deben estar en el mismo orden que las columnas especificadas.

-----------

**Recuperar Intentos de Inicio de Sesión Fallidos Fuera de Horas Laborales**

Para investigar un posible incidente de seguridad, se necesita encontrar los intentos de inicio de sesión que ocurrieron después de las 18:00 y que no fueron exitosos.

**Consulta SQL:**

<img width="973" height="484" alt="image" src="https://github.com/user-attachments/assets/02be6bc8-72b6-4ab9-8206-9db173d70636" />

**Descripción:**

Esta consulta utiliza el operador AND para combinar dos condiciones: que el inicio de sesión haya fallado (success = 0) y que haya ocurrido después de las 18:00. El resultado de la ejecución muestra una lista de los intentos de inicio de sesión que cumplen ambas condiciones.



--------

**Recuperar Intentos de Inicio de Sesión en Fechas Específicas**

Para investigar un evento sospechoso, se necesita ver la actividad de los días 2022-05-09 y 2022-05-08.

**Consulta SQL:**

<img width="976" height="319" alt="image" src="https://github.com/user-attachments/assets/86103078-f9cb-4e36-947e-861e0958f66a" />

**Descripción:**

Esta consulta utiliza el operador OR para encontrar todos los registros que ocurrieron en cualquiera de las dos fechas específicas. El resultado muestra una lista de todos los intentos de inicio de sesión que ocurrieron el 2022-05-09 o el 2022-05-08.


---------------------

**Recuperar Intentos de Inicio de Sesión Fuera de Colombia**

Para investigar actividad sospechosa fuera del país, se debe filtrar todos los intentos de inicio de sesión que no se hayan originado en Colombia.

**Consulta SQL:**

<img width="983" height="314" alt="image" src="https://github.com/user-attachments/assets/36cea309-adf9-4eb4-a65e-5959ee798e86" />

**Descripción:**

Esta consulta utiliza el operador NOT para excluir todos los registros que se originaron en Colombia.  El operador LIKE se utiliza para la coincidencia de patrones, y el símbolo % indica que coincide con cualquier carácter que venga después de la palabra. El resultado muestra una lista de todos los intentos de inicio de sesión de cualquier otro país.


----------

**Recuperar Empleados en Marketing**

Se necesita identificar a los empleados del departamento de marketing en una oficina específica para una actualización de seguridad.

**Consulta SQL:**

<img width="778" height="228" alt="image" src="https://github.com/user-attachments/assets/35864df3-11f6-42ae-a45f-5216cf9452c5" />

**Descripción:** 

Esta consulta utiliza el operador AND para encontrar a todos los empleados que trabajan en el departamento de Marketing y, al mismo tiempo, en una oficina del Este.  El operador LIKE se utiliza para la coincidencia de patrones, y el símbolo % indica que coincide con cualquier carácter que venga después de la palabra. El resultado muestra una lista de los empleados que cumplen ambas condiciones.


-----------

**Recuperar Empleados en Finanzas o Ventas**

Para realizar otra actualización, se deben seleccionar a los empleados de los departamentos de Finanzas o Ventas.

**Consulta SQL:**

<img width="754" height="211" alt="image" src="https://github.com/user-attachments/assets/e7515166-5da6-440e-81f1-001b1d842c7d" />

**Descripción:**

Esta consulta utiliza el operador OR para encontrar todos los registros de empleados que pertenecen a Finanzas o Ventas. El resultado muestra una lista de todos los empleados en cualquiera de esos dos departamentos.

-------

**Recuperar a Todos los Empleados que no Están en IT**

Se necesita una lista de todos los empleados que no pertenecen al departamento de Tecnología de la Información.

**Consulta SQL:**

<img width="771" height="271" alt="image" src="https://github.com/user-attachments/assets/4e2bd039-de2a-4b22-b2d8-47b2648af47b" />

**Descripción:**

Esta consulta utiliza el operador NOT para excluir todos los registros de los empleados que pertenecen al departamento de Tecnología de la Información. El resultado muestra una lista de todos los demás empleados.


