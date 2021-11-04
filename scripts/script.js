const imagecontainer = document.getElementById('image-container');
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;



// Unsplash Api
let initialCount = 5;
const apiKey = '5IDZE4BjYJ-daK8MFPgDaKSHf19V9JJvWshGXA0QYKw';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`;

// Update apiCount function 
function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
};


// Check if all Images are Loaded.
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    };
};


// Helper Function to set Attributes 
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    };
;}


// Create Elements for Links and Photos
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each photos in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href:photo.links.html,
            target:'_blank', 
        });
        // Create <img> to link to Unsplash
        const imag = document.createElement('img');
        // imag.setAttribute('src', photo.urls.regular);
        // imag.setAttribute('alt', photo.alt_description);
        // imag.setAttribute('title', photo.alt_description);
        setAttributes(imag, {
            src:photo.urls.regular,
            alt:photo.alt_description,
        });
        //Event Listener, check when each image is loaded
        imag.addEventListener('load', imageLoaded)
        
        // Put img inside the anchor element and the anchor in Image-container
        item.appendChild(imag);
        imagecontainer.appendChild(item);
    });
}


// Get Photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (initialLoad){
            updateAPIURLWithNewCount(30);
            initialLoad = false;
        }
    }catch(error){
        // Catch error here
    }
}
// Check to see if scrolling near bottom of page.
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
       getPhotos();
        

    }
});

// Onload
getPhotos()