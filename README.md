# MUVORY Technologies — Sitio web comercial

Primera versión de la landing page de MUVORY: **software empresarial, dashboards, automatización, agentes de IA y desarrollo web**.

## Tecnología
- React + Vite
- CSS personalizado, sin librerías de diseño adicionales
- Repositorio público: nunca subir datos confidenciales ni claves

## Desarrollo local
1. Instalar Node.js compatible con Vite 6.
2. Ejecutar `npm install`.
3. Ejecutar `npm run dev` para visualizar.
4. Ejecutar `npm run build` para generar producción.

## Contacto: bloqueante antes del lanzamiento
El formulario muestra un estado de **vista preliminar** hasta configurar un destino real mediante la variable `VITE_CONTACT_ENDPOINT`.

Pasos antes de publicar:
1. Elegir un proveedor de formularios compatible con solicitudes POST en JSON y configurar su endpoint.
2. Crear el archivo `.env.local` (no se sube a Git) con `VITE_CONTACT_ENDPOINT=...`.
3. Configurar esa variable también en Vercel o el servicio de despliegue.
4. Probar envío, recepción, consentimiento, manejo de errores y protección antispam.
5. Publicar información de privacidad y responsables de tratamiento conforme al marco aplicable.

**Importante:** las variables `VITE_*` se exponen al navegador. No poner claves secretas ni credenciales allí.

## Antes de activar la página pública
- Confirmar la disponibilidad de marca y dominio de MUVORY con INAPI y NIC Chile.
- Configurar formulario y email corporativo.
- Comprobar diseño responsive, accesibilidad y enlaces en un despliegue de prueba.
- Añadir trabajos y testimonios solo con autorización expresa del cliente.
- Revisar textos legales, tratamiento de datos y la oferta comercial.

## Filosofía de diseño
Estética sutil, premium y futurista: azul negro, azul petróleo, turquesa y blanco, espacio negativo amplio y un robot ilustrado discreto. Ningún sector domina la portada. No se muestran métricas o clientes inventados.
