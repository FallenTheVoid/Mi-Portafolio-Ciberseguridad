# Informe de Evaluación de Vulnerabilidades DB

**Fecha del Informe:** 14 de Septiembre 2025


**Resumen Ejecutivo**

Este informe detalla una evaluación de vulnerabilidad cualitativa para una base de datos de clientes de la empresa. El servidor, que se ha mantenido accesible al público, es una fuente crítica de ingresos y confianza del cliente. La evaluación se centra en los riesgos de actores externos, competidores y usuarios internos, que podrían resultar en la pérdida de datos y la interrupción de las operaciones. Siguiendo la guía del NIST SP 800-30 Rev. 1, se propone una estrategia de remediación de defensa en profundidad, incluyendo autenticación multifactor, el principio del menor privilegio y listas de control de acceso IP para mitigar estos riesgos y proteger los activos de la empresa.

**Descripción del Sistema**

El hardware del servidor consiste en un potente procesador de CPU y 128 GB de memoria. Se ejecuta en la última versión del sistema operativo Linux y aloja un sistema de gestión de bases de datos MySQL. Está configurado con una conexión de red estable mediante direcciones IPv4 e interactúa con otros servidores de la red. Las medidas de seguridad incluyen conexiones cifradas SSL/TLS.

**Alcance del Informe**

El alcance de esta evaluación de vulnerabilidad se relaciona con los controles de acceso actuales del sistema. La evaluación cubrirá un período de tres meses, de junio de 2025 a agosto de 2025. El NIST SP 800-30 Rev. 1 se utiliza como guía para el análisis de riesgos del sistema de información.

**Propósito**

El propósito de esta evaluación es identificar los riesgos asociados con la base de datos de la empresa, que ha estado abierta al público desde su lanzamiento. El servidor almacena información valiosa de los clientes y es vital para la consulta de clientes potenciales. La interrupción o el compromiso de esta base de datos podría detener las operaciones diarias, lo que resultaría en una pérdida de ingresos, la pérdida de confianza del cliente y la posible exposición de información personal. Esta evaluación ayudará a la empresa a tomar decisiones informadas para asegurar sus datos y operaciones.

**Evaluación de Riesgos**

<img width="852" height="220" alt="image" src="https://github.com/user-attachments/assets/70ebb254-5dc1-46ae-bd26-e1f6861f4746" />


**Enfoque**

Realicé una evaluación de vulnerabilidad cualitativa, basándome en mi juicio para estimar la probabilidad y la gravedad de los riesgos. Elegí las tres amenazas principales (Hacker, Competidor y Usuarios) porque representan los tipos de actores que se beneficiarían al atacar un servidor de base de datos vulnerable. Estas amenazas son riesgos significativos porque un compromiso podría llevar a la pérdida de datos de clientes, la interrupción de las operaciones comerciales y la pérdida de la ventaja competitiva.

**Estrategia de Remediación**

Se propone una estrategia de remediación de defensa en profundidad para mitigar los riesgos. Se deben implementar controles de seguridad como la autenticación multifactor (MFA) para limitar el acceso al servidor solo a los empleados autorizados. Además, el acceso debe basarse en el principio del menor privilegio, asegurando que cada empleado solo pueda acceder a los datos que necesita para sus funciones laborales. Las listas de control de acceso IP (IP allow-listing) deben implementarse para restringir la conexión al servidor de base de datos solo a las direcciones IP de la empresa, evitando el acceso público.
