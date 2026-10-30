gsap.registerPlugin(ScrollTrigger);

const textAll = document.querySelector('div')
const t1 = document.querySelector('.t1')
const t2 = document.querySelector('.t2')
const t3 = document.querySelector('.t3')

const tl = gsap.timeline({
  default:{
    duration:2
  }
})

function texteff(){
  tl.to(".text",{duration: 3,ease:"steps(1.5)",color: "#000",stagger:1})
}

tl.from(textAll,2,{opacity:0,x:-50})
texteff()
tl.to(".text",{color:'#fff'},"+=1");
tl.to("section",{backgroundColor:'gold'},"<");
tl.to("section",{delay:2,backgroundColor:'#fff',ease:'expo'});
tl.to(".text",{opacity:0,onComplete:chgtext1});
tl.to(".text",{opacity:1,color:'#eee'});
texteff()
tl.to(".text",{color:'#fff'},"+=1");
tl.to("section",{backgroundColor:'tomato'},"<");
tl.to("section",{delay:2,backgroundColor:'#fff',ease:'expo'});
tl.to(".text",{opacity:0,onComplete:chgtext2});
tl.to(".text",{opacity:1,color:'#000'});


function chgtext1(){
  t1.textContent=`정리`
  t2.textContent=`지삽정리`
  t3.textContent=`dsfafdasd`
}

function chgtext2(){
  t1.textContent=`asfasdf`
  t2.textContent=`asdfadsfasdf`
  t3.textContent=`adsfasdadsfsda`
}
