import AppIcon from '../assets/Logo/applogo.png';

/**
 * Used to get the image
 * @param {String} type Name of the icon
 * @returns Icon reference
 */
export default function Icon(type) {
  let selectedIcon = '';
  let icon = type.toLowerCase();
  switch (icon) {
    case 'appicon': {
      selectedIcon = AppIcon;
      break;
    }
    default: {
      selectedIcon = AppIcon;
    }
  }
  return selectedIcon;
}
