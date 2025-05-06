const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directories to remove
const dirsToRemove = [
  'app/admin',
  'app/api/admin',
  'app/api/auth',
  'components/admin'
];

// Files to remove
const filesToRemove = [
  'middleware.ts'
];

// Function to safely delete a directory or file
function safeDelete(pathToDelete) {
  try {
    if (fs.existsSync(pathToDelete)) {
      const stats = fs.statSync(pathToDelete);
      
      if (stats.isDirectory()) {
        console.log(`Removing directory: ${pathToDelete}`);
        fs.rmSync(pathToDelete, { recursive: true, force: true });
      } else {
        console.log(`Removing file: ${pathToDelete}`);
        fs.unlinkSync(pathToDelete);
      }
      
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error deleting ${pathToDelete}:`, error);
    return false;
  }
}

// Main cleanup function
function cleanupAdmin() {
  console.log('Starting admin dashboard cleanup...');
  
  // Get the project root directory
  const rootDir = process.cwd();
  
  // Remove directories
  for (const dir of dirsToRemove) {
    const fullPath = path.join(rootDir, dir);
    safeDelete(fullPath);
  }
  
  // Remove files
  for (const file of filesToRemove) {
    const fullPath = path.join(rootDir, file);
    safeDelete(fullPath);
  }
  
  console.log('Admin dashboard cleanup completed!');
  console.log('Your portfolio website is now clean without admin functionality.');
}

// Run the cleanup
cleanupAdmin();
