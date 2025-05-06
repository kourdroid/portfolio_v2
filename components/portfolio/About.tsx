"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export function About() {
  return (
    <motion.section
      id="about"
      className="container py-12 md:py-20"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.2 }}
    >
      <motion.div className="grid gap-10 md:grid-cols-2" variants={fadeInUp}>
        <motion.div className="flex flex-col items-start gap-4" variants={fadeInUp}>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About Me</h2>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            I am an experienced web developer with a strong foundation in graphic design,
            combining creative and technical expertise to deliver visually compelling and
            highly functional web applications. My career began in graphic design, where I
            developed skills in creating impactful visuals and user interfaces. This design
            background, coupled with my expertise in Figma and UI/UX design, has significantly
            influenced my approach to web development, allowing me to deliver aesthetically
            pleasing and user-centric solutions.
          </p>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Over the years, I have worked as a freelancer, providing customized solutions to
            clients across various industries. My professional experience encompasses the
            creation of dynamic websites and the development of complex web applications.
            I am committed to continuous learning and staying abreast of the latest industry
            trends. My objective is to utilize my diverse skill set to contribute to innovative
            projects and advance the field of web development.
          </p>
        </motion.div>
        <motion.div className="flex items-center justify-center" variants={fadeInUp}>
          {/* Optional: Add an image of yourself here */}
          <Avatar className="h-48 w-48 md:h-64 md:w-64">
            <AvatarImage src="/avatar/avatar.png" alt="Mehdi Kourchal" />
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
        </motion.div>
      </motion.div>
      <Separator className="my-12" />
    </motion.section>
  );
}
