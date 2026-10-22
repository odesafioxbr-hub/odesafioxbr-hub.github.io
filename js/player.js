/* Player do vídeo de vendas: play grande, sem pausar/avançar, barra de progresso,
   pausa quando sai da tela (IntersectionObserver) e continua de onde parou quando volta. */
(function(){
  document.querySelectorAll('.vplayer').forEach(function(box){
    var v=box.querySelector('video'),btn=box.querySelector('.vplay'),bar=box.querySelector('.vbar i');
    var started=false,visible=true;
    v.controls=false;v.removeAttribute('controls');
    v.addEventListener('contextmenu',function(e){e.preventDefault()});
    function tick(){if(v.duration)bar.style.width=(v.currentTime/v.duration*100)+'%';if(!v.paused)requestAnimationFrame(tick);}
    btn.addEventListener('click',function(){
      if(v.ended)v.currentTime=0;
      started=true;v.muted=false;
      var p=v.play();box.classList.add('playing');
      if(p&&p.catch)p.catch(function(){box.classList.remove('playing');started=false;});
    });
    v.addEventListener('play',function(){requestAnimationFrame(tick)});
    // não deixa pausar (teclas de mídia, menu etc.), só ao terminar ou com a aba escondida
    v.addEventListener('pause',function(){if(started&&visible&&!v.ended&&!document.hidden)v.play().catch(function(){})});
    document.addEventListener('visibilitychange',function(){if(!document.hidden&&started&&visible&&!v.ended&&v.paused)v.play().catch(function(){})});
    // impede avançar/voltar
    var last=0;v.addEventListener('timeupdate',function(){if(!v.seeking)last=v.currentTime});
    v.addEventListener('seeking',function(){if(started&&!v.ended&&Math.abs(v.currentTime-last)>.5)v.currentTime=last});
    v.addEventListener('ended',function(){started=false;bar.style.width='100%';box.classList.remove('playing');});
    if('IntersectionObserver' in window){
      new IntersectionObserver(function(es){es.forEach(function(e){visible=e.intersectionRatio>=.35;if(started&&!v.ended){if(visible){if(v.paused)v.play().catch(function(){})}else if(!v.paused)v.pause();}});},{threshold:[0,.35,.6,1]}).observe(box);
    }
  });
})();
