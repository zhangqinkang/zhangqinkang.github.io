// Pixel ownership remains here for offscreen presentation. The main-thread
// player keeps only three closeable frame handles, with the same source/timing.
const frames=new Map(),surfaces=new Map()
let presentation=false
try { presentation=typeof OffscreenCanvas==='function'&&!!new OffscreenCanvas(1,1).getContext('2d') } catch {}
postMessage({ready:typeof createImageBitmap==='function',presentation})
onmessage=async({data})=>{
  const {type,id}=data
  if(type==='attach'){surfaces.set(id,{canvas:data.canvas,context:data.canvas.getContext('2d',{alpha:true})});return}
  if(type==='resize'){const surface=surfaces.get(id);if(surface){surface.canvas.width=data.width;surface.canvas.height=data.height}return}
  if(type==='detach'){const surface=surfaces.get(id);if(surface){surface.canvas.width=surface.canvas.height=1;surfaces.delete(id)}return}
  if(type==='close'){frames.get(id)?.close();frames.delete(id);return}
  if(type==='paint'){
    const bitmap=frames.get(id)
    try{
      if(!bitmap)throw Error('Retired frame')
      for(const target of data.targets){const surface=surfaces.get(target);if(!surface?.context)continue
        surface.context.globalCompositeOperation='copy'
        surface.context.drawImage(bitmap,0,0,surface.canvas.width,surface.canvas.height)
      }
      postMessage({painted:data.ticket,ok:true})
    }catch{postMessage({painted:data.ticket,ok:false})}
    return
  }
  let bitmap
  try {
    bitmap=await createImageBitmap(data.blob,{resizeWidth:data.width,resizeHeight:data.height,resizeQuality:'high'})
    if(data.retain){frames.set(id,bitmap);postMessage({id,frame:{width:bitmap.width,height:bitmap.height}})}
    else postMessage({id,bitmap},[bitmap])
  }catch(error){bitmap?.close();postMessage({id,error:String(error)})}
}
