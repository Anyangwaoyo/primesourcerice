import React, { useState } from 'react';
import { useApp, PageView } from '../context/AppContext.tsx';
import { useCart } from '../context/CartContext.tsx';
import { Clock, Menu, X, Phone, Wheat } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentPage, setCurrentPage, settings } = useApp();
  const { cartCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Products', page: 'shop' },
    { label: 'Bulk Orders', page: 'bulk-orders' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAE6DD] shadow-xs">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-11 h-11 rounded-lg bg-[#174D36] flex items-center justify-center text-[#C69C48] shadow-xs transition-transform group-hover:scale-105">
              <Wheat className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-[#174D36]">
                  PrimeSource
                </span>
                <span className="text-xl font-semibold tracking-tight text-[#C69C48]">
                  Rice
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-[#6B726A] font-medium hidden sm:block">
                Nasarawa Processed · Quality Assured
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-3.5 py-2 text-sm font-medium transition-colors cursor-pointer relative ${
                    isActive
                      ? 'text-[#174D36] font-semibold'
                      : 'text-[#555C57] hover:text-[#174D36]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#174D36] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Pre-Order Launch Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 sm:px-3 sm:py-2 rounded-lg bg-[#174D36] text-white hover:bg-[#0F3324] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              aria-label="Pre-Order Launch Information"
            >
              <Clock className="w-4 h-4 text-[#C69C48]" />
              <span className="text-xs font-semibold hidden sm:inline">Pre-Order</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#242A26] hover:bg-[#F3EFE6] md:hidden cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EAE6DD] bg-white px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-left px-4 py-3 text-base font-medium rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#F3EFE6] text-[#174D36] font-bold'
                      : 'text-[#242A26] hover:bg-neutral-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-3 border-t border-[#EAE6DD] flex items-center justify-end">
              <a
                href={`https://wa.me/${(settings?.whatsapp || '07030881613').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#174D36] font-semibold flex items-center gap-1.5 px-3 py-2 bg-[#F3EFE6] rounded-lg"
              >
                <Phone className="w-3.5 h-3.5 text-[#C69C48]" />
                Helpdesk & WhatsApp Orders
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
