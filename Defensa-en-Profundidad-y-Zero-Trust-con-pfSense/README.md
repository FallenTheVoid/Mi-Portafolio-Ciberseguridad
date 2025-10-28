# Defensa en Profundidad y Zero Trust con pfSense

Este proyecto documenta la implementación y el endurecimiento de un firewall perimetral pfSense en un entorno virtualizado. La arquitectura se basa en el principio de Defensa en Profundidad y aplica el enfoque Zero Trust mediante segmentación avanzada con VLANs. 

## Arquitectura del Proyecto

| Componente | Función en el Proyecto |Adaptador VirtualBox|
|-----------------|---------------------|-----------|
| pfSense  | Firewall Perimetral y Gateway Central  | Adaptador 1: Red NAT (WAN) / Adaptador 2: Adaptador Solo Anfitrión (LAN/VLANs) | 
| Admin-Workstation | Cliente de red (VLAN_USERS) para administración.  | Adaptador Solo Anfitrión (LAN)   |
| Metasploit | Servidor vulnerable (VLAN_SERVERS) para pruebas| Adaptador Solo Anfitrión (LAN)|

**Se implementaron cinco capas esenciales de seguridad: IDS, filtrado DNS, acceso remoto seguro (VPN), reglas de firewall explícitas y aislamiento de red.** 

| Capa de Defensa | Módulo de Seguridad | Objetivo|
|-----------------|---------------------|-----------|
| Capa 1 - Perímetro    | pfBlockerNG  | Filtrado de tráfico malicioso por DNS y Geo-IP. | 
| Capa 2 - Detección | Suricata IDS | Detección de ataques a nivel de red.  |
| Capa 3 - Acceso| OpenVPN | Acceso remoto cifrado para la administración.|
| Capa 4 - Separación | VLAN | Segmentación lógica de usuarios y servidores. |
| Capa 5 Control | Regla Zero Trust | Prevención de movimiento lateral entre segmentos.|


## Hardening y Preparación

Antes de la seguridad avanzada, se aseguró que el firewall pudiera operar correctamente en VirtualBox.

**Optimización de Rendimiento**
Se deshabilitó el Hardware Offloading para evitar la corrupción de paquetes y optimizar el rendimiento de Suricata y las VLANs, garantizando que el software de seguridad inspeccione el 100% del tráfico.

<img width="1134" height="289" alt="image" src="https://github.com/user-attachments/assets/67d6085b-f9a3-48e2-ae0a-a7b79d89fb7a" />


**Configuración de Interfaces**
Se corrigió la interfaz LAN para usar Red paravirtualizada (virtio-net), necesaria para el soporte de VLANs en pfSense/VirtualBox. La WAN está en Red NAT, y la LAN/VLANs en Adaptador Solo Anfitrión.

<img width="731" height="325" alt="image" src="https://github.com/user-attachments/assets/b18c9ca1-e3d9-4e62-b79f-324889132ba4" />

## Implementación de Capas de Seguridad 

**Capa 1: Perímetro pfBlockerNG**
Actúa como la primera línea de defensa, bloqueando tráfico de malware, phishing y geolocalizaciones de riesgo a nivel de DNS.

<img width="1139" height="575" alt="Screenshot 2025-10-25 114233" src="https://github.com/user-attachments/assets/f0c96945-d829-4bef-8464-df446edc1208" />

**Capa 2: Detección Suricata IDS**

Se configuró en modo solo Detección (IDS) en todas las interfaces Wan, VLAN-USERS, VLAN-SERVER. Su rol es monitorear el tráfico entrante, registrar y alertar al administrador sobre patrones de ataque sin bloquear activamente.

<img width="1154" height="196" alt="Screenshot 2025-10-28 125537" src="https://github.com/user-attachments/assets/954f6758-e0bf-4a76-87f5-4704cd7700ad" />

**Capa 3: Acceso OpenVPN**

Proporciona un acceso remoto cifrado para la administración, previa autenticación mediante certificados y credenciales. El servidor fue configurado con cifrado robusto (AES-256-GCM) y digest SHA256.

<img width="1157" height="170" alt="image" src="https://github.com/user-attachments/assets/d3074992-29a0-4301-9307-b34e451d6952" />


**Capa 4 y 5 Segmentación y Control**

Segmentación: Se crearon VLAN_SERVERS 10.0.10.1 y VLAN_USERS 10.0.20.1 para aislar los activos.

Zero Trust (Regla): Se implementó una regla de Bloqueo Explícito que prohíbe el tráfico de la VLAN_USERS a VLAN_SERVERS, previniendo el movimiento lateral (el vector de ataque interno más crítico).

<img width="1158" height="115" alt="image" src="https://github.com/user-attachments/assets/ae7a2685-65a5-4b37-bc23-6f9ed5ca7db1" />

## Pruebas de Validación y Arquitectura ZERO TRUST

Las pruebas incluyeron simulaciones ofensivas desde Kali Linux para evaluar el comportamiento del firewall, y validaciones desde la Admin-Workstation en VLAN_USERS para confirmar el bloqueo de tráfico no autorizado bajo el modelo Zero Trust.

**Ocultamiento del Firewall Escaneo de Gateway**
Esta prueba verificó que el gateway de la VLAN_SERVERS 10.0.10.1 estuviera oculto de la máquina atacante, impidiendo la identificación de servicios.

Ejecutado por: Máquina Atacante Kali Linux

Comando usado: nmap -p 22,80,443 10.0.10.1

<img width="675" height="386" alt="image" src="https://github.com/user-attachments/assets/0501d11c-9f50-4fae-842b-68df90e950a6" />

Resultado: Todos los puertos fueron reportados como filtered.

Conclusión: El firewall de pfSense descartó los paquetes sin enviar respuesta, logrando ocultamiento total (filtered) y frustrando el intento de mapeo de servicios.


**Prueba 2: Prevención de Movimiento Lateral (Escaneo de Servidor)**

Esta es la prueba principal que valida la Regla Zero Trust (Capa 5): confirmar que el atacante VLAN-USERS no puede alcanzar un servidor crítico en la VLAN-SERVERS 10.0.10.5.

Ejecutado por: Maquina atacante Admin-WorkStation 

Comando: nmap -A -T4 10.0.10.5

<img width="677" height="473" alt="image" src="https://github.com/user-attachments/assets/8263bb4c-0133-43c9-98d7-b994f2c26619" />


Resultado: Host seems down. If it is really up, but blocking our ping probes, try -Pn y Nmap done: 1 IP address (0 hosts up).

El firewall descartó el tráfico ICMP y TCP del Nmap, lo que hace que el host parezca "down", confirmando que la Workstation no pudo alcanzar el Servidor.


