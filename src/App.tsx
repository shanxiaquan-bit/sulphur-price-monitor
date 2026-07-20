import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Trends from './pages/Trends'
import Regions from './pages/Regions'
import News from './pages/News'
import Sources from './pages/Sources'

/** 路由切换时回到顶部 */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="trends" element={<Trends />} />
          <Route path="regions" element={<Regions />} />
          <Route path="news" element={<News />} />
          <Route path="sources" element={<Sources />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  )
}
