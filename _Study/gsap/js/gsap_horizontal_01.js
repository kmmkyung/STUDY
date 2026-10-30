const arrow = document.querySelector('.arrow');
const container = gsap.utils.toArray('.container')

gsap.to(arrow,{ y:10, repeat:-1, yoyo:true });

gsap.to(container,{
  xPercent: -100 * (container.length-1),
  scrollTrigger:{
    // markers:true,
    trigger:'#main',
    pin: true,
    scrub: 1,
    // snap: 1 / (container.length-1),
    end:'+=' + document.querySelector('#main').offsetWidth,
  }
})

window.addEventListener('scroll',()=>{

  console.log(window.scrollY);
})

container.forEach( v => {
  
  const main = document.querySelector('#main');
  
  console.log((v.offsetLeft - window.innerWidth/2) * (main.offsetWidth/(v.offsetWidth*(container.length-1))));
  ScrollTrigger.create({
    trigger:v,
    // start: (v.offsetLift - 윈도우 가로 크기 반) * (main의 전체 가로 크기/(v의 가로 크기 * v갯수))
    start: 'top top-='+ (v.offsetLeft - window.innerWidth/2) * (main.offsetWidth/(v.offsetWidth*(container.length-1))),
    // start: 'top top',
    
    end: '+=' + v.offsetWidth*(main.offsetWidth/(v.offsetWidth*(container.length-1))),
    markers:true,
    toggleClass:{
      targets:v,
      className: 'active'
    }
  })
});