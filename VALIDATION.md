# Validación — Daggerheart Blocks v8.2

## Cambios validados

- La pestaña **Mis bloques** muestra un panel de filtros propio e independiente del panel de filtros SRD.
- Búsqueda de texto por título y contenido textual del bloque.
- Filtro por tipo de bloque: Todos / Adversarios / Ambientes / Misiones.
- Filtro por Tier 1–4.
- Ordenamiento por fecha y título.
- Contador de resultados filtrados respecto del total de bloques personales.
- Las imágenes Data URL se excluyen del índice de búsqueda para evitar procesar cadenas Base64 grandes en cada pulsación.
- Cambiar filtros sólo altera la lista visible; no escribe ni transforma la biblioteca de `localStorage`.
- Al volver a la pestaña SRD se mantienen sus filtros existentes y se ocultan los filtros personales.

## Compatibilidad

- No se modificó el esquema JSON de adversarios, ambientes o misiones.
- No se modificaron las claves de `localStorage`.
- La biblioteca existente de v8/v8.1 se carga sin migración.
- La caché PWA se actualizó a `forja-bloques-v8-2`.

## Pruebas ejecutadas

- `node --check app.js`: OK.
- `node --check service-worker.js`: OK.
- Comprobación de IDs HTML únicos: OK.
- Comprobación de referencias locales de `index.html`: OK.
- Comprobación estructural de los cuatro controles de filtro personales: OK.
