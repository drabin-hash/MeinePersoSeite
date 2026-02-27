"use client";


import { useEffect, useRef, useState } from "react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Code, 
  Briefcase, 
  GraduationCap, 
  ChevronDown, 
  ExternalLink, 
  Cpu, 
  Sparkles,
  Music,
  Palette,
  BookOpen,
  Coffee,
  FolderOpen  // ← Dieser Import hat gefehlt!
} from "lucide-react";

function CursorTrail() {
  const dotsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const dotCount = 50;
    const dots = dotsRef.current;
    let mouseX = 0, mouseY = 0;
    const positions = Array.from({ length: dotCount }, () => ({ x: 0, y: 0 }));

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    let raf = 0;
    const animate = () => {
      positions[0].x += (mouseX - positions[0].x) * 0.15;
      positions[0].y += (mouseY - positions[0].y) * 0.15;

      for (let i = 1; i < dotCount; i++) {
        positions[i].x += (positions[i - 1].x - positions[i].x) * 0.15;
        positions[i].y += (positions[i - 1].y - positions[i].y) * 0.15;
      }

      dots.forEach((dot, i) => {
        if (!dot) return;
        const scale = 1 - i / dotCount;
        dot.style.transform = `translate(${positions[i].x - 6}px, ${positions[i].y - 6}px) scale(${scale})`;
        dot.style.opacity = String(scale);
      });

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) dotsRef.current[i] = el; }}
          className="fixed left-0 top-0 w-2 h-2 rounded-full bg-green-400 pointer-events-none z-[9999]"
        />
      ))}
    </>
  );
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showGhostImage, setShowGhostImage] = useState(false);

  const professions = [
    "in weiterbildung zum fachinformatiker",
    "musiker",
    "karikaturist",
    "geschichtenerzähler"
  ];


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(cursorInterval);
    };
  }, []);

  // Typewriter Effect
  useEffect(() => {
    const handleType = () => {
      const i = loopNum % professions.length;
      const fullText = professions[i];

      if (!isDeleting) {
        setTypedText(fullText.substring(0, typedText.length + 1));
        setTypingSpeed(150);
      } else {
        setTypedText(fullText.substring(0, typedText.length - 1));
        setTypingSpeed(75);
      }

      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum, typingSpeed, professions]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#00cc00] font-mono relative overflow-x-hidden">
      <button
        type="button"
        className="pixel-ghost"
        aria-label="Open ghost image"
        title="Open ghost image"
        onClick={() => setShowGhostImage(true)}
      />

      {showGhostImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setShowGhostImage(false)}
        >
          <img
            src="/The_Ghost_of_Luciano_Pavarotti.jpeg"
            alt="bu bu bu"
            className="max-h-[85vh] max-w-[90vw] border border-[#00cc00] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      {/* Scanline Effect - subtiler */}
      <CursorTrail />
      <div className="fixed inset-0 pointer-events-none z-50 opacity-3">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(0,204,0,0.03)_50%)] bg-[length:100%_4px]"></div>
      </div>

      {/* Navigation - vereinfacht */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? "bg-black/90 border-b border-[#00cc00] py-3" : "py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="text-xl font-bold text-[#00cc00]">
            <span className="text-[#00cc00]">pavel</span>
          </div>
          <div className="hidden md:flex space-x-6">
            {["home", "about", "projects", "skills", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-[#00cc00] hover:text-white transition-colors relative group"
              >
                • {item}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[#00cc00] transform scale-x-0 group-hover:scale-x-100 transition-transform ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Subtiles Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_95%,rgba(0,204,0,0.1)_95%)] bg-[length:40px_40px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_95%,rgba(0,204,0,0.1)_95%)] bg-[length:40px_40px]"></div>
        </div>

        <div className="relative z-10 text-left px-4 sm:px-6 max-w-4xl mx-auto">
          {/* Einfache Begrüßung */}
          <div className="mb-4 text-[#00cc00]">
            • hallo, ich bin
          </div>

          {/* Name */}
          <h1 className="text-6xl sm:text-8xl font-bold mb-4 text-[#00cc00]">
            Pavel
          </h1>
          
          {/* Typewriter Effect */}
          <div className="font-mono text-xl mb-8">
            <span className="text-[#00cc00]">{typedText}</span>
            <span className={`ml-1 text-[#00cc00] ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>_</span>
          </div>

          {/* Social Links - einfache Punkte */}
          <div className="mb-12">
            <div className="flex gap-4">
              {[
                { icon: Github, name: "github", url: "https://github.com" },
                { icon: Linkedin, name: "linkedin", url: "https://linkedin.com" },
                { icon: Mail, name: "email", url: "mailto:pavel@example.com" },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="border border-[#00cc00] p-3 hover:bg-[#00cc00] hover:text-black transition-all">
                      <Icon size={20} />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => scrollToSection("about")}
            className="border border-[#00cc00] px-4 py-2 hover:bg-[#00cc00] hover:text-black transition-all flex items-center gap-2"
          >
            <span>• mehr über mich</span>
            <ChevronDown size={16} className={`ml-2 transition-transform ${cursorVisible ? 'translate-y-1' : 'translate-y-0'}`} />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-32 px-4 sm:px-6 relative border-t border-[#00cc00]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-[#00cc00]">• about</h2>
          
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <div className="space-y-4">
              <div className="border border-[#00cc00] p-6">
                <p className="text-white leading-relaxed">
                  Ich bin <span className="text-[#00cc00]">in Weiterbildung zum Fachinformatiker</span> 
                  {' '}und verbinde Technik mit Kreativität.
                </p>
                <p className="text-white/80 leading-relaxed mt-4">
                  Neben dem Programmieren liebe ich Musik, zeichne Karikaturen 
                  und erzähle gerne Geschichten.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "projekte", value: "5+", icon: Briefcase },
                  { label: "erfahrung", value: "2 jahre", icon: Code },
                  { label: "kaffee", value: "täglich", icon: Coffee },
                  { label: "ideen", value: "∞", icon: Sparkles },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="border border-[#00cc00] p-4 hover:bg-[#00cc00] hover:text-black transition-all">
                      <Icon size={16} className="mb-2" />
                      <div className="text-lg font-bold">{stat.value}</div>
                      <div className="text-xs opacity-70">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="border border-[#00cc00] p-6">
              <h3 className="text-xl font-bold mb-6 text-[#00cc00]">• was mich ausmacht</h3>
              <div className="space-y-4">
                {[
                  { title: "kreativität", value: 95 },
                  { title: "technisches verständnis", value: 85 },
                  { title: "kommunikation", value: 90 },
                ].map((metric) => (
                  <div key={metric.title}>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-white">{metric.title}</span>
                      <span className="text-[#00cc00]">{metric.value}%</span>
                    </div>
                    <div className="h-2 bg-black border border-[#00cc00]">
                      <div
                        className="h-full bg-[#00cc00]"
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 sm:py-32 px-4 sm:px-6 relative border-t border-[#00cc00]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-[#00cc00]">• projekte</h2>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                name: "sestradrone webseite",
                desc: "Webseite für eine Drohnen-Projekt",
                tags: ["html", "css", "javascript"],
                date: "2024-02"
              },
              {
                name: "python calculator",
                desc: "Taschenrechner mit GUI in Python",
                tags: ["python", "tkinter"],
                date: "2024-01"
              }
            ].map((project, i) => (
              <div
                key={i}
                className="group border border-[#00cc00] p-4 hover:bg-[#00cc00] hover:text-black transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <FolderOpen size={20} className="text-[#00cc00] group-hover:text-black" />
                  <span className="text-xs opacity-70">{project.date}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-black">{project.name}</h3>
                <p className="text-sm opacity-80 mb-4 group-hover:text-black">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs border border-current px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - mit den kreativen Skills */}
      <section id="skills" className="py-20 sm:py-32 px-4 sm:px-6 relative border-t border-[#00cc00]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-[#00cc00]">• skills & leidenschaften</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: "musik", icon: <Music size={24} />, description: "gitarre, klavier" },
              { name: "karikaturen", icon: <Palette size={24} />, description: "handgemalt" },
              { name: "storytelling", icon: <BookOpen size={24} />, description: "geschichten erzählen" },
              { name: "kaffeesatz lesen", icon: <Coffee size={24} />, description: "zukunft deuten" },
            ].map((skill) => (
              <div key={skill.name} className="border border-[#00cc00] p-4 hover:bg-[#00cc00] hover:text-black transition-all group text-center">
                <div className="text-2xl mb-2 flex justify-center">{skill.icon}</div>
                <div className="text-sm font-bold">{skill.name}</div>
                <div className="text-xs opacity-70 mt-1">{skill.description}</div>
              </div>
            ))}
          </div>

          {/* Technische Skills */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 text-[#00cc00]">• technisch</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: "python", level: "grundlagen" },
                { name: "html/css", level: "fortgeschritten" },
                { name: "javascript", level: "grundlagen" },
                { name: "linux", level: "grundlagen" },
              ].map((skill) => (
                <div key={skill.name} className="border border-[#00cc00] p-3 hover:bg-[#00cc00] hover:text-black transition-all">
                  <div className="text-sm font-bold">{skill.name}</div>
                  <div className="text-xs opacity-70">{skill.level}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 relative border-t border-[#00cc00]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-[#00cc00]">• kontakt</h2>
          
          <div className="border border-[#00cc00] p-8">
            <p className="text-xl text-white mb-4">
              Lass uns connecten!
            </p>
            <p className="text-white/80 mb-8">
              Ob für Projekte, Ideen oder guten Kaffee - ich freu mich auf deine Nachricht.
            </p>
            
            <a
              href="mailto:pavel@example.com"
              className="inline-flex items-center gap-2 border border-[#00cc00] px-6 py-3 hover:bg-[#00cc00] hover:text-black transition-all group"
            >
              <Mail size={18} />
              <span>nachricht senden</span>
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-[#00cc00]">
        <div className="max-w-7xl mx-auto text-center text-sm text-[#00cc00]">
          <p>© 2024 Pavel • in weiterbildung zum fachinformatiker</p>
        </div>
      </footer>
    </div>
  );
}
