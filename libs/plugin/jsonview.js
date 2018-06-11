/**
 * @name jsonview.js
 * @version v1.0.0
 * @depend joint.2.1.2.js
 * @desc
 *  1. toolbar中生成的json数据将在该区域展示
 *  2. 支持该区域内容复制到剪切板
 *  3. 支持清除该区域内容
 *  4. 支持通过该区域的合法数据生成流程图到画布
 *
 * Created by wendyliu on 2018/5/16.
 */
!function(joint, _) {
	joint.ui.Jsonview = joint.mvc.View.extend({
		options: {},
		align: ["left", "right"],
		className: "jsonview",
		defaultGroup: "default",
		widgets: [],
		groupViews: [],
		init: function() {
			this.tools = joint.util.toArray(this.options.tools),
			this.groups = this.options.groups || {}
		},
		getWidgetByName: function(a) {
			return this.widgets.find(function(b) {
				return b.options.name === a
			})
		},
		getWidgets: function() {
			return this.widgets
		},
		groupsWithItemsPairs: function() {
			var b = {};
			this.tools.forEach(function(a) {
				var c = a.group || this.defaultGroup;
				b[c] = b[c] || {
						items: [],
						group: {}
					},
					b[c].items.push(a),
					b[c].group = this.groups[c] || {}
			}, this);
			for (var c = Object.keys(b), d = [], e = 0, f = c.length; e < f; e++) {
				var g = c[e];
				d.push([g, b[g]])
			}
			var h = joint.util.sortBy(d, function(a) {
				return a[1].group.index
			});
			return joint.util.sortBy(h, function(a) {
				return a[1].group.align || "left"
			})
		},
		render: function() {
			var a = this.groupsWithItemsPairs()
				, b = !1;

			var tt =  new joint.ui.widgets.codearea()
			tt.render()
			tt.$el.appendTo(this.$el)
			this.$codearea = tt.$el.children()

			return a.forEach(function(a) {
				var c = a[0]
					, d = a[1]
					, e = this.renderGroup(c, d);
				!b && d.group.align && "right" === d.group.align && (b = !0,
					e.addClass("group-first")),
					e.appendTo(this.el)
			}, this),
				this
		},
		renderGroup: function(a, b) {
			var d = new groupView({
				name: a,
				align: b.group.align,
				items: b.items,
				references: this.options.references
			});
			return this.groupViews.push(d),
				d.on("all", function() {
					this.trigger.apply(this, arguments)
				}
					.bind(this)),
				d.render(),
				this.widgets = this.widgets.concat(d.widgets),
				d.$el
		},
		onRemove: function() {
			joint.util.invoke(this.groupViews, "off"),
				joint.util.invoke(this.groupViews, "remove")
		},
		copyToClipboard: function () {
			var a = document.queryCommandSupported && document.queryCommandSupported("copy");
			this.$codearea.focus().select();
			a && document.execCommand("copy")
		},
		clear: function () {
			this.$codearea.val('')
		},
		fromJSON: function (graph) {
			// TODO 校验数据
			graph.fromJSON(JSON.parse(this.$codearea.val()));
		}
	});
	var groupView = joint.mvc.View.extend({
		className: "jsonview-group",
		init: function() {
			this.widgets = []
		},
		onRender: function() {
			this.$el.attr("data-group", this.options.name),
				this.$el.addClass(this.options.align),
				this.renderItems()
		},
		renderItems: function() {
			joint.util.toArray(this.options.items).forEach(function(a) {
				var b = this.createWidget(a);
				this.$el.append(b.$el)
			}, this)
		},
		createWidget: function(b) {
			var c = joint.ui.Widget.create(b, this.options.references);
			return c.on("all", function(a) {
				var c = Array.prototype.slice.call(arguments, 1);
				this.trigger.apply(this, [b.name + ":" + a].concat(c))
			}
				.bind(this)),
				this.widgets.push(c),
				c
		},
		onRemove: function() {
			joint.util.invoke(this.widgets, "off"),
				joint.util.invoke(this.widgets, "remove")
		}
	})
}(joint, _)
