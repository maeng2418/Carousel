
const carouselContainer = document.querySelector('.carousel-container');
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.img');

const prev = document.querySelector('#prev');
const next = document.querySelector('#next');

// 터치시 드래그 길이
const threshold = 100;

const slideWidth = carouselImages[0].clientWidth;
const slidesLength = carouselImages.length;

// 첫번째 이미지가 나타나도록 함. (지금 맨처음꺼에 lastClone이 있고 마지막에 firstClone이 있으므로)
carouselSlide.style.transform = `translateX(${-slideWidth}px)`;

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
let allowShift = true; // 벗어나는 거 막음 (안전코드) - 트랜지션이 끝나면 다음 클릭 가능
let offsetLeft;

const dragStart = (e) => {
  e = e || window.event;
  e.preventDefault();
  posInitial = (-slideWidth*(index+1));
  offsetLeft = posInitial;
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
  offsetLeft -= posX2;
  carouselSlide.style.transform = "translateX("+(offsetLeft) + "px)";
}
    
const dragEnd = (e) => {
  posFinal = offsetLeft;
  if (posFinal - posInitial < -threshold) {
    shiftSlide(1, 'drag');
  } else if (posFinal - posInitial > threshold) {
    shiftSlide(-1, 'drag');
  } else {
    carouselSlide.style.transform = "translateX(" + (posInitial) + "px)";
  }
  document.onmouseup = null;
  document.onmousemove = null;
}
    
const shiftSlide = (dir, action) => {
  carouselSlide.classList.add('shifting');
  
  if (allowShift) { // 벗어나는 거 막음 (안전코드) - 트랜지션이 끝나면 다음 클릭 가능
    if (!action) { posInitial = (-slideWidth*(index+1)); }
    // next
    if (dir == 1) {
      carouselSlide.style.transform = "translateX(" + (posInitial - slideWidth) + "px)";
      index++;   
    // prev   
    } else if (dir == -1) {
      carouselSlide.style.transform = "translateX(" + (posInitial + slideWidth) + "px)";
      index--;      
    }
  };
  
  allowShift = false;
}
  
const checkIndex = () => {
  carouselSlide.classList.remove('shifting');
  if (index == -1) {
    carouselSlide.style.transform = "translateX(" + (-(slidesLength * slideWidth)) + "px)";
    index = slidesLength - 1;
  }
  if (index == slidesLength) {
    carouselSlide.style.transform = "translateX(" + (-(1 * slideWidth)) + "px)";
    index = 0;
  }
  
  allowShift = true; // 벗어나는거 막음 (안전코드)
}

// Mouse events
carouselSlide.onmousedown = dragStart;

// Touch events
carouselSlide.addEventListener('touchstart', dragStart);
carouselSlide.addEventListener('touchmove', dragAction);
carouselSlide.addEventListener('touchend', dragEnd);


// Click events
prev.addEventListener('click', (e) => shiftSlide(-1));
next.addEventListener('click', (e) => shiftSlide(1));

// Transition events
carouselSlide.addEventListener('transitionend', checkIndex);
