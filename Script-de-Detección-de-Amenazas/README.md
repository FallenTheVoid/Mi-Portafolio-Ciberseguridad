# Detección de Amenazas Mediante Script

**Resumen del Proyecto**

Este script en Bash forma parte de una herramienta de análisis post-incidente diseñada para entornos Linux. Su propósito es detectar indicadores de compromiso (IOCs), como hashes de archivos maliciosos y direcciones IP vinculadas a servidores de comando y control (C&C).

Automatiza la búsqueda de evidencia en el sistema, lo que permite una respuesta rápida y precisa ante posibles infecciones. Gracias a su enfoque basado en firmas, este módulo resulta ideal para complementar soluciones de monitoreo en tiempo real.

Está diseñado para ser simple, efectivo y fácilmente integrable en flujos de trabajo de análisis forense, auditorías de seguridad o entornos de respuesta a incidentes.

**Habilidades Demostradas**

- Análisis de IOCs: Capacidad para identificar y buscar indicadores específicos de actividad maliciosa, como hashes de archivos y direcciones IP sospechosas.

- Automatización de tareas de seguridad: Uso de scripts de Bash para automatizar la búsqueda de amenazas, lo que permite una respuesta más rápida a incidentes.

- Monitoreo de sistemas: Implementación de un proceso de monitoreo continuo para detectar comportamientos inusuales en la red y el sistema de archivos.

- Gestión de la línea de comandos de Linux: Uso de comandos como find, grep y netstat para la detección de amenazas.

**Componentes del Proyecto**

Este proyecto se compone de dos scripts principales, cada uno con una función específica:

**analisis_ioc.sh**

Este script busca en el sistema archivos con un hash específico y examina los registros del sistema en busca de conexiones a una dirección IP de comando y control (C&C) conocida. Es ideal para un análisis posterior a un incidente de seguridad.

**Vista General del Script**

<img width="1050" height="749" alt="image" src="https://github.com/user-attachments/assets/6fe7c7b1-56fb-4ef7-8af2-6622ae530e75" />
<img width="1051" height="303" alt="image" src="https://github.com/user-attachments/assets/73cdbed9-ea00-4a33-baf5-49c75f0d174b" />


**Explicación técnica paso a paso**

**Creamos el archivo**

<img width="317" height="81" alt="image" src="https://github.com/user-attachments/assets/01403481-8ca0-4a97-9357-b2b94a3987ce" />

**Encabezado**

Indica que el script debe ejecutarse con el intérprete de Bash.

<img width="156" height="35" alt="image" src="https://github.com/user-attachments/assets/8bee3600-46d2-438c-a7ba-2ab6a70a8304" />

**Variables**

<img width="967" height="132" alt="image" src="https://github.com/user-attachments/assets/190181de-5e58-4147-9648-e6e139e960ff" />

- MALWARE_HASH: Hash SHA-256 de un archivo malicioso conocido.
- C2_IP: Dirección IP del servidor de comando y control (C&C).
- SEARCH_DIR: Directorio donde se buscarán archivos.
- OUTPUT_FILE: Archivo donde se guardarán los resultados, con marca de tiempo.

**Función para registrar eventos**

<img width="532" height="112" alt="image" src="https://github.com/user-attachments/assets/0da6b96f-f9ae-4f22-ab9a-dec6066db484" />

Permite registrar mensajes con niveles (INFO, ALERTA) tanto en consola como en el archivo de salida.

**Inicio del análisis**

<img width="635" height="60" alt="image" src="https://github.com/user-attachments/assets/e552f0e4-7322-4ddf-9c49-3cc560185e2e" />

Mensaje que marca el inicio del proceso.

**Búsqueda de archivos maliciosos**

<img width="892" height="246" alt="image" src="https://github.com/user-attachments/assets/14e1fa8d-38b4-4ceb-a6e3-0a5f58e63414" />

- Busca todos los archivos en el directorio del usuario.
- Calcula el hash SHA-256 de cada archivo.
- Si coincide con el hash malicioso, lo registra como amenaza.

**Búsqueda de IP sospechosa en logs**

<img width="778" height="217" alt="image" src="https://github.com/user-attachments/assets/a162b475-aca0-4793-9cb5-ab145bf968ca" />

- Busca la IP del servidor C&C en los archivos de log del sistema.
- Si se encuentra, se registra como alerta; si no, se informa que no hay tráfico sospechoso.

**Finalización**

<img width="817" height="57" alt="image" src="https://github.com/user-attachments/assets/5a9cadf1-5f04-41a6-96bb-b9179ae4fb80" />

Cierra el análisis y deja constancia del archivo generado.

**Como ejecutar el Script**

Antes de ejecutar el script, nos aseguramos de darle permisos de ejecución:

<img width="420" height="60" alt="image" src="https://github.com/user-attachments/assets/33365a2d-b847-4802-b8a6-5c3cda1021eb" />


**Ejemplo de salida**

<img width="1034" height="200" alt="image" src="https://github.com/user-attachments/assets/8bcbff66-1297-40f4-94b1-36bd632c8c2a" />
