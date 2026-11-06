/* Motion bổ sung: tách chữ hero, đếm số, tiến độ cuộn */
(function(){
  var rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
  /* tách chữ ở h1 hero (giữ nguyên SVG Z và I) */
  var h=document.querySelector(".hero h1");
  if(h&&!rm){var i=0;Array.prototype.slice.call(h.childNodes).forEach(function(n){
    if(n.nodeType===3&&n.textContent.trim()){var f=document.createDocumentFragment();
      n.textContent.split("").forEach(function(c){var s=document.createElement("span");s.className="fxch";s.style.setProperty("--i",i++);s.textContent=c;f.appendChild(s)});n.replaceWith(f)}
    else if(n.nodeName==="svg"){n.classList.add("fxch");n.style.setProperty("--i",i++);n.style.display="inline-block"}})}
  /* đếm số ở phần thống kê */
  var st=document.querySelectorAll(".stats strong");
  if(st.length&&"IntersectionObserver"in window&&!rm){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;io.unobserve(e.target);
      var el=e.target,m=el.textContent.match(/(\d+)(.*)/);if(!m)return;var to=+m[1],t0=performance.now();
      (function step(t){var p=Math.min((t-t0)/1400,1),v=Math.round(to*(1-Math.pow(1-p,3)));el.textContent=v+m[2];if(p<1)requestAnimationFrame(step)})(t0)})},{threshold:.6});
    st.forEach(function(el){io.observe(el)})}
  /* thanh tiến độ cuộn */
  var pr=document.querySelector(".prog");
  if(pr&&!rm){var tk=false;function up(){tk=false;var d=document.documentElement;pr.style.transform="scaleX("+(d.scrollTop/Math.max(1,d.scrollHeight-innerHeight))+")"}
    addEventListener("scroll",function(){if(!tk){tk=true;requestAnimationFrame(up)}},{passive:true})}
})();
/* Footer & form */
(function(){
  var cp=document.getElementById("cp");
  if(cp)cp.addEventListener("click",function(){var t=cp.dataset.copy,o=cp.textContent;
    function ok(){cp.textContent="Đã sao chép ✓";setTimeout(function(){cp.textContent=o},1800)}
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(ok,function(){location.href="mailto:"+t});else location.href="mailto:"+t});
  var up=document.getElementById("ftup"),top=document.getElementById("top");
  if(up)up.addEventListener("click",function(){if(top)top.click();else scrollTo({top:0,behavior:"smooth"})});
  var m=document.getElementById("m");
  if(m){var g=function(){m.style.height="auto";m.style.height=Math.max(120,m.scrollHeight)+"px"};m.addEventListener("input",g)}
  var f=document.getElementById("f"),b=f&&f.querySelector("button[type=submit]");
  if(f&&b)f.addEventListener("submit",function(){var o=b.textContent;b.textContent="Đang mở email…";b.disabled=true;setTimeout(function(){b.textContent=o;b.disabled=false},3500)},true);
})();
