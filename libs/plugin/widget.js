/**
 * @name /libs/plugin/widget.js
 * @desc 小部件方法
 * Created by wendyliu on 2018/5/17.
 */
!function(joint, b) {
	joint.ui.Widget = joint.mvc.View.extend({
		className: "widget",
		references: [],
		constructor: function(b, c) {
			this.availableReferences = c || {},
				joint.mvc.View.prototype.constructor.call(this, b)
		},
		updateAttrs: function(b) {
			joint.util.setAttributesBySelector(this.$el, b)
		},
		bindEvents: function() {},
		validateReferences: function() {
			var a = this.references || []
				, b = [];
			return a.forEach(function(a) {
				void 0 === this.availableReferences[a] && b.push(a)
			}, this),
				b
		},
		getReference: function(a) {
			return this.availableReferences[a]
		},
		getReferences: function() {
			return this.availableReferences
		}
	}, {
		create: function(b, c) {
			var d = joint.util.camelCase(joint.util.isString(b) ? b : b.type);
			if (!joint.util.isFunction(joint.ui.widgets[d]))
				throw new Error('Widget: unable to find widget: "' + d + '"');
			var e = new joint.ui.widgets[d](b,c)
				, f = e.validateReferences(c);
			if (f.length > 0)
				throw new Error('Widget: "' + d + '" missing dependency: ' + f.join(", "));
			return e.render(),
				e.updateAttrs(b.attrs),
				e.bindEvents(),
				e.$el.attr("data-type", d),
			b.name && e.$el.attr("data-name", b.name),
				e
		}
	}),
		joint.ui.widgets = {
			checkbox: joint.ui.Widget.extend({
				tagName: "label",
				events: {
					"change .input": "onChange",
					mousedown: "pointerdown",
					touchstart: "pointerdown",
					mouseup: "pointerup",
					touchend: "pointerup"
				},
				init: function() {
					joint.util.bindAll(this, "pointerup")
				},
				render: function() {
					var a = this.options
						, c = b("<span/>").text(a.label || "");
					return this.$input = b("<input/>", {
						type: "checkbox",
						"class": "input"
					}).prop("checked", !!a.value),
						this.$span = b("<span/>"),
						this.$el.append([c, this.$input, this.$span]),
						this
				},
				onChange: function(a) {
					this.trigger("change", !!a.target.checked, a)
				},
				pointerdown: function(c) {
					c = joint.util.normalizeEvent(c),
						this.$el.addClass("is-in-action"),
						this.trigger("pointerdown", c),
						b(document).on("mouseup.checkbox touchend.checkbox", this.pointerup)
				},
				pointerup: function(c) {
					c = joint.util.normalizeEvent(c),
						b(document).off("mouseup.checkbox touchend.checkbox"),
						this.trigger("pointerdown", c),
						this.$el.removeClass("is-in-action")
				}
			}),
			toggle: joint.ui.Widget.extend({
				tagName: "label",
				events: {
					"change input.toggle": "onChange",
					mousedown: "pointerdown",
					touchstart: "pointerdown",
					mouseup: "pointerup",
					touchend: "pointerup"
				},
				init: function() {
					joint.util.bindAll(this, "pointerup")
				},
				render: function() {
					var a = this.options
						, c = b("<span/>").text(a.label || "")
						, d = b("<span><i/></span>")
						, e = b("<input/>", {
						type: "checkbox",
						"class": "toggle"
					}).prop("checked", !!a.value)
						, f = b("<div/>").addClass(a.type);
					return this.$el.append([c, f.append(e, d)]),
						this
				},
				onChange: function(a) {
					this.trigger("change", !!a.target.checked, a)
				},
				pointerdown: function(c) {
					c = joint.util.normalizeEvent(c),
						this.$el.addClass("is-in-action"),
						this.trigger("pointerdown", c),
						b(document).on("mouseup.toggle touchend.toggle", this.pointerup)
				},
				pointerup: function(c) {
					c = joint.util.normalizeEvent(c),
						b(document).off("mouseup.toggle touchend.toggle"),
						this.$el.removeClass("is-in-action"),
						this.trigger("pointerup", c)
				}
			}),
			separator: joint.ui.Widget.extend({
				render: function() {
					return this.options.width && this.$el.css({
						width: this.options.width
					}),
						this
				}
			}),
			label: joint.ui.Widget.extend({
				tagName: "label",
				render: function() {
					return this.$el.text(this.options.text),
						this
				}
			}),
			range: joint.ui.Widget.extend({
				events: {
					"change .input": "onChange",
					"input .input": "onChange"
				},
				render: function() {
					var a, c = this.options;
					return this.$output = b("<output/>").text(c.value),
						a = b("<span/>").addClass("units").text(c.unit),
						this.$input = b("<input/>", {
							type: "range",
							name: c.type,
							min: c.min,
							max: c.max,
							step: c.step,
							"class": "input"
						}).val(c.value),
						this.$el.append([this.$input, this.$output, a]),
						this
				},
				onChange: function(a) {
					var b = parseInt(this.$input.val(), 10);
					b !== this.currentValue && (this.currentValue = b,
						this.$output.text(b),
						this.trigger("change", b, a))
				},
				setValue: function(a) {
					this.$input.val(a),
						this.$input.trigger("change")
				}
			}),
			selectBox: joint.ui.Widget.extend({
				render: function() {
					var b = joint.util.omit(this.options, "type", "group", "index");
					return this.selectBox = new joint.ui.SelectBox(b),
						this.selectBox.render().$el.appendTo(this.el),
						this
				},
				bindEvents: function() {
					this.selectBox.on("all", this.trigger, this)
				}
			}),
			button: joint.ui.Widget.extend({
				events: {
					mousedown: "pointerdown",
					touchstart: "pointerdown",
					click: "pointerclick",
					touchend: "pointerclick"
				},
				tagName: "button",
				render: function() {
					var a = this.options;
					return this.$el.text(a.text),
						this
				},
				pointerclick: function(b) {
					b = joint.util.normalizeEvent(b),
						this.trigger("pointerclick", b)
				},
				pointerdown: function(b) {
					b = joint.util.normalizeEvent(b),
						this.trigger("pointerdown", b)
				}
			}),
			textButton: joint.ui.Widget.extend({
				events: {
					mousedown: "pointerdown",
					touchstart: "pointerdown",
					click: "pointerclick",
					touchend: "pointerclick"
				},
				tagName: "span",
				render: function() {
					var a = this.options;
					return this.$span = b("<span/>").text(a.text),
						this.$el.append([this.$span]),
						this
				},
				pointerclick: function(b) {
					b = joint.util.normalizeEvent(b),
						this.trigger("pointerclick", b)
				},
				pointerdown: function(b) {
					b = joint.util.normalizeEvent(b),
						this.trigger("pointerdown", b)
				}
			}),
			inputText: joint.ui.Widget.extend({
				events: {
					mousedown: "pointerdown",
					touchstart: "pointerdown",
					mouseup: "pointerup",
					touchend: "pointerup",
					click: "pointerclick",
					focusin: "pointerfocusin",
					focusout: "pointerfocusout"
				},
				tagName: "div",
				render: function() {
					var a = this.options;
					return this.$label = b("<label/>").text(a.label),
						this.$input = b("<div/>").addClass("input-wrapper").append(b("<input/>", {
							type: "text",
							"class": "input"
						}).val(a.value)),
						this.$el.append([this.$label, this.$input]),
						this
				},
				pointerclick: function(b) {
					b = joint.util.normalizeEvent(b),
						this.trigger("pointerclick", b)
				},
				pointerdown: function(b) {
					b = joint.util.normalizeEvent(b),
						this.trigger("pointerdown", b)
				},
				pointerup: function(b) {
					b = joint.util.normalizeEvent(b),
						this.trigger("pointerup", b)
				},
				pointerfocusin: function(b) {
					b = joint.util.normalizeEvent(b),
						this.$el.addClass("is-focused"),
						this.trigger("pointerfocusin", b)
				},
				pointerfocusout: function(b) {
					b = joint.util.normalizeEvent(b),
						this.$el.removeClass("is-focused"),
						this.trigger("pointerfocusout", b)
				}
			}),
			inputNumber: joint.ui.Widget.extend({
				events: {
					mousedown: "pointerdown",
					touchstart: "pointerdown",
					mouseup: "pointerup",
					touchend: "pointerup",
					click: "pointerclick",
					focusin: "pointerfocusin",
					focusout: "pointerfocusout"
				},
				tagName: "div",
				render: function() {
					var a = this.options;
					return this.$label = b("<label/>").text(a.label),
						this.$input = b("<div/>").addClass("input-wrapper").append(b("<input/>", {
							type: "number",
							"class": "number",
							max: a.max,
							min: a.min
						}).val(a.value)),
						this.$el.append([this.$label, this.$input]),
						this
				},
				pointerclick: function(b) {
					b = joint.util.normalizeEvent(b),
						this.trigger("pointerclick", b)
				},
				pointerdown: function(b) {
					b = joint.util.normalizeEvent(b),
						this.trigger("pointerdown", b)
				},
				pointerup: function(b) {
					b = joint.util.normalizeEvent(b),
						this.trigger("pointerup", b)
				},
				pointerfocusin: function(b) {
					b = joint.util.normalizeEvent(b),
						this.$el.addClass("is-focused"),
						this.trigger("pointerfocusin", b)
				},
				pointerfocusout: function(b) {
					b = joint.util.normalizeEvent(b),
						this.$el.removeClass("is-focused"),
						this.trigger("pointerfocusout", b)
				}
			}),
			textarea: joint.ui.Widget.extend({
				events: {
					mousedown: "pointerdown",
					touchstart: "pointerdown",
					mouseup: "pointerup",
					touchend: "pointerup",
					click: "pointerclick",
					focusin: "pointerfocusin",
					focusout: "pointerfocusout"
				},
				tagName: "div",
				render: function() {
					var a = this.options;
					return this.$label = b("<label/>").text(a.label),
						this.$input = b("<div/>").addClass("input-wrapper").append(b("<textarea/>", {
							"class": "textarea"
						}).text(a.value)),
						this.$el.append([this.$label, this.$input]),
						this
				},
				pointerclick: function(b) {
					b = joint.util.normalizeEvent(b),
						this.trigger("pointerclick", b)
				},
				pointerdown: function(b) {
					b = joint.util.normalizeEvent(b),
						this.trigger("pointerdown", b)
				},
				pointerup: function(b) {
					b = joint.util.normalizeEvent(b),
						this.trigger("pointerup", b)
				},
				pointerfocusin: function(b) {
					b = joint.util.normalizeEvent(b),
						this.$el.addClass("is-focused"),
						this.trigger("pointerfocusin", b)
				},
				pointerfocusout: function(b) {
					b = joint.util.normalizeEvent(b),
						this.$el.removeClass("is-focused"),
						this.trigger("pointerfocusout", b)
				}
			}),
			codearea: joint.ui.Widget.extend({
				events: {
					mousedown: "pointerdown",
					touchstart: "pointerdown",
					mouseup: "pointerup",
					touchend: "pointerup",
					click: "pointerclick",
					focusin: "pointerfocusin",
					focusout: "pointerfocusout"
				},
				tagName: "div",
				render: function() {
					var a = this.options;
					return this.$input = b("<textarea/>").addClass("codearea"),
						this.$el.append([this.$input]),
						this
				},
				pointerclick: function(b) {
					b = joint.util.normalizeEvent(b),
						this.trigger("pointerclick", b)
				},
				pointerdown: function(b) {
					b = joint.util.normalizeEvent(b),
						this.trigger("pointerdown", b)
				},
				pointerup: function(b) {
					b = joint.util.normalizeEvent(b),
						this.trigger("pointerup", b)
				},
				pointerfocusin: function(b) {
					b = joint.util.normalizeEvent(b),
						this.$el.addClass("is-focused"),
						this.trigger("pointerfocusin", b)
				},
				pointerfocusout: function(b) {
					b = joint.util.normalizeEvent(b),
						this.$el.removeClass("is-focused"),
						this.trigger("pointerfocusout", b)
				}
			}),
			selectButtonGroup: joint.ui.Widget.extend({
				render: function() {
					var b = joint.util.omit(this.options, "type", "group", "index");
					return this.selectButtonGroup = new joint.ui.SelectButtonGroup(b),
						this.selectButtonGroup.render().$el.appendTo(this.el),
						this
				},
				bindEvents: function() {
					this.selectButtonGroup.on("all", this.trigger, this)
				}
			})
		},
		joint.ui.widgets.zoomIn = joint.ui.widgets.button.extend({
			references: ["paperScroller"],
			options: {
				min: .2,
				max: 5,
				step: .2
			},
			pointerdown: function(b) {
				var c = this.options;
				this.getReferences().paperScroller.zoom(c.step, {
					max: c.max,
					grid: c.step
				}),
					joint.ui.widgets.button.prototype.pointerdown.call(this, b)
			}
		}),
		joint.ui.widgets.zoomOut = joint.ui.widgets.button.extend({
			references: ["paperScroller"],
			options: {
				min: .2,
				max: 5,
				step: .2
			},
			pointerdown: function(b) {
				var c = this.options;
				this.getReferences().paperScroller.zoom(-c.step, {
					min: c.min,
					grid: c.step
				}),
					joint.ui.widgets.button.prototype.pointerdown.call(this, b)
			}
		}),
		joint.ui.widgets.zoomToFit = joint.ui.widgets.button.extend({
			references: ["paperScroller"],
			options: {
				min: .2,
				max: 5,
				step: .2
			},
			pointerdown: function(b) {
				var c = this.options;
				this.getReferences().paperScroller.zoomToFit({
					padding: 20,
					scaleGrid: c.step,
					minScale: c.min,
					maxScale: c.max
				}),
					joint.ui.widgets.button.prototype.pointerdown.call(this, b)
			}
		}),
		joint.ui.widgets.zoomSlider = joint.ui.widgets.range.extend({
			references: ["paperScroller"],
			options: {
				min: 20,
				max: 500,
				step: 20,
				value: 100,
				unit: " %"
			},
			bindEvents: function() {
				this.on("change", function(a) {
					this.getReferences().paperScroller.zoom(a / 100, {
						absolute: !0,
						grid: this.options.step / 100
					})
				}, this),
					this.getReferences().paperScroller.options.paper.on("scale", function(a) {
						this.setValue(Math.floor(100 * a))
					}, this)
			}
		}),
		joint.ui.widgets.undo = joint.ui.widgets.button.extend({
			references: ["commandManager"],
			pointerclick: function() {
				this.getReferences().commandManager.undo()
			}
		}),
		joint.ui.widgets.redo = joint.ui.widgets.button.extend({
			references: ["commandManager"],
			pointerclick: function() {
				this.getReferences().commandManager.redo()
			}
		}),
		joint.ui.widgets.fullscreen = joint.ui.widgets.button.extend({
			onRender: function() {
				var a = this.target = b(this.options.target)[0];
				a && !b.contains(window.top.document, a) && this.$el.hide()
			},
			pointerclick: function() {
				joint.util.toggleFullScreen(this.target)
			}
		})
}(joint, $);