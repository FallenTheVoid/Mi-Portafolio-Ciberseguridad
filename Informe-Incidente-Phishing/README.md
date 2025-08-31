Caso: Ataque de Phishing a una Empresa de Software

Contexto

Eres un analista de ciberseguridad junior en una empresa llamada "Tech Solutions S.A.S.", que se especializa en el desarrollo de software como servicio (SaaS). Hoy es lunes por la mañana y el equipo de IT te informa de una situación anómala.

Incidente

A las 9:00 a.m. recibes un correo electrónico del Gerente General, el Sr. Carlos Gómez, en el que te pide que investigues un correo sospechoso. El correo fue enviado a varios empleados de la empresa, incluyendo al Director Financiero.

El asunto del correo era: "URGENTE: Actualización de Credenciales de Microsoft 365".

El cuerpo del mensaje contenía un texto que solicitaba a los empleados hacer clic en un enlace para "actualizar su contraseña" debido a una supuesta "brecha de seguridad detectada". El enlace en el correo dirigía a una página que se veía exactamente igual a la página de inicio de sesión de Microsoft 365.

Un empleado del área de Contabilidad, la Sra. Ana Pérez, hizo clic en el enlace y, preocupada, ingresó sus credenciales. Minutos después, recibió una alerta de su banco informándole de una transacción inusual por un monto de $5,000 USD a una cuenta desconocida.

Tus Tareas

Basado en la información anterior, responde las siguientes preguntas como si estuvieras en tu primer día de trabajo como analista de seguridad:

Identificación del Incidente: ¿Qué tipo de ciberataque es este? ¿Qué lo hace tan peligroso, especialmente en este caso?

Respuesta Inicial: ¿Cuáles serían tus tres acciones inmediatas para contener el incidente? Piensa en qué es lo primero que harías para detener el daño.

Investigación y Análisis: ¿Qué evidencias buscarías para entender la magnitud del ataque? Menciona al menos tres puntos de evidencia (por ejemplo, registros, archivos, etc.).

Recomendaciones de Mitigación: ¿Qué recomendaciones harías a la empresa para evitar que un incidente similar vuelva a ocurrir en el futuro? Piensa tanto en la tecnología como en la educación de los empleados.

Respuesta

Identificación del Incidente

El ataque es de phishing. Es peligroso porque usa la ingeniería social para aprovecharse del error humano, haciendo que las víctimas proporcionen información sensible, lo cual provoca pérdidas financieras, como en este caso la transacción bancaria.

Respuesta Inicial

Lo primero que haría para detener el daño sería bloquear y revocar las credenciales de la cuenta de la señora Ana. Esto evitaría que el atacante siga usando la cuenta para causar más daño, como reenviar correos de phishing a otros empleados o acceder a información confidencial. Adicionalmente, me pondría en contacto con el banco para reportar la transacción fraudulenta e intentar revertirla.

Investigación y Análisis

Podría investigar los registros del servidor de correo de la empresa para revisar a cuántos empleados se les envió el correo malicioso y quiénes hicieron clic en el enlace. Examinaría los encabezados del correo para ver la IP de origen, por cuáles servidores pasó y si es un correo falsificado. Por último, revisaría los registros de autenticación de Microsoft para buscar inicios de sesión inusuales desde la cuenta de Ana, como accesos desde una ubicación diferente o un dispositivo desconocido, lo cual indicaría que se usaron sus credenciales.

Recomendaciones de Mitigación

Simplemente reuniría al personal y los educaría acerca del phishing y de los ataques de ingeniería social. Esto ayudaría a que detecten estos correos o contenido malicioso y sería la manera más efectiva de contrarrestar los ataques de ingeniería social.
