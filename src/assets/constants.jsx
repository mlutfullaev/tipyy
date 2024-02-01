import Main from '@/pages/Main/Main.jsx'
import About from '@/pages/About/About.jsx'

export const routes = [
  {
    id: 'main',
    link: '/',
    element: <Main />
  },
  {
    id: 'about',
    link: '/about',
    element: <About />
  },
]
