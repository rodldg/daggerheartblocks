# Historial de cambios

## 5.0.0 — Exportación para jugadores

- Los botones PNG y PDF ahora abren una lista desplegable con las opciones **Bloque completo** y **Modo jugador**.
- El modo jugador contiene exclusivamente título, tier, tipo, dificultad, imagen opcional y descripción corta.
- El modo jugador omite perfiles, estadísticas, ataques, experiencias, impulsos, adversarios potenciales, ingredientes y rasgos.
- Los archivos para jugadores reciben el sufijo `_modo_jugador`.
- La vista previa del editor y el JSON no cambian; el modo sólo se aplica durante la exportación.
- Se conserva la compatibilidad con JSON v2, v3 y v4.
- Se actualizó la caché offline de la PWA a la versión 5.

## 4.0.0 — Temas y correcciones gráficas

- Se reemplazó el texto comprimido `⋮⋮` del asa de arrastre por una cuadrícula gráfica de seis puntos.
- Se mantuvo el reordenamiento mediante arrastre y botones `↑` y `↓`, con límites automáticos para el primer y último rasgo.
- La dificultad se trasladó a la cabecera, debajo de `Tier X · Tipo` y con el mismo estilo tipográfico.
- Se eliminó la tarjeta independiente de dificultad del cuerpo de ambientes y adversarios.
- Los contadores de caracteres ahora se muestran debajo de cada control y nunca se superponen al contenido escrito.
- Se añadió un sistema de apariencia para la aplicación: Sistema, Claro y Oscuro.
- La apariencia predeterminada sigue la preferencia del sistema operativo.
- La interfaz utiliza una identidad visual propia, independiente del diseño de los bloques exportados.
- Se añadieron cuatro temas para los bloques: Bruma menta, Lavanda y rosa, Pergamino y salvia, y Cielo y coral.
- El tema del bloque se guarda como la propiedad opcional `blockTheme`.
- Los JSON de las versiones 2 y 3 siguen siendo compatibles; si no incluyen tema se aplica `bruma-menta`.
- Se actualizó la caché offline de la PWA a la versión 4.

## 3.0.0 — Reordenamiento y renovación visual

- Los rasgos pueden reordenarse mediante arrastre o con botones de flecha.
- Las flechas se desactivan automáticamente en el primer y último rasgo.
- Se renovó el diseño de los bloques con una paleta pastel de azules, verdes, menta y tonos arena.
- Se mantuvo el esquema de datos de la versión 2.

## 2.0.0 — Ingredientes y perfiles de sabor

- Se añadió una sección de ingredientes exclusiva para adversarios.
- Cada adversario puede soltar hasta 10 ingredientes.
- Cada ingrediente admite entre 1 y 3 sabores únicos, con potencia entre 1 y 3.
- Se añadieron los dados Dulce d4, Salado d6, Amargo d8, Ácido d10, Umami d12 y Raro d20.
- Cada ingrediente puede incluir un rasgo culinario opcional con nombre y descripción.
- Los ingredientes se incluyen en la biblioteca local y en las exportaciones JSON, PNG y PDF.
