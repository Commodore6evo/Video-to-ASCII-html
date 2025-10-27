Video-to-ASCII-html

Una herramienta web para convertir video en tiempo real a arte ASCII en HTML.

Descripción
Este proyecto permite tomar un video (por ejemplo un archivo, cámara o feed) y convertirlo en una representación en arte ASCII dentro de una página web (HTML + CSS + JavaScript). Ideal para efectos visuales retro, demos digitales u otro uso creativo.

Demo
Puedes ver la versión en vivo/aplicación web en:
https://commodore6evo.github.io/Video-to-ASCII-html/

Características
Convierte cada fotograma del video a caracteres ASCII.
Renderiza el resultado en HTML/CSS, lo que permite verlo en cualquier navegador.
Permite ajustar estilo visual (por ejemplo tamaño de caracteres, fuente, color, fondo).
Uso simple: abre la página, carga video o usa cámara, empieza la conversión.

Tecnologías
HTML5
CSS
JavaScript 

Instalación y uso local
Clona este repositorio:
git clone https://github.com/Commodore6evo/Video-to-ASCII-html.git
Entra al directorio:
cd Video-to-ASCII-html
Abre pagina.html en tu navegador (o levanta un servidor local si lo deseas).
Carga un video.
Comienza la conversión y visualización.

Estructura del proyecto
pagina.html — Página principal que carga el interfaz.
script.js — Lógica JavaScript para capturar los frames de video, procesarlos y convertirlos a ASCII.
style.css — Estilos para la página, fuente de los caracteres ASCII, colores, fondo, etc.
.gitattributes — Ajustes de Git.

Configuración / Personalización
Puedes modificar algunos parámetros para adaptar el efecto a tu gusto:
Tamaño del “canvas” o área de rendering (resolución).
Paleta de caracteres ASCII usada (por ejemplo “ .:-=+*#%@”).

Limitaciones conocidas
En equipos con poca potencia, procesar video en tiempo real puede generar latencia o “lag”.
Resolución muy alta o demasiados caracteres pueden impedir una buena visualización o hacer lenta la ejecución.
El tamaño/resultados de ASCII dependerán mucho de las condiciones de iluminación, calidad de video, etc.
