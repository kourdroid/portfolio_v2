"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Animation variants
const sectionFadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// FAQ data
const faqItems = [
  {
    question: "What services do you offer?",
    answer: "I specialize in full-stack web development, focusing on Next.js, React, and Laravel. My services include responsive web design, frontend and backend development, UI/UX design, and consulting on technical solutions for businesses of all sizes."
  },
  {
    question: "What is your development process?",
    answer: "My development process typically involves: 1) Understanding requirements through detailed discussions, 2) Creating wireframes and prototypes, 3) Developing the solution with regular check-ins, 4) Testing across devices and browsers, 5) Deployment, and 6) Ongoing support and maintenance as needed."
  },
  {
    question: "How long does it take to complete a project?",
    answer: "Project timelines vary based on complexity, scope, and specific requirements. A simple website might take 2-4 weeks, while a complex web application could take several months. I always provide a detailed timeline estimate after understanding your project requirements."
  },
  {
    question: "Do you offer maintenance services after project completion?",
    answer: "Yes, I offer ongoing maintenance and support services to ensure your website or application continues to function optimally. This includes regular updates, security patches, performance optimization, and addressing any issues that may arise."
  },
  {
    question: "Can you work with existing codebases?",
    answer: "Absolutely. I have experience working with existing projects, whether it's adding new features, fixing bugs, improving performance, or modernizing outdated code. I'm comfortable diving into established codebases and collaborating with existing development teams."
  },
  {
    question: "Are you available for freelance or contract work?",
    answer: "Yes, I'm available for freelance projects, contract work, and consulting engagements. I can work remotely with teams around the world and adapt to different time zones as needed."
  },
  {
    question: "How do you handle project communication?",
    answer: "I believe in clear, consistent communication. Depending on your preference, we can use tools like Slack, Microsoft Teams, or email for day-to-day updates. For project management, I'm comfortable with Jira, Trello, Asana, or similar tools. I also schedule regular video calls to discuss progress and address any questions."
  },
  {
    question: "What technologies do you specialize in?",
    answer: "My core expertise includes React, Next.js, TypeScript, TailwindCSS, and Laravel. I'm also proficient with Python/Django, database design, RESTful APIs, and modern frontend development practices. I continuously learn new technologies to stay current with industry trends."
  }
];

export function FAQ() {
  return (
    <motion.section
      id="faq"
      className="container py-12 md:py-20"
      variants={sectionFadeIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="flex flex-col items-start gap-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
        <p className="text-muted-foreground md:text-xl/relaxed max-w-2xl">
          Common questions about my services, process, and expertise.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div 
          className="space-y-4"
          variants={itemVariants}
          transition={{ staggerChildren: 0.1 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.slice(0, Math.ceil(faqItems.length / 2)).map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div 
          className="space-y-4"
          variants={itemVariants}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.slice(Math.ceil(faqItems.length / 2)).map((item, index) => (
              <AccordionItem key={index} value={`item-${index + Math.ceil(faqItems.length / 2)}`}>
                <AccordionTrigger className="text-left font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
      
      <Separator className="my-12" />
    </motion.section>
  );
}
