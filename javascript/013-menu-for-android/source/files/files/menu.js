var app=function(){"use strict";function t(){}const e=t=>t;function n(t){return t()}function o(){return Object.create(null)}function s(t){t.forEach(n)}function r(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function l(t,e,n){t.$$.on_destroy.push(i(e,n))}function u(t,e,n,o){if(t){const s=a(t,e,n,o);return t[0](s)}}function a(t,e,n,o){return t[1]&&o?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](o(e))):n.ctx}function d(t,e,n,o,s,r,c){const i=function(t,e,n,o){if(t[2]&&o){const s=t[2](o(n));if(void 0===e.dirty)return s;if("object"==typeof s){const t=[],n=Math.max(e.dirty.length,s.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|s[o];return t}return e.dirty|s}return e.dirty}(e,o,s,r);if(i){const s=a(e,n,o,c);t.p(s,i)}}const f="undefined"!=typeof window;let m=f?()=>window.performance.now():()=>Date.now(),p=f?t=>requestAnimationFrame(t):t;const g=new Set;function b(t){g.forEach((e=>{e.c(t)||(g.delete(e),e.f())})),0!==g.size&&p(b)}function h(t){let e;return 0===g.size&&p(b),{promise:new Promise((n=>{g.add(e={c:t,f:n})})),abort(){g.delete(e)}}}function $(t,e){t.appendChild(e)}function y(t,e,n){t.insertBefore(e,n||null)}function v(t){t.parentNode.removeChild(t)}function k(t){return document.createElement(t)}function x(t){return document.createTextNode(t)}function _(){return x(" ")}function w(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function j(t){return function(e){return e.preventDefault(),t.call(this,e)}}function O(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function B(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function S(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}function C(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}const I=new Set;let M,E=0;function A(t,e,n,o,s,r,c,i=0){const l=16.666/o;let u="{\n";for(let t=0;t<=1;t+=l){const o=e+(n-e)*r(t);u+=100*t+`%{${c(o,1-o)}}\n`}const a=u+`100% {${c(n,1-n)}}\n}`,d=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(a)}_${i}`,f=t.ownerDocument;I.add(f);const m=f.__svelte_stylesheet||(f.__svelte_stylesheet=f.head.appendChild(k("style")).sheet),p=f.__svelte_rules||(f.__svelte_rules={});p[d]||(p[d]=!0,m.insertRule(`@keyframes ${d} ${a}`,m.cssRules.length));const g=t.style.animation||"";return t.style.animation=`${g?`${g}, `:""}${d} ${o}ms linear ${s}ms 1 both`,E+=1,d}function F(t,e){const n=(t.style.animation||"").split(", "),o=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),s=n.length-o.length;s&&(t.style.animation=o.join(", "),E-=s,E||p((()=>{E||(I.forEach((t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}})),I.clear())})))}function q(t){const e=getComputedStyle(t);if("absolute"!==e.position&&"fixed"!==e.position){const{width:n,height:o}=e,s=t.getBoundingClientRect();t.style.position="absolute",t.style.width=n,t.style.height=o,function(t,e){const n=t.getBoundingClientRect();if(e.left!==n.left||e.top!==n.top){const o=getComputedStyle(t),s="none"===o.transform?"":o.transform;t.style.transform=`${s} translate(${e.left-n.left}px, ${e.top-n.top}px)`}}(t,s)}}function T(t){M=t}function V(){const t=function(){if(!M)throw new Error("Function called outside component initialization");return M}();return(e,n)=>{const o=t.$$.callbacks[e];if(o){const s=C(e,n);o.slice().forEach((e=>{e.call(t,s)}))}}}function R(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach((t=>t(e)))}const z=[],D=[],H=[],L=[],P=Promise.resolve();let N=!1;function G(t){H.push(t)}let W=!1;const Y=new Set;function J(){if(!W){W=!0;do{for(let t=0;t<z.length;t+=1){const e=z[t];T(e),K(e.$$)}for(T(null),z.length=0;D.length;)D.pop()();for(let t=0;t<H.length;t+=1){const e=H[t];Y.has(e)||(Y.add(e),e())}H.length=0}while(z.length);for(;L.length;)L.pop()();N=!1,W=!1,Y.clear()}}function K(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(G)}}let Q;function U(t,e,n){t.dispatchEvent(C(`${e?"intro":"outro"}${n}`))}const X=new Set;let Z;function tt(){Z={r:0,c:[],p:Z}}function et(){Z.r||s(Z.c),Z=Z.p}function nt(t,e){t&&t.i&&(X.delete(t),t.i(e))}function ot(t,e,n,o){if(t&&t.o){if(X.has(t))return;X.add(t),Z.c.push((()=>{X.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}const st={duration:0};function rt(n,o,c,i){let l=o(n,c),u=i?0:1,a=null,d=null,f=null;function p(){f&&F(n,f)}function g(t,e){const n=t.b-u;return e*=Math.abs(n),{a:u,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function b(o){const{delay:r=0,duration:c=300,easing:i=e,tick:b=t,css:$}=l||st,y={start:m()+r,b:o};o||(y.group=Z,Z.r+=1),a||d?d=y:($&&(p(),f=A(n,u,o,c,r,i,$)),o&&b(0,1),a=g(y,c),G((()=>U(n,o,"start"))),h((t=>{if(d&&t>d.start&&(a=g(d,c),d=null,U(n,a.b,"start"),$&&(p(),f=A(n,u,a.b,a.duration,0,i,l.css))),a)if(t>=a.end)b(u=a.b,1-u),U(n,a.b,"end"),d||(a.b?p():--a.group.r||s(a.group.c)),a=null;else if(t>=a.start){const e=t-a.start;u=a.a+a.d*i(e/a.duration),b(u,1-u)}return!(!a&&!d)})))}return{run(t){r(l)?(Q||(Q=Promise.resolve(),Q.then((()=>{Q=null}))),Q).then((()=>{l=l(),b(t)})):b(t)},end(){p(),a=d=null}}}function ct(t,e){t.f(),function(t,e){ot(t,1,1,(()=>{e.delete(t.key)}))}(t,e)}function it(t){t&&t.c()}function lt(t,e,o,c){const{fragment:i,on_mount:l,on_destroy:u,after_update:a}=t.$$;i&&i.m(e,o),c||G((()=>{const e=l.map(n).filter(r);u?u.push(...e):s(e),t.$$.on_mount=[]})),a.forEach(G)}function ut(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function at(t,e){-1===t.$$.dirty[0]&&(z.push(t),N||(N=!0,P.then(J)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function dt(e,n,r,c,i,l,u=[-1]){const a=M;T(e);const d=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:i,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:n.context||[]),callbacks:o(),dirty:u,skip_bound:!1};let f=!1;if(d.ctx=r?r(e,n.props||{},((t,n,...o)=>{const s=o.length?o[0]:n;return d.ctx&&i(d.ctx[t],d.ctx[t]=s)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](s),f&&at(e,t)),n})):[],d.update(),f=!0,s(d.before_update),d.fragment=!!c&&c(d.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);d.fragment&&d.fragment.l(t),t.forEach(v)}else d.fragment&&d.fragment.c();n.intro&&nt(e.$$.fragment),lt(e,n.target,n.anchor,n.customElement),J()}T(a)}class ft{$destroy(){ut(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const mt=[];function pt(e,n=t){let o;const s=[];function r(t){if(c(e,t)&&(e=t,o)){const t=!mt.length;for(let t=0;t<s.length;t+=1){const n=s[t];n[1](),mt.push(n,e)}if(t){for(let t=0;t<mt.length;t+=2)mt[t][0](mt[t+1]);mt.length=0}}}return{set:r,update:function(t){r(t(e))},subscribe:function(c,i=t){const l=[c,i];return s.push(l),1===s.length&&(o=n(r)||t),c(e),()=>{const t=s.indexOf(l);-1!==t&&s.splice(t,1),0===s.length&&(o(),o=null)}}}}const gt=pt([]),bt=["icon","textual","label","description","rightIcon","rightImage"],ht={subscribe:gt.subscribe,allColumns:()=>{gt.set([...bt])},setColumns:t=>{gt.set([...t])}},$t=pt([]),yt={subscribe:$t.subscribe,clearMenu:()=>$t.set([]),push:t=>{const e=Object.assign(Object.assign({},t),{id:Math.random().toString()});$t.update((t=>[...t,e]))},unshift:t=>{const e=Object.assign(Object.assign({},t),{id:Math.random().toString()});$t.update((t=>[e,...t]))},shift:()=>{$t.update((t=>{const e=[...t];return e.shift(),[...e]}))},pop:()=>{$t.update((t=>{const e=[...t];return e.pop(),[...e]}))},addItemAtIndex:(t,e)=>{const n=Object.assign(Object.assign({},e),{id:Math.random().toString()});$t.update((e=>{const o=[...e];return o.splice(t,0,n),o}))},updateItemById:(t,e)=>{$t.update((n=>{const o=n.findIndex((e=>e.id===t)),s=Object.assign(Object.assign({},n[o]),e),r=[...n];return r[o]=s,r}))},updateItemByLabel:(t,e)=>{$t.update((n=>{const o=n.findIndex((e=>e.label===t)),s=Object.assign(Object.assign({},n[o]),e),r=[...n];return r[o]=s,r}))},updateItemByIndex:(t,e)=>{$t.update((n=>{const o=Object.assign(Object.assign({},n[t]),e),s=[...n];return s[t]=o,s}))},removeItemById:t=>{$t.update((e=>e.filter((e=>e.id!==t))))},removeItemByLabel:t=>{$t.update((e=>e.filter((e=>e.label!==t))))},removeItemByIndex:t=>{$t.update((e=>{const n=[...e];n.splice(t,1);return[...n]}))},loadItemsFromArray:t=>{const e=t.map((t=>Object.assign({id:Math.random().toString()},t)));$t.set(e)}},vt={"Gold Miner":{"color-primary":"#a3700a","color-background":"#100408","modal-background":"#000000bf"},Bouron:{"color-primary":"#ED6E0F","color-background":"#1F1B0F","modal-background":"#F4ECE1bf"},Oscar:{"color-primary":"#FF7BC4","color-background":"#2A495D","modal-background":"#F0D2CAbf"},"Herrera Yellow":{"color-primary":"#FABA1C","color-background":"#B4B5B9","modal-background":"#B4B5B9bf"},"Herrera Green":{"color-primary":"#375A3A","color-background":"#B4B5B9","modal-background":"#B4B5B9bf"},"Herrera Blue":{"color-primary":"#354CC0","color-background":"#B4B5B9","modal-background":"#B4B5B9bf"},"Herrera Magenta":{"color-primary":"#F84C58","color-background":"#B4B5B9","modal-background":"#B4B5B9bf"},Dark:{"color-primary":"#C8C8C8","color-background":"#282828","modal-background":"#969696bf"},Light:{"color-primary":"#282828","color-background":"#C8C8C8","modal-background":"#969696bf"}};const kt=pt({cssVarStyles:"","color-primary":"#a3700a","color-background":"#100408","font-title":"Roboto, sans-serif","font-items":"Roboto, sans-serif","modal-background":"#000000bf","menu-width":"auto","menu-min-width":"128px","menu-max-width":"80%","menu-max-height":"80vh","menu-border-radius":"4px","menu-border-style":"solid","menu-border-width":"1px","item-height":"48px","item-icon-size":"32px","item-image-size":"48px"}),xt={subscribe:kt.subscribe,init:()=>{const t=_t();kt.update((e=>{const n=Object.assign({},e);return n.cssVarStyles=t,n}))},changeStyle:(t,e)=>{kt.update((n=>{const o=Object.assign({},n);return o[t]=e,o}));const n=_t();kt.update((t=>{const e=Object.assign({},t);return e.cssVarStyles=n,e}))},changeFontTitle:t=>{kt.update((e=>{const n=Object.assign({},e);return n["font-title"]=t,n}));const e=_t();kt.update((t=>{const n=Object.assign({},t);return n.cssVarStyles=e,n}))},changeFontItems:t=>{kt.update((e=>{const n=Object.assign({},e);return n["font-items"]=t,n}));const e=_t();kt.update((t=>{const n=Object.assign({},t);return n.cssVarStyles=e,n}))},changeFontTitleAndItems:(t,e)=>{kt.update((n=>{const o=Object.assign({},n);return o["font-title"]=t,o["font-items"]=e,o}));const n=_t();kt.update((t=>{const e=Object.assign({},t);return e.cssVarStyles=n,e}))},themeStandard:t=>{const e=Object.assign({},vt[t]);kt.update((t=>Object.assign(Object.assign({},t),e)));const n=_t();kt.update((t=>{const e=Object.assign({},t);return e.cssVarStyles=n,e}))},loadTheme:(t,e="Light")=>{console.log("loadTheme"),console.log(t);const n=Object.assign({},vt[e]);kt.update((t=>Object.assign(Object.assign({},t),n)));const o=Object.assign({},t);kt.update((t=>Object.assign(Object.assign({},t),o)));const s=_t();kt.update((t=>{const e=Object.assign({},t);return e.cssVarStyles=s,e}))}};function _t(){const t=function(t){let e;return i(t,(t=>e=t))(),e}(kt);return Object.entries(t).map((([t,e])=>"cssVarStyles"!==t?`--${t}:${e};`:"")).join("")}const wt=pt("Hello World!"),jt={subscribe:wt.subscribe,setTitle:t=>wt.set(t),reset:()=>wt.set("Menu"),clear:()=>wt.set("")},Ot=pt(!1),Bt={subscribe:Ot.subscribe,true:()=>Ot.set(!0),false:()=>Ot.set(!1)};function St(t){const e=t-1;return e*e*e+1}function Ct(t,{delay:n=0,duration:o=400,easing:s=e}={}){const r=+getComputedStyle(t).opacity;return{delay:n,duration:o,easing:s,css:t=>"opacity: "+t*r}}function It(t,{delay:e=0,duration:n=400,easing:o=St,x:s=0,y:r=0,opacity:c=0}={}){const i=getComputedStyle(t),l=+i.opacity,u="none"===i.transform?"":i.transform,a=l*(1-c);return{delay:e,duration:n,easing:o,css:(t,e)=>`\n\t\t\ttransform: ${u} translate(${(1-t)*s}px, ${(1-t)*r}px);\n\t\t\topacity: ${l-a*e}`}}function Mt(t,e,n={}){const o=getComputedStyle(t),s="none"===o.transform?"":o.transform,c=e.from.width/t.clientWidth,i=e.from.height/t.clientHeight,l=(e.from.left-e.to.left)/c,u=(e.from.top-e.to.top)/i,a=Math.sqrt(l*l+u*u),{delay:d=0,duration:f=(t=>120*Math.sqrt(t)),easing:m=St}=n;return{delay:d,duration:r(f)?f(a):f,easing:m,css:(t,e)=>`transform: ${s} translate(${e*l}px, ${e*u}px);`}}function Et(e){let n,o,s;return{c(){n=k("div"),B(n,"class","modal svelte-1yqu2p3")},m(t,e){y(t,n,e),s=!0},p:t,i(t){s||(G((()=>{o||(o=rt(n,Ct,{},!0)),o.run(1)})),s=!0)},o(t){o||(o=rt(n,Ct,{},!1)),o.run(0),s=!1},d(t){t&&v(n),t&&o&&o.end()}}}class At extends ft{constructor(t){super(),dt(this,t,null,Et,c,{})}}function Ft(t,e,n){const o=t.slice();return o[8]=e[n],o}const qt=t=>({prop:1&t,columns:2&t}),Tt=t=>({prop:t[8],columns:t[1]}),Vt=t=>({}),Rt=t=>({class:"header"});function zt(n,o){let s,r,c,i,l=t;const a=o[4].item,f=u(a,o,o[3],Tt);return{key:n,first:null,c(){s=k("span"),f&&f.c(),r=_(),this.first=s},m(t,e){y(t,s,e),f&&f.m(s,null),$(s,r),i=!0},p(t,e){o=t,f&&f.p&&(!i||11&e)&&d(f,a,o,o[3],e,qt,Tt)},r(){c=s.getBoundingClientRect()},f(){q(s),l()},a(){l(),l=function(n,o,s,r){if(!o)return t;const c=n.getBoundingClientRect();if(o.left===c.left&&o.right===c.right&&o.top===c.top&&o.bottom===c.bottom)return t;const{delay:i=0,duration:l=300,easing:u=e,start:a=m()+i,end:d=a+l,tick:f=t,css:p}=s(n,{from:o,to:c},r);let g,b=!0,$=!1;function y(){p&&F(n,g),b=!1}return h((t=>{if(!$&&t>=a&&($=!0),$&&t>=d&&(f(1,0),y()),!b)return!1;if($){const e=0+1*u((t-a)/l);f(e,1-e)}return!0})),p&&(g=A(n,0,1,l,i,u,p)),i||($=!0),f(0,1),y}(s,c,Mt,{})},i(t){i||(nt(f,t),i=!0)},o(t){ot(f,t),i=!1},d(t){t&&v(s),f&&f.d(t)}}}function Dt(t){let e,n,o,r,c,i,l,a,f,m,p=[],g=new Map;e=new At({}),e.$on("closeModal",t[6]);const b=t[4].header,h=u(b,t,t[3],Rt),S=h||function(t){let e;return{c(){e=x("No header was provided")},m(t,n){y(t,e,n)},d(t){t&&v(e)}}}();let C=t[0];const I=t=>t[8].id;for(let e=0;e<C.length;e+=1){let n=Ft(t,C,e),o=I(n);g.set(o,p[e]=zt(o,n))}return{c(){it(e.$$.fragment),n=_(),o=k("div"),r=k("div"),S&&S.c(),c=_(),i=k("div");for(let t=0;t<p.length;t+=1)p[t].c();B(i,"class","scrollbar svelte-leskwv"),B(r,"class","menu svelte-leskwv"),B(o,"class","flex-container svelte-leskwv")},m(s,l){lt(e,s,l),y(s,n,l),y(s,o,l),$(o,r),S&&S.m(r,null),$(r,c),$(r,i);for(let t=0;t<p.length;t+=1)p[t].m(i,null);a=!0,f||(m=[w(r,"click",O(j(t[5]))),w(o,"click",O(j(t[2])))],f=!0)},p(t,[e]){if(h&&h.p&&(!a||8&e)&&d(h,b,t,t[3],e,Vt,Rt),11&e){C=t[0],tt();for(let t=0;t<p.length;t+=1)p[t].r();p=function(t,e,n,o,s,r,c,i,l,u,a,d){let f=t.length,m=r.length,p=f;const g={};for(;p--;)g[t[p].key]=p;const b=[],h=new Map,$=new Map;for(p=m;p--;){const t=d(s,r,p),i=n(t);let l=c.get(i);l?o&&l.p(t,e):(l=u(i,t),l.c()),h.set(i,b[p]=l),i in g&&$.set(i,Math.abs(p-g[i]))}const y=new Set,v=new Set;function k(t){nt(t,1),t.m(i,a),c.set(t.key,t),a=t.first,m--}for(;f&&m;){const e=b[m-1],n=t[f-1],o=e.key,s=n.key;e===n?(a=e.first,f--,m--):h.has(s)?!c.has(o)||y.has(o)?k(e):v.has(s)?f--:$.get(o)>$.get(s)?(v.add(o),k(e)):(y.add(s),f--):(l(n,c),f--)}for(;f--;){const e=t[f];h.has(e.key)||l(e,c)}for(;m;)k(b[m-1]);return b}(p,e,I,1,t,C,g,i,ct,zt,null,Ft);for(let t=0;t<p.length;t+=1)p[t].a();et()}},i(t){if(!a){nt(e.$$.fragment,t),nt(S,t);for(let t=0;t<C.length;t+=1)nt(p[t]);G((()=>{l||(l=rt(r,It,{y:600,duration:750},!0)),l.run(1)})),a=!0}},o(t){ot(e.$$.fragment,t),ot(S,t);for(let t=0;t<p.length;t+=1)ot(p[t]);l||(l=rt(r,It,{y:600,duration:750},!1)),l.run(0),a=!1},d(t){ut(e,t),t&&v(n),t&&v(o),S&&S.d(t);for(let t=0;t<p.length;t+=1)p[t].d();t&&l&&l.end(),f=!1,s(m)}}}function Ht(t,e,n){let{$$slots:o={},$$scope:s}=e,{items:r}=e,{columns:c}=e;const i=V();return t.$$set=t=>{"items"in t&&n(0,r=t.items),"columns"in t&&n(1,c=t.columns),"$$scope"in t&&n(3,s=t.$$scope)},[r,c,function(){i("closeModal")},s,o,function(e){R(t,e)},function(e){R(t,e)}]}class Lt extends ft{constructor(t){super(),dt(this,t,Ht,Dt,c,{items:0,columns:1})}}function Pt(e){let n,o;return{c(){n=k("div"),o=x(e[0]),B(n,"class","svelte-zighlj")},m(t,e){y(t,n,e),$(n,o)},p(t,[e]){1&e&&function(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}(o,t[0])},i:t,o:t,d(t){t&&v(n)}}}function Nt(t,e,n){let{title:o="Menu"}=e;return t.$$set=t=>{"title"in t&&n(0,o=t.title)},[o]}class Gt extends ft{constructor(t){super(),dt(this,t,Nt,Pt,c,{title:0})}}function Wt(e){let n,o=e[2]&&""!==e[2]&&function(e){let n;return{c(){n=k("div"),B(n,"class","icon image svelte-1nbq88k"),S(n,"mask","url("+e[2]+") no-repeat center / contain"),S(n,"-webkit-mask","url("+e[2]+") no-repeat center / contain")},m(t,e){y(t,n,e)},p:t,d(t){t&&v(n)}}}(e);return{c(){n=k("div"),o&&o.c(),B(n,"class","icon svelte-1nbq88k")},m(t,e){y(t,n,e),o&&o.m(n,null)},p(t,e){t[2]&&""!==t[2]&&o.p(t,e)},d(t){t&&v(n),o&&o.d()}}}function Yt(t){let e,n,o=t[0].includes("label")&&t[3]&&""!==t[3],s=t[0].includes("description")&&t[4]&&""!==t[4],r=o&&Jt(t),c=s&&Kt(t);return{c(){e=k("div"),r&&r.c(),n=_(),c&&c.c(),B(e,"class","textual")},m(t,o){y(t,e,o),r&&r.m(e,null),$(e,n),c&&c.m(e,null)},p(t,i){1&i&&(o=t[0].includes("label")&&t[3]&&""!==t[3]),o?r?r.p(t,i):(r=Jt(t),r.c(),r.m(e,n)):r&&(r.d(1),r=null),1&i&&(s=t[0].includes("description")&&t[4]&&""!==t[4]),s?c?c.p(t,i):(c=Kt(t),c.c(),c.m(e,null)):c&&(c.d(1),c=null)},d(t){t&&v(e),r&&r.d(),c&&c.d()}}}function Jt(e){let n;return{c(){n=k("div"),n.textContent=`${e[3]}`,B(n,"class","label svelte-1nbq88k")},m(t,e){y(t,n,e)},p:t,d(t){t&&v(n)}}}function Kt(e){let n;return{c(){n=k("div"),n.textContent=`${e[4]}`,B(n,"class","description svelte-1nbq88k")},m(t,e){y(t,n,e)},p:t,d(t){t&&v(n)}}}function Qt(e){let n,o=e[7]&&""!==e[7]&&function(e){let n;return{c(){n=k("div"),B(n,"class","icon image svelte-1nbq88k"),S(n,"mask","url("+e[7]+") no-repeat center / contain"),S(n,"-webkit-mask","url("+e[7]+") no-repeat center / contain")},m(t,e){y(t,n,e)},p:t,d(t){t&&v(n)}}}(e);return{c(){n=k("div"),o&&o.c(),B(n,"class","icon svelte-1nbq88k")},m(t,e){y(t,n,e),o&&o.m(n,null)},p(t,e){t[7]&&""!==t[7]&&o.p(t,e)},d(t){t&&v(n),o&&o.d()}}}function Ut(e){let n,o=e[5]&&""!==e[5]&&function(e){let n,o;return{c(){n=k("img"),B(n,"class","image svelte-1nbq88k"),n.src!==(o=e[5])&&B(n,"src",o),B(n,"alt",e[3])},m(t,e){y(t,n,e)},p:t,d(t){t&&v(n)}}}(e);return{c(){n=k("div"),o&&o.c(),B(n,"class","rightImage")},m(t,e){y(t,n,e),o&&o.m(n,null)},p(t,e){t[5]&&""!==t[5]&&o.p(t,e)},d(t){t&&v(n),o&&o.d()}}}function Xt(e){let n,o,s,r,c,i,l=e[0].includes("icon"),u=e[0].includes("textual")||e[0].includes("label")||e[0].includes("description"),a=e[0].includes("rightIcon"),d=e[0].includes("rightImage"),f=l&&Wt(e),m=u&&Yt(e),p=a&&Qt(e),g=d&&Ut(e);return{c(){n=k("div"),f&&f.c(),o=_(),m&&m.c(),s=_(),p&&p.c(),r=_(),g&&g.c(),B(n,"class","row svelte-1nbq88k"),B(n,"onclick",e[6]),B(n,"style",e[1])},m(t,l){y(t,n,l),f&&f.m(n,null),$(n,o),m&&m.m(n,null),$(n,s),p&&p.m(n,null),$(n,r),g&&g.m(n,null),c||(i=w(n,"click",O(j(e[9]))),c=!0)},p(t,[e]){1&e&&(l=t[0].includes("icon")),l?f?f.p(t,e):(f=Wt(t),f.c(),f.m(n,o)):f&&(f.d(1),f=null),1&e&&(u=t[0].includes("textual")||t[0].includes("label")||t[0].includes("description")),u?m?m.p(t,e):(m=Yt(t),m.c(),m.m(n,s)):m&&(m.d(1),m=null),1&e&&(a=t[0].includes("rightIcon")),a?p?p.p(t,e):(p=Qt(t),p.c(),p.m(n,r)):p&&(p.d(1),p=null),1&e&&(d=t[0].includes("rightImage")),d?g?g.p(t,e):(g=Ut(t),g.c(),g.m(n,null)):g&&(g.d(1),g=null),2&e&&B(n,"style",t[1])},i:t,o:t,d(t){t&&v(n),f&&f.d(),m&&m.d(),p&&p.d(),g&&g.d(),c=!1,i()}}}function Zt(t,e,n){let o,{item:s}=e,{columns:r=["icon","textual","label","description","rightIcon","rightImage"]}=e;const{icon:c,label:i,description:l,rightImage:u,onClick:a,rightIcon:d}=s;return t.$$set=t=>{"item"in t&&n(8,s=t.item),"columns"in t&&n(0,r=t.columns)},t.$$.update=()=>{1&t.$$.dirty&&n(1,o=`\n    grid-template-columns:  ${r.includes("icon")?"var(--item-icon-size)":""} ${r.includes("textual")||r.includes("label")||r.includes("description")?"auto ":""} ${r.includes("rightIcon")?"var(--item-icon-size) ":""} ${r.includes("rightImage")?"var(--item-image-size) ":""};`)},[r,o,c,i,l,u,a,d,s,function(e){R(t,e)}]}class te extends ft{constructor(t){super(),dt(this,t,Zt,Xt,c,{item:8,columns:0})}}function ee(t){let e,n;return e=new Lt({props:{items:t[2],columns:t[3],$$slots:{item:[oe,({prop:t,columns:e})=>({5:t,6:e}),({prop:t,columns:e})=>(t?32:0)|(e?64:0)],header:[ne,({prop:t,columns:e})=>({5:t,6:e}),({prop:t,columns:e})=>(t?32:0)|(e?64:0)]},$$scope:{ctx:t}}}),e.$on("closeModal",Bt.false),{c(){it(e.$$.fragment)},m(t,o){lt(e,t,o),n=!0},p(t,n){const o={};4&n&&(o.items=t[2]),8&n&&(o.columns=t[3]),240&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(nt(e.$$.fragment,t),n=!0)},o(t){ot(e.$$.fragment,t),n=!1},d(t){ut(e,t)}}}function ne(t){let e,n;return e=new Gt({props:{slot:"header",title:t[4]}}),{c(){it(e.$$.fragment)},m(t,o){lt(e,t,o),n=!0},p(t,n){const o={};16&n&&(o.title=t[4]),e.$set(o)},i(t){n||(nt(e.$$.fragment,t),n=!0)},o(t){ot(e.$$.fragment,t),n=!1},d(t){ut(e,t)}}}function oe(t){let e,n;return e=new te({props:{slot:"item",item:t[5],columns:t[6]}}),{c(){it(e.$$.fragment)},m(t,o){lt(e,t,o),n=!0},p(t,n){const o={};32&n&&(o.item=t[5]),64&n&&(o.columns=t[6]),e.$set(o)},i(t){n||(nt(e.$$.fragment,t),n=!0)},o(t){ot(e.$$.fragment,t),n=!1},d(t){ut(e,t)}}}function se(t){let e,n,o,s=t[1]&&ee(t);return{c(){e=k("div"),s&&s.c(),B(e,"id","page"),B(e,"style",n=t[0].cssVarStyles),B(e,"class","svelte-q2o01f")},m(t,n){y(t,e,n),s&&s.m(e,null),o=!0},p(t,[r]){t[1]?s?(s.p(t,r),2&r&&nt(s,1)):(s=ee(t),s.c(),nt(s,1),s.m(e,null)):s&&(tt(),ot(s,1,1,(()=>{s=null})),et()),(!o||1&r&&n!==(n=t[0].cssVarStyles))&&B(e,"style",n)},i(t){o||(nt(s),o=!0)},o(t){ot(s),o=!1},d(t){t&&v(e),s&&s.d()}}}function re(t,e,n){let o,s,r,c,i;return l(t,xt,(t=>n(0,o=t))),l(t,Bt,(t=>n(1,s=t))),l(t,yt,(t=>n(2,r=t))),l(t,ht,(t=>n(3,c=t))),l(t,jt,(t=>n(4,i=t))),globalThis.menuSvelte||(globalThis.menuSvelte={}),globalThis.menuSvelte.columns=ht,globalThis.menuSvelte.items=yt,globalThis.menuSvelte.css=xt,globalThis.menuSvelte.title=jt,globalThis.menuSvelte.visible=Bt,xt.init(),ht.allColumns(),yt.clearMenu(),[o,s,r,c,i]}return new class extends ft{constructor(t){super(),dt(this,t,re,se,c,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map