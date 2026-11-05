var P=[
["mv","Music Video 01","Đạo diễn và dựng","#ff6a2b,#0f4c5c","https://www.youtube.com/watch?v=J4pRyMYunMw"],["mv","Music Video 02","Quay và hậu kỳ","#0f4c5c,#1b2a49","https://www.youtube.com/watch?v=6ZvBnjQGHo4"],
["mv","Music Video 03","Concept và quay","#b5382a,#101a2d","https://www.youtube.com/watch?v=OVAeewUz21M"],["mv","Music Video 04","Quay và chỉnh màu","#2a6f7f,#ff6a2b","https://www.youtube.com/watch?v=qmWbS6JAXII"],
["tvc","Phim quảng cáo 01","Sản xuất trọn gói","#e8a33d,#0f2a38"],["tvc","Phim quảng cáo 02","Quay và dựng","#ff6a2b,#1a1f33"],
["film","Phim ngắn 01","Đạo diễn hình ảnh","#33415c,#0b0f1a"],["film","Phim ngắn 02","Quay và hậu kỳ","#0f4c5c,#c4552b"],
["film","Phim ngắn 03","Sản xuất","#5c3a2e,#0f1a2b"]];
var L={mv:"Music Video",tvc:"Commercial",film:"Film"};
var grid=document.getElementById("grid"),openP=null;
// Mỗi dự án: [nhóm, tên, vai trò, màu, link video (YouTube/.mp4), [các dòng mô tả]]
function yid(u){var m=String(u).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);return m?m[1]:null}
function T(y,k){return "https://i.ytimg.com/vi/"+y+(k=="max"?"/maxresdefault.jpg":"/hqdefault.jpg")}
function thumb(y,ok){var im=new Image();im.alt="";im.decoding="async";
  im.onload=function(){if(im.naturalWidth<400&&!im.dataset.f){im.dataset.f=1;im.src=T(y,"hq");return}if(ok)ok()};
  im.onerror=function(){if(!im.dataset.f){im.dataset.f=1;im.src=T(y,"hq")}else im.remove()};
  im.src=T(y,"max");return im}
function mk(u,full){var y=yid(u),e;
  if(y){e=document.createElement("iframe");
    e.src="https://www.youtube.com/embed/"+y+(full?"?autoplay=1&rel=0":"?autoplay=1&mute=1&controls=0&loop=1&playlist="+y+"&playsinline=1&modestbranding=1");
    e.allow="autoplay; fullscreen";if(!full)e.className="vid yt"}
  else{e=document.createElement("video");e.src=u;e.playsInline=true;e.autoplay=true;
    if(full)e.controls=true;else{e.muted=true;e.loop=true;e.className="vid"}}
  return e}
function hv(b,u){if(!u)return;var cur=null,tm;
  function on(){clearTimeout(tm);if(cur)return;cur=mk(u,false);cur.setAttribute("aria-hidden","true");cur.tabIndex=-1;
    b.insertBefore(cur,b.firstChild);var show=function(){cur&&cur.classList.add("on")};
    cur.addEventListener("load",show);cur.addEventListener("loadeddata",show)}
  function off(){if(!cur)return;var c=cur;cur=null;c.classList.remove("on");tm=setTimeout(function(){c.remove()},600)}
  b.addEventListener("mouseenter",on);b.addEventListener("mouseleave",off);
  b.addEventListener("focus",on);b.addEventListener("blur",off)}
function nc(){return getComputedStyle(grid).gridTemplateColumns.split(" ").length}
function closeP(){var o=openP;if(!o)return;openP=null;o.card.classList.remove("sel");o.card.setAttribute("aria-expanded","false");
  clearTimeout(o.tv);o.el.classList.remove("open");setTimeout(function(){o.el.remove()},1000)}
function toggleP(b,p){
  if(openP&&openP.card===b){closeP();return}
  var vis=[].filter.call(grid.querySelectorAll(".card"),function(c){return c.style.display!=="none"});
  var i=vis.indexOf(b),n=nc(),end=Math.min(Math.ceil((i+1)/n)*n,vis.length)-1,oh=0;
  if(openP&&(openP.el.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING))oh=openP.el.offsetHeight;
  closeP();
  var el=document.createElement("div");el.className="dp";
  el.innerHTML='<div class="dpi"><div class="dpg"><div class="dpv"></div><aside class="dpa"><button class="dpx" aria-label="Đóng">×</button><small></small><p class="lb">Tên dự án:</p><h3></h3><ul></ul></aside></div></div>';
  el.querySelector("small").textContent=L[p[0]];el.querySelector("h3").textContent=p[1];
  var ul=el.querySelector("ul");
  ["Vai trò: "+p[2]].concat(p[5]||["Mô tả dự án đang được cập nhật."]).forEach(function(t){var li=document.createElement("li");li.textContent=t;ul.appendChild(li)});
  if(p[4]){var yl=document.createElement("li"),ya=document.createElement("a");ya.href=p[4];ya.target="_blank";ya.rel="noopener";ya.textContent=yid(p[4])?"Xem trên YouTube ↗":"Mở video ↗";yl.appendChild(ya);ul.appendChild(yl)}
  var pv=el.querySelector(".dpv");
  el.querySelector(".dpx").onclick=closeP;
  vis[end].after(el);void el.offsetHeight;
  b.classList.add("sel");b.setAttribute("aria-expanded","true");
  openP={card:b,el:el,n:n};
  requestAnimationFrame(function(){el.classList.add("open")});
  openP.tv=setTimeout(function(){if(p[4])pv.appendChild(mk(p[4],true));else{pv.style.background="linear-gradient(120deg,"+p[3].split(",")[0]+","+p[3].split(",")[1]+")";pv.textContent="Chưa có video"}},500);
  var y=vis[end].getBoundingClientRect().bottom+window.scrollY+18-oh-84;
  if(window.smoothTo)window.smoothTo(y);else window.scrollTo({top:y,behavior:"smooth"})}
addEventListener("keydown",function(e){if(e.key=="Escape")closeP()});
addEventListener("resize",function(){if(openP&&nc()!==openP.n)closeP()});
P.forEach(function(p,i){
  var b=document.createElement("button");b.className="card";b.dataset.k=p[0];
  b.style.setProperty("--g","linear-gradient(120deg,"+p[3].split(",")[0]+","+p[3].split(",")[1]+")");
  b.style.setProperty("--d","-"+(i*1.4)+"s");
  b.innerHTML=(p[6]?'<img class="th" alt="" src="'+p[6]+'">':'')+'<i class="pl"></i><span>'+p[1]+'<small>'+L[p[0]]+' · '+p[2]+'</small></span>';
  b.onclick=function(){toggleP(b,p)};
  var ty=p[4]&&yid(p[4]);if(ty&&!p[6]){var im=thumb(ty);im.className="th";b.insertBefore(im,b.firstChild)}
  hv(b,p[4]);grid.appendChild(b)});
(function(){var S=P.filter(function(p){return p[0]=="mv"}).slice(0,4),box=document.querySelector(".slides"),f=document.querySelector(".fr .focus"),sn=document.getElementById("sn"),mon=document.querySelector(".mon .scr"),n=0,t;
  S.forEach(function(p){var d=document.createElement("div");d.className="sl";d.style.setProperty("--g","linear-gradient(120deg,"+p[3].split(",")[0]+","+p[3].split(",")[1]+")");var y=p[4]&&yid(p[4]);if(y){d.appendChild(thumb(y,function(){d.classList.add("img")}))}
  var m=document.createElement("div");m.className="mi";m.style.setProperty("--g","linear-gradient(120deg,"+p[3].split(",")[0]+","+p[3].split(",")[1]+")");if(y){m.appendChild(thumb(y))}mon.appendChild(m);
  box.appendChild(d)});
  var el=box.children;
  function go(i){n=(i+S.length)%S.length;for(var k=0;k<el.length;k++){el[k].classList.toggle("on",k==n);mon.children[k].classList.toggle("on",k==n)}
    sn.textContent="SHOT 0"+(n+1)+" / 0"+S.length+" · "+S[n][1].toUpperCase();
    f.style.animation="none";void f.offsetWidth;f.style.animation=""}
  function auto(){clearInterval(t);t=setInterval(function(){go(n+1)},5000)}
  document.getElementById("sx").onclick=function(){var m=document.querySelector(".mon");m.classList.remove("shoot");void m.offsetWidth;m.classList.add("shoot");go(n+1);auto()};
  go(0);auto()})();
(function(){var t=document.getElementById("top"),c=t.querySelector("circle"),tk=false;
  function u(){var h=document.documentElement,m=h.scrollHeight-h.clientHeight,y=window.scrollY||h.scrollTop;
    t.classList.toggle("on",y>600);c.style.strokeDashoffset=132-(m>0?Math.min(1,y/m):0)*132;tk=false}
  window.addEventListener("scroll",function(){if(!tk){tk=true;requestAnimationFrame(u)}},{passive:true});u();
  t.onclick=function(){if(window.smoothTo)window.smoothTo(0);else window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth"})}})();
document.querySelectorAll(".filters button").forEach(function(b){b.onclick=function(){
  document.querySelectorAll(".filters button").forEach(function(x){x.setAttribute("aria-pressed",x===b)});
  closeP();grid.querySelectorAll(".card").forEach(function(c){c.style.display=(b.dataset.f==="all"||c.dataset.k===b.dataset.f)?"":"none"})}});
var t0=Date.now(),tc=document.getElementById("tc");
setInterval(function(){var d=Date.now()-t0,f=Math.floor(d/41.7)%24,s=Math.floor(d/1000);
  var z=function(n){return String(n).padStart(2,"0")};
  tc.textContent="00:"+z(Math.floor(s/60)%60)+":"+z(s%60)+":"+z(f)},42);
/* Chữ bay vào: tách từng từ, mỗi từ trượt lên lần lượt; khối nội dung vào so le */
(function(){
  var de=document.documentElement;
  if(de.classList.contains("anim")){
    var split=function(el,step,cap,base){
      var w=el.textContent.trim().split(/\s+/);el.textContent="";
      w.forEach(function(t,i){var sp=document.createElement("span");sp.className="sw";
        sp.style.setProperty("--d",(base+Math.min(i*step,cap))+"ms");sp.textContent=t;el.appendChild(sp);
        if(i<w.length-1)el.appendChild(document.createTextNode(" "))})};
    document.querySelectorAll(".rv").forEach(function(r){
      var hs=r.matches("h2")?[r]:[].slice.call(r.querySelectorAll("h2"));
      hs.forEach(function(h){split(h,55,520,0)});
      [].forEach.call(r.querySelectorAll(":scope > p"),function(p){split(p,14,560,260)});
      [].forEach.call(r.querySelectorAll(".stats>div,.svc>article,.steps>li,.cb,form>div"),function(b,i){
        b.classList.add("sb");b.style.setProperty("--d",(380+Math.min(i*110,1100))+"ms")})});
    de.classList.add("split")}
})();
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("on");io.unobserve(e.target)}})},{threshold:.15,rootMargin:"0px 0px -6% 0px"});
document.querySelectorAll(".rv").forEach(function(e){io.observe(e)});
document.getElementById("f").onsubmit=function(e){e.preventDefault();
  var s="Yêu cầu dự án: "+document.getElementById("t").value;
  var b="Họ tên: "+document.getElementById("n").value+"\n\n"+document.getElementById("m").value;
  location.href="mailto:yzproduction2025@gmail.com?subject="+encodeURIComponent(s)+"&body="+encodeURIComponent(b)};

if(matchMedia("(prefers-reduced-motion:reduce)").matches)document.querySelectorAll(".fi").forEach(function(s){if(s.pauseAnimations)s.pauseAnimations()});

/* Cuộn trang mượt bằng Lenis (Studio Freight) — https://lenis.darkroom.engineering */
(function(){
  var rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
  if(rm||typeof Lenis==="undefined")return;            /* không có Lenis / người dùng giảm chuyển động → cuộn mặc định */
  var ln=new Lenis({
    duration:1.15,                                        /* thời gian "trôi" sau mỗi cú lăn chuột */
    easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))},
    smoothWheel:true,
    wheelMultiplier:1,
    touchMultiplier:1.2                                   /* cảm ứng giữ cuộn gốc của trình duyệt cho nhẹ và chuẩn */
  });
  window.lenis=ln;
  function raf(t){ln.raf(t);requestAnimationFrame(raf)}
  requestAnimationFrame(raf);
  window.smoothTo=function(y){ln.scrollTo(y,{duration:1.2})};
  var de=document.documentElement;
  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;
    var id=a.getAttribute("href").slice(1),el=id?document.getElementById(id):null;
    if(id&&!el)return;e.preventDefault();
    var off=parseFloat(getComputedStyle(de).scrollPaddingTop)||0;
    ln.scrollTo(el||0,{offset:el?-off:0,duration:1.4})});
})();
/* Dừng hiệu ứng hero khi đã cuộn qua để trang nhẹ hơn */
(function(){var hero=document.querySelector(".hero");if(!hero||!window.IntersectionObserver)return;
  new IntersectionObserver(function(es){hero.classList.toggle("off",!es[0].isIntersecting)}).observe(hero)})();
