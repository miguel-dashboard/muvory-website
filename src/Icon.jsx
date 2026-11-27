export default function Icon({ name, size = 24, className = '' }) {
  const paths = {
    arrow: <><path d="M4 12h16" /><path d="m13 5 7 7-7 7" /></>,
    arrowUp: <><path d="m7 17 10-10" /><path d="M8 7h9v9" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 16 9 5 9-5" /></>,
    chart: <><path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-7" /><path d="M22 20v-12" /></>,
    workflow: <><rect x="2" y="3" width="7" height="6" rx="1" /><rect x="15" y="15" width="7" height="6" rx="1" /><path d="M5.5 9v5a4 4 0 0 0 4 4H15" /><path d="M15 6h6" /><path d="m18 3 3 3-3 3" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18" /><path d="M12 3a15 15 0 0 0 0 18" /></>,
    message: <><path d="M20 11.5a8.5 8.5 0 0 1-8.5 8.5 9.1 9.1 0 0 1-4-.9L3 21l1.9-4.5A8.5 8.5 0 1 1 20 11.5Z" /><path d="M8 12h8" /><path d="M8 9h5" /></>,
    spark: <><path d="m12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2Z" /></>,
    store: <><path d="M3 10h18l-2-6H5l-2 6Z" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></>,
    building: <><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" /><path d="M10 21v-3h4v3" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12a22 22 0 0 0 18 0" /></>,
    truck: <><path d="M3 5h12v12H3z" /><path d="M15 9h4l3 4v4h-7" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
    check: <><path d="m4 12 5 5L20 6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="M5 5l14 14M19 5 5 19" /></>
  };
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.spark}</svg>;
}
