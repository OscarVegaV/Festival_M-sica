// Wait until the entire document is loaded before executing functions
document.addEventListener('DOMContentLoaded', function () {
  stickyNavigation(); // Call the function to manage sticky navigation
  makeGalery(); // Call function to create and display the gallery images
  highlightLink(); // Call function to highlight the active navigation link
  scrollNav(); // Call function to enable smooth scrolling for navigation

});

// Function to manage sticky navigation on scroll
function stickyNavigation() {
  const header = document.querySelector('.header'); // Select the header element
  const aboutFestival = document.querySelector('.about-festival'); // Select the festival section

// Add scroll event listener to manage header positioning
document.addEventListener('scroll', function () {
    // Check if the bottom of the aboutFestival element is less than 1 pixel from the top of the viewport
    if (aboutFestival.getBoundingClientRect().bottom < 1) {
      header.classList.add('fixed'); // Add 'fixed' class to header for sticky effect
    } else {
      header.classList.remove('fixed')  // Remove 'fixed' class if not in the desired position
    }  
  })
}

// Function to dynamically create an image gallery
function makeGalery() {

  const amount_img = 16; // Total number of images to display
  const gallery = document.querySelector('.galery-img'); // Select the gallery container

  // Loop through each image and add it to the gallery
  for (let img = 1; img <= amount_img; img++) {
    const image = document.createElement('IMG'); // Create an IMG element

    image.loading = 'lazy'
    image.width = "300"
    image.height = "200"
    //image.src = `src/img/gallery/full/${img}.jpg`; // Set the source path for each image; changed thumb insted of full
    image.src = `src/img/gallery/thumb/${img}.jpg`; // Set the source path for each image
    image.alt = 'Image Gallery'; // Alt text for accessibility

    // Event handler to display the image in a modal
    image.onclick = function () {
      displayImg(img);
    };

    
    gallery.appendChild(image); // Append the image to the gallery container
  }
};

// ** Function to display the clicked image in a modal **
function displayImg(img) {

  //Creating Image for modal
  const image = document.createElement('IMG'); // Create an IMG element
  image.src = `src/img/gallery/full/${img}.jpg`; // Set the source path for each image
  image.alt = 'Image Gallery'; // Alt text for accessibility
  
  
  // Creating Modal
  const modal = document.createElement('DIV'); // Create a DIV element for the modal
  modal.classList.add('modal');// Add the modal class for styling
  modal.onclick = killModal; // Set up the click event to close the modal

  // Create a close button for the modal
  const killModalButton = document.createElement('BUTTON'); // Create a BUTTON element
   killModalButton.textContent = 'X'; // Add text 'X' for closing the modal
   killModalButton.classList.add('button-kill') // Add class for button styling
   killModalButton.onclick = killModalButton; // Set up button click event to close modal


  modal.appendChild(image); // Add image to the modal
  modal.appendChild(killModalButton); // Add close button to the modal



  // Add modal to the DOM
  const body = document.querySelector('body');  
  body.classList.add('overflow-hidden');// Prevent background scrolling
  body.appendChild(modal);
  
}

// Function to remove the modal from the DOM
function killModal() {
  
  const modal = document.querySelector('.modal');// Select the modal element

  modal.classList.add('fade-out'); // Add fade-out animation class
  //Use setTimeout to wait for the animation to finish before removing the modal
  setTimeout(() => {
    
    modal?.remove();// Remove the modal if it exists

    const body = document.querySelector('body');    
    body.classList.remove('overflow-hidden'); // Re-enable background scrolling
  }, 500); // Duration of the fade-out animation
}

// Function to highlight the current navigation link based on scroll position
function highlightLink() {

  // Add scroll event listener to the document to detect scrolling
  document.addEventListener ('scroll', function() {

    // Select all sections in the document and all navigation links
    const sections = document.querySelectorAll('section'); // Get all sections
    const navLinks = document.querySelectorAll('.main-nav a'); // Get all navigation links

    let current = ''; // Variable to store the id of the section currently in view

    // Loop through each section to check if it's currently in view
    sections.forEach(section => {

      const sectionTop = section.offsetTop; // Distance of section from top of the page
      const sectionHeight = section.clientHeight; // Height of the section

      
      // Check if the section is in the viewport (with a threshold of one-third of its height)
      if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.id;// Set the current section's id
      } 

    })

    // Loop through all navigation links
    navLinks.forEach(link => {
      link.classList.remove('active'); // Remove 'active' class from all links

      // Add 'active' class to the link that corresponds to the current section in view
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active'); // Highlight the active link
      }
    })

  })

}

// Function to enable smooth scrolling when clicking on navigation links
function scrollNav() {

  const navLinks = document.querySelectorAll('.main-nav a'); // Get all navigation links

  // Add click event listener to each link
  navLinks.forEach(link => { 
    link.addEventListener('click', e => {
      e.preventDefault();// Prevent default anchor behavior

      const sectionScroll = e.target.getAttribute('href'); // Get the target section from the href attribute
      const section = document.querySelector(sectionScroll);  // Select the target section

      section.scrollIntoView({behavior: 'smooth'}); // Smoothly scroll to the target section

    })
  })
}
