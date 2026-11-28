import Icon from './Icon.jsx';
import { services } from './services-data.js';
export default function ServicesTeaser(){
  return <div className="cinema-services-list" aria-label="Servicios tecnológicos de MUVORY">
    {services.map(service=><a href={'/servicios/'+service.slug} className="cinema-service-row" key={service.slug}>
      <span className="cinema-service-no">{service.index}</span>
      <span className="cinema-service-heading"><Icon name={service.icon} size={21}/><strong>{service.name}</strong></span>
      <span className="cinema-service-about">{service.lead}</span>
      <span className="cinema-service-icon"><Icon name="arrowUp" size={19}/></span>
    </a>)}
    <a href="/servicios" className="cinema-service-forward">Descubrir todos los servicios <Icon name="arrow" size={18}/></a>
  </div>;
}
