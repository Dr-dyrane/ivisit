import { IconType } from 'react-icons';
import { FaHome, FaCalendarAlt, FaUserAlt } from 'react-icons/fa';

export interface NavItem {
  path: string;
  label: string;
  icon: IconType;
}

export const navItems: NavItem[] = [
  { path: '/emergency', label: 'Home', icon: FaHome },
  { path: '/visits', label: 'Visits', icon: FaCalendarAlt },
  { path: '/profile', label: 'Profile', icon: FaUserAlt },
];

export const isHomePage = (path: string) => ['/emergency', '/book-bed'].includes(path);

