# SecuScan

## Introducción

Esta es una herramienta de análisis de seguridad multifuncional, está desarrollada en Python y cuenta con una interfaz gráfica (GUI) construida con ttkbootstrap. El proyecto simula un flujo de trabajo realista de un Centro de Operaciones de Seguridad (SOC), permitiendo a los analistas escanear objetivos, generar informes profesionales y verificar la integridad de los datos generados.

Nació de la necesidad de automatizar tareas repetitivas en el análisis de seguridad, y evolucionó hasta convertirse en una solución integral con interfaz gráfica. Está diseñada como pieza de portafolio para demostrar habilidades en desarrollo de software, automatización y fundamentos clave de ciberseguridad.


## Características Principales

* **GUI Intuitiva y Moderna:** Interfaz gráfica construida con `ttkbootstrap` para una experiencia de usuario clara y profesional.
* **Análisis Multifacético de Objetivos:**
    * **Escáner de Puertos:** Detecta puertos comunes (TCP) de forma concurrente usando `threading`.
    * **Análisis de Cabeceras HTTP:** Extrae y muestra las cabeceras de respuesta del servidor.
    * **Evaluación de Reputación:** Comprueba el objetivo contra listas de dominios maliciosos.
* **Control de Acceso Basado en Roles (RBAC):**
    * **Analista SOC:** Acceso completo a todas las funcionalidades.
    * **Manager / Auditor:** Permite visualizar datos, generar reportes en PDF y verificar la integridad, pero no iniciar nuevos escaneos.
    * **Reclutador:** Vista simplificada con acceso únicamente al dashboard histórico para una evaluación rápida.
* **Reportes Profesionales:**
    * Genera reportes detallados en formato **HTML** con nombres de archivo únicos (`reporte_seguridad_FECHA_HORA.html`).
    * Incluye una herramienta para convertir cualquier reporte HTML a **PDF**.
* **Dashboard Histórico:** Visualiza un resumen agregado de todos los escaneos realizados a lo largo del tiempo.
* **Módulo de Seguridad e Integridad:**
    * **Verificación de Integridad con SHA-256:** Asegura que los reportes generados no hayan sido manipulados después de su creación.
    * **Visor de Hashes:** Permite consultar el "libro mayor" (ledger) de hashes registrados.
* **Resiliencia de Datos:**
    * **Backup & Restore:** Funcionalidad para crear y restaurar copias de seguridad de todos los datos críticos (`.json`, `.html`) en un archivo `.zip` portátil.
* **Visión a Futuro:**
    * Incluye un **placeholder** para una futura integración con servicios de almacenamiento en la nube, demostrando una arquitectura escalable.

## Capturas de Pantalla

**Selección de Rol**

<img width="393" height="274" alt="image" src="https://github.com/user-attachments/assets/e7dd19ef-b2f4-4207-94d9-ab3413857180" />

**Interfaz Principal - Rol Analista**

<img width="683" height="849" alt="image" src="https://github.com/user-attachments/assets/60290f5b-9e00-43e6-a376-c4eac0589d4c" />

**Herramienta en Acción**

<img width="680" height="852" alt="image" src="https://github.com/user-attachments/assets/4706a3fe-dec5-4ef3-a251-b0ea3fb2b615" />

**Entrega de Informe**

<img width="679" height="843" alt="image" src="https://github.com/user-attachments/assets/9b6a1999-862a-43cc-b6dc-5b7ef4183cd4" />

<img width="1842" height="866" alt="image" src="https://github.com/user-attachments/assets/40c93c86-7cbd-4ca4-81fc-3d24d4c3db27" />

**Dashboard**

<img width="1856" height="864" alt="image" src="https://github.com/user-attachments/assets/5b08d751-81da-42b9-8872-f5897e3768c3" />

**Verificación de Integridad - Hashes**

<img width="677" height="847" alt="image" src="https://github.com/user-attachments/assets/227bb24a-f1ce-4737-8af7-5d00599b7073" />

**Verificación Exitosa**

<img width="672" height="845" alt="image" src="https://github.com/user-attachments/assets/936efb3b-491f-4552-86c1-50666cfe5df9" />

**Fallo en la Verificación**

<img width="675" height="844" alt="image" src="https://github.com/user-attachments/assets/9c4b6b67-88ad-4ca4-8912-000877f2298c" />



## Tecnologías Utilizadas

* **Lenguaje:** Python 3
* **Interfaz Gráfica:** `ttkbootstrap` (un tema moderno para `tkinter`)
* **Librerías Principales:**
    * `requests`: Para solicitudes HTTP.
    * `jinja2`: Para la generación de plantillas HTML.
    * `pdfkit`: Para la conversión de HTML a PDF.
* **Dependencia Externa:**
    * `wkhtmltopdf`: Herramienta de línea de comandos requerida por `pdfkit`.
*  **Entorno de desarrollo:** Este proyecto fue creado dentro de un entorno virtual (`venv`) para aislar dependencias y evitar conflictos con el Python del sistema, especialmente en distribuciones como Kali Linux (PEP 668).


    
