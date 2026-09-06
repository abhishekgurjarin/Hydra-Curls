import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ProductOverview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="products"
      ref={ref}
      className="relative bg-brand-ice-blue py-20 lg:py-28 overflow-hidden"
    >
      {/* Water texture background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_20px,rgba(0,201,232,0.03)_20px,rgba(0,201,232,0.03)_40px)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Brand Badge */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-cursive text-2xl text-brand-purple-deep">
                Hydra Curls
              </span>
            </div>

            {/* Description */}
            <p className="font-cursive text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
              Revolutionary hair care range specially designed for Arab curly, coily &
              wavy hair. Experience{' '}
              <span className="text-brand-cyan font-semibold underline decoration-brand-cyan">
                48-hour hydration
              </span>{' '}
              with natural ingredients like Hyaluronic Acid, Coconut & Avocado.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: '✓', text: 'No SLS, Silicones, Parabens', color: 'text-green-600' },
                { icon: '💧', text: '48-Hour Hydration', color: 'text-brand-cyan' },
                { icon: '✨', text: 'Hair Types 2, 3, 4', color: 'text-brand-purple' },
              ].map((pill) => (
                <div
                  key={pill.text}
                  className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100"
                >
                  <span className={`${pill.color} text-sm`}>{pill.icon}</span>
                  <span className="text-gray-700 text-sm">{pill.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#carousel"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-brand-cyan hover:bg-brand-cyan-dark text-white font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-brand-cyan/30 group"
              >
                Explore Products
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="#learn"
                className="inline-flex items-center justify-center px-7 py-3 border-2 border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-white font-semibold rounded-full transition-all"
              >
                Learn Curly Girl Method
              </a>
            </div>
          </motion.div>

          {/* Right - Product Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center"
          >
            {/* Decorative Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10 blur-3xl" />
            
            {/* Palm Leaf Decoration */}
            <div className="absolute -top-8 -right-4 w-32 h-32 opacity-20">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                <path d="M80 10 C60 30, 40 50, 50 90 C60 60, 70 40, 90 20 Z" fill="#22c55e" />
                <path d="M85 15 C65 35, 45 55, 55 90 C65 60, 75 40, 95 20 Z" fill="#16a34a" opacity="0.5" />
              </svg>
            </div>

            {/* Product Image */}
            <div className="relative z-10 animate-float">
              <img
                src="/assets/products/shampoo.jpg"
                alt="Hydra Curls Hydrating Shampoo"
                className="w-64 sm:w-72 lg:w-80 h-auto drop-shadow-2xl"
                loading="lazy"
              />
              {/* Water Splash Effect - CSS pseudo */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 bg-brand-cyan/10 rounded-full blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
