/**
 * Created by wendyliu on 2018/5/23.
 */
!function(joint) {
	"use strict";
	var b = function() {
		this.options = {
			handles: [{
				name: "remove",
				position: "nw",
				events: {
					pointerdown: "removeElement"
				},
				icon: null
			}, {
				name: "direction",
				position: "se",
				events: {
					pointerdown: "directionSwap"
				},
				icon: null
			}, {
				name: "view",
				position: "s",
				events: {
					pointerdown: "viewContent"
				},
				icon: null
			}],
			bbox: function(a) {
				var b = .5 * a.getConnectionLength();
				return a.getPointAtLength(b)
			},
			typeCssName: "type-link",
			tinyThreshold: -1,
			smallThreshold: -1,
			boxContent: !1
		}
	};
	b.prototype.directionSwap = function() {
		var a = this.options.cellView.model;
		a.set({
			source: a.get("target"),
			target: a.get("source")
		}, {
			halo: this.cid
		})
	};
	var c = function() {
		this.options = {
			handles: [{
				name: "remove",
				position: "nw",
				events: {
					pointerdown: "removeElement"
				},
				icon: null
			}, {
				name: "resize",
				position: "se",
				events: {
					pointerdown: "startResizing",
					pointermove: "doResize",
					pointerup: "stopBatch"
				},
				icon: null
			}, {
				name: "clone",
				position: "n",
				events: {
					pointerdown: "startCloning",
					pointermove: "doClone",
					pointerup: "stopCloning"
				},
				icon: null
			}, {
				name: "link",
				position: "e",
				events: {
					pointerdown: "startLinking",
					pointermove: "doLink",
					pointerup: "stopLinking"
				},
				icon: null
			}, {
				name: "fork",
				position: "ne",
				events: {
					pointerdown: "startForking",
					pointermove: "doFork",
					pointerup: "stopForking"
				},
				icon: null
			}, {
				name: "unlink",
				position: "w",
				events: {
					pointerdown: "unlinkElement"
				},
				icon: null
			}, {
				name: "rotate",
				position: "sw",
				events: {
					pointerdown: "startRotating",
					pointermove: "doRotate",
					pointerup: "stopBatch"
				},
				icon: null
			}, {
				name: "view",
				position: "s",
				events: {
					pointerdown: "viewContent"
				},
				icon: null
			}],
			bbox: function(a, b) {
				return a.getBBox({
					useModelGeometry: b.options.useModelGeometry
				})
			},
			typeCssName: "type-element",
			tinyThreshold: 40,
			smallThreshold: 80,
			boxContent: function(b, c) {
				var d = joint.util.template("x: <%= x %>, y: <%= y %>, width: <%= width %>, height: <%= height %>, angle: <%= angle %>")
					, e = b.model
					, f = e.getBBox();
				return d({
					x: Math.floor(f.x),
					y: Math.floor(f.y),
					width: Math.floor(f.width),
					height: Math.floor(f.height),
					angle: Math.floor(e.get("angle") || 0)
				})
			},
			magnet: function(a) {
				return a.el
			},
			loopLinkPreferredSide: "top",
			loopLinkWidth: 40,
			rotateAngleGrid: 15,
			linkAttributes: {},
			smoothLinks: void 0
		}
	};
	c.prototype.startLinking = function(a, b, c) {
		this.startBatch();
		var d = this.options
			, e = d.paper
			, f = d.graph
			, g = this.createLinkConnectedToSource();
		g.set({
			target: {
				x: b,
				y: c
			}
		}).addTo(f, {
			validation: !1,
			halo: this.cid,
			async: !1
		});
		var h = this._linkView = g.findView(e);
		h.startArrowheadMove("target", {
			whenNotAllowed: "remove"
		})
	}
		,
		c.prototype.startForking = function(b, c, d) {
			var e = this.options
				, f = e.paper
				, g = e.graph;
			this.startBatch();
			var h = e.clone(e.cellView.model, {
				fork: !0
			});
			if (!(h instanceof joint.dia.Cell))
				throw new Error('ui.Halo: option "clone" has to return a cell.');
			this.centerElementAtCursor(h, c, d),
				h.addTo(g, {
					halo: this.cid,
					async: !1
				});
			var i = this.createLinkConnectedToSource()
				, j = this._cloneView = h.findView(f)
				, k = this.getElementMagnet(j, "target")
				, l = this.getLinkEnd(j, k);
			i.set("target", l).addTo(g, {
				halo: this.cid,
				async: !1
			}),
				j.pointerdown(b, c, d)
		}
		,
		c.prototype.getElementMagnet = function(b, c) {
			var d = this.options.magnet;
			if (joint.util.isFunction(d)) {
				var e = d.call(this, b, c);
				if (e instanceof SVGElement)
					return e
			}
			throw new Error("ui.Halo: magnet() has to return an SVGElement.")
		}
		,
		c.prototype.getLinkEnd = function(a, b) {
			var c = {
				id: a.model.id
			};
			if (b !== a.el) {
				var d = b.getAttribute("port");
				d ? c.port = d : c.selector = a.getSelector(b)
			}
			return c
		}
		,
		c.prototype.createLinkConnectedToSource = function() {
			var b = this.options
				, c = b.paper
				, d = b.cellView
				, e = this.getElementMagnet(d, "source")
				, f = this.getLinkEnd(d, e)
				, g = c.getDefaultLink(d, e).set("source", f);
			return g.attr(b.linkAttributes),
			joint.util.isBoolean(b.smoothLinks) && g.set("smooth", b.smoothLinks),
				g
		}
		,
		c.prototype.startResizing = function(a) {
			this.startBatch(),
				this._flip = [1, 0, 0, 1, 1, 0, 0, 1][Math.floor(g.normalizeAngle(this.options.cellView.model.get("angle")) / 45)]
		}
		,
		c.prototype.startRotating = function(a, b, c) {
			this.startBatch();
			var d = this.options.cellView.model.getBBox().center()
				, e = g.normalizeAngle(this.options.cellView.model.get("angle"));
			this._center = d,
				this._rotationStartAngle = e || 0,
				this._clientStartAngle = g.point(b, c).theta(d)
		}
		,
		c.prototype.doResize = function(a, b, c, d, e) {
			var f = this.options.cellView.model.get("size")
				, g = Math.max(f.width + (this._flip ? d : e), 1)
				, h = Math.max(f.height + (this._flip ? e : d), 1);
			this.options.cellView.model.resize(g, h, {
				absolute: !0
			})
		}
		,
		c.prototype.doRotate = function(a, b, c) {
			var d = this._clientStartAngle - g.point(b, c).theta(this._center)
				, e = g.snapToGrid(this._rotationStartAngle + d, this.options.rotateAngleGrid);
			this.options.cellView.model.rotate(e, !0)
		}
		,
		c.prototype.doClone = function(a, b, c) {
			var d = this._cloneView;
			d && d.pointermove(a, b, c)
		}
		,
		c.prototype.startCloning = function(b, c, d) {
			var e = this.options;
			this.startBatch();
			var f = e.clone(e.cellView.model, {
				clone: !0
			});
			if (!(f instanceof joint.dia.Cell))
				throw new Error('ui.Halo: option "clone" has to return a cell.');
			this.centerElementAtCursor(f, c, d),
				f.addTo(e.graph, {
					halo: this.cid,
					async: !1
				}),
				this._cloneView = f.findView(e.paper),
				this._cloneView.pointerdown(b, c, d)
		}
		,
		c.prototype.centerElementAtCursor = function(a, b, c) {
			var d = a.getBBox().center()
				, e = b - d.x
				, f = c - d.y;
			a.translate(e, f)
		}
		,
		c.prototype.doFork = function(a, b, c) {
			var d = this._cloneView;
			d && d.pointermove(a, b, c)
		}
		,
		c.prototype.doLink = function(a, b, c) {
			this._linkView && this._linkView.pointermove(a, b, c)
		}
		,
		c.prototype.stopLinking = function(a) {
			this._linkView && (this._linkView.pointerup(a),
			this._linkView.model.hasLoop() && this.makeLoopLink(this._linkView.model),
				this.stopBatch(),
				this.triggerAction("link", "add", this._linkView.model),
				this._linkView = null)
		}
		,
		c.prototype.stopForking = function(a, b, c) {
			var d = this._cloneView;
			d && d.pointerup(a, b, c),
				this.stopBatch()
		}
		,
		c.prototype.stopCloning = function(a, b, c) {
			var d = this._cloneView;
			d && d.pointerup(a, b, c),
				this.stopBatch()
		}
		,
		c.prototype.unlinkElement = function(a) {
			this.startBatch(),
				this.options.graph.removeLinks(this.options.cellView.model),
				this.stopBatch()
		}
		,
		c.prototype.makeLoopLink = function(b) {
			var c, d, e = this.options.loopLinkWidth, f = this.options.paper.options, h = g.rect({
				x: 0,
				y: 0,
				width: f.width,
				height: f.height
			}), i = V(this.options.cellView.el).bbox(!1, this.options.paper.viewport), j = joint.util.uniq([this.options.loopLinkPreferredSide, "top", "bottom", "left", "right"]), k = j.find(function(a) {
				var b, f = 0, j = 0;
				switch (a) {
					case "top":
						b = g.point(i.x + i.width / 2, i.y - e),
							f = e / 2;
						break;
					case "bottom":
						b = g.point(i.x + i.width / 2, i.y + i.height + e),
							f = e / 2;
						break;
					case "left":
						b = g.point(i.x - e, i.y + i.height / 2),
							j = e / 2;
						break;
					case "right":
						b = g.point(i.x + i.width + e, i.y + i.height / 2),
							j = e / 2
				}
				return c = g.point(b).offset(-f, -j),
					d = g.point(b).offset(f, j),
				h.containsPoint(c) && h.containsPoint(d)
			}, this);
			k && b.set("vertices", [c, d])
		},
		joint.ui.Halo = joint.mvc.View.extend({
			PIE_INNER_RADIUS: 20,
			PIE_OUTER_RADIUS: 50,
			className: "halo",
			events: {
				"mousedown .handle": "onHandlePointerDown",
				"touchstart .handle": "onHandlePointerDown",
				"mousedown .pie-toggle": "onPieTogglePointerDown",
				"touchstart .pie-toggle": "onPieTogglePointerDown"
			},
			documentEvents: {
				mousemove: "pointermove",
				touchmove: "pointermove",
				mouseup: "pointerup",
				touchend: "pointerup"
			},
			options: {
				clearAll: !0,
				clearOnBlankPointerdown: !0,
				useModelGeometry: !1,
				clone: function(a, b) {
					return a.clone().unset("z")
				},
				type: "surrounding",
				pieSliceAngle: 45,
				pieStartAngleOffset: 0,
				pieIconSize: 14,
				pieToggles: [{
					name: "default",
					position: "e"
				}]
			},
			init: function() {
				var opts = this.options,
					_cellView = opts.cellView,
					f = _cellView.model,
					g = f.isLink() ? new b : new c;
				joint.util.assign(this, joint.util.omit(g, "options"));
				var _paper = _cellView.paper, _graph = _paper.model;
				joint.util.defaults(opts, g.options, {
					paper: _paper,
					graph: _graph
				}),
					joint.util.bindAll(this, "render", "update"),
				opts.clearAll && this.constructor.clear(_paper),
					this.listenTo(_graph, "reset", this.remove),
					this.listenTo(f, "remove", this.remove),
					this.listenTo(_paper, "halo:create", this.remove),
				opts.clearOnBlankPointerdown && this.listenTo(_paper, "blank:pointerdown", this.remove),
					this.listenTo(_graph, "all", this.update),
					this.listenTo(_paper, "scale translate", this.update),
					this.handles = [],
					joint.util.toArray(opts.handles).forEach(this.addHandle, this)
			},
			render: function() {
				var b = this.options;
				switch (this.$el.empty(),
					this.$handles = $("<div/>").addClass("handles").appendTo(this.el),
					this.$box = $("<label/>").addClass("box").appendTo(this.el),
					this.$pieToggles = {},
					this.$el.addClass(b.type),
					this.$el.addClass(this.cellTypeCssClass()),
					this.$el.attr("data-type", b.cellView.model.get("type")),
					this.$handles.append(joint.util.toArray(this.handles).map(this.renderHandle, this)),
					b.type) {
					case "toolbar":
					case "surrounding":
						this.hasHandle("fork") && this.toggleFork();
						break;
					case "pie":
						joint.util.toArray(this.options.pieToggles).forEach(function(b) {
							var c = $("<div/>");
							c.addClass("pie-toggle " + (b.position || "e")),
								c.attr("data-name", b.name),
								joint.util.setAttributesBySelector(c, b.attrs),
								c.appendTo(this.el),
								this.$pieToggles[b.name] = c
						}, this);
						break;
					default:
						throw new Error("ui.Halo: unknown type")
				}
				return this.update(),
					this.$el.addClass("animate").appendTo(b.paper.el),
					this.setPieIcons(),
					this
			},
			setPieIcons: function() {
				"pie" === this.options.type && this.$el.find(".handle").each(function(a, b) {
					var c, d = $(b), e = d.attr("data-action"), f = this.getHandle(e);
					if (!f || !f.icon) {
						var g = window.getComputedStyle(b, ":before").getPropertyValue("content");
						g && "none" !== g && (c = d.find(".slice-text-icon"),
						c.length > 0 && V(c[0]).text(g.replace(/['"]/g, "")));
						var h = d.css("background-image");
						if (h) {
							var i = h.match(/url\(['"]?([^'"]+)['"]?\)/);
							if (i) {
								var j = i[1];
								c = d.find(".slice-img-icon"),
								c.length > 0 && V(c[0]).attr("xlink:href", j)
							}
						}
					}
				}
					.bind(this))
			},
			update: function() {
				if (this.isRendered()) {
					this.updateBoxContent();
					var a = this.getBBox();
					this.$el.toggleClass("tiny", a.width < this.options.tinyThreshold && a.height < this.options.tinyThreshold),
						this.$el.toggleClass("small", !this.$el.hasClass("tiny") && a.width < this.options.smallThreshold && a.height < this.options.smallThreshold),
						this.$el.css({
							width: a.width,
							height: a.height,
							left: a.x,
							top: a.y
						}),
					this.hasHandle("unlink") && this.toggleUnlink()
					// 目前 仅对定制节点 flow配置子流程的时候 开发view
					this.isFlow('csf.Flow') ? this.toggleView() : this.toggleView(0)
				}
			},
			isFlow: function(type){
				return this.options.cellView.model.get('type') === type
			},
			toggleView: function(a) {
				// 判断当前flow节点是否配置子流程
				a !== 0 && (a = this.options.cellView.model.attributes.attrs.linkSource)
				this.$handles.children(".view").toggleClass("hidden", !a)
			},
			getBBox: function() {
				var b = this.options.cellView
					, c = this.options.bbox
					, d = joint.util.isFunction(c) ? c(b, this) : c;
				return d = joint.util.defaults({}, d, {
					x: 0,
					y: 0,
					width: 1,
					height: 1
				}),
					g.rect(d)
			},
			cellTypeCssClass: function() {
				return this.options.typeCssName
			},
			updateBoxContent: function() {
				var b = this.options.boxContent
					, c = this.options.cellView;
				if (joint.util.isFunction(b)) {
					var d = b.call(this, c, this.$box[0]);
					d && this.$box.html(d)
				} else
					b ? this.$box.html(b) : this.$box.remove()
			},
			extendHandles: function(b) {
				joint.util.forIn(b, function(b) {
					var c = this.getHandle(b.name);
					c && joint.util.assign(c, b)
				}
					.bind(this))
			},
			addHandles: function(b) {
				return joint.util.toArray(b).forEach(this.addHandle, this),
					this
			},
			addHandle: function(b) {
				var c = this.getHandle(b.name);
				return c || (this.handles.push(b),
					joint.util.forIn(b.events, function(c, d) {
						joint.util.isString(c) ? this.on("action:" + b.name + ":" + d, this[c], this) : this.on("action:" + b.name + ":" + d, c)
					}
						.bind(this)),
				this.$handles && this.renderHandle(b).appendTo(this.$handles)),
					this
			},
			renderHandle: function(b) {
				var c = this.getHandleIdx(b.name)
					, d = $("<div/>").addClass("handle").addClass(b.name).attr("data-action", b.name).prop("draggable", !1);
				switch (this.options.type) {
					case "toolbar":
					case "surrounding":
						d.addClass(b.position),
						b.content && d.html(b.content);
						break;
					case "pie":
						var e = this.PIE_OUTER_RADIUS,
							f = this.PIE_INNER_RADIUS,
							h = (e + f) / 2,
							i = g.point(e, e),
							j = g.toRad(this.options.pieSliceAngle),
							k = c * j + g.toRad(this.options.pieStartAngleOffset),
							l = k + j,
							m = V.createSlicePathData(f, e, k, l),
							n = V("svg").addClass("slice-svg"),
							o = V("path").attr("d", m).translate(e, e).addClass("slice"),
							p = g.point.fromPolar(h, -k - j / 2, i),
							q = this.options.pieIconSize,
							r = V("image").attr(p).addClass("slice-img-icon");
						p.y = p.y + q - 2;
						var s = V("text", {
							"font-size": q
						}).attr(p).addClass("slice-text-icon");
						r.attr({
							width: q,
							height: q
						}),
							r.translate(-q / 2, -q / 2),
							s.translate(-q / 2, -q / 2),
							n.append([o, r, s]),
							d.append(n.node)
				}
				return b.icon && this.setHandleIcon(d, b.icon),
					joint.util.setAttributesBySelector(d, b.attrs),
					d
			},
			setHandleIcon: function(a, b) {
				switch (this.options.type) {
					case "pie":
						var c = a.find(".slice-img-icon");
						V(c[0]).attr("xlink:href", b);
						break;
					case "toolbar":
					case "surrounding":
						a.css("background-image", "url(" + b + ")")
				}
			},
			removeHandles: function() {
				for (; this.handles.length; )
					this.removeHandle(this.handles[0].name);
				return this
			},
			removeHandle: function(b) {
				var c = this.getHandleIdx(b)
					, d = this.handles[c];
				return d && (joint.util.forIn(d.events, function(a, c) {
					this.off("action:" + b + ":" + c)
				}
					.bind(this)),
					this.$(".handle." + b).remove(),
					this.handles.splice(c, 1)),
					this
			},
			changeHandle: function(b, c) {
				var d = this.getHandle(b);
				return d && (this.removeHandle(b),
					this.addHandle(joint.util.merge({
						name: b
					}, d, c))),
					this
			},
			hasHandle: function(a) {
				return this.getHandleIdx(a) !== -1
			},
			getHandleIdx: function(b) {
				return joint.util.toArray(this.handles).findIndex(function(a) {
					return a.name === b
				})
			},
			getHandle: function(b) {
				return joint.util.toArray(this.handles).find(function(a) {
					return a.name === b
				})
			},
			toggleHandle: function(a, b) {
				var c = this.getHandle(a);
				if (c) {
					var d = this.$(".handle." + a);
					void 0 === b && (b = !d.hasClass("selected")),
						d.toggleClass("selected", b);
					var e = b ? c.iconSelected : c.icon;
					e && this.setHandleIcon(d, e)
				}
				return this
			},
			selectHandle: function(a) {
				return this.toggleHandle(a, !0)
			},
			deselectHandle: function(a) {
				return this.toggleHandle(a, !1)
			},
			deselectAllHandles: function() {
				return joint.util.toArray(this.handles).forEach(function(a) {
					this.deselectHandle(a.name)
				}, this),
					this
			},
			onHandlePointerDown: function(b) {
				if (this._action = $(b.target).closest(".handle").attr("data-action"),
						this._action) {
					b.preventDefault(),
						b.stopPropagation(),
						b = joint.util.normalizeEvent(b);
					var c = this.options.paper.snapToGrid({
						x: b.clientX,
						y: b.clientY
					});
					this._localX = c.x,
						this._localY = c.y,
						this._evt = b,
						this.triggerAction(this._action, "pointerdown", b, c.x, c.y),
						this.delegateDocumentEvents(null, b.data)
				}
			},
			onPieTogglePointerDown: function(a) {
				a.stopPropagation();
				var b = $(a.target).closest(".pie-toggle")
					, c = b.attr("data-name");
				this.isOpen(c) ? this.toggleState(c) : this.isOpen() ? (this.toggleState(),
					this.toggleState(c)) : this.toggleState(c)
			},
			triggerAction: function(a, b, c) {
				var d = Array.prototype.slice.call(arguments, 2);
				d.unshift("action:" + a + ":" + b),
					this.trigger.apply(this, d)
			},
			stopBatch: function() {
				this.options.graph.stopBatch("halo", {
					halo: this.cid
				})
			},
			startBatch: function() {
				this.options.graph.startBatch("halo", {
					halo: this.cid
				})
			},
			pointermove: function(b) {
				if (this._action) {
					b.preventDefault(),
						b.stopPropagation(),
						b = joint.util.normalizeEvent(b);
					var c = this.options.paper.snapToGrid({
						x: b.clientX,
						y: b.clientY
					})
						, d = c.x - this._localX
						, e = c.y - this._localY;
					this._localX = c.x,
						this._localY = c.y,
						this._evt = b,
						this.triggerAction(this._action, "pointermove", b, c.x, c.y, d, e)
				}
			},
			pointerup: function(a) {
				var b = this._action;
				if (b) {
					this._action = null,
						this._evt = null;
					var c = this.options.paper.snapToGrid({
						x: a.clientX,
						y: a.clientY
					});
					this.triggerAction(b, "pointerup", a, c.x, c.y),
						this.undelegateDocumentEvents()
				}
			},
			onRemove: function() {
				this._action && this._evt && this.pointerup(this._evt),
				this.options.graph.hasActiveBatch("halo") && this.stopBatch()
			},
			onSetTheme: function() {
				this.setPieIcons()
			},
			removeElement: function() {
				this.options.cellView.model.remove()
			},
			viewContent: function(callback) {
				// callback(this.options.cellView.model)
			},
			toggleUnlink: function() {
				var a = this.options.graph.getConnectedLinks(this.options.cellView.model).length > 0;
				this.$handles.children(".unlink").toggleClass("hidden", !a)
			},
			toggleFork: function() {
				var a = this.options.cellView.model.clone()
					, b = this.options.paper.createViewForModel(a)
					, c = this.options.paper.options.validateConnection(this.options.cellView, null, b, null, "target");
				this.$handles.children(".fork").toggleClass("hidden", !c),
					b.remove(),
					a = null
			},
			toggleState: function(b) {
				if (this.isRendered()) {
					var c = this.$el;
					if (joint.util.forIn(this.$pieToggles, function(a) {
							a.removeClass("open")
						}),
							this.isOpen())
						this.trigger("state:close", b),
							c.removeClass("open");
					else {
						if (this.trigger("state:open", b),
								b) {
							var d = joint.util.toArray(this.options.pieToggles).find(function(a) {
								return a.name === b
							});
							d && c.attr({
								"data-pie-toggle-position": d.position,
								"data-pie-toggle-name": d.name
							}),
								this.$pieToggles[b].addClass("open")
						}
						c.addClass("open")
					}
				}
			},
			isOpen: function(a) {
				return !!this.isRendered() && (a ? this.$pieToggles[a].hasClass("open") : this.$el.hasClass("open"))
			},
			isRendered: function() {
				return void 0 !== this.$box
			}
		}, {
			clear: function(a) {
				a.trigger("halo:create")
			}
		})
}(joint);