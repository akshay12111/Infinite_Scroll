
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
const key = "key";
const count = 12;
const apiUrl = `https://api.unsplash.com/photos/?client_id=${key}&count=${count}`
let image_array = []

function imageLoaded(){
    imagesLoaded++;
    console.log(imageLoaded);
    if (imagesLoaded===totalImages){
        ready = true;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes){
    for(let key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotoes(){
    imagesLoaded = 0;
    totalImages = image_array.length;
    console.log("totalimages", totalImages)
    image_array.forEach((photo) =>{
        const item = document.createElement("a");
        // item.setAttribute("href", photo.links.html);
        // item.setAttribute("target", "_blank");
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        const image = document.createElement('img');
        // image.setAttribute("src", photo.urls.regular);
        // image.setAttribute('alt', photo.alt_description);
        // image.setAttribute('title', photo.alt_description);
        setAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        image.addEventListener('load', imageLoaded);

        item.appendChild(image);
        imageContainer.appendChild(item);
    });
}

async function getPhotoes() {
    try{
        const response = await fetch(apiUrl);
        image_array = await response.json();
        displayPhotoes();
        console.log(image_array);

    }catch(e){
        alert(e);
    }
}

window.addEventListener("scroll", () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotoes();
    }
});

getPhotoes();
