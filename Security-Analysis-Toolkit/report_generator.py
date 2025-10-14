from jinja2 import Environment, FileSystemLoader
from datetime import datetime
import webbrowser
import os
import pdfkit
import integrity_verifier

def generate_report(scan_results):
    """
    Genera un reporte HTML con un nombre de archivo único basado en la fecha y hora.
    
    Args:
        scan_results (list): Una lista de diccionarios con los resultados del escaneo.

    Returns:
        str | None: La ruta al archivo HTML generado o None si hay un error.
    """
    try:
        # Genera nombre de archivo único
        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        output_filename = f"reporte_seguridad_{timestamp}.html"

        env = Environment(loader=FileSystemLoader('.'))
        template = env.get_template("template.html")
        report_data = {
            "results": scan_results,
            "fecha_reporte": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        html_content = template.render(report_data)

        with open(output_filename, "w", encoding="utf-8") as f:
            f.write(html_content)
        
        file_hash = integrity_verifier.calculate_sha256(output_filename)
        if file_hash:
            integrity_verifier.record_hash(output_filename, file_hash)

        filepath = os.path.abspath(output_filename)
        webbrowser.open(f"file://{filepath}")
        
        return filepath
    except Exception as e:
        print(f"Error al generar el reporte: {e}")
        return None

def export_to_pdf(html_filepath):
    """Convierte un reporte HTML existente a un archivo PDF."""
    try:
        if not os.path.exists(html_filepath):
            print(f"Error: El archivo de entrada no existe: {html_filepath}")
            return None
        pdf_filepath = os.path.splitext(html_filepath)[0] + ".pdf"
        pdfkit.from_file(html_filepath, pdf_filepath)
        return pdf_filepath
    except Exception as e:
        print(f"Error al convertir a PDF: {e}")
        return None
