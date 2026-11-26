window.addEventListener('DOMContentLoaded',function(){

  // [ 베찌 ]
  window.addEventListener('scroll',function(){
    const badge = document.querySelector('.badge');
    if(window.scrollY>500){
      badge.classList.add('-opacity');
      badge.style.pointerEvents='none';
    }
    else{
      badge.classList.remove('-opacity');
      badge.style.pointerEvents='all';
    }
  })


  // [ 배너 - 모바일 사이즈]
  // -윈도우 가로사이즈가 930px 이하라면 #banner의 DT이미지 M이미지로 바꾸기
  function bannerChg(){
    const winWidth = window.innerWidth;
    const bannerDT = document.querySelectorAll('.banner-DT')    
    const bannerM = document.querySelectorAll('.banner-M')
    if(winWidth<=930){
      bannerDT.forEach(function(v){
        v.classList.remove('-opacity')
        v.classList.add('-hidden')
      })
      bannerM.forEach(function(v){
        v.classList.add('-opacity')
        v.classList.remove('-hidden')
      })
    }
    else{
      bannerM.forEach(function(v){
        v.classList.remove('-opacity')
        v.classList.add('-hidden')
      })
      bannerDT.forEach(function(v){
        v.classList.add('-opacity')
        v.classList.remove('-hidden')
      })
    }
  }
  bannerChg()
  window.addEventListener('resize',bannerChg)

  // [ 공지사항 - 공지 세로 슬라이드 ]
  function noticeSlide(){
    const noticeUl = document.querySelector('.notice-line__notice ul');
    setInterval(function(){
      const noticeLi = document.querySelectorAll('.notice-line__notice ul li');
      noticeUl.insertBefore(noticeLi[noticeLi.length-1],noticeLi[0]);
      noticeUl.style.height = -100 +'%';
      noticeUl.style.transition = "none";
      setTimeout(function(){
        noticeUl.style.height = '0';
        noticeUl.style.transition = "height .4s ease-in-out";
      },1)
    },4000)
  }
  noticeSlide()


  // [ 공지사항 - 프로모션 아코디언 ]
  function promotionAccordion(){
    const promotionTitle =  document.querySelector('.notice-line__promotion');
    const promotionAccBtn = document.querySelector('.notice-line__promotion i');
    const promotionContent = document.querySelector('#notice-promotionBanner');
    let promotionBanner = false;
    promotionTitle.addEventListener('click',function(){
      promotionBanner = !promotionBanner
      if(promotionBanner){
        promotionAccBtn.classList.toggle('fa-chevron-up');
        promotionAccBtn.classList.toggle('fa-chevron-down');
        window.innerWidth>670 ? promotionContent.style.height = 650+'px' : promotionContent.style.height = 500+'px';
        clearAuto()
      }
      else{
        promotionAccBtn.classList.toggle('fa-chevron-up');
        promotionAccBtn.classList.toggle('fa-chevron-down');
        promotionContent.style.height = 0;
        clearInterval(autoSlideInterval);
        clearTimeout(autoSlideTimeout);
      }
    })
  }
  promotionAccordion()
  
  // [ 공지사항 - 프로모션 가로 슬라이드 ]________________________________________________________________________________
  const arrowBtn = document.querySelectorAll('.promotionBanner-arrow i');
  const slideUl = document.querySelector('.promotionBanner-box');
  const pause = document.querySelector('.fa-pause');
  const play = document.querySelector('.fa-play');
  let clickClick = 0;
  let autoSlideInterval
  let autoSlideTimeout
  
  // 버튼 이벤트 설정 및 분기(L-0 / R-1)
  arrowBtn.forEach(function(v,i){
    v.addEventListener('click',function(){
      clearAuto()
      promotionSlide(i)
      if(play.classList!=='-hidden'){
        play.classList.add('-hidden');
        pause.classList.remove('-hidden')
      }
    })
  })

  // 슬라이드 이동 함수
  function promotionSlide(i){
    const slideLl = document.querySelectorAll('.promotionBanner');
    const bullet = document.querySelectorAll('.fa-circle'); // 블릿 3개
    let nowSeq = slideLl[1].getAttribute('data-seq');
    
    // 광클금지
    if(clickClick) return;
    clickClick = 1;
    setTimeout(()=>{
      clickClick = 0
    },400);

    if(i){
      slideUl.style.left = -100 +'%';
      slideUl.style.transition = 'all 1s ease-in-out';
      bulletOn()
      setTimeout(function(){
        promotionOn(2)
        slideUl.appendChild(slideLl[0]);
        slideUl.style.left = '0';
        // slideUl.style.transition = "none";
      },100)
    }
    else{
      slideUl.insertBefore(slideLl[slideLl.length-1],slideLl[0]);
      slideUl.style.left = 100 +'%';
      // slideUl.style.transition = "none";
      setTimeout(function(){
        promotionOn(1)

        for(let x of bullet){x.classList.remove('on')};
        if(nowSeq -1 == -1){nowSeq = 3}
        bullet[nowSeq-1].classList.add('on');
        
        slideUl.style.left = '0';
        slideUl.style.transition = "all 1s ease-in-out";
      },100)
    }
  }
  
  // 프로모션 가로 슬라이드 On 함수
  function promotionOn(ele){
    const slideLl = document.querySelectorAll('.promotionBanner');
    for(let x of slideLl){x.classList.remove('on')};
    slideLl[ele].classList.add('on');
  }

  function bulletOn(){
    const bullet = document.querySelectorAll('.fa-circle');
    const slideLl = document.querySelectorAll('.promotionBanner');
    let nowSeq = slideLl[1+1].getAttribute('data-seq');
    
    for(let x of bullet){x.classList.remove('on')};
      if(nowSeq == 3){nowSeq = 0}
      bullet[nowSeq].classList.add('on');
  }


  // 프로모션 가로 슬라이드 자동 이동
  function autoSlide(){
    autoSlideInterval = setInterval(function(){
      promotionSlide(1)
    },4000)
  }
  autoSlide()
  
  // 프로모션 가로 슬라이드 멈춤버튼
  function pauseBtn(){
    pause.addEventListener('click',()=>{
      clearInterval(autoSlideInterval);
      pause.classList.add('-hidden');
      play.classList.remove('-hidden')
    })
    play.addEventListener('click',()=>{
      autoSlide();
      play.classList.add('-hidden');
      pause.classList.remove('-hidden')
    })
  }
  pauseBtn()
  
  // 프로모션 가로 슬라이드 자동 초기화
  function clearAuto(){
    clearInterval(autoSlideInterval);
    clearTimeout(autoSlideTimeout);
    autoSlideTimeout = setTimeout(autoSlide,4000)
  }

  // [ 가시성 관찰 ]
  const io = new IntersectionObserver(function(entry){
    entry.forEach(function(ele){
      if(ele.isIntersecting){
        ele.target.classList.add('show')
      }
      else{
        ele.target.classList.remove('show')
      }
    })
  })

  const entryEle = document.querySelectorAll('.entry')
  entryEle.forEach(function(v){
    io.observe(v)
  })
})

