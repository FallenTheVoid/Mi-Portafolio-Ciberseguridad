# Informe de Incidente de Seguridad: Fuga de Datos

**Resumen Ejecutivo**

Este informe detalla el análisis de una fuga de datos ocurrida en la empresa, donde documentos internos confidenciales fueron expuestos en redes sociales. La investigación se centró en identificar las causas del incidente y proponer soluciones basadas en el estándar NIST para evitar futuras exposiciones.

**Detalles del Incidente**

Un representante de éxito de clientes, a quien se le había otorgado acceso a una carpeta de documentos internos, compartió accidentalmente el enlace a la carpeta completa con un socio comercial. El socio, sin saber que el contenido era confidencial, lo publicó en una plataforma de redes sociales, lo que resultó en una filtración de información.

**Problemas Identificados**

El incidente fue resultado directo de una falla en el cumplimiento del principio de menor privilegio. El acceso no fue revocado después de que el empleado ya no lo necesitaba, lo que permitió que se compartiera por error. Esta falta de supervisión y una mala política de gestión de acceso fueron factores clave.

**Revisión de Controles de Seguridad (NIST)**

La empresa se basa en el NIST SP 800-53: AC-6 para sus controles de seguridad. Según este estándar, es crucial revisar periódicamente los privilegios de acceso para garantizar que los usuarios solo tengan el acceso necesario para sus roles actuales.

**Recomendaciones de Control**

Basado en el análisis, se proponen dos mejoras de control para fortalecer la seguridad de los datos:

- Separación de Tareas AC-6(2): Implementar una política que requiera la doble aprobación para la concesión de acceso a la información confidencial, evitando que un solo empleado pueda otorgar permisos excesivos.

- Revisión Periódica de Permisos AC-6(5): Establecer revisiones automáticas para revocar el acceso a los documentos confidenciales una vez que las asignaciones de trabajo hayan finalizado.

- Fechas de caducidad en enlaces: Crear una política que establezca fechas de caducidad automáticas para todos los enlaces de acceso compartido.

- Auditoría de acceso: Exigir a los gestores que realicen auditorías regulares para revisar quién puede acceder a sus archivos.

**Justificación**

Estas mejoras reducirán la probabilidad de futuras filtraciones al garantizar que el acceso a la información sea revocado de manera oportuna. La implementación de una política de fechas de caducidad en los enlaces, la separación de tareas, la revisión de permisos y las auditorías regulares reducirán significativamente el riesgo de que un solo error humano resulte en una exposición de datos.
