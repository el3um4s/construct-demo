import{S as t,i as a,s as e,e as s,t as l,k as r,c as n,a as o,g as h,d as c,n as f,b as g,f as i,D as p,h as u,L as d,E as m}from"../../chunks/vendor-a9406cad.js";import{b as $}from"../../chunks/paths-45dac81d.js";function v(t,a,e){const s=t.slice();return s[2]=a[e].path,s[3]=a[e].metadata.title,s[4]=a[e].metadata.tags,s}function E(t,a,e){const s=t.slice();return s[1]=a[e],s}function b(t){let a,e,r,f=t[1]+"";return{c(){a=s("a"),e=l(f),this.h()},l(t){a=n(t,"A",{class:!0,href:!0});var s=o(a);e=h(s,f),s.forEach(c),this.h()},h(){g(a,"class","tag"),g(a,"href",r=`${$}/tags/${t[1]}`)},m(t,s){i(t,a,s),p(a,e)},p(t,s){1&s&&f!==(f=t[1]+"")&&u(e,f),1&s&&r!==(r=`${$}/tags/${t[1]}`)&&g(a,"href",r)},d(t){t&&c(a)}}}function k(t){let a,e,m,v,k,x,L=t[3]+"",j=t[4],A=[];for(let s=0;s<j.length;s+=1)A[s]=b(E(t,j,s));return{c(){a=s("li"),e=s("a"),m=l(L),k=r();for(let t=0;t<A.length;t+=1)A[t].c();x=r(),this.h()},l(t){a=n(t,"LI",{});var s=o(a);e=n(s,"A",{href:!0});var l=o(e);m=h(l,L),l.forEach(c),k=f(s);for(let a=0;a<A.length;a+=1)A[a].l(s);x=f(s),s.forEach(c),this.h()},h(){g(e,"href",v=`${$}/blog/${t[2].replace(".md","")}`)},m(t,s){i(t,a,s),p(a,e),p(e,m),p(a,k);for(let e=0;e<A.length;e+=1)A[e].m(a,null);p(a,x)},p(t,s){if(1&s&&L!==(L=t[3]+"")&&u(m,L),1&s&&v!==(v=`${$}/blog/${t[2].replace(".md","")}`)&&g(e,"href",v),1&s){let e;for(j=t[4],e=0;e<j.length;e+=1){const l=E(t,j,e);A[e]?A[e].p(l,s):(A[e]=b(l),A[e].c(),A[e].m(a,x))}for(;e<A.length;e+=1)A[e].d(1);A.length=j.length}},d(t){t&&c(a),d(A,t)}}}function x(t){let a,e,g,$,E=t[0],b=[];for(let s=0;s<E.length;s+=1)b[s]=k(v(t,E,s));return{c(){a=s("h1"),e=l(t[1]),g=r(),$=s("ul");for(let t=0;t<b.length;t+=1)b[t].c()},l(s){a=n(s,"H1",{});var l=o(a);e=h(l,t[1]),l.forEach(c),g=f(s),$=n(s,"UL",{});var r=o($);for(let t=0;t<b.length;t+=1)b[t].l(r);r.forEach(c)},m(t,s){i(t,a,s),p(a,e),i(t,g,s),i(t,$,s);for(let a=0;a<b.length;a+=1)b[a].m($,null)},p(t,[a]){if(2&a&&u(e,t[1]),1&a){let e;for(E=t[0],e=0;e<E.length;e+=1){const s=v(t,E,e);b[e]?b[e].p(s,a):(b[e]=k(s),b[e].c(),b[e].m($,null))}for(;e<b.length;e+=1)b[e].d(1);b.length=E.length}},i:m,o:m,d(t){t&&c(a),t&&c(g),t&&c($),d(b,t)}}}const L={};let j=[];for(let y in L)j.push(L[y]().then((({metadata:t})=>({path:y,metadata:t}))));async function A({page:t}){const a=await Promise.all(j),e=t.params.tag;return{props:{posts:a.filter((t=>t.metadata.tags.includes(e))),tag:e}}}function w(t,a,e){let{posts:s}=a,{tag:l}=a;return t.$$set=t=>{"posts"in t&&e(0,s=t.posts),"tag"in t&&e(1,l=t.tag)},[s,l]}export default class extends t{constructor(t){super(),a(this,t,w,x,e,{posts:0,tag:1})}}export{A as load};
