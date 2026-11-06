/* Cenas animadas de exemplo. O progresso visual é dias/duração.
   Medalhas não entram neste cálculo. Não é regra oficial. */
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var store = new WeakMap();

  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  function fit(canvas) {
    var r = Math.min(1.75, window.devicePixelRatio || 1);
    var w = canvas.clientWidth || 640;
    var h = canvas.clientHeight || 260;
    var bw = Math.max(2, Math.round(w * r));
    var bh = Math.max(2, Math.round(h * r));
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw;
      canvas.height = bh;
    }
    var ctx = canvas.getContext("2d");
    ctx.setTransform(r, 0, 0, r, 0, 0);
    return { ctx: ctx, w: w, h: h };
  }

  function state(canvas) {
    var s = store.get(canvas);
    if (!s) {
      s = { parts: [], prevLeft: null, raf: 0 };
      store.set(canvas, s);
    }
    return s;
  }

  function disc(ctx, x, y, rx, ry) {
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#121212";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(57,255,20,.65)";
    ctx.stroke();
  }

  function drawWater(ctx, w, h, level) {
    ctx.clearRect(0, 0, w, h);
    var cx = w * 0.5, top = h * 0.16, bot = h * 0.74;
    var rx = Math.min(w, h) * 0.16, ry = rx * 0.32;
    disc(ctx, cx, bot + ry * 1.15, rx * 1.45, ry * 0.85);
    var grdG = ctx.createLinearGradient(cx - rx, top, cx + rx, bot);
    grdG.addColorStop(0, "rgba(255,255,255,.22)");
    grdG.addColorStop(0.18, "rgba(190,220,235,.08)");
    grdG.addColorStop(0.5, "rgba(255,255,255,.04)");
    grdG.addColorStop(0.82, "rgba(180,210,230,.1)");
    grdG.addColorStop(1, "rgba(255,255,255,.2)");
    ctx.beginPath();
    ctx.moveTo(cx - rx, top);
    ctx.lineTo(cx - rx + 8, bot);
    ctx.quadraticCurveTo(cx, bot + ry, cx + rx - 8, bot);
    ctx.lineTo(cx + rx, top);
    ctx.closePath();
    ctx.fillStyle = grdG;
    ctx.fill();
    ctx.save();
    ctx.clip();
    var y = bot - (bot - top - ry * 0.4) * clamp(level, 0, 1);
    if (level > 0.012) {
      var agua = ctx.createLinearGradient(cx - rx, y, cx + rx, bot);
      agua.addColorStop(0, "#b9e6ff");
      agua.addColorStop(0.35, "#3d93ef");
      agua.addColorStop(1, "#0c4ea6");
      ctx.fillStyle = agua;
      ctx.fillRect(cx - rx, y, rx * 2, bot - y + 30);
      ctx.fillStyle = "rgba(232,246,255,.9)";
      ctx.beginPath();
      ctx.ellipse(cx, y, rx * 0.78, ry * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(10,50,110,.35)";
      ctx.stroke();
    }
    ctx.restore();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "rgba(236,246,255,.9)";
    ctx.beginPath();
    ctx.moveTo(cx - rx, top);
    ctx.lineTo(cx - rx + 8, bot);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + rx, top);
    ctx.lineTo(cx + rx - 8, bot);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx, bot, rx - 8, ry * 0.72, 0, 0, Math.PI);
    ctx.stroke();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#f7fbff";
    ctx.beginPath();
    ctx.ellipse(cx, top, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(170,210,235,.45)";
    ctx.beginPath();
    ctx.ellipse(cx, top + 3, rx * 0.78, ry * 0.62, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  function leaf(ctx, x, y, s, rot, tone) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.scale(s, s);
    ctx.fillStyle = tone;
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.bezierCurveTo(-10, 2, -12, -10, -2, -14);
    ctx.bezierCurveTo(2, -6, 4, -6, 8, -13);
    ctx.bezierCurveTo(14, -4, 8, 6, 0, 8);
    ctx.fill();
    ctx.restore();
  }

  function drawGarden(ctx, w, h, frac) {
    ctx.clearRect(0, 0, w, h);
    var top = h * 0.46, front = h * 0.7;
    var l = w * 0.16, r = w * 0.84;
    disc(ctx, w * 0.5, front + 18, w * 0.36, 12);
    ctx.fillStyle = "#24180f";
    ctx.beginPath();
    ctx.moveTo(l, top);
    ctx.lineTo(r, top);
    ctx.lineTo(r + 18, front);
    ctx.lineTo(l - 18, front);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#4a3422";
    ctx.beginPath();
    ctx.moveTo(l + 8, top - 16);
    ctx.lineTo(r - 8, top - 16);
    ctx.lineTo(r, top + 6);
    ctx.lineTo(l, top + 6);
    ctx.closePath();
    ctx.fill();
    var slots = [
      [0.3, 0.15, 0.55], [0.5, 0.1, 0.5], [0.7, 0.16, 0.52],
      [0.22, 0.45, 0.85], [0.42, 0.42, 0.8], [0.62, 0.48, 0.82], [0.8, 0.4, 0.78],
      [0.18, 0.78, 1.15], [0.4, 0.82, 1.2], [0.62, 0.76, 1.1], [0.82, 0.8, 1.16]
    ];
    slots.forEach(function (s, i) {
      var delay = (i / slots.length) * 0.2;
      var g = clamp((frac - delay) / (1 - delay), 0, 1);
      if (g <= 0.02) return;
      var x = l + (r - l) * s[0];
      var y = (top - 10) + s[1] * 18;
      var sc = s[2];
      var stem = 18 * sc * g;
      ctx.strokeStyle = "#246b34";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - stem);
      ctx.stroke();
      if (g > 0.3) {
        var ls = sc * ((g - 0.3) / 0.7);
        leaf(ctx, x, y - stem, ls, -0.4, i % 2 ? "#3ea24a" : "#1d6a30");
        if (g > 0.6) leaf(ctx, x, y - stem * 0.7, ls * 0.75, 0.7, "#8fd96a");
      }
    });
  }

  function drawFruit(ctx, tipo, x, y, sc) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(sc, sc);
    if (tipo === 0) {
      ctx.fillStyle = "#e24b3a";
      ctx.beginPath();
      ctx.arc(0, 0, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#2f8a38";
      ctx.beginPath();
      ctx.moveTo(2, -8);
      ctx.quadraticCurveTo(8, -14, 3, -6);
      ctx.stroke();
    } else if (tipo === 1) {
      ctx.fillStyle = "#f0c14a";
      ctx.beginPath();
      ctx.moveTo(-10, 4);
      ctx.quadraticCurveTo(0, -12, 10, 0);
      ctx.quadraticCurveTo(2, 2, -8, 7);
      ctx.fill();
    } else if (tipo === 2) {
      ctx.fillStyle = "#c5dc78";
      ctx.beginPath();
      ctx.ellipse(0, 2, 6, 9, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, -6, 4, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = "#7a4ea3";
      [[-5, 2], [0, -2], [5, 2], [2, 6]].forEach(function (p) {
        ctx.beginPath();
        ctx.arc(p[0], p[1], 3.3, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    ctx.restore();
  }

  function drawBasket(ctx, w, h, total, remaining, parts) {
    ctx.clearRect(0, 0, w, h);
    var cx = w * 0.5, cy = h * 0.58;
    disc(ctx, cx, h * 0.8, w * 0.26, 14);
    ctx.fillStyle = "#5c371c";
    ctx.beginPath();
    ctx.moveTo(cx - 100, cy - 20);
    ctx.quadraticCurveTo(cx, cy + 78, cx + 100, cy - 20);
    ctx.quadraticCurveTo(cx, cy + 8, cx - 100, cy - 20);
    ctx.fill();
    ctx.strokeStyle = "#e6c49a";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#3d2412";
    ctx.beginPath();
    ctx.ellipse(cx, cy - 16, 86, 26, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#c98548";
    ctx.beginPath();
    ctx.ellipse(cx, cy - 16, 86, 26, 0, 0, Math.PI * 2);
    ctx.stroke();
    var spots = [];
    for (var i = 0; i < total; i++) {
      var col = i % 5, row = Math.floor(i / 5);
      spots.push({ x: cx - 56 + col * 28, y: cy - 24 - row * 18, sc: 1.15 - row * 0.12, tipo: i % 4 });
    }
    for (var n = 0; n < remaining && n < spots.length; n++) drawFruit(ctx, spots[n].tipo, spots[n].x, spots[n].y, spots[n].sc);
    (parts || []).forEach(function (p) {
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  }

  function limb(ctx, x1, y1, x2, y2, r1, r2) {
    var a = Math.atan2(y2 - y1, x2 - x1);
    var p = a + Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(x1 + Math.cos(p) * r1, y1 + Math.sin(p) * r1);
    ctx.lineTo(x2 + Math.cos(p) * r2, y2 + Math.sin(p) * r2);
    ctx.arc(x2, y2, r2, p, p + Math.PI, false);
    ctx.lineTo(x1 - Math.cos(p) * r1, y1 - Math.sin(p) * r1);
    ctx.arc(x1, y1, r1, p + Math.PI, p, false);
    ctx.closePath();
    ctx.fillStyle = "#2a2a2a";
    ctx.fill();
    ctx.strokeStyle = "rgba(214,255,70,.9)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function bodyMan(ctx, joints) {
    ctx.fillStyle = "#141414";
    ctx.strokeStyle = "rgba(180,255,40,.85)";
    ctx.lineWidth = 1.4;
    limb(ctx, joints.hip.x, joints.hip.y, joints.chest.x, joints.chest.y, 16, 20);
    limb(ctx, joints.chest.x, joints.chest.y, joints.neck.x, joints.neck.y, 12, 7);
    joints.legs.forEach(function (L) {
      limb(ctx, joints.hip.x, joints.hip.y, L.knee.x, L.knee.y, 11, 8);
      limb(ctx, L.knee.x, L.knee.y, L.foot.x, L.foot.y, 8, 6);
      ctx.beginPath();
      ctx.ellipse(L.foot.x, L.foot.y, 11, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    joints.arms.forEach(function (A) {
      limb(ctx, A.shoulder.x, A.shoulder.y, A.elbow.x, A.elbow.y, 7, 6);
      limb(ctx, A.elbow.x, A.elbow.y, A.hand.x, A.hand.y, 6, 5);
    });
    ctx.beginPath();
    ctx.arc(joints.head.x, joints.head.y, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  function drawStretch(ctx, w, h, t) {
    ctx.clearRect(0, 0, w, h);
    var cx = w * 0.5, floor = h * 0.84;
    ctx.strokeStyle = "rgba(255,255,255,.16)";
    ctx.beginPath();
    ctx.moveTo(w * 0.12, floor);
    ctx.lineTo(w * 0.88, floor);
    ctx.stroke();
    var spread = clamp(t, 0, 1) * 1.42;
    var thigh = h * 0.24, shin = h * 0.22, leg = thigh + shin;
    var hipY = floor - Math.cos(spread) * leg;
    var hip = { x: cx, y: hipY };
    var chest = { x: cx, y: hipY - h * 0.2 };
    var neck = { x: cx, y: chest.y - h * 0.06 };
    var head = { x: cx, y: neck.y - 18 };
    function side(sign) {
      var knee = { x: hip.x + sign * Math.sin(spread) * thigh, y: hip.y + Math.cos(spread) * thigh };
      var foot = { x: hip.x + sign * Math.sin(spread) * leg, y: floor };
      var shoulder = { x: cx + sign * 16, y: chest.y + 6 };
      var sideH = { x: shoulder.x + sign * 10, y: shoulder.y + h * 0.16 };
      var thighH = { x: hip.x + sign * Math.sin(spread) * thigh * 0.65, y: hip.y + Math.cos(spread) * thigh * 0.55 };
      var floorH = { x: hip.x + sign * (28 + Math.sin(spread) * 20), y: floor };
      var hand = t < 0.4 ? {
        x: lerp(sideH.x, thighH.x, t / 0.4),
        y: lerp(sideH.y, thighH.y, t / 0.4)
      } : {
        x: lerp(thighH.x, floorH.x, (t - 0.4) / 0.6),
        y: lerp(thighH.y, floorH.y, (t - 0.4) / 0.6)
      };
      var elbow = { x: (shoulder.x + hand.x) / 2 + sign * 6, y: (shoulder.y + hand.y) / 2 + 4 };
      return { knee: knee, foot: foot, shoulder: shoulder, elbow: elbow, hand: hand };
    }
    var L = side(-1), R = side(1);
    bodyMan(ctx, { hip: hip, chest: chest, neck: neck, head: head, legs: [L, R], arms: [L, R] });
  }

  var NODES = [
    { f: 0.02, cor: "#e23b32" },
    { f: 0.18, cor: "#f08a24" },
    { f: 0.34, cor: "#f2d024" },
    { f: 0.5, cor: "#3dce4a" },
    { f: 0.66, cor: "#3aa0e8" },
    { f: 0.84, cor: "#6a4ad8" },
    { f: 0.98, cor: "#c86bff" }
  ];

  function drawMeditate(ctx, w, h, light, showExtra) {
    ctx.clearRect(0, 0, w, h);
    var cx = w * 0.42, floor = h * 0.8;
    disc(ctx, cx, floor + 6, w * 0.22, h * 0.05);
    var hip = { x: cx, y: floor - h * 0.16 };
    var chest = { x: cx, y: hip.y - h * 0.2 };
    var neck = { x: cx, y: chest.y - h * 0.05 };
    var head = { x: cx, y: neck.y - 16 };
    ctx.fillStyle = "#2a2a2a";
    ctx.beginPath();
    ctx.ellipse(cx, hip.y + 28, 62, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(214,255,70,.9)";
    ctx.stroke();
    limb(ctx, hip.x, hip.y, chest.x, chest.y, 15, 18);
    limb(ctx, chest.x, chest.y, neck.x, neck.y, 10, 6);
    limb(ctx, chest.x - 8, chest.y + 8, cx - 28, hip.y + 8, 6, 5);
    limb(ctx, chest.x + 8, chest.y + 8, cx + 28, hip.y + 8, 6, 5);
    ctx.beginPath();
    ctx.arc(head.x, head.y, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    var pelvis = { x: cx, y: hip.y + 6 };
    var crown = { x: cx, y: head.y - 16 };
    ctx.strokeStyle = "rgba(80,80,80,.9)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(pelvis.x, pelvis.y);
    ctx.lineTo(crown.x, crown.y);
    ctx.stroke();
    var tip = { x: lerp(pelvis.x, crown.x, light), y: lerp(pelvis.y, crown.y, light) };
    ctx.strokeStyle = "rgba(230,255,180,.95)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(pelvis.x, pelvis.y);
    ctx.lineTo(tip.x, tip.y);
    ctx.stroke();
    NODES.forEach(function (n) {
      var x = lerp(pelvis.x, crown.x, n.f);
      var y = lerp(pelvis.y, crown.y, n.f);
      var on = clamp((light - (n.f - 0.06)) / 0.08, 0, 1);
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = on > 0 ? n.cor : "#2a2a2a";
      ctx.globalAlpha = 0.25 + 0.75 * on;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    if (showExtra) {
      ctx.fillStyle = "#ffa400";
      ctx.font = "600 12px Inter, sans-serif";
      ctx.fillText("8 latentes", w * 0.68, h * 0.22);
      for (var i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.arc(w * 0.74, h * 0.3 + i * 16, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function draw(canvas, animT) {
    var st = state(canvas);
    var view = fit(canvas);
    var ctx = view.ctx, w = view.w, h = view.h;
    var dur = st.duracao || 0;
    var dias = st.dias || 0;
    var p = dur ? clamp(animT, 0, 1) * (dias / dur) : 0;
    if (dias >= dur && dur > 0 && animT >= 1) p = 1;
    canvas.dataset.progresso = String(Math.round(p * 1000) / 1000);
    canvas.dataset.frutas = st.tipo === "frutas" ? String(dur - Math.round(dias * clamp(animT, 0, 1))) : "";
    canvas.dataset.extras = st.tipo === "meditacao" && dur === 15 && dias >= dur && animT >= 0.98 ? "8" : "0";
    if (st.tipo === "agua") drawWater(ctx, w, h, p);
    else if (st.tipo === "horta") drawGarden(ctx, w, h, p);
    else if (st.tipo === "frutas") {
      var consumed = Math.round(dias * clamp(animT, 0, 1));
      var left = dur - consumed;
      if (st.prevLeft != null && left < st.prevLeft) {
        for (var i = 0; i < 5; i++) st.parts.push({ x: w * 0.5, y: h * 0.45, vx: (Math.random() - 0.5) * 40, vy: -18 - Math.random() * 24, life: 1, color: "#f2c14e" });
      }
      st.prevLeft = left;
      var dt = 0.016;
      st.parts.forEach(function (pt) { pt.x += pt.vx * dt; pt.y += pt.vy * dt; pt.life -= dt * 1.6; });
      st.parts = st.parts.filter(function (pt) { return pt.life > 0; });
      drawBasket(ctx, w, h, dur, left, st.parts);
    } else if (st.tipo === "alongamento") drawStretch(ctx, w, h, p);
    else if (st.tipo === "meditacao") drawMeditate(ctx, w, h, p, dur === 15 && dias >= dur && animT >= 0.98);
  }

  function play(canvas, spec) {
    var st = state(canvas);
    st.tipo = spec.tipo;
    st.duracao = spec.duracao;
    st.dias = clamp(spec.dias, 0, spec.duracao);
    st.prevLeft = spec.duracao;
    st.parts = [];
    if (st.raf) cancelAnimationFrame(st.raf);
    if (reduced) {
      draw(canvas, 1);
      return;
    }
    var t0 = performance.now();
    var ms = 2200;
    function frame(now) {
      var u = clamp((now - t0) / ms, 0, 1);
      draw(canvas, ease(u));
      if (u < 1) st.raf = requestAnimationFrame(frame);
    }
    st.raf = requestAnimationFrame(frame);
  }

  function frameAt(canvas, spec, animT) {
    var st = state(canvas);
    st.tipo = spec.tipo;
    st.duracao = spec.duracao;
    st.dias = spec.dias;
    draw(canvas, animT);
  }

  window.BonusCenas = { play: play, frameAt: frameAt };
})();
