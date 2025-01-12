"use client"
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Projects", path: "/projects" },
    { title: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      setVisible(
        (prevScrollPos > currentScrollPos) || // Scrolling up
        currentScrollPos < 10 // At the top
      );
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <nav 
      className={`
        fixed top-0 w-full bg-secondary backdrop-blur-sm z-50 shadow-sm
        transition-transform duration-300
        ${visible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">Rishabh</div>
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.title}>
                <a
                  href={link.path}
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;