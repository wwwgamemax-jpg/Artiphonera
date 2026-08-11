
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const menuBtn=$('.menu-btn'), navLinks=$('.nav-links');
if(menuBtn) menuBtn.addEventListener('click',()=>navLinks?.classList.toggle('open'));

(function(){
  const picker=document.getElementById('language-select');
  if(!picker) return;
  const match=location.pathname.match(/^\/(ar|es|fr|de|pt|it)(?:\/|$)/);
  const current=match?match[1]:'en';
  picker.value=current;
  picker.addEventListener('change',function(){
    const code=this.value;
    location.href=code==='en'?'/index.html':'/'+code+'/index.html';
  });
})();

(function(){
  const track=document.getElementById('v8-slider-track');
  const slides=$$('.v8-slide');
  const dots=$$('.v8-slider-dot');
  if(!track||slides.length<2) return;
  let i=0,t;
  const visible=()=>window.innerWidth<650?1:(window.innerWidth<1000?2:4);
  const show=n=>{
    i=(n+slides.length)%slides.length;
    const gap=18;
    const width=slides[0].getBoundingClientRect().width+gap;
    const max=Math.max(0,slides.length-visible());
    if(i>max)i=0;
    track.style.transform=`translateX(-${i*width}px)`;
    dots.forEach((d,x)=>d.classList.toggle('active',x===i));
  };
  const start=()=>{clearInterval(t);t=setInterval(()=>show(i+1),4200)};
  dots.forEach((d,x)=>d.addEventListener('click',()=>{show(x);start()}));
  window.addEventListener('resize',()=>show(i));
  start();
})();

function num(id){return parseFloat(document.getElementById(id)?.value||0)}
window.calcBattery=function(){const mah=num('mah'),draw=num('draw'),eff=num('eff')||85,out=$('#batteryResult');if(!out)return;if(mah<=0||draw<=0){out.textContent='Enter valid values.';return;}out.innerHTML=`Estimated runtime: <strong>${((mah*(eff/100))/draw).toFixed(1)} hours</strong>.`};
window.calcCharge=function(){const mah=num('cmah'),watts=num('watts'),eff=num('ceff')||80,out=$('#chargeResult');if(!out)return;if(mah<=0||watts<=0){out.textContent='Enter valid values.';return;}const wh=mah*3.85/1000;out.innerHTML=`Idealized charging estimate: <strong>${(wh/(watts*(eff/100))).toFixed(2)} hours</strong>.`};
window.calcStorage=function(){const photos=num('photos')*4/1024,video=num('video')*.18,apps=num('apps')*.25,games=num('games')*3,downloads=num('downloads'),system=24,total=photos+video+apps+games+downloads+system;let rec='128GB';if(total>100)rec='256GB';if(total>210)rec='512GB or more';const out=$('#storageResult');if(out)out.innerHTML=`Estimated usage: <strong>${total.toFixed(1)}GB</strong>. Suggested capacity: <strong>${rec}</strong>.`};
