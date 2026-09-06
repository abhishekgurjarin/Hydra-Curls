import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const hairTypes = [
  {
    type: 'Type 2',
    label: 'Wavy',
    description: 'Loose, S-shaped waves that need lightweight moisture without weighing down.',
    image: '/assets/models/model2.jpg',
    gradient: 'from-purple-600 to-purple-800',
  },
  {
    type: 'Type 3',
    label: 'Curly',
    description: 'Defined spirals and ringlets that thrive with deep hydration and curl definition.',
    image: '/assets/models/model1.jpg',
    gradient: 'from-purple-700 to-indigo-900',
  },
  {
    type: 'Type 4',
    label: 'Coily',
    description: 'Tight coils and z-pattern curls that need intense moisture and gentle care.',
    image: '/assets/models/model3.jpg',
    gradient: 'from-purple-800 to-purple-950',
  },
];

export default function HairTypesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative bg-brand-ice py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-cyan font-semibold text-sm uppercase tracking-widest mb-3 block">
            Made For You
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
            Your Hair,{' '}
            <span className="text-brand-purple">Your Type</span>
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Hydra Curls is designed for hair types 2, 3, and 4 — from loose waves to tight coils.
          </p>
        </motion.div>

        {/* Hair Type Cards */}
        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
          {hairTypes.map((type, index) => (
            <motion.div
              key={type.type}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`group relative rounded-3xl overflow-hidden bg-gradient-to-b ${type.gradient} shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
            >
              {/* Model Image */}
              <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
                <img
                  src={type.image}
                  alt={`${type.label} hair model`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-brand-cyan font-bold text-lg">{type.type}</span>
                  <span className="text-white/60">—</span>
                  <span className="text-white font-semibold">{type.label}</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{type.description}</p>
                
                {/* CTA */}
                <a href="#products" className="inline-flex items-center gap-1 text-brand-cyan text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
                  Shop for {type.label} Hair
                  <span>→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
