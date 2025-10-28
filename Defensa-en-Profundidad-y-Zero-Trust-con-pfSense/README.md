# Defensa en Profundidad y Zero Trust con pfSense

Este proyecto documenta la implementación y el endurecimiento de un firewall perimetral pfSense en un entorno virtualizado. La arquitectura se basa en el principio de Defensa en Profundidad y aplica el enfoque Zero Trust mediante segmentación avanzada con VLANs. 

## Arquitectura del Proyecto

| Componente | Función en el Proyecto |Adaptador VirtualBox|
|-----------------|---------------------|-----------|
| pfSense  | Firewall Perimetral y Gateway Central  | Adaptador 1: Red NAT (WAN) / Adaptador 2: Adaptador Solo Anfitrión (LAN/VLANs) | 
| Admin-Workstation | Cliente de red (VLAN_USERS) para administración.  | Adaptador Solo Anfitrión (LAN)   |
| Metasploit | Servidor vulnerable (VLAN_SERVERS) para pruebas| Adaptador Solo Anfitrión (LAN)|

**Se implementaron cinco capas esenciales de seguridad: IDS/IPS, filtrado DNS, acceso remoto seguro (VPN), reglas de firewall explícitas y aislamiento de red.** 

| Capa de Defensa | Módulo de Seguridad | Objetivo|
|-----------------|---------------------|-----------|
| Capa 1 - Perímetro    | pfBlockerNG  | Filtrado de tráfico malicioso por DNS y Geo-IP. | 
| Capa 2 - Detección | Suricata IDS/IPS | Detección y bloqueo activo de ataques a nivel de red.  |
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

## Implementación de Capas de Seguridad Avanzada

**Detección y Prevención de Intrusos con Suricata**
Suricata fue configurado en la interfaz WAN (le0) para monitorear el tráfico entrante de Internet. Se configuró en modo IDS (solo Detección) para priorizar el registro y la visibilidad de los intentos de ataque sin realizar bloqueos automáticos, permitiendo una revisión manual de los eventos.

<img width="1155" height="123" alt="image" src="https://github.com/user-attachments/assets/d07400b9-b3cd-41f1-98bb-8cfea331385b" />


**Segmentación de Red y Zero Trust**
Se crearon las VLANs VLAN_SERVERS 10.0.10.1 y VLAN_USERS 10.0.20.1 para aislar los activos. La regla de Bloqueo implementa el control de acceso más estricto.

La regla de Zero Trust prohíbe explícitamente a la red de usuarios acceder a la red de servidores, previniendo el movimiento lateral, el vector de ataque más común.

<img width="1158" height="115" alt="image" src="https://github.com/user-attachments/assets/ae7a2685-65a5-4b37-bc23-6f9ed5ca7db1" />


**Filtrado DNS con pfBlockerNG y Acceso Remoto con OpenVPN**
Estos módulos actúan como barreras adicionales. pfBlockerNG bloquea tráfico malicioso a nivel DNS. OpenVPN cifra el acceso remoto para administradores.

<img width="1139" height="575" alt="Screenshot 2025-10-25 114233" src="https://github.com/user-attachments/assets/f0c96945-d829-4bef-8464-df446edc1208" />

**Prueba de que funciona**

<img width="1276" height="774" alt="Screenshot 2025-10-25 121103" src="https://github.com/user-attachments/assets/47317fef-64c0-4e40-9452-0e4f1730f6d0" />

**VPN**

<img width="1166" height="170" alt="image" src="https://github.com/user-attachments/assets/fc00ccb0-9191-43ab-80fb-9fe8fc632d0f" />



