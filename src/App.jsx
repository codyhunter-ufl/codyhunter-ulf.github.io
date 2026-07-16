import { useEffect, useState } from 'react'
import { Footer, Header } from './components/Layout.jsx'
import { MediaViewer } from './components/MediaViewer.jsx'
import { projects } from './data/content.js'
import { HomePage } from './pages/HomePage.jsx'
import { ProjectPage } from './pages/ProjectPage.jsx'
import { ResumePage } from './pages/ResumePage.jsx'

function getRoute() {
  const hash = window.location.hash

  if (!hash || hash === '#/' || hash === '#') return { page: 'home' }
  if (hash === '#/resume') return { page: 'resume' }
  if (hash.startsWith('#/')) return { page: 'project', slug: hash.slice(2) }

  // Plain hashes like #about still behave like same-page section links.
  return { page: 'home', anchor: hash.slice(1) }
}

function App() {
  const [route, setRoute] = useState(getRoute)
  const [viewerImage, setViewerImage] = useState(null)

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    const projectTitle = projects.find((project) => project.slug === route.slug)?.listTitle

    // Keep browser tab titles aligned with whichever hash route is active.
    document.title =
      route.page === 'resume'
        ? 'Cody Hunter | Resume/CV'
        : route.page === 'project'
          ? `${projectTitle ?? 'Project'} | Cody Hunter`
          : 'Cody Hunter | Geology & Geography E-Portfolio'

    if (route.anchor) {
      requestAnimationFrame(() => document.getElementById(route.anchor)?.scrollIntoView())
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [route])

  const project = route.page === 'project' ? projects.find((item) => item.slug === route.slug) : null

  const openMediaViewer = (event) => {
    const image = event.target instanceof HTMLImageElement ? event.target : null

    if (!image || image.closest('[data-media-viewer]')) return

    event.preventDefault()
    const figure = image.closest('figure')
    const caption = figure?.querySelector('figcaption')?.textContent?.trim()

    setViewerImage({
      alt: image.alt || 'Expanded portfolio image',
      caption,
      src: image.currentSrc || image.src,
    })
  }

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#2f2a24]" onClickCapture={openMediaViewer}>
      <Header />
      <main>
        {route.page === 'resume' ? <ResumePage /> : project ? <ProjectPage project={project} /> : <HomePage />}
      </main>
      <Footer />
      <MediaViewer image={viewerImage} onClose={() => setViewerImage(null)} />
    </div>
  )
}

export default App
