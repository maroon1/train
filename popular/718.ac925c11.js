"use strict";(self.webpackChunklf_training=self.webpackChunklf_training||[]).push([[718],{8718:(e,t,r)=>{r.r(t),r.d(t,{default:()=>v});var n=r(9466),c=r(5741),s=r(3165),i=r(997),l=r(9905),o=r(1690),a=r(3950),u=r(2970);const f={"battle-result":"ug0fAoFaWE0OrtmSmJtn"};var p=r(1578),h=r(7590),y=r(1519),b=new(function(){function e(t){(0,p.Z)(this,e),this.cacheService=t}return(0,h.Z)(e,[{key:"getUser",value:function(e){var t=this,r=new URL("https://api.github.com/users/".concat(e)),n=this.cacheService.getCache(r);return null!=n?Promise.resolve(n):fetch(r).then((function(e){if(e.ok)return e.json();throw e})).then((function(e){return t.cacheService.setCache(r.toString(),e),e}))}}]),e}())(y.v),j=r(515);function g(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function O(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?g(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function v(){var e=(0,o.lr)(),t=(0,c.Z)(e,1)[0],r=(0,a.s0)(),n=t.get("player1"),p=t.get("player2"),h=(0,l.useState)(),y=(0,c.Z)(h,2),g=y[0],v=y[1],d=(0,l.useState)(),w=(0,c.Z)(d,2),x=w[0],m=w[1],P=!!g&&!!x;return(0,l.useEffect)((function(){n&&p||r("/battle")}),[n,p]),(0,l.useEffect)((function(){Promise.all([b.getUser(n),b.getUser(p)]).then((function(e){var t=(0,c.Z)(e,2),r=t[0],n=t[1],s="player1";r.public_repos<n.public_repos&&(s="player2"),v(O(O({},r),{},{win:"player1"===s})),m(O(O({},n),{},{win:"player2"===s}))}))}),[n,p]),P&&(0,j.jsxs)("div",{className:f["battle-result"],children:[(0,j.jsx)(u.g5,{children:(0,j.jsxs)(s.Z,{children:[(0,j.jsx)(i.Z,{style:{display:"flex",justifyContent:"center"},sm:12,xs:24,children:(0,j.jsx)(u.s_,{player:g})}),(0,j.jsx)(i.Z,{style:{display:"flex",justifyContent:"center"},sm:12,xs:24,children:(0,j.jsx)(u.s_,{player:x})})]})}),(0,j.jsx)(u.zx,{onClick:function(){r("/battle")},children:"RESET"})]})}}}]);
//# sourceMappingURL=718.ac925c11.js.map