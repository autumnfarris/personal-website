'use client';

import Image from 'next/image';
import Button from '../ui/Button';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function Hero() {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-red-50/40" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hi, I&apos;m{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                Autumn
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl text-gray-700 mb-4 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Full Stack Developer
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-600 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              I create intuitive, scalable applications that bridge the gap between 
              complex technical requirements and exceptional user experiences.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button href="/contact" size="lg" className="shadow-xl">
                Let&apos;s Connect
              </Button>
              <Button href="/experience" variant="outline" size="lg">
                View My Work
              </Button>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div 
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-amber-400/30 to-orange-400/30 rounded-2xl transform rotate-3" />
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-orange-400/30 to-red-400/30 rounded-2xl transform -rotate-3" />
              
              {/* Main image */}
              <div className="relative w-80 h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={process.env.NODE_ENV === 'production' ? '/personal-website/autumn_new.jpg' : '/autumn_new.jpg'}
                  alt="Autumn Farris - Full Stack Developer"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
			 {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <button
            onClick={scrollToAbout}
            className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            aria-label="Scroll to about section"
          >
            <ChevronDownIcon className="h-6 w-6 text-gray-700 animate-bounce" />
          </button>
        </motion.div>
    </section>
  );
}