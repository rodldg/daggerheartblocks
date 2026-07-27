# Forja de Bloques para Daggerheart

Versión 2: incorpora botín culinario e ingredientes para adversarios.

Aplicación web estática y serverless para diseñar bloques de **ambientes** y **adversarios** compatibles con Daggerheart. Está pensada para publicarse directamente en GitHub Pages (`github.io`) y no necesita backend, base de datos ni proceso de compilación.

## Funciones principales

- Editor visual para ambientes y adversarios.
- Vista previa en tiempo real mediante Canvas.
- Imagen superior opcional con controles de altura, zoom y punto focal.
- Descripción corta de hasta 200 caracteres.
- Hasta 20 impulsos o tácticas, con 100 caracteres por entrada.
- Listas dinámicas de adversarios potenciales, experiencias, ingredientes y rasgos.
- Hasta 10 ingredientes por adversario, cada uno con 1 a 3 sabores y potencia de 1 a 3.
- Dados de sabor integrados: Dulce d4, Salado d6, Amargo d8, Ácido d10, Umami d12 y Raro d20.
- Rasgo culinario opcional por ingrediente.
- Exportación local a PNG, PDF de una página y JSON.
- Importación de JSON.
- Biblioteca local en `localStorage`.
- Compresión de imágenes en el navegador.
- PWA básica y funcionamiento offline después de la primera carga.
- Diseño responsive para escritorio, tablet y teléfono.
- Sin dependencias externas ni servicios de terceros.


## Vista previa

![Interfaz de Forja de Bloques](./screenshot.png)

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Copia todos los archivos de esta carpeta a la raíz del repositorio.
3. Haz commit y push a la rama `main`.
4. En GitHub, abre **Settings → Pages**.
5. En **Build and deployment**, selecciona **Deploy from a branch**.
6. Elige la rama `main` y la carpeta `/ (root)`.
7. Guarda. GitHub mostrará la dirección pública, normalmente:

   `https://TU_USUARIO.github.io/NOMBRE_DEL_REPOSITORIO/`

No es necesario modificar rutas: todos los recursos usan direcciones relativas compatibles con repositorios de proyecto.

## Desarrollo local

Abrir `index.html` directamente permite usar la mayor parte de la aplicación. Para probar correctamente el service worker y el modo offline, ejecuta un servidor local:

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
├── LICENSE
├── CHANGELOG.md
├── ejemplo_adversario_ingredientes.json
└── README.md
```

## Privacidad

La aplicación procesa imágenes, textos, PNG, PDF y JSON dentro del navegador. No realiza peticiones a un servidor para almacenar contenido. La biblioteca se conserva en el almacenamiento local del navegador y puede borrarse desde la propia interfaz.

## Exportación PDF

El PDF se genera completamente en JavaScript, incrustando una imagen JPEG de alta resolución en una página de tamaño proporcional al bloque. Esto evita dependencias y conserva exactamente la composición visual de la vista previa.

## Aviso

Proyecto fan-made y no oficial. No está afiliado, patrocinado ni respaldado por Darrington Press. No se incluyen logotipos, ilustraciones ni recursos propietarios oficiales. Verifica los términos de la licencia comunitaria correspondiente antes de distribuir material compatible con Daggerheart.


## Estructura de ingredientes en JSON

Los ingredientes se almacenan dentro de un adversario usando esta estructura:

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

El archivo `ejemplo_adversario_ingredientes.json` puede importarse directamente desde la interfaz para revisar el formato.
