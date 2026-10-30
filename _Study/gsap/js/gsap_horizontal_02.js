const arrow = document.querySelector('.arrow');
const item = gsap.utils.toArray('.item-wrap');
const hiddenItem = gsap.utils.toArray('.hidden-item');
const main = document.querySelector('#main');
const font = document.querySelector('#main h2');

gsap.to(arrow,{ y:10, repeat:-1, yoyo:true });

let tl = gsap.timeline({
  scrollTrigger:{
    trigger:main,
    pin:true,
    scrub:1,
    end: () => main.scrollWidth - document.documentElement.clientWidth,
    makers:true 
  },
  defaults: { ease: 'none', duration: 1, }
})

tl.to(font,{ x: -800,})
  .to(item,{ x: () => -(main.scrollWidth - document.documentElement.clientWidth+200)},0)
  .from(hiddenItem,{
  opacity:0,
  y:100,
  duration:0.2,
  stagger:{
  amount:0.5
  }
},0);

gsap.from(document.querySelector('.show-item'),{
  duration:1,
  opacity:0,
  scale:0.5,
  scrollTrigger:{
    markers:true,
    trigger:main,
    start:'top 60%',
    end:'bottom 10%',
    toggleActions: "play none none reverse"
  }  
});
