/**
 * Created by wendyliu on 2018/5/31.
 */
joint.ui.Lightbox = joint.ui.Dialog.extend({
	className: joint.ui.Dialog.prototype.className + " lightbox",
	options: joint.util.merge({}, joint.ui.Dialog.prototype.options, {
		closeButton: !0,
		modal: !0,
		downloadable: !1,
		downloadAction: "download",
		fileName: "Image",
		closeAnimation: {
			delay: 2e3,
			duration: 200,
			easing: "swing",
			properties: {
				opacity: 0
			}
		},
		top: 100,
		windowArea: .8,
		openAnimation: !1
	}),
	init: function() {
		if (joint.util.bindAll(this, "startCloseAnimation", "positionAndScale"),
				joint.ui.Dialog.prototype.init.apply(this, arguments),
			this.options.image && (this.$image = $("<img/>").on("load", this.positionAndScale),
				this.options.content = this.$image),
				this.options.downloadable) {
			var a = {
				action: this.options.downloadAction,
				content: "Download",
				position: "center"
			};
			this.buttons = this.buttons ? this.buttons.clone() : [],
				this.buttons.push(a)
		}
		// this.on("action:" + this.options.downloadAction, this.download),
		this.on("action:" + this.options.downloadAction, this[this.options.downloadAction]),
			$(window).on("resize", this.positionAndScale),
			this.on("close:animation:complete", this.remove, this)
	},
	open: function() {
		return joint.ui.Dialog.prototype.open.apply(this, arguments),
		this.$image && this.$image.attr("src", this.options.image),
			this.positionAndScale(),
			this.startOpenAnimation(),
			this
	},
	positionAndScale: function() {
		var a = this.$(".fg")
			, b = this.$(".body > img")
			, c = this.$(".titlebar")
			, d = this.$(".controls")
			, e = this.options.windowArea
			, f = window.innerWidth * e;
		this.$el.css("margin-top", this.options.top),
			c.css("width", f);
		var g = c.height()
			, h = d.height()
			, i = window.innerHeight * e - this.options.top - g - h;
		a.css({
			width: f,
			height: i
		});
		var j = b.width()
			, k = b.height();
		a.css({
			width: j,
			height: k
		}),
			c.css("width", "auto"),
		c.hasClass("empty") || d.css("top", c.outerHeight())
	},
	download: function() {
		joint.util.imageToDataUri(this.options.image, function(a, b) {
			joint.util.downloadDataUri(b, this.options.fileName)
		}
			.bind(this))
	},
	downloadDataUri: function () {
		joint.util.imageToDataUri(this.options.dataUri, function(a, b) {
			joint.util.downloadDataUri(b, this.options.fileName)
		}
			.bind(this))
	},
	close: function() {
		return this.options.closeAnimation ? this.startCloseAnimation() : joint.ui.Dialog.prototype.close.apply(this, arguments),
			this
	},
	onRemove: function() {
		joint.ui.Dialog.prototype.onRemove.apply(this, arguments),
			$(window).off("resize", this.positionAndScale),
		this.$image && this.$image.off("load", this.positionAndScale)
	},
	startCloseAnimation: function() {
		this.$el.animate(this.options.closeAnimation.properties, joint.util.assign({
			complete: function() {
				this.trigger("close:animation:complete")
			}
				.bind(this)
		}, this.options.closeAnimation))
	},
	startOpenAnimation: function() {
		this.$el.animate(joint.util.assign({}, this.options.openAnimation.properties, {
			height: this._foregroundHeight
		}), joint.util.assign({
			complete: function() {
				this.trigger("open:animation:complete")
			}
				.bind(this)
		}, this.options.openAnimation))
	}
});