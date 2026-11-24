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


El video quedará en `out/UDO_Angol_60fps.mp4`.


## Personalización
- Colores: objeto `C` al inicio de `src/video.tsx`.
- Logo: `LogoPlaceholder` en `src/video.tsx` es una marca tipográfica **provisional**.
- Textos, bloques e íconos: componentes `Intro`, `Purpose`, `Pillars`, `YearScene`, `Philosophy`, `Outro`.
- Tiempo y fps: `src/root.tsx`, `fps={60}` y `durationInFrames={5100}`.
