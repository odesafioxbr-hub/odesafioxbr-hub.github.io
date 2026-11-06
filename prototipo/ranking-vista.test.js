var vista = require("./ranking-vista.js");
var lista = [
  { id: "a", nome: "Ana Exemplo", medalhas: 70 },
  { id: "b", nome: "Bia Exemplo", medalhas: 60 },
  { id: "c", nome: "Caio Exemplo", medalhas: 50 },
  { id: "d", nome: "Davi Exemplo", medalhas: 40 },
  { id: "e", nome: "Eva Exemplo", medalhas: 30 },
  { id: "f", nome: "Felix Exemplo", medalhas: 20 },
  { id: "g", nome: "Gil Exemplo", medalhas: 10 }
];

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

var oculto = vista.cargaPublica(lista, { publicado: true, ocultarTop5: true });
var json = JSON.stringify(oculto);
assert(oculto.itens.length === 7, "ranking geral permanece com 7 lugares");
assert(oculto.itens[5].nome === "Felix Exemplo" && oculto.itens[5].pos === 6, "6º continua visível na posição original");
assert(oculto.itens[6].medalhas === 10 && oculto.itens[6].pos === 7, "7º continua visível");
oculto.itens.slice(0, 5).forEach(function (item, i) {
  assert(item.oculto === true && item.pos === i + 1, "lugar " + (i + 1) + " fica sem dados");
  assert(!("nome" in item) && !("medalhas" in item) && !("id" in item), "payload do top 5 não tem nome nem ponto");
});
["Ana Exemplo", "Bia Exemplo", "Caio Exemplo", "Davi Exemplo", "Eva Exemplo", "70", "60", "50", "40", "30"].forEach(function (segredo) {
  assert(json.indexOf(segredo) === -1, "vazou no payload: " + segredo);
});
assert(oculto.itens.filter(function (item) {
  return item.nome && item.nome.toLocaleLowerCase("pt-BR").indexOf("ana") !== -1;
}).length === 0, "busca não acha nome oculto");

var dia = vista.cargaPublica(lista, { publicado: true, ocultarTop5: false });
assert(dia.itens[0].nome === "Ana Exemplo" && dia.itens[0].medalhas === 70, "sem ocultar, o dia mostra o primeiro");

var fechado = vista.cargaPublica(lista, { publicado: false, ocultarTop5: false });
assert(fechado.itens.length === 0 && JSON.stringify(fechado).indexOf("Ana Exemplo") === -1, "resultado não publicado não leva nomes");

console.log("ranking-vista: ok");
