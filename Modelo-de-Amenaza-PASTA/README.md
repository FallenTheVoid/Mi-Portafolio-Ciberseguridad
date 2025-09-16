# Modelo de Amenazas PASTA

**Resumen ejecutivo**

Este proyecto es una evaluación de amenazas de una nueva aplicación móvil utilizando el marco PASTA (Proceso de Simulación de Ataques y Análisis de Amenazas). Se identifican los objetivos de negocio, se analizan los componentes tecnológicos y se proponen controles de seguridad para mitigar los riesgos. El análisis reveló que la inyección SQL es una amenaza crítica para la seguridad de la aplicación, por lo que se proponen controles de mitigación específicos para proteger los datos de los usuarios.

**Marco PASTA: Evaluación de la Aplicación**

<img width="1111" height="698" alt="image" src="https://github.com/user-attachments/assets/3c52ec9e-6671-4d8e-a147-905d0f6b4c27" />


**Estrategia de Mitigación y Controles**

Para mitigar los riesgos identificados, se propone la siguiente estrategia de defensa en profundidad:

- Validación de Entradas: El uso de declaraciones preparadas evitará que las consultas maliciosas se ejecuten en la base de datos, protegiendo los datos de los usuarios.

- Cifrado de Datos: Cifrar los datos sensibles, como los números de tarjeta de crédito y las contraseñas, hará que la información sea inútil si los datos son robados.

- Autenticación y Autorización: Implementar la autenticación multifactor y el principio del menor privilegio limitará el acceso a los datos críticos, incluso si un atacante obtiene una contraseña.

- Pruebas de Penetración: Realizar pruebas periódicas en la aplicación móvil para identificar y corregir vulnerabilidades antes de su lanzamiento.

**Análisis de Riesgo Cuantitativo**

A continuación, se presenta una tabla que evalúa la probabilidad y la gravedad de las amenazas identificadas, asignando un valor numérico para determinar el nivel de riesgo.

<img width="809" height="261" alt="image" src="https://github.com/user-attachments/assets/2f529289-7867-4e3b-b1fd-7bfa76b693e6" />


**Conclusión**

Se demuestra la importancia de un enfoque proactivo en la seguridad del software. Al utilizar un marco como PASTA, se pueden identificar y mitigar riesgos de manera sistemática, asegurando que la aplicación sea segura para los usuarios y la empresa. Este análisis sienta las bases para un desarrollo seguro y refuerza la confianza de los clientes en la aplicación.
