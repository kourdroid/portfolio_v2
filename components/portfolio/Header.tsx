"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

export function Header() {
  // Navigation links
  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
    { href: "#faq", label: "FAQ" },
  ];

  // Animation variants for mobile menu items
  const mobileMenuItemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  // State to track active section
  const [activeSection, setActiveSection] = React.useState("hero");

  // Update active section based on scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  return (
    <header className="sticky left-0 right-0 top-0 mx-auto z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between">
        {/* Logo/Name - Left */}
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">Kourchal</span>
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <div className="flex-1 justify-center mx-auto hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink 
                      className={`${navigationMenuTriggerStyle()} ${
                        activeSection === link.href.substring(1) 
                          ? "bg-accent text-accent-foreground" 
                          : ""
                      }`}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side - Theme Toggle & Mobile Menu Trigger */}
        <div className="flex items-center justify-end space-x-2">
          <ThemeToggle />

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[275px] sm:w-[350px] pr-0">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-left">Menu</SheetTitle>
                <SheetDescription className="text-left">
                  Navigate to different sections of the portfolio.
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial="closed"
                    animate="open"
                    variants={mobileMenuItemVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SheetClose asChild>
                      <Link
                        href={link.href}
                        className={`flex items-center py-3 px-4 text-base rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors ${
                          activeSection === link.href.substring(1)
                            ? "bg-accent text-accent-foreground font-medium"
                            : "text-foreground/70"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-6 border-t border-border pt-6 px-4">
                <p className="text-sm text-muted-foreground mb-2">Switch theme</p>
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
