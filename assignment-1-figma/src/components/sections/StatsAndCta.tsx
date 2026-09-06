import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';

const stats = [
  { value: 48, suffix: 'h', label: 'Hydration' },
  { value: 5, suffix: '', label: 'Products', prefix: '0' },
  { value: 3, suffix: '', label: 'Hair Types' },
  { value: 0, suffix: '', label: 'Sulfates' },
];

function AnimatedCounter({ value, suffix, prefix }: { value: number; suffix: string; prefix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const num = Math.round(latest);
    return prefix ? `${prefix}${num}` : `${num}`;
  });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 2, ease: 'easeOut' });
    }
  }, [isInView, count, value]);

  return (
    <span ref={ref}>
      <motion.span className="text-5xl sm:text-6xl lg:text-7xl font-black text-brand-cyan">
        {rounded}
      </motion.span>
      {suffix && (
        <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-cyan">{suffix}</span>
      )}
    </span>
  );
}

export default function StatsAndCta() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Navy Background with Wave Top */}
      <div className="absolute top-0 left-0 w-full">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-16">
          <path d="M0 80C360 20 720 0 1080 20C1260 30 1440 60 1440 80H0Z" fill="#0B132B" />
        </svg>
      </div>

      <div className="bg-brand-navy py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - CTA Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Join the Curly Hair{' '}
                <span className="text-brand-cyan">Revolution</span>
              </h2>

              <p className="font-cursive text-lg text-white/60 italic mb-8">
                Transform your curly hair journey with expert guidance, premium
                products, and a supportive community.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-cyan hover:bg-brand-cyan-dark text-white font-semibold rounded-full transition-all hover:shadow-xl hover:shadow-brand-cyan/30 group"
                >
                  Explore Products
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
                <a
                  href="#learn"
                  className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/30 hover:border-brand-cyan text-white font-semibold rounded-full transition-all hover:bg-white/5"
                >
                  Learn Curly Girl Method
                </a>
              </div>
            </motion.div>

            {/* Right - Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-2 gap-8"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  <p className="text-white/60 text-sm mt-2 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
