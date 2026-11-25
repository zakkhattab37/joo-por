import { useTheme } from '../context/useTheme';
import avatarDark from '../assets/yousef-avatar-dark.png';
import avatarLight from '../assets/yousef-avatar-light.png';
import './BrandAvatar.css';

export default function BrandAvatar({ className = '' }) {
  const { theme } = useTheme();

  return (
    <span className={`brand-avatar ${className}`} aria-hidden="true">
      <img src={theme === 'dark' ? avatarDark : avatarLight} alt="" width="1254" height="1254" decoding="async" />
    </span>
  );
}
