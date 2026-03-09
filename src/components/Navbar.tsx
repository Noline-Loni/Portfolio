import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { projects } from '../data/projects'

const links = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false)
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
    setMobileWorkOpen(false)
  }, [location])

  const handleWorkEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setWorkDropdownOpen(true)
  }

  const handleWorkLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setWorkDropdownOpen(false)
    }, 200)
  }

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-all duration-slow ease-smooth md:px-12 lg:px-24 ${
          scrolled
            ? 'bg-surface/80 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="relative z-50" data-hover>
          <svg
            viewBox="0 0 1366 768"
            className="h-6 w-auto fill-content md:h-7"
            aria-label="Noline Lindor"
          >
            <path d="M351.67,268.87V376H295.81V276.42q0-18.39-9.52-28.59t-25.63-10.17q-16.1,0-25.61,10.17t-9.54,28.59V654.94H169.33V192.65h56.18V217a59.34,59.34,0,0,1,23-19.22A73.24,73.24,0,0,1,281,190.67q32.19,0,51.4,20.87T351.67,268.87Z" />
            <path d="M421.46,367.08a84.12,84.12,0,0,1-33.83-32.85q-12.31-21.35-12.32-49.93,0-28.24,12.48-49.77a84.72,84.72,0,0,1,34.17-33Q443.64,190,470.58,190t48.61,11.5a84.78,84.78,0,0,1,34.17,33q12.48,21.53,12.48,49.77t-12.65,49.77a85.45,85.45,0,0,1-34.49,33q-21.86,11.51-48.78,11.5T421.46,367.08Zm75.89-48.94q11.32-11.83,11.33-33.84t-11-33.83a35.57,35.57,0,0,0-27.1-11.83q-16.44,0-27.27,11.66t-10.84,34q0,22,10.68,33.84A34.55,34.55,0,0,0,469.92,330,36.61,36.61,0,0,0,497.35,318.14Z" />
            <path d="M647.64,132.86V376H591.46V132.86Z" />
            <path d="M736.16,121.52c-6.23-5.78-14.17-8.7-23.81-8.7-9.86,0-17.91,2.92-24.14,8.7a28.57,28.57,0,0,0-9.38,21.85,28.2,28.2,0,0,0,9.38,21.52q9.35,8.72,24.14,8.71,14.46,0,23.81-8.71a28.19,28.19,0,0,0,9.37-21.52A28.56,28.56,0,0,0,736.16,121.52Z" />
            <path d="M740.27,192.65H684.1V496.94a60.14,60.14,0,0,0-23.49-20.37,72.08,72.08,0,0,0-33-7.55,75.91,75.91,0,0,0-41.05,11.49q-18.4,11.5-29.07,32.85T546.8,563q0,28.27,10.67,49.78t29.07,33.18a75.11,75.11,0,0,0,41.05,11.66q19.39,0,34-7.89a57.08,57.08,0,0,0,22.51-21v26.28h56.17m-67.83-58.46a39.11,39.11,0,0,1-56.83-.17Q604,584,604,563t11.66-33a39.45,39.45,0,0,1,56.83.17q11.65,12.17,11.66,33.18T672.44,596.48Z" />
            <path d="M939.84,211.54q19.21,20.86,19.22,57.32V376H903.21V276.42q0-18.41-9.53-28.58t-25.62-10.19q-16.09,0-25.62,10.19t-9.53,28.58V376H776.74V192.65h56.17V217a59.27,59.27,0,0,1,23-19.22q14.45-7.06,32.52-7.06Q920.62,190.68,939.84,211.54Z" />
            <path d="M1165.68,297.77H1038.55q1.32,17.09,11,26.11t23.81,9q21,0,29.24-17.74h59.79a82.06,82.06,0,0,1-16.59,32.52,83.07,83.07,0,0,1-30.06,22.67q-18.06,8.22-40.4,8.21-26.94,0-48-11.5a81.79,81.79,0,0,1-32.85-32.85q-11.82-21.35-11.82-49.93t11.66-49.93a80.68,80.68,0,0,1,32.69-32.85q21-11.51,48.29-11.5,26.61,0,47.3,11.17A80.28,80.28,0,0,1,1155,233.05q11.65,20.7,11.66,48.29A142.73,142.73,0,0,1,1165.68,297.77Zm-56.5-31.21q0-14.44-9.85-23T1074.69,235q-14.13,0-23.82,8.21t-12,23.32Z" />
            <path d="M261.48,443.88a28.19,28.19,0,0,1-9.36-21.51,28.6,28.6,0,0,1,9.36-21.85q9.38-8.7,24.15-8.7,14.44,0,23.82,8.7a28.6,28.6,0,0,1,9.36,21.85,28.19,28.19,0,0,1-9.36,21.51q-9.37,8.72-23.82,8.71Q270.84,452.59,261.48,443.88Zm52.07,27.76V655H257.38V471.64Z" />
            <path d="M508.52,490.53q19.22,20.87,19.22,57.33V655H471.89V555.41q0-18.39-9.53-28.58t-25.62-10.18q-16.1,0-25.62,10.18t-9.53,28.58V655H345.42V471.64h56.17V496a59.35,59.35,0,0,1,23-19.22q14.45-7.05,32.52-7.06Q489.3,469.67,508.52,490.53Z" />
            <path d="M807.12,646.08a84.15,84.15,0,0,1-33.84-32.85Q761,591.87,761,563.29q0-28.24,12.48-49.76a84.72,84.72,0,0,1,34.16-33Q829.3,469,856.23,469t48.62,11.5a84.65,84.65,0,0,1,34.16,33q12.5,21.51,12.49,49.76t-12.65,49.77a85.47,85.47,0,0,1-34.49,33q-21.86,11.5-48.78,11.5T807.12,646.08Zm75.88-49q11.34-11.82,11.34-33.84t-11-33.83a35.55,35.55,0,0,0-27.1-11.83q-16.43,0-27.26,11.66t-10.84,34q0,22,10.67,33.84A34.54,34.54,0,0,0,855.58,609,36.56,36.56,0,0,0,883,597.13Z" />
            <path d="M1053.33,478.38a63.59,63.59,0,0,1,32.85-8.71v59.46h-15.44q-21,0-31.53,9t-10.51,31.7V655H972.52V471.64h56.18v30.55A74.11,74.11,0,0,1,1053.33,478.38Z" />
          </svg>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) =>
            link.label === 'Work' ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={handleWorkEnter}
                onMouseLeave={handleWorkLeave}
              >
                <Link
                  to={link.href}
                  className="font-body text-sm uppercase tracking-[0.15em] text-content-secondary transition-colors duration-fast hover:text-accent"
                  data-hover
                >
                  {link.label}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {workDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 top-full mt-3 min-w-[200px] rounded-md border border-stroke-subtle/30 bg-surface/95 py-2 backdrop-blur-xl"
                    >
                      {projects.map((project) => (
                        <Link
                          key={project.slug}
                          to={`/project/${project.slug}`}
                          className="block px-5 py-2.5 font-body text-xs text-content-secondary transition-colors duration-fast hover:bg-content/5 hover:text-accent"
                          data-hover
                        >
                          {project.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="font-body text-sm uppercase tracking-[0.15em] text-content-secondary transition-colors duration-fast hover:text-accent"
                data-hover
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
          data-hover
        >
          <motion.span
            className="block h-[1px] w-5 bg-content"
            animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          />
          <motion.span
            className="block h-[1px] w-5 bg-content"
            animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          />
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-start justify-center bg-surface px-6 py-24"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="w-full"
              >
                {link.label === 'Work' ? (
                  <div>
                    <button
                      onClick={() => setMobileWorkOpen(!mobileWorkOpen)}
                      className="flex w-full items-center gap-3 font-display text-4xl text-content transition-colors duration-fast hover:text-accent"
                      data-hover
                    >
                      {link.label}
                      <motion.span
                        className="text-lg text-content-tertiary"
                        animate={{ rotate: mobileWorkOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        &#9662;
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {mobileWorkOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-2 pb-4 pl-4 pt-3">
                            {projects.map((project) => (
                              <Link
                                key={project.slug}
                                to={`/project/${project.slug}`}
                                className="font-body text-lg text-content-secondary transition-colors duration-fast hover:text-accent"
                                onClick={() => setMenuOpen(false)}
                                data-hover
                              >
                                {project.title}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    className="font-display text-4xl text-content transition-colors duration-fast hover:text-accent"
                    onClick={() => setMenuOpen(false)}
                    data-hover
                  >
                    {link.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
