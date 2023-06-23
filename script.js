const imageArray = [
  "/images/image-product-1.jpg",
  "/images/image-product-2.jpg",
  "/images/image-product-3.jpg",
  "/images/image-product-4.jpg",
];

const addCart = document.querySelector("#add-cart");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const plusSign = document.querySelector("#plus");
const minusSign = document.querySelector("#minus");

// Code snippet for toggling the side bar in the mobile version.

function toggleNav() {
  const mainGrid = document.querySelector(".main-grid");
  const naviGation = document.querySelector("nav");
  const menu = document.querySelector(".menu");
  const main = document.querySelector("main");

  mainGrid.classList.toggle("main-grid-nav");
  naviGation.classList.toggle("hide-nav");
  menu.classList.toggle("hide-menu");
  main.style.position = "absolute";
  mainGrid.style.position = "static";

  const upperGrid = document.querySelector(".upper-grid");
  upperGrid.style.opacity = 0.4;
  const mainOne = document.querySelector(".product-images");
  mainOne.style.opacity = 0.4;
  mainOne.style.top = `60px`;
  const mainTwo = document.querySelector(".product-info");
  mainTwo.style.opacity = 0.4;
  mainTwo.style.marginTop = `60px`;
}

// Code for closing the side nav bar using the close botton on the top left corner of the side nav bar

const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", function () {
  const upperGrid = document.querySelector(".upper-grid");
  upperGrid.style.opacity = 1;
  const mainOne = document.querySelector(".product-images");
  mainOne.style.opacity = 1;
  mainOne.style.top = `0`;
  const mainTwo = document.querySelector(".product-info");
  mainTwo.style.opacity = 1;
  mainTwo.style.marginTop = `0`;

  const main = document.querySelector("main");
  main.style.position = "static";
  const mainGrid = document.querySelector(".main-grid");
  mainGrid.style.position = "fixed";
});

// code for the previous and next button functionality in the mobile version. Underpinning principle is using the translateX CSS property to slide the images along the X-axis. To achieve this, we must first set a left property to all our slides.

const slides = document.querySelectorAll(".slide");
slides.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`;
});

let counter = 0;

nextBtn.addEventListener("click", function () {
  counter++;
  carousel();
});

prevBtn.addEventListener("click", function () {
  counter--;
  carousel();
});

function carousel() {
  if (counter === slides.length) {
    counter = 0;
  }

  if (counter < 0) {
    counter = slides.length - 1;
  }

  slides.forEach(function (slide) {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}

// This code controls the plus and minus functionality of the add to cart. It keeps track of the number of the item that has been added to cart and displays it in the cart box as well as on the cart svg in the header.

const numberItems = document.getElementById("number");

let quantity = 0;
let cartQuantity = 0;

plusSign.addEventListener("click", function () {
  quantity++;
  numberItems.textContent = quantity;
});

minusSign.addEventListener("click", function () {
  if (quantity > 0) {
    quantity--;
    numberItems.textContent = quantity;
  }
});

// The following snippets of code controls the add to cart. From adding product to cart to deleting the product from cart as well as toggling the cart box, whether empty or filled with the product.

const cartBox = document.querySelector(".cart-box");
const cartDetails = document.querySelector(".cart-details");
const activeCart = document.querySelector(".active-cart");
const activeNumber = document.querySelector(".active-cart-number");
const productImages = document.querySelector(".product-images");

addCart.addEventListener("click", function () {
  if (quantity > 0) {
    productImages.classList.remove("toggleEmptyCart");
    cartQuantity = quantity;
    cartDetails.innerHTML = `<p>Fall Limited Edition Sneakers </p>
    <p class="final-price">$125.00 x ${cartQuantity} 
     <span>$${125 * cartQuantity}</span></p>`;
    activeCart.style.visibility = "visible";
    activeNumber.textContent = cartQuantity;
    productImages.classList.add("toggleCart");
  }
});

const deleteCart = document.querySelector(".delete-cart");
deleteCart.addEventListener("click", function () {
  productImages.classList.remove("toggleCart");
  quantity = 0;
  cartQuantity = 0;
  productImages.classList.toggle("toggleEmptyCart");
  numberItems.textContent = quantity;
  activeCart.style.visibility = "hidden";
});

const cartButton = document.querySelector(".cart-button");

cartButton.addEventListener("click", function () {
  if (cartQuantity == 0) {
    productImages.classList.toggle("toggleEmptyCart");
  } else {
    productImages.classList.toggle("toggleCart");
  }
});

// This snipet of code handles the images on the desktop verson. So when the carousel images are clicked, they are reflected on the main display. Along with the effect of transparency and border on the selected carousel.

// Also included in this code is funtionality for the lightbox or modal - the pop-up that comes when you click on the main display. In this case, two things affect what is displayed as the main image: the previous and next button as well as the carousel.

const mainImage = document.querySelector(".main-img");
const lightDisplayMain = document.querySelector(".lightbox-displayImage");
const slideImages = document.querySelectorAll(".slide-mainbox");
const slideImagesLightbox = document.querySelectorAll(".slide-light");

slideImages.forEach(function (slideImage, index) {
  slideImage.addEventListener("click", function (e) {
    mainImage.innerHTML = `<div class="displayImage">
              <img
                src=${imageArray[index]}
                class="slide-img"
                alt="product image ${index + 1}"
              />
            </div>`;
    slideImages.forEach(function (slideImage) {
      slideImage.classList.remove("active-slide");
    });
    e.currentTarget.classList.add("active-slide");

    const displayImage = document.querySelector(".displayImage img");
    const lightboxModal = document.querySelector(".lightbox");
    displayImage.addEventListener("click", function () {
      lightboxModal.classList.add("show-lightbox");
      lightDisplayMain.innerHTML = `<img src=${imageArray[index]} class="slide-img" alt="product image ${index}"/>`;
      slideImagesLightbox[index].classList.add("active-light-slide");

      const prevLightBtn = document.querySelector(".light-prev");
      const nextLightBtn = document.querySelector(".light-next");

      let counter = index;

      prevLightBtn.addEventListener("click", function () {
        if (counter === 0) {
          counter = 3;
        } else {
          counter--;
        }
        slideImagesLightbox.forEach(function (slideLightImage) {
          slideLightImage.classList.remove("active-light-slide");
        });
        lightDisplayMain.innerHTML = `<img src=${imageArray[counter]} class="slide-img" alt="product image ${counter}"/>`;
        slideImagesLightbox[counter].classList.add("active-light-slide");
      });

      nextLightBtn.addEventListener("click", function () {
        if (counter === 3) {
          counter = 0;
        } else {
          counter++;
        }
        slideImagesLightbox.forEach(function (slideLightImage) {
          slideLightImage.classList.remove("active-light-slide");
        });
        lightDisplayMain.innerHTML = `<img src=${imageArray[counter]} class="slide-img" alt="product image ${counter}"/>`;
        slideImagesLightbox[counter].classList.add("active-light-slide");
      });

      slideImagesLightbox.forEach(function (lightImage, indexLight) {
        lightImage.addEventListener("click", function (e) {
          lightDisplayMain.innerHTML = `<img
                src=${imageArray[indexLight]}
                class="slide-img"
                alt="product image ${indexLight}"
              />`;
          slideImagesLightbox.forEach(function (slideLightImage) {
            slideLightImage.classList.remove("active-light-slide");
          });
          e.currentTarget.classList.add("active-light-slide");
          counter = indexLight;
        });
      });
    });
  });
});

// The snippet of code below gives functionality to the hard-coded main image. Because when the page is loaded, the main image can't be empty. So it is hard-coded with the first product image. However, the functionality of opening the lightbox or modal only works on dynamic content. One solutution is to create a seprate pathway for the hard-coded display image, and that's the reason for the below code.

const displayImage = document.querySelector(".displayImage img");
const lightboxModal = document.querySelector(".lightbox");
displayImage.addEventListener("click", function () {
  lightboxModal.classList.add("show-lightbox");
});

const lightboxCloseButton = document.querySelector(".lightbox-btn");
lightboxCloseButton.addEventListener("click", function () {
  lightboxModal.classList.remove("show-lightbox");
  slideImagesLightbox.forEach(function (slideImage) {
    slideImage.classList.remove("active-light-slide");
  });
});

displayImage.addEventListener("click", function () {
  lightboxModal.classList.add("show-lightbox");
  slideImagesLightbox[0].classList.add("active-light-slide");

  const prevLightBtn = document.querySelector(".light-prev");
  const nextLightBtn = document.querySelector(".light-next");

  let counter = 0;

  prevLightBtn.addEventListener("click", function () {
    if (counter === 0) {
      counter = 3;
    } else {
      counter--;
    }
    slideImagesLightbox.forEach(function (slideLightImage) {
      slideLightImage.classList.remove("active-light-slide");
    });
    lightDisplayMain.innerHTML = `<img src=${imageArray[counter]} class="slide-img" alt="product image ${counter}"/>`;
    slideImagesLightbox[counter].classList.add("active-light-slide");
  });

  nextLightBtn.addEventListener("click", function () {
    if (counter === 3) {
      counter = 0;
    } else {
      counter++;
    }
    slideImagesLightbox.forEach(function (slideLightImage) {
      slideLightImage.classList.remove("active-light-slide");
    });
    lightDisplayMain.innerHTML = `<img src=${imageArray[counter]} class="slide-img" alt="product image ${counter}"/>`;
    slideImagesLightbox[counter].classList.add("active-light-slide");
  });

  slideImagesLightbox.forEach(function (lightImage, indexLight) {
    lightImage.addEventListener("click", function (e) {
      lightDisplayMain.innerHTML = `<img
                src=${imageArray[indexLight]}
                class="slide-img"
                alt="product image ${indexLight}"
              />`;
      slideImagesLightbox.forEach(function (slideLightImage) {
        slideLightImage.classList.remove("active-light-slide");
      });
      e.currentTarget.classList.add("active-light-slide");
      counter = indexLight;
    });
  });
});

// This code adds a border to the profile image when clicked.

const profileImage = document.querySelector("#profile-image");
profileImage.addEventListener("click", function () {
  profileImage.classList.toggle("active-profile-image");
});
