import Popup from"./popup.js";import form from"./form.js";import startAnimation from"./start-animation.js?v=6";const body=document.querySelector("body"),html=document.querySelector("html"),menu=document.querySelectorAll(".header__burger, .header__nav, body"),header=document.querySelector(".header"),popup=new Popup;popup.init();const imageAspectRatio=document.querySelectorAll(".image-aspect-ratio, figure img");imageAspectRatio.forEach(e=>{e.getAttribute("width")&&e.getAttribute("height")&&e.style.setProperty("--aspect-ratio",`${e.getAttribute("width")}/${e.getAttribute("height")}`)}),body.addEventListener("click",(function(e){function t(t){return e.target.closest(t)}t(".header__burger")&&(window.scrollTo({left:0,top:window.scrollY}),menu.forEach(e=>{e.classList.toggle("is-mobile-menu-active")}));const r=t(".video_block");if(r){const e=r.querySelector("video"),t=new Event("play");e.muted?(e.muted=!1,e.loop=!1,e.removeAttribute("muted"),e.removeAttribute("loop"),e.currentTime=0,setTimeout(()=>{e.play(),e.dispatchEvent(t)},0),r.classList.add("is-playing"),document.querySelector(".play_cursor").classList.remove("is-active"),document.querySelector(".pause_cursor").classList.add("is-active")):r.classList.contains("is-playing")?(e.pause(),document.querySelector(".play_cursor").classList.add("is-active"),document.querySelector(".pause_cursor").classList.remove("is-active")):(e.play(),document.querySelector(".play_cursor").classList.remove("is-active"),document.querySelector(".pause_cursor").classList.add("is-active"))}}));let windowSize=0;function resize(){html.style.setProperty("--height-header",header.offsetHeight+"px"),html.style.setProperty("--vh",.01*window.innerHeight+"px"),html.style.setProperty("--vw",.01*window.innerWidth+"px"),windowSize!=window.innerWidth&&html.style.setProperty("--svh",.01*window.innerHeight+"px"),windowSize=window.innerWidth}function formatTime(e){let t=Math.floor(e/60),r=Math.floor(e%60);return r<10&&(r="0"+r),t+":"+r}resize(),window.addEventListener("resize",resize),document.querySelectorAll(".video_block").forEach(e=>{const t=e.querySelector("video"),r=e.querySelectorAll(".video_block__time span");let o,i;t.addEventListener("play",()=>{t.muted||(e.classList.add("is-playing"),i=setInterval(()=>{o=t.currentTime/t.duration*100,o&&e.style.setProperty("--progress",o)},50))}),t.addEventListener("pause",()=>{t.muted||(e.classList.remove("is-playing"),clearInterval(i))}),setInterval(()=>{r.forEach(e=>e.textContent=formatTime(t.currentTime))},1e3)}),startAnimation({header:header,menu:menu}),form();