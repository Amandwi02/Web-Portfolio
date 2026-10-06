import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei'
import * as THREE from 'three'

const EMAIL = 'amandwi91@gmail.com'
const FORM_URL = 'https://formspree.io/f/YOUR_FORM_ID' // replace after creating a free Formspree form

/* ---------- 3D scene ---------- */
function Particles({ r, n, size, color, speed }) {
  const ref = useRef()
  const arr = useMemo(() => {
    const a = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const t = Math.random() * Math.PI * 2, d = r + (Math.random() - 0.5) * 0.7
      a.set([Math.cos(t) * d, (Math.random() - 0.5) * 0.5, Math.sin(t) * d], i * 3)
    }
    return a
  }, [r, n])
  useFrame((_, dt) => { ref.current.rotation.y += dt * speed })
  return (
    <points ref={ref} rotation={[0.5, 0, 0.2]}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={n} array={arr} itemSize={3} /></bufferGeometry>
      <pointsMaterial size={size} color={color} transparent opacity={0.85} sizeAttenuation />
    </points>
  )
}

function Orb() {
  const g = useRef()
  const { viewport } = useThree()
  const wide = viewport.width > 7
  useFrame(({ pointer, clock }) => {
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, pointer.x * 0.6 + clock.elapsedTime * 0.12, 0.05)
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -pointer.y * 0.4, 0.05)
  })
  return (
    <group ref={g} position={[wide ? 2.8 : 0, wide ? 0 : 1.5, 0]} scale={wide ? 1 : 0.62}>
      <Float speed={2} floatIntensity={1.2}>
        <mesh>
          <icosahedronGeometry args={[1.4, 24]} />
          <MeshDistortMaterial color="#6d5dfc" emissive="#0b1d5c" roughness={0.15} metalness={0.8} distort={0.45} speed={2} />
        </mesh>
        <mesh scale={1.6}>
          <icosahedronGeometry args={[1.4, 2]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.22} />
        </mesh>
      </Float>
      <Particles r={2.7} n={900} size={0.035} color="#22d3ee" speed={0.25} />
      <Particles r={3.5} n={600} size={0.025} color="#a78bfa" speed={-0.15} />
    </group>
  )
}

function Scene() {
  return (
    <div id="bg">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 55 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={80} color="#22d3ee" />
        <pointLight position={[-5, -3, 2]} intensity={70} color="#8b5cf6" />
        <Stars radius={80} depth={40} count={2500} factor={3} fade speed={1} />
        <Orb />
      </Canvas>
    </div>
  )
}

/* ---------- content (employer & school names intentionally omitted) ---------- */
const stats = [['6+', 'Years experience'], ['1000+', 'Websites maintained'], ['8+', 'AI / LLM builds'], ['3', 'Cloud & hosting stacks']]

const focus = [
  ['AI & LLM Integration', 'Chatbot ingestion pipelines on serverless APIs and a custom MCP server giving Claude gated access to web content.'],
  ['IT Consulting', 'Translating business goals into architecture: system design, stakeholder communication and delivery management.'],
  ['Full-Stack Engineering', 'WordPress/PHP, Shopify, OpenCart, JavaScript, Python, Java, SQL & NoSQL — from plan to deployment.'],
  ['Automation & Reliability', 'Log-driven root-cause analysis, SSL automation (ACME/EAB), caching, rate-limit and sync debugging.'],
]

const projects = [
  ['Web-to-Chatbot Ingestion Plugin', 'WordPress plugin that pushes site content to a serverless chatbot API (8 iterations) for retrieval-ready knowledge.', ['AI/LLM', 'Cloud Run', 'PHP']],
  ['Custom MCP Server', 'Exposes web content to Claude through the Model Context Protocol with gated, permissioned access.', ['MCP', 'Claude', 'Node']],
  ['Checkout API Reverse Engineering', 'Decoded an undocumented checkout API with proxy logging and HAR analysis to design a product/order sync architecture.', ['API', 'HAR', 'Architecture']],
  ['GA4 Bot-Traffic Defence', 'Server-side tagging and event-filtering rules that sharply cut spam and false traffic.', ['Analytics', 'GA4', 'sGTM']],
  ['AI Restaurant Platform', 'AI-enabled restaurant site and Shopify POS-style storefront with automation-first UX.', ['Shopify', 'AI', 'UX']],
  ['Booking & Listing Platforms', 'Homestay booking, property listings with SEO, healthcare management and custom payment gateways.', ['PHP', 'MySQL', 'SEO']],
  ['Flutter LMS App', 'Mobile LMS for schools: attendance, fee management, document uploads and learning modules.', ['Flutter', 'Mobile']],
  ['Emotion Analyzer (CNN + NLP)', 'Classifies text into emotion categories with deep learning and NLP.', ['Python', 'CNN', 'NLP'], 'https://github.com/Amandwi02/emotion-analyzer-cnn-nlp'],
  ['Leaf Disease Detection', 'CNN model to detect plant leaf diseases with augmentation pipelines (ongoing).', ['Deep Learning', 'Vision'], 'https://github.com/Amandwi02/Leaf-Disease-Detection'],
  ['COVID-19 X-ray Analysis', 'Dataset preparation, cleaning and visualisation for CNN classification.', ['Python', 'Data'], 'https://github.com/Amandwi02/COVID-19-X-ray-Classification-Project'],
]

const timeline = [
  ['Oct 2025 — Present', 'Senior Software Development Engineer · R&D', 'LLM integrations, MCP, API reverse engineering, GA4 hardening, SSL automation and production debugging across multiple servers.'],
  ['Nov 2022 — Oct 2025', 'Web Developer · US Digital Agency', 'Maintained 1000+ client sites: security, performance, ADA & SEO; Cloudflare/AWS deployments; custom tools; AI chatbots; GTM & Meta Pixel.'],
  ['Aug 2022 — Nov 2022', 'Senior Web Developer', 'Led intern developers, delivered full-cycle builds, custom payment gateways and server management.'],
  ['Jun 2020 — Jul 2022', 'Technical Solution Engineer · Contract', 'Portals, SQL/NoSQL data systems and a custom financial transaction platform for a rural-development network.'],
]

const skills = {
  'AI & ML': ['LLM Integration', 'MCP', 'NLP', 'OpenCV', 'CNN / Deep Learning'],
  'Languages': ['Python', 'JavaScript', 'Java', 'C / C++', 'PHP', 'Shell'],
  'Web & Platforms': ['React', 'Node.js', 'WordPress', 'Shopify', 'OpenCart', 'Flutter'],
  'Data & Cloud': ['MySQL', 'NoSQL', 'GCP Cloud Run', 'Cloudflare', 'AWS', 'Linux'],
  'Consulting': ['System Design', 'Project Management', 'Stakeholder Comms', 'SEO / Analytics', 'Automation'],
}

const awards = [
  ['1st Prize', 'Hackathon — TechSangram 2021'],
  ['Best Speaker Award', 'Honoured by the Education Minister, Govt. of India'],
  ['Shining Star Award', 'Engineering excellence, 2024'],
  ['Performer of the Year', '2021'],
  ['Member', 'American Society of Mechanical Engineers (ASME)'],
]

/* ---------- ui ---------- */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.12 })
    document.querySelectorAll('.rv').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const Title = ({ k, t }) => (<div className="rv"><span className="kicker">{k}</span><h2>{t}</h2></div>)

function Contact() {
  const [s, setS] = useState('')
  const send = async e => {
    e.preventDefault(); const f = e.target; setS('Sending…')
    try {
      const r = await fetch(FORM_URL, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(f) })
      if (r.ok) { setS('Message sent ✓'); f.reset() } else setS('Could not send — please email me directly.')
    } catch { setS('Could not send — please email me directly.') }
  }
  return (
    <form className="glass form" onSubmit={send}>
      <input name="name" placeholder="Your name" required />
      <input name="email" type="email" placeholder="Your email" required />
      <textarea name="message" rows="5" placeholder="How can I help?" required />
      <button className="btn primary" type="submit">Send message</button>
      {s && <small>{s}</small>}
    </form>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <Scene />
      <nav>
        <a href="#top" className="brand">AD<span>.</span>ai</a>
        <div className="links">{['about', 'projects', 'experience', 'skills', 'contact'].map(l => <a key={l} href={'#' + l}>{l}</a>)}</div>
        <a className="btn mini" href="#contact">Hire me</a>
      </nav>
      <main>
        <header id="top" className="hero">
          <div className="hero-in">
            <span className="pill"><i /> Available for consulting & AI projects</span>
            <h1>Hi, I'm <b className="grad">Aman Dwivedi</b></h1>
            <h3>IT Consultant & Software Developer<br /><em>AI-oriented · LLM · MCP · Full-Stack</em></h3>
            <p>I design and ship intelligent web systems — from chatbot pipelines and MCP servers to resilient, high-traffic production platforms.</p>
            <div className="cta">
              <a className="btn primary" href="#projects">View work</a>
              <a className="btn" href="#contact">Get in touch</a>
            </div>
            <div className="soc"><a href="https://github.com/Amandwi02" target="_blank" rel="noreferrer">GitHub</a><a href="https://leetcode.com/u/amandwi02" target="_blank" rel="noreferrer">LeetCode</a><a href={'mailto:' + EMAIL}>Email</a></div>
          </div>
        </header>

        <section className="sec"><div className="stats">{stats.map(([n, l]) => <div className="glass stat rv" key={l}><b className="grad">{n}</b><span>{l}</span></div>)}</div></section>

        <section id="about" className="sec">
          <Title k="01 / About" t="Where business goals meet intelligent systems" />
          <p className="lead rv">I'm a software developer and IT consultant with 6+ years across web engineering, digital marketing and project management. I automate what's repetitive, debug what's broken at scale, and integrate AI where it creates real leverage. Currently pursuing an M.Tech in Computer Science & Engineering at an IIT.</p>
          <div className="grid">{focus.map(([t, d]) => <div className="glass card rv" key={t}><h4>{t}</h4><p>{d}</p></div>)}</div>
        </section>

        <section id="projects" className="sec">
          <Title k="02 / Work" t="Selected projects" />
          <div className="grid">{projects.map(([t, d, tags, link]) => (
            <div className="glass card rv" key={t}>
              <h4>{t}</h4><p>{d}</p>
              <div className="tags">{tags.map(x => <span key={x}>{x}</span>)}</div>
              {link && <a className="ext" href={link} target="_blank" rel="noreferrer">Source on GitHub →</a>}
            </div>))}
          </div>
        </section>

        <section id="experience" className="sec">
          <Title k="03 / Journey" t="Experience" />
          <div className="tl">{timeline.map(([d, t, p]) => <div className="tli rv" key={t}><small>{d}</small><h4>{t}</h4><p>{p}</p></div>)}</div>
          <div className="grid two">
            <div className="glass card rv"><h4>Education</h4><p><b>M.Tech, Computer Science & Engineering</b> — IIT (ongoing)</p><p><b>B.Tech, Computer Science & Engineering</b> — 2020–2024</p></div>
            <div className="glass card rv"><h4>Certifications</h4><p>Full Stack (NASSCOM & Adobe) · Digital Marketing (Google) · DBMS (IIT) · Python (IIT) · Java (IIT) · C/C++ (IIT) · AI & ML · Project Management</p></div>
          </div>
        </section>

        <section id="skills" className="sec">
          <Title k="04 / Stack" t="Skills & tools" />
          <div className="grid">{Object.entries(skills).map(([k, v]) => <div className="glass card rv" key={k}><h4>{k}</h4><div className="tags">{v.map(x => <span key={x}>{x}</span>)}</div></div>)}</div>
          <div className="rv" style={{ marginTop: 40 }}><span className="kicker">Recognition</span></div>
          <div className="grid">{awards.map(([a, b]) => <div className="glass card rv" key={a}><h4 className="grad">{a}</h4><p>{b}</p></div>)}</div>
        </section>

        <section id="contact" className="sec">
          <Title k="05 / Contact" t="Let's build something intelligent" />
          <div className="grid two">
            <div className="glass card rv"><h4>Email me</h4><p>For consulting, AI integrations or collaborations.</p><a className="btn primary" href={'mailto:' + EMAIL}>{EMAIL}</a></div>
            <div className="rv"><Contact /></div>
          </div>
        </section>
      </main>
      <footer>© {new Date().getFullYear()} Aman Dwivedi · Built with React & Three.js</footer>
    </>
  )
}
