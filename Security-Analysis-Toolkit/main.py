"""
main.py
Punto de entrada principal para la Herramienta de Análisis de Seguridad.

Este script inicia la aplicación, crea la ventana raíz con ttkbootstrap, y
lanza la clase MainApp, que gestiona toda la lógica de la interfaz gráfica,
el flujo de roles y la interacción con los módulos de backend.
"""
import ttkbootstrap as ttk
from ttkbootstrap.constants import *
from tkinter import messagebox, filedialog, scrolledtext
import json, os
import logic_scanner
import report_generator
import dashboard_generator
import integrity_verifier
import backup_manager
import cloud_uploader

class MainApp:
    """Clase principal de la aplicación que gestiona la interfaz gráfica."""
    def __init__(self, root):
        self.root = root; self.root.title("Herramienta de Análisis de Seguridad"); self.root.geometry("400x250")
        self.role = None; self.last_scan_results = []; self.is_scanning = False
        self.create_role_selector_ui()

    def create_main_application_ui(self):
        self.clear_window(); self.root.geometry("700x850"); self.root.title(f"Herramienta de Análisis - Modo: {self.role}")
        main_frame = ttk.Frame(self.root, padding=20); main_frame.pack(fill=BOTH, expand=YES)
        
        header_frame = ttk.Frame(main_frame); header_frame.pack(fill=X, pady=(0, 10))
        role_label = ttk.Label(header_frame, text=f"Rol Actual: {self.role}", font=("Helvetica", 10, "bold")); role_label.pack(side=LEFT)
        change_role_button = ttk.Button(header_frame, text="Cambiar Rol", command=self.create_role_selector_ui, bootstyle=(LINK, PRIMARY)); change_role_button.pack(side=RIGHT)

        tools_frame = ttk.Labelframe(main_frame, text="Herramientas", padding=10); tools_frame.pack(fill=X, pady=(0, 10))
        tools_frame.columnconfigure((0, 1, 2), weight=1)
        self.dashboard_button = ttk.Button(tools_frame, text="📊 Ver Dashboard", command=self.show_dashboard, bootstyle=PRIMARY); self.dashboard_button.grid(row=0, column=0, sticky="ew", padx=(0, 5))
        self.verify_button = ttk.Button(tools_frame, text="🔐 Verificar Reporte", command=self.verify_report_integrity, bootstyle=SECONDARY); self.verify_button.grid(row=0, column=1, sticky="ew", padx=(5, 5))
        self.hashes_button = ttk.Button(tools_frame, text="🔑 Ver Hashes", command=self.show_hashes, bootstyle=INFO); self.hashes_button.grid(row=0, column=2, sticky="ew", padx=(5, 0))

        backup_frame = ttk.Labelframe(main_frame, text="Copia de Seguridad", padding=10); backup_frame.pack(fill=X, pady=10)
        backup_frame.columnconfigure((0, 1, 2), weight=1)
        self.backup_button = ttk.Button(backup_frame, text="📦 Crear Backup", command=self.run_backup, bootstyle=SUCCESS); self.backup_button.grid(row=0, column=0, sticky="ew", padx=(0, 5))
        self.restore_button = ttk.Button(backup_frame, text="📥 Restaurar Backup", command=self.run_restore, bootstyle=WARNING); self.restore_button.grid(row=0, column=1, sticky="ew", padx=(5, 5))
        self.cloud_button = ttk.Button(backup_frame, text="☁️ Subir a la Nube (Futuro)", command=self.run_cloud_upload, bootstyle=LIGHT); self.cloud_button.grid(row=0, column=2, sticky="ew", padx=(5, 0))

        controls_frame = ttk.Frame(main_frame); controls_frame.pack(fill=X, pady=(0, 10)); controls_frame.columnconfigure((0, 1), weight=1)
        self.report_button = ttk.Button(controls_frame, text="📄 Generar Reporte HTML (del último escaneo)", command=self.create_report, bootstyle=(OUTLINE, SUCCESS), state=DISABLED); self.report_button.grid(row=0, column=0, sticky="ew", padx=(0, 5))
        self.pdf_button = ttk.Button(controls_frame, text="📑 Convertir HTML a PDF", command=self.export_report_to_pdf, bootstyle=(OUTLINE, DANGER)); self.pdf_button.grid(row=0, column=1, sticky="ew", padx=(5, 0))
        
        self.manual_frame = ttk.Labelframe(main_frame, text="🔍 Escaneo Manual", padding=10)
        self.host_entry = ttk.Entry(self.manual_frame, bootstyle=PRIMARY); self.host_entry.pack(side=LEFT, fill=X, expand=YES, padx=(0, 10))
        self.scan_button = ttk.Button(self.manual_frame, text="Escanear", command=self.start_single_scan, bootstyle=SUCCESS); self.scan_button.pack(side=LEFT)
        self.file_frame = ttk.Labelframe(main_frame, text="📁 Escanear por Archivo", padding=10)
        self.file_scan_button = ttk.Button(self.file_frame, text="Seleccionar Archivo y Escanear", command=self.start_file_scan, bootstyle=INFO); self.file_scan_button.pack(fill=X)
        self.progress_bar = ttk.Progressbar(main_frame, mode='determinate', bootstyle=STRIPED)
        self.results_frame = ttk.Labelframe(main_frame, text="Resultados en Vivo", padding=10)
        self.results_text = ttk.Text(self.results_frame, wrap="word", state=DISABLED, height=15)
        scrollbar = ttk.Scrollbar(self.results_frame, orient=VERTICAL, command=self.results_text.yview); self.results_text.config(yscrollcommand=scrollbar.set); scrollbar.pack(side=RIGHT, fill=Y); self.results_text.pack(side=LEFT, fill=BOTH, expand=YES)
        footer = ttk.Label(self.root, text="© Richard Labs", font=("Helvetica", 8)); footer.pack(side=BOTTOM, pady=5)
        self.root.protocol("WM_DELETE_WINDOW", self.on_closing); self.setup_ui_for_role()

    def setup_ui_for_role(self):
        for btn in [self.dashboard_button, self.verify_button, self.hashes_button, self.backup_button, self.restore_button, self.cloud_button, self.pdf_button]: btn.config(state=NORMAL)
        if self.role == "Analista SOC":
            self.manual_frame.pack(fill=X, pady=5); self.host_entry.focus(); self.file_frame.pack(fill=X, pady=10); self.progress_bar.pack(fill=X, pady=15); self.results_frame.pack(fill=BOTH, expand=YES)
        elif self.role == "Manager / Auditor":
            info_label = ttk.Label(self.root, text="\nModo Manager: Funcionalidad de escaneo deshabilitada.", justify="center"); info_label.pack(fill=X, pady=20)
            self.report_button.config(state=DISABLED)
        elif self.role == "Reclutador":
            for btn in [self.report_button, self.pdf_button, self.verify_button, self.hashes_button, self.backup_button, self.restore_button, self.cloud_button]: btn.config(state=DISABLED)
            info_label = ttk.Label(self.root, text="\nModo Reclutador: Funcionalidad de escaneo deshabilitada.", justify="center"); info_label.pack(fill=X, pady=20)
    
    def on_scan_complete(self, results):
        self.is_scanning = False
        for btn in [self.dashboard_button, self.verify_button, self.hashes_button, self.backup_button, self.restore_button, self.cloud_button, self.pdf_button]: btn.config(state=NORMAL)
        if self.role == "Analista SOC": self.scan_button.config(state=NORMAL); self.file_scan_button.config(state=NORMAL)
        self.progress_bar['value'] = 100; self.last_scan_results = results
        if results: self.report_button.config(state=NORMAL)
        messagebox.showinfo("Finalizado", "El escaneo ha terminado.")

    def lock_gui(self):
        self.is_scanning = True
        for btn in [self.scan_button, self.file_scan_button, self.report_button, self.pdf_button, self.dashboard_button, self.verify_button, self.hashes_button, self.backup_button, self.restore_button, self.cloud_button]:
            if hasattr(self, 'scan_button') and btn.winfo_exists(): btn.config(state=DISABLED)
        self.progress_bar['value'] = 0; self.last_scan_results = []
        
    def run_backup(self):
        filepath = backup_manager.create_backup(self.root)
        if filepath: messagebox.showinfo("Backup Creado", f"Copia de seguridad guardada en:\n{filepath}", parent=self.root)
    def run_restore(self): backup_manager.restore_backup(self.root)
    def run_cloud_upload(self): cloud_uploader.upload_backup_to_cloud("placeholder.zip", self.root)
    def clear_window(self):
        for widget in self.root.winfo_children(): widget.destroy()
    def create_role_selector_ui(self):
        self.clear_window(); self.root.geometry("400x250")
        frame = ttk.Frame(self.root, padding=20); frame.pack(expand=YES, fill=BOTH)
        label = ttk.Label(frame, text="Bienvenido. Por favor, selecciona tu rol:", font=("Helvetica", 12)); label.pack(pady=10)
        roles = ["Analista SOC", "Manager / Auditor", "Reclutador"]
        self.role_combo = ttk.Combobox(frame, values=roles, state="readonly", bootstyle=PRIMARY); self.role_combo.pack(fill=X, pady=10); self.role_combo.set(roles[0])
        confirm_button = ttk.Button(frame, text="Confirmar e Iniciar", command=self.initialize_main_app, bootstyle=SUCCESS); confirm_button.pack(pady=20)
    def initialize_main_app(self):
        self.role = self.role_combo.get(); self.create_main_application_ui()
    def show_hashes(self):
        hash_window = ttk.Toplevel(self.root); hash_window.title("Ledger de Integridad de Hashes"); hash_window.geometry("600x400")
        try:
            with open(integrity_verifier.HASH_LEDGER_FILE, "r", encoding="utf-8") as f: display_text = json.dumps(json.load(f), indent=4)
        except (FileNotFoundError, json.JSONDecodeError): display_text = "No se ha generado ningún hash todavía."
        text_area = scrolledtext.ScrolledText(hash_window, wrap="word", state=DISABLED); text_area.pack(expand=True, fill=BOTH, padx=10, pady=10)
        text_area.config(state=NORMAL); text_area.insert("1.0", display_text); text_area.config(state=DISABLED)
    def on_closing(self):
        if self.is_scanning and messagebox.askyesno("Advertencia", "Hay un escaneo en progreso.\n\n¿Estás seguro de que quieres salir? Se cancelará el escaneo."): self.root.destroy()
        elif not self.is_scanning: self.root.destroy()
    def verify_report_integrity(self):
        filepath = filedialog.askopenfilename(title="Selecciona un reporte HTML para verificar", filetypes=(("Archivos HTML", "*.html"),));
        if not filepath: return
        is_valid, message = integrity_verifier.verify_integrity(filepath)
        if is_valid: messagebox.showinfo("Verificación Exitosa", message, parent=self.root)
        else: messagebox.showwarning("Fallo de Verificación", message, parent=self.root)
    def show_dashboard(self):
        filepath = dashboard_generator.generate_dashboard()
        if not filepath: messagebox.showerror("Error", "No se pudo generar o encontrar el dashboard.", parent=self.root)
    def start_single_scan(self):
        host = self.host_entry.get().strip()
        if not host: messagebox.showwarning("Entrada Vacía", "Por favor, ingrese una IP o dominio."); return
        self.prepare_and_run_scan([host])
    def start_file_scan(self):
        filepath = filedialog.askopenfilename(title="Selecciona un archivo", filetypes=(("Archivos de Texto", "*.txt"),))
        if not filepath: return
        try:
            with open(filepath, 'r', encoding="utf-8") as f: hosts = [line.strip() for line in f if line.strip()]
            if not hosts: messagebox.showwarning("Archivo Vacío", "El archivo está vacío."); return
            self.prepare_and_run_scan(hosts)
        except Exception as e: messagebox.showerror("Error al leer archivo", f"No se pudo leer el archivo:\n{e}")
    def prepare_and_run_scan(self, hosts_list):
        self.lock_gui(); self.update_results("", clear=True)
        logic_scanner.run_full_scan_and_collect(hosts_list, gui_callbacks={"update_progress": self.update_progress, "update_results": self.update_results, "on_complete": self.on_scan_complete})
    def update_progress(self, value): self.progress_bar['value'] = value
    def update_results(self, text, clear=False):
        self.results_text.config(state=NORMAL);
        if clear: self.results_text.delete(1.0, END)
        self.results_text.insert(END, text + "\n"); self.results_text.see(END); self.results_text.config(state=DISABLED)
    def create_report(self):
        if not self.last_scan_results: messagebox.showwarning("Sin Datos", "No hay resultados."); return
        filepath = report_generator.generate_report(self.last_scan_results)
        if filepath: messagebox.showinfo("Reporte Generado", f"Reporte HTML guardado como:\n{os.path.basename(filepath)}")
        else: messagebox.showerror("Error", "Ocurrió un error al generar el reporte.")
    def export_report_to_pdf(self):
        html_filepath = filedialog.askopenfilename(title="Selecciona el reporte HTML para convertir a PDF", filetypes=(("Archivos HTML", "*.html"),))
        if not html_filepath: return
        pdf_filepath = report_generator.export_to_pdf(html_filepath)
        if pdf_filepath: messagebox.showinfo("Exportación Exitosa", f"Reporte exportado a PDF:\n{pdf_filepath}")
        else: messagebox.showerror("Error de Exportación", "No se pudo generar el PDF. Asegúrate de que wkhtmltopdf esté instalado y en el PATH.")

if __name__ == "__main__":
    root = ttk.Window(themename="cyborg")
    app = MainApp(root)
    root.mainloop()