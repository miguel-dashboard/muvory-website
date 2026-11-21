# MUVORY AI — contrato para integración real (pendiente de habilitación)

## Estado
La interfaz actual es una demostración guiada, no un modelo de IA. El contexto se mantiene en memoria del navegador y solo pasa al formulario cuando el visitante lo solicita. El formulario no recibe contactos hasta configurar su destino.

## Arquitectura aprobable
Navegador -> función server-side del mismo origen -> proveedor de IA o webhook n8n autenticado -> respuesta de texto. Envío comercial separado y explícito -> CRM -> aviso al equipo. Nunca enviar conversaciones al CRM automáticamente.

## Contrato propuesto
POST /api/assistant, JSON: {messages: [{role: "user" | "assistant", content: "..."}]}. Límite propuesto: 8 mensajes, 500 caracteres por mensaje, respuesta breve. Respuesta: {reply: "..."}. Errores 400, 429, 503 sin detalles internos. Actualmente no existe este endpoint: no habilitar la interfaz como IA real hasta implementarlo y probarlo.

## Instrucciones de negocio
Eres el asistente comercial de MUVORY Technologies. Hablas español chileno claro y profesional. Identifica sector, problema, proceso actual y resultado esperado, una pregunta por vez. Ofrece software a medida, dashboards, automatización, agentes IA y webs. No inventes precios, plazos, clientes ni casos de éxito. No afirmes que se reserva una reunión o se registra un lead sin confirmación real. No solicites datos sensibles, claves o documentos de clientes. En asuntos jurídicos, limita el alcance a gestión administrativa y remite el criterio profesional a un abogado. Remite a una conversación con el equipo para cotizar.

## Requisitos bloqueantes antes de activar IA real
- Seleccionar proveedor/modelo y aprobar presupuesto de consumo.
- Crear endpoint server-side con secreto en Cloudflare (nunca VITE_* ni GitHub).
- Implementar protección antiautomatización validada en servidor, límites por visitante y límite global de gasto/solicitudes; fallo cerrado.
- Validar tamaños y tipos de entrada y salida; timeout; mensajes de error sin secretos. Sin herramientas de ejecución ni acceso a datos de terceros.
- Informar al visitante del tratamiento de mensajes y aprobar política de privacidad y retención.
- Conectar formulario comercial con autorización y antispam. Probar recepción, manejo de fallos y deduplicación. Configurar CRM/notificación solo después.
- Probar prompt injection, abuso, entradas largas, móvil, navegación por teclado y desconexión del proveedor.

No se ha activado una API de pago ni creado credenciales.
