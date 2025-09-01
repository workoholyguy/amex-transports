"use client";

export default function Footer() {
  return (
    <section className="relative z-40 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white py-8 overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-blue-500 to-slate-300 bg-clip-text text-transparent">
              Amex Transport Inc
            </h3>
            <p className="text-slate-300 mb-4 text-sm leading-relaxed">
              Leading heavy haul transportation specialists since 2003.
            </p>
            <div className="flex space-x-3">
              <a 
                href="tel:+19375289614" 
                className="bg-gradient-to-r from-slate-600 to-slate-700 text-white p-3 rounded-lg hover:from-slate-500 hover:to-slate-600 hover:shadow-lg hover:shadow-slate-500/20 transition-all duration-300 border border-slate-500/30 group"
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">📞</span>
              </a>
              <a 
                href="mailto:amextrucks@gmail.com" 
                className="bg-gradient-to-r from-slate-600 to-slate-700 text-white p-3 rounded-lg hover:from-slate-500 hover:to-slate-600 hover:shadow-lg hover:shadow-slate-500/20 transition-all duration-300 border border-slate-500/30 group"
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">✉️</span>
              </a>
              <a 
                href="https://www.instagram.com/amex.transport" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gradient-to-r from-slate-600 to-slate-700 text-white p-3 rounded-lg hover:from-slate-500 hover:to-slate-600 hover:shadow-lg hover:shadow-slate-500/20 transition-all duration-300 border border-slate-500/30 group"
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">📷</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-white border-b border-slate-500/30 pb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/services" className="text-slate-300 hover:text-blue-400 hover:translate-x-1 transition-all duration-200 text-sm flex items-center">Services</a></li>
              <li><a href="/about" className="text-slate-300 hover:text-blue-400 hover:translate-x-1 transition-all duration-200 text-sm flex items-center">About Us</a></li>
              <li><a href="/gallery" className="text-slate-300 hover:text-blue-400 hover:translate-x-1 transition-all duration-200 text-sm flex items-center">Gallery</a></li>
              <li><a href="/contact" className="text-slate-300 hover:text-blue-400 hover:translate-x-1 transition-all duration-200 text-sm flex items-center">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-white border-b border-slate-500/30 pb-2">Services</h4>
            <ul className="space-y-2">
              <li><a href="/services" className="text-slate-300 hover:text-blue-400 hover:translate-x-1 transition-all duration-200 text-sm flex items-center">RGN Superloads</a></li>
              <li><a href="/services" className="text-slate-300 hover:text-blue-400 hover:translate-x-1 transition-all duration-200 text-sm flex items-center">Heavy Equipment</a></li>
              <li><a href="/services" className="text-slate-300 hover:text-blue-400 hover:translate-x-1 transition-all duration-200 text-sm flex items-center">Industrial Machinery</a></li>
              <li><a href="/services" className="text-slate-300 hover:text-blue-400 hover:translate-x-1 transition-all duration-200 text-sm flex items-center">Airport & Aircraft</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-600/50 mt-8 pt-6 text-center">
          <p className="text-slate-400 text-xs">
            © 2024 Amex Transport Inc. All rights reserved. | 1435 Webster St, Dayton, OH 45404 | Nationwide Coverage
          </p>
        </div>
      </div>
    </section>
  );
} 