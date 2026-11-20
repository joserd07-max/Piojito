# Feliz cumpleaños, Piojito ♡

Experiencia web romántica mobile first, hecha en HTML, CSS y JavaScript sin frameworks. Cada capítulo ocupa su propia pantalla y se recorre verticalmente.

## Personalización

Edita `js/config.js`:

- `name`: nombre o apodo que aparece en la historia.
- `youtubeUrl`: video elegido ya configurado. Empieza en silencio al cargar y, al entrar en la sección de música, intenta activar el sonido. Si el navegador bloquea el audio, usa «Activar sonido».
- `photos`: las seis fotos están configuradas en `assets/images/`: cinco individuales y una de ambos (la última). Puedes ordenarlas, agregar o quitar entradas; marca la foto de ambos con `together: true`.
- `letter`: contiene la carta completa proporcionada.
- `motion`: pon `false` para desactivar las partículas. También se respeta `prefers-reduced-motion`.

No hay dependencias de compilación. Se usan Google Fonts por red; las tipografías del sistema son el fallback.

## Estructura

- `index.html`: siete escenas separadas, navegación y contenido semántico.
- `css/styles.css`: estilos mobile first, escritorio, safe areas y movimiento reducido.
- `assets/flowers/purple-tulip.svg`: tulipán individual para los adornos.
- `assets/flowers/purple-bouquet.svg`: ramo de tres tulipanes volumétricos con seis pétalos superpuestos, usado en la segunda escena.
- `js/config.js`: nombre, canción, fotos y carta.
- `js/app.js`: reproductor oficial de YouTube, partículas y contenido.
- `js/gallery.js`: carrusel, miniaturas, gestos y gestos táctiles y carrusel fotográfico.
- `assets/images/`: fotografías propias del proyecto.

## Publicar

Sube la carpeta completa a un alojamiento estático HTTPS (por ejemplo GitHub Pages, Netlify o un servidor propio). Comprueba el enlace en Safari iPhone y Chrome Android; no se requiere backend.









