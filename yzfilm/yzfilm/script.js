var P=[
["mv","Music Video 01","Đạo diễn và dựng","#ff6a2b,#0f4c5c","https://www.youtube.com/watch?v=J4pRyMYunMw"],["mv","Music Video 02","Quay và hậu kỳ","#0f4c5c,#1b2a49","https://www.youtube.com/watch?v=6ZvBnjQGHo4"],
["mv","Music Video 03","Concept và quay","#b5382a,#101a2d","https://www.youtube.com/watch?v=OVAeewUz21M"],["mv","Music Video 04","Quay và chỉnh màu","#2a6f7f,#ff6a2b","https://www.youtube.com/watch?v=qmWbS6JAXII"],
["tvc","Phim quảng cáo 01","Sản xuất trọn gói","#e8a33d,#0f2a38"],["tvc","Phim quảng cáo 02","Quay và dựng","#ff6a2b,#1a1f33"],
["film","Phim ngắn 01","Đạo diễn hình ảnh","#33415c,#0b0f1a"],["film","Phim ngắn 02","Quay và hậu kỳ","#0f4c5c,#c4552b"],
["film","Phim ngắn 03","Sản xuất","#5c3a2e,#0f1a2b"]];
var L={mv:"Music Video",tvc:"Commercial",film:"Film"};
var grid=document.getElementById("grid"),dlg=document.getElementById("dlg"),pv=document.getElementById("pv");
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
function inf(p){var l=["Vai trò: "+p[2]].concat(p[5]||["Mô tả dự án đang được cập nhật."]);
  return '<small>'+L[p[0]]+'</small><strong>'+p[1]+'</strong>'+l.map(function(t){return '<p>'+t+'</p>'}).join("")+'<p class="go">Bấm để xem video →</p>'}
function hv(b,u){if(!u)return;var cur=null,tm;
  function on(){clearTimeout(tm);if(cur)return;cur=mk(u,false);cur.setAttribute("aria-hidden","true");cur.tabIndex=-1;
    b.insertBefore(cur,b.firstChild);var show=function(){cur&&cur.classList.add("on")};
    cur.addEventListener("load",show);cur.addEventListener("loadeddata",show)}
  function off(){if(!cur)return;var c=cur;cur=null;c.classList.remove("on");tm=setTimeout(function(){c.remove()},600)}
  b.addEventListener("mouseenter",on);b.addEventListener("mouseleave",off);
  b.addEventListener("focus",on);b.addEventListener("blur",off)}
dlg.addEventListener("close",function(){pv.innerHTML=""});
P.forEach(function(p,i){
  var b=document.createElement("button");b.className="card";b.dataset.k=p[0];
  b.style.setProperty("--g","linear-gradient(120deg,"+p[3].split(",")[0]+","+p[3].split(",")[1]+")");
  b.style.setProperty("--d","-"+(i*1.4)+"s");
  b.innerHTML=(p[6]?'<img class="th" alt="" src="'+p[6]+'">':'')+'<i class="pl"></i><b class="mn" role="button" tabindex="0" aria-label="Xem thông tin"><i></i><i></i><i></i></b><div class="inf">'+inf(p)+'</div><span>'+p[1]+'<small>'+L[p[0]]+' · '+p[2]+'</small></span>';
  b.onclick=function(){document.getElementById("dt").textContent=p[1];document.getElementById("dk").textContent=L[p[0]];var ul=document.getElementById("dl");ul.innerHTML="";["Vai trò: "+p[2]].concat(p[5]||["Mô tả dự án đang được cập nhật."]).forEach(function(t){var li=document.createElement("li");li.textContent=t;ul.appendChild(li)});if(p[4]){var yl=document.createElement("li"),ya=document.createElement("a");ya.href=p[4];ya.target="_blank";ya.rel="noopener";ya.textContent=yid(p[4])?"Xem trên YouTube ↗":"Mở video ↗";yl.appendChild(ya);ul.appendChild(yl)}
    pv.innerHTML="";pv.style.background="linear-gradient(120deg,"+p[3].split(",")[0]+","+p[3].split(",")[1]+")";if(p[4]){pv.appendChild(mk(p[4],true))}else{pv.textContent="Chưa có video"}dlg.showModal();var r=b.getBoundingClientRect(),d=dlg.getBoundingClientRect();dlg.style.transformOrigin=(r.left+r.width/2-d.left)+"px "+(r.top+r.height/2-d.top)+"px"};
  var mn=b.querySelector(".mn");function tg(e){e.stopPropagation();e.preventDefault();b.classList.toggle("oi")}
  mn.addEventListener("click",tg);mn.addEventListener("keydown",function(e){if(e.key=="Enter"||e.key==" ")tg(e)});
  b.addEventListener("mouseleave",function(){b.classList.remove("oi")});
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
  t.onclick=function(){window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth"})}})();
document.querySelectorAll(".filters button").forEach(function(b){b.onclick=function(){
  document.querySelectorAll(".filters button").forEach(function(x){x.setAttribute("aria-pressed",x===b)});
  grid.querySelectorAll(".card").forEach(function(c){c.style.display=(b.dataset.f==="all"||c.dataset.k===b.dataset.f)?"":"none"})}});
dlg.addEventListener("click",function(e){if(e.target===dlg)dlg.close()});
var t0=Date.now(),tc=document.getElementById("tc");
setInterval(function(){var d=Date.now()-t0,f=Math.floor(d/41.7)%24,s=Math.floor(d/1000);
  var z=function(n){return String(n).padStart(2,"0")};
  tc.textContent="00:"+z(Math.floor(s/60)%60)+":"+z(s%60)+":"+z(f)},42);
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("on");io.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll(".rv").forEach(function(e){io.observe(e)});
document.getElementById("f").onsubmit=function(e){e.preventDefault();
  var s="Yêu cầu dự án: "+document.getElementById("t").value;
  var b="Họ tên: "+document.getElementById("n").value+"\n\n"+document.getElementById("m").value;
  location.href="mailto:yzproduction2025@gmail.com?subject="+encodeURIComponent(s)+"&body="+encodeURIComponent(b)};

if(matchMedia("(prefers-reduced-motion:reduce)").matches)document.querySelectorAll(".fi").forEach(function(s){if(s.pauseAnimations)s.pauseAnimations()});
