const body=document.body;
const themeBtn=document.getElementById('themeBtn');
const menuBtn=document.getElementById('menuBtn');
const nav=document.querySelector('.nav');
const progress=document.getElementById('progress');

const saved=localStorage.getItem('portfolio-theme');
if(saved==='dark') body.classList.add('dark');

themeBtn.addEventListener('click',()=>{
  body.classList.toggle('dark');
  localStorage.setItem('portfolio-theme',body.classList.contains('dark')?'dark':'light');
});

menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add('visible')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

window.addEventListener('scroll',()=>{
  const h=document.documentElement;
  const progressValue=(h.scrollTop/(h.scrollHeight-h.clientHeight))*100;
  progress.style.width=progressValue+'%';
},{passive:true});
