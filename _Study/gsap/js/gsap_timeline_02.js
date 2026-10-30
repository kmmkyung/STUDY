const h1 = document.querySelector('#h1').textContent;
const text = h1.split('');
let texts = ''

text.forEach((v)=>{
  texts += `<span>${v}</span>`
  document.querySelector('#h1').innerHTML = texts 
  })

const tl = gsap.timeline({defaults: { ease: "power4.inOut"},
repeat: -1, 
yoyo: true, 
});

tl.from(document.querySelectorAll('span'),{
  y: 20,
  opacity: 0,
  skewX: 30,
  stagger: 0.03,
  duration: 1,
}).to(document.querySelectorAll('span'),{
  y: -20,
  skewX: 0,
  opacity:1,
  stagger:0.03,
  duration: 1,
})