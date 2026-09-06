import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function BrandBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Purple Curved Background */}
      <div className="relative bg-brand-purple-deep py-20 lg:py-28">
        {/* Top Curve */}
        <div className="absolute top-0 left-0 w-full">
          <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-16 lg:h-20">
            <path d="M0 80V40C240 0 480 0 720 20C960 40 1200 80 1440 60V80H0Z" fill="#E0F4FD" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Brand Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white font-bold">PA</span>
                </div>
                <div>
                  <span className="text-white/60 text-xs uppercase tracking-wider block">Parachute</span>
                  <span className="text-white font-bold text-sm uppercase tracking-widest">ADVANSED</span>
                </div>
              </div>

              {/* Cursive Title */}
              <h2 className="font-cursive text-6xl sm:text-7xl lg:text-8xl text-brand-cyan-light leading-none mb-4">
                Hydra
                <br />
                <span className="text-white">Curls</span>
              </h2>

              {/* 48 Hour Badge */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20 mb-6">
                <span className="text-3xl lg:text-4xl font-black text-white">48</span>
                <div>
                  <span className="text-white/80 text-sm uppercase tracking-wider block">HOUR</span>
                  <span className="text-brand-cyan-light text-xs uppercase tracking-wider">HYDRATION</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Product Lineup & Model */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="flex items-end justify-center gap-4">
                {/* Product Bottles */}
                <img
                  src="/assets/products/shampoo.jpg"
                  alt="Hydra Curls Shampoo"
                  className="w-28 sm:w-36 lg:w-40 h-auto drop-shadow-xl animate-float"
                  loading="lazy"
                />
                <img
                  src="/assets/products/conditioner.jpg"
                  alt="Hydra Curls Conditioner"
                  className="w-32 sm:w-40 lg:w-48 h-auto drop-shadow-xl animate-float"
                  style={{ animationDelay: '1s' }}
                  loading="lazy"
                />
              </div>

              {/* Model Overlay */}
              <div className="absolute -right-4 -top-8 w-40 lg:w-52 opacity-90">
                <img
                  src="/assets/models/model1.jpg"
                  alt="Curly hair model"
                  className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                  style={{ maxHeight: '300px' }}
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>

          {/* Bottom Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="font-cursive text-2xl sm:text-3xl text-white/80 italic">
              Designed for{' '}
              <span className="text-brand-cyan-light">Arab Curly, Coily</span>
              <br />
              <span className="text-brand-cyan-light">& Wavy Hair</span>
            </p>
          </motion.div>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-16 lg:h-20">
            <path d="M0 0V40C240 80 480 60 720 40C960 20 1200 0 1440 20V0H0Z" fill="#E0F4FD" />
          </svg>
        </div>
      </div>
    </section>
  );
}
