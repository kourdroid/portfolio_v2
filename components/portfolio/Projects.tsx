"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion"; 
import { useState, useEffect } from "react"; 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"; 
import { ExternalLink, Github, ArrowRight } from "lucide-react"; 

// Define project data structure
interface Project {
  title: string;
  description: string;
  longDescription?: string; 
  techStack: string[];
  imageUrl: string; 
  liveUrl?: string; 
  repoUrl?: string; 
}

// Animation variants
const sectionFadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
  hover: { 
    y: -10, 
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 }
  }
};

export function Projects() {
  // State for projects data
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State to track which project is selected for the dialog
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load projects data from JSON file
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/data/projects.json');
        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error('Error loading projects data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Function to open dialog with selected project
  const openProjectDialog = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  // Loading state
  if (loading) {
    return (
      <section id="projects" className="container py-12 md:py-20">
        <div className="flex flex-col items-start gap-4 mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Projects</h2>
          <p className="text-muted-foreground md:text-xl/relaxed">
            Loading projects...
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {[1, 2].map((placeholder) => (
            <div key={placeholder} className="h-full">
              <Card className="h-full flex flex-col border border-border/40">
                <CardHeader className="p-0 overflow-hidden">
                  <div className="aspect-video relative overflow-hidden bg-muted animate-pulse" />
                  <div className="p-6">
                    <div className="h-6 w-2/3 bg-muted rounded animate-pulse mb-2" />
                    <div className="h-4 w-full bg-muted rounded animate-pulse" />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 px-6">
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((tag) => (
                      <div key={tag} className="h-6 w-16 bg-muted rounded-full animate-pulse" />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-start gap-2 mt-auto px-6 pb-6">
                  <div className="h-9 w-32 bg-muted rounded animate-pulse" />
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="projects"
      className="container py-12 md:py-20"
      variants={sectionFadeIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="flex flex-col items-start gap-4 mb-8">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Projects</h2>
        <p className="text-muted-foreground md:text-xl/relaxed">
          Here are some of the projects I've worked on.
        </p>
      </div>
      <motion.div
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
        transition={{ staggerChildren: 0.15 }}
      >
        {projects.map((project, index) => (
          <motion.div 
            key={project.title} 
            variants={cardVariants} 
            initial="initial" 
            whileInView="animate"
            whileHover="hover"
            viewport={{ once: true, amount: 0.2 }}
            className="h-full"
          >
            <Card 
              className="h-full flex flex-col cursor-pointer transition-all duration-300 overflow-hidden border border-border/40 hover:border-primary/20"
              onClick={() => openProjectDialog(project)}
            >
              <CardHeader className="p-0 overflow-hidden">
                {/* Project Image with overlay on hover */}
                <div className="aspect-video relative overflow-hidden bg-muted group">
                  <Image
                    src={project.imageUrl}
                    alt={`${project.title} project screenshot`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <CardTitle className="text-xl font-bold transition-colors duration-200 hover:text-primary">{project.title}</CardTitle>
                  <CardDescription className="mt-2">{project.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 px-6">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-xs font-semibold bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-start gap-2 mt-auto px-6 pb-6">
                <Button size="sm" variant="outline" className="group">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Project Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedProject && (
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0">
            {/* Hero image section */}
            <div className="relative h-[200px] sm:h-[250px] w-full overflow-hidden">
              <Image
                src={selectedProject.imageUrl}
                alt={`${selectedProject.title} project screenshot`}
                layout="fill"
                objectFit="cover"
                className="z-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10"></div>
              <DialogClose className="absolute top-4 right-4 z-20 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-colors hover:bg-background">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
                <span className="sr-only">Close</span>
              </DialogClose>
              <div className="absolute bottom-4 left-6 z-20">
                <h2 className="text-2xl font-bold text-white drop-shadow-md">{selectedProject.title}</h2>
              </div>
            </div>

            <div className="p-6">
              {/* Required for accessibility - can be visually hidden if needed */}
              <DialogHeader className="mb-4">
                <DialogTitle>{selectedProject.title}</DialogTitle>
                <DialogDescription>{selectedProject.description}</DialogDescription>
              </DialogHeader>
              
              <div className="my-6">
                <h3 className="text-lg font-semibold mb-3">About this project</h3>
                <p className="text-muted-foreground leading-relaxed">{selectedProject.longDescription}</p>
              </div>
              
              <div className="my-6">
                <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span key={tech} className="text-sm font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                {selectedProject.liveUrl && (
                  <Link href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                    <Button className="w-full group" variant="default">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                )}
                {selectedProject.repoUrl && (
                  <Link href={selectedProject.repoUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                    <Button className="w-full group" variant="outline">
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </Button>
                  </Link>
                )}
                <DialogClose asChild className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full">Close</Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <Separator className="my-12" />
    </motion.section>
  );
}
