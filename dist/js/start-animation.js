import customMouse from"./mouse.js";import scrollAnimation from"./scroll-animation.js";export default function startAnimation(e){function t(e){let t=e.getBoundingClientRect();return{top:t.top+window.scrollY,right:t.right+window.scrollX,bottom:t.bottom+window.scrollY,left:t.left+window.scrollX}}!function(e,t,o){let r=function(e,t){e.q.push(t)},n=e.document;e.Cal=e.Cal||function(){let i=e.Cal,a=arguments;if(i.loaded||(i.ns={},i.q=i.q||[],n.head.appendChild(n.createElement("script")).src=t,i.loaded=!0),a[0]===o){const e=function(){r(e,arguments)},t=a[1];return e.q=e.q||[],void("string"==typeof t?(i.ns[t]=e)&&r(e,a):r(i,a))}r(i,a)}}(window,"https://app.cal.com/embed/embed.js","init"),Cal("init",{origin:"https://app.cal.com"}),Cal("inline",{elementOrSelector:"#feedback-form",calLink:"rick/get-rick-rolled"}),gsap.set(document.querySelector("html"),{"--background-color":"rgb(3,3,4)","--theme-color-1":"rgb(245,248,255)","--theme-color-1-reverse":"rgb(3,3,4)","--theme-switch":0});const o=document.querySelectorAll(".hero__decor_element"),r=document.querySelector(".hero__title"),n=document.querySelector(".hero__mob_title"),i=document.querySelector(".hero__text"),a=document.querySelector(".loader");history.scrollRestoration="manual",gsap.registerPlugin(ScrollTrigger),ScrollTrigger.config({ignoreMobileResize:!0});const s=gsap.timeline({duration:2,ease:"power2.inOut"});s.pause();let l=gsap.matchMedia();l.add("(min-width: 992px)",()=>{let n=new Lenis({wrapper:window,container:document.body});function l(e){n.raf(e),requestAnimationFrame(l)}n.stop(),document.querySelectorAll(".split-lines").forEach(e=>{new SplitType(e,{types:"lines"})}),gsap.set(a,{right:"50%"}),gsap.set(r,{"--x-1":"120%","--x-2":"-120%","--x-3":"120%"}),gsap.set(o[0],{"--y":"-150%","--x":"45%"}),gsap.set(o[1],{"--y":"150%","--x":"-40%"}),gsap.set(i,{"--x":"200%"}),s.to(a,{right:"23.5vw",duration:2,ease:"power2.inOut",onStart:()=>e.header.classList.add("is-loaded")},"-=1"),s.to(o[0],{"--y":"0%",duration:2,ease:"power2.inOut"},"-=2.5"),s.to(o[1],{"--y":"25%",duration:2,ease:"power2.inOut"},"-=2.5"),s.to(r,{"--x-1":"0%","--x-2":"0%","--x-3":"0%",duration:3,ease:"power3.inOut"},"-=2.5"),s.to(i,{"--x":"0%",duration:3,ease:"power3.inOut",onComplete:()=>{setTimeout(()=>{n.destroy(),n=new Lenis({wrapper:window,container:document.body}),requestAnimationFrame(l),n.on("scroll",e=>{ScrollTrigger.update()}),document.body.classList.add("is-loaded"),document.querySelectorAll(".prototypes__container").forEach(e=>{let t=new Lenis({wrapper:e,content:e});const o=e.querySelectorAll(".prototypes__block"),r=e.querySelectorAll(".prototypes__nav_list a");r.forEach(o=>{o.addEventListener("click",r=>{r.preventDefault(),t.scrollTo(e.querySelector(o.getAttribute("href")))})}),t.on("scroll",e=>{o.forEach((e,t)=>{e.getBoundingClientRect().top>0&&e.getBoundingClientRect().top<window.innerHeight/4&&!r[t].classList.contains("is-active")&&(o.forEach(e=>e.classList.remove("is-active")),e.classList.add("is-active"),r.forEach(e=>e.classList.remove("is-active")),r[t].classList.add("is-active"))})}),requestAnimationFrame((function e(o){t.raf(o),requestAnimationFrame(e)}))}),document.querySelectorAll(".header__nav_list a").forEach(e=>{e.addEventListener("click",o=>{o.preventDefault();const r=t(document.querySelector(e.getAttribute("href"))).top;"#cases-section"==e.getAttribute("href")?n.scrollTo(r-window.innerHeight/2):n.scrollTo(r)})}),scrollAnimation({lenis:n}),customMouse()},0)}},"-=3");const c=gsap.timeline();c.pause(),gsap.set(a,{"--background-1":"235deg","--background-2":"270deg","--opacity":"0"}),c.to(a,{"--background-1":"90deg",ease:"linear",duration:1,onComplete:()=>{gsap.set(a,{"--opacity":"1"}),c.pause()}}),c.resume(),window.addEventListener("load",()=>{history.scrollRestoration="manual",document.body.classList.add("is-init"),c.to(a,{"--background-2":"465deg",duration:1,onComplete:()=>{s.resume()}}),setTimeout(()=>{c.resume()},1e3),gsap.to(e.header,{transform:"translate3d(0,0,0)",duration:2,delay:2,ease:"power2.inOut"})})}),l.add("(max-width: 991px)",()=>{const r=gsap.timeline({defaults:{duration:2,ease:"power2.inOut"}});var s;r.pause(),gsap.set(document.body,{overflow:"hidden"}),gsap.set(a,{right:"50%",top:"50%"}),gsap.set(o[0],{"--y":"-150%","--x":"-105%"}),gsap.set(o[1],{"--y":"100%","--x":"100%"}),r.to(a,{right:"50%",top:t(n).top-a.offsetHeight+"px",duration:2,onStart:()=>e.header.classList.add("is-loaded")}),r.to(o[0],{"--y":(s=10,.01*window.innerHeight*s)+"px","--x":"5vw",duration:2,ease:"power2.inOut"},"-=1"),r.to(o[1],{"--y":"0vh","--x":"0vw",duration:2,ease:"power2.inOut"},"-=2"),r.to(n,{opacity:1,duration:3,ease:"power3.inOut"},"-=2.5"),r.to(i,{opacity:1,duration:3,ease:"power3.inOut",onComplete:()=>{setTimeout(()=>{document.body.classList.add("is-loaded"),document.body.style.removeProperty("overflow"),document.querySelectorAll(".header__nav_list a").forEach(o=>{o.addEventListener("click",r=>{r.preventDefault(),e.menu.forEach(e=>{e.classList.remove("is-mobile-menu-active")});const n=t(document.querySelector(o.getAttribute("href"))).top;"#cases-section"==o.getAttribute("href")?window.scrollTo({left:0,top:n-window.innerHeight/2,behavior:"smooth"}):window.scrollTo({left:0,top:n,behavior:"smooth"})})}),scrollAnimation()},0)}},"-=3");const l=gsap.timeline();l.pause(),gsap.set(a,{"--background-1":"235deg","--background-2":"270deg","--opacity":"0"}),l.to(a,{"--background-1":"90deg",ease:"linear",duration:1,onComplete:()=>{gsap.set(a,{"--opacity":"1"}),l.pause()}}),l.resume(),window.addEventListener("load",()=>{history.scrollRestoration="manual",document.body.classList.add("is-init"),l.to(a,{"--background-2":"465deg",duration:1.5,ease:"linear",onComplete:()=>{r.resume()}}),setTimeout(()=>{l.resume()},0),gsap.to(e.header,{transform:"translate3d(0,0,0)",duration:2,delay:2,ease:"power2.inOut"})})})}