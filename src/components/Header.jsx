import React from 'react';

const Header = ({ onMobileMenuToggle, hideSearch }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-navy-900/80 backdrop-blur-md border-b border-navy-800 z-40 flex items-center justify-between px-4 lg:px-8">
      {/* Logo & Mobile Menu Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 hover:bg-white/5 rounded-lg text-text-secondary hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-bold text-navy-900 shadow-lg shadow-accent/20">G</div>
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block">GenUI<span className="text-accent">.</span></span>
        </div>
      </div>

      {/* Desktop Navigation & Search */}
      <div className="hidden lg:flex items-center gap-8">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search features..."
            className="bg-navy-900/50 border border-navy-700/50 rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all w-64 group-hover:bg-navy-900/80"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium text-text-secondary">
          <a href="#" className="hover:text-accent transition-colors">Workspace</a>
          <a href="#" className="hover:text-accent transition-colors">Resources</a>
          <a href="#" className="hover:text-accent transition-colors">Settings</a>
        </nav>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <ActionBtn icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>} />
        <div className="w-8 h-8 rounded-full bg-navy-700 border border-navy-600 flex items-center justify-center text-sm font-medium text-white ring-2 ring-transparent hover:ring-accent/50 transition-all cursor-pointer">
          U
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ label, active }) => (
  <button className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${active ? 'bg-navy-800 text-white' : 'text-text-secondary hover:text-white hover:bg-navy-800/50'}`}>
    {label}
  </button>
);

const NavLink = ({ label, active }) => (
  <a href="#" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active ? 'text-white bg-white/5' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}>
    {label}
  </a>
);

const ActionBtn = ({ icon }) => (
  <button
    className="p-2 rounded-full text-text-secondary hover:text-white hover:bg-white/5 transition-all duration-200"
  >
    {icon}
  </button>
);

export default Header;
