# Unidad de Desarrollo Organizacional — DEM Angol

Proyecto editable para video informativo vertical de **85 segundos, 1080×1920, 60 fps** con Remotion y React.

## Requisitos
- macOS (o Windows/Linux), Node.js y npm.
- Visual Studio Code.
- Conexión a internet para instalar dependencias.

## Instalación
1. Descomprime el ZIP y abre la carpeta `udo-remotion` en Visual Studio Code.
2. Abre **Terminal > New Terminal**.
3. Ejecuta `npm install`.
4. Ejecuta `npm run studio`.
5. Abre la dirección local que indique Terminal (habitualmente http://localhost:3000).
6. Selecciona la composición `UDO-Angol` y reproduce la animación.

## Exportar MP4
```bash
npm run render
```
El video quedará en `out/UDO_Angol_60fps.mp4` (sin voz, hasta incorporarla).

## Añadir locución
- Graba la voz con ritmo natural siguiendo `GUION_VOZ_EN_OFF.txt`.
- Guarda el audio con nombre `voz.mp3` en la carpeta `public/`.
- Abre `src/video.tsx`, busca `Para incorporar la voz en off` y elimina los comentarios de la línea `<Audio ... />`.
- Si la narración cambia de duración, ajusta escenas en `src/video.tsx` y `durationInFrames` en `src/root.tsx`. El total debe coincidir con el final de la última escena.
- Ejecuta nuevamente `npm run render`.

## Personalización
- Colores: objeto `C` al inicio de `src/video.tsx` (son provisorios, no representan identidad oficial certificada).
- Logo: `LogoPlaceholder` en `src/video.tsx` es una marca tipográfica **provisional**. Sustitúyela por el escudo/logotipo oficial autorizado antes de publicar.
- Textos, bloques e íconos: componentes `Intro`, `Purpose`, `Pillars`, `YearScene`, `Philosophy`, `Outro`.
- Tiempo y fps: `src/root.tsx`, `fps={60}` y `durationInFrames={5100}`.

## Notas importantes
- La línea del tiempo representa acciones comunicadas en el guion fuente, no verifica de forma independiente su ejecución.
- **2026:** la capacitación se anuncia como próxima, no completada.
- **2027:** actividades planteadas como futuras y graduales, no como implementadas.
- El proyecto se entrega sin archivo de locución, música ni logo oficial. Ajusta los tiempos luego de grabar la narración.
- 60 fps mejora la fluidez de movimiento, pero no reemplaza la importancia de buenos diseños, tipografía y audio.
- Verifica las condiciones de licencia de Remotion para el uso de tu institución: https://www.remotion.dev/license

## Actualización 2: correcciones visuales
- El título "Tres pilares. / Un propósito." ahora respeta el salto de línea gracias a `whiteSpace: 'pre-line'`.
- El encabezado superior usa el nombre íntegro: **DIRECCIÓN DE EDUCACIÓN MUNICIPAL DE ANGOL** en dos líneas legibles.
- Todas las escenas incorporan transiciones de entrada y salida mediante fundidos y desplazamientos ligeros. La duración global permanece en 85 s y 60 fps.
- Los subtítulos se dejan pendientes hasta obtener el audio definitivo; no se han inventado tiempos de locución.

### Cómo aplicar la actualización en tu equipo
Cierra Remotion Studio (Ctrl+C en la terminal). Sustituye el contenido de tu carpeta del proyecto por este paquete actualizado, manteniendo una copia de seguridad de cualquier edición previa. Conserva tus archivos personales dentro de `public/` (logos, audio). Ejecuta `npm install` solo si tu instalación lo requiere, y reinicia con `npm run studio`.
