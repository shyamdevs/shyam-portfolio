import {
  SiJavascript, SiReact, SiNodedotjs, SiExpress, SiMongodb, SiHtml5,
  SiCss, SiTailwindcss, SiGit, SiGithub, SiPostman, SiVercel, SiJsonwebtokens,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'

export const skillGroups = [
  {
    label: 'Frontend',
    skills: [
      { name: 'JavaScript (ES6+)', icon: SiJavascript },
      { name: 'React.js', icon: SiReact },
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: SiCss },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express.js', icon: SiExpress },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'JWT Auth', icon: SiJsonwebtokens },
    ],
  },
  {
    label: 'Tools',
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Postman', icon: SiPostman },
      { name: 'VS Code', icon: VscVscode },
      { name: 'Vercel', icon: SiVercel },
    ],
  },
]


export const staticStats = [
  { key: 'projects', value: 9, suffix: '+', label: 'Projects Completed' },
  { key: 'years', value: 2, suffix: '+', label: 'Years Learning' },
  { key: 'technologies', value: 14, suffix: '', label: 'Technologies' },
]