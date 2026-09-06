import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Play } from 'lucide-react';

const influencers = [
  { name: 'Nour Al-Karim', handle: '@nourcurls', image: '/assets/models/model1.jpg', views: '245K' },
  { name: 'Fatima Beauty', handle: '@fatimabeauty', image: '/assets/models/model2.jpg', views: '189K' },
  { name: 'Mariam Waves', handle: '@mariamwaves', image: '/assets/models/model3.jpg', views: '312K' },
  { name: 'Zara Curly', handle: '@zaracurly', image: '/assets/models/model1.jpg', views: '178K' },
];

export default function InfluencerSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative bg-brand-navy py-20 lg:py-28 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #00C9E8 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-brand-cyan font-semibold text-sm uppercase tracking-widest mb-3 block">
            As Seen On
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Loved by{' '}
            <span className="text-brand-cyan">Influencers</span>
          </h2>
          <p className="text-white/60 max-w-lg mx-auto">
            See how top beauty influencers use Hydra Curls in their daily routine.
          </p>
        </motion.div>

        {/* Influencer Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {influencers.map((influencer, index) => (
            <motion.div
              key={influencer.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <img
                src={influencer.image}
                alt={influencer.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 rounded-full bg-brand-cyan/90 flex items-center justify-center shadow-xl">
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                </div>
              </div>

              {/* Views Badge */}
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {influencer.views} views
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-white font-semibold text-sm">{influencer.name}</h4>
                <span className="text-brand-cyan text-xs">{influencer.handle}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
