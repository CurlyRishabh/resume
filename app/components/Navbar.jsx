"use client"
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { title: "Home", path: "#home", id: "home" },
    { title: "Skills", path: "#skills", id: "skills" },
    { title: "Experience", path: "#experience", id: "experience" },
    { title: "Projects", path: "#projects", id: "projects" },
    { title: "Contact", path: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible(
        (prevScrollPos > currentScrollPos) || // Scrolling up
        currentScrollPos < 10 // At the top
      );

      setPrevScrollPos(currentScrollPos);

      // Update active section based on scroll position
      const sections = navLinks.map(link => link.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    const targetId = path.substring(1); // Remove the '#'
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-4 w-full flex justify-center z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-[10dvh]'
      }`}
    >
      <div className="relative border border-accent2/30 flex justify-between items-center px-6 py-2 rounded-2xl bg-black/80 backdrop-blur-md backdrop-filter w-[95%] lg:w-[90%] xl:w-[80%] shadow-2xl">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-accent2 to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-white text-xl font-bold bg-gradient-to-r from-primary to-accent2 bg-clip-text text-transparent">
              Rishabh
            </span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <li key={link.title}>
                <a
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    activeSection === link.id
                      ? 'bg-gradient-to-r from-accent2 to-accent text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1 text-white"
          >
            <span className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-md rounded-2xl border border-accent2/30 shadow-2xl md:hidden">
            <ul className="py-4">
              {navLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className={`block px-6 py-3 text-sm font-medium transition-all duration-300 ${
                      activeSection === link.id
                        ? 'bg-gradient-to-r from-accent2 to-accent text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;