(()=>{const e=document.querySelector("#card-template").content,t=document.querySelector(".places__list");function c(e){e.remove()}initialCards.forEach((r=>{const n=function(t,c){const r=e.querySelector(".card").cloneNode(!0),n=r.querySelector(".card__image");return n.src=t.link,n.alt=t.name,r.querySelector(".card__title").textContent=t.name,r.querySelector(".card__delete-button").addEventListener("click",(()=>c(r))),r}(r,c);t.append(n)}))})();