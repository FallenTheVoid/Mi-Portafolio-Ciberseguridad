# cloud_uploader.py
from tkinter import messagebox

def upload_backup_to_cloud(filepath, parent_window):
    """
    Placeholder para la funcionalidad de subida de backups a la nube.

    TODO: Para implementar esta función, se debería seguir el siguiente proceso:
    1.  Elegir un servicio en la nube (Google Drive, Dropbox, AWS).
    2.  Instalar la librería SDK correspondiente (ej: google-api-python-client).
    3.  Configurar las credenciales de la API (client_id, client_secret).
    4.  Implementar el flujo de autenticación OAuth2 para que el usuario
        pueda autorizar a la aplicación de forma segura.
    5.  Utilizar la API para subir el archivo especificado en 'filepath'.
    6.  Gestionar posibles errores de red o de autenticación.

    Esta funcionalidad se deja como una futura mejora debido a la complejidad
    del manejo de la autenticación y los tokens de seguridad.
    """
    print(f"INFO: La subida a la nube no está implementada. Archivo a subir: {filepath}")
    messagebox.showinfo(
        "Función Futura",
        "La integración con servicios en la nube está planificada para una futura versión.\n\n"
        "Esta característica requeriría una configuración de API y autenticación OAuth2.",
        parent=parent_window
    )