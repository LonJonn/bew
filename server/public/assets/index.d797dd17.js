import {
  S as t,
  i as n,
  s as e,
  e as s,
  a,
  b as o,
  c,
  d as u,
  f as i,
  l as r,
  n as l,
  g as m,
  r as p,
  h as f,
  H as E,
  j as d,
  t as T,
  k as h,
  m as A,
  o as S,
  p as D,
  q as v,
  u as g,
} from "./vendor.5d81f3aa.js";
var I, _;
((_ = I || (I = {})).SET_VIDEO = "SET_VIDEO"),
  (_.LOAD_VIDEO = "LOAD_VIDEO"),
  (_.UPDATE_STATE = "UPDATE_STATE"),
  (_.SEEK = "SEEK");
function y(t) {
  let n, e, f, E, d, T, h, A, S;
  return {
    c() {
      (n = s("div")),
        (e = s("video")),
        (e.innerHTML = '<track kind="captions"/>'),
        (f = a()),
        (E = s("form")),
        (d = s("input")),
        (T = a()),
        (h = s("button")),
        (h.textContent = "Change Video"),
        o(e, "height", "400"),
        (e.controls = !0),
        o(d, "name", "src"),
        o(h, "type", "submit"),
        o(n, "class", "player svelte-1dhddcs");
    },
    m(s, a) {
      c(s, n, a),
        u(n, e),
        t[6](e),
        u(n, f),
        u(n, E),
        u(E, d),
        i(d, t[2]),
        u(E, T),
        u(E, h),
        t[11](E),
        A ||
          ((S = [
            r(e, "play", t[7]),
            r(e, "pause", t[8]),
            r(e, "seeking", t[9]),
            r(d, "input", t[10]),
            r(E, "submit", t[3]),
          ]),
          (A = !0));
    },
    p(t, [n]) {
      4 & n && d.value !== t[2] && i(d, t[2]);
    },
    i: l,
    o: l,
    d(e) {
      e && m(n), t[6](null), t[11](null), (A = !1), p(S);
    },
  };
}
function O(t, n, e) {
  let s,
    a,
    o,
    c = !0;
  const u = f(""),
    i = new E();
  u.onAny(() => {
    c = !1;
  });
  const r = u.on;
  function l(t) {
    c && u.emit(I.UPDATE_STATE, { state: t });
  }
  function m() {
    c && u.emit(I.SEEK, { timeStamp: s.currentTime });
  }
  (u.on = function (t, n, ...e) {
    return r.apply(u, [
      t,
      function (...t) {
        n(...t), setTimeout(() => (c = !0), 0);
      },
      ...e,
    ]);
  }),
    u.onAny((...t) => console.log("Received:", t)),
    u.on(I.LOAD_VIDEO, function (t) {
      t.src.includes(".mp4")
        ? e(0, (s.src = t.src), s)
        : (i.loadSource(t.src), i.attachMedia(s)),
        e(0, (s.currentTime = t.timeStamp), s),
        "PLAYING" === t.state ? s.play() : s.pause();
    }),
    u.on(I.UPDATE_STATE, function (t) {
      "PLAYING" === t.state ? s.play() : s.pause();
    }),
    u.on(I.SEEK, function (t) {
      e(0, (s.currentTime = t.timeStamp), s);
    });
  return [
    s,
    a,
    o,
    function (t) {
      t.preventDefault(),
        c && (u.emit(I.SET_VIDEO, { src: o }), e(2, (o = "")));
    },
    l,
    m,
    function (t) {
      d[t ? "unshift" : "push"](() => {
        (s = t), e(0, s);
      });
    },
    () => l("PLAYING"),
    () => l("PAUSED"),
    () => m(),
    function () {
      (o = this.value), e(2, o);
    },
    function (t) {
      d[t ? "unshift" : "push"](() => {
        (a = t), e(1, a);
      });
    },
  ];
}
class P extends t {
  constructor(t) {
    super(), n(this, t, O, y, e, {});
  }
}
function k(t) {
  let n, e, a;
  return {
    c() {
      (n = s("button")),
        (n.textContent = "Join"),
        o(n, "class", "join-btn svelte-tk5h9s");
    },
    m(s, o) {
      c(s, n, o), e || ((a = r(n, "click", t[1])), (e = !0));
    },
    p: l,
    i: l,
    o: l,
    d(t) {
      t && m(n), (e = !1), a();
    },
  };
}
function L(t) {
  let n, e;
  return (
    (n = new P({})),
    {
      c() {
        D(n.$$.fragment);
      },
      m(t, s) {
        v(n, t, s), (e = !0);
      },
      p: l,
      i(t) {
        e || (A(n.$$.fragment, t), (e = !0));
      },
      o(t) {
        T(n.$$.fragment, t), (e = !1);
      },
      d(t) {
        g(n, t);
      },
    }
  );
}
function V(t) {
  let n, e, a, u;
  const i = [L, k],
    r = [];
  function l(t, n) {
    return t[0] ? 0 : 1;
  }
  return (
    (e = l(t)),
    (a = r[e] = i[e](t)),
    {
      c() {
        (n = s("main")), a.c(), o(n, "class", "svelte-tk5h9s");
      },
      m(t, s) {
        c(t, n, s), r[e].m(n, null), (u = !0);
      },
      p(t, [s]) {
        let o = e;
        (e = l(t)),
          e === o
            ? r[e].p(t, s)
            : (S(),
              T(r[o], 1, 1, () => {
                r[o] = null;
              }),
              h(),
              (a = r[e]),
              a ? a.p(t, s) : ((a = r[e] = i[e](t)), a.c()),
              A(a, 1),
              a.m(n, null));
      },
      i(t) {
        u || (A(a), (u = !0));
      },
      o(t) {
        T(a), (u = !1);
      },
      d(t) {
        t && m(n), r[e].d();
      },
    }
  );
}
function b(t, n, e) {
  let s = !1;
  return [s, () => e(0, (s = !0))];
}
new (class extends t {
  constructor(t) {
    super(), n(this, t, b, V, e, {});
  }
})({ target: document.getElementById("app") });
