(function(){
  var box=document.getElementById('cdx');if(!box)return;
  var fim=new Date(box.getAttribute('data-fim')).getTime();
  var pls={};box.querySelectorAll('.cdx-pl').forEach(function(p){pls[p.dataset.k]=p;});
  function tile(){var d=document.createElement('div');d.className='fl';
    d.innerHTML='<div class="t"><i></i></div><div class="b"><i></i></div><div class="ft"><i></i></div><div class="fb"><i></i></div>';d._v=null;return d;}
  function q(t,c){return t.querySelector('.'+c+' i');}
  function settle(t){q(t,'t').textContent=q(t,'b').textContent=q(t,'ft').textContent=q(t,'fb').textContent=t._v;t.classList.remove('go');}
  function setTile(t,v){
    if(t._v===null){t._v=v;settle(t);
      t.addEventListener('animationend',function(e){if(e.target.classList.contains('fb'))settle(t);});return;}
    if(t._v===v)return;
    if(t.classList.contains('go'))settle(t);           /* termina giro anterior */
    var old=t._v;t._v=v;
    q(t,'t').textContent=v;  q(t,'b').textContent=old;  /* estáticas: topo novo (coberto), base antiga */
    q(t,'ft').textContent=old;q(t,'fb').textContent=v;  /* giratórias */
    void t.offsetWidth;
    if(matchMedia('(prefers-reduced-motion:reduce)').matches){settle(t);return;}
    t.classList.add('go');}
  function put(k,str){var p=pls[k];while(p.children.length<str.length)p.appendChild(tile());
    while(p.children.length>str.length)p.removeChild(p.firstChild);
    for(var i=0;i<str.length;i++)setTile(p.children[i],str[i]);}
  function pad(n){return n<10?'0'+n:''+n;}
  var timer;
  function tick(){var ms=fim-Date.now();
    if(ms<=0){box.querySelector('.cdx-row').hidden=true;box.querySelector('.cdx-tit').hidden=true;box.querySelector('.cdx-end').hidden=false;clearInterval(timer);return;}
    var s=Math.floor(ms/1000),d=Math.floor(s/86400);s%=86400;
    put('d',d<100?pad(d):''+d);put('h',pad(Math.floor(s/3600)));put('m',pad(Math.floor(s%3600/60)));put('s',pad(s%60));
    box.setAttribute('aria-label','Faltam '+d+' dias');}
  tick();timer=setInterval(tick,1000);
})();
