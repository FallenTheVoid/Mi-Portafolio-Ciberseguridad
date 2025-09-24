#!/bin/bash

# Script para buscar indicadores de compromiso (IOC) 

# Variables
MALWARE_HASH="74f4c8a24c29c5c7d6e4d5889e49b8095b35c02c6b412e87c53d9501d513567a"
C2_IP="203.0.113.42"
SEARCH_DIR="/home/$SUDO_USER"
OUTPUT_FILE="analisis_$(date +%Y%m%d_%H%M%S).txt"

# Función para registrar eventos
log_status() {
    echo "[$1] $2" | tee -a "$OUTPUT_FILE"
}

# Inicio del análisis
log_status "INFO" "Iniciando análisis de amenazas..."

# Busqueda de archivos con el hash malicioso
log_status "INFO" "Buscando archivos con hash: $MALWARE_HASH"
find "$SEARCH_DIR" -type f -print0 | while IFS= read -r -d $'\0' file; do
    CURRENT_HASH=$(sha256sum "$file" | awk '{print $1}')
    if [[ "$CURRENT_HASH" == "$MALWARE_HASH" ]]; then
        log_status "ALERTA" "Archivo malicioso encontrado: $file"
        echo "Ruta: $file" >> "$OUTPUT_FILE"
        echo "Hash: $CURRENT_HASH" >> "$OUTPUT_FILE"
    fi
done

# Buscar la IP del servidor C&C en los logs
log_status "INFO" "Buscando IP sospechosa: $C2_IP en /var/log/"
grep -r "$C2_IP" /var/log/ > /dev/null 2>&1
if [[ $? -eq 0 ]]; then
    log_status "ALERTA" "IP detectada en los registros: $C2_IP"
    grep -r "$C2_IP" /var/log/ >> "$OUTPUT_FILE"
else
    log_status "INFO" "No se encontró tráfico hacia $C2_IP"
fi

log_status "INFO" "Análisis completado. Resultados en: $OUTPUT_FILE"
