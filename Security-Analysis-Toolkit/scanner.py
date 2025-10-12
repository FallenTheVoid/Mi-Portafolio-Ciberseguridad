"""
scanner.py
Módulo para realizar un escaneo de puertos TCP comunes.

Este script utiliza hilos (threading) para escanear de forma concurrente
una lista de puertos TCP comunes en un host determinado. Detecta si los
puertos están abiertos o cerrados y añade alertas contextuales para
ciertos hallazgos.
"""

import socket
import threading

# Puertos comunes seleccionados por su relevancia en auditorías de seguridad.
COMMON_PORTS = [21, 22, 23, 25, 53, 80, 110, 139, 443, 445, 3389]
PORT_SERVICES = {
    21: "FTP", 22: "SSH", 23: "Telnet", 25: "SMTP", 53: "DNS",
    80: "HTTP", 110: "POP3", 139: "NetBIOS", 443: "HTTPS",
    445: "SMB", 3389: "RDP"
}

def scan_port(host, port, timeout, results):
    """Escanea un único puerto TCP en un host y añade el resultado a una lista.

    Esta función está diseñada para ser ejecutada en un hilo separado. Intenta
    establecer una conexión con el puerto especificado. Añade un diccionario
    con el resultado (puerto, estado, servicio, alerta) a la lista `results`.

    Args:
        host (str): La IP o el dominio del objetivo.
        port (int): El número de puerto a escanear.
        timeout (int): El tiempo de espera en segundos para la conexión.
        results (list): La lista compartida donde se añadirán los resultados.
    """
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.settimeout(timeout)
            result = sock.connect_ex((host, port))
            estado = "abierto" if result == 0 else "cerrado"
            servicio = PORT_SERVICES.get(port, "desconocido")

            # Detección básica de patrones de riesgo para generar alertas
            alerta = None
            if estado == "abierto" and servicio in ["FTP", "Telnet"]:
                alerta = "Servicio inseguro (no cifrado) detectado."
            elif estado == "abierto" and port == 3389:
                alerta = "RDP expuesto a internet. Riesgo alto."

            results.append({
                "puerto": port,
                "estado": estado,
                "servicio": servicio,
                "alerta": alerta
            })
    except Exception as e:
        results.append({
            "puerto": port,
            "estado": f"error: {e}",
            "servicio": "desconocido",
            "alerta": "Error de conexión"
        })

def scan_ports(host, ports=None, timeout=1):
    """Escanea una lista de puertos en un host utilizando múltiples hilos.

    Orquesta el escaneo concurrente de puertos para mayor eficiencia. Lanza un
    hilo para cada puerto en la lista y espera a que todos terminen antes
    de devolver los resultados recopilados.

    Args:
        host (str): La IP o el dominio del objetivo.
        ports (list, optional): La lista de puertos a escanear. Si es None,
         se utiliza la lista `COMMON_PORTS`.
         Por defecto es None.
        timeout (int, optional): El tiempo de espera para cada conexión.
         Por defecto es 1 segundo.

    Returns:
        list: Una lista de diccionarios con los resultados del escaneo,
              ordenada por número de puerto.
    """
    if ports is None:
        ports = COMMON_PORTS

    results = []
    threads = []

    for port in ports:
        # Se crea un hilo por cada puerto para paralelizar el escaneo
        t = threading.Thread(target=scan_port, args=(host, port, timeout, results))
        threads.append(t)
        t.start()

    # Esperar a que todos los hilos terminen su ejecución
    for t in threads:
        t.join()

    # Devolver los resultados ordenados por puerto para una lectura coherente
    return sorted(results, key=lambda x: x["puerto"])