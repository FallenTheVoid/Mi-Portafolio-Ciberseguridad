# dashboard_generator.py
import json
from jinja2 import Environment, FileSystemLoader
from datetime import datetime
import webbrowser
import os

HISTORY_FILE = "scan_history.json"

def generate_dashboard():
    """Genera un dashboard HTML a partir del historial completo de escaneos.

    Esta función lee todos los resultados guardados en el archivo HISTORY_FILE,
    calcula estadísticas agregadas (total de hosts, hallazgos maliciosos, etc.),
    y renderiza la plantilla "dashboard_template.html" con estos datos.
    El dashboard resultante se guarda y se abre en el navegador web.

    Returns:
        str | None: La ruta absoluta al archivo del dashboard si se genera
                    correctamente. Retorna None si ocurre un error.
    """
    # 1. Cargar el historial desde el archivo JSON
    try:
        with open(HISTORY_FILE, "r", encoding="utf-8") as f:
            history = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        # Si el archivo no existe o está vacío, se inicia con una lista vacía
        history = []

    # 2. Calcular estadísticas clave a partir de los datos históricos
    stats = {
        "total_hosts": len(history),
        "malicious_hosts": sum(1 for h in history if h.get('reputacion', {}).get('reputacion') == 'malicioso'),
        "open_ports": sum(1 for h in history for p in h.get('ports', []) if p.get('estado') == 'abierto'),
        "port_alerts": sum(1 for h in history for p in h.get('ports', []) if p.get('alerta'))
    }

    # 3. Procesar datos para mejorar la visualización en la tabla del dashboard
    for host_data in history:
        open_ports = [str(p['puerto']) for p in host_data.get('ports', []) if p.get('estado') == 'abierto']
        host_data['open_ports_summary'] = ", ".join(open_ports) if open_ports else "Ninguno"
        # La fecha ('scan_date') ya fue añadida al guardar en logic_scanner.py

    # 4. Renderizar la plantilla HTML con los datos procesados
    try:
        env = Environment(loader=FileSystemLoader('.'))
        template = env.get_template("dashboard_template.html")
        html_content = template.render(stats=stats, history=history)

        output_filename = "dashboard.html"
        with open(output_filename, "w", encoding="utf-8") as f:
            f.write(html_content)

        filepath = os.path.abspath(output_filename)
        webbrowser.open(f"file://{filepath}")
        return filepath
    
    except Exception as e:
        print(f"Error al generar el dashboard: {e}")
        return None