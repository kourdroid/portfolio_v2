"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Floating animation for decorative elements
const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut"
  }
};

// Pulse animation for highlight elements
const pulseAnimation = {
  scale: [1, 1.05, 1],
  opacity: [0.7, 1, 0.7],
  transition: {
    duration: 3,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut"
  }
};

export function Hero() {
  return (
    <section 
      id="hero" 
      className="relative overflow-hidden bg-background w-full min-h-screen mx-auto flex flex-row items-center" 
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-[-1]"></div>
      
      {/* Animated decorative elements */}
      <motion.div 
        className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl z-0"
        animate={pulseAnimation}
      />
      <motion.div 
        className="absolute bottom-20 left-[5%] w-40 h-40 rounded-full bg-secondary/10 blur-3xl z-0"
        animate={{
          ...pulseAnimation,
          transition: { 
            ...pulseAnimation.transition, 
            delay: 1 
          }
        }}
      />
      
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(128,128,128,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              x: [0, Math.random() * 50 - 25],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container w-full mx-auto relative z-10 pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-32 lg:pb-24">
        <motion.div
          className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Subtitle */}
          <motion.div variants={itemVariants} className="inline-block">
            <motion.span 
              className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary/10 text-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Full-Stack Developer
            </motion.span>
          </motion.div>
          
          {/* Main heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl "
          >
            Hi, I'm <motion.span 
              className="text-black dark:text-primary"
              whileHover={{ 
                scale: 1.05, 
                color: "#4f46e5", 
                transition: { duration: 0.2 } 
              }}
            >
              Mehdi Kourchal
            </motion.span>
          </motion.h1>
          
          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="max-w-[700px] text-lg text-muted-foreground sm:text-xl md:text-2xl"
          >
            Full-Stack Developer | Cisco Certified | Next.js & Laravel Developer | UI/UX Designer
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="relative z-10 flex flex-wrap gap-4 justify-center">
            <Link href="#projects">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="group relative z-10">
                  View My Work
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
            <Link href="#contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="relative z-10">
                  Contact Me
                </Button>
              </motion.div>
            </Link>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </motion.div>
        </motion.div> 
      </div>
      
      {/* Decorative floating shapes */}
      <motion.div 
        className="absolute -bottom-10 -right-10 w-40 h-40 md:w-64 md:h-64 opacity-20 z-0"
        animate={floatingAnimation}
      >
        <div className="w-full h-full rounded-full bg-primary/30 blur-xl"></div>
      </motion.div>
    </section>
  );
}
