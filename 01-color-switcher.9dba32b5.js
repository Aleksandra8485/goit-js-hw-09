const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]");function n(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}e.addEventListener("click",(function(){changeEl=setInterval(n,1e3),e.disabled=!0,t.disabled=!1})),t.addEventListener("click",(function(){clearInterval(changeEl),e.disabled=!1,t.disabled=!0}));
//# sourceMappingURL=01-color-switcher.9dba32b5.js.map
