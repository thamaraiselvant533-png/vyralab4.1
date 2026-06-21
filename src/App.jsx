import { useState, useEffect, useRef } from 'react';
import {
  Menu, X, ArrowRight, Sparkles, BarChart3, Code2, Palette,
  TrendingUp, Layout, Layers, ShoppingCart, Cpu, Paintbrush, Wand2,
  Shield, Users, Rocket, Award, ExternalLink, Mail, Phone, MapPin, Send,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   HOOK: Intersection Observer Reveal
   ═══════════════════════════════════════════ */
function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    const els = ref.current.querySelectorAll('.reveal');
    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, []);
}

/* ═══════════════════════════════════════════
   HOOK: 3D Tilt on Mouse Move
   ═══════════════════════════════════════════ */
function useTilt(ref, intensity = 10) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * intensity;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -intensity;
      el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateY(-8px)`;
    };
    const leave = () => { el.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)'; };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
  }, [intensity]);
}

/* ═══════════════════════════════════════════
   1. NAVBAR
   ═══════════════════════════════════════════ */
const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'navbar-glass shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A60A8] to-[#FF007F] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
              <span className="font-[Orbitron] text-white font-bold text-sm tracking-wider">V</span>
            </div>
            <div className="flex flex-col">
              <span className="font-[Orbitron] text-lg font-bold tracking-[0.15em] text-white">VYRA LAB</span>
              <span className="text-[10px] tracking-[0.3em] text-[#5a5a72] uppercase -mt-0.5">digital world</span>
            </div>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-[#9898b0] hover:text-white transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#4A60A8] to-[#FF007F] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a href="#contact" className="btn-gradient text-white text-sm font-semibold px-6 py-2.5 rounded-full relative z-10">
              <span className="relative z-10">Get a Quote</span>
            </a>
          </div>

          {/* Mobile */}
          <button onClick={() => setOpen(!open)} className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-white" aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 pt-2 glass border-t border-white/5 space-y-1">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 px-4 rounded-lg text-[#9898b0] hover:text-white hover:bg-white/5 transition text-sm font-medium">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="block mt-3 btn-gradient text-white text-sm font-semibold px-6 py-3 rounded-full text-center relative z-10">
            <span className="relative z-10">Get a Quote</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   2. HERO
   ═══════════════════════════════════════════ */
const NODES = [
  { x: '12%', y: '20%', s: 8, pink: false, d: 0 },
  { x: '28%', y: '35%', s: 6, pink: true, d: 0.5 },
  { x: '42%', y: '15%', s: 5, pink: false, d: 1 },
  { x: '58%', y: '40%', s: 7, pink: true, d: 1.5 },
  { x: '72%', y: '22%', s: 6, pink: false, d: 0.8 },
  { x: '85%', y: '35%', s: 5, pink: true, d: 2 },
  { x: '20%', y: '55%', s: 4, pink: false, d: 1.2 },
  { x: '50%', y: '60%', s: 6, pink: false, d: 0.3 },
  { x: '75%', y: '55%', s: 5, pink: true, d: 1.7 },
  { x: '35%', y: '75%', s: 4, pink: false, d: 2.2 },
  { x: '65%', y: '72%', s: 5, pink: true, d: 0.6 },
  { x: '90%', y: '65%', s: 4, pink: false, d: 1.9 },
  { x: '8%', y: '70%', s: 5, pink: true, d: 0.9 },
  { x: '48%', y: '85%', s: 4, pink: false, d: 2.5 },
];

const LINES = [
  ['12%', '20%', '28%', '35%', 0], ['28%', '35%', '42%', '15%', 0.5], ['42%', '15%', '72%', '22%', 1],
  ['58%', '40%', '85%', '35%', 1.5], ['20%', '55%', '50%', '60%', 0.3], ['50%', '60%', '75%', '55%', 0.8],
  ['35%', '75%', '65%', '72%', 1.2], ['8%', '70%', '35%', '75%', 1.8], ['72%', '22%', '85%', '35%', 2],
  ['65%', '72%', '90%', '65%', 0.6], ['48%', '85%', '65%', '72%', 2.3],
];

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Orbs */}
      <div className="orb orb-blue w-[500px] h-[500px] -top-48 -left-32" />
      <div className="orb orb-pink w-[400px] h-[400px] -bottom-32 -right-24" />
      <div className="orb orb-blue w-[300px] h-[300px] top-1/3 right-1/4" style={{ opacity: 0.08 }} />

      {/* Network SVG lines */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4A60A8" stopOpacity="0" />
              <stop offset="50%" stopColor="#4A60A8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF007F" stopOpacity="0" />
            </linearGradient>
          </defs>
          {LINES.map(([x1, y1, x2, y2, d], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#lg)" strokeWidth="1" opacity="0.2"
              style={{ animation: `linePulse 4s ease-in-out ${d}s infinite` }} />
          ))}
        </svg>
        {NODES.map((n, i) => (
          <div key={i} className={`node ${n.pink ? 'node-pink' : ''}`}
            style={{ left: n.x, top: n.y, width: n.s, height: n.s, animationDelay: `${n.d}s` }} />
        ))}
      </div>

      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#4A60A8]/10 to-[#FF007F]/5 blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8" style={{ animation: 'fadeInUp 0.8s ease-out both' }}>
          <Sparkles size={14} className="text-[#FF007F]" />
          <span className="text-xs font-medium tracking-wider text-[#9898b0] uppercase">MSME Registered Tech Agency</span>
        </div>

        <h1 className="font-[Orbitron] text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-[0.08em] leading-none mb-6" style={{ animation: 'fadeInUp 0.8s ease-out 0.15s both' }}>
          <span className="block text-white" style={{ textShadow: '0 0 40px rgba(74,96,168,0.4)' }}>VYRA</span>
          <span className="block text-gradient">LAB</span>
        </h1>

        <p className="text-lg sm:text-xl text-[#9898b0] font-light tracking-[0.4em] uppercase mb-4" style={{ animation: 'fadeInUp 0.8s ease-out 0.3s both' }}>
          digital world
        </p>

        <p className="text-base sm:text-lg text-[#5a5a72] max-w-2xl mx-auto mb-10 leading-relaxed" style={{ animation: 'fadeInUp 0.8s ease-out 0.45s both' }}>
          Empowering businesses with cutting-edge Data Analytics, Full-Stack Development, and premium UI/UX Design solutions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animation: 'fadeInUp 0.8s ease-out 0.6s both' }}>
          <a href="#services" className="btn-gradient text-white font-semibold px-8 py-3.5 rounded-full flex items-center gap-2 text-sm relative z-10">
            <span className="relative z-10 flex items-center gap-2">Explore Services <ArrowRight size={16} /></span>
          </a>
          <a href="#contact" className="btn-outline text-white font-semibold px-8 py-3.5 rounded-full text-sm">Get a Quote</a>
        </div>

        <div className="flex items-center justify-center gap-8 sm:gap-16 mt-16" style={{ animation: 'fadeInUp 0.8s ease-out 0.75s both' }}>
          {[{ n: '50+', l: 'Projects Delivered' }, { n: '30+', l: 'Happy Clients' }, { n: '3+', l: 'Years Experience' }].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-2xl sm:text-3xl font-[Orbitron] font-bold stat-glow">{s.n}</div>
              <div className="text-xs text-[#5a5a72] mt-1 tracking-wide">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] text-[#5a5a72] tracking-wider uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-[#5a5a72]/30 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-[#4A60A8] animate-pulse" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   3. SERVICES
   ═══════════════════════════════════════════ */
const SERVICES = [
  {
    id: 'analytics', icon: BarChart3, title: 'Data Analytics', color: 'blue',
    desc: 'Transform raw data into actionable insights with interactive dashboards, predictive modeling, and real-time visualization.',
    features: [
      { icon: TrendingUp, t: 'Predictive Insights' }, { icon: BarChart3, t: 'Interactive Dashboards' },
      { icon: Layers, t: 'Data Visualization' }, { icon: Cpu, t: 'Real-time Processing' },
    ],
  },
  {
    id: 'dev', icon: Code2, title: 'Full-Stack Web Development', color: 'mixed',
    desc: 'Build robust, scalable web applications with modern frameworks, custom e-commerce solutions, and enterprise-grade architecture.',
    features: [
      { icon: Layout, t: 'Responsive Layouts' }, { icon: ShoppingCart, t: 'E-Commerce Solutions' },
      { icon: Code2, t: 'Custom Web Apps' }, { icon: Layers, t: 'Scalable Architecture' },
    ],
  },
  {
    id: 'design', icon: Palette, title: 'Web Design / UI-UX', color: 'pink',
    desc: 'Craft stunning user interfaces with high-fidelity wireframes, custom micro-animations, and pixel-perfect premium designs.',
    features: [
      { icon: Paintbrush, t: 'Hi-Fi Wireframes' }, { icon: Wand2, t: 'Custom Animations' },
      { icon: Palette, t: 'Premium Visual Design' }, { icon: Layout, t: 'Interactive Prototypes' },
    ],
  },
];

function MiniChart() {
  const bars = [40, 65, 45, 80, 55, 90, 70, 85];
  return (
    <div className="flex items-end gap-1.5 h-20 mt-4 mb-2 px-2">
      {bars.map((h, i) => (
        <div key={i} className="flex-1 rounded-t-sm origin-bottom chart-bar"
          style={{ height: `${h}%`, background: i % 2 === 0 ? 'linear-gradient(to top, #4A60A8, #6B82CC)' : 'linear-gradient(to top, #FF007F, #FF4DA6)', animationDelay: `${i * 0.1}s`, opacity: 0.8 }} />
      ))}
    </div>
  );
}

function CodeWidget() {
  return (
    <div className="mt-4 mb-2 rounded-lg bg-black/40 border border-white/5 p-3 font-mono text-[11px] leading-relaxed overflow-hidden">
      <div className="flex gap-1.5 mb-2">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
      </div>
      <div><span className="text-[#FF007F]">const</span> <span className="text-[#6B82CC]">app</span> <span className="text-white/40">=</span> <span className="text-[#4A60A8]">createApp</span><span className="text-white/30">()</span></div>
      <div><span className="text-[#FF007F]">await</span> <span className="text-[#6B82CC]">app</span>.<span className="text-[#4A60A8]">deploy</span><span className="text-white/30">(</span><span className="text-green-400/80">'production'</span><span className="text-white/30">)</span></div>
      <div className="text-white/20">{'// 🚀 Shipped!'}</div>
    </div>
  );
}

function DesignWidget() {
  return (
    <div className="mt-4 mb-2 space-y-2">
      <div className="flex gap-2">
        <div className="flex-1 h-16 rounded-lg bg-gradient-to-br from-[#FF007F]/20 to-[#FF007F]/5 border border-[#FF007F]/10 flex items-center justify-center">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF007F]/40 to-[#4A60A8]/40" />
        </div>
        <div className="flex-1 h-16 rounded-lg bg-gradient-to-br from-[#4A60A8]/20 to-[#4A60A8]/5 border border-[#4A60A8]/10 flex items-center justify-center">
          <div className="w-12 h-2 rounded-full bg-[#4A60A8]/30" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-[2] h-8 rounded-md bg-white/[0.03] border border-white/5 flex items-center px-3">
          <div className="w-16 h-1.5 rounded-full bg-white/10" />
        </div>
        <div className="flex-1 h-8 rounded-md bg-gradient-to-r from-[#4A60A8]/20 to-[#FF007F]/20 border border-white/5" />
      </div>
    </div>
  );
}

function ServiceCard({ s }) {
  const ref = useRef(null);
  useTilt(ref);
  const Icon = s.icon;
  const iconColor = s.color === 'pink' ? 'text-[#FF007F]' : 'text-[#4A60A8]';
  const iconBg = s.color === 'pink' ? 'from-[#FF007F]/20 to-[#FF007F]/5' : s.color === 'mixed' ? 'from-[#4A60A8]/20 to-[#FF007F]/10' : 'from-[#4A60A8]/20 to-[#4A60A8]/5';

  return (
    <div ref={ref} className="glass gradient-border rounded-2xl p-6 lg:p-8 cursor-default" style={{ transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease' }}>
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center mb-5`}>
        <Icon size={26} className={iconColor} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
      <p className="text-sm text-[#9898b0] leading-relaxed mb-4">{s.desc}</p>
      {s.id === 'analytics' && <MiniChart />}
      {s.id === 'dev' && <CodeWidget />}
      {s.id === 'design' && <DesignWidget />}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {s.features.map((f) => {
          const F = f.icon;
          return (
            <div key={f.t} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] transition">
              <F size={14} className={`${iconColor} flex-shrink-0`} />
              <span className="text-xs text-[#9898b0]">{f.t}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Services() {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section id="services" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="orb orb-blue w-[350px] h-[350px] -top-40 -right-40" />
      <div className="orb orb-pink w-[250px] h-[250px] bottom-0 left-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#4A60A8] mb-3 block">What We Do</span>
          <h2 className="font-[Orbitron] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-white neon-underline inline-block">Core Services</h2>
          <p className="mt-6 text-[#9898b0] max-w-2xl mx-auto text-base leading-relaxed">We deliver end-to-end digital solutions — from data-driven insights to beautifully crafted web experiences.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((s, i) => (
            <div key={s.id} className="reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
              <ServiceCard s={s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   4. ABOUT
   ═══════════════════════════════════════════ */
const HIGHLIGHTS = [
  { icon: Shield, title: 'MSME Registered', desc: 'Officially recognized by the Government of India' },
  { icon: Users, title: 'Student-Friendly', desc: 'Affordable solutions for college projects & startups' },
  { icon: Rocket, title: 'Fast Delivery', desc: 'Agile development with rapid turnaround times' },
  { icon: Award, title: 'Quality Assured', desc: 'Premium standards on every single project' },
];

const TECHS = ['React', 'Next.js', 'Node.js', 'Python', 'TailwindCSS', 'MongoDB', 'PostgreSQL', 'AWS', 'Figma', 'TypeScript', 'Docker', 'GraphQL'];

function About() {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section id="about" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="orb orb-pink w-[400px] h-[400px] -top-48 left-1/4" />
      <div className="orb orb-blue w-[300px] h-[300px] bottom-0 right-1/4" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#FF007F] mb-3 block">Who We Are</span>
            <h2 className="font-[Orbitron] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-white neon-underline inline-block mb-8">About Vyra Lab</h2>
            <p className="text-[#9898b0] leading-relaxed mb-6">
              <strong className="text-white">VYRA LAB</strong> is an MSME-registered technology agency headquartered in
              <strong className="text-white"> Salem, Tamil Nadu</strong>. We are dedicated to empowering small businesses,
              startups, and college students with world-class digital solutions that are both accessible and premium.
            </p>
            <p className="text-[#9898b0] leading-relaxed mb-8">
              From data analytics platforms to full-stack web applications and stunning UI/UX designs,
              our team combines cutting-edge technology with creative excellence to deliver results
              that truly make an impact in the digital world.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 btn-gradient text-white font-semibold px-7 py-3 rounded-full text-sm relative z-10">
              <span className="relative z-10">Work With Us</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4 reveal" style={{ transitionDelay: '0.2s' }}>
            {HIGHLIGHTS.map((h, i) => {
              const I = h.icon;
              const even = i % 2 === 0;
              return (
                <div key={h.title} className={`glass gradient-border rounded-2xl p-6 hover:bg-white/[0.03] transition-all duration-300 ${even ? '' : 'mt-6'}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${even ? 'bg-gradient-to-br from-[#4A60A8]/20 to-[#4A60A8]/5' : 'bg-gradient-to-br from-[#FF007F]/20 to-[#FF007F]/5'}`}>
                    <I size={22} className={even ? 'text-[#4A60A8]' : 'text-[#FF007F]'} />
                  </div>
                  <h4 className="text-white font-semibold mb-1.5 text-sm">{h.title}</h4>
                  <p className="text-xs text-[#5a5a72] leading-relaxed">{h.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech Marquee */}
        <div className="mt-20 reveal" style={{ transitionDelay: '0.3s' }}>
          <div className="border-t border-b border-white/[0.04] py-6 overflow-hidden">
            <div className="marquee-track flex items-center gap-12 whitespace-nowrap w-max">
              {[...TECHS, ...TECHS].map((t, i) => (
                <span key={`${t}-${i}`} className="text-sm font-medium text-[#5a5a72] tracking-wider uppercase hover:text-white transition-colors cursor-default">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   5. PORTFOLIO
   ═══════════════════════════════════════════ */
const PROJECTS = [
  { id: 1, title: 'E-Commerce Platform', cat: 'Full-Stack Development', img: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800', color: 'blue' },
  { id: 2, title: 'FinTech Dashboard', cat: 'Data Analytics & UI', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', color: 'pink' },
  { id: 3, title: 'Corporate Agency', cat: 'Web Design', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', color: 'blue' },
  { id: 4, title: 'Healthcare App', cat: 'UI/UX Design', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800', color: 'pink' },
];

function PortfolioCard({ p }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const move = (e) => {
      const r = c.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 15;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -15;
      c.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.02,1.02,1.02)`;
    };
    const leave = () => { c.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1,1,1)'; };
    c.addEventListener('mousemove', move);
    c.addEventListener('mouseleave', leave);
    return () => { c.removeEventListener('mousemove', move); c.removeEventListener('mouseleave', leave); };
  }, []);

  return (
    <div ref={ref} className="group relative rounded-2xl overflow-hidden glass" style={{ transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease' }}>
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img src={p.img} alt={p.title} className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100" loading="lazy" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent opacity-90" />
      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <span className={`text-xs font-semibold tracking-wider uppercase mb-2 block ${p.color === 'pink' ? 'text-[#FF007F]' : 'text-[#4A60A8]'}`}>{p.cat}</span>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">{p.title}</h3>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md">
            <ExternalLink size={18} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Portfolio() {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section id="portfolio" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#4A60A8] mb-3 block">Our Work</span>
          <h2 className="font-[Orbitron] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-white neon-underline inline-block">Featured Projects</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {PROJECTS.map((p, i) => (
            <div key={p.id} className="reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
              <PortfolioCard p={p} />
            </div>
          ))}
        </div>
        <div className="mt-16 text-center reveal">
          <a href="#contact" className="btn-outline text-white font-semibold px-8 py-3.5 rounded-full text-sm inline-block">View All Work</a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   6. CONTACT + FOOTER
   ═══════════════════════════════════════════ */
function Contact() {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section id="contact" ref={ref} className="relative pt-24 lg:pt-32 pb-12 overflow-hidden border-t border-white/[0.05]">
      <div className="orb orb-pink w-[500px] h-[500px] top-0 left-0 opacity-10" />
      <div className="orb orb-blue w-[400px] h-[400px] bottom-0 right-0 opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          {/* Info */}
          <div className="reveal">
            <h2 className="font-[Orbitron] text-4xl lg:text-5xl font-bold tracking-wide text-white mb-6">
              Let's Build The<br /><span className="text-gradient">Digital Future.</span>
            </h2>
            <p className="text-[#9898b0] leading-relaxed mb-10 max-w-md">
              Ready to elevate your digital presence? Reach out to us for a free consultation or project estimation.
            </p>
            <div className="space-y-6">
              {[
                { icon: MapPin, title: 'Headquarters', text: 'Salem, Tamil Nadu\nIndia - 636012', color: 'blue' },
                { icon: Phone, title: 'Call Us', text: '+91 96553 94450', color: 'pink' },
                { icon: Mail, title: 'Email', text: 'vyralab3@gmail.com', color: 'blue' },
              ].map((c) => {
                const I = c.icon;
                const bg = c.color === 'pink' ? 'from-[#FF007F]/20 to-[#FF007F]/5' : 'from-[#4A60A8]/20 to-[#4A60A8]/5';
                const tc = c.color === 'pink' ? 'text-[#FF007F]' : 'text-[#4A60A8]';
                return (
                  <div key={c.title} className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center flex-shrink-0`}>
                      <I size={20} className={tc} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{c.title}</h4>
                      <p className="text-sm text-[#5a5a72] whitespace-pre-line">{c.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="glass rounded-2xl p-8 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4A60A8] to-[#FF007F]" />
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#9898b0] mb-1.5 uppercase tracking-wider">Name</label>
                    <input type="text" className="w-full glow-input rounded-lg px-4 py-3 text-white text-sm" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9898b0] mb-1.5 uppercase tracking-wider">Email</label>
                    <input type="email" className="w-full glow-input rounded-lg px-4 py-3 text-white text-sm" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#9898b0] mb-1.5 uppercase tracking-wider">Service</label>
                  <select className="w-full glow-input rounded-lg px-4 py-3 text-white text-sm appearance-none bg-[#16161f]">
                    <option value="">Select a service...</option>
                    <option value="analytics">Data Analytics</option>
                    <option value="dev">Full-Stack Development</option>
                    <option value="design">UI/UX Design</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#9898b0] mb-1.5 uppercase tracking-wider">Message</label>
                  <textarea rows="4" className="w-full glow-input rounded-lg px-4 py-3 text-white text-sm resize-none" placeholder="Tell us about your project..." />
                </div>
                <button type="submit" className="w-full btn-gradient text-white font-semibold py-3.5 rounded-lg flex items-center justify-center gap-2 mt-4 transition-all hover:gap-3">
                  <span className="relative z-10 flex items-center gap-2">Send Message <Send size={16} /></span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 reveal" style={{ transitionDelay: '0.4s' }}>
          <div className="flex items-center gap-2">
            <span className="font-[Orbitron] font-bold text-white">VYRA LAB</span>
            <span className="text-[#5a5a72] text-sm">© {new Date().getFullYear()}</span>
          </div>
          <p className="text-sm text-[#5a5a72] text-center md:text-right">MSME Registered Tech Agency · Salem, Tamil Nadu, 636012</p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   APP ROOT
   ═══════════════════════════════════════════ */
export default function App() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div className="bg-black text-white min-h-screen relative">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <Contact />
      </main>
    </div>
  );
}

navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log("Latitude:", position.coords.latitude);
    console.log("Longitude:", position.coords.longitude);
  },
  (error) => {
    console.log(error);
  }
);