import { useState, useEffect } from 'react';
import { submitContact, submitContactWeb3Forms } from './contact.js';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
  // Web3Forms access keys are public form identifiers, not private credentials.
  // Allow the verified MUVORY key to work without changes to Cloudflare settings.
  const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() || '17dabd0e-a514-484b-a886-77632e5a2c03';
  const configured = Boolean(endpoint || web3formsKey);
  const useWeb3Forms = !endpoint && Boolean(web3formsKey);
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
    if (!configured) {
      setStatus('unconfigured');
      setMessage('El envío aún no está habilitado. Tu solicitud no se ha enviado; falta configurar el destino de recepción.');
      return;
    }
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    setMessage('Enviando tu solicitud…');
    try {
      if (useWeb3Forms) {
        await submitContactWeb3Forms(web3formsKey, data);
      } else {
        await submitContact(endpoint, data);
      }
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

  // Until the contact endpoint is configured, offer a real contact method instead
  // of presenting fields that cannot submit to any destination.
  if (!configured) {
    return (
      <div className="contact-form contact-email-panel">
        <p className="section-kicker">CONTACTO DIRECTO</p>
        <h3>Conversemos sobre tu proyecto.</h3>
        <p>Cuéntanos qué necesitas crear, mejorar o automatizar. Estamos recibiendo consultas directamente en nuestro correo.</p>
        <a className="button button-primary button-full" href="mailto:contacto@muvory.cl?subject=Consulta%20sobre%20un%20proyecto%20MUVORY">Escribir a contacto@muvory.cl</a>
        <p className="form-note">Este botón abre tu aplicación de correo; no envía datos automáticamente. También puedes escribirnos directamente a <a href="mailto:contacto@muvory.cl">contacto@muvory.cl</a>.</p>
      </div>
    );
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
      {useWeb3Forms && <div className="contact-honeypot" aria-hidden="true"><label>No completar este campo <input name="botcheck" type="text" tabIndex={-1} autoComplete="off" /></label></div>}
      <label className="consent"><input type="checkbox" name="consentimiento" value="si" required /><span>Autorizo el tratamiento de estos datos para responder mi consulta. {useWeb3Forms && 'El mensaje será procesado por Web3Forms para enviarlo al correo de MUVORY.'}</span></label>
      <button className="button button-primary button-full" type="submit" disabled={status === 'sending' || Boolean(pendingContext)}>{status === 'sending' ? 'Enviando…' : 'Enviar solicitud'}</button>
      <p className="form-note" role="status" aria-live="polite">{message || 'Te responderemos por el correo que indiques.'}</p>
    </form>
  );
}
