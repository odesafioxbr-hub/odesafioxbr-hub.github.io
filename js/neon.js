/* Entrada ao rolar (uma vez) para blocos .rev; recalcula as fitas depois que tudo assenta. */
(function(){
  var els=[].slice.call(document.querySelectorAll('.rev'));
  var reduz=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function refit(){dispatchEvent(new Event('resize'));}
  if(reduz||!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('on')});return;}
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('on');io.unobserve(en.target);setTimeout(refit,2600);}})},{threshold:.18});
  els.forEach(function(e){io.observe(e)});
})();
