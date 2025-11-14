window.onerror = function(message, source, lineno, colno, error) {
  console.error("Error global detectado:");
  console.error("Mensaje:", message);
  console.error("Archivo:", source);
  console.error("Línea:", lineno, "Columna:", colno);
  console.error("Objeto error:", error);
};