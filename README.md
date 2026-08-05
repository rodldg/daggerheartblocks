# Forja de Bloques para Daggerheart

Versión 6: mejora la composición automática de la cabecera para títulos largos. El título, tier, tipo y dificultad permanecen en la esquina superior izquierda, mientras que la etiqueta **AMBIENTE** o **ADVERSARIO** se ubica en la esquina inferior derecha.

Aplicación web estática y serverless para diseñar bloques de **ambientes** y **adversarios** compatibles con Daggerheart. Está pensada para publicarse directamente en GitHub Pages (`github.io`) y no necesita backend, base de datos ni proceso de compilación.

## Funciones principales

- Editor visual para ambientes y adversarios.
- Vista previa en tiempo real mediante Canvas.
- Imagen superior opcional con controles de altura, zoom y punto focal.
- Descripción corta de hasta 200 caracteres.
- Hasta 20 impulsos o tácticas, con 100 caracteres por entrada.
- Reordenamiento de rasgos mediante arrastre o botones de flecha.
- Asa de arrastre de seis puntos, legible y sin símbolos comprimidos.
- Contadores de caracteres situados debajo de los campos, sin superponerse al texto.
- Hasta 10 ingredientes por adversario, cada uno con 1 a 3 sabores y potencia de 1 a 3.
- Dados de sabor: Dulce d4, Salado d6, Amargo d8, Ácido d10, Umami d12 y Raro d20.
- Rasgo culinario opcional por ingrediente.
- Exportación local a PNG y PDF en dos modalidades: bloque completo o modo jugador.
- El modo jugador contiene únicamente título, tier, tipo, dificultad, imagen opcional y descripción corta.
- Exportación e importación de JSON sin cambios en la estructura de datos.
- Importación de JSON y biblioteca local mediante `localStorage`.
- PWA básica con funcionamiento offline después de la primera carga.
- Diseño responsive para escritorio, tablet y teléfono.
- Sin dependencias externas ni servicios de terceros.


## Cabeceras adaptables y títulos largos

La cabecera del bloque ahora se distribuye en dos zonas independientes:

- **Esquina superior izquierda:** título, tier, tipo y dificultad.
- **Esquina inferior derecha:** etiqueta `AMBIENTE` o `ADVERSARIO`.

Los títulos pueden ocupar hasta tres líneas. El tamaño tipográfico se ajusta de forma gradual y, cuando la altura de imagen seleccionada no deja suficiente espacio, la cabecera aumenta automáticamente su altura mínima. Esto evita superposiciones tanto en la vista previa como en PNG, PDF y modo jugador.

Cuando se utiliza una ilustración, se aplica una sombra localizada en la zona superior izquierda para conservar la legibilidad del texto sin oscurecer excesivamente el resto de la imagen.

## Exportación completa y modo jugador

Los botones **PNG** y **PDF** despliegan dos opciones:

- **Bloque completo**: incluye cabecera, descripción, perfil, estadísticas, ingredientes y rasgos según corresponda.
- **Modo jugador**: incluye solamente el título, tier, tipo, dificultad, imagen opcional y descripción corta. No muestra el perfil, estadísticas, impulsos, adversarios potenciales, ingredientes, experiencias, ataques ni rasgos.

La exportación en modo jugador agrega el sufijo `_modo_jugador` al nombre del archivo. La vista previa del editor continúa mostrando siempre el bloque completo, por lo que no altera el borrador ni el JSON.

## Temas de la aplicación

La interfaz posee una apariencia independiente del bloque generado. El selector **Apariencia** permite usar:

- **Sistema**: opción predeterminada; sigue el tema claro u oscuro del sistema operativo.
- **Claro**.
- **Oscuro**.

La preferencia se guarda localmente en el navegador y no se incluye en el JSON del bloque.

## Temas de los bloques

Cada ambiente o adversario guarda su propio tema visual en la propiedad opcional `blockTheme`. Los temas disponibles son:

- `bruma-menta`: tema predeterminado de azules grisáceos y verde menta.
- `lavanda-rosa`: lavanda editorial y rosa empolvado.
- `pergamino-salvia`: marfil cálido, salvia y dorado suave.
- `cielo-coral`: celeste limpio con acentos coral.

El tema seleccionado se conserva en la vista previa, la biblioteca local y las exportaciones JSON, PNG y PDF.

## Cambios en la dificultad

La dificultad sigue siendo un campo numérico. En el bloque generado ahora aparece inmediatamente debajo de `Tier X · Tipo`, usando el mismo estilo tipográfico. Se eliminó la tarjeta independiente de dificultad tanto en ambientes como en adversarios.

## Compatibilidad con JSON v2, v3, v4 y v5

La estructura principal del bloque se mantiene. Los JSON de las versiones 2, 3, 4 y 5 se pueden importar directamente.

- Si un archivo antiguo no contiene `blockTheme`, se utiliza automáticamente `bruma-menta`.
- No se modificaron las estructuras de `features`, `ingredients`, `flavors` ni del rasgo culinario opcional.
- La nueva propiedad `blockTheme` es opcional y no impide que se recuperen datos antiguos.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Copia todos los archivos de esta carpeta a la raíz del repositorio.
3. Haz commit y push a la rama `main`.
4. Abre **Settings → Pages**.
5. En **Build and deployment**, selecciona **Deploy from a branch**.
6. Elige la rama `main` y la carpeta `/ (root)`.
7. Guarda.

La dirección pública normalmente será:

```text
https://TU_USUARIO.github.io/NOMBRE_DEL_REPOSITORIO/
```

Todos los recursos usan rutas relativas, por lo que no es necesario modificar el código para repositorios de proyecto.

## Desarrollo local

Para probar el service worker y el modo offline, ejecuta un servidor local dentro de la carpeta:

```bash
python -m http.server 8000
```

Luego abre `http://localhost:8000`.

## Estructura

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
├── previews/
│   ├── statblock_v6_long_title_header.png
│   └── statblock_v6_long_title_full.png
└── README.md
```

## Estructura de ingredientes en JSON

```json
{
  "ingredients": [
    {
      "name": "Lengua de dragón",
      "flavors": [
        { "flavor": "Ácido", "potency": 1 },
        { "flavor": "Umami", "potency": 2 },
        { "flavor": "Raro", "potency": 1 }
      ],
      "feature": {
        "name": "Última gota",
        "text": "Descripción opcional del rasgo culinario."
      }
    }
  ]
}
```

## Privacidad

La aplicación procesa imágenes, textos, PNG, PDF y JSON dentro del navegador. No realiza peticiones a un servidor para almacenar contenido. La biblioteca y las preferencias visuales se conservan únicamente en el almacenamiento local del navegador.

## Aviso

Proyecto fan-made y no oficial. No está afiliado, patrocinado ni respaldado por Darrington Press. No se incluyen logotipos, ilustraciones ni recursos propietarios oficiales. Verifica los términos de la licencia comunitaria correspondiente antes de distribuir material compatible con Daggerheart.
