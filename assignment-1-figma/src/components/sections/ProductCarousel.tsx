import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const products = [
  { name: 'Hydrating Shampoo', image: '/assets/products/shampoo.jpg' },
  { name: 'Premium Conditioner', image: '/assets/products/conditioner.jpg' },
  { name: 'Styling Gel', image: '/assets/products/shampoo.jpg' },
  { name: 'Hair Cream', image: '/assets/products/conditioner.jpg' },
  { name: 'Hair Mask', image: '/assets/products/shampoo.jpg' },
];

export default function ProductCarousel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextProduct = () => setActiveIndex((prev) => (prev + 1) % products.length);
  const prevProduct = () => setActiveIndex((prev) => (prev - 1 + products.length) % products.length);

  return (
    <section id="carousel" ref={ref} className="relative overflow-hidden">
      {/* Purple Arc Background */}
      <div className="relative bg-brand-purple-deep pt-24 pb-32 lg:pt-32 lg:pb-40">
        {/* Arc Shape - Top */}
        <div className="absolute top-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" className="w-full h-20 lg:h-28">
            <ellipse cx="720" cy="-80" rx="900" ry="200" fill="#3D1E6D" />
          </svg>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-purple-deep via-brand-purple to-brand-purple-deep opacity-90" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Product Display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-8 lg:gap-16"
          >
            {/* Previous Arrow */}
            <button
              onClick={prevProduct}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all border border-white/20 shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Main Product */}
            <div className="relative flex flex-col items-center">
              {/* Glow Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-brand-purple-light/50 to-pink-300/30 blur-sm" />
              
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <img
                  src={products[activeIndex].image}
                  alt={products[activeIndex].name}
                  className="w-48 sm:w-56 lg:w-64 h-auto drop-shadow-2xl"
                />
              </motion.div>

              {/* Product Name */}
              <motion.h3
                key={`name-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="text-white text-xl lg:text-2xl font-bold mt-6 text-center"
              >
                {products[activeIndex].name}
              </motion.h3>
            </div>

            {/* Next Arrow */}
            <button
              onClick={nextProduct}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all border border-white/20 shrink-0"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Thumbnail Selector */}
          <div className="flex items-center justify-center gap-3 mt-10">
            {products.map((product, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full border-2 overflow-hidden transition-all ${
                  index === activeIndex
                    ? 'border-brand-cyan scale-110 shadow-lg shadow-brand-cyan/30'
                    : 'border-white/20 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Curved Text at Bottom */}
      <div className="relative bg-brand-ice-blue pt-16 pb-8">
        {/* Arc Shape Bottom */}
        <div className="absolute -top-16 left-0 w-full">
          <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" className="w-full h-20">
            <path d="M0 100C360 20 720 0 1080 20C1260 30 1440 60 1440 100H0Z" fill="#E0F4FD" />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <svg viewBox="0 0 800 200" className="w-full max-w-3xl mx-auto h-auto opacity-15">
            <defs>
              <path id="curvePath" d="M 50 150 Q 400 0 750 150" fill="none" />
            </defs>
            <text className="text-4xl font-cursive" fill="#6B3FA0">
              <textPath href="#curvePath" startOffset="50%" textAnchor="middle">
                Experience the power of hydration in every drop.
              </textPath>
            </text>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
