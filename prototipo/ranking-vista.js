(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.RankingVista = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function ordenar(lista) {
    return lista.slice().sort(function (a, b) {
      return b.medalhas - a.medalhas || String(a.nome).localeCompare(String(b.nome), "pt-BR");
    });
  }

  // Vista que a página pode receber. Com o top 5 oculto, nome, id e pontuação
  // desses lugares não entram no objeto. O 6º em diante permanece, com a posição original.
  function cargaPublica(lista, opcoes) {
    var opts = opcoes || {};
    var ranking = ordenar(lista);
    var total = ranking.length;
    if (!opts.publicado) return { total: total, itens: [] };
    var itens = ranking.map(function (atleta, i) {
      var pos = i + 1;
      if (opts.ocultarTop5 && pos <= 5) return { pos: pos, oculto: true };
      return { id: atleta.id, nome: atleta.nome, medalhas: atleta.medalhas, pos: pos };
    });
    return { total: total, itens: itens };
  }

  return { ordenar: ordenar, cargaPublica: cargaPublica };
});
