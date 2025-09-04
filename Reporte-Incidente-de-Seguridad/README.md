## Reporte de Incidente de Seguridad

Resumen Ejecutivo

Un ataque de fuerza bruta comprometió el sitio web de la empresa, permitiendo que un atacante inyectara código malicioso que redirigía a los usuarios a un sitio con malware. La vulnerabilidad principal fue el uso de una contraseña de administrador predeterminada y la falta de controles de seguridad. Este informe detalla los hallazgos y recomendaciones para evitar nuevos ataques.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Reporte de incidente de seguridad

Identificar los protocolos involucrados en el incidente.

Se identificaron los siguientes protocolos: 

Sistema de Nombre de Dominios (DNS): se usa para traducir el nombre del dominio, a su IP correspondiente, el atacante manipulo este proceso de redireccion.

Protocolo de Transferencia de Hipertexto (HTTP): El codigo malicioso fue incrustado en el trafico HTTP.

Protocolo de Datagramas de Usuario (UDP): Protocolo de transporte usado por DNS

Protocolo de Control de Transmisión (TCP): Protocolo de transporte usado por HTTP

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Documentación del Incidente 

Este incidente de seguridad es un ataque de inyección de código malicioso, fue el resultado de un ataque de fuerza bruta exitoso para obtener acceso al panel de administración del sitio web. El objetivo final fue redirigir a los usuarios a un sitio fraudulento con malware.

Cronología del Incidente

Fase de Acceso Inicial: El hacker ejecutó un ataque de fuerza bruta contra la cuenta de administrador, adivinando la contraseña predeterminada y ganando acceso al panel de administración.

Fase de Inyección: El hacker modificó el código fuente del sitio web yummyrecipesforme.com para incrustar un script malicioso. Este script solicitaba a los usuarios descargar un archivo ejecutable.

Fase de Redirección: El script en el archivo ejecutable redirigía a los usuarios a una URL diferente (greatrecipesforme.com), que contenía el malware.

Fase de Post-Ataque: El hacker cambió la contraseña de la cuenta de administrador para bloquear al verdadero propietario del sitio web. Los clientes informaron de que sus ordenadores funcionaban más lento después de ejecutar el archivo.

Hallazgos

El servidor web fue comprometido a través de un ataque de fuerza bruta que explotó una contraseña de administrador predeterminada.

El código fuente del sitio web fue alterado, mostrando la adición de una función JavaScript que forzaba la descarga de un archivo.

El archivo descargado contenía un script de redirección maliciosa.

Los registros de tcpdump confirmaron el proceso de redirección, mostrando las peticiones HTTP y DNS a yummyrecipesforme.com seguidas por una redirección a greatrecipesforme.com.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Recomendación a ataques de fuerza bruta

Implementar política de contraseñas fuertes: Todos los usuarios deben utilizar contraseñas de al menos 12 caracteres entre mayúsculas y minúsculas, números y caracteres especiales.

Activar la Autenticación de Múltiples Factores (MFA): Solicitar una segunda verificación, como un código de verificación al teléfono o correo electrónico, esto hace mucho más difícil que la cuenta sea comprometida nuevamente.

Establecer sistema de captcha y recaptcha: Implementar antes de un intento de inicio de sesión para diferenciar a los usuarios de los bots. Es una medida de seguridad muy efectiva para prevenir ataques de fuerza bruta.

Limitar número de intentos: Configurar el bloqueo de la cuenta temporalmente después de varios intentos fallidos de inicio de sesión.
