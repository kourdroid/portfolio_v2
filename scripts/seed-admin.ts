import { hash } from "bcryptjs";
import prisma from "../lib/prisma";

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
      return;
    }
    
    // Hash the password
    const hashedPassword = await hash(password, 10);
    
    // Create the admin user
    const admin = await prisma.adminUser.create({
      data: {
        email,
        password: hashedPassword,
        name: "Admin User",
      },
    });
    
    console.log(`Admin user created with email: ${admin.email}`);
    
    // Create default skill categories
    const categories = ["Frontend", "Backend", "Design", "General"];
    
    for (const categoryName of categories) {
      const existingCategory = await prisma.skillCategory.findUnique({
        where: { name: categoryName },
      });
      
      if (!existingCategory) {
        await prisma.skillCategory.create({
          data: { name: categoryName },
        });
        console.log(`Created skill category: ${categoryName}`);
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
