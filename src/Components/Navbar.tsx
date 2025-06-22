import { useEffect, useMemo, useState } from "react";

import logo from "../assets/logo.png";
import logoMobile from "../assets/logo-mobile.png";

interface NavLink {
  title: string;
  id: string;
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks: NavLink[] = useMemo(
    () => [
      { title: "How it works", id: "how-it-works" },
      { title: "Roadmap", id: "roadmap" },
    ],
    []
  );

  const handleNavClick = (id: string): void => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleAboutClick = (): void => {
    window.scrollTo({ top: 550, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const handleMobileAboutClick = (): void => {
    window.scrollTo({ top: 250, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = (): void => {
      setHasScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.id);
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out px-4 md:px-8 ${
          hasScrolled
            ? "bg-[#0e0e0e]/95 backdrop-blur-xl shadow-2xl border-b border-white/5"
            : "bg-transparent"
        }`}
        style={{
          transform: hasScrolled ? "translateY(0)" : "translateY(0)",
        }}
      >
        <div className="max-w-7xl mx-auto py-4 flex items-center justify-between relative">
          {/* Logo with enhanced animations */}
          <div className="relative group">
            <img
              src={logo}
              alt="Logo"
              width={180}
              height={36}
              onClick={scrollToTop}
              className="hidden md:block cursor-pointer transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95"
            />
            <img
              src={logoMobile}
              alt="Logo"
              width={115}
              height={28}
              onClick={scrollToTop}
              className="md:hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#DCA685]/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 font-medium text-[16px]">
            <li className="relative group">
              <button
                className="cursor-pointer text-white/90 hover:text-[#DCA685] transition-all duration-300 py-2 px-3 rounded-lg hover:bg-white/5 active:scale-95"
                onClick={handleAboutClick}
              >
                <span className="relative z-10">About</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#DCA685]/10 to-[#DCA685]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
              </button>
            </li>

            {navLinks.map((link) => (
              <li key={link.title} className="relative group">
                <button
                  className={`cursor-pointer transition-all duration-300 py-2 px-3 rounded-lg hover:bg-white/5 active:scale-95 ${
                    activeSection === link.id
                      ? "text-[#DCA685] bg-white/5"
                      : "text-white/90 hover:text-[#DCA685]"
                  }`}
                  onClick={() => handleNavClick(link.id)}
                >
                  <span className="relative z-10">{link.title}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#DCA685]/10 to-[#DCA685]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
                </button>
                {activeSection === link.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#DCA685] rounded-full animate-pulse"></div>
                )}
              </li>
            ))}

            <li className="relative group">
              <a
                href="https://t.me/cryptoyan_chat"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="relative overflow-hidden w-[140px] h-[44px] flex items-center justify-center border border-white/20 rounded-[35px] text-white hover:text-[#DCA685] transition-all duration-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-[#DCA685]/20 hover:shadow-xl uppercase text-sm font-medium backdrop-blur-sm">
                  <span className="relative z-10 transition-all duration-300">
                    Let's talk
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#DCA685]/20 to-[#DCA685]/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[35px]"></div>
                  <div className="absolute inset-0 border border-[#DCA685]/50 rounded-[35px] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </button>
              </a>
            </li>

            <li className="cursor-pointer hover:text-[#DCA685] md:block hidden relative group">
              <button className="z-[60] p-2 rounded-lg hover:bg-white/5 transition-all duration-300 active:scale-95">
                <div className="w-7 h-3 relative flex flex-col justify-between">
                  <div className="w-full h-0.5 bg-current rounded-full transition-all duration-300 group-hover:w-5/6"></div>
                  <div className="w-full h-0.5 bg-current rounded-full"></div>
                  <div className="w-full h-0.5 bg-current rounded-full transition-all duration-300 group-hover:w-4/6"></div>
                </div>
              </button>
            </li>
          </ul>

          {/* Mobile Hamburger with enhanced animation */}
          <button
            className="block md:hidden z-[60] p-2 rounded-lg hover:bg-white/10 transition-all duration-300 active:scale-95 relative group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-7 h-6 relative flex flex-col justify-center">
              <div
                className={`w-full h-0.5 bg-white rounded-full absolute transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "rotate-45 translate-y-0"
                    : "translate-y-[-8px]"
                }`}
              />
              <div
                className={`w-full h-0.5 bg-white rounded-full absolute transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "opacity-0 scale-0"
                    : "opacity-100 scale-100"
                }`}
              />
              <div
                className={`w-full h-0.5 bg-white rounded-full absolute transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "-rotate-45 translate-y-0"
                    : "translate-y-[8px]"
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute top-0 right-0 w-80 h-full bg-gradient-to-br from-[#0e0e0e]/95 via-[#1a1a1a]/95 to-[#0e0e0e]/95 backdrop-blur-xl border-l border-white/10 flex flex-col transition-all duration-500 ease-out ${
            isMobileMenuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <div className="pt-20 pb-8 px-8 flex-1 flex flex-col">
            <div className="space-y-6">
              <div
                className={`transition-all duration-700 ${
                  isMobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                <button
                  className="block w-full text-left text-white/90 hover:text-[#DCA685] transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/5 text-lg font-medium active:scale-95"
                  onClick={handleMobileAboutClick}
                >
                  About
                </button>
              </div>

              {navLinks.map((link, index) => (
                <div
                  key={link.id}
                  className={`transition-all duration-700 ${
                    isMobileMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <button
                    className={`block w-full text-left transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/5 text-lg font-medium active:scale-95 ${
                      activeSection === link.id
                        ? "text-[#DCA685] bg-white/5"
                        : "text-white/90 hover:text-[#DCA685]"
                    }`}
                    onClick={() => handleNavClick(link.id)}
                  >
                    {link.title}
                  </button>
                </div>
              ))}
            </div>

            <div
              className={`mt-auto transition-all duration-700 ${
                isMobileMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <a
                href="https://t.me/cryptoyan_chat"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="relative overflow-hidden w-full h-[52px] flex items-center justify-center border border-white/20 rounded-[35px] text-white hover:text-[#DCA685] transition-all duration-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-[#DCA685]/20 hover:shadow-xl font-medium backdrop-blur-sm group">
                  <span className="relative z-10 transition-all duration-300">
                    Let's talk
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#DCA685]/20 to-[#DCA685]/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[35px]"></div>
                  <div className="absolute inset-0 border border-[#DCA685]/50 rounded-[35px] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
