import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import {
  FaFigma,
  FaRobot,
  FaCode,
  FaDatabase,
  FaStar,
  FaMapSigns,
  FaLaptopCode,
  FaLightbulb,
  FaMoon,
  FaSun,
} from 'react-icons/fa'
import { SiReact, SiTensorflow } from 'react-icons/si'
import portraitImage from './assets/potrait.jpg'

const experiences = [
  {
    title: 'UI/UX Developer — DevTech AI',
    year: '2025',
    type: 'ai',
    highlights: [
      'Designed UI flows and Figma components for AI applications',
      'Created wireframes and technical documentation',
      'Collaborated with developers in Agile SDLC',
    ],
  },
  {
    title: 'Community Organizer — Dotnet Learner House',
    year: '2025',
    type: 'community',
    highlights: [
      'Hosted workshops on AI and prompt engineering',
      'Organized technical meetups and learning sessions',
    ],
  },
  {
    title: 'Web Developer Intern — Cloudbox99',
    year: '2024',
    type: 'web',
    highlights: [
      'Built responsive websites using HTML, CSS, JavaScript',
      'Integrated APIs and dynamic data',
      'Worked directly with clients to improve product features',
    ],
  },
  
]

const projects = [
  {
    name: 'Shipment Sure — ML Prediction System',
    summary:
      'Machine learning system predicting shipment delays using Logistic Regression, Random Forest, and XGBoost with a Streamlit interface.',
    stack: ['Logistic Regression', 'Random Forest', 'XGBoost', 'Streamlit'],
    outcome: 'Improved shipment ETA accuracy and reduced manual tracking.',
    previewType: 'shipment',
  },
  {
    name: 'Multilingual Offensive Language Detection',
    summary: 'NLP system using transformer models for multilingual content moderation.',
    stack: ['Transformers', 'NLP', 'Moderation'],
    outcome: 'Flagged harmful content with higher recall across languages.',
    previewType: 'nlp',
  },
  {
    name: 'Weather Application',
    summary: 'React app using OpenWeather API for real-time weather updates.',
    stack: ['React', 'OpenWeather API', 'UI Motion'],
    outcome: 'Clearer weather insights with delightful micro-interactions.',
    previewType: 'weather',
  },
]

const FigmaPrototypes = [
  {
    title: 'MyOrigins Application',
    description:
      'A mobile application designed to help users explore their cultural heritage and historical origins through a structured and visually engaging interface. The design focuses on simplifying complex cultural data into intuitive navigation and interactive content cards, allowing users to discover their background in an accessible and engaging way.',
    focus: ['Mobile UX', 'Information hierarchy', 'Interactive UI components'],
    prototypeLabel: 'View Figma Prototype',
    prototype: 'https://www.figma.com/make/w3iRGAWfOIP1NV2SgIMkfB/MyOrigins-Family-Tree-App?t=bUUG3c42C1iEJoP2-6',
  },
  {
    title: 'Educational Website',
    description:
      'A responsive educational platform designed to organize learning resources, courses, and academic content into a clear and user-friendly structure. The interface prioritizes accessibility, simple navigation, and structured content layouts to help students easily explore and access educational material.',
    focus: ['Content organization', 'Responsive layout', 'Learning-focused UX'],
    prototypeLabel: 'View Figma Prototype',
    prototype: 'https://www.figma.com/proto/VftKwPLGOEm6bsu2aeoJUo?node-id=0-1&t=bUUG3c42C1iEJoP2-6',
  },
  {
    title: 'MyOrigins Website',
    description:
      'A product website designed to introduce and showcase the MyOrigins platform. The design focuses on storytelling, clear product communication, and engaging visual sections that guide users through the platform’s features and value.',
    focus: ['Product storytelling', 'Website UX', 'Conversion-oriented layout'],
    prototypeLabel: 'View Figma Prototype',
    prototype: 'https://www.figma.com/design/GxXo8ryxF2Cuh9XpnC3XR8/myorigins.ai?m=auto&t=bUUG3c42C1iEJoP2-6',
  },
  {
    title: 'Landing Page Design',
    description:
      'A modern landing page concept designed to communicate a product’s value clearly and encourage user engagement. The layout uses strong visual hierarchy, clear messaging, and structured sections to guide users through key product features.',
    focus: ['Conversion-focused design', 'Visual hierarchy', 'User engagement'],
    prototypeLabel: 'View Figma Prototype',
    prototype: 'https://www.figma.com/make/QM0HiRsD9wX1Mt324hwCFk/Design-Arogya360-Landing-Page?t=bUUG3c42C1iEJoP2-6',
  },
  {
    title: 'Login Page Designs',
    description:
      'A collection of authentication interface designs focused on creating smooth and frictionless login experiences. The designs emphasize simplicity, usability, and accessibility while maintaining clean visual layouts.',
    focus: ['Authentication UX', 'Form usability', 'Accessibility considerations'],
    prototypeLabel: 'View Figma Prototype',
    prototype: 'https://www.figma.com/proto/oZLOXPMJTGXmx5agzPTjpr?node-id=0-1&t=bUUG3c42C1iEJoP2-6',
  },
]

const skills = {
  design: ['Figma', 'UX Research', 'Wireframing', 'Prototyping', 'User Flows', 'Design Systems'],
  ai: ['Python', 'Machine Learning', 'NLP', 'Predictive Modeling', 'LLMs', 'RAG Systems'],
  dev: ['React', 'JavaScript', 'FastAPI', 'SQL', 'REST APIs', 'Docker', 'Git'],
}

const journeyStops = [
  'Learning UX',
  'First Web Projects',
  'Internship Experience',
  'AI & ML Development',
  'Design Case Studies',
]

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  const prefersDark =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}
function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [activeCase, setActiveCase] = useState(null)
  const [activeProject, setActiveProject] = useState(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const mapShift = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)
  const glowX = useSpring(cursorX, { stiffness: 180, damping: 25 })
  const glowY = useSpring(cursorY, { stiffness: 180, damping: 25 })
  const trailX = useSpring(cursorX, { stiffness: 70, damping: 18 })
  const trailY = useSpring(cursorY, { stiffness: 70, damping: 18 })
  const trailX2 = useSpring(cursorX, { stiffness: 40, damping: 16 })
  const trailY2 = useSpring(cursorY, { stiffness: 40, damping: 16 })
  const bgShift = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const autoScrollPauseUntil = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    window.localStorage.setItem('theme', theme)
  }, [theme])
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const sectionIds = ['top', 'about', 'experience', 'projects', 'figma', 'skills', 'journey', 'contact']
    const pauseAutoScroll = () => {
      autoScrollPauseUntil.current = Date.now() + 20000
    }
    const events = ['wheel', 'touchstart', 'keydown', 'mousedown']
    events.forEach((event) => window.addEventListener(event, pauseAutoScroll, { passive: true }))

    const getCurrentIndex = () => {
      const firstSection = document.getElementById(sectionIds[0])
      if (firstSection) {
        const firstTop = firstSection.getBoundingClientRect().top
        if (firstTop > window.innerHeight * 0.25) {
          return -1
        }
      }

      let bestIndex = 0
      let bestDistance = Number.POSITIVE_INFINITY
      sectionIds.forEach((id, index) => {
        const el = document.getElementById(id)
        if (!el) return
        const rect = el.getBoundingClientRect()
        const distance = Math.abs(rect.top)
        if (distance < bestDistance) {
          bestDistance = distance
          bestIndex = index
        }
      })
      return bestIndex
    }

    const interval = setInterval(() => {
      if (Date.now() < autoScrollPauseUntil.current) return
      const currentIndex = getCurrentIndex()
      const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % sectionIds.length
      const nextSection = document.getElementById(sectionIds[nextIndex])
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 8000)

    return () => {
      clearInterval(interval)
      events.forEach((event) => window.removeEventListener(event, pauseAutoScroll))
    }
  }, [])

  const handleMouseMove = (event) => {
    const size = 220
    cursorX.set(event.clientX - size / 2)
    cursorY.set(event.clientY - size / 2)
  }

  return (
    <div className="bg-theme text-theme" onMouseMove={handleMouseMove} onMouseLeave={() => { cursorX.set(-200); cursorY.set(-200) }}>
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(196, 181, 253, 0.18), transparent 40%), radial-gradient(circle at 80% 10%, rgba(158, 240, 213, 0.15), transparent 35%), radial-gradient(circle at 70% 80%, rgba(255, 180, 162, 0.18), transparent 45%)',
          backgroundPositionY: bgShift,
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-0">
        <FloatingBlob className="left-[6%] top-[12%] h-8 w-8 bg-blue/40 blur-lg" />
        <FloatingBlob className="left-[20%] top-[70%] h-10 w-10 bg-mint/40 blur-xl" delay={1} />
        <FloatingBlob className="right-[18%] top-[22%] h-12 w-12 bg-lavender/30 blur-xl" delay={2} />
        <FloatingBlob className="right-[8%] bottom-[18%] h-16 w-16 bg-coral/30 blur-2xl" delay={3} />
        <FloatingBlob className="left-[45%] bottom-[10%] h-10 w-10 bg-peach/30 blur-xl" delay={4} />
      </div>
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-lavender via-mint to-coral"
      />
      <button
        type="button"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed right-6 top-6 z-50 flex items-center gap-2 rounded-full border border-theme-10 bg-surface-10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-theme-subtle transition hover:-translate-y-0.5 hover:border-theme-20 hover:text-theme"
        aria-label="Toggle color theme"
      >
        {theme === 'dark' ? <FaSun className="text-mint text-sm" /> : <FaMoon className="text-blue text-sm" />}
        <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
      </button>
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none fixed left-0 top-0 z-40 h-56 w-56 rounded-full bg-gradient-to-r from-lavender/30 via-mint/20 to-coral/30 blur-3xl mix-blend-screen"
      />
      <motion.div
        style={{ x: trailX, y: trailY }}
        className="pointer-events-none fixed left-0 top-0 z-30 h-72 w-72 rounded-full bg-gradient-to-r from-blue/20 via-lavender/10 to-mint/20 blur-[90px] mix-blend-screen"
      />
      <motion.div
        style={{ x: trailX2, y: trailY2 }}
        className="pointer-events-none fixed left-0 top-0 z-20 h-96 w-96 rounded-full bg-gradient-to-r from-coral/15 via-peach/10 to-lavender/20 blur-[120px] mix-blend-screen"
      />

      <div className="relative z-10">
        <Hero scrollYProgress={scrollYProgress} />
        <About />
        <ExperienceTimeline />
        <Projects onOpen={setActiveProject} />
        <FigmaCaseStudies onOpen={setActiveCase} />
        <Skills />
        <JourneyMap mapShift={mapShift} />
        <Contact />
      </div>

      {activeCase && (
        <CaseStudyModal study={activeCase} onClose={() => setActiveCase(null)} />
      )}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </div>
  )
}

function Hero({ scrollYProgress }) {
  const slowY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const fastY = useTransform(scrollYProgress, [0, 1], [0, -160])
  return (
    <motion.section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-7 py-24 sm:px-12 snap-section layered-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="absolute inset-0">
        <motion.div style={{ y: slowY }} className="absolute left-[10%] top-[18%] h-36 w-36 animate-float rounded-full bg-lavender/30 blur-2xl" />
        <motion.div style={{ y: fastY }} className="absolute right-[12%] top-[22%] h-24 w-24 animate-floatSlow rounded-full bg-mint/30 blur-2xl" />
        <motion.div style={{ y: slowY }} className="absolute bottom-[18%] left-[35%] h-28 w-28 animate-float rounded-full bg-coral/30 blur-2xl" />
        <motion.div style={{ y: fastY }} className="absolute right-[28%] bottom-[20%] h-16 w-16 animate-floatSlow rounded-lg bg-blue/40" />
        <FloatingBlob className="left-[6%] top-[60%] h-14 w-14 bg-peach/40 blur-xl" />
        <FloatingBlob className="right-[8%] top-[40%] h-20 w-20 bg-lavender/40 blur-2xl" delay={1} />
        <FloatingBlob className="left-[40%] top-[8%] h-10 w-10 bg-mint/40 blur-xl" delay={2} />
        <motion.div
          className="absolute left-[-20%] top-[30%] h-1 w-40 rounded-full bg-gradient-to-r from-transparent via-lavender/80 to-transparent"
          animate={{ x: ['-20%', '140%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="layered-content relative z-10 mx-auto grid w-full max-w-4xl grid-cols-1 items-center gap-12">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-theme-subtle">
            Sanskriti Sonee · Hyderabad, India
          </p>
          <h1 className="text-4xl font-display font-semibold sm:text-5xl lg:text-6xl">
            Designing intelligent digital experiences that combine human-centered design with AI innovation.
          </h1>
          <p className="text-lg text-theme-muted">
            UI/UX Designer · Web Developer · AI/ML Enthusiast
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.a
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="glow-button bg-gradient-to-r from-lavender to-blue text-base shadow-glow"
              href="#projects"
            >
              View Projects
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="glow-button border border-theme-20 text-theme hover:border-lavender/60"
              href="https://drive.google.com/file/d/1X2KFlGXe1aKb8fhccJtHpsgEakCIAlp1/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              Resume
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="glow-button border border-theme-20 text-theme hover:border-mint/60"
              href="#contact"
            >
              Contact
            </motion.a>
          </div>
          <motion.div
            className="relative mt-6 h-28 w-60 overflow-hidden rounded-2xl border border-theme-10 bg-surface"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="absolute -left-6 -top-6 h-20 w-20 rounded-full bg-lavender/30 blur-2xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute right-4 top-4 h-3 w-24 rounded-full bg-mint/60"
              animate={{ scaleX: [0.3, 1, 0.4] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute left-4 bottom-4 h-10 w-20 rounded-xl bg-blue/30"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            
          </motion.div>
        </div>

      </div>
    </motion.section>
  )
}

function About() {
  return (
    <motion.section
      id="about"
      className="relative px-7 py-24 sm:px-12 snap-section min-h-screen layered-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="pointer-events-none absolute inset-0">
        <FloatingBlob className="left-[14%] top-[20%] h-16 w-16 bg-blue/20 blur-2xl" delay={1} />
        <FloatingBlob className="right-[10%] bottom-[20%] h-20 w-20 bg-peach/20 blur-2xl" delay={2} />
      </div>
      <div className="layered-content mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-card relative grid min-h-[420px] place-items-center overflow-visible p-10">
          <div className="absolute -top-10 left-10 rounded-full bg-mint px-4 py-1 text-xs font-semibold text-[#0F0F12]">
            About Me
          </div>
          <div className="relative h-80 w-64 overflow-hidden rounded-[40px] bg-well">
            <img
              src={portraitImage}
              alt="Portrait of Sanskriti Sonee"
              className="h-full w-full object-cover"
            />
            <motion.div
              className="absolute inset-0 rounded-[40px] border border-theme-20"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-lavender/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-mint/40"
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute right-4 top-6 h-10 w-20 rounded-full bg-blue/30"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute left-4 bottom-6 h-3 w-24 rounded-full bg-mint/40"
              animate={{ scaleX: [0.4, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <FloatingIcon className="-left-4 top-8" icon={<FaFigma />} tone="text-lavender" />
          <FloatingIcon className="right-0 top-14" icon={<FaRobot />} tone="text-mint" />
          <FloatingIcon className="left-6 bottom-4" icon={<FaCode />} tone="text-coral" />
          <FloatingIcon className="right-6 bottom-8" icon={<FaDatabase />} tone="text-blue" />
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-display font-semibold">AI meets human-centered product design.</h2>
          <p className="text-base text-theme-muted">
            I am an AI & Data Science undergraduate passionate about building intelligent products that
            combine design, data, and technology. I enjoy translating complex ideas into intuitive interfaces
            while developing scalable backend and AI-driven solutions.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <HighlightCard icon={<FaFigma />} title="UX Design" color="lavender" />
            <HighlightCard icon={<FaLaptopCode />} title="Web Development" color="mint" />
            <HighlightCard icon={<FaRobot />} title="AI & Machine Learning" color="coral" />
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function ExperienceTimeline() {
  return (
    <motion.section
      id="experience"
      className="px-7 py-24 sm:px-12 snap-section min-h-screen layered-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="layered-content mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-display font-semibold">Experience Timeline</h2>
          <FaMapSigns className="text-lavender text-4xl" />
        </div>

        <div className="relative space-y-8 border-l border-theme-10 pl-8">
          {experiences.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{
                y: -10,
                boxShadow: '0 0 35px rgba(196, 181, 253, 0.35)',
                borderColor: 'rgba(196, 181, 253, 0.6)',
              }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card relative min-h-[220px] p-6 border border-theme-10"
            >
              <ExperienceBadge type={item.type} />
              <span className="absolute -left-[52px] top-6 flex h-12 w-12 items-center justify-center rounded-full bg-lavender/90 text-[11px] font-semibold text-[#0F0F12] shadow-glow">
                {item.year}
              </span>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-theme-muted">
                {item.highlights.map((text) => (
                  <li key={text}>• {text}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function Projects({ onOpen }) {
  return (
    <motion.section
      id="projects"
      className="relative px-7 py-24 sm:px-12 snap-section min-h-screen layered-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="pointer-events-none absolute inset-0">
        <FloatingBlob className="left-[12%] top-[10%] h-16 w-16 bg-mint/30 blur-2xl" delay={1} />
        <FloatingBlob className="right-[14%] bottom-[20%] h-24 w-24 bg-coral/30 blur-2xl" delay={2} />
        <FloatingBlob className="left-[50%] bottom-[10%] h-12 w-12 bg-blue/30 blur-xl" delay={3} />
      </div>
      <div className="layered-content mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-display font-semibold">Projects</h2>
          <FaLightbulb className="text-mint text-4xl" />
        </div>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {projects.map((project) => (
            <SwiperSlide key={project.name} className="h-full">
              <motion.div
                className="group glass-card flex h-full min-h-[520px] flex-col p-6"
                whileHover={{ y: -10, boxShadow: '0 0 40px rgba(159, 216, 255, 0.25)' }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              >
                <div className="relative h-40 rounded-2xl bg-well overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl border border-theme-10" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-lavender/60 via-mint/20 to-coral/40 opacity-0 transition group-hover:opacity-100" />
                  <ProjectPreview type={project.previewType} />
                  <motion.div
                    className="absolute -right-4 bottom-6 h-16 w-16 rounded-full bg-blue/40 blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <ProjectContextBadge type={project.previewType} />
                </div>
                <p className="mt-2 min-h-[64px] text-sm text-theme-muted">{project.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((item, index) => (
                    <motion.span
                      key={item}
                      className="rounded-full border border-theme-10 bg-surface px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-theme-muted"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, delay: index * 0.2, ease: 'easeInOut' }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
                <button
                  className="mt-auto inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-lavender"
                  onClick={() => onOpen(project)}
                >
                  
                </button>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  )
}

function FigmaCaseStudies({ onOpen }) {
  return (
    <motion.section
      id="figma"
      className="relative px-7 py-24 sm:px-12 snap-section min-h-screen layered-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="pointer-events-none absolute inset-0">
        <FloatingBlob className="left-[8%] top-[20%] h-20 w-20 bg-lavender/30 blur-2xl" delay={1} />
        <FloatingBlob className="right-[10%] top-[10%] h-14 w-14 bg-mint/30 blur-xl" delay={2} />
        <FloatingBlob className="right-[18%] bottom-[18%] h-24 w-24 bg-coral/20 blur-2xl" delay={3} />
      </div>
      <div className="layered-content mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-display font-semibold">Figma Prototypes</h2>
          <div className="flex items-center gap-2 text-lavender">
            <FaFigma />
            <span className="text-sm uppercase tracking-[0.3em]">Figma Focus</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {FigmaPrototypes.map((study) => (
            <motion.div
              key={study.title}
              className="group glass-card flex min-h-[460px] flex-col p-6"
              whileHover={{ y: -8, boxShadow: '0 0 40px rgba(196, 181, 253, 0.35)' }}
              transition={{ type: 'spring', stiffness: 200, damping: 14 }}
            >
              <div className="relative h-44 overflow-hidden rounded-2xl bg-well">
                <div className="absolute inset-0 border border-theme-10" />
                <div className="absolute inset-0 translate-y-3 bg-gradient-to-br from-lavender/40 via-blue/30 to-coral/40 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100" />
                <div className="absolute left-4 top-4 text-xs uppercase tracking-[0.3em] text-theme-subtle">
                </div>
                <motion.div
                  className="absolute right-3 top-6 h-10 w-10 rounded-full bg-mint/40 blur-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <StudyPreview title={study.title} />
                <motion.div
                  className="absolute left-4 bottom-4 h-8 w-24 rounded-full bg-surface-10"
                  animate={{ scaleX: [0.4, 1, 0.5] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute right-6 bottom-6 h-3 w-12 rounded-full bg-lavender/50"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{study.title}</h3>
              <p className="mt-3 min-h-[96px] text-sm text-theme-muted">{study.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {study.focus.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-theme-10 bg-surface px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-theme-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <a
                className="mt-auto inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-mint"
                href={study.prototype}
                target="_blank"
                rel="noreferrer"
                onClick={() => onOpen(study)}
              >
                {study.prototypeLabel}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function Skills() {
  return (
    <motion.section
      id="skills"
      className="relative px-7 py-24 sm:px-12 snap-section min-h-screen layered-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="pointer-events-none absolute inset-0">
        <FloatingBlob className="left-[6%] bottom-[18%] h-16 w-16 bg-lavender/20 blur-2xl" delay={1} />
        <FloatingBlob className="right-[12%] top-[15%] h-20 w-20 bg-mint/20 blur-2xl" delay={2} />
      </div>
      <div className="layered-content mx-auto max-w-6xl space-y-10">
        <h2 className="text-3xl font-display font-semibold">Skillset</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <SkillCard title="UI/UX Design " items={skills.design} icon={<FaFigma />} accent="lavender" />
          <SkillCard title="AI / ML Engineering " items={skills.ai} icon={<SiTensorflow />} accent="mint" />
          <SkillCard title="Development " items={skills.dev} icon={<SiReact />} accent="coral" />
        </div>
      </div>
    </motion.section>
  )
}

function JourneyMap({ mapShift }) {
  return (
    <motion.section
      id="journey"
      className="relative px-7 py-24 sm:px-12 snap-section min-h-screen layered-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="layered-content mx-auto max-w-6xl">
        <h2 className="mb-8 text-3xl font-display font-semibold">Design Journey Map</h2>
        <div className="glass-card relative overflow-hidden p-10">
          <div className="pointer-events-none absolute inset-0">
            <FloatingBlob className="left-[8%] top-[10%] h-16 w-16 bg-lavender/20 blur-2xl" delay={1} />
            <FloatingBlob className="right-[18%] bottom-[12%] h-20 w-20 bg-coral/20 blur-2xl" delay={2} />
          </div>
          <div className="hidden md:block">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-40">
              <motion.path
                d="M20 120 C 220 40, 420 220, 620 140 S 980 260, 1180 80"
                fill="none"
                stroke="url(#journeyGradient)"
                strokeWidth="6"
                strokeDasharray="12 12"
                animate={{ strokeDashoffset: [0, -200] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
              <defs>
                <linearGradient id="journeyGradient" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#C4B5FD" />
                  <stop offset="50%" stopColor="#9EF0D5" />
                  <stop offset="100%" stopColor="#FFB4A2" />
                </linearGradient>
              </defs>
            </svg>
            <motion.div style={{ x: mapShift }} className="relative h-72">
              <div className="absolute left-6 top-10 h-1 w-[120%] bg-gradient-to-r from-lavender via-mint to-coral" />
              {journeyStops.map((stop, index) => (
                <motion.div
                  key={stop}
                  className="group absolute top-6 flex flex-col items-center"
                  style={{ left: `${10 + index * 18}%` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-lavender shadow-glow">
                    {index % 2 === 0 ? <FaStar /> : <FaMapSigns />}
                  </div>
                  <p className="mt-3 text-xs text-theme-muted">{stop}</p>
                  <span className="pointer-events-none absolute -top-10 scale-95 rounded-full bg-surface-10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-theme-muted opacity-0 transition group-hover:opacity-100 group-hover:scale-100">
                    checkpoint
                  </span>
                </motion.div>
              ))}
            </motion.div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-surface p-4 text-sm text-theme-muted">
                Scroll to explore each milestone as the path moves.
              </div>
              <div className="rounded-2xl bg-surface p-4 text-sm text-theme-muted">
                Each checkpoint unlocks a story about design, AI, and growth.
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <Swiper
              spaceBetween={14}
              slidesPerView={1.1}
              centeredSlides
            >
              {journeyStops.map((stop, index) => (
                <SwiperSlide key={stop}>
                  <motion.div
                    className="flex h-full min-h-[140px] items-center gap-4 rounded-2xl border border-theme-10 bg-surface p-4"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-lavender shadow-glow">
                      {index % 2 === 0 ? <FaStar /> : <FaMapSigns />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{stop}</p>
                      <p className="text-xs text-theme-subtle">Checkpoint</p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="mt-4 rounded-2xl bg-surface p-4 text-sm text-theme-muted">
              Swipe through the journey and explore each milestone.
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: '',
  })
  const [submitStatus, setSubmitStatus] = useState('idle')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitStatus('loading')
    try {
      const payload = new FormData()
      payload.append('name', formData.name)
      payload.append('email', formData.email)
      payload.append('_replyto', formData.email)
      payload.append('project', formData.project)
      payload.append('message', formData.message)
      payload.append('_subject', `New portfolio inquiry from ${formData.name || 'Sanskriti'}`)

      const response = await fetch('https://formspree.io/f/xpqjvyye', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload,
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data?.error || 'Form submission failed')
      }
      setSubmitStatus('success')
      setFormData({ name: '', email: '', project: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    }
  }

  return (
    <motion.section
      id="contact"
      className="relative px-7 pb-28 pt-24 sm:px-12 snap-section min-h-screen layered-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="pointer-events-none absolute inset-0">
        <FloatingBlob className="left-[12%] top-[25%] h-16 w-16 bg-lavender/20 blur-2xl" delay={1} />
        <FloatingBlob className="right-[16%] bottom-[20%] h-20 w-20 bg-mint/20 blur-2xl" delay={2} />
      </div>
      <div className="layered-content mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[28px] border border-theme-10 bg-well">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(255,180,162,0.15),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(196,181,253,0.18),transparent_45%)]" />
          <div className="relative grid gap-10 p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-surface-10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-theme-muted">
                Let’s Talk
              </div>
              <h2 className="text-3xl font-display font-semibold">Let’s build something unforgettable.</h2>
              <p className="text-sm text-theme-muted">
                Share your idea and I’ll respond with a clear plan, timeline, and next steps.
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    className="w-full rounded-2xl border border-theme-10 bg-surface px-4 py-3 text-sm text-theme outline-none transition focus:border-lavender/60 focus:ring-2 focus:ring-lavender/20"
                    placeholder="Your name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="w-full rounded-2xl border border-theme-10 bg-surface px-4 py-3 text-sm text-theme outline-none transition focus:border-mint/60 focus:ring-2 focus:ring-mint/20"
                    placeholder="Your email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <input
                  className="w-full rounded-2xl border border-theme-10 bg-surface px-4 py-3 text-sm text-theme outline-none transition focus:border-blue/60 focus:ring-2 focus:ring-blue/20"
                  placeholder="Project type"
                  type="text"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                />
                <textarea
                  className="min-h-[120px] w-full rounded-2xl border border-theme-10 bg-surface px-4 py-3 text-sm text-theme outline-none transition focus:border-coral/60 focus:ring-2 focus:ring-coral/20"
                  placeholder="Tell me about your project..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <div className="flex flex-wrap items-center gap-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: submitStatus === 'loading' ? 1 : 1.05, y: submitStatus === 'loading' ? 0 : -2 }}
                    whileTap={{ scale: submitStatus === 'loading' ? 1 : 0.97 }}
                    className="glow-button bg-gradient-to-r from-lavender to-blue text-base shadow-glow disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={submitStatus === 'loading'}
                  >
                    {submitStatus === 'loading' ? 'Sending...' : 'Send Message'}
                  </motion.button>
                  <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em] text-theme-subtle">
                    <a href="mailto:soneesanskriti@gmail.com" className="hover:text-theme">
                      Email
                    </a>
                    <a href="https://www.linkedin.com/in/sanskriti-sonee" target="_blank" rel="noreferrer" className="hover:text-theme">
                      LinkedIn
                    </a>
                    <a href="https://github.com/sanskritisonee" target="_blank" rel="noreferrer" className="hover:text-theme">
                      GitHub
                    </a>
                  </div>
                </div>
                {submitStatus === 'success' && (
                  <p className="text-sm text-mint">Thanks! Your message has been sent.</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-sm text-coral">Something went wrong. Please try again.</p>
                )}
              </form>
            </div>
            <div className="relative flex items-center justify-center">
              <motion.div
                className="absolute right-2 top-6 h-36 w-36 rounded-full bg-mint/30 blur-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute bottom-8 left-6 h-20 w-20 rounded-full bg-coral/30 blur-2xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative h-64 w-52 overflow-hidden rounded-[36px] border border-theme-15 bg-gradient-to-b from-[var(--app-surface-10)] to-[var(--app-surface-5)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.2),transparent_50%)]" />
                <motion.div
                  className="absolute inset-x-8 bottom-10 h-40 rounded-[24px] bg-well"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute left-8 bottom-6 h-4 w-20 rounded-full bg-lavender/60"
                  animate={{ scaleX: [0.4, 1, 0.6] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="absolute left-1/2 top-8 h-10 w-10 -translate-x-1/2 rounded-full bg-peach/70" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function HighlightCard({ icon, title, color }) {
  const colorMap = {
    lavender: 'bg-lavender/20 text-lavender',
    mint: 'bg-mint/20 text-mint',
    coral: 'bg-coral/20 text-coral',
  }

  return (
    <div className="glass-card flex flex-col gap-3 p-4">
      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${colorMap[color]}`}>
        {icon}
      </div>
      <p className="text-sm font-semibold">{title}</p>
    </div>
  )
}

function SkillCard({ title, items, icon, accent }) {
  const accentMap = {
    lavender: 'text-lavender',
    mint: 'text-mint',
    coral: 'text-coral',
  }
  const glowMap = {
    lavender: '0 0 30px rgba(196, 181, 253, 0.45)',
    mint: '0 0 30px rgba(158, 240, 213, 0.45)',
    coral: '0 0 30px rgba(255, 180, 162, 0.45)',
  }

  return (
    <motion.div
      className="glass-card p-6"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ y: -10, boxShadow: glowMap[accent] }}
    >
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-surface-10 ${accentMap[accent]}`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item, index) => (
          <motion.span
            key={item}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: index * 0.2, ease: 'easeInOut' }}
            className="rounded-full border border-theme-10 bg-surface px-3 py-1 text-xs uppercase tracking-[0.2em] text-theme-muted transition hover:-translate-y-1 hover:border-theme-30 hover:bg-surface-10 hover:text-theme"
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

function FloatingIcon({ icon, className, tone = 'text-lavender' }) {
  return (
    <motion.div
      className={`absolute flex h-10 w-10 items-center justify-center rounded-full bg-card/80 shadow-glow ${tone} ${className}`}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {icon}
    </motion.div>
  )
}

function FloatingBlob({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
      transition={{ duration: 7, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}

function ExperienceBadge({ type }) {
  const config = {
    ai: { icon: <FaRobot />, tone: 'text-lavender', bar: 'bg-lavender/40', label: 'AI' },
    web: { icon: <FaCode />, tone: 'text-mint', bar: 'bg-mint/40', label: 'Web' },
    community: { icon: <FaStar />, tone: 'text-coral', bar: 'bg-coral/40', label: 'Community' },
  }
  const current = config[type] || config.ai

  return (
    <div className="absolute right-5 top-5 flex items-center gap-3">
      <motion.div
        className={`flex h-10 w-10 items-center justify-center rounded-full bg-surface-10 ${current.tone}`}
        animate={{ boxShadow: ['0 0 0 rgba(255,255,255,0)', '0 0 18px rgba(196,181,253,0.45)', '0 0 0 rgba(255,255,255,0)'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {current.icon}
      </motion.div>
      <div className="hidden flex-col gap-1 sm:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-theme-subtle">{current.label}</span>
        <motion.div
          className={`h-2 w-16 rounded-full ${current.bar}`}
          animate={{ scaleX: [0.3, 1, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}

function ProjectContextBadge({ type }) {
  const map = {
    shipment: { label: 'ETA', tone: 'text-mint', bar: 'bg-mint/40' },
    nlp: { label: 'NLP', tone: 'text-coral', bar: 'bg-coral/40' },
    weather: { label: 'LIVE', tone: 'text-blue', bar: 'bg-blue/40' },
  }
  const current = map[type] || map.shipment

  return (
    <div className="flex items-center gap-2">
      <motion.span
        className={`text-[10px] uppercase tracking-[0.3em] ${current.tone}`}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {current.label}
      </motion.span>
      <motion.span
        className={`h-2 w-10 rounded-full ${current.bar}`}
        animate={{ scaleX: [0.3, 1, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function StudyPreview({ title }) {
  const key = title.toLowerCase()

  if (key.includes('application')) {
    return (
      <>
        <motion.div
          className="absolute left-6 top-10 h-12 w-20 rounded-2xl bg-mint/20"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-6 bottom-8 h-3 w-20 rounded-full bg-lavender/50"
          animate={{ scaleX: [0.4, 1, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-6 bottom-6 rounded-full bg-surface-10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-theme-muted"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          Heritage
        </motion.div>
      </>
    )
  }

  if (key.includes('educational')) {
    return (
      <>
        <motion.div
          className="absolute left-6 top-10 h-12 w-16 rounded-2xl bg-blue/25"
          animate={{ rotate: [0, 6, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-6 top-12 h-3 w-20 rounded-full bg-mint/40"
          animate={{ scaleX: [0.3, 1, 0.4] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-6 bottom-6 rounded-full bg-surface-10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-theme-muted"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          Course Flow
        </motion.div>
      </>
    )
  }

  if (key.includes('website') && key.includes('myorigins')) {
    return (
      <>
        <motion.div
          className="absolute right-6 top-10 h-12 w-20 rounded-2xl bg-coral/25"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-6 bottom-8 h-3 w-24 rounded-full bg-blue/40"
          animate={{ scaleX: [0.4, 1, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-6 top-6 rounded-full bg-surface-10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-theme-muted"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          Story
        </motion.div>
      </>
    )
  }

  if (key.includes('landing')) {
    return (
      <>
        <motion.div
          className="absolute left-6 top-12 h-10 w-24 rounded-2xl bg-peach/30"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-6 bottom-8 h-3 w-16 rounded-full bg-lavender/50"
          animate={{ scaleX: [0.4, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-6 bottom-6 rounded-full bg-surface-10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-theme-muted"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          CTA
        </motion.div>
      </>
    )
  }

  return (
    <>
      <motion.div
        className="absolute left-6 top-10 h-12 w-16 rounded-2xl bg-mint/20"
        animate={{ rotate: [0, 6, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-6 top-12 h-3 w-20 rounded-full bg-lavender/40"
        animate={{ scaleX: [0.3, 1, 0.4] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-6 bottom-6 rounded-full bg-surface-10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-theme-muted"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        Login UI
      </motion.div>
    </>
  )
}

function CaseStudyModal({ study, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-card relative w-full max-w-2xl p-8"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <button
          className="absolute right-6 top-6 rounded-full border border-theme-10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-theme-muted"
          onClick={onClose}
        >
          Close
        </button>
        <h3 className="text-2xl font-display font-semibold">{study.title}</h3>
        <p className="mt-4 text-sm text-theme-muted">{study.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {study.focus.map((item) => (
            <span
              key={item}
              className="rounded-full border border-theme-10 bg-surface px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-theme-muted"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-surface p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-theme-subtle">Figma Preview</p>
            <div className="mt-4 h-28 rounded-xl bg-gradient-to-br from-lavender/40 via-blue/30 to-coral/40" />
          </div>
          <div className="rounded-2xl bg-surface p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-theme-subtle">Prototype Flow</p>
            <div className="mt-4 h-28 rounded-xl bg-gradient-to-br from-mint/40 via-lavender/30 to-blue/40" />
          </div>
        </div>
        <a
          className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-mint"
          href={study.prototype}
          target="_blank"
          rel="noreferrer"
        >
          {study.prototypeLabel}
        </a>
      </motion.div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-card relative w-full max-w-2xl p-8"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <button
          className="absolute right-6 top-6 rounded-full border border-theme-10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-theme-muted"
          onClick={onClose}
        >
          Close
        </button>
        <h3 className="text-2xl font-display font-semibold">{project.name}</h3>
        <p className="mt-4 text-sm text-theme-muted">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-theme-10 bg-surface px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-theme-muted"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-6 rounded-2xl bg-surface p-4 text-sm text-theme-muted">
          Outcome: {project.outcome}
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectPreview({ type }) {
  if (type === 'shipment') {
    return (
      <>
        <motion.div
          className="absolute right-4 top-10 h-10 w-16 rounded-xl bg-mint/20"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-4 top-8 h-2 w-24 rounded-full bg-blue/40"
          animate={{ scaleX: [0.3, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-6 bottom-6 h-3 w-24 rounded-full bg-lavender/40"
          animate={{ scaleX: [0.4, 1, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-4 bottom-10 flex items-center gap-2 rounded-full bg-surface-10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-theme-muted"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          ETA Forecast
        </motion.div>
      </>
    )
  }

  if (type === 'nlp') {
    return (
      <>
        <motion.div
          className="absolute left-4 top-12 h-14 w-14 rounded-2xl bg-coral/20"
          animate={{ rotate: [0, 6, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-6 top-8 h-2 w-16 rounded-full bg-mint/40"
          animate={{ scaleX: [0.2, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-6 top-10 h-3 w-20 rounded-full bg-blue/40"
          animate={{ scaleX: [0.3, 1, 0.4] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-6 bottom-6 rounded-full bg-surface-10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-theme-muted"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          NLP Signal
        </motion.div>
      </>
    )
  }

  return (
    <>
      <motion.div
        className="absolute left-6 top-8 h-16 w-16 rounded-full bg-blue/30"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-6 top-14 h-2 w-20 rounded-full bg-mint/40"
        animate={{ scaleX: [0.3, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-6 bottom-8 h-10 w-24 rounded-2xl bg-mint/20"
        animate={{ x: [0, -8, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-6 bottom-6 rounded-full bg-surface-10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-theme-muted"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        Live Forecast
      </motion.div>
    </>
  )
}
export default App





