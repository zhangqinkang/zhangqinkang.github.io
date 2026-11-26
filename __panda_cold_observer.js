(()=>{
 const id=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8);
 let count=0;
 function send(event){
  try{
   const v=document.querySelector('.panda-v3-showcase');
   const data={version:1,id,at:Date.now(),event,path:location.pathname,script:[...document.scripts].find(s=>s.src.includes('/assets/'))?.src,y:Math.round(scrollY),viewport:[innerWidth,innerHeight],phase:v?.dataset.scrollPhase,returnAlignment:v?.dataset.returnAlignment,returnInput:v?.dataset.returnInput,observer:'compact-no-style-reads',fullFrames:[...document.querySelectorAll('[data-full-original-v3]')].map(f=>{const r=f.contentDocument?.documentElement;return{kind:f.dataset.fullOriginalV3,sourceMax:f.dataset.sourceMax,vueReady:!!f.contentDocument?.querySelector('#__nuxt')?.__vue_app__,nativeViewport:!!f.contentDocument?.querySelector('[data-panda-native-scroll]'),documentId:r?.dataset.fullDocumentId,revision:r?.dataset.sourceMotionRevision,contourMode:r?.dataset.contourMode,detailPaintReady:r?.dataset.detailPaintReady,detailPaintCount:r?.dataset.detailPaintCount,detailPaintError:r?.dataset.detailPaintError}})};
   navigator.sendBeacon('/__panda_cover_compare',new Blob([JSON.stringify(data)],{type:'application/json'}));
  }catch{}
 }
 // Retain release/load evidence without repeatedly forcing style and geometry
 // reads across both live source documents while the user is dragging.
 send('boot');
 const timer=setInterval(()=>{if(document.visibilityState==='visible')send('state');if(++count>=90)clearInterval(timer)},3000);
 addEventListener('pagehide',()=>send('pagehide'),{once:true});
})();
