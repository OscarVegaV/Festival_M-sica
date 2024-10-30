// Import necessary modules
import path from 'path'; // Node.js module for handling file paths
import fs from 'fs'; // Node.js module for file system operations

import { src, dest, watch, series } from 'gulp'; // 'src' defines the source files, 'dest' specifies the output 'series' take diferents exports 
import * as dartSass from 'sass'; // Import all modules from 'sass' (Dart Sass)
import gulpSass from 'gulp-sass'; // Import Gulp plugin to compile Sass files

const sass = gulpSass(dartSass); // Use 'gulp-sass' and pass Dart Sass

import sharp from 'sharp'; // Imports Sharp for image processing and resizing

// Define a task to copy JavaScript files from 'src/js' to 'build/js'
export function js(done) {

  src( 'src/js/app.js') // Define the source location of the JavaScript file
    .pipe ( dest('build/js')) // Output the JavaScript file to 'build/js'

  done(); // Signal that the task is complete
}

// Task to resize images to thumbnails
export async function crop(done) {
  const inputFolder = 'src/img/gallery/full';  // Source directory for images
  const outputFolder = 'src/img/gallery/thumb';  // Output directory for thumbnails
  const width = 250; // Thumbnail width
  const height = 180; // Thumbnail height

    // Create the output directory if it doesn't exist
  if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true })
  }
  // Filter and process only .jpg files
  const images = fs.readdirSync(inputFolder).filter(file => {
      return /\.(jpg)$/i.test(path.extname(file));
  });
  // Process each image in the directory
  try {
      images.forEach(file => {
          const inputFile = path.join(inputFolder, file); // Full path of the source file
          const outputFile = path.join(outputFolder, file); // Full path of the output file
          
          // Resize and save each image
          sharp(inputFile) 
              .resize(width, height, {
                  position: 'centre'
              })                     // Resize to specified dimensions, centered
              .toFile(outputFile);  // Save the thumbnail in the output folder
      });

      done(); // Indicates that the task is complete
  } catch (error) {
      console.log('Error processing images:', error); // Logs an error message if any issues occur
  }
}

// Compile Sass files from 'src/scss' and output them to 'build/css'
export function css(done) {
  src('src/scss/app.scss', {sourcemaps: true} ) // Define the source location of the main Sass file
    .pipe(sass().on('error', sass.logError)) // Compile Sass and log any errors that occur
    .pipe(dest('build/css', {sourcemaps: true} )); // Output the compiled CSS to 'build/css' and generate sourcemaps
  
  done(); // Signal that the task is complete
}

// Watch all Sass files in 'src/scss' for changes and recompile them when modified
export function dev() {
  watch('src/scss/**/*.scss', css); // Monitor all .scss files in the src/scss directory
  watch('src/js/**/*.js', js); // Monitor all .scss files in the src/scss directory
}

// Define the default task to run the JavaScript and Sass tasks, and start the watcher
export default series( crop, js, css, dev);// Initialize these tasks in series | Run 'crop', 'js', 'css' and then 'dev' in series