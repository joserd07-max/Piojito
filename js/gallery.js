(() => {
  const cfg = window.PIOJITO || {};
  const photos = Array.isArray(cfg.photos) && cfg.photos.length ? cfg.photos : [{src:"",caption:"Tu foto favorita",alt:"Placeholder para una fotografía"}];
  const image = document.getElementById("gallery-image");
  const card = document.getElementById("main-photo");
  const caption = document.getElementById("photo-caption");
  const count = document.getElementById("gallery-count");
  const dots = document.getElementById("gallery-dots");
  const thumbs = document.getElementById("thumbnails");
  let index = 0;
  const makeThumb = (photo, i) => {
    const b = document.createElement("button"); b.type="button"; b.className="thumb"; b.setAttribute("aria-label",`Mostrar foto ${i+1}`);
    if(photo.src){const im=document.createElement("img");im.src=photo.src;im.alt="";im.loading="lazy";b.append(im);}
    else{const span=document.createElement("span");span.textContent="♡";b.append(span);}
    b.addEventListener("click",()=>show(i)); return b;
  };
  const dotButtons=photos.map((_,i)=>{const b=document.createElement("button");b.type="button";b.setAttribute("aria-label",`Foto ${i+1}`);b.addEventListener("click",()=>show(i));dots.append(b);return b;});
  const thumbButtons=photos.map(makeThumb);thumbButtons.forEach(b=>thumbs.append(b));
  function show(next){
    index=(next+photos.length)%photos.length;const p=photos[index];
    count.textContent=`${index+1} / ${photos.length}`;caption.textContent=p.caption||"";image.alt=p.alt||p.caption||"Fotografía";card.classList.toggle("together",!!p.together);
    if(p.src){image.src=p.src;card.classList.add("has-image");image.onerror=()=>card.classList.remove("has-image");}
    else{image.removeAttribute("src");card.classList.remove("has-image");}
    dotButtons.forEach((b,i)=>b.setAttribute("aria-current",i===index?"true":"false"));
    thumbButtons.forEach((b,i)=>b.classList.toggle("active",i===index));
  }
  document.querySelector(".prev").addEventListener("click",()=>show(index-1));
  document.querySelector(".next").addEventListener("click",()=>show(index+1));
  let x0=0;card.addEventListener("touchstart",e=>{x0=e.changedTouches[0].clientX},{passive:true});
  card.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>45)show(index+(dx<0?1:-1))},{passive:true});
  document.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")show(index-1);if(e.key==="ArrowRight")show(index+1)});
  show(0);

})();

