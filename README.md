# Forja de Bloques para Daggerheart

Versión 7. Aplicación web estática y serverless para crear bloques de **ambientes**, **adversarios** y **misiones** compatibles con Daggerheart. Está diseñada para publicarse directamente en GitHub Pages y no requiere backend, base de datos ni proceso de compilación.

## Tipos de bloque

### Ambiente

Incluye título, tier, tipo, dificultad, descripción corta, imagen opcional, impulsos, adversarios potenciales y rasgos reordenables.

### Adversario

Incluye título, tier, tipo, dificultad, descripción corta, imagen opcional, impulsos y tácticas, estadísticas, ataque, experiencias, ingredientes y rasgos reordenables.

Los ingredientes mantienen el sistema existente: máximo 10 por adversario, de 1 a 3 sabores por ingrediente, potencia de 1 a 3 y rasgo culinario opcional. Los dados de sabor son Dulce d4, Salado d6, Amargo d8, Ácido d10, Umami d12 y Raro d20.

### Misión

Pensado para planificar una misión completa o una parte de una historia mayor. El encabezado contiene:

- **Título**.
- **Tipo**: `Completa`, `Acto` o `Beat`.
- **Resumen opcional**.

El cuerpo está compuesto por secciones editables. Cada sección tiene un título opcional y puede contener tantos bloques como sea necesario de dos tipos:

- **Texto**: párrafos libres y saltos de línea.
- **Lista**: lista `Punteada` o `Numerada`, con un elemento por línea.

Las secciones y sus bloques pueden reordenarse con botones `↑` y `↓`. Siempre se conserva al menos una sección y un bloque dentro de ella.

Ejemplo de estructura:

```text
Misión introductoria
Completa
Misión introductoria pensada para Sesión 0.

GM Prep
¿Qué deben aprender los personajes?
• Introducir la historia
• Presentar personajes
• Plantear los misterios centrales

Beats
1. Los jugadores conocen al personaje X.
2. Un monstruo comienza su ataque.
3. Los jugadores aprenden las mecánicas de comida.
```

## Temas de bloques

Todos los tipos de bloque, incluida Misión, comparten el mismo sistema de temas:

- `bruma-menta` — **predeterminado**. Azules grisáceos y verde menta.
- `lavanda-rosa` — Lavanda editorial y rosa empolvado.
- `pergamino-salvia` — Marfil cálido, salvia y dorado suave.
- `cielo-coral` — Celeste limpio con acentos coral.
- `ambar-aventura` — **intensidad media**. Amarillos, ámbar y naranjos cálidos.
- `ascua-negra` — **intensidad alta**. Rojos profundos, carbón y negro.

El tema se guarda en la propiedad opcional `blockTheme` y se aplica a la vista previa y a las exportaciones PNG/PDF.

## Apariencia de la aplicación

La interfaz de la aplicación es independiente del tema del bloque generado. El selector **Apariencia** admite:

- `Sistema` — opción predeterminada, sigue el sistema operativo.
- `Claro`.
- `Oscuro`.

## Exportaciones

PNG y PDF mantienen dos modalidades:

- **Bloque completo**: exporta todo el contenido disponible.
- **Modo jugador**: para ambientes y adversarios conserva título, tier, tipo, dificultad, imagen opcional y resumen. Para misiones conserva únicamente el encabezado de misión: título, tipo y resumen opcional.

También se puede exportar e importar JSON. El modo de exportación no modifica el borrador ni su JSON.

## Compatibilidad con JSON antiguos

La versión 7 mantiene la compatibilidad de lectura con los JSON de las versiones 2, 3, 4, 5 y 6:

- `environment` y `adversary` conservan sus nombres y estructuras principales.
- `features`, `ingredients`, `flavors` y los rasgos culinarios no cambian.
- Si `blockTheme` no existe, se utiliza `bruma-menta`.
- La versión 7 agrega un tercer valor posible de `kind`: `mission`.
- Los archivos antiguos no necesitan migración manual.

## Ejemplo JSON de una misión

```json
{
  "kind": "mission",
  "blockTheme": "bruma-menta",
  "title": "Misión introductoria",
  "type": "Completa",
  "summary": "Misión introductoria pensada para Sesión 0.",
  "sections": [
    {
      "title": "GM Prep",
      "blocks": [
        {
          "type": "text",
          "text": "¿Qué deben aprender los personajes?"
        },
        {
          "type": "list",
          "listStyle": "bullet",
          "items": [
            "Introducir la historia.",
            "Presentar personajes."
          ]
        }
      ]
    },
    {
      "title": "Beats",
      "blocks": [
        {
          "type": "list",
          "listStyle": "numbered",
          "items": [
            "Los jugadores conocen al personaje X.",
            "Un monstruo comienza su ataque."
          ]
        }
      ]
    }
  ]
}
```

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub.
2. Copia todos los archivos de esta carpeta a la raíz del repositorio.
3. Haz commit y push a `main`.
4. Abre **Settings → Pages**.
5. Selecciona **Deploy from a branch**.
6. Selecciona `main` y `/ (root)`.

La aplicación usa rutas relativas, por lo que funciona en repositorios de proyecto del tipo:

```text
https://TU_USUARIO.github.io/NOMBRE_DEL_REPOSITORIO/
```

## Desarrollo local

Para probar la PWA y el service worker:

```bash
python -m http.server 8000
```

Luego abre `http://localhost:8000`.

## Estructura principal

```text
.
├── index.html
├── styles.css
├── app.js
├── service-worker.js
├── manifest.webmanifest
├── icon.svg
├── .nojekyll
├── CHANGELOG.md
├── ejemplo_adversario_ingredientes.json
├── ejemplo_mision.json
└── README.md
```

## Privacidad

Todo se procesa dentro del navegador. Las imágenes, textos, biblioteca local, PNG, PDF y JSON no se envían a un servidor.

## Aviso

Proyecto fan-made y no oficial. No está afiliado, patrocinado ni respaldado por Darrington Press. No se incluyen logotipos, ilustraciones ni recursos propietarios oficiales.
