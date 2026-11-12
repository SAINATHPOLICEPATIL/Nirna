import type { Dictionary } from './en'

/**
 * Kannada system / accessibility strings. Visible content lives in Payload CMS.
 * TODO(review): have a native Kannada speaker review these before public launch.
 */
export const kn: Dictionary = {
  skipToContent: 'ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ಹೋಗಿ',
  languageSwitcherLabel: 'ಭಾಷೆ ಬದಲಾಯಿಸಿ',
  nav: {
    label: 'ಮುಖ್ಯ ಸಂಚರಣೆ',
    openMenu: 'ಮೆನು ತೆರೆಯಿರಿ',
    closeMenu: 'ಮೆನು ಮುಚ್ಚಿ',
  },
  search: {
    comingSoon: 'ಹುಡುಕಾಟ (ಶೀಘ್ರದಲ್ಲೇ)',
  },
  placeholder: {
    photo: 'ಚಿತ್ರ ಶೀಘ್ರದಲ್ಲೇ',
    illustrative: 'ವಿವರಣಾತ್ಮಕ ಚಿತ್ರ',
    photoAlt: (subject: string) => `ತಾತ್ಕಾಲಿಕ ಚಿತ್ರ — ನೈಜ ಛಾಯಾಚಿತ್ರವನ್ನು ಸೇರಿಸಲಾಗುವುದು: ${subject}`,
  },
  breadcrumb: { label: 'ಬ್ರೆಡ್‌ಕ್ರಂಬ್', home: 'ಮುಖಪುಟ' },
  map: { ariaLabel: 'ಸಂವಾದಾತ್ಮಕ ಗ್ರಾಮ ನಕ್ಷೆ' },
  devNotice: 'ಅಭಿವೃದ್ಧಿ ಆವೃತ್ತಿ — ಸಾರ್ವಜನಿಕ ಬಳಕೆಗೆ ಅಲ್ಲ.',
}
