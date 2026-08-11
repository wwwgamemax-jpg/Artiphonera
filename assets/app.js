
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const menuBtn = $('.menu-btn');
const navLinks = $('.nav-links');
if(menuBtn) menuBtn.addEventListener('click',()=>navLinks.classList.toggle('open'));

const searchBtn = $('.search-btn');
const searchPanel = $('.search-panel');
const closeSearch = $('.close-search');
if(searchBtn) searchBtn.addEventListener('click',()=>{searchPanel.classList.add('active'); setTimeout(()=>$('#site-search')?.focus(),60)});
if(closeSearch) closeSearch.addEventListener('click',()=>searchPanel.classList.remove('active'));
if(searchPanel) searchPanel.addEventListener('click',e=>{if(e.target===searchPanel) searchPanel.classList.remove('active')});

const searchData = [
  {t:'Why Is My Phone Battery Draining So Fast?',u:'/articles/battery-drain.html',k:'battery draining fast android iphone battery life'},
  {t:'Why Is My Phone Charging Slowly?',u:'/articles/slow-charging.html',k:'charging slow cable charger port battery'},
  {t:'Why Does My Phone Get Hot?',u:'/articles/phone-overheating.html',k:'phone hot overheating heat'},
  {t:'Battery Runtime Calculator',u:'/tools/battery-runtime.html',k:'battery runtime calculator mah hours'},
  {t:'Charging Time Calculator',u:'/tools/charging-time.html',k:'charging time watt charger battery'},
  {t:'Phone Storage Planner',u:'/tools/storage-planner.html',k:'storage 128 256 gb photos videos apps games'}
];
const input = $('#site-search'), results = $('#search-results');
if(input && results){
 input.addEventListener('input',()=>{
   const q=input.value.trim().toLowerCase();
   results.innerHTML='';
   if(!q) return;
   searchData.filter(x=>(x.t+' '+x.k).toLowerCase().includes(q)).slice(0,8).forEach(x=>{
     const a=document.createElement('a'); a.className='search-result'; a.href=x.u; a.textContent=x.t; results.appendChild(a);
   });
   if(!results.children.length) results.innerHTML='<div class="small">No matching guides or tools yet.</div>';
 });
}

function number(id){ return parseFloat(document.getElementById(id)?.value || 0) }

window.calcBattery = function(){
 const mah=number('mah'), draw=number('draw'), eff=number('eff')||85;
 const out=$('#batteryResult');
 if(mah<=0||draw<=0){out.textContent='Enter a battery capacity and average current draw.';return}
 const hours=(mah*(eff/100))/draw;
 out.innerHTML=`Estimated runtime: <strong>${hours.toFixed(1)} hours</strong>. This is a rough estimate; real battery life varies with signal, temperature, apps and battery health.`;
}
window.calcCharge = function(){
 const mah=number('cmah'), watts=number('watts'), eff=number('ceff')||80;
 const out=$('#chargeResult');
 if(mah<=0||watts<=0){out.textContent='Enter battery capacity and charger power.';return}
 const wh=mah*3.85/1000;
 const hours=wh/(watts*(eff/100));
 out.innerHTML=`Idealized charging estimate: <strong>${hours.toFixed(2)} hours</strong>. Phones often slow charging near 80–100%, so real time is usually longer.`;
}
window.calcStorage = function(){
 const photos=number('photos')*4/1024;
 const video=number('video')*0.18;
 const apps=number('apps')*0.25;
 const games=number('games')*3;
 const downloads=number('downloads');
 const system=24;
 const total=photos+video+apps+games+downloads+system;
 let rec='128GB';
 if(total>100) rec='256GB';
 if(total>210) rec='512GB or more';
 $('#storageResult').innerHTML=`Estimated usage: <strong>${total.toFixed(1)}GB</strong> including about ${system}GB reserved for the system. Suggested capacity: <strong>${rec}</strong>.`;
}


// ARTIPHONERA v2: rotating hero and language selector
const apSlides = $$('.hero-slide');
const apDots = $$('.slider-dot');
let apIndex = 0;
let apTimer;

function apShow(i){
  if(!apSlides.length) return;
  apIndex = (i + apSlides.length) % apSlides.length;
  apSlides.forEach((s,n)=>s.classList.toggle('active', n===apIndex));
  apDots.forEach((d,n)=>d.classList.toggle('active', n===apIndex));
}
function apStart(){
  if(apSlides.length < 2) return;
  clearInterval(apTimer);
  apTimer = setInterval(()=>apShow(apIndex+1), 4500);
}
apDots.forEach((d,i)=>d.addEventListener('click',()=>{apShow(i);apStart();}));
apShow(0); apStart();

const apLang = $('#language-select');
if(apLang){
  apLang.addEventListener('change',()=>{
    if(apLang.value==='en') location.href = apLang.dataset.en || '/';
    else if(apLang.value==='ar') location.href = apLang.dataset.ar || '/ar/';
    else {
      alert('This language is prepared for a later reviewed translation release.');
      apLang.value = document.documentElement.lang === 'ar' ? 'ar' : 'en';
    }
  });
}
