import{S as s,i as e,s as a,e as t,t as r,c as n,a as c,g as o,d as l,b as $,f,D as h,E as i,j as u,k as p,m,n as v,o as d,x as k,u as g,v as x,F as y,G as E}from"../chunks/vendor-651ae0ce.js";import{P as j}from"../chunks/PageTransition-5f8aa118.js";import{b}from"../chunks/paths-45dac81d.js";function w(s){let e,a,u,p,m;return{c(){e=t("nav"),a=t("ul"),u=t("li"),p=t("a"),m=r("Home"),this.h()},l(s){e=n(s,"NAV",{});var t=c(e);a=n(t,"UL",{class:!0});var r=c(a);u=n(r,"LI",{class:!0});var $=c(u);p=n($,"A",{"sveltekit:prefetch":!0,href:!0});var f=c(p);m=o(f,"Home"),f.forEach(l),$.forEach(l),r.forEach(l),t.forEach(l),this.h()},h(){$(p,"sveltekit:prefetch",""),$(p,"href",`${b}/`),$(u,"class","svelte-12vhk02"),$(a,"class","svelte-12vhk02")},m(s,t){f(s,e,t),h(e,a),h(a,u),h(u,p),h(p,m)},p:i,i:i,o:i,d(s){s&&l(e)}}}class A extends s{constructor(s){super(),e(this,s,null,w,a,{})}}function D(s){let e;const a=s[1].default,t=y(a,s,s[2],null);return{c(){t&&t.c()},l(s){t&&t.l(s)},m(s,a){t&&t.m(s,a),e=!0},p(s,r){t&&t.p&&(!e||4&r)&&E(t,a,s,s[2],e?r:-1,null,null)},i(s){e||(k(t,s),e=!0)},o(s){g(t,s),e=!1},d(s){t&&t.d(s)}}}function H(s){let e,a,r,o,i;return a=new A({}),o=new j({props:{refresh:s[0],$$slots:{default:[D]},$$scope:{ctx:s}}}),{c(){e=t("div"),u(a.$$.fragment),r=p(),u(o.$$.fragment),this.h()},l(s){e=n(s,"DIV",{class:!0});var t=c(e);m(a.$$.fragment,t),r=v(t),m(o.$$.fragment,t),t.forEach(l),this.h()},h(){$(e,"class","container svelte-zngx41")},m(s,t){f(s,e,t),d(a,e,null),h(e,r),d(o,e,null),i=!0},p(s,[e]){const a={};1&e&&(a.refresh=s[0]),4&e&&(a.$$scope={dirty:e,ctx:s}),o.$set(a)},i(s){i||(k(a.$$.fragment,s),k(o.$$.fragment,s),i=!0)},o(s){g(a.$$.fragment,s),g(o.$$.fragment,s),i=!1},d(s){s&&l(e),x(a),x(o)}}}const I=async({page:s})=>({props:{key:s.path}});function L(s,e,a){let{$$slots:t={},$$scope:r}=e,{key:n}=e;return s.$$set=s=>{"key"in s&&a(0,n=s.key),"$$scope"in s&&a(2,r=s.$$scope)},[n,t,r]}export default class extends s{constructor(s){super(),e(this,s,L,H,a,{key:0})}}export{I as load};