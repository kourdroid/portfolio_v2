const bcryptjs = require("bcryptjs");
const { PrismaClient } = require("../lib/generated/prisma");
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Starting admin user seed...");
    
    // Create default admin user
    const email = "admin@example.com";
    const password = "Admin123!"; // You should change this after first login
    
    // Check if admin already exists
    const existingAdmin = await prisma.adminUser.findUnique({
      where: { email },
    });
    
    if (existingAdmin) {
      console.log("Admin user already exists, skipping creation");
    } else {
      // Hash the password
      const hashedPassword = await bcryptjs.hash(password, 10);
      
      // Create the admin user
      const admin = await prisma.adminUser.create({
        data: {
          email,
          password: hashedPassword,
          name: "Admin User",
        },
      });
      
      console.log(`Admin user created with email: ${admin.email}`);
    }
    
    // Create skill categories
    const categories = [
      "Frontend", 
      "Backend", 
      "Database", 
      "DevOps", 
      "Design", 
      "Tools"
    ];
    
    const createdCategories = {};
    
    for (const categoryName of categories) {
      const existingCategory = await prisma.skillCategory.findUnique({
        where: { name: categoryName },
      });
      
      if (!existingCategory) {
        const category = await prisma.skillCategory.create({
          data: { name: categoryName },
        });
        createdCategories[categoryName] = category.id;
        console.log(`Created skill category: ${categoryName}`);
      } else {
        createdCategories[categoryName] = existingCategory.id;
        console.log(`Category ${categoryName} already exists`);
      }
    }
    
    // Create skills
    const skills = [
      {
        name: "React",
        categoryName: "Frontend",
        proficiency: 90,
        icon: "react",
        description: "Building modern user interfaces with React and its ecosystem"
      },
      {
        name: "Next.js",
        categoryName: "Frontend",
        proficiency: 85,
        icon: "nextjs",
        description: "Creating server-rendered React applications with Next.js"
      },
      {
        name: "TypeScript",
        categoryName: "Frontend",
        proficiency: 85,
        icon: "typescript",
        description: "Developing type-safe JavaScript applications"
      },
      {
        name: "Tailwind CSS",
        categoryName: "Frontend",
        proficiency: 90,
        icon: "tailwind",
        description: "Crafting responsive and utility-first designs"
      },
      {
        name: "Node.js",
        categoryName: "Backend",
        proficiency: 80,
        icon: "nodejs",
        description: "Building scalable server-side applications"
      },
      {
        name: "Express",
        categoryName: "Backend",
        proficiency: 80,
        icon: "express",
        description: "Creating robust REST APIs and web services"
      },
      {
        name: "PostgreSQL",
        categoryName: "Database",
        proficiency: 75,
        icon: "postgresql",
        description: "Designing and optimizing relational databases"
      },
      {
        name: "Prisma",
        categoryName: "Database",
        proficiency: 85,
        icon: "prisma",
        description: "Type-safe database access with Prisma ORM"
      },
      {
        name: "Docker",
        categoryName: "DevOps",
        proficiency: 70,
        icon: "docker",
        description: "Containerizing applications for consistent deployment"
      },
      {
        name: "Git",
        categoryName: "Tools",
        proficiency: 85,
        icon: "git",
        description: "Version control and collaborative development"
      },
      {
        name: "Figma",
        categoryName: "Design",
        proficiency: 75,
        icon: "figma",
        description: "Creating UI/UX designs and prototypes"
      }
    ];
    
    // Create skills
    for (const skill of skills) {
      const existingSkill = await prisma.skill.findFirst({
        where: { 
          name: skill.name,
          categoryId: createdCategories[skill.categoryName]
        },
      });
      
      if (!existingSkill) {
        await prisma.skill.create({
          data: {
            name: skill.name,
            categoryId: createdCategories[skill.categoryName],
            proficiency: skill.proficiency,
            icon: skill.icon,
            description: skill.description
          },
        });
        console.log(`Created skill: ${skill.name}`);
      } else {
        console.log(`Skill ${skill.name} already exists`);
      }
    }
    
    // Create projects
    const projects = [
      {
        title: "Personal Portfolio",
        description: "A modern portfolio website built with Next.js and Tailwind CSS, featuring a custom CMS for content management.",
        imageUrl: "portfolio-thumbnail.jpg",
        projectUrl: "https://portfolio.example.com",
        repoUrl: "https://github.com/username/portfolio",
        isFeatured: true,
        tags: ["Next.js", "React", "Tailwind CSS", "Prisma", "PostgreSQL"]
      },
      {
        title: "E-commerce Platform",
        description: "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
        imageUrl: "ecommerce-thumbnail.jpg",
        projectUrl: "https://ecommerce.example.com",
        repoUrl: "https://github.com/username/ecommerce",
        isFeatured: true,
        tags: ["React", "Node.js", "Express", "MongoDB", "Stripe"]
      },
      {
        title: "Task Management App",
        description: "A Kanban-style task management application with drag-and-drop functionality and team collaboration features.",
        imageUrl: "taskapp-thumbnail.jpg",
        projectUrl: "https://taskapp.example.com",
        repoUrl: "https://github.com/username/taskapp",
        isFeatured: false,
        tags: ["React", "TypeScript", "Firebase", "Tailwind CSS"]
      }
    ];
    
    // Create projects
    for (const project of projects) {
      const existingProject = await prisma.project.findFirst({
        where: { title: project.title },
      });
      
      if (!existingProject) {
        await prisma.project.create({
          data: {
            title: project.title,
            description: project.description,
            imageUrl: project.imageUrl,
            projectUrl: project.projectUrl,
            repoUrl: project.repoUrl,
            isFeatured: project.isFeatured,
            tags: project.tags
          },
        });
        console.log(`Created project: ${project.title}`);
      } else {
        console.log(`Project ${project.title} already exists`);
      }
    }
    
    // Create FAQs
    const faqs = [
      {
        question: "What technologies do you specialize in?",
        answer: "I specialize in modern web development technologies including React, Next.js, TypeScript, and Node.js. I also have experience with database systems like PostgreSQL and MongoDB, as well as DevOps tools like Docker and AWS.",
        order: 1,
        isOpen: false
      },
      {
        question: "Are you available for freelance work?",
        answer: "Yes, I'm available for freelance projects. Feel free to reach out through the contact form with details about your project, and I'll get back to you to discuss how I can help.",
        order: 2,
        isOpen: false
      },
      {
        question: "How do you approach new projects?",
        answer: "I start by understanding the project requirements and objectives through detailed discussions. Then I create a plan that outlines the architecture, technologies, and timeline. Throughout the development process, I maintain clear communication and provide regular updates.",
        order: 3,
        isOpen: false
      },
      {
        question: "Do you provide ongoing maintenance and support?",
        answer: "Yes, I offer ongoing maintenance and support services for projects I've developed. This includes bug fixes, feature enhancements, and performance optimizations to ensure your application continues to run smoothly.",
        order: 4,
        isOpen: false
      }
    ];
    
    // Create FAQs
    for (const faq of faqs) {
      const existingFAQ = await prisma.fAQItem.findFirst({
        where: { question: faq.question },
      });
      
      if (!existingFAQ) {
        await prisma.fAQItem.create({
          data: {
            question: faq.question,
            answer: faq.answer,
            order: faq.order,
            isOpen: faq.isOpen
          },
        });
        console.log(`Created FAQ: ${faq.question}`);
      } else {
        console.log(`FAQ "${faq.question}" already exists`);
      }
    }
    
    console.log("Seed completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
