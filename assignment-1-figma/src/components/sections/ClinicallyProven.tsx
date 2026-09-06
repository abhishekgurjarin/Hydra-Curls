import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Droplets, Shield, Clock, Sparkles } from 'lucide-react';

const benefits = [
  {
    icon: Droplets,
    title: 'Deep Moisture',
    description: 'Hyaluronic Acid penetrates deep into each strand, locking in moisture for up to 48 hours.',
    stat: '3x',
    statLabel: 'More Hydration',
  },
  {
    icon: Shield,
    title: 'Strengthens Hair',
    description: 'Coconut oil and avocado extract fortify hair from root to tip, reducing breakage by up to 80%.',
    stat: '80%',
    statLabel: 'Less Breakage',
  },
  {
    icon: Sparkles,
    title: 'Defines Curls',
    description: 'Advanced curl-defining formula enhances your natural curl pattern for bouncy, defined curls.',
    stat: '95%',
    statLabel: 'Curl Definition',
  },
  {
    icon: Clock,
    title: '48-Hour Hold',
    description: 'Long-lasting formula keeps your curls hydrated, defined, and frizz-free for up to 48 hours.',
    stat: '48h',
    statLabel: 'Hydration',
  },
];

export default function ClinicallyProven() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative bg-brand-ice py-20 lg:py-28 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, #00C9E8 1px, transparent 1px), radial-gradient(circle at 75% 75%, #3D1E6D 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-cyan font-semibold text-sm uppercase tracking-widest mb-3 block">
            Clinically Proven
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
            Science Behind{' '}
            <span className="text-brand-purple">Beautiful Curls</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our advanced formula combines the best of nature and science to deliver
            unparalleled hydration and curl definition.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-brand-cyan/30"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10 flex items-center justify-center mb-4 group-hover:from-brand-cyan/20 group-hover:to-brand-purple/20 transition-all">
                <benefit.icon className="w-7 h-7 text-brand-cyan" />
              </div>

              {/* Stat */}
              <div className="mb-3">
                <span className="text-3xl font-black text-brand-purple-deep">{benefit.stat}</span>
                <span className="text-sm text-gray-500 ml-2">{benefit.statLabel}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-brand-navy mb-2">{benefit.title}</h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* 48 Hours Large Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center mt-16"
        >
          <div className="relative">
            <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center shadow-xl shadow-brand-purple/30 animate-pulse-glow">
              <div className="text-center">
                <span className="text-5xl lg:text-6xl font-black text-white block">48</span>
                <span className="text-white/80 text-sm uppercase tracking-wider">Hours</span>
                <span className="text-white/60 text-xs block">Hydration</span>
              </div>
            </div>
            {/* Clock Icon Overlay */}
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-brand-cyan" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
