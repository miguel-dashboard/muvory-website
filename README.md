# MUVORY Technologies — Sitio web comercial

Sitio de MUVORY: **software a medida, datos, automatización, IA aplicada y plataformas digitales** para personas, proyectos y organizaciones.

## Tecnología
- React + Vite
- CSS personalizado, sin librerías de diseño adicionales
- Repositorio público: nunca subir datos confidenciales ni claves

## Desarrollo local
1. Instalar Node.js compatible con Vite 6.
2. Ejecutar `npm install`.
3. Ejecutar `npm run dev` para visualizar.
4. Ejecutar `npm run build` para generar producción.
5. Ejecutar `npm test` para verificar el contrato de envío del formulario.

Consulta la [auditoría, interacciones y validación del rediseño](docs/redesign-review.md).

## Formulario de contacto — activación con Web3Forms

El formulario de `muvory.cl` ya usa Web3Forms y el correo `contacto@muvory.cl` recibió una consulta de prueba real (27 de noviembre de 2026). Si la clave configurada no está disponible, el sitio presenta el contacto por correo en lugar de campos que no puedan enviar.

### Activación (sin cambiar DNS ni Google Workspace)

1. Abrir https://web3forms.com/#start y solicitar una **Access Key** para `contacto@muvory.cl`.
2. Abrir el correo que envía Web3Forms a esa dirección y obtener la clave de formulario.
   No es una contraseña de Gmail ni un secreto de servidor: Web3Forms indica que es pública.
3. En Cloudflare: **Workers & Pages → muvory-website → Settings → Variables and Secrets**,
   crear la variable de producción `VITE_WEB3FORMS_ACCESS_KEY` con el valor recibido.
   Configurar la misma variable en Preview solo si se desean pruebas del PR antes de publicarlo.
4. Ejecutar un nuevo despliegue **después** de guardar la variable (Vite la incorpora durante el build).
   En el sitio ya publicado, probar el formulario con datos propios, confirmar la notificación en
   `contacto@muvory.cl` y revisar la carpeta de spam.
5. Configurar revisiones periódicas del correo, y preparar una política de privacidad antes de
   recoger solicitudes reales. Web3Forms es un proveedor externo que recibe y reenvía los datos.
   Antes de su uso, revisar sus condiciones y tratamiento de datos.

El formulario mantiene nombre, correo, servicio, mensaje y consentimiento, preserva el contexto
de las demostraciones y utiliza un campo oculto antispam. No enviar documentación sensible.

**No se necesitan claves secretas ni modificaciones de MX/SPF/DKIM/DMARC.**
El access key se puede ver en el código enviado al navegador. No poner contraseñas, tokens
de Google Workspace ni claves de APIs privadas en variables `VITE_*`.

Para desarrollo local: usar `.env.local` con `VITE_WEB3FORMS_ACCESS_KEY=...`
(sin subirlo a Git), o configurar `VITE_CONTACT_ENDPOINT` para un servicio HTTP propio.
Este último tiene prioridad si ambas variables están presentes.

El formulario exige que la API devuelva código HTTP correcto y `success:true` antes de
confirmar el envío; los errores conservan el contenido escrito.
Ejecutar `npm test` y `npm run build` para las comprobaciones automatizadas.

## Antes de activar la página pública
- Confirmar la disponibilidad de marca y dominio de MUVORY con INAPI y NIC Chile.
- Configurar formulario y email corporativo.
- Comprobar diseño responsive, accesibilidad y enlaces en un despliegue de prueba.
- Añadir trabajos y testimonios solo con autorización expresa del cliente.
- Revisar textos legales, tratamiento de datos y la oferta comercial.

## Filosofía de diseño
Estética sutil, premium y futurista: azul negro, azul petróleo, turquesa y blanco, espacio negativo amplio y un robot ilustrado discreto. Ningún sector domina la portada. No se muestran métricas o clientes inventados.

## MUVORY Experience — recorrido interactivo (prototipo)

La ruta `/experience` ofrece una experiencia complementaria a la landing de MUVORY,
inspirada en un recorrido tipo presentación: navegación entre cuatro etapas,
botones Anterior/Siguiente, selección directa de capítulos, flechas del teclado
y navegación inferior en móvil. El enlace aparece en el menú y después de las tarjetas
de servicios.

- **Software:** mini panel con filtros reales sobre actividades ficticias.
- **Automatización:** flujo guiado de cuatro pasos que se ejecuta por interacción.
- **Inteligencia artificial:** tres preguntas y respuestas predefinidas, sin IA conectada.
- **Datos:** panel de indicadores y gráfico variable con valores de ejemplo.

Nada de lo mostrado representa clientes, casos publicados, integraciones
activas, métricas comerciales reales o funcionalidades ya contratadas.
No usa APIs externas ni modifica Web3Forms o correo.

La ruta se renderiza desde React + Vite sobre el mismo sitio mediante el
fallback SPA de Cloudflare Pages. La página principal en `/` no se reemplaza.
El recorrido respeta `prefers-reduced-motion` y dispone de controles accesibles.

Validar los cuatro capítulos en escritorio y teléfono, acceso directo a
`/experience`, los links de salida hacia `/`, la navegación inferior,
filtros, recorrido automatizado, demo de IA y variaciones de gráficos
antes de fusionar el PR a `main`.

## MUVORY 2.0 – portada cinematográfica y Servicios multipágina

La nueva propuesta visual se desarrolla en una rama separada y **no cambia el
formulario Web3Forms ni el sitio publicado hasta recibir aprobación visual**.

- Portada: `src/CinematicHero.jsx` + `src/cinematic.css`. El Nexus es un SVG
  original de bajo peso con CSS para luces, anillos y movimiento suave.
  Cada etiqueta abre una página de servicio. Incluye control de pausa y
  respeta `prefers-reduced-motion`.
- Se sustituye la cuadrícula repetitiva de demostraciones en Inicio por una
  lista editorial con acceso directo a páginas independientes.
- `/servicios`: catálogo con navegación, elementos animados y enlaces reales.
- `/servicios/software`, `/servicios/automatizacion`,
  `/servicios/inteligencia-artificial`, `/servicios/datos` y
  `/servicios/plataformas`: páginas con contexto, funciones posibles y
  un recorrido de tres etapas. Todas las demos están identificadas como
  **simulaciones**, sin métricas ni testimonios inventados.
- El recorrido anterior `/experience` permanece disponible.
- Los botones comerciales regresan a `/#contacto` (Web3Forms no se altera).
- Sin dependencias nuevas, video pesado, imágenes externas ni copia de activos
  de otros estudios.

### Revisión pendiente antes de publicar

Abrir la vista previa en **computador y teléfono**, probar cada ruta directa,
el menú móvil, los vínculos a contacto, la navegación de demos, el botón de
pausar el movimiento y `/experience`. Verificar que los formularios activos
conserven su funcionamiento. Ejecutar `npm test` y `npm run build`.

## Diferenciación por conocimiento del terreno — versión de prueba

La propuesta incorpora una sección y rutas independientes centradas en tres áreas
donde MUVORY dispone de conocimiento cercano a la operación:

- `/sectores`: portada editorial con tres áreas, fotos **referenciales** y acceso
  a subpáginas.
- `/sectores/juridico`: seguimiento documental, expedientes, vencimientos y
  tareas; estilo **cálido / papel / cobre**. No sustituye asesoría profesional.
- `/sectores/logistica`: procesos reales de última milla, incidencias, bodega,
  rutas y liquidaciones; estilo **azul oscuro / ámbar**.
- `/sectores/comercio`: minimarket, stock, proveedores, reposición, caja
  y movimientos; estilo **verde / salvia**.

Las tres páginas tienen problemas operativos concretos y un ejemplo interactivo,
siempre señalado como simulación sin datos reales. Se diferencian visualmente
del catálogo genérico. Además, cada subpágina de servicios recibe una paleta
distinta (software azul, automatización clara, IA violeta, datos azul eléctrico,
plataformas beige).

### Fotografías y material verídico

Las tres fotos iniciales proceden de **Unsplash** y están identificadas en la
interfaz como **imágenes referenciales**, con crédito y vínculo a la imagen.
Licencia: https://unsplash.com/license

- Jurídico: Shutter Speed, `rz_0EzMAmis`.
- Transporte: Claudio Schwarz, `a85IYeAXgxU`.
- Minimarket: Nathália Rosa, `rWMIbqmOxrY`.

Las fotos **no representan operaciones, clientes o empleados de MUVORY**.
Antes de publicar la versión definitiva conviene reemplazarlas por fotografías
propias y autorizadas de los negocios correspondientes. Para videos se requiere
material auténtico facilitado por el propietario, con permiso de publicación
y sin datos personales visibles. No se incorporó metraje de terceros como prueba
de trabajo real.

### Validación de publicación

Pruebas automáticas para rutas, textos de posicionamiento y créditos;
comprobar visualmente escritorio/móvil, imágenes, estados de simulaciones,
navegación hacia el formulario, contraste en paletas claras y oscuras.
Mantener la rama sin fusionar mientras el propietario evalúa el diseño.
