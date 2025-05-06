const { PrismaClient } = require("../lib/generated/prisma");
const prisma = new PrismaClient();

// Import data from the static portfolio components
async function importPortfolioData() {
  try {
    console.log("Starting portfolio data import...");
    
    // Create skill categories
    const categories = [
      "Frontend", 
      "Backend", 
      "Design", 
      "General"
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
    
    // Skills data from Skills.tsx component
    const skills = [
      { 
        name: "React", 
        category: "Frontend", 
        proficiency: 90,
        icon: "FaReact",
        description: "Building interactive UIs with React and its ecosystem"
      },
      { 
        name: "Next.js", 
        category: "Frontend", 
        proficiency: 85,
        icon: "SiNextdotjs",
        description: "Creating performant, SEO-friendly React applications"
      },
      { 
        name: "TailwindCSS", 
        category: "Frontend", 
        proficiency: 95,
        icon: "SiTailwindcss",
        description: "Crafting responsive designs with utility-first CSS"
      },
      { 
        name: "JavaScript", 
        category: "Frontend", 
        proficiency: 90,
        icon: "SiJavascript",
        description: "Developing dynamic web applications with modern JavaScript"
      },
      { 
        name: "TypeScript", 
        category: "Frontend", 
        proficiency: 85,
        icon: "SiTypescript",
        description: "Writing type-safe code for better maintainability"
      },
      { 
        name: "HTML", 
        category: "Frontend", 
        proficiency: 95,
        icon: "FaHtml5",
        description: "Creating semantic and accessible markup"
      },
      { 
        name: "CSS", 
        category: "Frontend", 
        proficiency: 90,
        icon: "FaCss3Alt",
        description: "Styling web applications with modern CSS techniques"
      },
      { 
        name: "Django", 
        category: "Backend", 
        proficiency: 80,
        icon: "SiDjango",
        description: "Building robust backend systems with Django"
      },
      { 
        name: "Python", 
        category: "Backend", 
        proficiency: 85,
        icon: "FaPython",
        description: "Developing backend logic and data processing"
      },
      { 
        name: "Figma", 
        category: "Design", 
        proficiency: 75,
        icon: "FaFigma",
        description: "Creating UI/UX designs and prototypes"
      },
      { 
        name: "UI/UX Design", 
        category: "Design", 
        proficiency: 80,
        icon: "FaPalette",
        description: "Designing intuitive and user-friendly interfaces"
      },
      { 
        name: "Graphic Design", 
        category: "Design", 
        proficiency: 75,
        icon: "FaPalette",
        description: "Creating visual assets and branding materials"
      },
      { 
        name: "API Integration", 
        category: "General", 
        proficiency: 85,
        icon: "FaServer",
        description: "Connecting frontend applications with backend services"
      },
      { 
        name: "State Management", 
        category: "General", 
        proficiency: 80,
        icon: "SiRedux",
        description: "Managing application state with Redux and Context API"
      },
      { 
        name: "Database Management", 
        category: "Backend", 
        proficiency: 75,
        icon: "FaDatabase",
        description: "Designing and optimizing database schemas"
      },
      {
        name: "PHP",
        category: "Backend",
        proficiency: 80,
        icon: "SiPhp",
        description: "Server-side scripting and web development with PHP"
      },
      {
        name: "MySQL",
        category: "Backend",
        proficiency: 80,
        icon: "SiMysql",
        description: "Managing and querying relational databases with MySQL"
      },
      {
        name: "Laravel",
        category: "Backend",
        proficiency: 80,
        icon: "SiLaravel",
        description: "Building modern web applications with the Laravel PHP framework"
      }
    ];
    
    // Create skills
    for (const skill of skills) {
      // Skip if category doesn't exist
      if (!createdCategories[skill.category]) {
        console.log(`Skipping skill ${skill.name} - category ${skill.category} not found`);
        continue;
      }
      
      const existingSkill = await prisma.skill.findFirst({
        where: { 
          name: skill.name,
          categoryId: createdCategories[skill.category]
        },
      });
      
      if (!existingSkill) {
        await prisma.skill.create({
          data: {
            name: skill.name,
            categoryId: createdCategories[skill.category],
            proficiency: skill.proficiency,
            icon: skill.icon,
            description: skill.description
          },
        });
        console.log(`Created skill: ${skill.name}`);
      } else {
        // Update existing skill
        await prisma.skill.update({
          where: { id: existingSkill.id },
          data: {
            proficiency: skill.proficiency,
            icon: skill.icon,
            description: skill.description
          },
        });
        console.log(`Updated skill: ${skill.name}`);
      }
    }
    
    // Projects data from Projects.tsx component
    const projects = [
      {
        title: "Animax",
        description: "A MyAnimeList clone developed using Next.js.",
        longDescription: "This project demonstrates handling API integrations, managing state effectively, and constructing responsive user interfaces using Next.js and modern frontend techniques.",
        imageUrl: "/projects/Animax Project.png",
        isFeatured: true,
        tags: ["Next.js", "React", "TailwindCSS", "API Integration"]
      },
      {
        title: "ToonStream",
        description: "A cartoon streaming platform using the Django framework.",
        longDescription: "This project highlights backend development skills, including database management, user authentication, and serving dynamic content with the Django framework and Python.",
        imageUrl: "/projects/toonStream image.jpg",
        isFeatured: true,
        tags: ["Django", "Python", "HTML", "CSS", "JavaScript", "Database Management"]
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
            projectUrl: project.projectUrl || null,
            repoUrl: project.repoUrl || null,
            isFeatured: project.isFeatured || false,
            tags: project.tags
          },
        });
        console.log(`Created project: ${project.title}`);
      } else {
        // Update existing project
        await prisma.project.update({
          where: { id: existingProject.id },
          data: {
            description: project.description,
            imageUrl: project.imageUrl,
            projectUrl: project.projectUrl || existingProject.projectUrl,
            repoUrl: project.repoUrl || existingProject.repoUrl,
            isFeatured: project.isFeatured !== undefined ? project.isFeatured : existingProject.isFeatured,
            tags: project.tags
          },
        });
        console.log(`Updated project: ${project.title}`);
      }
    }
    
    // FAQ data from FAQ.tsx component
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
    
    // Create FAQ items
    for (const faq of faqItems) {
      const existingFAQ = await prisma.fAQItem.findFirst({
        where: { question: faq.question },
      });
      
      if (!existingFAQ) {
        await prisma.fAQItem.create({
          data: {
            question: faq.question,
            answer: faq.answer,
          },
        });
        console.log(`Created FAQ: "${faq.question.substring(0, 30)}..."`);
      } else {
        // Update existing FAQ
        await prisma.fAQItem.update({
          where: { id: existingFAQ.id },
          data: {
            answer: faq.answer,
          },
        });
        console.log(`Updated FAQ: "${faq.question.substring(0, 30)}..."`);
      }
    }
    
    console.log("Portfolio data import completed successfully!");
  } catch (error) {
    console.error("Error importing portfolio data:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

importPortfolioData();
