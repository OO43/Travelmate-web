import { Link } from 'react-router-dom';
interface BrandProps { publicStyle?: boolean; }
export default function Brand({ publicStyle = false }: BrandProps) {
  return <Link className={`brand ${publicStyle ? 'public-brand' : ''}`} to="/" aria-label="TravelMate homepage">
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="240 180 285 345" preserveAspectRatio="xMidYMid meet"><image href="/travelmate-brand.png" width="1536" height="1024" /></svg>
    </span>
    <span className="brand-wordmark">TravelMate</span>
  </Link>;
}
