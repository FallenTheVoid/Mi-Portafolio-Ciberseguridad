"""
http_checker.py
Módulo para verificar cabeceras HTTP y evaluar la reputación de un dominio.

Este script proporciona funciones para realizar solicitudes HTTP a un host,
extraer sus cabeceras y realizar una evaluación de seguridad básica
basada en una lista de dominios maliciosos conocidos y la resolución DNS.
"""

import requests
import socket

# Lista simulada de dominios conocidos por prácticas inseguras.
# En un entorno real, esto se conectaría a una API de Threat Intelligence.
DOMINIOS_MALICIOSOS = [
    "malicious-site.com",
    "phishing-example.net",
    "suspicious-domain.org"
]

def check_http_headers(host):
    """Realiza una solicitud HTTP GET y devuelve las cabeceras de la respuesta.

    Intenta conectar con el host a través del puerto 80 (HTTP) y extrae
    el diccionario de cabeceras de la respuesta del servidor.

    Args:
        host (str): La dirección IP o el nombre de dominio a verificar.

    Returns:
        dict: Un diccionario que contiene las cabeceras HTTP de la respuesta.
              Si ocurre un error de conexión, retorna un diccionario con
              una única clave 'error' y el mensaje de la excepción.
    """
    url = f"http://{host}"
    try:
        # Timeout de 3 segundos para evitar esperas largas
        response = requests.get(url, timeout=3)
        return dict(response.headers)
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

def evaluar_reputacion(host):
    """Evalúa si un dominio o IP tiene una reputación potencialmente insegura.

    La evaluación se basa en dos criterios principales:
    1. Comprueba si el host está presente en la lista `DOMINIOS_MALICIOSOS`.
    2. Verifica si el nombre de dominio se puede resolver a una dirección IP.

    Args:
        host (str): La dirección IP o el nombre de dominio a evaluar.

    Returns:
        dict: Un diccionario con el resultado de la reputación, conteniendo
              las claves 'reputacion' ('seguro', 'malicioso', 'inaccesible')
              y 'motivo' (una explicación del resultado).
    """
    reputacion = "seguro"
    motivo = "El dominio no se encuentra en listas negras conocidas."

    # Verificación contra la lista simulada de dominios maliciosos
    if host.lower() in DOMINIOS_MALICIOSOS:
        reputacion = "malicioso"
        motivo = "El dominio está listado como sospechoso."

    # Verificación básica de resolución DNS para validar la existencia del dominio
    try:
        socket.gethostbyname(host)
    except socket.gaierror:
        reputacion = "inaccesible"
        motivo = "No se pudo resolver el nombre de dominio (DNS lookup failed)."

    return {
        "reputacion": reputacion,
        "motivo": motivo
    }