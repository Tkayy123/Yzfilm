window.__yz=1;
/* Thiết bị cảm ứng không có hover: đổi lời hướng dẫn cho đúng */
if(!matchMedia("(hover:hover) and (pointer:fine)").matches){var wl0=document.querySelector(".wl");if(wl0)wl0.textContent="Chạm vào một dự án để xem toàn bộ."}
var P=[
["mv","Music Video 01","Đạo diễn và dựng","#ff6a2b,#0f4c5c","https://www.youtube.com/watch?v=J4pRyMYunMw"],["mv","Music Video 02","Quay và hậu kỳ","#0f4c5c,#1b2a49","https://www.youtube.com/watch?v=6ZvBnjQGHo4"],
["mv","Music Video 03","Concept và quay","#b5382a,#101a2d","https://www.youtube.com/watch?v=OVAeewUz21M"],["mv","Music Video 04","Quay và chỉnh màu","#2a6f7f,#ff6a2b","https://www.youtube.com/watch?v=qmWbS6JAXII"],
["tvc","Phim quảng cáo 01","Sản xuất trọn gói","#e8a33d,#0f2a38","https://www.youtube.com/watch?v=QGgMZ6AVIt4"],["tvc","Phim quảng cáo 02","Quay và dựng","#ff6a2b,#1a1f33","https://www.youtube.com/watch?v=HH07P-ViDqI"],
["tvc","Phim quảng cáo 03","Sản xuất trọn gói","#2a6f7f,#e8a33d","https://www.youtube.com/watch?v=VHg2XuObqjE"],
["film","Phim ngắn 01","Đạo diễn hình ảnh","#33415c,#0b0f1a","https://www.youtube.com/watch?v=QE4J0DmCI3A"],["film","Phim ngắn 02","Quay và hậu kỳ","#0f4c5c,#c4552b","https://www.youtube.com/watch?v=JLeXExx-8w8"],
["film","Phim ngắn 03","Sản xuất","#5c3a2e,#0f1a2b","https://www.youtube.com/watch?v=LE8JgK1RFwk"]];
var L={mv:"Music Video",tvc:"Commercial",film:"Film"};
var grid=document.getElementById("grid");
// Mỗi dự án: [nhóm, tên, vai trò, màu, link video (YouTube/.mp4), [các dòng mô tả]]
function yid(u){var m=String(u).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);return m?m[1]:null}
function T(y,k){return "https://i.ytimg.com/vi/"+y+(k=="max"?"/maxresdefault.jpg":"/hqdefault.jpg")}
function thumb(y,ok,lazy){var im=new Image();im.alt="";im.decoding="async";if(lazy)im.loading="lazy";
  im.onload=function(){if(im.naturalWidth<400&&!im.dataset.f){im.dataset.f=1;im.src=T(y,"hq");return}if(ok)ok()};
  im.onerror=function(){if(!im.dataset.f){im.dataset.f=1;im.src=T(y,"hq")}else im.remove()};
  im.src=T(y,"max");return im}
/* ===== Lộ diện khi cuộn: IntersectionObserver (fade-up + fade-in) ===== */
var rvIO=new IntersectionObserver(function(es){var k=0;
  es.forEach(function(e){if(!e.isIntersecting)return;var t=e.target;
    if(t.classList.contains("card"))t.style.setProperty("--rd",Math.min(k++,6)*90+"ms");   /* card trong cùng một lượt cuộn vào lần lượt so le */
    t.classList.add("on");rvIO.unobserve(t)})},{threshold:.12,rootMargin:"0px 0px -6% 0px"});
(function(){var de=document.documentElement;
  if(de.classList.contains("anim")){
    var split=function(el,step,cap,base){
      var w=el.textContent.trim().split(/\s+/);el.textContent="";
      w.forEach(function(t,i){var sp=document.createElement("span");sp.className="sw";
        sp.style.setProperty("--d",(base+Math.min(i*step,cap))+"ms");sp.textContent=t;el.appendChild(sp);
        if(i<w.length-1)el.appendChild(document.createTextNode(" "))})};
    document.querySelectorAll(".rv").forEach(function(r){
      var hs=r.matches("h2")?[r]:[].slice.call(r.querySelectorAll("h2"));
      hs.forEach(function(h){split(h,55,520,0)});
      [].forEach.call(r.querySelectorAll(":scope > p,.wt > p"),function(p){split(p,14,560,260)});
      [].forEach.call(r.querySelectorAll(".stats>div,.svc>article,.steps>li,.cb,form>div,.filters"),function(b,i){
        b.classList.add("sb");b.style.setProperty("--d",(380+Math.min(i*110,1100))+"ms")})});
    de.classList.add("split")}
  document.querySelectorAll(".rv").forEach(function(e){rvIO.observe(e)})})();

/* ===== Dự án: video xem trước, card Bento, bộ lọc, cửa sổ chi tiết ===== */
function mk(u,full){var y=yid(u),e;
  if(y){e=document.createElement("iframe");
    e.src="https://www.youtube.com/embed/"+y+(full?"?autoplay=1&rel=0":"?autoplay=1&mute=1&controls=0&loop=1&playlist="+y+"&playsinline=1&modestbranding=1");
    e.allow="autoplay; fullscreen";e.title="Video dự án";if(full)e.allowFullscreen=true;else e.className="vid yt"}
  else{e=document.createElement("video");e.src=u;e.playsInline=true;e.autoplay=true;
    if(full)e.controls=true;else{e.muted=true;e.loop=true;e.className="vid"}}
  return e}
var CAN_HOVER=matchMedia("(hover:hover) and (pointer:fine)").matches;   /* thiết bị cảm ứng không tải video khi chạm */
function hv(c,u){if(!u||!CAN_HOVER)return;var mz=c.querySelector(".mz"),cur=null;
  function on(){if(cur)return;cur=mk(u,false);cur.setAttribute("aria-hidden","true");cur.tabIndex=-1;mz.appendChild(cur);
    var show=function(){cur&&cur.classList.add("on")};cur.addEventListener("load",show);cur.addEventListener("loadeddata",show)}
  function off(){if(!cur)return;var x=cur;cur=null;x.classList.remove("on");setTimeout(function(){x.remove()},700)}
  c.addEventListener("mouseenter",on);c.addEventListener("mouseleave",off);c.addEventListener("focusin",on);c.addEventListener("focusout",off)}

/* Cửa sổ chi tiết */
var dlg=document.getElementById("dlg"),dlv=document.getElementById("dlv"),dll=document.getElementById("dll"),vt,closing=false;
function lock(on){var l=window.lenis;if(l){on?l.stop():l.start()}else document.documentElement.style.overflow=on?"hidden":""}
function li(t){var e=document.createElement("li");e.textContent=t;return e}
/* Mỗi dự án có đường dẫn riêng (#mv-1, #tvc-1...) để chia sẻ; Trước/Sau chuyển dự án trong cửa sổ */
var cur=null,pushed=false,SL=[];
(function(){var c={};P.forEach(function(p){c[p[0]]=(c[p[0]]||0)+1;SL.push(p[0]+"-"+c[p[0]])})})();
function slugOf(p){return SL[P.indexOf(p)]}
function vis(){var r=[];cards.forEach(function(c,i){if(!c.hidden)r.push(i)});return r}
function fill(p,delay){var g=p[3].split(","),v=vis(),k=v.indexOf(P.indexOf(p));cur=p;
  document.getElementById("dlk").textContent=L[p[0]];document.getElementById("dlt").textContent=p[1];
  dll.textContent="";["Vai trò: "+p[2]].concat(p[5]||["Mô tả dự án đang được cập nhật."]).forEach(function(t){dll.appendChild(li(t))});
  if(p[4]){var l=document.createElement("li"),a=document.createElement("a");a.href=p[4];a.target="_blank";a.rel="noopener";
    a.textContent=yid(p[4])?"Xem trên YouTube ↗":"Mở video ↗";l.appendChild(a);dll.appendChild(l)}
  document.getElementById("dln").hidden=!(k>=0&&v.length>1);document.getElementById("dlc").textContent=k>=0?(k+1)+" / "+v.length:"";
  clearTimeout(vt);dlv.textContent="";dlv.style.background="";
  vt=setTimeout(function(){if(p[4]){var e=mk(p[4],true);e.title="Video: "+p[1];dlv.appendChild(e)}
    else{dlv.style.background="linear-gradient(120deg,"+g[0]+","+g[1]+")";dlv.textContent="Chưa có video"}},delay)}
function openD(p,fromHash){closing=false;
  if(!dlg.open){dlg.showModal();lock(true);void dlg.offsetWidth;dlg.classList.add("show")}
  fill(p,480);
  if(!fromHash){location.hash=slugOf(p);pushed=true}}
function closeD(noHist){if(!dlg.open||closing)return;closing=true;clearTimeout(vt);dlg.classList.remove("show");
  if(noHist)pushed=false;
  else if(cur&&slugOf(cur)===location.hash.slice(1)){
    if(pushed){pushed=false;history.back()}                       /* mở bằng bấm: lùi 1 bước lịch sử */
    else history.replaceState(null,"",location.pathname+location.search)}   /* mở bằng link: chỉ xoá #, không rời trang */
  setTimeout(function(){dlg.close();dlv.textContent="";lock(false);closing=false;cur=null},450)}
function step(d){var v=vis(),k=v.indexOf(P.indexOf(cur));if(k<0||v.length<2)return;
  var p=P[v[(k+d+v.length)%v.length]];fill(p,150);history.replaceState(null,"","#"+slugOf(p))}
document.getElementById("dlp").onclick=function(){step(-1)};
document.getElementById("dlnx").onclick=function(){step(1)};
dlg.addEventListener("keydown",function(e){if(e.key==="ArrowLeft"){step(-1)}else if(e.key==="ArrowRight"){step(1)}});
addEventListener("hashchange",function(){var i=SL.indexOf(location.hash.slice(1));
  if(i>=0){if(cur!==P[i]){if(cards[i].hidden)fb[0].click();openD(P[i],true)}}
  else if(dlg.open&&!closing)closeD(true)});   /* nút Back của trình duyệt đóng cửa sổ */
dlg.addEventListener("cancel",function(e){e.preventDefault();closeD()});          /* phím Esc */
dlg.addEventListener("click",function(e){if(e.target===dlg)closeD()});             /* bấm ra ngoài */
dlg.querySelector(".dlx").onclick=function(){closeD()};

/* Sắp xếp Bento: mỗi khối 4 dự án = 2 hàng đầy (khối chẵn lật gương); phần dư 1/2/3 dự án có bố cục riêng */
var cards=[],BL=[["hero","sq","tall","sq"],["tall","sq","hero","sq"]],RM=[[],["pano"],["wide","wide"],["wide","sq","sq"]];
function layout(){
  var v=cards.filter(function(c){return !c.hidden}),n=v.length,seq=[],b;
  for(b=0;b<Math.floor(n/4);b++)seq=seq.concat(BL[b%2]);
  seq=seq.concat(RM[n%4]);
  cards.forEach(function(c){c.className=c.className.replace(/\s*\bk-\w+/g,"")});
  v.forEach(function(c,i){c.classList.add("k-"+seq[i]);
    c.classList.add("nt");c.classList.remove("on");void c.offsetWidth;c.classList.remove("nt");rvIO.observe(c)})}

P.forEach(function(p,i){
  var c=document.createElement("article"),g=p[3].split(","),y=p[4]&&yid(p[4]);
  c.className="card";c.dataset.k=p[0];
  c.style.setProperty("--g","linear-gradient(120deg,"+g[0]+","+g[1]+")");
  c.style.setProperty("--d","-"+(i*1.4)+"s");
  c.innerHTML='<div class="media"><div class="mz"></div><span class="chip"></span><div class="cap"><h3></h3><p></p></div>'+(p[4]?'<span class="pl" aria-hidden="true"></span>':'')+'</div><button class="hit" type="button" aria-haspopup="dialog"></button>';
  c.querySelector(".chip").textContent=L[p[0]];
  c.querySelector("h3").textContent=p[1];c.querySelector(".cap p").textContent=p[2];
  c.querySelector(".hit").setAttribute("aria-label","Xem dự án "+p[1]);
  var mz=c.querySelector(".mz"),im;
  if(p[6]){im=new Image();im.alt="";im.src=p[6];im.className="th";mz.appendChild(im)}
  else if(y){im=thumb(y,null,true);im.className="th";mz.appendChild(im)}   /* card dưới màn hình đầu: tải lười */
  c.querySelector(".hit").onclick=function(){openD(p)};
  c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect();
    c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px")});
  hv(c,p[4]);cards.push(c);grid.appendChild(c)});

/* Bộ lọc + thanh trượt */
var fb=[].slice.call(document.querySelectorAll(".filters button")),fx=document.querySelector(".fx");
function ind(){var a=document.querySelector('.filters [aria-pressed="true"]');if(a&&fx){fx.style.width=a.offsetWidth+"px";fx.style.transform="translateX("+a.offsetLeft+"px)"}}
fb.forEach(function(b){b.onclick=function(){
  fb.forEach(function(x){x.setAttribute("aria-pressed",x===b)});ind();
  cards.forEach(function(c){c.hidden=!(b.dataset.f==="all"||c.dataset.k===b.dataset.f)});
  layout();var vn=cards.filter(function(c){return !c.hidden}).length;
  document.getElementById("fc").textContent="Hiển thị "+vn+" dự án: "+b.textContent}});
addEventListener("resize",ind);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(ind);
ind();layout();
(function(){var S=P.filter(function(p){return p[0]=="mv"}).slice(0,4),box=document.querySelector(".slides"),f=document.querySelector(".fr .focus"),sn=document.getElementById("sn"),mon=document.querySelector(".mon .scr"),n=0,t;
  S.forEach(function(p){var d=document.createElement("div");d.className="sl";d.style.setProperty("--g","linear-gradient(120deg,"+p[3].split(",")[0]+","+p[3].split(",")[1]+")");var y=p[4]&&yid(p[4]);if(y){d.appendChild(thumb(y,function(){d.classList.add("img")}))}
  var m=document.createElement("div");m.className="mi";m.style.setProperty("--g","linear-gradient(120deg,"+p[3].split(",")[0]+","+p[3].split(",")[1]+")");if(y){m.appendChild(thumb(y))}mon.appendChild(m);
  box.appendChild(d)});
  var el=box.children;
  function go(i){n=(i+S.length)%S.length;for(var k=0;k<el.length;k++){el[k].classList.toggle("on",k==n);mon.children[k].classList.toggle("on",k==n)}
    sn.textContent="SHOT 0"+(n+1)+" / 0"+S.length+" · "+S[n][1].toUpperCase();
    f.style.animation="none";void f.offsetWidth;f.style.animation=""}
  var rm=matchMedia("(prefers-reduced-motion:reduce)").matches,sp=document.getElementById("sp"),sh=document.querySelector(".shot"),hero=document.querySelector(".hero"),paused=false,held=false;
  function auto(){clearInterval(t);if(rm||paused||held||document.hidden)return;
    t=setInterval(function(){if(!hero.classList.contains("off"))go(n+1)},5000)}   /* dừng khi: giảm chuyển động, bấm Tạm dừng, rê chuột/focus vào điều khiển, tab ẩn, đã cuộn khỏi hero */
  if(rm){sp.hidden=true}else{
    sp.onclick=function(){paused=!paused;sp.setAttribute("aria-pressed",paused);auto()};
    [["mouseenter",1],["focusin",1],["mouseleave",0],["focusout",0]].forEach(function(x){sh.addEventListener(x[0],function(){held=!!x[1];auto()})});
    document.addEventListener("visibilitychange",auto)}
  document.getElementById("sx").onclick=function(){var m=document.querySelector(".mon");m.classList.remove("shoot");void m.offsetWidth;m.classList.add("shoot");go(n+1);auto()};
  go(0);auto()})();
(function(){var t=document.getElementById("top"),c=t.querySelector("circle"),tk=false;
  function u(){var h=document.documentElement,m=h.scrollHeight-h.clientHeight,y=window.scrollY||h.scrollTop;
    t.classList.toggle("on",y>600);c.style.strokeDashoffset=132-(m>0?Math.min(1,y/m):0)*132;tk=false}
  window.addEventListener("scroll",function(){if(!tk){tk=true;requestAnimationFrame(u)}},{passive:true});u();
  t.onclick=function(){if(window.smoothTo)window.smoothTo(0);else window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth"})}})();
var t0=Date.now(),tc=document.getElementById("tc");
var heroEl=document.querySelector(".hero");setInterval(function(){if(heroEl&&heroEl.classList.contains("off"))return;var d=Date.now()-t0,f=Math.floor(d/41.7)%24,s=Math.floor(d/1000);
  var z=function(n){return String(n).padStart(2,"0")};
  tc.textContent="00:"+z(Math.floor(s/60)%60)+":"+z(s%60)+":"+z(f)},42);
document.getElementById("f").onsubmit=function(e){e.preventDefault();
  var s="Yêu cầu dự án: "+document.getElementById("t").value;
  var b="Họ tên: "+document.getElementById("n").value+"\nLiên hệ: "+document.getElementById("c").value+"\n\n"+document.getElementById("m").value;
  location.href="mailto:yzproduction2025@gmail.com?subject="+encodeURIComponent(s)+"&body="+encodeURIComponent(b);
  document.getElementById("fs").textContent="Đang mở ứng dụng email của bạn. Nếu không thấy, hãy gửi trực tiếp tới yzproduction2025@gmail.com."};

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
    var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a||a.classList.contains("skip"))return;   /* skip link dùng nhảy mặc định để chuyển focus */
    var id=a.getAttribute("href").slice(1),el=id?document.getElementById(id):null;
    if(id&&!el)return;e.preventDefault();
    var off=parseFloat(getComputedStyle(de).scrollPaddingTop)||0;
    ln.scrollTo(el||0,{offset:el?-off:0,duration:1.4})});
})();
/* Dừng hiệu ứng hero khi đã cuộn qua để trang nhẹ hơn */
(function(){var hero=document.querySelector(".hero");if(!hero||!window.IntersectionObserver)return;
  new IntersectionObserver(function(es){hero.classList.toggle("off",!es[0].isIntersecting)}).observe(hero)})();

/* Mở thẳng dự án khi vào bằng link có #mv-1... */
(function(){var i=SL.indexOf(location.hash.slice(1));if(i>=0)openD(P[i],true)})();
/* Đánh dấu mục menu theo phần đang xem (scroll-spy) */
(function(){var L2={};[].forEach.call(document.querySelectorAll("nav a[href^='#']"),function(a){L2[a.getAttribute("href").slice(1)]=a});
  var ids=Object.keys(L2),on={};if(!window.IntersectionObserver||!ids.length)return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){on[e.target.id]=e.isIntersecting});
    ids.forEach(function(id){if(on[id])L2[id].setAttribute("aria-current","location");else L2[id].removeAttribute("aria-current")})},
    {rootMargin:"-45% 0px -50% 0px"});            /* dải mỏng giữa màn hình */
  ids.forEach(function(id){var el=document.getElementById(id);if(el)io.observe(el)})})();
