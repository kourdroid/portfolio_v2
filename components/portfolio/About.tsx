"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const textReveal = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const imageAnimation = {
  initial: { 
    opacity: 0, 
    scale: 0.8,
    rotate: -5
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    rotate: 5,
    transition: {
      duration: 0.3
    }
  }
};

// Staggered text animation for paragraphs
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export function About() {
  return (
    <motion.section
      id="about"
      className="container py-12 md:py-20 relative overflow-hidden"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.2 }}
    >
      {/* Background decorative elements */}
      <motion.div 
        className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-primary/5 blur-3xl z-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
      <motion.div 
        className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-secondary/5 blur-3xl z-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.8 }}
      />

      <motion.div className="grid gap-10 md:grid-cols-2 relative z-10" variants={fadeInUp}>
        <motion.div className="flex flex-col items-start gap-4" variants={fadeInUp}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-2"
          >
            <Badge variant="outline" className="px-3 py-1 backdrop-blur-sm bg-background/80">
              About Me
            </Badge>
          </motion.div>

          <motion.h2 
            className="text-3xl font-bold tracking-tighter sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <motion.p 
              variants={item}
              className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
            >
              I am an experienced web developer with a strong foundation in graphic design,
              combining creative and technical expertise to deliver visually compelling and
              highly functional web applications. My career began in graphic design, where I
              developed skills in creating impactful visuals and user interfaces. This design
              background, coupled with my expertise in Figma and UI/UX design, has significantly
              influenced my approach to web development, allowing me to deliver aesthetically
              pleasing and user-centric solutions.
            </motion.p>
            <motion.p 
              variants={item}
              className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
            >
              Over the years, I have worked as a freelancer, providing customized solutions to
              clients across various industries. My professional experience encompasses the
              creation of dynamic websites and the development of complex web applications.
              I am committed to continuous learning and staying abreast of the latest industry
              trends. My objective is to utilize my diverse skill set to contribute to innovative
              projects and advance the field of web development.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex items-center justify-center" 
          variants={imageAnimation}
          whileHover="hover"
        >
          {/* Avatar with animation */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15,
              delay: 0.2
            }}
            viewport={{ once: true }}
          >
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-70 animate-pulse"></div>
            <Avatar className="h-48 w-48 md:h-64 md:w-64 border-4 border-background relative z-10">
              <AvatarImage src="/avatar/avatar.png" alt="Mehdi Kourchal" />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
          </motion.div>
        </motion.div>
      </motion.div>

      <Separator className="my-12" />
    </motion.section>
  );
}
