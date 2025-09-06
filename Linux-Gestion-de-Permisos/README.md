# Gestión de Permisos de Archivo en Linux

Resumen del Proyecto

En este proyecto se implementó una estructura de control de acceso en un servidor Linux. El objetivo fue crear una carpeta compartida y limitar su acceso a un grupo de usuarios específicos, aplicando el principio de seguridad de mínimo privilegio. Este proyecto demuestra la capacidad para proteger la confidencialidad de los datos y gestionar el acceso de forma segura.

Habilidades Demostradas:

- Gestión de permisos de archivo: Uso de chmod para controlar el acceso.

- Gestión de usuarios y grupos: Creación de usuarios y grupos con useradd y groupadd.

- Aplicación de políticas de seguridad: Implementación del principio de mínimo privilegio.

- Uso de la línea de comandos de Linux: Navegación, creación de directorios y manipulación de archivos.

- Documentación de procesos: Habilidad para describir de forma clara los pasos técnicos.

---------

Proceso

Paso 1: Configuración del Entorno:

Se creo un directorio para los archivos y un grupo para los usuarios autorizados.

- Creación de la carpeta para los proyectos:

El comando mkdir se utiliza para crear un nuevo directorio

$ sudo mkdir /var/proyectos

<img width="600" height="79" alt="image" src="https://github.com/user-attachments/assets/e8034787-52f5-4f9d-a37b-67af8f94fb57" />


- Creación del grupo de seguridad:

Con groupadd se crea un nuevo grupo en el sistema

$ sudo groupadd desarrolladores

<img width="612" height="74" alt="image" src="https://github.com/user-attachments/assets/31ed1bdf-2ce5-47e4-86f5-dcfe22f0a61a" />


- Creación de un usuario y asignación al grupo:

El comando useradd se usa para añadir un nuevo usuario. La opción -m crea el directorio personal del usuario, y la opción -G lo añade al grupo.

$ sudo useradd -m -G desarrolladores dev_1

<img width="563" height="74" alt="image" src="https://github.com/user-attachments/assets/a56c2c05-aac0-4bf2-a566-29f7e8a24389" />

-----------------

Paso 2: Asignación de Permisos de Acceso

Se utilizaron los comandos chown y chmod para asignar el grupo desarrolladores como el propietario y configurar los permisos de acceso.

- Cambio de propiedad de la carpeta:

El comando chown modifica el propietario. Se asigna root como dueño y el grupo desarrolladores como grupo propietario, lo que permite que los miembros del grupo tengan permisos de acceso específicos.

$ sudo chown root:desarrolladores /var/proyectos

<img width="587" height="74" alt="image" src="https://github.com/user-attachments/assets/23568eab-dbe6-494d-b599-bd23402a1c40" />


- Configuración de permisos de acceso (750):

El comando chmod se utiliza para establecer los permisos de un archivo o directorio. El número 750 en modo octal se desglosa así:

7 (dueño - root): Permisos de lectura, escritura y ejecución (rwx).

5 (grupo - desarrolladores): Permisos de lectura y ejecución (r-x).

0 (otros): Sin permisos (---).

$ sudo chmod 750 /var/proyectos

<img width="498" height="71" alt="image" src="https://github.com/user-attachments/assets/ea309359-8429-4ec7-9fc4-9c627ae60738" />

----------------

Paso 3: Verificación de la Configuración

- Se verificó que los permisos se aplicaran correctamente.

Verificación con ls -l: La salida de este comando muestra que la carpeta ahora pertenece al grupo desarrolladores y que los permisos drwxr-x--- se aplicaron correctamente.

<img width="601" height="45" alt="image" src="https://github.com/user-attachments/assets/cb16a5a8-0254-471a-ad87-6e2cca741e81" />

------------

Paso 4: Demostración del Principio de Mínimo Privilegio

- Se validó la configuración intentando acceder a la carpeta con un usuario que no era parte del grupo desarrolladores.

Intento de acceso con un usuario no autorizado: Se creó un nuevo usuario y se intentó acceder al directorio, el resultado fue que no se pudo acceder al directorio.

<img width="427" height="204" alt="image" src="https://github.com/user-attachments/assets/0b8109fb-0cc0-426c-92bb-6bbe308db961" />

-----------

Conclusión

Este proyecto demuestra la importancia de la gestión de permisos en Linux para proteger la confidencialidad de los datos, estableciendo una base sólida para el control de acceso y la seguridad del sistema.
