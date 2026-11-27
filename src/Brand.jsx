export default function Brand({ footer = false }) {
  return (
    <a className={'brand' + (footer ? ' brand-footer' : '')} href="#inicio" aria-label="MUVORY Technologies, ir al inicio">
      <svg className="brand-mark" viewBox="0 0 50 50" fill="none" aria-hidden="true">
        <path d="M34 7.8A20 20 0 0 0 10 36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M16 42.2A20 20 0 0 0 40 14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="36.5" cy="8.5" r="4.4" stroke="currentColor" strokeWidth="3.6" fill="#071A25" />
        <circle cx="13.5" cy="41.5" r="4.4" stroke="currentColor" strokeWidth="3.6" fill="#071A25" />
        <circle cx="25" cy="25" r="6.2" stroke="currentColor" strokeWidth="3.6" />
      </svg>
      <span className="brand-type"><strong>MUVORY</strong><small>TECHNOLOGIES</small></span>
    </a>
  );
}
