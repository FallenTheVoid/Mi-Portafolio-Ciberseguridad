# Reporte de Incidente de Seguridad DDoS

Resumen Ejecutivo

Una organización de medios digitales ha sido víctima de un ataque de denegación de servicio distribuido (DDoS) que afectó a la disponibilidad de la red interna durante dos horas. El ataque, que utilizó una avalancha de paquetes ICMP, expuso la vulnerabilidad de un firewall no configurado adecuadamente. Este informe documenta el incidente, el proceso de respuesta y propone un plan de acción proactivo, siguiendo el Marco de Ciberseguridad del NIST, para fortalecer la postura de seguridad de la red y mitigar futuros riesgos.

-----

Identificar 

Tipo de Ataque y Sistemas Afectados:

El ataque fue un DDoS por inundación de ICMP (ping flood), una técnica de denegación de servicio en la que el atacante satura un sistema con solicitudes de ping hasta sobrecargar los recursos de red.

Los sistemas afectados fueron:

- Red Interna: La conectividad de la red interna se vio comprometida, impidiendo el acceso normal a los sistemas.

- Servicios de Red: Todos los servicios de red de la organización dejaron de responder durante el ataque.

- Firewall: El firewall de la empresa fue la vulnerabilidad que permitió que el ataque tuviera éxito, debido a la falta de configuración adecuada para filtrar este tipo de tráfico.

------

Proteger

Plan de Acción Inmediato

Para proteger los activos de la organización de inmediato, se deben aplicar las siguientes medidas:

- Políticas de acceso: Implementar una política de control de acceso basada en el principio de privilegio mínimo para todos los recursos de red y activos críticos.

- Políticas de firewall: Configurar el firewall para negar por defecto todo el tráfico, permitiendo solo lo que sea estrictamente necesario. Esto incluye establecer reglas para limitar la tasa de de paquetes ICMP entrantes.

- Endurecimiento de sistemas: Realizar una auditoría a todos los dispositivos de red para eliminar cualquier configuración por defecto y deshabilitar todas las aplicaciones sin uso y servicios no críticos.

------

Detectar 

Monitoreo Continuo y Análisis de Tráfico

Para detectar incidentes similares en el futuro, se implementarán las siguientes capacidades de detección:

- Software de Monitoreo de Red: Utilizar un software de monitoreo para supervisar el tráfico de red en busca de patrones anormales, como el aumento repentino de paquetes de un tipo específico como en este caso ICMP.

- Sistemas de Detección/Prevención de Intrusiones (IDS/IPS): Implementar un sistema IDS/IPS que pueda inspeccionar el contenido de los paquetes y las solicitudes, y que se configure para filtrar y bloquear el tráfico sospechoso.

- Análisis de Registros (Logs): Mantener un registro detallado de toda la actividad de la red, los eventos del firewall y las conexiones para un análisis forense posterior.

------

Responder

Plan de Respuesta a Futuros Incidentes

En caso de que se produzca un incidente similar en el futuro, se seguirá un plan de respuesta estructurado para mitigar el impacto:

- Contención: Bloquear inmediatamente las direcciones IP de origen del ataque en el firewall o en el enrutador. Desconectar los servicios de red no esenciales para desviar recursos a los servicios críticos.

- Neutralización: El equipo de seguridad trabajará con el proveedor de servicios de internet (ISP) para mitigar el ataque desde un nivel superior. Se utilizará el sistema IDS/IPS para bloquear automáticamente las amenazas conocidas.

- Análisis del Incidente: Se recopilarán datos de los firewalls, routers, sistemas de monitoreo y logs de servidores para un análisis forense detallado.

- Mejora de Procesos: La información del análisis se utilizará para mejorar las reglas del firewall, actualizar las firmas del IDS/IPS y capacitar al personal en la respuesta a incidentes.

-----

Recuperar 

Medidas de Recuperación y Restauración

El objetivo de la recuperación es restaurar el funcionamiento normal de la red y los sistemas, y fortalecer la postura de seguridad para evitar futuras interrupciones:

- Restauración de Servicios: Una vez que el ataque haya sido neutralizado, se restablecerán de manera segura todos los servicios de red, priorizando aquellos que son críticos para el negocio.

- Copias de Seguridad: Se verificarán y utilizarán las copias de seguridad de los sistemas clave para restaurar los datos o configuraciones que puedan haber sido afectados.

- Evaluación Post-Incidente: Se llevará a cabo una reunión con el equipo de gestión y el equipo técnico para revisar el incidente, las acciones tomadas y las lecciones aprendidas. Esto servirá para ajustar el plan de respuesta y las políticas de seguridad.

- Comunicación: Se notificará a las partes interesadas sobre el estado de la red y las medidas de seguridad tomadas para evitar que el incidente se repita.
