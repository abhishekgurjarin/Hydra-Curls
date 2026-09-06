import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const guides = [
  {
    tag: 'Expert Guide',
    title: 'Curly Girl Method Guide',
    description: 'Complete guide to the CGM with moodboards, tips, and step-by-step instructions designed specifically for Arab hair.',
    cta: 'EXPLORE NOW',
    image: '/assets/models/model2.jpg',
    bgColor: 'bg-brand-purple',
    imagePosition: 'left' as const,
  },
  {
    tag: 'Expert Guide',
    title: 'Curly Girl Method Guide',
    description: 'Complete guide to the CGM with moodboards, tips, and step-by-step instructions designed specifically for Arab hair.',
    cta: 'EXPLORE NOW',
    image: '/assets/models/model3.jpg',
    bgColor: 'bg-brand-pink',
    imagePosition: 'left' as const,
  },
];

export default function LearnAndGrow() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="learn" ref={ref} className="relative bg-brand-ice py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-cursive text-2xl text-brand-purple-muted mb-2 block">
            Learn & Grow
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
            Your Curly Hair{' '}
            <br className="hidden sm:block" />
            <span className="text-brand-cyan">Journey Starts Here</span>
          </h2>
          <p className="font-cursive text-lg text-gray-500 max-w-2xl mx-auto italic">
            Access expert guides, styling tips, and a community of women who celebrate
            their natural curls.
          </p>
        </motion.div>

        {/* Guide Cards */}
        <div className="space-y-8">
          {guides.map((guide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className={`grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-xl ${
                index % 2 === 0 ? '' : 'lg:direction-rtl'
              }`}
            >
              {/* Image Side */}
              <div className={`relative h-64 sm:h-80 lg:h-auto ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${
                  index % 2 === 0
                    ? 'from-transparent to-brand-cyan/20'
                    : 'from-brand-pink/20 to-transparent'
                }`} />
              </div>

              {/* Content Side */}
              <div className={`${guide.bgColor} p-8 lg:p-12 flex flex-col justify-center ${
                index % 2 === 1 ? 'lg:order-1' : ''
              }`}>
                <span className="font-cursive text-xl text-white/70 mb-2 block">
                  {guide.tag}
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  {guide.title}
                </h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  {guide.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-wider text-sm group hover:gap-3 transition-all"
                >
                  {guide.cta}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
