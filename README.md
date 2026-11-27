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

El sitio ya está publicado. Hasta recibir una clave de formulario válida, se mantiene el botón
para escribir a **contacto@muvory.cl**: no se muestran campos que no puedan entregar mensajes.

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
