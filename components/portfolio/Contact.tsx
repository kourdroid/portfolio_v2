"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Send, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

// Animation variants
const sectionFadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardVariants = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] 
    }
  },
  hover: {
    y: -5,
    boxShadow: "0 20px 80px -20px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const formItemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4 } 
  }
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const iconVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { 
    scale: 1.2, 
    rotate: 5,
    transition: { duration: 0.2 }
  }
};

const alertVariants = {
  initial: { opacity: 0, y: -20, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 20 
    }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus({
        type: "error",
        message: "Please fill in all fields.",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          type: "success",
          message: "Your message has been sent successfully!",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        setFormStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
      className="container py-12 md:py-20 relative overflow-hidden"
      variants={sectionFadeIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
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
            Get in Touch
          </Badge>
        </motion.div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Contact Me</h2>
        <p className="text-muted-foreground md:text-xl/relaxed max-w-2xl">
          Have a project in mind or want to discuss a potential collaboration? Feel free to reach out!
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <motion.div
          variants={cardVariants}
          initial="initial"
          whileInView="animate"
          whileHover="hover"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {formStatus.type && (
                  <motion.div
                    key={formStatus.type}
                    variants={alertVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="mb-6"
                  >
                    <Alert variant={formStatus.type === "success" ? "default" : "destructive"}>
                      {formStatus.type === "success" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      <AlertTitle>
                        {formStatus.type === "success" ? "Success" : "Error"}
                      </AlertTitle>
                      <AlertDescription>{formStatus.message}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <motion.div 
                  className="space-y-2"
                  variants={formItemVariants}
                >
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    onChange={handleChange}
                    required
                  />
                </motion.div>
                <motion.div 
                  className="space-y-2"
                  variants={formItemVariants}
                >
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    onChange={handleChange}
                    required
                  />
                </motion.div>
                <motion.div 
                  className="space-y-2"
                  variants={formItemVariants}
                >
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Subject of your message"
                    onChange={handleChange}
                    required
                  />
                </motion.div>
                <motion.div 
                  className="space-y-2"
                  variants={formItemVariants}
                >
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    rows={5}
                    onChange={handleChange}
                    required
                    className="resize-none"
                  />
                </motion.div>
                <motion.div
                  variants={formItemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Here are the different ways you can reach me.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="initial"
                animate="animate"
              >
                <motion.div 
                  className="flex items-start space-x-4"
                  variants={formItemVariants}
                >
                  <motion.div 
                    className="bg-primary/10 p-3 rounded-full"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <FaEnvelope className="h-5 w-5 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      <a 
                        href="mailto:mehdi.kourchal@gmail.com" 
                        className="hover:text-primary transition-colors"
                      >
                        mehdi.kourchal@gmail.com
                      </a>
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4"
                  variants={formItemVariants}
                >
                  <motion.div 
                    className="bg-primary/10 p-3 rounded-full"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <FaMapMarkerAlt className="h-5 w-5 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm text-muted-foreground mt-1">Casablanca, Morocco</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4"
                  variants={formItemVariants}
                >
                  <motion.div 
                    className="bg-primary/10 p-3 rounded-full"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <FaPhone className="h-5 w-5 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      <a 
                        href="tel:+212600000000" 
                        className="hover:text-primary transition-colors"
                      >
                        +212 600 000 000
                      </a>
                    </p>
                  </div>
                </motion.div>

                <Separator className="my-6" />

                <div>
                  <h3 className="font-medium mb-4">Connect with me</h3>
                  <div className="flex space-x-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.a
                            href="https://linkedin.com/in/mehdi-kourchal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary/10 p-3 rounded-full block hover:bg-primary/20 transition-colors"
                            variants={iconVariants}
                            whileHover="hover"
                          >
                            <FaLinkedin className="h-5 w-5 text-primary" />
                          </motion.a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>LinkedIn</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.a
                            href="https://github.com/kourdroid"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary/10 p-3 rounded-full block hover:bg-primary/20 transition-colors"
                            variants={iconVariants}
                            whileHover="hover"
                          >
                            <FaGithub className="h-5 w-5 text-primary" />
                          </motion.a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>GitHub</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Separator className="my-12" />
    </motion.section>
  );
}
