// Fit a canonical desktop document into a phone card without a transformed
// iframe surface. WebKit zoom changes the layout/media viewport differently
// from innerWidth; freeze both before an archived component measures its DOM.
try {
  const host = window.frameElement
  const proof = host?.closest('.panda-proof-live-preview')
  const reference = host?.closest('.panda-reference-live-window')
  if ((proof || reference) && parent.matchMedia('(max-width:820px)').matches) {
    const width = Number(host.getAttribute('width')) || 1440
    const height = Number(host.getAttribute('height')) || 900
    Object.defineProperty(window,'devicePixelRatio',{configurable:true,get:()=>1})
    document.documentElement.style.setProperty('-webkit-text-size-adjust','100%')
    const fixed = document.createElement('style')
    fixed.dataset.portfolioVirtualViewport = 'true'
    fixed.textContent = `html,body{width:${width}px!important;min-width:${width}px!important;height:${height}px!important;min-height:${height}px!important}#panda-proof-scroll{width:${width}px!important;height:${height}px!important}`
    document.head.append(fixed)
    const sizes = {width,height}
    const flag = value => `(min-width:${value?0:100000}px)`
    const limit = (value,unit) => Number(value)*(unit==='px'?1:16)
    const normalize = query => query
      .replace(/\(\s*(min|max)-(width|height)\s*:\s*([\d.]+)(px|em|rem)\s*\)/g,(_,edge,axis,value,unit)=>flag(edge==='min'?sizes[axis]>=limit(value,unit):sizes[axis]<=limit(value,unit)))
      .replace(/\(\s*(width|height)\s*(>=|<=|>|<|=)\s*([\d.]+)(px|em|rem)\s*\)/g,(_,axis,op,value,unit)=>{const size=sizes[axis],bound=limit(value,unit);return flag(op==='>='?size>=bound:op==='<='?size<=bound:op==='>'?size>bound:op==='<'?size<bound:size===bound)})
      .replace(/\(\s*orientation\s*:\s*(portrait|landscape)\s*\)/g,(_,value)=>flag(value===(width>=height?'landscape':'portrait')))
    const match = window.matchMedia.bind(window)
    window.matchMedia = query => match(normalize(query))
    const viewportUnits = value => value.replace(/(-?(?:\d*\.)?\d+)(vw|vh|vmin|vmax)\b/g,(_,number,unit)=>`${Number(number)*({vw:width,vh:height,vmin:Math.min(width,height),vmax:Math.max(width,height)}[unit])/100}px`)
    const visit = rules => {
      for (const rule of rules) {
        if (rule.media) rule.media.mediaText = normalize(rule.media.mediaText)
        if (rule.style) for (const name of [...rule.style]) {
          const value = rule.style.getPropertyValue(name),next=viewportUnits(value)
          if(next!==value)rule.style.setProperty(name,next,rule.style.getPropertyPriority(name))
        }
        if (rule.cssRules) visit(rule.cssRules)
      }
    }
    const frozen = new WeakSet()
    const freeze = () => {
      for (const sheet of document.styleSheets) {
        if (frozen.has(sheet)) continue
        try { visit(sheet.cssRules); frozen.add(sheet) } catch {/* Pending/cross-origin CSS is not rewritten. */}
      }
    }
    document.addEventListener('load',freeze,true)
    document.addEventListener('DOMContentLoaded',()=>{freeze();document.querySelectorAll('img').forEach(image=>image.loading='eager')},{once:true})
    const observer = new MutationObserver(records => {
      for (const record of records) {
        const node = record.target.nodeType===Node.TEXT_NODE?record.target.parentElement:record.target
        if (node instanceof HTMLStyleElement && node.sheet) frozen.delete(node.sheet)
      }
      freeze()
    })
    observer.observe(document.head,{childList:true,subtree:true,characterData:true})
    addEventListener('pagehide',()=>{observer.disconnect();document.removeEventListener('load',freeze,true)},{once:true})
    freeze()
    // Source routers must never scroll the surrounding phone page. The
    // foreword's gallery intentionally pans in its own document.
    if (proof && location.pathname.includes('/reference-sites/')) {
      window.scrollTo = window.scroll = () => {}
      Element.prototype.scrollIntoView = () => {}
    }
  }
} catch {
  // Standalone documents and desktop embeds retain their native viewport.
}
