# Historial de cambios

## 3.0.0 — Reordenamiento y renovación visual

- Los rasgos ahora pueden reordenarse mediante arrastre o con botones de flecha.
- Las flechas se desactivan automáticamente en el primer y último rasgo.
- Se eliminó el texto explicativo junto a la dificultad del ambiente; ahora se presenta únicamente como valor numérico.
- Se renovó el diseño de los bloques con una paleta pastel de azules, verdes, menta y tonos arena.
- Se mantuvo el esquema de datos de la versión 2 para conservar compatibilidad con sus JSON exportados.
- Se actualizó la caché offline de la PWA.

## Versión 2 — Ingredientes y perfiles de sabor

- Se añadió una sección de ingredientes exclusiva para adversarios.
- Cada adversario puede soltar hasta 10 ingredientes.
- Cada ingrediente admite entre 1 y 3 sabores únicos.
- Cada sabor tiene una potencia configurable entre 1 y 3.
- Dados asociados:
  - Dulce: d4
  - Salado: d6
  - Amargo: d8
  - Ácido: d10
  - Umami: d12
  - Raro: d20
- Cada ingrediente puede incluir un rasgo culinario opcional con nombre y descripción.
- La sección de ingredientes aparece automáticamente antes de los rasgos del adversario.
- Los datos se incluyen en exportaciones JSON, biblioteca local, PNG y PDF.
- Los bloques creados con la versión anterior se migran sin añadir ingredientes de ejemplo.
- Se actualizó la caché de la PWA para desplegar correctamente la nueva versión.
