console.log('로딩완료');

const box1 = document.querySelector('#section1 .parallax__item__img')
const box2 = document.querySelector('#section2 .parallax__item__img')
const box3 = document.querySelector('#section3 .parallax__item__img')
const box4 = document.querySelector('#section4 .parallax__item__img')
const box5 = document.querySelector('#section5 .parallax__item__img')
const box6 = document.querySelector('#section6 .parallax__item__img')
const box7 = document.querySelector('#section7 .parallax__item__img')
const box8 = document.querySelector('#section8 .parallax__item__img')
const box9 = document.querySelector('#section9 .parallax__item__img')

// 01.
gsap.to(box1,{
  x: 500, // x축으로 500px 이동
  duration: 2, // 2초동안
  borderRadius: 100,
  rotation: 360
})

// 02. trigger
gsap.to(box2,{
  x: 500,
  duration: 2,
  borderRadius: 100,
  rotation: 360,
  scrollTrigger:{
    trigger: box2 // box2 보이면
  }
})

// 03. toggleActions
gsap.to(box3,{
  x: 500,
  duration: 2,
  borderRadius: 100,
  rotation: 360,
  scrollTrigger:{
    trigger: box3, // box3 보이면
    toggleActions: 'play pause reverse none'
  }
})

// 04. trigger start, end
gsap.to(box4,{
  x: 500,
  duration: 2,
  borderRadius: 100,
  rotation: 360,
  scrollTrigger:{
    trigger: box4, // box4 보이면
    toggleActions: 'play pause reverse none',
    start:'top 50%',
    end: 'bottom 20%',
    markers: false
  }
})

// 05. scrub
gsap.to(box5,{
  x: 500,
  duration: 2,
  borderRadius: 100,
  rotation: 360,
  scrollTrigger:{
    trigger: box5,
    start:'top 50%',
    end: 'bottom 20%',
    markers: false,
    scrub: 1 // true, 정수 입력
  }
})

// 06. pin
gsap.to(box6,{
  x: 500,
  duration: 2,
  borderRadius: 100,
  rotation: 360,
  scrollTrigger:{
    trigger: box6,
    start:'top 50%',
    end: 'top 200px',
    markers: false,
    scrub: 1,
    pin: true
  }
})

// 07. toggleClass
gsap.to(box7,{
  x: 500,
  duration: 2,
  borderRadius: 100,
  rotation: 360,
  scrollTrigger:{
    trigger: box7,
    start:'top center',
    end: 'bottom 20%',
    markers: true,
    scrub: 1,
    toggleClass:'active',
  }
})


// 08. callback
gsap.to(box8,{
  x: 500,
  duration: 2,
  borderRadius: 100,
  rotation: 360,
  scrollTrigger:{
    trigger: box8,
    start:'top center',
    end: 'bottom 20%',
    markers: true,
    scrub: 1,
    // onEnter : () => {console.log("onEnter")},
    // onLeave : () => {console.log("onLeave")},
    // onEnterBack : () => {console.log("onEnterBack")},
    // onLeaveBack : () => {console.log("onLeaveBack")},
    // onUpdate : (self) => {console.log("onUpdate", self.progress.toFixed(3))},
    // onToggle : (self) => {console.log("onToggle", self.isActive)},
  }
})


