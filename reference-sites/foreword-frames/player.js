// Desktop presentation pixels, with no embedded controls or document runtime.
// Only a bounded CPU pixel cache is decoded; encoded frames may prefetch early.
const packs = new Map();
export function warmPack(kind) {
  if (packs.has(kind)) return packs.get(kind);
  const version=kind==='electric'?'20261012-32':'20261012-29';
  const asset=kind==='electric'?'electric-hd':kind;
  const promise = (async () => {
    const manifest = await (await fetch(`/reference-sites/foreword-frames/${asset}.json?v=${version}`)).json();
    const response = await fetch(`/reference-sites/foreword-frames/${manifest.data}?v=${version}`);
    if (!response.ok) throw Error(`Foreword frames ${response.status}`);
    const bytes = new Uint8Array(manifest.frames.at(-1).offset + manifest.frames.at(-1).length);
    const pack = {manifest, bytes, available:0, waiters:new Set(), error:null};
    const notify = () => { for (const wake of pack.waiters) wake(); pack.waiters.clear(); };
    pack.ensure = async frame => {
      while (pack.available < frame.offset + frame.length) {
        if (pack.error) throw pack.error;
        await new Promise(resolve => pack.waiters.add(resolve));
      }
    };
    const reader = response.body?.getReader();
    void (async () => {
      if (!reader) { bytes.set(new Uint8Array(await response.arrayBuffer())); pack.available=bytes.length; notify(); return; }
      while (true) {
        const {done,value} = await reader.read();
        if (done) break;
        bytes.set(value,pack.available); pack.available += value.length; notify();
      }
      if (pack.available !== bytes.length) throw Error('Incomplete foreword presentation');
    })().catch(error => {pack.error=error;notify();});
    await pack.ensure(manifest.frames[Math.min((manifest.entryFrame || 0)+2,manifest.frames.length-1)]);
    return pack;
  })();
  packs.set(kind,promise);
  promise.catch(() => packs.delete(kind));
  return promise;
}
export async function mountPresentation(canvas, kind, root) {
  let disposed=false, frameRequest=0, timer=0, busy=false, visible=false, last=-1;
  let start=performance.now();
  let tick=()=>{};
  const pixels=new Map();
  let keyCache=null;
  const pixelReads=new Set();
  let drained;
  const cacheCount=()=>pixels.size+(keyCache&&!Array.from(pixels.values()).includes(keyCache.data)?1:0);
  const scratch=document.createElement('canvas');
  const context=canvas.getContext('2d',{alpha:false,willReadFrequently:true});
  const scratchContext=scratch.getContext('2d',{alpha:true,willReadFrequently:true});
  const dispose=()=>{
    if(disposed)return drained;
    disposed=true;cancelAnimationFrame(frameRequest);clearInterval(timer);
    window.removeEventListener('scroll',tick);window.removeEventListener('resize',tick);
    pixels.clear();keyCache=null;scratch.width=1;scratch.height=1;
    if(canvas.__pandaDispose===dispose){
      canvas.width=1;canvas.height=1;canvas.dataset.decodedFrames='0';delete canvas.__pandaDispose;
    }
    drained=Promise.allSettled([...pixelReads]).then(()=>undefined);
    return drained;
  };
  canvas.__pandaDispose=dispose;
  const pack=await warmPack(kind);
  if(disposed) return dispose;
  const {manifest}=pack;
  canvas.width=manifest.width;canvas.height=manifest.height;
  canvas.dataset.forewordPlayback=kind;
  let total=0;const ends=manifest.frames.map(frame=>total+=frame.duration);
  const loopStart=manifest.loopStartFrame ? ends[manifest.loopStartFrame-1] : 0;
  const entry=manifest.entryFrame || 0;
  const nextEntry=Math.min(entry+1,manifest.frames.length-1);
  const decodePixels=async index=>{
    const frame=manifest.frames[index];await pack.ensure(frame);
    if(disposed)return;
    const blob=new Blob([pack.bytes.subarray(frame.offset,frame.offset+frame.length)],{type:manifest.mime||'image/jpeg'});
    let bitmap;
    if(typeof createImageBitmap==='function')bitmap=await createImageBitmap(blob);
    else{
      const url=URL.createObjectURL(blob),image=new Image();image.src=url;
      try{await image.decode();}catch(error){URL.revokeObjectURL(url);throw error;}
      bitmap={image,close(){image.removeAttribute('src');URL.revokeObjectURL(url)}};
    }
    try{
      if(disposed)return;
      const width=frame.width||manifest.width,height=frame.height||manifest.height;
      scratch.width=width;scratch.height=height;
      scratchContext.drawImage(bitmap.image||bitmap,0,0);
      const data=scratchContext.getImageData(0,0,width,height);
      scratch.width=1;scratch.height=1;
      return data;
    }finally{bitmap.close();}
  };
  const readPixels=index=>{
    const task=decodePixels(index);pixelReads.add(task);
    task.finally(()=>pixelReads.delete(task)).catch(()=>{});
    return task;
  };
  const decode=async index=>{
    if(pixels.has(index))return pixels.get(index);
    const frame=manifest.frames[index];let data;
    if(manifest.encoding==='lossless-key-and-delta'){
      if(keyCache?.index!==frame.key){
        keyCache=null;
        const key=await readPixels(frame.key);if(disposed||!key)return;
        keyCache={index:frame.key,data:key};
      }
      if(frame.key===index)data=keyCache.data;
      else{
        const patch=await readPixels(index);if(disposed||!patch)return;
        data=new ImageData(new Uint8ClampedArray(keyCache.data.data),manifest.width,manifest.height);
        for(let y=0;y<patch.height;y++)for(let x=0;x<patch.width;x++){
          const from=(y*patch.width+x)*4;if(!patch.data[from+3])continue;
          const to=((frame.y+y)*manifest.width+frame.x+x)*4;
          data.data[to]=patch.data[from];data.data[to+1]=patch.data[from+1];
          data.data[to+2]=patch.data[from+2];data.data[to+3]=patch.data[from+3];
        }
      }
    }else data=await readPixels(index);
    if(disposed||!data)return;
    pixels.set(index,data);while(pixels.size>2)pixels.delete(pixels.keys().next().value);
    canvas.dataset.decodedFrames=String(cacheCount());
    return data;
  };
  const paint=async index=>{
    if(disposed||busy||index===last)return;
    busy=true;
    try{
      const data=await decode(index);if(disposed||!data)return;
      context.putImageData(data,0,0);last=index;canvas.dataset.frameIndex=String(index);
      canvas.__pandaRenderedFrames=(canvas.__pandaRenderedFrames||0)+1;
      canvas.dataset.motionCommit='pixels';
      canvas.dataset.decodedFrames=String(cacheCount());
    }finally{busy=false;}
  };
  // Prepare two successive moving frames. Entry already shows nextEntry, so
  // its following frame must be decoded too; otherwise the first visible step
  // can wait for a native decoder even though readiness has been published.
  await paint(nextEntry);await decode(Math.min(nextEntry+1,manifest.frames.length-1));
  if(disposed)return dispose;
  start=performance.now();
  tick=()=>{
    if(disposed)return;
    const rect=root.getBoundingClientRect(),next=rect.top<innerHeight&&rect.bottom>0;
    if(next&&!visible){
      // The first screenshot can last >100ms. Enter on the next original frame,
      // already decoded, synchronously in the scroll event rather than waiting
      // for a suspended canvas rAF to notice that it has become visible.
      start=performance.now()-ends[entry];
      const prepared=pixels.get(nextEntry);
      if(prepared){
        context.putImageData(prepared,0,0);last=nextEntry;canvas.dataset.frameIndex=String(nextEntry);
        canvas.__pandaRenderedFrames=(canvas.__pandaRenderedFrames||0)+1;
      }
    }
    visible=next;
    if(!next)return;
    const elapsed=performance.now()-start;
    // Entry can begin on an already-moving cursor without deleting the home,
    // component, Code, Preview return, or restart stages from the complete loop.
    const phase=elapsed<total ? elapsed : loopStart+(elapsed-total)%(total-loopStart);
    const index=Math.max(0,ends.findIndex(end=>end>phase));
    void paint(index).catch(error=>{canvas.dataset.playbackError=String(error)});
  };
  window.addEventListener('scroll',tick,{passive:true});window.addEventListener('resize',tick);
  tick();
  const animate=()=>{tick();if(!disposed)frameRequest=requestAnimationFrame(animate)};
  frameRequest=requestAnimationFrame(animate);
  timer=setInterval(tick,100);
  return dispose;
}
