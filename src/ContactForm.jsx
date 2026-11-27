import { useState, useEffect } from 'react';
import { submitContact } from './contact.js';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
  const [context,setContext]=useState('');
  const [pendingContext, setPendingContext] = useState('');
  useEffect(() => {
    const listener = event => {
      if (typeof event.detail === 'string') {
        setMessage('');
        setPendingContext(event.detail);
      }
    };
    window.addEventListener('muvory:diagnostic', listener);
    return () => window.removeEventListener('muvory:diagnostic', listener);
  }, []);
  useEffect(() => {
    if (!pendingContext) return;
    const next = [context, pendingContext].filter(Boolean).join('\n\n');
    if (next.length <= 3000) {
      setContext(next);
      setPendingContext('');
      setMessage('Añadimos el contexto seleccionado. Puedes revisarlo antes de enviar.');
    }
  }, [context, pendingContext]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!endpoint) {
      setStatus('unconfigured');
      setMessage('El envío aún no está habilitado. Tu solicitud no se ha enviado; falta configurar el destino de recepción.');
      return;
    }
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    setMessage('Enviando tu solicitud…');
    try {
      await submitContact(endpoint, data);
      form.reset();
      setContext('');
      setPendingContext('');
      setStatus('success');
      setMessage('Tu solicitud fue enviada. Nos pondremos en contacto contigo.');
    } catch {
      setStatus('error');
      setMessage('No se pudo enviar tu solicitud. Intenta nuevamente más tarde.');
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Tu nombre <input name="nombre" type="text" placeholder="Nombre y apellido" autoComplete="name" required maxLength="120" /></label>
        <label>Correo de contacto <input name="email" type="email" placeholder="tu@correo.cl" autoComplete="email" required maxLength="200" /></label>
      </div>
      <label>¿En qué necesitas ayuda?
        <select name="servicio" defaultValue="" required>
          <option value="" disabled>Selecciona una solución</option>
          <option>Software a medida</option>
          <option>Dashboards y analítica</option>
          <option>Automatización de procesos</option>
          <option>Agentes de inteligencia artificial</option>
          <option>Desarrollo web</option>
          <option>Necesito orientación</option>
        </select>
      </label>
      <label>Cuéntanos sobre tu proyecto
        <textarea value={context} onChange={e=>setContext(e.target.value)} name="mensaje" placeholder="¿Qué te gustaría crear o resolver?" rows="4" minLength="10" maxLength="3000" required />
      </label>
      {pendingContext && <div className="form-context-notice"><p className="form-note" role="status">No hay espacio para añadir el contexto seleccionado. Acorta la descripción para incorporarlo; tu texto se conserva.</p><button type="button" onClick={() => setPendingContext('')}>Continuar solo con mi descripción</button></div>}
      <label className="consent"><input type="checkbox" name="consentimiento" value="si" required /><span>Autorizo el uso de estos datos únicamente para responder mi solicitud comercial.</span></label>
      <button className="button button-primary button-full" type="submit" disabled={status === 'sending' || Boolean(pendingContext)}>{status === 'sending' ? 'Enviando…' : 'Enviar solicitud'}</button>
      {!endpoint && <p className="form-note">Envío pendiente de habilitación. Este formulario todavía no recibe solicitudes.</p>}
      <p className="form-note" role="status" aria-live="polite">{message || (endpoint ? 'Te responderemos por el correo que indiques.' : '')}</p>
    </form>
  );
}
