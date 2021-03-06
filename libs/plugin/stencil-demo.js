/**
 * @name stencil.js
 * @desc 左侧元素菜单视图
 * Created by wendyliu on 2018/5/15.
 */
!function(joint, util) {
	var c = {
		options: function() {
			return {
				columnWidth: this.options.width / 2,
				columns: 1,
				rowHeight: 60,
				resizeToFit: !0,
				dy: 10,
				dx: 10
			}
		},
		layoutGroup: function(c, d) {
			var e = this.options.layout;
			if (d = d || {},
					!joint.layout.GridLayout)
				throw new Error("joint.ui.Stencil: joint.layout.GridLayout is not available.");
			joint.layout.GridLayout.layout(c, util.assign({}, e, d.layout))
		}
	};
	joint.ui.Stencil = joint.mvc.View.extend({
		className: "stencil",
		events: {
			"click .btn-expand": "openGroups",
			"click .btn-collapse": "closeGroups",
			"click .groups-toggle > .group-label": "openGroups",
			"click .group > .group-label": "onGroupLabelClick",
			"touchstart .group > .group-label": "onGroupLabelClick",
			"input .search": "onSearch",
			"focusin .search": "pointerFocusIn",
			"focusout .search": "pointerFocusOut"
		},
		documentEvents: {
			mousemove: "onDrag",
			touchmove: "onDrag",
			mouseup: "onDragEnd",
			touchend: "onDragEnd",
			touchcancel: "onDragEnd"
		},
		/**
		 * @options 配置项说明
		 * @name    DataType    Desc    Example
		 * @width   Number    面板宽度
		 * @height  Number    面板高度
		 * @label   String    面板标题
		 * @groups  Object    菜单内容配置项
		 *  groups: {
		 *			standard: { index: 1, label: 'Standard shapes' },
		 *			fsa: { index: 2, label: 'State machine' },
		 *			pn: { index: 3, label: 'Petri nets' },
		 *			erd: { index: 4, label: 'Entity-relationship' },
		 *		  uml: { index: 5, label: 'UML' },
		 *			org: { index: 6, label: 'ORG' }
		 *		}
		 * @groupsToggleButtons   Boolean   全局折叠
		 * @dropAnimation
		 * @search  Object    搜索
		 *  search: {
     *     '*': ['type', 'attrs/text/text', 'attrs/.label/text'],
     *     'org.Member': ['attrs/.rank/text', 'attrs/.name/text']
     *  }
		 * @layout
		 * @snaplines
		 * @scaleClones
		 * @dragStartClone
		 * @dragEndClone
		 * @layoutGroup
		 * @paperOptions
		 */
		options: {
			width: 200,
			height: 800,
			label: "Stencil",
			groups: null,
			groupsToggleButtons: !1,
			dropAnimation: !1,
			search: null,
			layout: null,
			snaplines: null,
			scaleClones: !1,
			dragStartClone: function(a) {
				return a.clone()
			},
			dragEndClone: function(a) {
				return a.clone()
			},
			layoutGroup: null,
			paperOptions: null
		},
		init: function() {
			this.setPaper(this.options.paperScroller || this.options.paper),
				this.graphs = {},
				this.papers = {},
				this.$groups = {},
				this.onSearch = util.debounce(this.onSearch, 200),
				this.delegateEvents(),
				this.initializeLayout()
		},
		initializeLayout: function() {
			var a = this.options.layout;
			a && (util.isFunction(a) ? this.layoutGroup = a : (this.layoutGroup = c.layoutGroup.bind(this),
				this.options.layout = util.isObject(a) ? a : {},
				util.defaults(this.options.layout, c.options.call(this))))
		},
		setPaper: function(b) {
			var c = this.options;
			if (b instanceof joint.dia.Paper)
				c.paperScroller = null,
					c.paper = b,
					c.graph = b.model;
			else {
				if (!("function" == typeof joint.ui.PaperScroller && b instanceof joint.ui.PaperScroller))
					throw new Error("Stencil: paper required");
				c.paperScroller = b,
					c.paper = b.options.paper,
					c.graph = b.options.paper.model
			}
		},
		renderContent: function() {
			return $("<div/>").addClass("content")
		},
		renderPaperDrag: function() {
			return $("<div/>").addClass("stencil-paper-drag")
		},
		renderSearch: function() {
			return $("<div/>").addClass("search-wrap").append($("<input/>", {
				type: "search",
				placeholder: "search"
			}).addClass("search"))
		},
		renderToggleAll: function() {
			return [$("<div/>").addClass("groups-toggle").append($("<label/>").addClass("group-label").html(this.options.label)).append($("<button/>", {
				text: "+"
			}).addClass("btn btn-expand")).append($("<button/>", {
				text: "-"
			}).addClass("btn btn-collapse"))]
		},
		renderElementsContainer: function() {
			return $("<div/>").addClass("elements")
		},
		renderGroup: function(a) {
			a = a || {};
			var b = $("<div/>").addClass("group").attr("data-name", a.name).toggleClass("closed", !!a.closed)
				, c = $("<h3/>").addClass("group-label").html(a.label || a.name)
				, d = this.renderElementsContainer();
			return b.append(c, d)
		},
		render: function() {
			var opts = this.options;
			this.$content = this.renderContent(),
				this.$paperDrag = this.renderPaperDrag(),
				this.$el.empty().append(this.$paperDrag, this.$content),
			opts.search && this.$el.addClass("searchable").prepend(this.renderSearch()),
			opts.groupsToggleButtons && this.$el.addClass("collapsible").prepend(this.renderToggleAll());
			var d = util.defaults({
				interactive: !1,
				preventDefaultBlankAction: !1
			}, opts.paperOptions)
				, e = Object.keys(opts.groups || {});
			if (e.length > 0) {
				var f = util.sortBy(e, function(a) {
					return this[a].index
				}
					.bind(opts.groups));
				f.forEach(function(e) {
					var f = this.options.groups[e]
						, g = this.$groups[e] = this.renderGroup({
						name: e,
						label: f.label,
						closed: f.closed
					}).appendTo(this.$content)
						, h = new joint.dia.Graph
						, i = util.assign({}, d, f.paperOptions, {
						el: g.find(".elements"),
						model: h,
						width: f.width || opts.width,
						height: f.height || opts.height
					})
						, j = new joint.dia.Paper(i);
					this.graphs[e] = h,
						this.papers[e] = j
				}, this)
			} else {
				var g = this.renderElementsContainer().appendTo(this.$content)
					, h = new joint.dia.Graph
					, i = new joint.dia.Paper(util.assign(d, {
					el: g,
					model: h,
					width: opts.width,
					height: opts.height
				}));
				this.graphs.__default__ = h,
					this.papers.__default__ = i
			}
			return this._graphDrag = new joint.dia.Graph,
				this._paperDrag = new joint.dia.Paper({
					el: this.$paperDrag,
					width: 1,
					height: 1,
					model: this._graphDrag
				}),
				this.startListening(),
				this
		},
		startListening: function() {
			this.stopListening(),
				util.forIn(this.papers, function(a) {
					this.listenTo(a, "cell:pointerdown", this.onDragStart)
				}
					.bind(this))
		},
		load: function(a, c) {
			Array.isArray(a) ? this.loadGroup(a, c) : util.isObject(a) && util.forIn(this.options.groups, function(b, c) {
				a[c] && this.loadGroup(a[c], c)
			}
				.bind(this))
		},
		loadGroup: function(a, b) {
			var c = this.getGraph(b);
			c.resetCells(a);
			var d = this.options.height;
			if (b && (d = this.getGroup(b).height),
				this.isLayoutEnabled() && this.layoutGroup(c, this.getGroup(b)),
					!d) {
				var e = this.getPaper(b);
				e.fitToContent({
					minWidth: e.options.width,
					gridHeight: 1,
					padding: this.options.paperPadding || 10
				})
			}
		},
		isLayoutEnabled: function() {
			return !!this.options.layout
		},
		getGraph: function(a) {
			var b = this.graphs[a || "__default__"];
			if (!b)
				throw new Error("Stencil: group " + a + " does not exist.");
			return b
		},
		getPaper: function(a) {
			return this.papers[a || "__default__"]
		},
		preparePaperForDragging: function(a, b, c) {
			var d = this._paperDrag
				, e = this._graphDrag;
			d.$el.addClass("dragging").appendTo(document.body);
			var f = this.options.dragStartClone(a.model).position(0, 0)
				, g = 5
				, h = this.options.snaplines;
			if (h && (g += h.options.distance),
				h || this.options.scaleClones) {
				var i = this.options.paper.scale();
				d.scale(i.sx, i.sy),
					g *= Math.max(i.sx, i.sy)
			} else
				d.scale(1, 1);
			this.clearClone(),
			this.options.dropAnimation && this._paperDrag.$el.stop(!0, !0),
				e.resetCells([f.position(0, 0)]);
			var j = f.findView(d);
			j.stopListening(),
				d.fitToContent({
					padding: g,
					allowNewOrigin: "any"
				});
			var k = j.getBBox()
				, l = this._cloneGeometryBBox = j.getBBox({
				useModelGeometry: !0
			});
			this._cloneViewDeltaOrigin = l.origin().difference(k.origin()),
				this._cloneBBox = f.getBBox(),
				this._clone = f,
				this._cloneView = j,
				this._paperDragPadding = g,
				this._paperDragInitialOffset = this.setPaperDragOffset(b, c)
		},
		setPaperDragOffset: function(a, b) {
			var c = document.body.scrollTop || document.documentElement.scrollTop
				, d = this._cloneViewDeltaOrigin
				, e = this._cloneGeometryBBox
				, f = this._paperDragPadding || 5
				, g = {
				left: a - d.x - e.width / 2 - f,
				top: b - d.y - e.height / 2 - f + c
			};
			return this._paperDrag.$el.offset(g),
				g
		},
		setCloneLocalPosition: function(a, b) {
			var c = this.options.paper.clientToLocalPoint({
				x: a,
				y: b
			})
				, d = this._cloneBBox;
			return c.x -= d.width / 2,
				c.y -= d.height / 2,
				this._clone.set("position", c),
				c
		},
		onDragStart: function(a, b) {
			b.preventDefault(),
				this.options.graph.startBatch("stencil-drag"),
				this.$el.addClass("dragging"),
				this.preparePaperForDragging(a, b.clientX, b.clientY);
			var c = this.setCloneLocalPosition(b.clientX, b.clientY)
				, d = this._cloneView
				, e = this.options.snaplines;
			e && (e.captureCursorOffset(this._cloneView, b, c.x, c.y),
				d.listenTo(this._clone, "change:position", this.onCloneSnapped.bind(this))),
				this.delegateDocumentEvents(null, b.data)
		},
		onCloneSnapped: function(a, b, c) {
			if (c.snapped) {
				var d = this._cloneBBox;
				a.position(d.x + c.tx, d.y + c.ty, {
					silent: !0
				}),
					this._cloneView.translate(),
					a.set("position", b, {
						silent: !0
					}),
					this._cloneSnapOffset = {
						x: c.tx,
						y: c.ty
					}
			} else
				this._cloneSnapOffset = null
		},
		onDrag: function(a) {
			var c = this._cloneView;
			if (c) {
				a.preventDefault(),
					a = util.normalizeEvent(a);
				var d = a.clientX
					, e = a.clientY;
				this.setPaperDragOffset(d, e);
				var f = this.setCloneLocalPosition(d, e)
					, g = this.options.paper.options.embeddingMode
					, h = this.options.snaplines
					, i = (g || h) && this.insideValidArea({
						x: d,
						y: e
					});
				if (g) {
					c.eventData(a, {
						paper: this.options.paper
					});
					var j = c.eventData(a);
					i ? c.processEmbedding(j) : c.clearEmbedding(j)
				}
				h && (i ? h.snapWhileMoving(c, a, f.x, f.y) : h.hide())
			}
		},
		onDragEnd: function(a) {
			var c = this._clone;
			if (c) {
				a = util.normalizeEvent(a);
				var d = this._cloneView
					, e = this._cloneBBox
					, f = this._cloneSnapOffset
					, g = e.x
					, h = e.y;
				f && (g += f.x,
					h += f.y),
					c.position(g, h, {
						silent: !0
					});
				var i = this.options.dragEndClone(c)
					, j = this.drop(i, {
					x: a.clientX,
					y: a.clientY
				});
				j ? this.onDropEnd(c) : this.onDropInvalid(a, i),
				this.options.paper.options.embeddingMode && d && (d.eventData(a, {
					model: i,
					paper: this.options.paper
				}),
					d.finalizeEmbedding(d.eventData(a))),
					this.options.graph.stopBatch("stencil-drag")
			}
		},
		onDropEnd: function(a) {
			this._clone === a && (this.clearClone(),
			this.$el.append(this._paperDrag.$el),
			this.$el.removeClass("dragging"),
			this._paperDrag.$el.removeClass("dragging"))
		},
		clearClone: function() {
			this._clone && (this._clone.remove(),
				this._clone = null,
				this._cloneView = null,
				this._cloneSnapOffset = null,
				this._paperDragInitialOffset = null,
				this._paperDragPadding = null)
		},
		onDropInvalid: function(a, c) {
			var d = this._clone;
			if (d) {
				a = util.normalizeEvent(a),
					c = c || this.options.dragEndClone(d),
					this.trigger("drop:invalid", a, c);
				var e = this.options.dropAnimation;
				if (e) {
					var f = util.isObject(e) ? e.duration : 150
						, g = util.isObject(e) ? e.easing : "swing";
					this._cloneView = null,
						this._paperDrag.$el.animate(this._paperDragInitialOffset, f, g, this.onDropEnd.bind(this, d))
				} else
					this.onDropEnd(d)
			}
		},
		insideValidArea: function(a) {
			var b, c = this.options.paper, d = this.options.paperScroller, e = this.getDropArea(this.$el);
			if (d)
				if (d.options.autoResizePaper)
					b = this.getDropArea(d.$el);
				else {
					var f = this.getDropArea(d.$el)
						, g = this.getDropArea(c.$el);
					b = g.intersect(f)
				}
			else
				b = this.getDropArea(c.$el);
			return !(!b || !b.containsPoint(a) || e.containsPoint(a))
		},
		getDropArea: function(a) {
			var b = a.offset()
				, c = document.body.scrollTop || document.documentElement.scrollTop
				, d = document.body.scrollLeft || document.documentElement.scrollLeft;
			return g.rect({
				x: b.left + parseInt(a.css("border-left-width"), 10) - d,
				y: b.top + parseInt(a.css("border-top-width"), 10) - c,
				width: a.innerWidth(),
				height: a.innerHeight()
			})
		},
		drop: function(a, b) {
			var c = this.options.paper
				, d = this.options.graph;
			if (this.insideValidArea(b)) {
				var e = c.clientToLocalPoint(b)
					, f = a.getBBox();
				e.x += f.x - f.width / 2,
					e.y += f.y - f.height / 2;
				var h = this._cloneSnapOffset ? 1 : c.options.gridSize;
				return a.set("position", {
					x: g.snapToGrid(e.x, h),
					y: g.snapToGrid(e.y, h)
				}),
					a.unset("z"),
					d.addCell(a, {
						stencil: this.cid
					}),
					!0
			}
			return !1
		},
		filter: function(c, d) {
			var e = c.toLowerCase() == c
				, f = Object.keys(this.papers).reduce(function(f, g) {
				var h = this.papers[g]
					, i = h.model.get("cells").filter(function(a) {
					var f = h.findViewByModel(a)
						, g = !c || Object.keys(d).some(function(f) {
							var g = d[f];
							if ("*" != f && a.get("type") != f)
								return !1;
							var h = g.some(function(d) {
								var f = util.getByPath(a.attributes, d, "/");
								return void 0 !== f && null !== f && (f = f.toString(),
									e && (f = f.toLowerCase()),
									f.indexOf(c) >= 0)
							});
							return h
						});
					return V(f.el).toggleClass("unmatched", !g),
						g
				}, this)
					, j = !util.isEmpty(i)
					, k = (new joint.dia.Graph).resetCells(i);
				return this.trigger("filter", k, g, c),
				this.isLayoutEnabled() && this.layoutGroup(k, this.getGroup(g)),
				this.$groups[g] && this.$groups[g].toggleClass("unmatched", !j),
					h.fitToContent({
						gridWidth: 1,
						gridHeight: 1,
						padding: this.options.paperPadding || 10
					}),
				f || j
			}
				.bind(this), !1);
			this.$el.toggleClass("not-found", !f)
		},
		getGroup: function(a) {
			return this.options.groups && this.options.groups[a] || {}
		},
		onSearch: function(a) {
			this.filter(a.target.value, this.options.search)
		},
		pointerFocusIn: function() {
			this.$el.addClass("is-focused")
		},
		pointerFocusOut: function() {
			this.$el.removeClass("is-focused")
		},
		onGroupLabelClick: function(a) {
			if ("touchstart" === a.type)
				this._groupLabelClicked = !0;
			else if (this._groupLabelClicked && "click" === a.type)
				return void (this._groupLabelClicked = !1);
			var b = $(a.target).closest(".group");
			this.toggleGroup(b.data("name"))
		},
		toggleGroup: function(a) {
			this.$('.group[data-name="' + a + '"]').toggleClass("closed")
		},
		closeGroup: function(a) {
			this.$('.group[data-name="' + a + '"]').addClass("closed")
		},
		openGroup: function(a) {
			this.$('.group[data-name="' + a + '"]').removeClass("closed")
		},
		isGroupOpen: function(a) {
			return !this.$('.group[data-name="' + a + '"]').hasClass("closed")
		},
		closeGroups: function() {
			this.$(".group").addClass("closed")
		},
		openGroups: function() {
			this.$(".group").removeClass("closed")
		},
		onRemove: function() {
			util.invoke(this.papers, "remove"),
			this.papers = {},
			this._paperDrag && (this._paperDrag.remove(),
			this._paperDrag = null),
			this.undelegateDocumentEvents()
		}
	})
}(joint, joint.util);