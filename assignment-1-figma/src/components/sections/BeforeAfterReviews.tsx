import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Al-Rashid',
    rating: 5,
    text: 'My curls have never looked better! The 48-hour hydration is real — I can go two days without needing to refresh. The shampoo is gentle yet effective.',
    image: '/assets/models/model1.jpg',
    hairType: 'Type 3B',
  },
  {
    name: 'Layla Hassan',
    rating: 5,
    text: 'Finally a product line that understands Arab hair. The conditioner is a game-changer for my coily hair. Absolutely love it!',
    image: '/assets/models/model3.jpg',
    hairType: 'Type 4A',
  },
];

export default function BeforeAfterReviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [sliderPos, setSliderPos] = useState(50);

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
            Real Results
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
            See the{' '}
            <span className="text-brand-purple">Transformation</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Before/After Slider */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-gray-200"
          >
            {/* Before Image */}
            <div className="absolute inset-0">
              <img
                src="/assets/models/model3.jpg"
                alt="Before using Hydra Curls"
                className="w-full h-full object-cover brightness-90"
              />
              <div className="absolute top-4 left-4 bg-brand-navy/80 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                Before
              </div>
            </div>

            {/* After Image (revealed by slider) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src="/assets/models/model1.jpg"
                alt="After using Hydra Curls"
                className="w-full h-full object-cover"
                style={{ minWidth: `${10000 / sliderPos}%` }}
              />
              <div className="absolute top-4 left-4 bg-brand-cyan text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                After
              </div>
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-20"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-4 bg-gray-400 rounded-full" />
                  <div className="w-0.5 h-4 bg-gray-400 rounded-full" />
                </div>
              </div>
            </div>

            {/* Slider Input */}
            <input
              type="range"
              min="5"
              max="95"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </motion.div>

          {/* Testimonials */}
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  {/* Avatar */}
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-cyan/30"
                  />
                  <div>
                    <h4 className="font-semibold text-brand-navy">{testimonial.name}</h4>
                    <span className="text-sm text-brand-purple">{testimonial.hairType}</span>
                  </div>
                  <Quote className="w-8 h-8 text-brand-cyan/20 ml-auto" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-600 leading-relaxed text-sm">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
