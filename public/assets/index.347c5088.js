import{S as n,i as t,s as e,e as s,a as c,b as o,c as a,d as i,l as u,n as r,f as l,r as m,g as p,H as d,h as f,j as E,t as h,k as T,m as A,o as S,p as D,q as _,u as v}from"./vendor.6bb967f8.js";var w,g;(g=w||(w={})).SET_VIDEO="SET_VIDEO",g.LOAD_VIDEO="LOAD_VIDEO",g.UPDATE_STATE="UPDATE_STATE",g.SEEK="SEEK";function I(n){let t,e,p,d,E,h=window.location.search.includes("can_control"),T=h&&function(n){let t,e,r,p,d,E;return{c(){t=s("form"),e=s("input"),r=c(),p=s("button"),p.textContent="Change Video",o(e,"name","src"),o(p,"type","submit")},m(s,c){a(s,t,c),i(t,e),f(e,n[2]),i(t,r),i(t,p),n[11](t),d||(E=[u(e,"input",n[10]),u(t,"submit",n[3])],d=!0)},p(n,t){4&t&&e.value!==n[2]&&f(e,n[2])},d(e){e&&l(t),n[11](null),d=!1,m(E)}}}(n);return{c(){t=s("div"),e=s("video"),e.innerHTML='<track kind="captions"/>',p=c(),T&&T.c(),o(e,"height","400"),e.controls=!0,o(t,"class","player svelte-1dhddcs")},m(s,c){a(s,t,c),i(t,e),n[6](e),i(t,p),T&&T.m(t,null),d||(E=[u(e,"play",n[7]),u(e,"pause",n[8]),u(e,"seeking",n[9])],d=!0)},p(n,[t]){h&&T.p(n,t)},i:r,o:r,d(e){e&&l(t),n[6](null),T&&T.d(),d=!1,m(E)}}}function y(n,t,e){let s,c,o,a=!0;const i=p(""),u=new d;i.onAny((()=>{a=!1}));const r=i.on;function l(n){window.location.search.includes("can_control")&&a&&i.emit(w.UPDATE_STATE,{state:n})}function m(){window.location.search.includes("can_control")&&a&&i.emit(w.SEEK,{timeStamp:s.currentTime})}i.on=function(n,t,...e){return r.apply(i,[n,function(...n){t(...n),setTimeout((()=>a=!0),0)},...e])},i.onAny(((...n)=>console.log("Received:",n))),i.on(w.LOAD_VIDEO,(function(n){n.src.includes(".mp4")?e(0,s.src=n.src,s):(u.loadSource(n.src),u.attachMedia(s)),e(0,s.currentTime=n.timeStamp,s),"PLAYING"===n.state?s.play():s.pause()})),i.on(w.UPDATE_STATE,(function(n){"PLAYING"===n.state?s.play():s.pause()})),i.on(w.SEEK,(function(n){e(0,s.currentTime=n.timeStamp,s)}));return[s,c,o,function(n){n.preventDefault(),window.location.search.includes("can_control")&&a&&(i.emit(w.SET_VIDEO,{src:o}),e(2,o=""))},l,m,function(n){E[n?"unshift":"push"]((()=>{s=n,e(0,s)}))},()=>l("PLAYING"),()=>l("PAUSED"),()=>m(),function(){o=this.value,e(2,o)},function(n){E[n?"unshift":"push"]((()=>{c=n,e(1,c)}))}]}class O extends n{constructor(n){super(),t(this,n,y,I,e,{})}}function b(n){let t,e,c;return{c(){t=s("button"),t.textContent="Join",o(t,"class","join-btn svelte-tk5h9s")},m(s,o){a(s,t,o),e||(c=u(t,"click",n[1]),e=!0)},p:r,i:r,o:r,d(n){n&&l(t),e=!1,c()}}}function P(n){let t,e;return t=new O({}),{c(){D(t.$$.fragment)},m(n,s){_(t,n,s),e=!0},p:r,i(n){e||(A(t.$$.fragment,n),e=!0)},o(n){h(t.$$.fragment,n),e=!1},d(n){v(t,n)}}}function k(n){let t,e,c,i;const u=[P,b],r=[];function m(n,t){return n[0]?0:1}return e=m(n),c=r[e]=u[e](n),{c(){t=s("main"),c.c(),o(t,"class","svelte-tk5h9s")},m(n,s){a(n,t,s),r[e].m(t,null),i=!0},p(n,[s]){let o=e;e=m(n),e===o?r[e].p(n,s):(S(),h(r[o],1,1,(()=>{r[o]=null})),T(),c=r[e],c?c.p(n,s):(c=r[e]=u[e](n),c.c()),A(c,1),c.m(t,null))},i(n){i||(A(c),i=!0)},o(n){h(c),i=!1},d(n){n&&l(t),r[e].d()}}}function L(n,t,e){let s=!1;return[s,()=>e(0,s=!0)]}new class extends n{constructor(n){super(),t(this,n,L,k,e,{})}}({target:document.getElementById("app")});
