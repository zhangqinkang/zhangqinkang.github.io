(()=>{
 const f=window.frameElement;if(!f||new URLSearchParams(location.search).get('full-fit')!=='1')return;
 const width=Number(f.getAttribute('width'))||1920,height=Number(f.getAttribute('height'))||1080;
 for(const [key,value]of [['innerWidth',width],['innerHeight',height]])Object.defineProperty(window,key,{configurable:true,get:()=>value});
 if(window.visualViewport)for(const [key,value]of [['width',width],['height',height]])Object.defineProperty(window.visualViewport,key,{configurable:true,get:()=>value});
 window.__pandaFullViewport={width,height,scale:()=>Number(f.style.zoom)||1};
})();
