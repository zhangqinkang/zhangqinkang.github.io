// Preserve original files; prepare lossless PNGs at the actual display density.
// Native <img> rendering retains WebKit's efficient static-image tile cache.
const images=new Map(),jobs=new Map()
let busy=false,scratch,context
try{scratch=new OffscreenCanvas(1,1);context=scratch.getContext('2d',{alpha:true})}catch{}
postMessage({ready:typeof createImageBitmap==='function'&&!!context&&typeof scratch.convertToBlob==='function'})
async function pump(){
  if(busy)return
  busy=true
  try{for(;;){
    const job=[...jobs.values()].filter(job=>{const image=images.get(job.id);return image&&(image.blob||image.error)}).sort((a,b)=>(a.priority||0)-(b.priority||0))[0]
    if(!job)break
    const entry=images.get(job.id),key=`${job.width||0}x${job.height||0}`
    let bitmap
    try{
      if(entry.error)throw entry.error
      let blob=entry.previews.get(key)
      if(!blob){
        bitmap=await createImageBitmap(entry.blob,...(job.width?[{resizeWidth:job.width,resizeHeight:job.height,resizeQuality:'high'}]:[]))
        if(images.get(job.id)!==entry||jobs.get(job.surface)!==job){bitmap.close();continue}
        scratch.width=bitmap.width;scratch.height=bitmap.height
        context.globalCompositeOperation='copy';context.drawImage(bitmap,0,0);bitmap.close();bitmap=null
        blob=await scratch.convertToBlob({type:'image/png'})
        scratch.width=scratch.height=1
        if(images.get(job.id)!==entry||jobs.get(job.surface)!==job)continue
        entry.previews.set(key,blob)
      }
      postMessage({surface:job.surface,blob})
    }catch(error){bitmap?.close();scratch.width=scratch.height=1;postMessage({surface:job.surface,error:String(error)})}
    finally{if(jobs.get(job.surface)===job)jobs.delete(job.surface)}
  }}finally{busy=false}
}
onmessage=({data})=>{
  const {type,id}=data
  if(type==='close'){
    const image=images.get(id);if(!image)return
    images.delete(id);image.controller.abort();image.previews.clear()
    for(const [surface,job]of jobs)if(job.id===id)jobs.delete(surface)
    return
  }
  if(type==='cancel'){jobs.delete(data.surface);return}
  if(type==='priority'){const job=jobs.get(data.surface);if(job)job.priority=data.priority;return}
  if(type==='open'){
    const entry={controller:new AbortController(),blob:null,error:null,previews:new Map()}
    images.set(id,entry)
    void fetch(data.src,{signal:entry.controller.signal}).then(async response=>{
      if(!response.ok)throw Error(`Original image ${response.status}`)
      const blob=await response.blob()
      if(images.get(id)===entry){entry.blob=blob;void pump()}
    }).catch(error=>{if(images.get(id)===entry){entry.error=error;void pump()}})
    return
  }
  if(type==='render'){jobs.set(data.surface,data);void pump()}
}
