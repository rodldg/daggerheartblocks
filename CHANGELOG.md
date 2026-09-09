# Historial de cambios

## Versión 8.2 — Filtros para la biblioteca personal

- Añade búsqueda de texto en **Mis bloques** por título y contenido relevante del bloque.
- Añade filtro por tipo: Adversario, Ambiente o Misión.
- Añade filtro por Tier 1–4 para adversarios y ambientes.
- Añade ordenamiento por fecha de actualización y título.
- Muestra el número de resultados visibles respecto del total de bloques personales guardados.
- Excluye imágenes Data URL del índice de búsqueda para evitar degradación de rendimiento con bibliotecas grandes.
- Mantiene intactos el formato JSON, las claves de `localStorage` y la compatibilidad con las versiones anteriores.
- Actualiza la caché PWA a `forja-bloques-v8-2`.

## Versión 8.1 — Encuentros custom y scroll del catálogo

- Corrige el scroll del catálogo del generador de encuentros cuando un filtro contiene muchos adversarios.
- Separa el desplazamiento del catálogo del resto del diálogo en escritorio y mantiene un fallback responsive en pantallas pequeñas.
- Integra automáticamente los bloques de adversario de **Mis bloques** como adversarios custom utilizables en encuentros.
- Añade filtros por fuente: Todos, SRD, Mis adversarios y Rápidos.
- Añade `＋ Custom` para crear un adversario rápido indicando nombre, Tier y rol.
- Infiere roles SRD desde nombres de tipo habituales en español e inglés y permite corregir el rol/costo desde el propio catálogo.
- Los adversarios custom participan en el cálculo de presupuesto, ajustes por composición, Minions, Solos y tiers inferiores.
- Conserva la generación automática basada sólo en la biblioteca SRD; los adversarios custom se agregan manualmente.
- Actualiza la caché PWA a `forja-bloques-v8-1`.

## Versión 8 — Biblioteca SRD, encuentros, negrita y autoguardado

- Incorpora `srd-data.js` con **129 adversarios** y **19 ambientes** extraídos del Daggerheart SRD 1.0 suministrado.
- Añade una pestaña **SRD** a la biblioteca con búsqueda y filtros por clase de bloque, Tier y rol/tipo.
- Los registros SRD se cargan siempre como copias editables y conservan referencia de página/fuente.
- Añade un **Generador de encuentros** basado en Puntos de Batalla del SRD.
- Implementa presupuesto base `(3 × PJ) + 2`, ajustes de dificultad/composición/daño y costos por rol.
- Los Minions se contabilizan como grupos iguales al número de PJ.
- Permite composición manual, propuesta automática balanceada y copia de resumen del encuentro.
- Añade formato de **negrita** mediante `**texto**` y botón `B` en campos compatibles.
- El render de Canvas interpreta la negrita en vista previa, PNG y PDF sin cambiar el esquema JSON.
- Añade autoguardado a **Mis bloques** con debounce de aproximadamente 900 ms después de dejar de escribir.
- La barra superior muestra el estado del autoguardado y el botón Guardar sigue disponible para guardado inmediato.
- Mantiene las claves de almacenamiento local y la normalización de JSON de las versiones anteriores.
- Actualiza la caché PWA a `forja-bloques-v8` e incorpora `srd-data.js` al app shell.

## Versión 7 — Bloques de misión e intensidad visual

- Añade el nuevo tipo de bloque **Misión**.
- Una misión puede representar una misión `Completa`, un `Acto` o un `Beat`.
- El encabezado de misión contiene título, tipo y resumen opcional.
- El cuerpo de una misión admite un número abierto de secciones.
- Cada sección puede tener título opcional y cualquier cantidad de bloques de contenido.
- Se agregan bloques de **Texto** y **Lista**.
- Las listas pueden ser `Punteadas` o `Numeradas`.
- Secciones y bloques internos pueden reordenarse con botones `↑` y `↓`.
- PNG y PDF funcionan también para misiones; el modo jugador exporta sólo el encabezado de la misión.
- Se añaden los temas `ambar-aventura` para intensidad media y `ascua-negra` para intensidad alta.
- Los seis temas visuales quedan disponibles en ambientes, adversarios y misiones.
- Se mantiene la importación de JSON de las versiones 2 a 6 sin migración manual.
- La caché PWA cambia a `forja-bloques-v7`.
- La vista previa reduce automáticamente la escala interna si una misión extremadamente extensa supera los límites habituales de Canvas.

## Versión 6

- Reorganiza la cabecera de los bloques para evitar colisiones con títulos extensos.
- Alinea título, tier, tipo y dificultad en la esquina superior izquierda.
- Mueve la etiqueta `AMBIENTE` o `ADVERSARIO` a la esquina inferior derecha.
- Permite que el título se distribuya automáticamente en hasta tres líneas.
- Ajusta gradualmente el tamaño del título antes de truncarlo.
- Aumenta automáticamente la altura efectiva de la cabecera cuando el título requiere más espacio.
- Añade una sombra localizada sobre imágenes para mejorar el contraste del encabezado.
- Mantiene el mismo comportamiento en vista previa, PNG, PDF y modo jugador.
- Conserva la estructura de JSON utilizada por las versiones 2 a 5.
- Actualiza la caché PWA a `forja-bloques-v6`.

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
