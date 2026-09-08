# Notas de integración del Daggerheart SRD

La versión 8 incorpora una biblioteca estática generada desde el archivo `Daggerheart-SRD-9-09-25.pdf` suministrado durante el desarrollo.

## Contenido incorporado

- 129 adversarios, desde la sección **Adversaries** del SRD.
- 19 ambientes, desde la sección **Environments** del SRD.
- Reglas de **Building Balanced Encounters** para el generador de encuentros.

Los registros viven en `srd-data.js`. La interfaz traduce etiquetas de clasificación (por ejemplo, Solo → Solitario, Bruiser → Bruto), pero preserva el texto mecánico base en inglés para evitar introducir alteraciones involuntarias a las reglas.

## Puntos de Batalla

Presupuesto inicial:

`(3 × número de PJ en combate) + 2`

Ajustes implementados:

- −1: combate más fácil o corto.
- −2: 2 o más adversarios Solo.
- −2: +1d4 (o +2 estático) a todas las tiradas de daño de los adversarios.
- +1: al menos un adversario de un tier inferior.
- +1: ningún Bruiser, Horde, Leader o Solo.
- +2: combate más difícil o largo.

Costos:

- 1 PB: un grupo de Minions igual al número de PJ.
- 1 PB: Social o Support.
- 2 PB: Horde, Ranged, Skulk o Standard.
- 3 PB: Leader.
- 4 PB: Bruiser.
- 5 PB: Solo.

El PDF suministrado está maquetado con dos páginas impresas por página física; la regla solicitada como “página 37 del PDF” corresponde a la página impresa 72 del SRD.

## Licencia

El SRD suministrado declara este material Public Game Content bajo la Darrington Press Community Gaming License. Revisa esa licencia antes de redistribuir o publicar contenido derivado.
