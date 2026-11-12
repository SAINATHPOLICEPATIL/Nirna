/**
 * Initial CMS content, in Kannada (kn) and English (en).
 *
 * Contents: the approved homepage copy (Version 2 design), menu/footer labels, and the project
 * owner's initial village figures from the requirements document (§1.2) — NOT verified census data.
 * It deliberately contains NO news, coordinates, contact details, photos or financial figures.
 *
 * TODO(review): a native Kannada speaker should review every `kn` string; temple spellings need
 * owner confirmation (§23 item 5).
 */
import type { Locale } from '../i18n/config'

export type L = Record<Locale, string>

const customLink = (url: string, label: L) => ({ url, label })

export const siteSettings = {
  siteName: { kn: 'ನಿರ್ಣ ಡಿಜಿಟಲ್ ಗ್ರಾಮ', en: 'NIRNA Digital Village' },
  siteDescription: {
    kn: 'ನಮ್ಮ ಗ್ರಾಮವನ್ನು ಅನ್ವೇಷಿಸಿ, ನಮ್ಮ ಪರಂಪರೆಯನ್ನು ತಿಳಿಯಿರಿ ಮತ್ತು ಬೆಳೆಯುತ್ತಿರುವ ನಮ್ಮ ಸಮುದಾಯದ ಭಾಗವಾಗಿರಿ.',
    en: 'Explore our village, discover our heritage, and be part of our growing community.',
  },
  logoTitle: 'NIRNA',
  logoSubtitle: { kn: 'ಡಿಜಿಟಲ್ ಗ್ರಾಮ', en: 'Digital Village' },
}

export const navItems = [
  customLink('/', { kn: 'ಮುಖಪುಟ', en: 'Home' }),
  customLink('/about', { kn: 'ನಮ್ಮ ಬಗ್ಗೆ', en: 'About' }),
  customLink('/places', { kn: 'ಸ್ಥಳಗಳು', en: 'Places' }),
  customLink('/services', { kn: 'ಸೇವೆಗಳು', en: 'Services' }),
  customLink('/map', { kn: 'ಗ್ರಾಮ ನಕ್ಷೆ', en: 'Village Map' }),
  customLink('/news', { kn: 'ಸುದ್ದಿ', en: 'News' }),
  customLink('/development', { kn: 'ಅಭಿವೃದ್ಧಿ', en: 'Development' }),
  customLink('/contact', { kn: 'ಸಂಪರ್ಕ', en: 'Contact' }),
]

export const footer = {
  columns: [
    {
      title: { kn: 'ತ್ವರಿತ ಕೊಂಡಿಗಳು', en: 'Quick Links' },
      links: [
        customLink('/about', { kn: 'ನಮ್ಮ ಬಗ್ಗೆ', en: 'About' }),
        customLink('/places', { kn: 'ಸ್ಥಳಗಳು', en: 'Places' }),
        customLink('/news', { kn: 'ಸುದ್ದಿ', en: 'News' }),
        customLink('/development', { kn: 'ಅಭಿವೃದ್ಧಿ', en: 'Development' }),
        customLink('/contact', { kn: 'ಸಂಪರ್ಕ', en: 'Contact' }),
      ],
    },
    {
      title: { kn: 'ಸೇವೆಗಳು', en: 'Services' },
      links: [
        customLink('/education', { kn: 'ಶಿಕ್ಷಣ', en: 'Education' }),
        customLink('/healthcare', { kn: 'ಆರೋಗ್ಯ', en: 'Healthcare' }),
        customLink('/map', { kn: 'ಗ್ರಾಮ ನಕ್ಷೆ', en: 'Village Map' }),
        customLink('/complaints', { kn: 'ದೂರುಗಳು', en: 'Complaints' }),
      ],
    },
    {
      title: { kn: 'ಮಾಹಿತಿ', en: 'Information' },
      links: [
        customLink('/privacy', { kn: 'ಗೌಪ್ಯತಾ ನೀತಿ', en: 'Privacy Policy' }),
        customLink('/terms', { kn: 'ಬಳಕೆಯ ನಿಯಮಗಳು', en: 'Terms of Use' }),
        customLink('/disclaimer', { kn: 'ಹಕ್ಕು ನಿರಾಕರಣೆ', en: 'Disclaimer' }),
      ],
    },
  ],
  disclaimer: {
    kn: 'ನಿರ್ಣ ಡಿಜಿಟಲ್ ಗ್ರಾಮವು ಸ್ವತಂತ್ರವಾಗಿ ನಡೆಸಲಾಗುವ ಗ್ರಾಮ ಮಾಹಿತಿ ವೇದಿಕೆಯಾಗಿದೆ. ಇದು ಅಧಿಕೃತ ಗ್ರಾಮ ಪಂಚಾಯಿತಿ ಅಥವಾ ಸರ್ಕಾರಿ ಜಾಲತಾಣವಲ್ಲ.',
    en: 'NIRNA Digital Village is an independently operated village information platform. It is not an official Gram Panchayat or government website.',
  },
  copyright: { kn: '© {year} ನಿರ್ಣ ಡಿಜಿಟಲ್ ಗ್ರಾಮ', en: '© {year} NIRNA Digital Village' },
}

/** Owner-provided initial figures (requirements §1.2). */
export const villageProfile = {
  localized: {
    name: { kn: 'ನಿರ್ಣ', en: 'Nirna' },
    shortDescription: {
      kn: 'ನಿರ್ಣ ಕರ್ನಾಟಕದ ಬೀದರ್ ಜಿಲ್ಲೆಯ ಒಂದು ಗ್ರಾಮವಾಗಿದ್ದು, ಕೃಷಿ, ದೇವಾಲಯಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ಪರಂಪರೆಗೆ ಹೆಸರುವಾಸಿಯಾಗಿದೆ.',
      en: 'NIRNA is a village in Bidar district, Karnataka, known for its agriculture, temples and historical heritage.',
    },
    district: { kn: 'ಬೀದರ್ ಜಿಲ್ಲೆ', en: 'Bidar District' },
    state: { kn: 'ಕರ್ನಾಟಕ', en: 'Karnataka' },
    country: { kn: 'ಭಾರತ', en: 'India' },
  },
  shared: {
    population: 9415,
    malePopulation: 4780,
    femalePopulation: 4635,
    households: 1678,
    figuresSource:
      'Initial figures provided by the project owner (requirements document). Not verified census data.',
    governmentSchools: 5,
    privateSchools: 4,
    colleges: 1,
    governmentHospitals: 1,
    privateHospitalsAndClinics: 6,
    countsAreApproximate: true,
    contactVerified: false,
  },
}

/** Temples named by the owner (§1.2). Spellings pending confirmation; no photos or coordinates. */
export const places = [
  { slug: 'basaweshwara-temple', name: { kn: 'ಬಸವೇಶ್ವರ ದೇವಸ್ಥಾನ', en: 'Basaweshwara Temple' } },
  { slug: 'hanuman-temple', name: { kn: 'ಹನುಮಾನ್ ದೇವಸ್ಥಾನ', en: 'Hanuman Temple' } },
  {
    slug: 'bhuvaneshwari-devi-temple',
    name: { kn: 'ಭುವನೇಶ್ವರಿ ದೇವಿ ದೇವಸ್ಥಾನ', en: 'Bhuvaneshwari Devi Temple' },
  },
  {
    slug: 'hemareddy-mallamma-temple',
    name: { kn: 'ಹೇಮರೆಡ್ಡಿ ಮಲ್ಲಮ್ಮ ದೇವಸ್ಥಾನ', en: 'Hemareddy Mallamma Temple' },
  },
].map((place, i) => ({
  ...place,
  category: 'temple' as const,
  featured: true,
  sortOrder: (i + 1) * 10,
  verificationStatus: 'unverified' as const,
  source:
    'Named by the project owner in the requirements document. Official spelling to be confirmed.',
}))

/** Initial complaint categories (§11.11). */
export const complaintCategories: L[] = [
  { kn: 'ರಸ್ತೆ ಹಾನಿ', en: 'Road damage' },
  { kn: 'ಕಸ ಸಂಗ್ರಹಣೆ', en: 'Garbage collection' },
  { kn: 'ನೀರು ಪೂರೈಕೆ', en: 'Water supply' },
  { kn: 'ಬೀದಿ ದೀಪಗಳು', en: 'Streetlights' },
  { kn: 'ಚರಂಡಿ', en: 'Drainage' },
  { kn: 'ಇತರ ಸಾರ್ವಜನಿಕ ಮೂಲಸೌಕರ್ಯ', en: 'Other public infrastructure' },
]

/** Homepage blocks, in the approved Version 2 order. */
export const homePage = {
  slug: 'home',
  title: { kn: 'ಮುಖಪುಟ', en: 'Home' },
  blocks: [
    {
      blockType: 'hero' as const,
      shared: {
        kannadaHeadline: 'ನಮ್ಮ ನಿರ್ಣ ಗ್ರಾಮಕ್ಕೆ ಸ್ವಾಗತ',
        englishHeadline: 'Welcome to NIRNA',
      },
      localized: { subtitle: siteSettings.siteDescription },
      cta: customLink('/about', { kn: 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ', en: 'Know More' }),
    },
    {
      blockType: 'villageStats' as const,
      localized: {
        regionLabel: { kn: 'ಗ್ರಾಮದ ಒಂದು ನೋಟ', en: 'Village at a glance' },
        populationLabel: { kn: 'ಒಟ್ಟು ಜನಸಂಖ್ಯೆ', en: 'Total Population' },
        maleLabel: { kn: 'ಪುರುಷರು', en: 'Male' },
        femaleLabel: { kn: 'ಮಹಿಳೆಯರು', en: 'Female' },
        householdsLabel: { kn: 'ಕುಟುಂಬಗಳು', en: 'Households' },
      },
    },
    {
      blockType: 'about' as const,
      localized: { heading: { kn: 'ನಿರ್ಣದ ಬಗ್ಗೆ', en: 'About Nirna' } },
      cta: customLink('/about', { kn: 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ', en: 'Learn More' }),
    },
    {
      blockType: 'explorePlaces' as const,
      shared: { populateBy: 'featured' as const, limit: 4, showOtherLanguageName: true },
      localized: {
        heading: { kn: 'ನಿರ್ಣವನ್ನು ಅನ್ವೇಷಿಸಿ', en: 'Explore Nirna' },
        subheading: {
          kn: 'ನಮ್ಮ ದೇವಾಲಯಗಳು, ಪರಂಪರೆ ಮತ್ತು ಹೆಗ್ಗುರುತುಗಳನ್ನು ತಿಳಿಯಿರಿ',
          en: 'Discover our temples, heritage and landmarks',
        },
        emptyText: {
          kn: 'ಪ್ರಕಟಿಸಿದ ನಂತರ ಸ್ಥಳಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.',
          en: 'Places will appear here once they are published.',
        },
      },
      viewAll: customLink('/places', { kn: 'ಎಲ್ಲವನ್ನೂ ನೋಡಿ', en: 'View All' }),
    },
    {
      blockType: 'mapPreview' as const,
      localized: {
        heading: { kn: 'ಸಂವಾದಾತ್ಮಕ ಗ್ರಾಮ ನಕ್ಷೆ', en: 'Interactive Village Map' },
        subheading: {
          kn: 'ಪ್ರಮುಖ ಸ್ಥಳಗಳು ಮತ್ತು ಸೇವೆಗಳನ್ನು ಹುಡುಕಿ',
          en: 'Find important places and services',
        },
        pendingText: {
          kn: 'ಪರಿಶೀಲನೆಯ ನಂತರ ಸ್ಥಳಗಳನ್ನು ಸೇರಿಸಲಾಗುವುದು',
          en: 'Locations will be added after verification',
        },
        availableText: { kn: '{count} ಪರಿಶೀಲಿಸಿದ ಸ್ಥಳಗಳು', en: '{count} verified locations' },
      },
      cta: customLink('/map', { kn: 'ನಕ್ಷೆ ನೋಡಿ', en: 'View Map' }),
    },
    {
      blockType: 'educationHealth' as const,
      localized: {
        heading: { kn: 'ಶಿಕ್ಷಣ ಮತ್ತು ಆರೋಗ್ಯ', en: 'Education & Healthcare' },
        subheading: {
          kn: 'ಎಲ್ಲರಿಗೂ ಗುಣಮಟ್ಟದ ಶಿಕ್ಷಣ ಮತ್ತು ಉತ್ತಮ ಆರೋಗ್ಯ',
          en: 'Quality Education and Better Health for All',
        },
        schoolsLabel: { kn: 'ಶಾಲೆಗಳು', en: 'Schools' },
        collegeLabel: { kn: 'ಕಾಲೇಜು', en: 'College' },
        hospitalsLabel: { kn: 'ಆಸ್ಪತ್ರೆಗಳು / ಚಿಕಿತ್ಸಾಲಯಗಳು', en: 'Hospitals / Clinics' },
        governmentLabel: { kn: 'ಸರ್ಕಾರಿ', en: 'Govt' },
        privateLabel: { kn: 'ಖಾಸಗಿ', en: 'Private' },
      },
      cta: customLink('/services', { kn: 'ಸೇವೆಗಳನ್ನು ನೋಡಿ', en: 'Explore Services' }),
    },
    {
      blockType: 'latestNews' as const,
      shared: { limit: 3 },
      localized: {
        heading: { kn: 'ಇತ್ತೀಚಿನ ಸುದ್ದಿ ಮತ್ತು ಪ್ರಕಟಣೆಗಳು', en: 'Latest News & Announcements' },
        subheading: { kn: 'ಗ್ರಾಮದ ಸುದ್ದಿಗಳ ಬಗ್ಗೆ ತಿಳಿದಿರಿ', en: 'Stay updated with village news' },
        emptyText: {
          kn: 'ಇನ್ನೂ ಯಾವುದೇ ಪ್ರಕಟಣೆಗಳಿಲ್ಲ. ಪರಿಶೀಲಿಸಿದ ಗ್ರಾಮದ ಸುದ್ದಿಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.',
          en: 'No announcements yet. Verified village news will appear here.',
        },
      },
      cta: customLink('/news', { kn: 'ಎಲ್ಲವನ್ನೂ ನೋಡಿ', en: 'View All' }),
    },
    {
      blockType: 'developmentPreview' as const,
      localized: {
        heading: { kn: 'ಅಭಿವೃದ್ಧಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', en: 'Development Dashboard' },
        subheading: {
          kn: 'ಗ್ರಾಮದ ಅಭಿವೃದ್ಧಿ ಮತ್ತು ಪರಿಶೀಲಿಸಿದ ಹಣಕಾಸು ಮಾಹಿತಿಯನ್ನು ನೋಡಿ',
          en: 'Track village development and verified financial information',
        },
      },
      cta: customLink('/development', { kn: 'ವಿವರಗಳನ್ನು ನೋಡಿ', en: 'View Details' }),
    },
  ],
}

/**
 * About page (approved About design). Copy uses ONLY facts from the requirements document
 * (§1.2): location, temples named by the owner, facility counts. History, culture and
 * development claims are left for the owner and residents to add.
 */
export const aboutPage = {
  slug: 'about',
  title: { kn: 'ನಮ್ಮ ಬಗ್ಗೆ', en: 'About Nirna' },
  blocks: [
    {
      blockType: 'pageHero' as const,
      shared: { showBreadcrumb: true, accentLine: true },
      localized: {
        title: { kn: 'ನಿರ್ಣವನ್ನು ಅನ್ವೇಷಿಸಿ', en: 'Discover Nirna' },
        subtitle: {
          kn: 'ಪರಂಪರೆ, ಸಂಸ್ಕೃತಿ ಮತ್ತು ಬೆಳೆಯುತ್ತಿರುವ ಸಮುದಾಯದ ಗ್ರಾಮ',
          en: 'A village of heritage, culture and a growing community',
        },
        breadcrumbLabel: { kn: 'ನಮ್ಮ ಬಗ್ಗೆ', en: 'About Nirna' },
      },
    },
    {
      blockType: 'villageIntro' as const,
      localized: {
        heading: { kn: 'ನಮ್ಮ ಗ್ರಾಮ', en: 'Our Village' },
        glanceHeading: { kn: 'ಗ್ರಾಮದ ಒಂದು ನೋಟ', en: 'Village at a Glance' },
        populationLabel: { kn: 'ಒಟ್ಟು ಜನಸಂಖ್ಯೆ', en: 'Total Population' },
        maleLabel: { kn: 'ಪುರುಷರು', en: 'Male' },
        femaleLabel: { kn: 'ಮಹಿಳೆಯರು', en: 'Female' },
        householdsLabel: { kn: 'ಕುಟುಂಬಗಳು', en: 'Households' },
      },
    },
    {
      blockType: 'mediaText' as const,
      shared: { imagePosition: 'left', leafDecoration: true },
      localized: {
        heading: { kn: 'ಇತಿಹಾಸ ಮತ್ತು ಪರಂಪರೆ', en: 'History & Heritage' },
        text: {
          kn: 'ನಿರ್ಣದಲ್ಲಿ ಬಸವೇಶ್ವರ, ಹನುಮಾನ್, ಭುವನೇಶ್ವರಿ ದೇವಿ ಮತ್ತು ಹೇಮರೆಡ್ಡಿ ಮಲ್ಲಮ್ಮ ದೇವಸ್ಥಾನಗಳು ಸೇರಿದಂತೆ ಹಲವು ದೇವಾಲಯಗಳಿವೆ.',
          en: 'Nirna is home to several temples, including the Basaweshwara, Hanuman, Bhuvaneshwari Devi and Hemareddy Mallamma temples.',
        },
      },
      cta: customLink('/places', { kn: 'ನಮ್ಮ ಪರಂಪರೆಯನ್ನು ಅನ್ವೇಷಿಸಿ', en: 'Explore Our Heritage' }),
    },
    {
      blockType: 'mediaText' as const,
      shared: { imagePosition: 'right', leafDecoration: false },
      localized: {
        heading: { kn: 'ಸಂಸ್ಕೃತಿ ಮತ್ತು ಸಮುದಾಯ', en: 'Culture & Community' },
        text: {
          kn: 'ನಿರ್ಣದ ಹಬ್ಬಗಳು, ಸಂಪ್ರದಾಯಗಳು ಮತ್ತು ಸಮುದಾಯ ಜೀವನವನ್ನು ಗ್ರಾಮಸ್ಥರ ಸಹಯೋಗದೊಂದಿಗೆ ಇಲ್ಲಿ ದಾಖಲಿಸಲಾಗುವುದು.',
          en: 'The festivals, traditions and community life of Nirna will be documented here together with residents.',
        },
      },
      cta: customLink('/news', { kn: 'ಗ್ರಾಮದ ಸುದ್ದಿ', en: 'Village News' }),
    },
    {
      blockType: 'mediaText' as const,
      shared: { imagePosition: 'left', leafDecoration: true },
      localized: {
        heading: { kn: 'ಶಿಕ್ಷಣ ಮತ್ತು ಅಭಿವೃದ್ಧಿ', en: 'Education & Development' },
        text: {
          kn: 'ನಿರ್ಣದಲ್ಲಿ ಸರ್ಕಾರಿ ಮತ್ತು ಖಾಸಗಿ ಶಾಲೆಗಳು, ಒಂದು ಕಾಲೇಜು, ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆ ಮತ್ತು ಖಾಸಗಿ ಚಿಕಿತ್ಸಾಲಯಗಳಿವೆ. ಪರಿಶೀಲಿಸಿದ ಅಭಿವೃದ್ಧಿ ಯೋಜನೆಗಳನ್ನು ಅಭಿವೃದ್ಧಿ ಪುಟದಲ್ಲಿ ಪ್ರಕಟಿಸಲಾಗುವುದು.',
          en: 'Nirna has government and private schools, a college, a government hospital and private clinics. Verified development projects will be published on the Development page.',
        },
      },
      cta: customLink('/services', { kn: 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ', en: 'Learn More' }),
    },
    {
      blockType: 'locationCard' as const,
      localized: {
        heading: { kn: 'ನಮ್ಮ ಸ್ಥಳ', en: 'Our Location' },
        text: {
          kn: 'ನಿರ್ಣ ಕರ್ನಾಟಕದ ಬೀದರ್ ಜಿಲ್ಲೆಯಲ್ಲಿದೆ.',
          en: 'Nirna is located in Bidar district, Karnataka.',
        },
      },
      cta: customLink('/map', { kn: 'ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ', en: 'View on Map' }),
    },
  ],
}

/** Village Map page (approved map design). Labels only — markers come from Map Locations. */
export const mapPage = {
  slug: 'map',
  title: { kn: 'ಗ್ರಾಮ ನಕ್ಷೆ', en: 'Village Map' },
  blocks: [
    {
      blockType: 'pageHero' as const,
      shared: { showBreadcrumb: true, accentLine: false },
      localized: {
        title: { kn: 'ನಿರ್ಣ ಗ್ರಾಮ ನಕ್ಷೆ', en: 'Nirna Village Map' },
        subtitle: {
          kn: 'ನಮ್ಮ ಗ್ರಾಮದ ದೇವಾಲಯಗಳು, ಶಾಲೆಗಳು, ಆರೋಗ್ಯ ಸೇವೆಗಳು ಮತ್ತು ಇನ್ನಷ್ಟನ್ನು ಅನ್ವೇಷಿಸಿ',
          en: 'Explore temples, schools, healthcare and more in our village',
        },
        breadcrumbLabel: { kn: 'ಗ್ರಾಮ ನಕ್ಷೆ', en: 'Village Map' },
      },
    },
    {
      blockType: 'villageMap' as const,
      localized: {
        allLabel: { kn: 'ಎಲ್ಲಾ ಸ್ಥಳಗಳು', en: 'All Locations' },
        templesLabel: { kn: 'ದೇವಾಲಯಗಳು', en: 'Temples' },
        educationLabel: { kn: 'ಶಿಕ್ಷಣ', en: 'Education' },
        healthcareLabel: { kn: 'ಆರೋಗ್ಯ', en: 'Healthcare' },
        publicLabel: { kn: 'ಸಾರ್ವಜನಿಕ ಸೌಲಭ್ಯಗಳು', en: 'Public Facilities' },
        otherLabel: { kn: 'ಇತರ ಸ್ಥಳಗಳು', en: 'Other Places' },
        searchPlaceholder: { kn: 'ಸ್ಥಳಗಳನ್ನು ಹುಡುಕಿ…', en: 'Search places…' },
        emptyText: {
          kn: 'ಪರಿಶೀಲಿಸಿದ ಸ್ಥಳಗಳು ಶೀಘ್ರದಲ್ಲೇ ನಕ್ಷೆಯಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.',
          en: 'Verified locations will appear on the map soon.',
        },
        noResultsText: {
          kn: 'ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದುವ ಸ್ಥಳಗಳಿಲ್ಲ.',
          en: 'No places match your search.',
        },
        districtNote: {
          kn: 'ಗ್ರಾಮದ ಸ್ಥಳ ಪರಿಶೀಲನೆಯಾಗುವವರೆಗೆ ಬೀದರ್ ಜಿಲ್ಲೆಯನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ.',
          en: 'Showing Bidar district until the village location is verified.',
        },
        viewDetailsLabel: { kn: 'ವಿವರಗಳನ್ನು ನೋಡಿ', en: 'View Details' },
        villageTitle: { kn: 'ನಿರ್ಣ ಗ್ರಾಮ', en: 'Nirna Village' },
        coordinatesPendingText: {
          kn: 'ಪರಿಶೀಲನೆಯ ನಂತರ ನಿರ್ದೇಶಾಂಕಗಳನ್ನು ತೋರಿಸಲಾಗುವುದು',
          en: 'Coordinates will be shown after verification',
        },
        latitudeLabel: { kn: 'ಅಕ್ಷಾಂಶ', en: 'Lat' },
        longitudeLabel: { kn: 'ರೇಖಾಂಶ', en: 'Long' },
        exploreTitle: { kn: 'ನಮ್ಮ ಗ್ರಾಮವನ್ನು ಅನ್ವೇಷಿಸಿ', en: 'Explore Our Village' },
        exploreText: {
          kn: 'ನಿರ್ಣವನ್ನು ವಿಶೇಷವಾಗಿಸುವ ಸ್ಥಳಗಳನ್ನು ತಿಳಿಯಿರಿ',
          en: 'Discover the places that make Nirna special',
        },
        fullMapLabel: { kn: 'ಪೂರ್ಣ ನಕ್ಷೆ ನೋಡಿ', en: 'View Full Map' },
        closeFullMapLabel: { kn: 'ಪೂರ್ಣ ನಕ್ಷೆ ಮುಚ್ಚಿ', en: 'Close Full Map' },
      },
    },
  ],
}
