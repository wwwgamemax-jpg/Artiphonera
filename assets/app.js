
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const menuBtn = $('.menu-btn');
const navLinks = $('.nav-links');
if(menuBtn) menuBtn.addEventListener('click',()=>navLinks?.classList.toggle('open'));

const searchBtn = $('.search-btn');
const searchPanel = $('.search-panel');
const closeSearch = $('.close-search');
if(searchBtn && searchPanel) searchBtn.addEventListener('click',()=>searchPanel.classList.add('active'));
if(closeSearch && searchPanel) closeSearch.addEventListener('click',()=>searchPanel.classList.remove('active'));

(function(){
  const picker = document.getElementById('language-select');
  if(!picker) return;
  const match = location.pathname.match(/^\/(ar|es|fr|de|pt|it)(?:\/|$)/);
  const current = match ? match[1] : 'en';
  picker.value = current;
  picker.addEventListener('change', function(){
    const code = this.value;
    window.location.href = code === 'en' ? '/index.html' : '/' + code + '/index.html';
  });
})();

function num(id){ return parseFloat(document.getElementById(id)?.value || 0); }
window.calcBattery=function(){
  const mah=num('mah'), draw=num('draw'), eff=num('eff')||85, out=$('#batteryResult');
  if(!out) return;
  if(mah<=0||draw<=0){out.textContent='Enter valid values.';return;}
  out.innerHTML=`Estimated runtime: <strong>${((mah*(eff/100))/draw).toFixed(1)} hours</strong>.`;
};
window.calcCharge=function(){
  const mah=num('cmah'), watts=num('watts'), eff=num('ceff')||80, out=$('#chargeResult');
  if(!out) return;
  if(mah<=0||watts<=0){out.textContent='Enter valid values.';return;}
  const wh=mah*3.85/1000;
  out.innerHTML=`Idealized charging estimate: <strong>${(wh/(watts*(eff/100))).toFixed(2)} hours</strong>.`;
};
window.calcStorage=function(){
  const photos=num('photos')*4/1024, video=num('video')*.18, apps=num('apps')*.25, games=num('games')*3, downloads=num('downloads'), system=24;
  const total=photos+video+apps+games+downloads+system;
  let rec='128GB'; if(total>100) rec='256GB'; if(total>210) rec='512GB or more';
  const out=$('#storageResult'); if(out) out.innerHTML=`Estimated usage: <strong>${total.toFixed(1)}GB</strong>. Suggested capacity: <strong>${rec}</strong>.`;
};
