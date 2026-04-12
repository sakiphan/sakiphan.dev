import { FaGithub as GithubIcon } from 'react-icons/fa'
import {
  LuArmchair as ArmchairIcon,
  LuBookmark as BookmarkIcon,
  LuNavigation as NavigationIcon,
  LuPencilLine as PencilLineIcon,
  LuSparkles as SparklesIcon,
  LuWandSparkles as WandSparklesIcon
} from 'react-icons/lu'
import { RiInstagramFill as InstagramIcon } from 'react-icons/ri'
import { SiLinkedin as LinkedinIcon } from 'react-icons/si'

export const PROFILES = {
  github: {
    title: 'GitHub',
    url: 'https://github.com/sakiphan',
    icon: <GithubIcon size={16} />
  },
  linkedin: {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sakiphandursun',
    icon: <LinkedinIcon size={16} />
  },
  instagram: {
    title: 'Instagram',
    url: 'https://www.instagram.com/sakiphann',
    icon: <InstagramIcon size={16} />
  }
}

export const TWEETS_COLLECTION_ID = null

export const COLLECTION_IDS = [
  69743302, // DevOps Tools
  69743303, // Kubernetes
  69743305, // CI/CD
  69743306, // Monitoring
  69743308, // Blogs & Reading
  69743309, // Podcasts
  69743310, // Open Source
  69743312, // Cloud & Infrastructure
  69743349  // Physics & Space
]

export const LINKS = [
  {
    href: '/',
    label: 'Home',
    icon: <SparklesIcon size={16} />
  },
  {
    href: '/writing',
    label: 'Writing',
    icon: <PencilLineIcon size={16} />
  },
  {
    href: '/journey',
    label: 'Journey',
    icon: <NavigationIcon size={16} />
  },
  {
    href: '/stack',
    label: 'Stack',
    icon: <WandSparklesIcon size={16} />
  },
  {
    href: '/workspace',
    label: 'Workspace',
    icon: <ArmchairIcon size={16} />
  },
  {
    href: '/bookmarks',
    label: 'Bookmarks',
    icon: <BookmarkIcon size={16} />
  }
]

export const WORKSPACE_ITEMS = [
  {
    title: 'MacBook Pro',
    url: 'https://www.apple.com/macbook-pro/',
    specs: 'Space Gray, M4, 16GB RAM, 512GB SSD'
  },
  {
    title: 'Lenovo Legion R25f-30',
    url: 'https://www.amazon.com.tr/Lenovo-R25f-30-FreeSyncTM-Premium-67B8GACBTK/dp/B0CLDX1PTF',
    specs: 'Primary Monitor, 24.5", 240Hz, IPS'
  },
  {
    title: 'Samsung Odyssey G40B',
    url: 'https://www.samsung.com/tr/monitors/gaming/odyssey-g4-g40b-27-inch-ls27bg400euxuf/',
    specs: 'Secondary Monitor, 25", 240Hz, IPS'
  },
  {
    title: 'NuPhy Air60',
    url: 'https://nuphy.com/collections/keyboards/products/air60-v2',
    specs: 'Wireless Mechanical Keyboard, Low-Profile'
  },
  {
    title: 'Apple AirPods Max',
    url: 'https://www.apple.com/airpods-max/',
    specs: 'Space Gray'
  },
  {
    title: 'Apple AirPods Pro',
    url: 'https://www.apple.com/airpods-pro/',
    specs: '3rd Generation'
  },
  {
    title: 'Dyson Solarcycle Morph',
    url: 'https://www.dyson.com.tr/shop/aydinlatma/solarcycle-morph-desk-white-silver',
    specs: 'White/Silver, Desk Lamp'
  },
  {
    title: 'IKEA IDÅSEN Desk',
    url: 'https://www.ikea.com/us/en/p/idasen-desk-sit-stand-black-dark-gray-s89281029/',
    specs: 'Black, 160x80cm'
  }
]

export const SCROLL_AREA_ID = 'scroll-area'
export const MOBILE_SCROLL_THRESHOLD = 20
export const SUPABASE_TABLE_NAME = 'pages'

export const SUBMIT_BOOKMARK_FORM_TITLE = 'Submit a bookmark'
export const SUBMIT_BOOKMARK_FORM_DESCRIPTION =
  "Send me a website you like and if I like it too, you'll see it in the bookmarks list. With respect, please do not submit more than 5 websites a day."

export const CONTENT_TYPES = {
  PAGE: 'page',
  POST: 'post',
  LOGBOOK: 'logbook'
}
