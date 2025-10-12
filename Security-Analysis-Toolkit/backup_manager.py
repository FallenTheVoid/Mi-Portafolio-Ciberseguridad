# backup_manager.py
import os
import zipfile
from datetime import datetime
from tkinter import filedialog, messagebox

def create_backup(parent_window):
    """Crea una copia de seguridad comprimida (.zip) de los archivos críticos."""
    try:
        files_to_backup = [f for f in os.listdir('.') if f.endswith((".json", ".html"))]
        
        if not files_to_backup:
            messagebox.showwarning("Sin Datos", "No hay archivos de datos (.json, .html) para respaldar.", parent=parent_window)
            return None

        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        default_filename = f"backup_seguridad_{timestamp}.zip"

        filepath = filedialog.asksaveasfilename(
            parent=parent_window,
            title="Guardar copia de seguridad como...",
            initialfile=default_filename,
            defaultextension=".zip",
            filetypes=[("Archivos Zip", "*.zip")]
        )

        if not filepath: return None
        
        with zipfile.ZipFile(filepath, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for file in files_to_backup:
                zipf.write(file)
        
        return filepath
    except Exception as e:
        messagebox.showerror("Error de Backup", f"Ocurrió un error al crear la copia de seguridad:\n{e}", parent=parent_window)
        return None

def restore_backup(parent_window):
    """Restaura los datos de la aplicación desde un archivo de backup .zip."""
    try:
        filepath = filedialog.askopenfilename(
            parent=parent_window,
            title="Seleccionar archivo de backup para restaurar",
            filetypes=[("Archivos Zip", "*.zip")]
        )
        if not filepath: return

        if not messagebox.askyesno("Confirmar Restauración", "ADVERTENCIA:\n\nEsto sobrescribirá el historial actual y los reportes existentes con los datos del backup.\n\n¿Estás seguro de que quieres continuar?"):
            return

        with zipfile.ZipFile(filepath, 'r') as zipf:
            zipf.extractall('.')
        
        messagebox.showinfo("Restauración Completa", "Los datos han sido restaurados exitosamente desde el backup.", parent=parent_window)
    except Exception as e:
        messagebox.showerror("Error de Restauración", f"Ocurrió un error al restaurar los datos:\n{e}", parent=parent_window)