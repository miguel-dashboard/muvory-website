# Portafolio MUVORY · Guía de videos reales

## Estado

La web incluye un **portafolio funcional** con tres páginas y recorridos interactivos. Los recorridos son **simulaciones**, no capturas ni videos reales. Los videos reales se publicarán solamente cuando el material sea recibido, revisado y autorizado.

## Videos previstos

| Proyecto | Archivo recomendado | Ruta interna del sitio |
|---|---|---|
| MR&B Control Tower | `control-tower.mp4` | `/media/portfolio/control-tower.mp4` |
| MR&B Recruit | `mrb-recruit.mp4` | `/media/portfolio/mrb-recruit.mp4` |
| Sistema de notas de venta / paltas | `notas-de-venta.mp4` | `/media/portfolio/notas-de-venta.mp4` |

Guardar los archivos aprobados dentro de `public/media/portfolio/`. No se deben publicar videos hasta confirmar permisos y revisar los fotogramas.

## Cómo habilitar los reproductores

En `src/Portfolio.jsx` existe el objeto `portfolioVideos`:

```js
export const portfolioVideos = {
  control: null,
  recruit: null,
  ventas: null,
};
```

Una vez incorporado cada archivo, sustituir **solo** su valor `null` por su ruta correspondiente, por ejemplo:

```js
control: '/media/portfolio/control-tower.mp4'
```

El componente `ProjectMedia` muestra un reproductor de video HTML5 si existe una ruta; cuando no, mantiene el recorrido interactivo. Si un video habilitado da error, vuelve a la demostración guiada.

## Protocolo de grabación y privacidad

1. Grabar en un entorno de prueba, con datos ficticios. Evitar grabar la operación real conectada a MongoDB si contiene información de clientes o choferes.
2. Ocultar nombres, RUT, teléfonos, direcciones, correos, precios privados, placas patentes y números de pedido reales.
3. No mostrar tokens de API, contraseñas, URL internas, consolas, base de datos ni configuración del backend.
4. Para el proyecto del cliente de las paltas, contar con autorización expresa para exponer el sistema, identidad, logos o testimonios. Si no existe, anonimizar y hablar del tipo de solución sin identificar al cliente.
5. Usar MP4 H.264, video de 30–60 segundos por proyecto, 1080p o 720p, sin pistas de audio protegidas por derechos de autor.
6. Incluir subtítulos/textos simples: **problema — proceso — beneficio**. No inventar resultados porcentuales ni prometer funciones inexistentes.
7. Probar en pantalla móvil, escritorio, conexión lenta y con controles de teclado.
8. No enlazar el código fuente o el repositorio público desde ninguna tarjeta comercial.

## Recorrido sugerido

**Control Tower:** vista general → incidencias → origen del problema → siguiente acción.

**Recruit:** landing → selección de operación/vehículo → formulario de prueba → visualización del flujo de reclutamiento (sin publicar datos reales).

**Notas de venta:** inicio de la nota → ingreso o revisión de productos → confirmación/seguimiento que muestre el video real. No suponer módulos adicionales hasta revisar la grabación.

Mantener una versión sin sonido y con subtítulos. La interfaz no debe reproducir video con audio automáticamente.
