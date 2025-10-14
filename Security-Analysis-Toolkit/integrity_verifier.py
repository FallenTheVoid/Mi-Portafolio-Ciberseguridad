import hashlib
import json

HASH_LEDGER_FILE = "integrity_hashes.json"

def calculate_sha256(filepath):
    """Calcula el hash SHA-256 de un archivo.

    Lee el archivo en bloques para manejar eficientemente archivos grandes.

    Args:
        filepath (str): La ruta al archivo cuyo hash se va a calcular.

    Returns:
        str: El hash SHA-256 en formato hexadecimal, o None si el archivo no se encuentra.
    """
    sha256_hash = hashlib.sha256()
    try:
        with open(filepath, "rb") as f:
            # Leer y actualizar el hash en bloques de 4K
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)
        return sha256_hash.hexdigest()
    except FileNotFoundError:
        return None

def record_hash(filename, file_hash):
    """Registra el hash de un archivo en el libro mayor de hashes (ledger).

    Args:
        filename (str): El nombre base del archivo (ej: "reporte.html").
        file_hash (str): El hash SHA-256 del archivo.
    """
    try:
        with open(HASH_LEDGER_FILE, "r", encoding="utf-8") as f:
            ledger = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        ledger = {}
    
    ledger[filename] = file_hash
    
    with open(HASH_LEDGER_FILE, "w", encoding="utf-8") as f:
        json.dump(ledger, f, indent=4)

def verify_integrity(filepath):
    """Verifica la integridad de un archivo comparando su hash actual con el registrado.

    Args:
        filepath (str): La ruta completa al archivo a verificar.

    Returns:
        tuple[bool, str]: Una tupla conteniendo un booleano (True para verificado,
                          False para no verificado) y un mensaje descriptivo.
    """
    import os
    filename = os.path.basename(filepath)
    current_hash = calculate_sha256(filepath)

    if not current_hash:
        return (False, "El archivo no fue encontrado.")

    try:
        with open(HASH_LEDGER_FILE, "r", encoding="utf-8") as f:
            ledger = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return (False, "No se encontró el registro de hashes. No se puede verificar.")

    recorded_hash = ledger.get(filename)

    if not recorded_hash:
        return (False, "El archivo no tiene un hash registrado. No se puede verificar.")
    
    if current_hash == recorded_hash:
        return (True, "VERIFICADO: El archivo es auténtico y no ha sido modificado.")
    else:
        return (False, "ALERTA: El contenido del archivo ha sido alterado.")
