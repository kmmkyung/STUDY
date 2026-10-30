const arrow = document.querySelector('.arrow');
const item = document.querySelectorAll('.list-item');

gsap.to(arrow,{ y:10, repeat:-1, yoyo:true });

item.forEach(function(v,i){
  gsap.set(v,{opacity:0, x:i%2 ? 100:-100});
  
  gsap.to(v,{
    x:0,
    opacity:1,
    scrollTrigger:{
      // markers:true,
      trigger:v,
      start:'top 90%',
      end:'bottom',
      toggleActions: "play reverse play reverse"
    }
  })
})
