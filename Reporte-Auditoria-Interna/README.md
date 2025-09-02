Auditoría de Ciberseguridad - Controles de Acceso

A raíz de una alerta de seguridad interna, la dirección de la empresa DevLabs ha solicitado una auditoría para evaluar la seguridad de los controles de acceso de sus empleados. 

Alcance y Objetivo de la Auditoría
El alcance de esta auditoría se limitó a la revisión de los controles de acceso de los empleados. Se evaluaron los siguientes componentes:

Políticas de complejidad y gestión de contraseñas.
Uso e implementación de la autenticación de múltiples factores (MFA) en sistemas críticos.
Cumplimiento del Principio de Mínimo Privilegio.
Procesos de revocación de acceso para empleados desvinculados.

El objetivo principal de esta auditoría fue evaluar la postura de seguridad de la empresa con el fin de:

Determinar si los controles de seguridad existentes cumplen con las políticas internas.
Identificar vulnerabilidades y deficiencias.
Proporcionar recomendaciones viables para mitigar los riesgos.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Hallazgos y Análisis Detallado
A continuación, se presenta un análisis de cada hallazgo, indicando el nivel de cumplimiento y el riesgo asociado.

Hallazgo 1: Contraseña de la cuenta de Juan Díaz.

Política Relacionada: Política de Contraseñas.

Estado: No Cumple.

Análisis del Riesgo: La contraseña juan12345 es extremadamente débil y vulnerable a ataques de fuerza bruta. Esto representa un riesgo de que la cuenta sea comprometida, lo que podría provocar un acceso no autorizado.

Acción Correctiva Recomendada: Implementar una política de contraseñas de 12 o más caracteres con requisitos de complejidad. La cuenta de Juan Díaz debe ser forzada a restablecer su contraseña de inmediato.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Hallazgo 2: Autenticación de Múltiples Factores (MFA) para gerentes de proyecto.

Política Relacionada: Política de Autenticación.

Estado: Cumple.

Análisis del Riesgo: El uso de MFA en cuentas con acceso a datos críticos reduce el riesgo de acceso no autorizado, funcionando como una barrera adicional y robusta.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Hallazgo 3: Acceso de Sofía Romero a la base de datos financiera.

Política Relacionada: Principio de Mínimo Privilegio.

Estado: No Cumple.

Análisis del Riesgo: El acceso no autorizado a información sensible representa un riesgo de filtración de datos y robo de propiedad intelectual. Este acceso excesivo viola el principio de mínimo privilegio y crea una superficie de ataque muy grande.

Acción Correctiva Recomendada: Revocar inmediatamente los permisos de acceso de Sofía Romero a la base de datos financiera. Se debe realizar una revisión para garantizar que los permisos se ajusten solo a sus funciones laborales.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Hallazgo 4: Revocación de acceso de exempleado Pedro López.

Política Relacionada: Revisión de Accesos.

Estado: Cumple.

Análisis del Riesgo: La deshabilitación oportuna de la cuenta de un ex empleado evita el riesgo de que acceda a los sistemas de la empresa después de su salida. Este es un control fundamental para la seguridad.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Recomendaciones Finales de Mitigación
Con base en los hallazgos, se recomiendan las siguientes acciones para fortalecer la postura de seguridad de la empresa:

Revisión y Fortalecimiento de la Política de Contraseñas: Usar una política de contraseñas más robustas y considerar la implementación de un gestor de contraseñas corporativo.

Capacitación Continua del Personal: Realizar sesiones de concientización sobre ingeniería social y ataques de phishing.

Implementación de Revisiones de Acceso: Establecer un proceso trimestral de revisión de acceso para garantizar que los permisos de los empleados se mantengan actualizados.














