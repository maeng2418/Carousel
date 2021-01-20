const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.img');

// Buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

// Counter
let counter = 1;
const size = carouselImages[0].clientWidth;

// 첫번째 이미지가 나타나도록 함. (지금 맨처음꺼에 lastClone이 있고 마지막에 firstClone이 있으므로)
carouselSlide.style.transform = `translateX(${-size * counter}px)`;

// Button Listeners
nextBtn.addEventListener('click', () => {
  if (counter >= carouselImages.length -1) return; // 너무 빠르게 눌렀을 때 transitionend 이벤트 감지가 안되는 문제 방지!
  carouselSlide.style.transition = `transform 0.4s ease-in-out`; // CSS로 주게되면 처음 시작할때 이동하는 transition이 작동!
  counter++;
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
});

prevBtn.addEventListener('click', () => {
  if (counter <= 0) return; // 너무 빠르게 눌렀을 때 transitionend 이벤트 감지가 안되는 문제 방지!
  carouselSlide.style.transition = `transform 0.4s ease-in-out`;
  counter--;
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
});

carouselSlide.addEventListener('transitionend', () => {
  if (carouselImages[counter].id === 'lastClone') {
    carouselSlide.style.transition = "none" // 점프하는 거처럼 안보이게! transition 효과 없으니깐!
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  }

  if (carouselImages[counter].id === 'firstClone') {
    carouselSlide.style.transition = "none" // 점프하는 거처럼 안보이게! transition 효과 없으니깐!
    counter = carouselImages.length - counter;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  }
})