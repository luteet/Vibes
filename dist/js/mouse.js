export default function customMouse(){const e=document.querySelector(".custom_cursor"),t=document.querySelector(".play_cursor"),s=document.querySelector(".pause_cursor"),o=(()=>{const e=navigator.userAgent;return/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(e)?"tablet":/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(e)?"mobile":"desktop"})();let i=gsap.quickTo(".custom_cursor, .play_cursor, .pause_cursor","left",{duration:.2,ease:"power3"}),a=gsap.quickTo(".custom_cursor, .play_cursor, .pause_cursor","top",{duration:.2,ease:"power3"});document.addEventListener("mousemove",(function(t){if(e.classList.contains("is-start")&&setTimeout(()=>e.classList.remove("is-start"),200),"desktop"==o){const e={left:t.clientX,top:t.clientY};i(e.left),a(e.top)}})),document.querySelectorAll(".is-active-mouse").forEach(t=>{t.addEventListener("mouseenter",()=>{"desktop"==o&&e.classList.add("is-active")}),t.addEventListener("mouseleave",()=>{"desktop"==o&&e.classList.remove("is-active")})}),document.querySelectorAll(".button, .feedback__check label, .is-min-active-mouse, .magnetic_button, .feedback__file_remove, .header__nav_list a").forEach(t=>{t.addEventListener("mouseenter",()=>{"desktop"==o&&(t.classList.contains("is-min-cursor")?e.classList.add("on-min-button"):e.classList.add("on-button"))}),t.addEventListener("mouseleave",()=>{"desktop"==o&&(e.classList.remove("on-button"),e.classList.remove("on-min-button"))})}),document.querySelectorAll(".prototypes__container, .prototypes__bg").forEach(t=>{t.addEventListener("mouseenter",()=>{"desktop"==o&&e.classList.add("is-close-mode")}),t.addEventListener("mouseleave",()=>{"desktop"==o&&e.classList.remove("is-close-mode")})}),document.querySelectorAll("#feedback-form").forEach(t=>{t.addEventListener("mouseenter",()=>{"desktop"==o&&e.classList.add("is-hidden")}),t.addEventListener("mouseleave",()=>{"desktop"==o&&e.classList.remove("is-hidden")})}),document.querySelectorAll(".video_block").forEach(i=>{i.addEventListener("mouseenter",()=>{"desktop"==o&&(e.classList.add("is-hidden"),i.classList.contains("is-playing")?s.classList.add("is-active"):t.classList.add("is-active"))}),i.addEventListener("mouseleave",()=>{"desktop"==o&&(e.classList.remove("is-hidden"),t.classList.remove("is-active"),s.classList.remove("is-active"))})}),document.querySelectorAll(".magnetic_button, .header__nav_list a").forEach(e=>{let t=gsap.utils.pipe(gsap.quickTo(e,"x",{duration:1.25,ease:"elastic.out(1, 0.3)"})),s=gsap.utils.pipe(gsap.quickTo(e,"y",{duration:1.25,ease:"elastic.out(1, 0.3)"}));e.addEventListener("mousemove",i=>{if("desktop"==o&&!e.disabled){const{clientX:o,clientY:a}=i,{height:n,width:d,left:c,top:r}=e.getBoundingClientRect(),l=a-(r+n/2);t(o-(c+d/2)),s(l)}}),e.addEventListener("mouseenter",e=>{"desktop"==o&&(t(0),s(0))}),e.addEventListener("mouseleave",e=>{"desktop"==o&&(t(0),s(0))})})}