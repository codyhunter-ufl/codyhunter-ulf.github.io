import { useEffect } from 'react'

export function MediaViewer({ image, onClose }) {
  useEffect(() => {
    if (!image) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [image, onClose])

  if (!image) return null

  return (
    <div
      aria-label="Image viewer"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
      data-media-viewer
      onClick={onClose}
      role="dialog"
    >
      <button
        aria-label="Close image viewer"
        className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#2f2a24] shadow-md transition hover:bg-white focus:ring-2 focus:ring-white focus:outline-none"
        onClick={onClose}
        type="button"
      >
        <span aria-hidden="true" className="relative block h-4 w-4">
          <span className="absolute top-1/2 left-0 h-0.5 w-4 -translate-y-1/2 rotate-45 rounded bg-current" />
          <span className="absolute top-1/2 left-0 h-0.5 w-4 -translate-y-1/2 -rotate-45 rounded bg-current" />
        </span>
      </button>

      <figure
        className="m-0 flex max-w-[min(1100px,94vw)] flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          alt={image.alt}
          className="mx-auto block max-h-[82vh] w-auto max-w-full rounded bg-white object-contain shadow-2xl"
          src={image.src}
        />
        {image.caption ? (
          <figcaption className="mx-auto mt-3 max-w-[900px] text-center text-sm leading-relaxed text-white/85">
            {image.caption}
          </figcaption>
        ) : null}
      </figure>
    </div>
  )
}
