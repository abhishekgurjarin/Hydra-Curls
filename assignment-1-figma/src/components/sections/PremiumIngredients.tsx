import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ingredients = [
  {
    title: 'Hyaluronic Acid',
    description: 'Hyaluronic Acid acts like a magnet for moisture, drawing hydration into each strand. Hyaluronic Acid acts like a magnet for moisture, drawing hydration into each strand. Hyaluronic Acid acts like a magnet for moisture, drawing hydration into each strand.',
    color: 'from-brand-cyan/5 to-brand-ice-blue',
    borderColor: 'border-brand-cyan/20',
    bgImage: 'linear-gradient(135deg, #E0F4FD 0%, #F0F9FF 100%)',
  },
  {
    title: 'Coconut & Avocado',
    description: 'Hyaluronic Acid acts like a magnet for moisture, drawing hydration into each strand. Hyaluronic Acid acts like a magnet for moisture, drawing hydration into each strand. Hyaluronic Acid acts like a magnet for moisture, drawing hydration into each strand.',
    color: 'from-white to-brand-ice',
    borderColor: 'border-gray-200',
    bgImage: 'linear-gradient(135deg, #FFFFFF 0%, #F0F9FF 100%)',
  },
];

export default function PremiumIngredients() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="ingredients" ref={ref} className="relative bg-brand-ice py-20 lg:py-28 overflow-hidden">
      {/* Wavy top separator */}
      <div className="absolute top-0 left-0 w-full">
        <svg viewBox="0 0 1440 40" fill="none" preserveAspectRatio="none" className="w-full h-8">
          <path d="M0 40C360 10 720 10 1080 20C1260 25 1440 40 1440 40H0Z" fill="#F0F9FF" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className={`rounded-3xl p-8 lg:p-10 border ${ingredient.borderColor} bg-gradient-to-br ${ingredient.color} shadow-sm hover:shadow-xl transition-all duration-300 group`}
            >
              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-4">
                {ingredient.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6">
                {ingredient.description}
              </p>

              {/* CTA */}
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-cyan hover:bg-brand-cyan-dark text-white font-semibold rounded-full transition-all group-hover:shadow-lg group-hover:shadow-brand-cyan/30"
              >
                Learn More
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Product Line Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-end gap-4 sm:gap-6">
            <img
              src="/assets/products/shampoo.jpg"
              alt="Hydra Curls Shampoo"
              className="w-24 sm:w-32 lg:w-36 h-auto drop-shadow-xl hover:scale-105 transition-transform"
              loading="lazy"
            />
            <img
              src="/assets/products/conditioner.jpg"
              alt="Hydra Curls Conditioner"
              className="w-28 sm:w-36 lg:w-44 h-auto drop-shadow-xl hover:scale-105 transition-transform"
              loading="lazy"
            />
            <img
              src="/assets/products/shampoo.jpg"
              alt="Hydra Curls Styling Gel"
              className="w-20 sm:w-28 lg:w-32 h-auto drop-shadow-xl hover:scale-105 transition-transform"
              loading="lazy"
            />
            <img
              src="/assets/products/conditioner.jpg"
              alt="Hydra Curls Hair Cream"
              className="w-20 sm:w-28 lg:w-32 h-auto drop-shadow-xl hover:scale-105 transition-transform"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>

      {/* Cloud/wave bottom separator */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-12 lg:h-16">
          <path d="M0 0C120 40 360 60 600 50C840 40 1080 20 1320 30C1380 33 1410 38 1440 40V60H0V0Z" fill="#3D1E6D" />
        </svg>
      </div>
    </section>
  );
}
