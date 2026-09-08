# Validación de la versión 8

Validación ejecutada antes de empaquetar la entrega.

## Pruebas superadas

- `node --check app.js`
- `node --check srd-data.js`
- Servidor estático local con `python -m http.server` y respuesta HTTP 200 de `index.html`.
- Verificación de orden de scripts: `srd-data.js` se carga antes de `app.js`.
- Verificación de elementos de interfaz requeridos: biblioteca SRD, diálogo de encuentros, indicador de autoguardado y botón de encuentros.
- Biblioteca SRD: **129 adversarios + 19 ambientes = 148 IDs únicos**.
- Todos los registros SRD tienen Tier 1–4 y los adversarios usan uno de los diez roles válidos del SRD.
- Funciones de producción del generador de encuentros ejecutadas de forma aislada:
  - 4 PJ → presupuesto base 14 PB.
  - ajuste fácil/corto −1.
  - ajuste difícil/largo +2.
  - aumento de daño global −2.
  - dos Solos −2.
  - adversario de Tier inferior +1.
  - ausencia de Bruto/Horda/Líder/Solitario +1.
  - costos por rol: Minion/Social/Support 1, Horde/Ranged/Skulk/Standard 2, Leader 3, Bruiser 4, Solo 5.
  - un grupo de Minions consume 1 PB, independientemente de que visualmente represente tantos Minions como PJ haya.
- Tokenizador de negrita de producción probado con segmentos `**texto**` simples y múltiples.
- `service-worker.js` usa la caché `forja-bloques-v8` e incluye `srd-data.js` en el app shell.

## Limitación del entorno de validación

Se intentó una segunda pasada con Chromium headless sobre el servidor local. El binario de Chromium de este entorno no logra inicializar completamente por dependencias de D-Bus/zygote y termina por timeout. Por ello no se declara una prueba E2E automatizada de navegador en esta ejecución. La validación anterior cubre sintaxis, datos, servidor estático y funciones críticas de lógica.

Para una comprobación final tras publicar en GitHub Pages, se recomienda abrir una entrada SRD, editarla, esperar el autoguardado, crear un encuentro y exportar un PNG/PDF.
