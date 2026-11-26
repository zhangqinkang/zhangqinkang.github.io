(()=>{
 const frame=window.frameElement;if(!frame||new URLSearchParams(location.search).get('full-fit')!=='2')return;
 const w=window,d=document,root=d.documentElement;
 const width=Number(frame.getAttribute('width'))||1920,height=Number(frame.getAttribute('height'))||1080;
 const scale=()=>Number(frame.dataset.sourceScale)||1;
 const ns='http://www.w3.org/2000/svg';let viewport=null,host=null;
 const paintZoom=()=>width===1920?1/nativeDPR:scale();
 root.dataset.fullDocumentId=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7);
 root.dataset.sourceMotionRevision='20261022-paint-scale';
 root.style.width=width+'px';root.style.overflow='hidden';
 const nativeDPR=w.devicePixelRatio;
 Object.defineProperty(w,'devicePixelRatio',{configurable:true,get:()=>nativeDPR*scale()});
 for(const [key,value]of [['innerWidth',width],['innerHeight',height]])Object.defineProperty(w,key,{configurable:true,get:()=>value});
 if(w.visualViewport)for(const [key,value]of [['width',width],['height',height]])Object.defineProperty(w.visualViewport,key,{configurable:true,get:()=>value});
 const cssURL=value=>{try{const u=new URL(value,d.baseURI);if(u.origin===location.origin&&u.pathname.startsWith('/panda-live/')&&u.pathname.endsWith('.css')){u.searchParams.set('__panda_fit','2');u.searchParams.set('__panda_width',String(width));u.searchParams.set('__panda_height',String(height));return u.href}}catch{}return value};
 const href=Object.getOwnPropertyDescriptor(HTMLLinkElement.prototype,'href');
 Object.defineProperty(HTMLLinkElement.prototype,'href',{...href,set(v){href.set.call(this,cssURL(v))}});
 const attr=Element.prototype.setAttribute;Element.prototype.setAttribute=function(k,v){return attr.call(this,k,this instanceof HTMLLinkElement&&k.toLowerCase()==='href'?cssURL(v):v)};
 const nativeRect=Element.prototype.getBoundingClientRect,nativeRects=Element.prototype.getClientRects;
 const rect=r=>r?new DOMRect(r.x/scale(),r.y/scale(),r.width/scale(),r.height/scale()):null;
 Element.prototype.getBoundingClientRect=function(){if(viewport&&(this===root||this===d.body))return new DOMRect(0,-viewport.scrollTop,width,viewport.scrollHeight);return rect(nativeRect.call(this))};
 Element.prototype.getClientRects=function(){const a=[...nativeRects.call(this)].map(rect);a.item=i=>a[i]??null;return a};
 for(const [key,value]of [['clientWidth',width],['clientHeight',height]])Object.defineProperty(root,key,{configurable:true,get:()=>value});
 for(const key of ['scrollTop','scrollLeft','scrollWidth','scrollHeight']){
  const raw=Object.getOwnPropertyDescriptor(Element.prototype,key);
  Object.defineProperty(root,key,{configurable:true,get(){return viewport?viewport[key]:raw.get.call(root)},...(raw.set?{set(v){if(viewport)viewport[key]=v;else raw.set.call(root,v)}}:{})});
 }
 for(const [key,axis]of [['scrollY','pageYOffset'],['scrollX','pageXOffset']]){
  const prop=key==='scrollY'?'scrollTop':'scrollLeft';for(const k of [key,axis])Object.defineProperty(w,k,{configurable:true,get:()=>root[prop]});
 }
 for(const name of ['scrollTo','scrollBy']){const raw=w[name].bind(w),eraw=root[name].bind(root);w[name]=function(...args){return viewport?viewport[name](...args):raw(...args)};root[name]=function(...args){return viewport?viewport[name](...args):eraw(...args)}}
 w.scroll=w.scrollTo;root.scroll=root.scrollTo;
 const rewrite=q=>q.replace(/\(\s*(min|max)-(width|height):\s*([\d.]+)(px|em|rem)\s*\)/g,(_,edge,axis,n,unit)=>{const size=axis==='width'?width:height,limit=Number(n)*(unit==='px'?1:16);return(edge==='min'?size>=limit:size<=limit)?'(min-width:0px)':'(max-width:0px)'});
 const match=w.matchMedia.bind(w);w.matchMedia=q=>match(rewrite(q));
 const IO=w.IntersectionObserver;w.IntersectionObserver=class extends IO{constructor(callback,options={}){super((entries,o)=>callback(entries.map(e=>new Proxy(e,{get(t,k){return['boundingClientRect','intersectionRect','rootBounds'].includes(k)?rect(Reflect.get(t,k,t)):Reflect.get(t,k,t)}})),o),{...options,...(options.rootMargin?{rootMargin:options.rootMargin.replace(/(-?[\d.]+)px\b/g,(_,n)=>`${Number(n)*scale()}px`)}:{})})}};
 const paths=new WeakMap();let motionFrame=0;
 const fitMotionPaths=()=>{for(const marker of d.querySelectorAll('svg .comm-marker')){const current=marker.style.offsetPath;let saved=paths.get(marker);if(!saved||current!==saved.applied){saved={original:current,applied:null};paths.set(marker,saved)}if(saved.applied===current&&saved.scale===paintZoom())continue;if(!/^path\(/.test(saved.original))continue;const fitted=saved.original.replace(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi,n=>String(Number(n)/paintZoom()));if(current!==fitted){marker.style.offsetPath=fitted;saved.applied=marker.style.offsetPath;saved.scale=paintZoom()}}};
 const scheduleMotionFit=()=>{if(!motionFrame)motionFrame=requestAnimationFrame(()=>{motionFrame=0;fitMotionPaths()})};
 const fit=()=>{if(!host)return;host.style.width=width+'px';host.style.height=height+'px';host.style.zoom=String(paintZoom());host.style.transformOrigin='0 0';host.style.transform=width===1920?`scale(${scale()/paintZoom()})`:'none';root.style.width=width*scale()+'px';d.body.style.width=width*scale()+'px';scheduleMotionFit()};
 w.__pandaFullViewport={width,height,scale,ready:false,setScale:fit};
 function install(){
  if(viewport)return;
  host=d.createElement('div');host.dataset.pandaNativeViewport='';host.style.cssText='display:block;overflow:hidden;position:relative;contain:layout paint style;';
  viewport=d.createElement('div');viewport.setAttribute('xmlns','http://www.w3.org/1999/xhtml');viewport.dataset.pandaNativeScroll='';viewport.style.cssText=`width:${width}px;height:${height}px;overflow:hidden;position:relative;box-sizing:border-box;`;
  const nodes=[...d.body.childNodes].filter(n=>!(n instanceof HTMLElement&&['SCRIPT','STYLE','LINK'].includes(n.tagName)));
  for(const n of nodes)viewport.append(n);
  host.append(viewport);d.body.append(host);d.body.style.margin='0';d.body.style.overflow='hidden';fit();
  const css=d.createElement('style');css.textContent='html,body{-webkit-text-size-adjust:100%!important;text-size-adjust:100%!important}';d.head.append(css);
  for(const key of ['clientWidth','offsetWidth','scrollWidth'])Object.defineProperty(d.body,key,{configurable:true,get:()=>width});
  for(const key of ['clientHeight','offsetHeight','scrollHeight'])Object.defineProperty(d.body,key,{configurable:true,get:()=>viewport.scrollHeight});
  viewport.addEventListener('scroll',()=>{d.dispatchEvent(new Event('scroll',{bubbles:true}))},{passive:true});
  if(width===1920){const metrics=d.createElement('style');metrics.dataset.pandaOriginalTextMetrics='wk-1920';metrics.textContent='.panda-v3-screen-visual .tpl-desc{font-size:19px!important;line-height:32px!important}.panda-v3-screen-visual .section:not(.tpl-section) .section-sub,.panda-v3-screen-visual .pe-sub{font-size:20px!important;line-height:33px!important}.panda-v3-screen-visual .news-title{font-size:23px!important;line-height:34px!important}';d.head.append(metrics)}
  const comm=d.querySelector('.comm-section');if(comm){const observer=new MutationObserver(records=>{if(records.some(r=>r.type==='childList'||r.target instanceof SVGElement&&r.target.classList.contains('comm-marker')))scheduleMotionFit()});observer.observe(comm,{subtree:true,childList:true,attributes:true,attributeFilter:['style']})}scheduleMotionFit();
  w.__pandaFullViewport.ready=true;
  d.fonts.ready.then(()=>{root.dataset.contourMode='native-css-inner-viewport';root.dataset.detailPaintCount='0';w.dispatchEvent(new Event('resize'))});
 }
 if(d.readyState==='loading')addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
