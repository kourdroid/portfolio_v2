"use client";

import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { 
  FaReact, FaHtml5, FaCss3Alt, FaPython, FaFigma, 
  FaDatabase, FaCode, FaServer, FaPalette
} from "react-icons/fa";
import { 
  SiNextdotjs, SiTailwindcss, SiJavascript, SiTypescript, 
  SiDjango, SiRedux,
  SiPhp, SiMysql, SiLaravel
} from "react-icons/si";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

// Animation variants
const sectionFadeIn = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.6,
      staggerChildren: 0.1 
    }
  }
};

const categoryVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const skillCardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: { 
    y: -5, 
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    transition: { 
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

const iconAnimation = {
  initial: { scale: 0.8, rotate: -10, opacity: 0.5 },
  animate: { 
    scale: 1, 
    rotate: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 200,
      damping: 10
    }
  },
  hover: { 
    scale: 1.2, 
    rotate: 5,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};

// Define your skills with proficiency levels and icons
const skills = [
  { 
    name: "React", 
    category: "Frontend", 
    proficiency: 90,
    icon: FaReact,
    color: "bg-blue-500",
    description: "Building interactive UIs with React and its ecosystem"
  },
  { 
    name: "Next.js", 
    category: "Frontend", 
    proficiency: 85,
    icon: SiNextdotjs,
    color: "bg-black dark:bg-zinc-800",
    description: "Creating performant, SEO-friendly React applications"
  },
  { 
    name: "TailwindCSS", 
    category: "Frontend", 
    proficiency: 95,
    icon: SiTailwindcss,
    color: "bg-sky-500",
    description: "Crafting responsive designs with utility-first CSS"
  },
  { 
    name: "JavaScript", 
    category: "Frontend", 
    proficiency: 90,
    icon: SiJavascript,
    color: "bg-yellow-400",
    description: "Developing dynamic web applications with modern JavaScript"
  },
  { 
    name: "TypeScript", 
    category: "Frontend", 
    proficiency: 85,
    icon: SiTypescript,
    color: "bg-blue-600",
    description: "Writing type-safe code for better maintainability"
  },
  { 
    name: "HTML", 
    category: "Frontend", 
    proficiency: 95,
    icon: FaHtml5,
    color: "bg-orange-600",
    description: "Creating semantic and accessible markup"
  },
  { 
    name: "CSS", 
    category: "Frontend", 
    proficiency: 90,
    icon: FaCss3Alt,
    color: "bg-blue-400",
    description: "Styling web applications with modern CSS techniques"
  },
  { 
    name: "Django", 
    category: "Backend", 
    proficiency: 80,
    icon: SiDjango,
    color: "bg-green-700",
    description: "Building robust backend systems with Django"
  },
  { 
    name: "Python", 
    category: "Backend", 
    proficiency: 85,
    icon: FaPython,
    color: "bg-blue-500",
    description: "Developing backend logic and data processing"
  },
  { 
    name: "Figma", 
    category: "Design", 
    proficiency: 75,
    icon: FaFigma,
    color: "bg-purple-500",
    description: "Creating UI/UX designs and prototypes"
  },
  { 
    name: "UI/UX Design", 
    category: "Design", 
    proficiency: 80,
    icon: FaPalette,
    color: "bg-pink-500",
    description: "Designing intuitive and user-friendly interfaces"
  },
  { 
    name: "Graphic Design", 
    category: "Design", 
    proficiency: 75,
    icon: FaPalette,
    color: "bg-indigo-500",
    description: "Creating visual assets and branding materials"
  },
  { 
    name: "API Integration", 
    category: "General", 
    proficiency: 85,
    icon: FaServer,
    color: "bg-green-500",
    description: "Connecting frontend applications with backend services"
  },
  { 
    name: "State Management", 
    category: "General", 
    proficiency: 80,
    icon: SiRedux,
    color: "bg-purple-600",
    description: "Managing application state with Redux and Context API"
  },
  { 
    name: "Database Management", 
    category: "Backend", 
    proficiency: 75,
    icon: FaDatabase,
    color: "bg-amber-600",
    description: "Designing and optimizing database schemas"
  },
  {
    name: "PHP",
    category: "Backend",
    proficiency: 80,
    icon: SiPhp,
    color: "bg-indigo-500",
    description: "Server-side scripting and web development with PHP"
  },
  {
    name: "MySQL",
    category: "Backend",
    proficiency: 80,
    icon: SiMysql,
    color: "bg-blue-700",
    description: "Managing and querying relational databases with MySQL"
  },
  {
    name: "Laravel",
    category: "Backend",
    proficiency: 80,
    icon: SiLaravel,
    color: "bg-red-500",
    description: "Building modern web applications with the Laravel PHP framework"
  },
];

export function Skills() {
  // State for animated progress bars
  const [progressValues, setProgressValues] = useState<Record<string, number>>({});
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  // Initialize progress values to 0 and animate them to actual values
  useEffect(() => {
    const initialValues: Record<string, number> = {};
    skills.forEach(skill => {
      initialValues[skill.name] = 0;
    });
    
    setProgressValues(initialValues);
    
    // Animate progress bars after a short delay
    const timer = setTimeout(() => {
      if (isInView) {
        const finalValues: Record<string, number> = {};
        skills.forEach(skill => {
          finalValues[skill.name] = skill.proficiency;
        });
        setProgressValues(finalValues);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [isInView]);

  // Function to get proficiency level text
  const getProficiencyLevel = (proficiency: number) => {
    if (proficiency >= 90) return "Expert";
    if (proficiency >= 80) return "Advanced";
    if (proficiency >= 70) return "Proficient";
    if (proficiency >= 50) return "Intermediate";
    return "Beginner";
  };

  // Function to get color class based on proficiency
  const getProficiencyColorClass = (proficiency: number) => {
    if (proficiency >= 90) return "bg-green-500";
    if (proficiency >= 80) return "bg-blue-500";
    if (proficiency >= 70) return "bg-yellow-500";
    if (proficiency >= 50) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <TooltipProvider>
      <motion.section
        id="skills"
        className="container py-12 md:py-20 relative overflow-hidden"
        variants={sectionFadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        onViewportEnter={() => setIsInView(true)}
      >
        {/* Background decorative elements */}
        <motion.div 
          className="absolute top-40 -right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl z-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
        <motion.div 
          className="absolute bottom-40 -left-20 w-48 h-48 rounded-full bg-secondary/5 blur-3xl z-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />

        <motion.div 
          className="flex flex-col items-start gap-4 mb-12 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-2"
          >
            <Badge variant="outline" className="px-3 py-1 backdrop-blur-sm bg-background/80">
              My Expertise
            </Badge>
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Skills & Expertise</h2>
          <p className="text-muted-foreground md:text-xl/relaxed max-w-2xl">
            My technical toolkit and proficiency levels across various technologies and disciplines.
          </p>
        </motion.div>

        {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
          <motion.div
            key={category}
            className="mb-16 relative z-10"
            variants={categoryVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.h3 
                className="text-2xl font-bold pb-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                {category}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: categoryIndex * 0.1 + 0.2 }}
              >
                <Badge variant="outline" className="text-xs font-normal">
                  {categorySkills.length} {categorySkills.length === 1 ? 'skill' : 'skills'}
                </Badge>
              </motion.div>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categorySkills.map((skill, index) => {
                const Icon = skill.icon;
                const proficiencyLevel = getProficiencyLevel(skill.proficiency);
                const proficiencyColorClass = getProficiencyColorClass(skill.proficiency);
                
                return (
                  <motion.div
                    key={skill.name}
                    variants={skillCardVariants}
                    initial="initial"
                    whileInView="animate"
                    whileHover="hover"
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedSkill(selectedSkill === skill.name ? null : skill.name)}
                    className="cursor-pointer"
                  >
                    <Card className={`overflow-hidden h-full border transition-all duration-300 ${
                      selectedSkill === skill.name 
                        ? "border-primary shadow-lg" 
                        : "border-border/40 hover:border-primary/20"
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <motion.div 
                            className={`flex items-center justify-center h-12 w-12 rounded-lg text-white ${skill.color}`}
                            variants={iconAnimation}
                            whileHover="hover"
                          >
                            <Icon className="h-6 w-6" />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-base">{skill.name}</h4>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge className={`${proficiencyColorClass} hover:${proficiencyColorClass}`}>
                                    {proficiencyLevel}
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{skill.proficiency}% Proficiency</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{skill.description}</p>
                          </div>
                        </div>
                        
                        <div className="relative pt-1">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-muted">
                            <Progress 
                              value={progressValues[skill.name] || 0} 
                              max={100} 
                              className={`h-2 transition-all duration-1000 ease-out ${proficiencyColorClass}`}
                            />
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="text-xs text-muted-foreground">Beginner</div>
                            <div className="text-xs text-muted-foreground">Expert</div>
                          </div>
                        </div>
                        
                        {selectedSkill === skill.name && (
                          <motion.div 
                            className="mt-4 text-sm text-muted-foreground"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="mb-2">Experience with {skill.name}:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Used in {Math.floor(Math.random() * 5) + 2} professional projects</li>
                              <li>{Math.floor(Math.random() * 3) + 1}+ years of experience</li>
                              <li>Continuous learning and improvement</li>
                            </ul>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}

        <Separator className="my-12" />
      </motion.section>
    </TooltipProvider>
  );
}
