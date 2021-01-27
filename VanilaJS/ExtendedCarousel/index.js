
const carouselContainer = document.querySelector('.carousel-container');
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.img');

const prev = document.querySelector('#prev');
const next = document.querySelector('#next');

// 터치시 드래그 길이
const threshold = 100;

const slideSize = carouselContainer.offsetWidth;
const slidesLength = carouselImages.length;

// 앞뒤로 첫 이미지와 마지막 이미지 길이까지 계산해서 더함.
carouselSlide.style.width = `${(slidesLength + 4) * slideSize}px`;

// 첫번째 이미지가 나타나도록 함. (지금 맨처음꺼에 lastClone이 있고 마지막에 firstClone이 있으므로)
carouselSlide.style.left = `-${slideSize}px`;

let posX1 = 0;
let posX2 = 0;
let posInitial;
let posFinal;

const firstSlide = carouselImages[0];
const lastSlide = carouselImages[slidesLength - 1];
const cloneFirst = firstSlide.cloneNode(true);
const cloneLast = lastSlide.cloneNode(true);

// Clone first and last slide
carouselSlide.appendChild(cloneFirst);
carouselSlide.insertBefore(cloneLast, firstSlide);

let index = 0;
let allowShift = true;

const dragStart = (e) => {
  e = e || window.event;
  e.preventDefault();
  posInitial = carouselSlide.offsetLeft;
  
  if (e.type == 'touchstart') {
    posX1 = e.touches[0].clientX;
  } else {
    posX1 = e.clientX;
    document.onmouseup = dragEnd;
    document.onmousemove = dragAction;
  }
}

const dragAction = (e) => {
  e = e || window.event;
  
  if (e.type == 'touchmove') {
    posX2 = posX1 - e.touches[0].clientX;
    posX1 = e.touches[0].clientX;
  } else {
    posX2 = posX1 - e.clientX;
    posX1 = e.clientX;
  }
  carouselSlide.style.left = (carouselSlide.offsetLeft - posX2) + "px";
}
    
const dragEnd = (e) => {
  posFinal = carouselSlide.offsetLeft;
  if (posFinal - posInitial < -threshold) {
    shiftSlide(1, 'drag');
  } else if (posFinal - posInitial > threshold) {
    shiftSlide(-1, 'drag');
  } else {
    carouselSlide.style.left = (posInitial) + "px";
  }
  document.onmouseup = null;
  document.onmousemove = null;
}
    
const shiftSlide = (dir, action) => {
  carouselSlide.classList.add('shifting');
  
  if (allowShift) {
    if (!action) { posInitial = carouselSlide.offsetLeft; }
    if (dir == 1) {
      carouselSlide.style.left = (posInitial - slideSize) + "px";
      index++;      
    } else if (dir == -1) {
      carouselSlide.style.left = (posInitial + slideSize) + "px";
      index--;      
    }
  };
  
  allowShift = false;
}
  
const checkIndex = () => {
  carouselSlide.classList.remove('shifting');
  if (index == -1) {
    carouselSlide.style.left = -(slidesLength * slideSize) + "px";
    index = slidesLength - 1;
  }
  if (index == slidesLength) {
    carouselSlide.style.left = -(1 * slideSize) + "px";
    index = 0;
  }
  
  allowShift = true;
}

// Mouse events
carouselSlide.onmousedown = dragStart;

// Touch events
carouselSlide.addEventListener('touchstart', dragStart);
carouselSlide.addEventListener('touchend', dragEnd);
carouselSlide.addEventListener('touchmove', dragAction);

// Click events
prev.addEventListener('click', (e) => shiftSlide(-1));
next.addEventListener('click', (e) => shiftSlide(1));

// Transition events
carouselSlide.addEventListener('transitionend', checkIndex);
