import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router';
import { Gallery } from './components/Gallery';
import { Programs } from './components/Programs';
import { Tournaments } from './components/Tournaments';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

function Shell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', program: '', message: '' });

  const PHONE_WA = '919663483651';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      'Hello Bharath Tennis Express, I would like to enquire.',
      `Name: ${form.name}`,
      form.email && `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      form.program && `Program: ${form.program}`,
      form.message && `Message: ${form.message}`,
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/${PHONE_WA}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    setSent(true);
    setForm({ name: '', email: '', phone: '', program: '', message: '' });
  };

  // Scroll-reveal: hold each animated block until it enters the viewport
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.opacity-0'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          (en.target as HTMLElement).style.animationPlayState = 'running';
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => { el.style.animationPlayState = 'paused'; io.observe(el); });
    return () => io.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (location.pathname !== '/') { setActiveSection('programs'); return; }

      const sections = ['home', 'about', 'coach', 'tournaments', 'gallery', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // After changing page: go to top, or to the section we were asked to show
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) {
      setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }), 80);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.key]);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    if (id === 'programs') { navigate('/programs'); return; }
    if (location.pathname !== '/') { navigate('/', { state: { scrollTo: id } }); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black overflow-x-clip">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }
        html { scroll-behavior: smooth; }
        section { scroll-margin-top: 80px; }
        button:focus-visible, a:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {
          outline: 2px solid #00AAFF; outline-offset: 2px;
        }
        select option { color: #000; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .opacity-0 { opacity: 1 !important; animation: none !important; }
        }

        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }

        .hero-overlay {
          background: linear-gradient(135deg, rgba(0, 51, 153, 0.85) 0%, rgba(0, 0, 0, 0.75) 100%);
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .blue-glow {
          box-shadow: 0 0 30px rgba(0, 102, 255, 0.3);
        }

        .btn-primary {
          background: linear-gradient(135deg, #0066FF 0%, #0052CC 100%);
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 102, 255, 0.4);
        }

        .section-title {
          position: relative;
          display: inline-block;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #0066FF 0%, #00AAFF 100%);
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div onClick={() => scrollToSection('home')} className="font-bebas tracking-wider cursor-pointer" style={{ fontSize: '28px', color: '#ffffff' }}>
              <span style={{ color: '#0066FF' }}>BHARATH</span> TENNIS EXPRESS
            </div>

            <div className="hidden md:flex items-center gap-8 font-rajdhani" style={{ fontSize: '16px' }}>
              {[
                { id: 'home', label: 'HOME' },
                { id: 'about', label: 'ABOUT' },
                { id: 'coach', label: 'COACH' },
                { id: 'programs', label: 'PROGRAMS' },
                { id: 'tournaments', label: 'TOURNAMENTS' },
                { id: 'gallery', label: 'GALLERY' },
                { id: 'contact', label: 'CONTACT' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`tracking-wide transition-all duration-300 hover:text-[#0066FF] ${
                    activeSection === item.id ? 'text-[#0066FF]' : 'text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-primary px-6 py-3 rounded-md font-rajdhani tracking-wide text-white"
              >
                BOOK NOW
              </button>
              <button
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5"
              >
                <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}></span>
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden flex flex-col pb-6 font-rajdhani" style={{ fontSize: '18px' }}>
              {['home', 'about', 'coach', 'programs', 'tournaments', 'gallery', 'contact'].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-left py-3 tracking-wide border-b border-white/10 ${activeSection === id ? 'text-[#0066FF]' : 'text-white'}`}
                >
                  {id.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/programs" element={<Programs onContact={() => scrollToSection('contact')} />} />
        <Route path="*" element={
          <>

      {/* Hero Section */}
      <section id="home" className="relative h-screen w-full flex items-center justify-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1680428880168-eb91190ca246?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBjb3VydCUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzc2MTU3NjExfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Tennis Courts Aerial View"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay absolute inset-0"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="opacity-0 animate-fade-in-up">
            <div className="font-bebas text-white tracking-wider mb-4" style={{ fontSize: '24px', letterSpacing: '4px' }}>
              WELCOME TO
            </div>
          </div>

          <div className="opacity-0 animate-fade-in-up delay-200">
            <h1 className="font-bebas text-white mb-6" style={{
              fontSize: 'clamp(60px, 10vw, 120px)',
              lineHeight: '1.1',
              letterSpacing: '2px'
            }}>
              BHARATH<br />TENNIS EXPRESS
            </h1>
          </div>

          <div className="opacity-0 animate-fade-in-up delay-400">
            <p className="font-outfit text-white/90 mb-10 max-w-2xl mx-auto" style={{ fontSize: '18px', lineHeight: '1.8' }}>
              Friendly, professional tennis coaching for kids and adults. Come and play with us.
            </p>
          </div>

          <div className="opacity-0 animate-fade-in-up delay-600 flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => scrollToSection('programs')}
              className="btn-primary px-8 py-4 rounded-md font-rajdhani tracking-wide text-white"
              style={{ fontSize: '16px' }}
            >
              EXPLORE PROGRAMS
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="glass-effect px-8 py-4 rounded-md font-rajdhani tracking-wide text-white hover:bg-white/10 transition-all"
              style={{ fontSize: '16px' }}
            >
              GET IN TOUCH
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-up delay-800">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/60 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="opacity-0 animate-fade-in-up">
                <div className="font-rajdhani tracking-wider mb-4" style={{ fontSize: '14px', color: '#0066FF', letterSpacing: '3px' }}>
                  ABOUT US
                </div>
                <h2 className="font-bebas section-title mb-6" style={{ fontSize: 'clamp(40px, 6vw, 64px)', color: '#000000' }}>
                  TENNIS FOR<br />EVERYONE
                </h2>
              </div>

              <div className="opacity-0 animate-fade-in-up delay-200">
                <p className="font-outfit mb-6" style={{ fontSize: '16px', lineHeight: '1.8', color: '#333333' }}>
                  Bharath Tennis Express is a tennis academy for players of all ages and levels. We keep batches small so every player gets attention and improves at their own pace.
                </p>
                <p className="font-outfit mb-8" style={{ fontSize: '16px', lineHeight: '1.8', color: '#333333' }}>
                  Led by ITF certified coach Bharath Paul Singh, who has been coaching since 2004. We follow the ITF Tennis10s method for our young players.
                </p>
              </div>

              <div className="opacity-0 animate-fade-in-up delay-400">
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { number: '20+', label: 'Years Experience' },
                    { number: 'ITF', label: 'Certified Coach' },
                    { number: '2004', label: 'Since' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="font-bebas mb-2" style={{ fontSize: '48px', color: '#0066FF' }}>
                        {stat.number}
                      </div>
                      <div className="font-outfit" style={{ fontSize: '14px', color: '#666666' }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="opacity-0 animate-slide-in-right delay-200">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full border-4 border-[#0066FF] rounded-lg"></div>
                <ImageWithFallback
                  src="/gallery/group-kids-1.jpg"
                  alt="Coach Bharath with the junior group"
                  className="relative w-full h-[500px] object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coach Section */}
      <section id="coach" className="py-24 bg-gradient-to-br from-[#0a1628] to-[#000000]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="opacity-0 animate-fade-in-up">
              <div className="font-rajdhani tracking-wider mb-4" style={{ fontSize: '14px', color: '#0066FF', letterSpacing: '3px' }}>
                MEET OUR COACH
              </div>
              <h2 className="font-bebas section-title mb-6 inline-block" style={{ fontSize: 'clamp(40px, 6vw, 64px)', color: '#ffffff' }}>
                EXPERT GUIDANCE
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2 opacity-0 animate-slide-in-left delay-200">
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-br from-[#0066FF] to-[#00AAFF] rounded-lg opacity-20"></div>
                <ImageWithFallback
                  src="/coach.jpg"
                  alt="Coach Bharath Paul Singh"
                  className="relative w-full h-[500px] object-cover object-top rounded-lg shadow-2xl"
                />
                <div className="absolute bottom-6 left-6 right-6 glass-effect rounded-lg p-4">
                  <div className="font-bebas text-white" style={{ fontSize: '28px', letterSpacing: '1px' }}>
                    BHARATH PAUL SINGH
                  </div>
                  <div className="font-rajdhani text-[#0066FF]" style={{ fontSize: '14px', letterSpacing: '2px' }}>
                    ITF CERTIFIED COACH
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 opacity-0 animate-slide-in-right delay-300">
              <div className="glass-effect rounded-lg p-8">
                <h3 className="font-bebas mb-4" style={{ fontSize: '32px', color: '#ffffff', letterSpacing: '1px' }}>
                  PROFILE
                </h3>
                <p className="font-outfit mb-6" style={{ fontSize: '15px', lineHeight: '1.8', color: '#cccccc' }}>
                  Instruct and motivate students in individual and group lessons across men's, women's, and doubles leagues.
                  Provide initial confidence, encouragement, and tailored support for all students, with special focus on children.
                  Set goals, monitor progress, and communicate with parents. Work with National Indian Ranking ITF and ATP players.
                  Specialize in ITF Tennis10s program.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-rajdhani mb-3" style={{ fontSize: '16px', color: '#0066FF', letterSpacing: '2px' }}>
                      QUALIFICATIONS
                    </h4>
                    <ul className="space-y-2">
                      {[
                        'ITF Level-1 Certified (2009)',
                        'AITA Level-3 Certified (2009)',
                        'Certified Tennis Coach',
                        "Bachelor's in Arts"
                      ].map((qual, idx) => (
                        <li key={idx} className="font-outfit flex items-start gap-2" style={{ fontSize: '14px', color: '#aaaaaa' }}>
                          <span className="text-[#0066FF] mt-1">▸</span>
                          {qual}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-rajdhani mb-3" style={{ fontSize: '16px', color: '#0066FF', letterSpacing: '2px' }}>
                      PLAYER PROFILE
                    </h4>
                    <ul className="space-y-2">
                      {[
                        'Ranked top in India at age 14',
                        'National & ITF tournaments U16',
                        'Participated in Men\'s ITF',
                        'Men\'s Doubles ranked 332 in India'
                      ].map((achievement, idx) => (
                        <li key={idx} className="font-outfit flex items-start gap-2" style={{ fontSize: '14px', color: '#aaaaaa' }}>
                          <span className="text-[#0066FF] mt-1">▸</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-rajdhani mb-3" style={{ fontSize: '16px', color: '#0066FF', letterSpacing: '2px' }}>
                    EXPERTISE
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {[
                      'Technical & Tactical',
                      'Player Development',
                      'Match Analysis',
                      'Physical Conditioning',
                      'Mental Strengthening',
                      'ITF Tennis10s'
                    ].map((skill, idx) => (
                      <div
                        key={idx}
                        className="glass-effect px-4 py-2 rounded-full font-outfit"
                        style={{ fontSize: '13px', color: '#ffffff' }}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <h4 className="font-rajdhani mb-3" style={{ fontSize: '16px', color: '#0066FF', letterSpacing: '2px' }}>
                    NOTABLE EXPERIENCE
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Worked with Davis Cup coach - Master Tennis Academy, Sri Lanka (2006-2007)',
                      'Barcelona Tennis Academy, Spain (2018)',
                      'Programming Director - Dali Tennis Association, China (2023)',
                      'Head Coach - High Performance Tennis Centre (HPTC), KSLTA (2011)'
                    ].map((exp, idx) => (
                      <li key={idx} className="font-outfit flex items-start gap-2" style={{ fontSize: '14px', color: '#aaaaaa' }}>
                        <span className="text-[#0066FF] mt-1">▸</span>
                        {exp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Tournaments />

      <Gallery />

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-[#000000] via-[#001133] to-[#000000]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="opacity-0 animate-fade-in-up">
                <div className="font-rajdhani tracking-wider mb-4" style={{ fontSize: '14px', color: '#0066FF', letterSpacing: '3px' }}>
                  GET IN TOUCH
                </div>
                <h2 className="font-bebas mb-6" style={{ fontSize: 'clamp(40px, 6vw, 64px)', color: '#ffffff' }}>
                  START YOUR TENNIS<br />JOURNEY TODAY
                </h2>
                <p className="font-outfit mb-8" style={{ fontSize: '16px', lineHeight: '1.8', color: '#cccccc' }}>
                  Ready to take your game to the next level? Contact us to learn more about
                  our programs, schedule a tour, or book your first session.
                </p>
              </div>

              <div className="opacity-0 animate-fade-in-up delay-200 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0066FF]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span style={{ fontSize: '20px' }}>📍</span>
                  </div>
                  <div>
                    <div className="font-rajdhani mb-1" style={{ fontSize: '16px', color: '#ffffff' }}>
                      LOCATION
                    </div>
                    <a
                      href="https://maps.app.goo.gl/2feLyABVV2WgQaLD9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-outfit hover:text-[#0066FF] transition-colors"
                      style={{ fontSize: '14px', color: '#aaaaaa' }}
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0066FF]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span style={{ fontSize: '20px' }}>📞</span>
                  </div>
                  <div>
                    <div className="font-rajdhani mb-1" style={{ fontSize: '16px', color: '#ffffff' }}>
                      PHONE
                    </div>
                    <a
                      href="tel:+919663483651"
                      className="font-outfit hover:text-[#0066FF] transition-colors"
                      style={{ fontSize: '14px', color: '#aaaaaa' }}
                    >
                      +91 96634 83651
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0066FF]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span style={{ fontSize: '20px' }}>✉️</span>
                  </div>
                  <div>
                    <div className="font-rajdhani mb-1" style={{ fontSize: '16px', color: '#ffffff' }}>
                      EMAIL
                    </div>
                    <a
                      href="mailto:bharathtennisexpressbte@gmail.com"
                      className="font-outfit hover:text-[#0066FF] transition-colors break-all"
                      style={{ fontSize: '14px', color: '#aaaaaa' }}
                    >
                      bharathtennisexpressbte@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0066FF]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span style={{ fontSize: '20px' }}>🕐</span>
                  </div>
                  <div>
                    <div className="font-rajdhani mb-1" style={{ fontSize: '16px', color: '#ffffff' }}>
                      HOURS
                    </div>
                    <div className="font-outfit" style={{ fontSize: '14px', color: '#aaaaaa' }}>
                      Monday - Saturday: 6:30 AM - 6:30 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="opacity-0 animate-slide-in-right delay-300">
              <div className="glass-effect rounded-lg p-8">
                <h3 className="font-bebas mb-6" style={{ fontSize: '32px', color: '#ffffff', letterSpacing: '1px' }}>
                  SEND US A MESSAGE
                </h3>
                {sent ? (
                  <div className="py-10 text-center" role="status">
                    <div style={{ fontSize: '48px' }}>🎾</div>
                    <h4 className="font-bebas text-white mt-4 mb-2" style={{ fontSize: '28px', letterSpacing: '1px' }}>THANK YOU!</h4>
                    <p className="font-outfit" style={{ fontSize: '15px', color: '#cccccc', lineHeight: '1.7' }}>
                      Your enquiry opened in WhatsApp. Press send there and we will reply soon.
                    </p>
                    <button onClick={() => setSent(false)} className="font-rajdhani mt-6 text-[#0066FF] tracking-wide">SEND ANOTHER MESSAGE</button>
                  </div>
                ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text" required name="name" autoComplete="name"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 font-outfit text-white placeholder-white/40 focus:outline-none focus:border-[#0066FF] transition-colors"
                      style={{ fontSize: '15px' }}
                    />
                  </div>
                  <div>
                    <input
                      type="email" name="email" autoComplete="email"
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Your Email"
                      className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 font-outfit text-white placeholder-white/40 focus:outline-none focus:border-[#0066FF] transition-colors"
                      style={{ fontSize: '15px' }}
                    />
                  </div>
                  <div>
                    <input
                      type="tel" required name="phone" autoComplete="tel"
                      value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Phone Number"
                      className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 font-outfit text-white placeholder-white/40 focus:outline-none focus:border-[#0066FF] transition-colors"
                      style={{ fontSize: '15px' }}
                    />
                  </div>
                  <div>
                    <select
                      name="program" aria-label="Program interest"
                      value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 font-outfit text-white/60 focus:outline-none focus:border-[#0066FF] transition-colors"
                      style={{ fontSize: '15px' }}
                    >
                      <option value="">Program Interest</option>
                      <option>Red Ball</option>
                      <option>Orange Ball</option>
                      <option>Green Ball</option>
                      <option>Junior Advanced</option>
                      <option>Elite Performance</option>
                      <option>Adult Programs</option>
                      <option>Private Coaching</option>
                      <option>Summer Camps</option>
                      <option>Fitness &amp; Conditioning</option>
                    </select>
                  </div>
                  <div>
                    <textarea
                      name="message"
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Your Message"
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 font-outfit text-white placeholder-white/40 focus:outline-none focus:border-[#0066FF] transition-colors resize-none"
                      style={{ fontSize: '15px' }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary w-full px-6 py-4 rounded-md font-rajdhani tracking-wide text-white"
                    style={{ fontSize: '16px' }}
                  >
                    SEND MESSAGE
                  </button>
                </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

          </>
        } />
      </Routes>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-bebas tracking-wider mb-4" style={{ fontSize: '24px', color: '#ffffff' }}>
                <span style={{ color: '#0066FF' }}>BHARATH</span><br />TENNIS EXPRESS
              </div>
              <p className="font-outfit" style={{ fontSize: '14px', lineHeight: '1.7', color: '#888888' }}>
                Building champions through excellence in tennis training and development.
              </p>
            </div>

            <div>
              <h4 className="font-rajdhani mb-4" style={{ fontSize: '16px', color: '#ffffff' }}>
                QUICK LINKS
              </h4>
              <ul className="space-y-2">
                {[['About Us','about'], ['Programs','programs'], ['Tournaments','tournaments'], ['Gallery','gallery'], ['Contact','contact']].map(([link, id]) => (
                  <li key={link}>
                    <button onClick={() => scrollToSection(id)} className="font-outfit text-[#888888] hover:text-[#0066FF] transition-colors" style={{ fontSize: '14px' }}>
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-rajdhani mb-4" style={{ fontSize: '16px', color: '#ffffff' }}>
                PROGRAMS
              </h4>
              <ul className="space-y-2">
                {['Junior Development', 'Adult Training', 'Elite Performance', 'Private Coaching'].map((program) => (
                  <li key={program}>
                    <button onClick={() => scrollToSection('programs')} className="font-outfit text-[#888888] hover:text-[#0066FF] transition-colors" style={{ fontSize: '14px' }}>
                      {program}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-rajdhani mb-4" style={{ fontSize: '16px', color: '#ffffff' }}>
                FOLLOW US
              </h4>
              <div className="space-y-3">
                <a
                  href="https://www.instagram.com/bharathtennixexpress_bte/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-[#0066FF] transition-all flex items-center justify-center">
                    <span className="font-outfit" style={{ fontSize: '12px', color: '#ffffff' }}>
                      IG
                    </span>
                  </div>
                  <span className="font-outfit text-[#888888] group-hover:text-[#0066FF] transition-colors" style={{ fontSize: '14px' }}>
                    @bharathtennixexpress_bte
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="font-outfit" style={{ fontSize: '14px', color: '#666666' }}>
              © 2026 Bharath Tennis Express. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
