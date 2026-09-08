# Validación — v8.1

Validación realizada sobre la entrega `daggerheartblocks_v8_1`.

## Comprobaciones realizadas

- `node --check app.js`: **OK**.
- `index.html`: IDs únicos y presencia de todos los controles nuevos del generador: **OK**.
- Carga estática por HTTP de `index.html`, `app.js` y `srd-data.js`: **OK**.
- Biblioteca SRD original conservada: `srd-data.js` sigue formando parte del app shell.
- Pruebas unitarias aisladas del motor de encuentros: **OK**.
  - `Solitario → Solo`.
  - `A distancia → Ranged`.
  - `Líder → Leader`.
  - Un adversario custom local con tipo `Bruto` cuesta 4 PB.
  - Un adversario custom rápido con rol `Minion` cuesta 1 PB por grupo.
  - Un override de rol custom a `Solo` recalcula el costo a 5 PB.
- El cálculo de presupuesto utiliza el mismo camino para adversarios SRD, locales y rápidos, por lo que también considera los ajustes de Solo, Tier inferior y ausencia de roles pesados.
- La propuesta automática conserva el comportamiento de v8 y usa sólo adversarios SRD; los custom se añaden manualmente.
- PWA actualizada a caché `forja-bloques-v8-1`.

## Corrección del scroll

En escritorio, el diálogo usa una grilla con una fila central acotada y el catálogo derecho se comporta como columna flex. `encounter-catalog-list` posee `min-height: 0` y `overflow-y: auto`, por lo que una lista extensa desplaza únicamente el catálogo y no queda cortada por el alto del diálogo.

En resoluciones menores a 1050 px se utiliza un fallback responsive: el diálogo puede desplazarse verticalmente y la lista conserva además un alto máximo con scroll propio.

## Navegador headless del entorno

Se intentó una prueba adicional con Chromium headless, pero la instalación disponible en este entorno no logra inicializar correctamente D-Bus/zygote. Por ello la validación interactiva automatizada de navegador no se marca como completada; las validaciones estáticas, de carga HTTP y del motor JavaScript sí fueron completadas.
