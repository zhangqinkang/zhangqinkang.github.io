// Each phone proof keeps the original section and inherited styles. Scrolling
// stays inside the frame so animation cannot move the outer portfolio page.
const proof = new URLSearchParams(location.search).get('proof');
const selectors = { hero: '.hero', 'persona-carousel': '.persona-head', 'scroll-stack': '.tpl-section', 'logo-loop': '.partner-editorial-section' };
let target = document.querySelector(selectors[proof]);
if (proof === 'persona-carousel') target = target?.closest('section');
if (target) {
  let keep = target;
  while (keep.parentElement && keep.parentElement !== document.body) {
    for (const sibling of [...keep.parentElement.children]) if (sibling !== keep) sibling.remove();
    keep = keep.parentElement;
  }
  for (const sibling of [...document.body.children]) if (sibling !== keep) sibling.remove();
  const scroller = document.createElement('div');
  scroller.id = 'panda-proof-scroll';
  scroller.append(keep);
  document.body.append(scroller);
  const background = getComputedStyle(target).backgroundColor;
  if (background !== 'rgba(0, 0, 0, 0)' && background !== 'transparent') {
    document.documentElement.style.backgroundColor = background;
    document.body.style.backgroundColor = background;
    scroller.style.backgroundColor = background;
  }
  const style = document.createElement('style');
  style.textContent = `html,body{height:100%;overflow:hidden!important;overscroll-behavior:none}#panda-proof-scroll{height:100%;overflow-x:hidden;overflow-y:auto;overscroll-behavior:none;scrollbar-width:none}#panda-proof-scroll::-webkit-scrollbar{display:none}`;
  document.head.append(style);
  window.scrollTo = (x, y) => scroller.scrollTo(typeof x === 'object' ? x : {left:x,top:y,behavior:'instant'});
  Object.defineProperty(window, 'scrollY', { configurable:true, get:()=>scroller.scrollTop });
  Object.defineProperty(window, 'pageYOffset', { configurable:true, get:()=>scroller.scrollTop });
  for (const element of [target, ...target.querySelectorAll('.section,.tpl-card,.persona,.persona-head'), ...getAncestors(target)]) element.classList.add('is-inview','is-active','vue-mounted');
  if (proof === 'hero' && !target.querySelector('.scanning-hero')) {
    const scan = document.createElement('div');scan.className = 'scanning-hero';
    Object.assign(scan.style,{position:'absolute',inset:'0',overflow:'hidden',pointerEvents:'none'});
    target.querySelector('.hero-bg')?.after(scan);
  }
  await import('/panda-live/embed-scan.js?v=40');
}
function getAncestors(element) { const list=[];while(element.parentElement){element=element.parentElement;list.push(element)}return list }
