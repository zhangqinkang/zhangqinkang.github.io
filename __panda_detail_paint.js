(()=>{
 async function ready(){
  if(!window.__pandaFullViewport?.ready||!document.querySelector('#__nuxt')?.__vue_app__){setTimeout(ready,80);return}
  await document.fonts.ready;
  const root=document.documentElement;
  root.dataset.contourMode='native-css-inner-viewport';root.dataset.detailPaintCount='0';root.dataset.detailPaintReady='1';
 }
 ready();
})();
