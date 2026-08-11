import {
  SiJavascript, SiReact, SiNodedotjs, SiExpress, SiMongodb, SiHtml5,
  SiCss, SiTailwindcss, SiGit, SiGithub, SiPostman, SiVercel, SiJsonwebtokens,
} from 'react-icons/si'
import { FiCode } from 'react-icons/fi'

// naam ko lowercase karke match karte hain, taaki "React.js" aur "react" dono chalein
const iconMap = {
  javascript: SiJavascript,
  react: SiReact,
  'node.js': SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  html5: SiHtml5,
  css3: SiCss,
  'tailwind css': SiTailwindcss,
  git: SiGit,
  github: SiGithub,
  postman: SiPostman,
  vercel: SiVercel,
  jwt: SiJsonwebtokens,
}

export function getSkillIcon(name = '') {
  const key = name.trim().toLowerCase()
  const match = Object.keys(iconMap).find((k) => key.includes(k))
  return match ? iconMap[match] : FiCode // koi match na mile to generic icon
}