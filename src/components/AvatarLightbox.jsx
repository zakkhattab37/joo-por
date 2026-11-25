import { profile } from '../data/portfolio';
import { useTheme } from '../context/useTheme';
import CertLightbox from './CertLightbox';
import avatarDark from '../assets/yousef-avatar-dark.png';
import avatarLight from '../assets/yousef-avatar-light.png';

// Full-size viewer for the avatar logo (reuses the certificate lightbox:
// zoom, full screen, open in new tab, Esc / click outside to close).
// Keep it mounted outside anything that unmounts (like the expanded navbar island).
export default function AvatarLightbox({ open, onClose }) {
  const { theme } = useTheme();
  const name = `${profile.firstName} ${profile.lastName}`;
  const items = [
    {
      title: name,
      issuer: profile.role,
      image: theme === 'dark' ? avatarDark : avatarLight,
      label: `Portrait of ${name}`,
      alt: `Portrait of ${name}`,
    },
  ];
  return <CertLightbox items={items} index={open ? 0 : null} onChange={() => {}} onClose={onClose} />;
}
