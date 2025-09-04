## Evaluaciòn de Riesgos y Endurecimiento de la Red

Resumen Ejecutivo

Una revisión de seguridad realizada tras una reciente violación de datos ha identificado vulnerabilidades críticas en la red de la organización, que incluyen el uso de contraseñas débiles, la ausencia de autenticación multifactor (MFA) y una configuración de firewall inadecuada. Estas deficiencias exponen a la organización a un riesgo elevado de futuros ataques y nuevas filtraciones de información. Este informe detalla las prácticas de endurecimiento de la red para abordar cada vulnerabilidad, con el objetivo de mitigar los riesgos y fortalecer la seguridad de la empresa.

----------

### Vulnerabilidades

- Empleados comparten contraseñas. 

Práctica de Endurecimiento: Implementar Políticas de Contraseñas fuertes y un programa de capacitación para educar a los empleados sobre su importancia.

Una política de contraseñas obliga a los usuarios a crear contraseñas únicas y complejas, lo que reduce la vulnerabilidad a ataques de fuerza bruta. La capacitación es crucial para cambiar el comportamiento del personal y promover la seguridad de forma consciente.

Frecuencia: La política deben ser permanente, con recordatorios y capacitación regular cada seis meses.

- No se utiliza la Autenticación Multifactor (MFA).

Práctica de Endurecimiento: Implementar Autenticación Multifactor (MFA) en todas las cuentas críticas, especialmente en la de administrador de la base de datos y otras cuentas con acceso a información sensible.

MFA añade una capa de seguridad crítica. Incluso si un atacante obtiene la contraseña, no podrá acceder a la cuenta sin el segundo factor (como un código de una aplicación, correo o un mensaje de texto), lo que hace que la cuenta sea extremadamente difícil de comprometer.

Frecuencia: La MFA debe implementarse inmediatamente y exigirse su activacion en las cuentas de todos los empleados.

- El Firewall no tiene reglas establecidas.

Práctica de Endurecimiento: Implementar Filtrado de Puertos en el firewall para seguir el principio de denegar por defecto. Esto significa que solo se permite el tráfico a los puertos que son explícitamente necesarios y se bloquea todo lo demás.

El filtrado de puertos reduce la superficie de ataque, bloqueando los puertos y protocolos que los atacantes podrían usar para la intrusión y la exfiltración de datos. Es una defensa de primera línea crucial para proteger la red.

Frecuencia: Las reglas del firewall deben ser revisadas trimestralmente o cada vez que se realicen cambios en la red para asegurar que sigan siendo relevantes y efectivas. 

