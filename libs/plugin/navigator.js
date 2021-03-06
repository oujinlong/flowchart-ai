/**
 * Created by wendyliu on 2018/5/16.
 */
joint.ui.Navigator = joint.mvc.View.extend({
	className: "navigator",
	events: {
		mousedown: "startAction",
		touchstart: "startAction"
	},
	options: {
		paperConstructor: joint.dia.Paper,
		paperOptions: {},
		zoomOptions: null,
		zoom: {
			min: .5,
			max: 2
		},
		width: 300,
		height: 200,
		padding: 10
	},
	init: function() {
		this.options.zoomOptions ? this.options.zoom = joint.util.assign({}, this.options.zoom, this.options.zoomOptions) : this.options.zoom && (this.options.zoom = joint.util.defaults({}, this.options.zoom, this.constructor.prototype.options.zoom)),
			joint.util.bindAll(this, "updateCurrentView", "doAction", "stopAction", "scrollTo"),
			this.updateCurrentView = joint.util.debounce(this.updateCurrentView, 0);
		var a = this.options.paperScroller;
		a.$el.on("scroll.navigator", this.updateCurrentView);
		var b = this.sourcePaper = a.options.paper;
		this.listenTo(b, "resize", this.updatePaper);
		var c = this.targetPaper = new this.options.paperConstructor(joint.util.merge({
			model: b.model,
			interactive: !1
		}, this.options.paperOptions));
		c.$el.on({
			"mousedown.navigator": this.scrollTo,
			"touchstart.navigator": this.scrollTo
		}),
			$(document.body).on({
				"mousemove.navigator touchmove.navigator": this.doAction,
				"mouseup.navigator touchend.navigator": this.stopAction
			})
	},
	render: function() {
		this.targetPaper.$el.appendTo(this.el);
		var a = this.sourcePaper.model
			, b = a.getElements().concat(a.getLinks());
		if (b.forEach(this.targetPaper.renderView, this.targetPaper),
				this.$currentView = $("<div>").addClass("current-view"),
				this.options.zoom) {
			var c = $("<div>").addClass("current-view-control");
			this.$currentView.append(c)
		}
		return this.$el.append(this.$currentView).css({
			width: this.options.width,
			height: this.options.height,
			padding: this.options.padding
		}),
			this.updatePaper(this.sourcePaper.options.width, this.sourcePaper.options.height),
			this
	},
	updatePaper: function(a, b) {
		var c = this.sourcePaper.options.origin
			, d = this.sourcePaper.scale()
			, e = this.options.width - 2 * this.options.padding
			, f = this.options.height - 2 * this.options.padding;
		a /= d.sx,
			b /= d.sy;
		var g = this.ratio = Math.min(e / a, f / b)
			, h = c.x * g / d.sx
			, i = c.y * g / d.sy;
		a *= g,
			b *= g,
			this.targetPaper.setDimensions(a, b),
			this.targetPaper.setOrigin(h, i),
			this.targetPaper.scale(g, g),
			this.updateCurrentView()
	},
	updateCurrentView: function() {
		var a = this.ratio
			, b = this.sourcePaper.scale()
			, c = this.options.paperScroller
			, d = c.clientToLocalPoint(0, 0)
			, e = this.targetPaper.$el.position()
			, f = this.targetPaper.translate();
		f.ty = f.ty || 0,
			this.currentViewGeometry = {
				top: e.top + d.y * a + f.ty,
				left: e.left + d.x * a + f.tx,
				width: c.$el.innerWidth() * a / b.sx,
				height: c.$el.innerHeight() * a / b.sy
			},
			this.$currentView.css(this.currentViewGeometry)
	},
	startAction: function(a) {
		a = joint.util.normalizeEvent(a),
			this._action = $(a.target).hasClass("current-view-control") ? "zooming" : "panning",
			this._clientX = a.clientX,
			this._clientY = a.clientY
	},
	doAction: function(a) {
		if (this._action) {
			a = joint.util.normalizeEvent(a);
			var b = this.sourcePaper.scale()
				, c = (a.clientX - this._clientX) * b.sx
				, d = (a.clientY - this._clientY) * b.sy;
			switch (this._action) {
				case "panning":
					this.options.paperScroller.el.scrollLeft += c / this.ratio,
						this.options.paperScroller.el.scrollTop += d / this.ratio;
					break;
				case "zooming":
					var e = -c / this.currentViewGeometry.width;
					this.options.paperScroller.zoom(e, this.options.zoom)
			}
			this._clientX = a.clientX,
				this._clientY = a.clientY
		}
	},
	stopAction: function() {
		this._action = null
	},
	scrollTo: function(a) {
		a = joint.util.normalizeEvent(a);
		var b = this.targetPaper.translate();
		b.ty = b.ty || 0;
		var c, d;
		if (void 0 === a.offsetX) {
			var e = this.targetPaper.$el.offset();
			c = a.pageX - e.left,
				d = a.pageY - e.top
		} else
			c = a.offsetX,
				d = a.offsetY;
		var f = (c - b.tx) / this.ratio
			, g = (d - b.ty) / this.ratio;
		this.options.paperScroller.center(f, g)
	},
	onRemove: function() {
		this.targetPaper.$el.off(".navigator"),
			this.targetPaper.remove(),
			this.options.paperScroller.$el.off(".navigator"),
			$(document.body).off(".navigator")
	}
});