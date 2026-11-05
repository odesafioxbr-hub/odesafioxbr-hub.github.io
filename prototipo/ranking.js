(function () {
  var DIA = [
    { id: "ex-02", nome: "Caio Exemplo", pontos: 142, agua: 2.4, fruta: 3, alongamento: 2, outros: 4 },
    { id: "ex-01", nome: "Lia Exemplo", pontos: 131, agua: 1.8, fruta: 2, alongamento: 1, outros: 2 },
    { id: "ex-03", nome: "Nara Exemplo", pontos: 121, agua: 2.1, fruta: 4, alongamento: 2, outros: 1 },
    { id: "ex-07", nome: "Mel Exemplo", pontos: 110, agua: 1.2, fruta: 1, alongamento: 3, outros: 2 },
    { id: "ex-04", nome: "Davi Exemplo", pontos: 104, agua: 1.6, fruta: 2, alongamento: 1, outros: 3 },
    { id: "ex-13", nome: "Zoe Exemplo", pontos: 98, agua: 0.9, fruta: 3, alongamento: 1, outros: 1 },
    { id: "ex-05", nome: "Bia Exemplo", pontos: 91, agua: 1.4, fruta: 1, alongamento: 2, outros: 0 },
    { id: "ex-10", nome: "Ruy Exemplo", pontos: 86, agua: 1.1, fruta: 2, alongamento: 0, outros: 2 },
    { id: "ex-08", nome: "Ivo Exemplo", pontos: 80, agua: 0.8, fruta: 1, alongamento: 1, outros: 1 },
    { id: "ex-16", nome: "Tom Exemplo", pontos: 74, agua: 1.0, fruta: 0, alongamento: 2, outros: 1 },
    { id: "ex-11", nome: "Eva Exemplo", pontos: 69, agua: 0.7, fruta: 2, alongamento: 1, outros: 0 },
    { id: "ex-06", nome: "Otto Exemplo", pontos: 63, agua: 0.6, fruta: 1, alongamento: 0, outros: 2 },
    { id: "ex-15", nome: "Ari Exemplo", pontos: 58, agua: 0.5, fruta: 1, alongamento: 1, outros: 0 },
    { id: "ex-09", nome: "Tina Exemplo", pontos: 51, agua: 0.4, fruta: 0, alongamento: 1, outros: 1 },
    { id: "ex-12", nome: "Gil Exemplo", pontos: 44, agua: 0.3, fruta: 1, alongamento: 0, outros: 0 },
    { id: "ex-14", nome: "Nil Exemplo", pontos: 37, agua: 0.2, fruta: 0, alongamento: 1, outros: 0 }
  ];
  var MES = [
    { id: "ex-13", nome: "Zoe Exemplo", pontos: 980, agua: 18.2, fruta: 22, alongamento: 14, outros: 11 },
    { id: "ex-04", nome: "Davi Exemplo", pontos: 940, agua: 16.4, fruta: 18, alongamento: 12, outros: 9 },
    { id: "ex-07", nome: "Mel Exemplo", pontos: 901, agua: 15.1, fruta: 16, alongamento: 15, outros: 8 },
    { id: "ex-02", nome: "Caio Exemplo", pontos: 860, agua: 14.2, fruta: 14, alongamento: 10, outros: 7 },
    { id: "ex-01", nome: "Lia Exemplo", pontos: 820, agua: 13.0, fruta: 15, alongamento: 9, outros: 6 },
    { id: "ex-03", nome: "Nara Exemplo", pontos: 790, agua: 12.4, fruta: 17, alongamento: 8, outros: 5 },
    { id: "ex-10", nome: "Ruy Exemplo", pontos: 740, agua: 11.1, fruta: 12, alongamento: 7, outros: 6 },
    { id: "ex-05", nome: "Bia Exemplo", pontos: 705, agua: 10.2, fruta: 11, alongamento: 9, outros: 4 },
    { id: "ex-16", nome: "Tom Exemplo", pontos: 660, agua: 9.4, fruta: 8, alongamento: 8, outros: 3 },
    { id: "ex-08", nome: "Ivo Exemplo", pontos: 620, agua: 8.6, fruta: 9, alongamento: 6, outros: 4 },
    { id: "ex-11", nome: "Eva Exemplo", pontos: 580, agua: 7.8, fruta: 10, alongamento: 5, outros: 2 },
    { id: "ex-15", nome: "Ari Exemplo", pontos: 540, agua: 7.1, fruta: 6, alongamento: 6, outros: 2 },
    { id: "ex-06", nome: "Otto Exemplo", pontos: 500, agua: 6.2, fruta: 7, alongamento: 4, outros: 3 },
    { id: "ex-09", nome: "Tina Exemplo", pontos: 460, agua: 5.4, fruta: 4, alongamento: 5, outros: 1 },
    { id: "ex-12", nome: "Gil Exemplo", pontos: 410, agua: 4.2, fruta: 5, alongamento: 3, outros: 1 },
    { id: "ex-14", nome: "Nil Exemplo", pontos: 360, agua: 3.1, fruta: 2, alongamento: 2, outros: 0 }
  ];
  var META = { dia: { agua: 30, fruta: 40, corpo: 24 }, mes: { agua: 220, fruta: 220, corpo: 140 } };
  var POR_PAGINA = 8;
  var estado = { periodo: "dia", busca: "", pagina: 1, publicar: true, revelar: true, aberto: null };

  var podio = document.getElementById("podio");
  var lista = document.getElementById("lista");
  var busca = document.getElementById("busca");
  var ficha = document.getElementById("ficha");
  var ultimoFoco = null;

  function base() { return estado.periodo === "dia" ? DIA : MES; }
  function ordenada() { return base().slice().sort(function (a, b) { return b.pontos - a.pontos || a.nome.localeCompare(b.nome, "pt-BR"); }); }
  function visivel() {
    var todos = ordenada();
    var corte = estado.revelar ? todos : todos.slice(5);
    var q = estado.busca.trim().toLocaleLowerCase("pt-BR");
    if (!q) return corte;
    return corte.filter(function (a) { return a.nome.toLocaleLowerCase("pt-BR").indexOf(q) !== -1; });
  }
  function soma(arr, chave) { return arr.reduce(function (s, a) { return s + a[chave]; }, 0); }
  function pct(valor, meta) { return Math.max(6, Math.min(100, Math.round(valor / meta * 100))); }
  function litros(n) { return n.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " L"; }

  function desenharGeral() {
    var todos = base();
    var meta = META[estado.periodo];
    var agua = soma(todos, "agua");
    var fruta = soma(todos, "fruta");
    var corpo = soma(todos, "alongamento");
    var nAgua = pct(agua, meta.agua);
    document.getElementById("cilindro").style.setProperty("--n", nAgua);
    document.getElementById("agua-pct").textContent = nAgua + "%";
    document.getElementById("agua-txt").textContent = litros(agua) + " · meta " + meta.agua + " L";
    var horta = document.getElementById("horta");
    var vasos = Math.round(Math.max(0, Math.min(8, fruta / meta.fruta * 8)));
    horta.innerHTML = "";
    for (var i = 0; i < 8; i++) {
      var v = document.createElement("span");
      v.className = "vaso" + (i < vasos ? " cheio" : "");
      horta.appendChild(v);
    }
    document.getElementById("fruta-txt").textContent = fruta + " porções de fruta · meta " + meta.fruta;
    document.getElementById("boneco").style.setProperty("--abre", Math.round(pct(corpo, meta.corpo) / 100 * 28) + "deg");
    document.getElementById("corpo-txt").textContent = corpo + " sessões · meta " + meta.corpo;
    document.getElementById("geral-nota").textContent = "Soma dos 16 atletas de exemplo neste período. As metas não são regra oficial.";
  }

  function itemPodio(atleta, lugar) {
    var li = document.createElement("li");
    li.className = "p" + lugar;
    var av = document.createElement("span");
    av.className = "avatar";
    av.textContent = atleta.nome.slice(0, 1);
    var nome = document.createElement("span");
    nome.className = "nome";
    nome.textContent = atleta.nome;
    var deg = document.createElement("span");
    deg.className = "degrau";
    deg.textContent = lugar + "º";
    li.appendChild(av);
    li.appendChild(nome);
    li.appendChild(document.createTextNode(atleta.pontos + " pts"));
    li.appendChild(deg);
    return li;
  }

  function desenharPodio(todos) {
    podio.innerHTML = "";
    var top = estado.revelar ? todos.slice(0, 3) : [];
    document.getElementById("top5-nota").hidden = estado.revelar;
    if (!top.length) {
      podio.hidden = true;
      return;
    }
    podio.hidden = false;
    var ordem = [top[1], top[0], top[2]];
    var lugares = [2, 1, 3];
    ordem.forEach(function (atleta, i) {
      if (atleta) podio.appendChild(itemPodio(atleta, lugares[i]));
    });
  }

  function desenharLista() {
    var itens = visivel();
    var paginas = Math.max(1, Math.ceil(itens.length / POR_PAGINA));
    if (estado.pagina > paginas) estado.pagina = paginas;
    var ini = (estado.pagina - 1) * POR_PAGINA;
    var fatia = itens.slice(ini, ini + POR_PAGINA);
    lista.innerHTML = "";
    fatia.forEach(function (atleta) {
      var pos = ordenada().findIndex(function (a) { return a.id === atleta.id; }) + 1;
      var li = document.createElement("li");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-haspopup", "dialog");
      btn.innerHTML = '<span class="pos">' + pos + 'º</span><span class="nome"></span><span class="pts"></span>';
      btn.querySelector(".nome").textContent = atleta.nome;
      btn.querySelector(".pts").textContent = atleta.pontos + " pts";
      btn.addEventListener("click", function () { abrirFicha(atleta, pos, btn); });
      li.appendChild(btn);
      lista.appendChild(li);
    });
    var contagem = document.getElementById("contagem");
    contagem.textContent = itens.length ? (ini + 1) + "–" + (ini + fatia.length) + " de " + itens.length + " atletas de exemplo." : "Nenhum atleta de exemplo com esse nome.";
    document.getElementById("pagina").textContent = "Página " + estado.pagina + " de " + paginas;
    document.getElementById("prev").disabled = estado.pagina <= 1;
    document.getElementById("next").disabled = estado.pagina >= paginas;
  }

  function render() {
    desenharGeral();
    var publicado = document.getElementById("area-publicada");
    var aviso = document.getElementById("nao-publicado");
    var blocoLista = document.getElementById("lista-tit").parentElement;
    aviso.hidden = estado.publicar;
    publicado.hidden = !estado.publicar;
    blocoLista.hidden = !estado.publicar;
    if (!estado.publicar) return;
    var todos = ordenada();
    desenharPodio(todos);
    desenharLista();
  }

  function abrirFicha(atleta, pos, origem) {
    ultimoFoco = origem;
    estado.aberto = atleta.id;
    document.getElementById("ficha-nome").textContent = atleta.nome;
    document.getElementById("ficha-pos").textContent = pos + "º no ranking de exemplo " + (estado.periodo === "dia" ? "do dia" : "do mês") + ".";
    var dl = document.getElementById("ficha-nums");
    var linhas = [
      ["Pontos", String(atleta.pontos)],
      ["Água", litros(atleta.agua)],
      ["Fruta", atleta.fruta + " porções"],
      ["Alongamento", atleta.alongamento + " sessões"],
      ["Outros bônus", String(atleta.outros)]
    ];
    dl.innerHTML = "";
    linhas.forEach(function (par) {
      var dt = document.createElement("dt");
      dt.textContent = par[0];
      var dd = document.createElement("dd");
      dd.textContent = par[1];
      dl.appendChild(dt);
      dl.appendChild(dd);
    });
    document.getElementById("ficha-planta").hidden = atleta.fruta <= 0;
    ficha.hidden = false;
    document.getElementById("ficha-fechar").focus();
  }
  function fecharFicha() {
    ficha.hidden = true;
    estado.aberto = null;
    if (ultimoFoco) ultimoFoco.focus();
  }

  document.getElementById("btn-dia").addEventListener("click", function () { estado.periodo = "dia"; estado.pagina = 1; sincronizarPeriodo(); render(); });
  document.getElementById("btn-mes").addEventListener("click", function () { estado.periodo = "mes"; estado.pagina = 1; sincronizarPeriodo(); render(); });
  function sincronizarPeriodo() {
    document.getElementById("btn-dia").setAttribute("aria-pressed", estado.periodo === "dia" ? "true" : "false");
    document.getElementById("btn-mes").setAttribute("aria-pressed", estado.periodo === "mes" ? "true" : "false");
  }
  busca.addEventListener("input", function () { estado.busca = busca.value; estado.pagina = 1; if (estado.publicar) desenharLista(); });
  document.getElementById("prev").addEventListener("click", function () { estado.pagina -= 1; desenharLista(); });
  document.getElementById("next").addEventListener("click", function () { estado.pagina += 1; desenharLista(); });
  document.getElementById("publicar").addEventListener("change", function (e) { estado.publicar = e.target.checked; render(); });
  document.getElementById("revelar").addEventListener("change", function (e) { estado.revelar = e.target.checked; estado.pagina = 1; render(); });
  document.getElementById("ficha-fechar").addEventListener("click", fecharFicha);
  ficha.addEventListener("click", function (e) { if (e.target === ficha) fecharFicha(); });
  document.addEventListener("keydown", function (e) {
    if (ficha.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); fecharFicha(); return; }
    if (e.key !== "Tab") return;
    var foco = [document.getElementById("ficha-fechar")];
    var atual = document.activeElement;
    if (e.shiftKey) { if (atual === foco[0]) { e.preventDefault(); foco[0].focus(); } }
    else if (atual === foco[0]) { e.preventDefault(); foco[0].focus(); }
  });
  render();
})();
