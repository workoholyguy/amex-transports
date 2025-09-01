'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile, getAnimationVariants } from '../hooks/useIsMobile';

export default function ContactForm() {
  const isMobile = useIsMobile();
  const variants = getAnimationVariants(isMobile);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        alert(`Error: ${result.error || 'Failed to send message. Please try again.'}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Visit Us",
      details: [
        { text: "1435 Webster St, Dayton, OH 45404", action: "map", url: "https://maps.google.com/?q=1435+Webster+St+Dayton+OH+45404" },
      ]
    },
    {
      icon: "📞",
      title: "Call Us",
      details: [
        { text: "(937) 528-9614", action: "tel", url: "tel:9375289614" },
        { text: "24/7 Dispatch Available", action: "none" }
      ]
    },
    {
      icon: "✉️",
      title: "Email Us",
      details: [
        { text: "amextrucks@gmail.com", action: "email", url: "mailto:amextrucks@gmail.com" },
        { text: "Dispatch Available", action: "none" },
        { text: "Quote Requests Welcome", action: "none" }
      ]
    },
    {
      icon: "📷",
      title: "Follow Us",
      details: [
        { text: "@amex.transport", action: "social", url: "https://www.instagram.com/amex.transport" },
        { text: "Latest Projects & Updates", action: "none" }
      ]
    }
  ];

  const serviceOptions = [
    "RGN Superload Transport",
    "Heavy Equipment Hauling",
    "Industrial Machinery",
    "Airport & Aircraft Transport",
    "Oil & Gas Equipment",
    "Military & Government",
    "Other"
  ];

  return (
    <section className="min-content py-4 bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white" id="get-in-touch">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div 
            initial={{ x: isMobile ? 0 : -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: isMobile ? 0.2 : 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent">
                Get In Touch
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Ready to move your heavy haul or specialized load? Contact us for a free quote and consultation with our experienced team.
              </p>
            </div>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index} 
                  initial={{ x: isMobile ? 0 : -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: isMobile ? 0.2 : 0.6, delay: isMobile ? 0 : index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3 bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-gray-500/50 transition-all duration-300"
                >
                  <div className="text-2xl">{info.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{info.title}</h3>
                    <div className="space-y-0.5">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-sm text-gray-300">
                          {detail.action === "none" ? (
                            detail.text
                          ) : (
                            <a
                              href={detail.url}
                              target={detail.action === "map" || detail.action === "social" ? "_blank" : "_self"}
                              rel={detail.action === "map" || detail.action === "social" ? "noopener noreferrer" : ""}
                              className="text-gray-400 hover:text-gray-300 hover:underline transition-colors duration-200 cursor-pointer"
                              title={
                                detail.action === "tel" ? "Click to call" :
                                detail.action === "email" ? "Click to email" :
                                detail.action === "map" ? "Click to open in maps" :
                                detail.action === "social" ? "Click to visit Instagram" : ""
                              }
                            >
                              {detail.text}
                            </a>
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ x: isMobile ? 0 : 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: isMobile ? 0.2 : 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-800/30 backdrop-blur-sm text-white rounded-xl p-6 border border-slate-600/30 shadow-2xl shadow-gray-500/25"
          >
            <h3 className="text-xl font-bold mb-4 text-white">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500/50 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 text-sm"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500/50 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 text-sm"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500/50 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 text-sm"
                    placeholder="(937) 528-9614"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-xs font-medium text-gray-300 mb-1">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500/50 text-white backdrop-blur-sm transition-all duration-300 text-sm"
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-gray-300 mb-1">
                  Message *
                </label>
                                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500/50 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 text-sm"
                    placeholder="Tell us about your heavy haul and specialized transportation needs..."
                  />
              </div>

              <motion.button
                whileHover={isMobile ? {} : { scale: 1.02 }}
                whileTap={isMobile ? {} : { scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-gray-600 to-slate-700 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-400/30 text-sm"
              >
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 