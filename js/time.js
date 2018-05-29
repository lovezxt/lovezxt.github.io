var myDate = new Date();
var Month = myDate.getMonth()+1;
window.timeObj = JSON.parse('{"second":"'+myDate.getSeconds()+'","minute":"'+myDate.getMinutes()+'","hour":"'+myDate.getHours()+'","day":"'+myDate.getDate()+'","month":"'+Month+'","year":"'+myDate.getFullYear()+'"}');
"use strict";
var items = document.querySelectorAll(".item");

function show(t) {
	t >= items.length || setTimeout(function() {
		items[t].classList.add("active"), show(t + 1)
	}, 80)
}

function updateTimeFromServer() {
	var t = new XMLHttpRequest;
	t.open("GET", "/loadTime"), t.setRequestHeader("X-Requested-With", "XMLHttpRequest"), t.send(), t.onreadystatechange = function() {
		t.readyState === XMLHttpRequest.DONE && 200 === t.status && (window.timeObj = JSON.parse(t.responseText))
	}, setTimeout(updateTimeFromServer, 5e3)
}

function initTime(w, t, i, e, n) {
	var o = document.getElementById("time"),
		s = document.createElement("canvas"),
		h = s.getContext("2d"),
		a = document.createElement("canvas"),
		x = a.getContext("2d"),
		r = window.devicePixelRatio || 1,
		u = "white";
	o.appendChild(a), o.appendChild(s), s.width = a.width = o.offsetWidth * r, s.height = a.height = o.offsetHeight * r, h.strokeStyle = u, h.lineCap = "round", h.lineJoin = "round", n *= r;
	var P = (w *= r) / 2,
		p = (t *= r, (i *= r) / 2),
		T = (e *= r) / 2,
		S = a.height / 2;
	x.textAlign = "center", x.textBaseline = "middle", x.font = t + 'px sans-serif, "黑体"';
	var d = !1,
		q = {},
		R = ["年", "月", "日", "时", "分", "秒"],
		b = ["year", "month", "day", "hour", "minute", "second"],
		F = {
			0: "1110111",
			1: "0010001",
			2: "0111110",
			3: "0111011",
			4: "1011001",
			5: "1101011",
			6: "1101111",
			7: "0110001",
			8: "1111111",
			9: "1111011"
		};

	function M(t) {
		return 1 === (t = String(t)).length ? "0" + t : t
	}

	function l() {
		for(var t = new Date, i = [0, 12, new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate(), 24, 60, 60]; i.length;) {
			var e = i.length - 1,
				o = i.pop(),
				s = b[e];
			if(!(++window.timeObj[s] >= o && o)) break;
			window.timeObj[s] = 3 <= e ? 0 : 1
		}! function(l) {
			for(var t = 0; t < b.length; t++)
				if(l[b[t]]) {
					g = t;
					break
				}
			d && g === v || (! function(d, m) {
				x.clearRect(0, 0, a.width, a.height), x.lineWidth = h.lineWidth = n, x.fillStyle = u;
				var v = 0,
					g = P - p,
					c = P + p,
					f = S - T,
					y = S + T;
				R.forEach(function(t, i) {
					if(!(i < m)) {
						for(var e = d[b[i]], o = M(e), s = 0; s < o.length; s++) {
							var n = o[s],
								h = (F[+n], v + g),
								a = v + c,
								r = [{
									x: h,
									y: S
								}, {
									x: h,
									y: f
								}, {
									x: a,
									y: f
								}, {
									x: a,
									y: S
								}, {
									x: h,
									y: S
								}, {
									x: h,
									y: y
								}, {
									x: a,
									y: y
								}, {
									x: a,
									y: S
								}],
								u = q[t + "_" + s] = [];
							x.beginPath(), x.moveTo(r[0].x, r[0].y);
							for(var l = 1; l < r.length; l++) x.lineTo(r[l].x, r[l].y), u.push(new A(r[l - 1], r[l], u[u.length - 1]));
							x.strokeStyle = "rgba(0,0,0,0)", x.stroke(), v += w
						}
						x.fillText(t, v + P, S), v += w
					}
				})
			}(l, g), setTimeout(function() {
				d = !0
			}, 500));
			if(!d) return;
			v = g, R.forEach(function(t, i) {
				for(var e = l[b[i]], o = M(e), s = 0; s < o.length; s++) {
					var n = q[t + "_" + s];
					if(n)
						for(var h = o[s], a = F[+h], r = 0; r < a.length; r++) {
							var h = a[r],
								u = n[r];
							u.value !== h && ("1" === (u.value = h) ? n[r + 1] && "1" === n[r + 1].value ? u.move(3) : u.move(1) : n[r - 1] && "1" === n[r - 1].value ? u.move(2) : u.move(4))
						}
				}
			})
		}(window.timeObj)
	}

	function A(t, i, e) {
		this.pos1 = t, this.pos2 = i, this.value = "0", this.moving = !1, this.shouldMove = !1, this.frontLine = e, this.start = t, this.end = t, this.direction = !1, this.movingPos = null, this.goalPos = null, this.addPos = null
	}
	var m = A.prototype;
	m.frontIsStatic = function() {
		return !this.frontLine || this.frontLine && this.frontLine.isStatic()
	}, m.isStatic = function() {
		return !this.moving && this.frontIsStatic()
	}, m.update = function() {
		this.frontIsStatic() && (this.moving = this.shouldMove), this.moving && (this.updateToGoal(), this.equal(this.movingPos, this.goalPos) && (this.shouldMove = this.moving = !1)), this.equal(this.start, this.end) && !this.moving || (h.moveTo(this.start.x, this.start.y), h.lineTo(this.end.x, this.end.y))
	}, m.updateToGoal = function() {
		this.movingPos.x !== this.goalPos.x && (this.movingPos.x += this.addPos.x, Math.abs(this.movingPos.x - this.goalPos.x) <= .1 && (this.movingPos.x = this.goalPos.x)), this.movingPos.y !== this.goalPos.y && (this.movingPos.y += this.addPos.y, Math.abs(this.movingPos.y - this.goalPos.y) <= .1 && (this.movingPos.y = this.goalPos.y))
	}, m.equal = function(t, i) {
		return t.x === i.x && t.y === i.y
	}, m.move = function(t) {
		this.shouldMove = !0;
		var i = {
				x: this.pos1.x,
				y: this.pos1.y
			},
			e = {
				x: this.pos2.x,
				y: this.pos2.y
			};
		1 === t ? (this.start = this.pos1, this.movingPos = this.end = i, this.goalPos = e) : 2 === t ? (this.start = this.pos1, this.movingPos = this.end = e, this.goalPos = i) : 3 === t ? (this.end = this.pos2, this.movingPos = this.start = e, this.goalPos = i) : (this.end = this.pos2, this.movingPos = this.start = i, this.goalPos = e), this.addPos = {
			x: (this.goalPos.x - this.movingPos.x) / 7,
			y: (this.goalPos.y - this.movingPos.y) / 7
		}
	};
	var v = 0,
		g = 0;
	o = 0;
	window.RAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
			window.setTimeout(t, 1e3 / 60)
		},
		function t() {
			h.clearRect(0, 0, s.width, s.height), h.beginPath(), Object.keys(q).forEach(function(t) {
				q[t].forEach(function(t) {
					t.update()
				})
			}), h.stroke();
			var i = Date.now();
			1e3 <= i - o && (l(), o = i), RAF(t)
		}()
}
show(0), updateTimeFromServer(), initTime(18, 14, 10, 15, 2);