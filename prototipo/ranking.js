(function () {
  var DIA = [
    { id: "ex-02", nome: "Caio Exemplo", medalhas: 142, agua: 2.4, vegetais: 2, frutas: 3, alongamento: 2, meditacao: 1 },
    { id: "ex-01", nome: "Lia Exemplo", medalhas: 131, agua: 1.8, vegetais: 1, frutas: 2, alongamento: 1, meditacao: 2 },
    { id: "ex-03", nome: "Nara Exemplo", medalhas: 121, agua: 2.1, vegetais: 3, frutas: 4, alongamento: 2, meditacao: 1 },
    { id: "ex-07", nome: "Mel Exemplo", medalhas: 110, agua: 1.2, vegetais: 2, frutas: 1, alongamento: 3, meditacao: 2 },
    { id: "ex-04", nome: "Davi Exemplo", medalhas: 104, agua: 1.6, vegetais: 1, frutas: 2, alongamento: 1, meditacao: 1 },
    { id: "ex-13", nome: "Zoe Exemplo", medalhas: 98, agua: 0.9, vegetais: 2, frutas: 3, alongamento: 1, meditacao: 0 },
    { id: "ex-05", nome: "Bia Exemplo", medalhas: 91, agua: 1.4, vegetais: 1, frutas: 1, alongamento: 2, meditacao: 1 },
    { id: "ex-10", nome: "Ruy Exemplo", medalhas: 86, agua: 1.1, vegetais: 0, frutas: 2, alongamento: 0, meditacao: 1 },
    { id: "ex-08", nome: "Ivo Exemplo", medalhas: 80, agua: 0.8, vegetais: 1, frutas: 1, alongamento: 1, meditacao: 0 },
    { id: "ex-16", nome: "Tom Exemplo", medalhas: 74, agua: 1.0, vegetais: 1, frutas: 0, alongamento: 2, meditacao: 1 },
    { id: "ex-11", nome: "Eva Exemplo", medalhas: 69, agua: 0.7, vegetais: 2, frutas: 2, alongamento: 1, meditacao: 0 },
    { id: "ex-06", nome: "Otto Exemplo", medalhas: 63, agua: 0.6, vegetais: 0, frutas: 1, alongamento: 0, meditacao: 1 },
    { id: "ex-15", nome: "Ari Exemplo", medalhas: 58, agua: 0.5, vegetais: 1, frutas: 1, alongamento: 1, meditacao: 0 },
    { id: "ex-09", nome: "Tina Exemplo", medalhas: 51, agua: 0.4, vegetais: 0, frutas: 0, alongamento: 1, meditacao: 0 },
    { id: "ex-12", nome: "Gil Exemplo", medalhas: 44, agua: 0.3, vegetais: 1, frutas: 1, alongamento: 0, meditacao: 0 },
    { id: "ex-14", nome: "Nil Exemplo", medalhas: 37, agua: 0.2, vegetais: 0, frutas: 0, alongamento: 1, meditacao: 0 }
  ];
  var MES = [
    { id: "ex-13", nome: "Zoe Exemplo", medalhas: 980, agua: 18.2, vegetais: 14, frutas: 12, alongamento: 11, meditacao: 10 },
    { id: "ex-04", nome: "Davi Exemplo", medalhas: 940, agua: 16.4, vegetais: 12, frutas: 11, alongamento: 10, meditacao: 9 },
    { id: "ex-07", nome: "Mel Exemplo", medalhas: 901, agua: 15.1, vegetais: 11, frutas: 10, alongamento: 12, meditacao: 8 },
    { id: "ex-02", nome: "Caio Exemplo", medalhas: 860, agua: 14.2, vegetais: 10, frutas: 9, alongamento: 9, meditacao: 8 },
    { id: "ex-01", nome: "Lia Exemplo", medalhas: 820, agua: 13.0, vegetais: 9, frutas: 10, alongamento: 8, meditacao: 7 },
    { id: "ex-03", nome: "Nara Exemplo", medalhas: 790, agua: 12.4, vegetais: 13, frutas: 11, alongamento: 7, meditacao: 6 },
    { id: "ex-10", nome: "Ruy Exemplo", medalhas: 740, agua: 11.1, vegetais: 8, frutas: 8, alongamento: 6, meditacao: 6 },
    { id: "ex-05", nome: "Bia Exemplo", medalhas: 705, agua: 10.2, vegetais: 7, frutas: 7, alongamento: 8, meditacao: 5 },
    { id: "ex-16", nome: "Tom Exemplo", medalhas: 660, agua: 9.4, vegetais: 6, frutas: 6, alongamento: 7, meditacao: 5 },
    { id: "ex-08", nome: "Ivo Exemplo", medalhas: 620, agua: 8.6, vegetais: 6, frutas: 5, alongamento: 5, meditacao: 4 },
    { id: "ex-11", nome: "Eva Exemplo", medalhas: 580, agua: 7.8, vegetais: 5, frutas: 6, alongamento: 4, meditacao: 4 },
    { id: "ex-15", nome: "Ari Exemplo", medalhas: 540, agua: 7.1, vegetais: 4, frutas: 4, alongamento: 5, meditacao: 3 },
    { id: "ex-06", nome: "Otto Exemplo", medalhas: 500, agua: 6.2, vegetais: 4, frutas: 4, alongamento: 3, meditacao: 3 },
    { id: "ex-09", nome: "Tina Exemplo", medalhas: 460, agua: 5.4, vegetais: 3, frutas: 3, alongamento: 4, meditacao: 2 },
    { id: "ex-12", nome: "Gil Exemplo", medalhas: 410, agua: 4.2, vegetais: 2, frutas: 2, alongamento: 2, meditacao: 1 },
    { id: "ex-14", nome: "Nil Exemplo", medalhas: 360, agua: 3.1, vegetais: 1, frutas: 1, alongamento: 2, meditacao: 1 }
  ];
  var POR_PAGINA = 8;
  var estado = { periodo: "dia", busca: "", pagina: 1, publicar: true, revelar: true, duracao: 15, dia: 8 };
  var podio = document.getElementById("podio");
  var lista = document.getElementById("lista");
  var busca = document.getElementById("busca");
  var ficha = document.getElementById("ficha");
  var ultimoFoco = null;
  var fichaAbertaId = null;

  function base() { return estado.periodo === "dia" ? DIA : MES; }
  function vista() {
    return RankingVista.cargaPublica(base(), {
      publicado: estado.publicar,
      ocultarTop5: estado.periodo === "mes" && !estado.revelar
    });
  }
  function visivel() {
    var itens = vista().itens;
    var q = estado.busca.trim().toLocaleLowerCase("pt-BR");
    if (!q) return itens;
    return itens.filter(function (a) {
      return a.nome && a.nome.toLocaleLowerCase("pt-BR").indexOf(q) !== -1;
    });
  }
  function medalha() {
    return '<svg class="medalha" viewBox="0 0 24 24" aria-hidden="true"><path fill="#ffa400" d="M8.5 2h7l-1.4 6h-4.2z"/><circle cx="12" cy="15.5" r="6.2" fill="#143018" stroke="#39ff14" stroke-width="1.6"/></svg>';
  }
  function copoSvg(nivel, id) {
    var n = Math.max(0, Math.min(1, nivel));
    var fundo = 124;
    var topo = 48;
    var y = fundo - n * (fundo - topo);
    return '<svg class="copo-svg" viewBox="0 0 100 156" role="img" aria-label="Copo aberto com água azul">' +
      '<defs><clipPath id="' + id + '"><path d="M24 40 L32 126 Q50 140 68 126 L76 40 Z"/></clipPath></defs>' +
      '<path d="M24 40 L32 126 Q50 140 68 126 L76 40" fill="rgba(160,210,255,.06)" stroke="#d5ecff" stroke-width="3"/>' +
      '<g clip-path="url(#' + id + ')">' +
      '<rect x="20" y="' + y + '" width="60" height="' + (fundo - y + 16) + '" fill="#1a6fdb"/>' +
      (n > 0.02 ? '<ellipse cx="50" cy="' + y + '" rx="22" ry="6.5" fill="#8ecbff"/>' : '') +
      '</g>' +
      '<ellipse cx="50" cy="40" rx="26" ry="8" fill="none" stroke="#f2f8ff" stroke-width="3"/>' +
      '</svg>';
  }
  function planta(tipo) {
    if (tipo === "alface") return '<ellipse cx="0" cy="6" rx="16" ry="8" fill="#2f8f3a"/><ellipse cx="-8" cy="2" rx="10" ry="6" fill="#67c56a"/><ellipse cx="9" cy="3" rx="9" ry="5" fill="#1f6b32"/>';
    if (tipo === "cenoura") return '<path d="M0 -8 C8 0 6 16 0 22 C-6 16 -8 0 0 -8" fill="#e36b1a"/><path d="M0 -8 C-10 -16 -4 -24 0 -18 C4 -26 12 -16 0 -8" fill="none" stroke="#3d9a45" stroke-width="2"/>';
    if (tipo === "tomate") return '<circle cx="0" cy="4" r="9" fill="#d83a32"/><path d="M-6 0 C0 -8 6 0 0 2 C-2 -6 6 -4 6 0" fill="#2f8a38"/>';
    if (tipo === "couve") return '<path d="M0 16 C-14 8 -16 -8 -6 -16 C-2 -4 2 -4 6 -16 C16 -6 12 10 0 16" fill="#1f7a3a"/><path d="M0 16 C-6 4 -4 -6 0 -12 C4 -6 6 4 0 16" fill="#4caf50"/>';
    return '<path d="M0 16 V0" stroke="#3d9a45" stroke-width="2" fill="none"/><path d="M0 6 C-12 2 -16 -8 -8 -12 C-4 -2 0 2 0 6" fill="#7dff57"/><path d="M0 2 C10 -2 16 -12 8 -16 C4 -6 0 -2 0 2" fill="#2f8f3a"/>';
  }
  function hortaSvg(frac) {
    var slots = [
      ["alface", 78, 52, 0.62], ["cenoura", 148, 50, 0.58], ["couve", 214, 54, 0.6],
      ["tomate", 58, 90, 0.9], ["broto", 128, 94, 0.92], ["alface", 196, 88, 0.88],
      ["couve", 36, 132, 1.2], ["cenoura", 112, 136, 1.22], ["tomate", 188, 130, 1.18]
    ];
    var n = Math.round(Math.max(0, Math.min(1, frac)) * slots.length);
    var solos = '<ellipse cx="150" cy="58" rx="108" ry="14" fill="#1a140e"/><ellipse cx="140" cy="96" rx="124" ry="16" fill="#24180f"/><ellipse cx="130" cy="138" rx="140" ry="18" fill="#2c1c10"/>';
    var verts = slots.map(function (s, i) {
      if (i >= n) return "";
      return '<g transform="translate(' + s[1] + ' ' + s[2] + ') scale(' + s[3] + ')">' + planta(s[0]) + '</g>';
    }).join("");
    return '<svg class="horta-svg" viewBox="0 0 280 168" role="img" aria-label="Horta de vegetais em perspectiva">' + solos + verts + '</svg>';
  }
  function fruta(tipo, x, y) {
    if (tipo === "maca") return '<g transform="translate(' + x + ' ' + y + ')"><circle r="7" fill="#e24b3a"/><path d="M2 -6 C6 -12 4 -14 1 -8" stroke="#2f8a38" fill="none"/></g>';
    if (tipo === "banana") return '<g transform="translate(' + x + ' ' + y + ')"><path d="M-8 4 C-2 -8 8 -6 8 2 C4 0 0 2 -6 6" fill="#f2c14e"/></g>';
    if (tipo === "pera") return '<g transform="translate(' + x + ' ' + y + ')"><ellipse cy="2" rx="5" ry="7" fill="#b7d36a"/><circle cy="-4" r="3.2" fill="#c6e07a"/></g>';
    return '<g transform="translate(' + x + ' ' + y + ')"><circle cx="-4" cy="1" r="3" fill="#7a4ea3"/><circle cx="0" cy="-2" r="3" fill="#6a3d96"/><circle cx="4" cy="2" r="3" fill="#8d5cb8"/></g>';
  }
  function cestaSvg(total, restantes) {
    var tipos = ["maca", "banana", "pera", "uva"];
    var frutas = "";
    for (var i = 0; i < restantes; i++) {
      var col = i % 5;
      var row = Math.floor(i / 5);
      var x = 58 + col * 22 - row * 4;
      var y = 78 - row * 16;
      frutas += fruta(tipos[i % tipos.length], x, y);
    }
    return '<svg class="cesta-svg" viewBox="0 0 200 150" role="img" aria-label="Cesta com frutas restantes">' +
      '<path d="M28 70 H172 L156 124 Q100 136 44 124 Z" fill="#6b3e1f" stroke="#e7c08a" stroke-width="2"/>' +
      '<path d="M36 84 H164 M40 98 H160 M46 112 H154" stroke="#c9864a" stroke-width="1.4" fill="none"/>' +
      '<path d="M46 70 C70 28 130 28 154 70" fill="none" stroke="#e7c08a" stroke-width="3"/>' +
      frutas + '</svg>';
  }
  function chakrasHtml(dia, duracao) {
    var lit = duracao ? Math.min(7, (dia / duracao) * 7) : 0;
    var html = '<div class="coluna" data-coluna="sete">';
    for (var i = 0; i < 7; i++) {
      var f = Math.max(0, Math.min(1, lit - i));
      html += '<i class="ponto" data-ponto="sete" style="--f:' + f.toFixed(2) + '"><span>ponto ' + (i + 1) + '</span></i>';
    }
    html += '</div>';
    if (duracao === 15 && dia >= 15) {
      html += '<div class="coluna extras" data-coluna="extras">';
      for (var k = 0; k < 8; k++) html += '<i class="ponto" data-ponto="extra" style="--f:1"><span>ponto ' + (8 + k) + '</span></i>';
      html += '</div>';
    }
    return html;
  }

  function desenharBonus() {
    var d = estado.duracao;
    var dia = estado.dia;
    var frac = d ? dia / d : 0;
    var restantes = Math.max(0, d - dia);
    document.querySelectorAll("canvas[data-tipo]").forEach(function (c) {
      BonusCenas.play(c, { tipo: c.getAttribute("data-tipo"), duracao: d, dias: dia });
    });
    document.getElementById("agua-txt").textContent = "Simulação visual: copo " + Math.round(frac * 100) + "% ao longo de " + d + " dias. Sem meta oficial de litros.";
    document.getElementById("horta-txt").textContent = "Vegetais nascem da terra. Cheia só com os " + d + " dias. Agora " + dia + " de " + d + ".";
    document.getElementById("fruta-txt").textContent = "Simulação: 1 fruta some por dia cumprido. Restam " + restantes + " de " + d + ". Cesta vazia só no fim.";
    document.getElementById("alonga-txt").textContent = "Teste geométrico: a figura abre as pernas ao longo de " + dia + " de " + d + " dias. Não é o estudo realista aprovado.";
    var acesos = d ? Math.min(7, (dia / d) * 7) : 0;
    var extra = d === 15 && dia >= 15;
    document.getElementById("medita-txt").textContent = "Sete pontos ao longo de " + d + " dias (" + acesos.toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + " de 7). " +
      (d === 15 ? (extra ? "Concluído: os oito pontos latentes aparecem agora. Total visual 15." : "Os oito extras ficam ocultos até concluir os 15 dias.") : "Os oito extras não têm desenho nesta duração.");
    document.getElementById("dia-rotulo").textContent = dia + " de " + d;
    document.querySelectorAll("[data-dur]").forEach(function (b) {
      b.setAttribute("aria-pressed", Number(b.getAttribute("data-dur")) === d ? "true" : "false");
    });
  }

  function itemPodio(atleta, lugar) {
    var li = document.createElement("li");
    li.className = "p" + lugar;
    li.innerHTML = '<span class="avatar"></span><span class="nome"></span><span class="medalhas"></span><span class="degrau"></span>';
    li.querySelector(".avatar").textContent = atleta.nome.slice(0, 1);
    li.querySelector(".nome").textContent = atleta.nome;
    li.querySelector(".medalhas").innerHTML = medalha() + " " + atleta.medalhas;
    li.querySelector(".degrau").textContent = lugar + "º";
    return li;
  }
  function desenharPodio(carga) {
    podio.innerHTML = "";
    var oculto = estado.periodo === "mes" && !estado.revelar;
    document.getElementById("top5-nota").hidden = !oculto;
    var top = oculto ? [] : carga.itens.filter(function (a) { return a.nome && a.pos <= 3; });
    podio.hidden = !top.length;
    if (!top.length) return;
    [top[1], top[0], top[2]].forEach(function (atleta, i) {
      if (atleta) podio.appendChild(itemPodio(atleta, [2, 1, 3][i]));
    });
  }
  function desenharLista() {
    var carga = vista();
    var itens = visivel();
    var paginas = Math.max(1, Math.ceil(itens.length / POR_PAGINA));
    if (estado.pagina > paginas) estado.pagina = paginas;
    var ini = (estado.pagina - 1) * POR_PAGINA;
    var fatia = itens.slice(ini, ini + POR_PAGINA);
    lista.innerHTML = "";
    fatia.forEach(function (atleta) {
      var li = document.createElement("li");
      if (atleta.oculto) {
        li.innerHTML = '<span class="pos"></span><span class="nome"></span><span class="medalhas"></span>';
        li.querySelector(".pos").textContent = atleta.pos + "º";
        li.querySelector(".nome").textContent = "Oculto";
        lista.appendChild(li);
        return;
      }
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-haspopup", "dialog");
      btn.innerHTML = '<span class="pos"></span><span class="nome"></span><span class="medalhas"></span>';
      btn.querySelector(".pos").textContent = atleta.pos + "º";
      btn.querySelector(".nome").textContent = atleta.nome;
      btn.querySelector(".medalhas").innerHTML = medalha() + " " + atleta.medalhas;
      btn.addEventListener("click", function () { abrirFicha(atleta, atleta.pos, btn); });
      li.appendChild(btn);
      lista.appendChild(li);
    });
    var total = carga.total;
    var texto;
    if (!fatia.length) {
      texto = estado.busca.trim() ? "Nenhum atleta visível com esse nome." : "Nenhum atleta nesta vista.";
    } else if (estado.busca.trim()) {
      texto = fatia.length + (fatia.length === 1 ? " atleta visível" : " atletas visíveis") + " com esse nome, no ranking de " + total + ".";
    } else {
      texto = fatia[0].pos + "–" + fatia[fatia.length - 1].pos + " de " + total + " atletas de exemplo.";
    }
    if (estado.periodo === "mes" && !estado.revelar) texto += " Nome e pontuação dos cinco primeiros não entram nesta vista.";
    document.getElementById("contagem").textContent = texto;
    document.getElementById("pagina").textContent = "Página " + estado.pagina + " de " + paginas;
    document.getElementById("prev").disabled = estado.pagina <= 1;
    document.getElementById("next").disabled = estado.pagina >= paginas;
  }
  function render() {
    desenharBonus();
    var publicado = document.getElementById("area-publicada");
    var aviso = document.getElementById("nao-publicado");
    var blocoLista = document.getElementById("lista-tit").parentElement;
    aviso.hidden = estado.publicar;
    publicado.hidden = !estado.publicar;
    blocoLista.hidden = !estado.publicar;
    if (fichaAbertaId && (!estado.publicar || !vista().itens.some(function (a) { return a.id === fichaAbertaId; }))) limparFicha();
    if (!estado.publicar) return;
    desenharPodio(vista());
    desenharLista();
  }
  function limparFicha() {
    fichaAbertaId = null;
    ficha.hidden = true;
    document.getElementById("ficha-nome").textContent = "";
    document.getElementById("ficha-pos").textContent = "";
    document.getElementById("ficha-nums").innerHTML = "";
    document.getElementById("ficha-planta").hidden = true;
  }
  function abrirFicha(atleta, pos, origem) {
    if (!atleta || !atleta.nome || !vista().itens.some(function (a) { return a.id === atleta.id; })) return;
    ultimoFoco = origem;
    fichaAbertaId = atleta.id;
    document.getElementById("ficha-nome").textContent = atleta.nome;
    document.getElementById("ficha-pos").textContent = pos + "º no ranking de exemplo " + (estado.periodo === "dia" ? "do dia" : "do mês") + ". Medalhas de exemplo, sem fórmula oficial.";
    var dl = document.getElementById("ficha-nums");
    dl.innerHTML = "";
    [["Medalhas", String(atleta.medalhas)], ["Água", atleta.agua.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " L"], ["Vegetais", String(atleta.vegetais)], ["Frutas", String(atleta.frutas)], ["Alongamento", atleta.alongamento + " · teste geométrico"], ["Meditação", atleta.meditacao + " · teste geométrico"]].forEach(function (par) {
      var dt = document.createElement("dt");
      dt.textContent = par[0];
      var dd = document.createElement("dd");
      dd.textContent = par[1];
      dl.appendChild(dt);
      dl.appendChild(dd);
    });
    document.getElementById("ficha-planta").hidden = atleta.vegetais <= 0;
    ficha.hidden = false;
    document.getElementById("ficha-fechar").focus();
  }
  function fecharFicha() {
    var foco = ultimoFoco;
    limparFicha();
    if (foco) foco.focus();
  }

  document.getElementById("btn-dia").addEventListener("click", function () { estado.periodo = "dia"; estado.pagina = 1; sincronizarPeriodo(); render(); });
  document.getElementById("btn-mes").addEventListener("click", function () { estado.periodo = "mes"; estado.pagina = 1; sincronizarPeriodo(); render(); });
  function sincronizarPeriodo() {
    document.getElementById("btn-dia").setAttribute("aria-pressed", estado.periodo === "dia" ? "true" : "false");
    document.getElementById("btn-mes").setAttribute("aria-pressed", estado.periodo === "mes" ? "true" : "false");
  }
  document.querySelectorAll("[data-dur]").forEach(function (b) {
    b.addEventListener("click", function () {
      estado.duracao = Number(b.getAttribute("data-dur"));
      var range = document.getElementById("dia-visual");
      range.max = String(estado.duracao);
      if (estado.dia > estado.duracao) estado.dia = estado.duracao;
      range.value = String(estado.dia);
      desenharBonus();
    });
  });
  document.getElementById("dia-visual").addEventListener("input", function (e) {
    estado.dia = Number(e.target.value);
    desenharBonus();
  });
  busca.addEventListener("input", function () { estado.busca = busca.value; estado.pagina = 1; if (estado.publicar) desenharLista(); });
  document.getElementById("prev").addEventListener("click", function () { estado.pagina -= 1; desenharLista(); });
  document.getElementById("next").addEventListener("click", function () { estado.pagina += 1; desenharLista(); });
  document.getElementById("publicar").addEventListener("change", function (e) { estado.publicar = e.target.checked; render(); });
  document.getElementById("revelar").addEventListener("change", function (e) { estado.revelar = e.target.checked; estado.pagina = 1; render(); });
  document.getElementById("ficha-fechar").addEventListener("click", fecharFicha);
  ficha.addEventListener("click", function (e) { if (e.target === ficha) fecharFicha(); });
  document.addEventListener("keydown", function (e) {
    if (ficha.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); fecharFicha(); }
  });
  render();
})();
