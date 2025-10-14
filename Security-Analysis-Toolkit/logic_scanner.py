import threading
import json
from datetime import datetime
from http_checker import check_http_headers, evaluar_reputacion
from scanner import scan_ports

HISTORY_FILE = "scan_history.json"

def save_results_to_history(results_list):
    """Guarda una lista de resultados de escaneo en el archivo de historial JSON.

    Abre el archivo de historial existente, añade los nuevos resultados a la
    lista y vuelve a guardar el archivo completo. Si el archivo no existe
    o contiene datos inválidos, se crea uno nuevo. Cada resultado recibe
    una marca de tiempo antes de ser guardado.

    Args:
        results_list (list): Una lista de diccionarios, donde cada diccionario
        representa los resultados completos de un host.
    """
    try:
        with open(HISTORY_FILE, "r", encoding="utf-8") as f:
            history = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        history = []

    # Añadir la fecha a cada nuevo resultado antes de guardarlo
    for result in results_list:
        result['scan_date'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    history.extend(results_list)

    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=4)


def run_full_scan_and_collect(hosts_list, gui_callbacks):
    """Inicia el proceso de escaneo completo en un hilo de ejecución separado.

    Esta función actúa como un lanzador para no bloquear la interfaz gráfica.
    Crea un nuevo hilo que ejecutará la función _scan_worker_and_collect,
    la cual realiza el trabajo pesado.

    Args:
        hosts_list (list): Una lista de strings, donde cada string es una IP
         o un dominio a escanear.
        gui_callbacks (dict): Un diccionario de funciones (callbacks) para
          actualizar la GUI desde el hilo de trabajo. Debe
         contener 'update_progress', 'update_results', y
         'on_complete'.
    """
    scan_thread = threading.Thread(
        target=_scan_worker_and_collect,
        args=(hosts_list, gui_callbacks),
        daemon=True
    )
    scan_thread.start()


def _scan_worker_and_collect(hosts_list, callbacks):
    """
    Realiza el escaneo de cada host, actualiza la GUI y recolecta los resultados.

    Esta es la función principal de trabajo que se ejecuta en un hilo secundario.
    Itera sobre cada host en la lista, ejecuta las funciones de análisis
    (reputación, cabeceras, puertos), actualiza la GUI en tiempo real a
    través de los callbacks y acumula los resultados estructurados. Al
    finalizar, guarda los resultados en el historial y notifica a la GUI.

    Args:
        hosts_list (list): La lista de IPs o dominios a escanear.
        callbacks (dict): El diccionario de funciones para interactuar con la GUI.
    """
    total_hosts = len(hosts_list)
    callbacks["update_results"](f"[*] Iniciando escaneo para {total_hosts} objetivo(s)...", clear=True)
    
    all_results_data = []

    try:
        for i, host in enumerate(hosts_list):
            separator = "=" * 40
            callbacks["update_results"](f"\n{separator}\n[*] ESCANEANDO OBJETIVO {i+1}/{total_hosts}: {host}\n{separator}")

            current_host_data = {"host": host}

            # --- 1. Evaluación de Reputación ---
            callbacks["update_results"]("[*] Analizando reputación...")
            reputacion_info = evaluar_reputacion(host)
            current_host_data["reputacion"] = reputacion_info
            callbacks["update_results"](f"--- Reputación ---\n  - Estado: {reputacion_info['reputacion']}\n  - Motivo: {reputacion_info['motivo']}\n")

            # --- 2. Verificación de Cabeceras HTTP ---
            callbacks["update_results"]("[*] Verificando cabeceras HTTP...")
            headers = check_http_headers(host)
            current_host_data["headers"] = headers
            callbacks["update_results"]("--- Cabeceras HTTP ---")
            if "error" in headers:
                callbacks["update_results"](f"  - Error: {headers['error']}\n")
            else:
                for key, value in headers.items():
                    callbacks["update_results"](f"  - {key}: {value}")
            
            # --- 3. Escaneo de Puertos ---
            callbacks["update_results"]("\n[*] Escaneando puertos comunes...")
            port_results = scan_ports(host)
            current_host_data["ports"] = port_results
            callbacks["update_results"]("--- Escaneo de Puertos ---")
            if not port_results:
                callbacks["update_results"]("  - No se encontraron puertos abiertos o con errores.")
            else:
                for res in port_results:
                    alerta_str = f"  -> ALERTA: {res['alerta']}" if res.get('alerta') else ""
                    callbacks["update_results"](f"  - Puerto {res['puerto']} ({res['servicio']}): {res['estado']}{alerta_str}")
            
            all_results_data.append(current_host_data)

            # Actualizar el progreso general
            progress = ((i + 1) / total_hosts) * 100
            callbacks["update_progress"](progress)

        callbacks["update_results"](f"\n{separator}\n[+] Escaneo completo.\n{separator}")
        
        # Guardar en el historial al finalizar con éxito
        if all_results_data:
            save_results_to_history(all_results_data)

    except Exception as e:
        callbacks["update_results"](f"\n[!] Ocurrió un error inesperado: {e}")
    
    finally:
        # Notificar a la GUI que el proceso ha terminado y pasar los resultados
        callbacks["on_complete"](all_results_data)
