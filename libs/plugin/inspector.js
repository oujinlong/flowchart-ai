/**
 * @name /libs/plugin/inspector.js
 * @version v1.0.0
 * @desc 元素编辑器
 * Created by wendyliu on 2018/5/17.
 */
!function(joint, b) {
	"use strict";
	joint.ui.Inspector = joint.mvc.View.extend({
		className: "inspector",
		options: {
			cellView: void 0,
			cell: void 0,
			live: !0,
			validateInput: function(a, b, c) {
				return !a.validity || a.validity.valid
			},
			renderFieldContent: void 0,
			operators: {},
			multiOpenGroups: !0,
			stateKey: function(a) {
				return a.id
			}
		},
		events: {
			"change [data-attribute]:not([data-custom-field])": "onChangeInput",
			"click .group-label": "onGroupLabelClick",
			"click .btn-list-add": "addListItem",
			"click .btn-list-del": "deleteListItem",
			"click .btn-list-edit": "editListItem",
			"click input.textDialog": "showTextDialog",
			"mousedown .field": "pointerdown",
			"touchstart .field": "pointerdown",
			"focusin .field": "pointerfocusin",
			"focusout .field": "pointerfocusout"
		},
		HTMLEntities: {
			lt: "<",
			gt: ">",
			amp: "&",
			nbsp: " ",
			quot: '"',
			cent: "¢",
			pound: "£",
			euro: "€",
			yen: "¥",
			copy: "©",
			reg: "®"
		},
		init: function() {
			var c = this.options.groups = this.options.groups || {};
			joint.util.bindAll(this, "stopBatchCommand", "pointerup", "onContentEditableBlur", "replaceHTMLEntity"),
				this.widgets = {},
				this._attributeKeysInUse = [],
				this.flatAttributes = this.flattenInputs(this.options.inputs),
				this._when = {},
				this._bound = {};
			var d = Object.keys(this.flatAttributes).map(function(a) {
				var b = this.flatAttributes[a];
				if (b.when) {
					var c = {
						expression: b.when,
						path: a
					};
					this.extractExpressionPaths(c.expression).forEach(function(a) {
						(this._when[a] || (this._when[a] = [])).push(c)
					}, this)
				}
				return this.needsResolving(b) && (this._bound[a] = b.options),
					b.path = a,
					b
			}, this);
			for (var e in c) {
				var f = c[e];
				f && c.hasOwnProperty(e) && this.extractExpressionPaths(f.when).forEach(function(a) {
					this._when[a] || (this._when[a] = [])
				}, this)
			}
			var g = b.sortBy(d, "index");
			this.groupedFlatAttributes = b.sortBy(g, function(a) {
				var b = this.options.groups[a.group];
				return b && b.index || Number.MAX_VALUE
			}
				.bind(this)),
				this.listenTo(this.getModel(), "all", this.onCellChange, this)
		},
		cacheInputs: function() {
			var pathItemObj = {};
			Array.from(this.$("[data-attribute]")).forEach(function(item) {
				var $item = $(item), path = $item.attr("data-attribute");
				pathItemObj[path] = $item
			}, this),
				this._byPath = pathItemObj,
				this._attributeKeysInUse = this.getAttributeKeysInUse()
		},
		updateGroupsVisibility: function() {
			for (var a = this.$groups, b = 0, c = a.length; b < c; b++) {
				var d = $(a[b])
					, e = d.attr("data-name")
					, f = this.options.groups[e]
					, g = 0 === d.find("> .field:not(.hidden)").length;
				d.toggleClass("empty", g);
				var h = !(!f || !f.when || this.isExpressionValid(f.when));
				d.toggleClass("hidden", h)
			}
		},
		flattenInputs: function(b) {
			return joint.util.flattenObject(b, "/", function(a) {
				return "string" == typeof a.type
			})
		},
		getModel: function() {
			return this.options.cell || this.options.cellView.model
		},
		onCellChange: function(a, b, c, d) {
			if (d = d || {},
				d.inspector != this.cid)
				switch (a) {
					case "remove":
						this.remove();
						break;
					case "change:position":
						this.updateInputPosition();
						break;
					case "change:size":
						this.updateInputSize();
						break;
					case "change:angle":
						this.updateInputAngle();
						break;
					case "change:source":
					case "change:target":
					case "change:vertices":
						break;
					default:
						var e = "change:";
						if (a.slice(0, e.length) === e) {
							var f = a.slice(e.length);
							this._attributeKeysInUse.includes(f) && this.render({
								refresh: !0
							})
						}
				}
		},
		render: function(a) {
			var b = a && a.refresh;
			b && this.options.storeGroupsState && this.storeGroupsState(),
				this.$el.empty(),
				this.removeWidgets();
			var c, d, e = [];
			return this.groupedFlatAttributes.forEach(function(a) {
				if (c !== a.group) {
					var f = this.options.groups[a.group];
					d = this.renderGroup({
						name: a.group,
						label: f && f.label
					}),
					b || (f && f.closed ? this.closeGroup(d, {
						init: !0
					}) : this.openGroup(d, {
						init: !0
					})),
						e.push(d)
				}
				this.renderTemplate(d, a, a.path),
					c = a.group
			}, this),
				this.$document = $(this.el.ownerDocument),
				this.$groups = $(e),
				this.$el.append(e),
			b && this.options.restoreGroupsState && this.restoreGroupsState(),
				this.afterRender(),
				this
		},
		getAttributeKeysInUse: function() {
			var a = Object.keys(this._byPath).map(function(a) {
				return a.substring(0, a.indexOf("/")) || a
			}),
				c = b.toArray(this._bound),
				d = Object.keys(this._when);
			return b.uniq([].concat(a, c, d))
		},
		getCellAttributeValue: function(path, opt) {
			var cell = this.getModel(), e = joint.util.getByPath(cell.attributes, path, "/");
			if (opt = opt || this.flatAttributes[path], !opt)
				return e;
			if (void 0 === e && void 0 !== opt.defaultValue && (e = opt.defaultValue), opt.valueRegExp) {
				if (void 0 === e)
					throw new Error("Inspector: defaultValue must be present when valueRegExp is used.");
				var f = e.match(new RegExp(opt.valueRegExp));
				e = f && f[2]
			}
			return e
		},
		resolvableTypes: ["select", "select-box", "color-palette", "select-button-group"],
		needsResolving: function(b) {
			return !!b && this.resolvableTypes.indexOf(b.type) > -1 && joint.util.isString(b.options)
		},
		resolveBindings: function(opt) {
			if (this.resolvableTypes.indexOf(opt.type) > -1) {
				var d = opt.options || [];
				joint.util.isString(d) && (d = joint.util.getByPath(this.getModel().attributes, d, "/") || []),
				joint.util.isObject(d[0]) || (d = b.toArray(d).map(function(a) {
					return {
						value: a,
						content: a
					}
				})),
				opt.items = d
			}
		},
		updateBindings: function(b) {
			var c = Object.keys(this._bound).reduce(function(a, c) {
				var d = this._bound[c];
				return 0 === b.indexOf(d) && a.push(c),
					a
			}
				.bind(this), []);
			joint.util.isEmpty(c) || (c.forEach(function(a) {
				this.renderTemplate(null, this.flatAttributes[a], a, {
					replace: !0
				})
			}, this),
				this.afterRender())
		},
		renderFieldContent: function(c, d, e) {
			var f;
			if (joint.util.isFunction(this.options.renderFieldContent) && (f = this.options.renderFieldContent(c, d, e)))
				return $(f).attr({
					"data-attribute": d,
					"data-type": c.type,
					"data-custom-field": !0
				});
			var g, h, i, j;
			switch (c.type) {
				case "select-box":
					h = joint.util.toArray(c.items).findIndex(function(b) {
						var d = b.value
							, f = e;
						if (void 0 === d && b.content === f)
							return !0;
						var g = c.key;
						return g && (f = joint.util.getByPath(f, g, "/"),
							d = joint.util.getByPath(d, g, "/")),
							joint.util.isEqual(d, f)
					});
					var k = joint.util.assign({
						theme: this.options.theme
					}, joint.util.omit(c, "type", "group", "index", "selectBoxOptionsClass", "options"), {
						options: c.items,
						selected: h,
						selectBoxOptionsClass: [joint.util.addClassNamePrefix("inspector-select-box-options"), c.selectBoxOptionsClass].filter(function(a) {
							return !!a
						}).join(" ")
					});
					g = new joint.ui.SelectBox(k),
						g.$el.attr({
							"data-attribute": d,
							"data-type": c.type,
							"data-overwrite": c.overwrite
						}),
						g.render(),
						j = $("<label/>", {
							html: c.label || d
						}),
						f = $("<div/>").append(j, g.el),
						c.previewMode ? (i = g.selection,
							g.on("options:mouseout close", function() {
								g.selection = i,
									this.processInput(g.$el, {
										previewCancel: !0,
										dry: !0
									})
							}, this),
							g.on("option:hover", function(a, b) {
								g.selection = a,
									this.processInput(g.$el, {
										dry: !0
									})
							}, this),
							g.on("option:select", function(a, b) {
								var c = void 0 === i ? void 0 : g.getSelectionValue(i)
									, d = g.getSelectionValue(a)
									, e = c === d;
								this.processInput(g.$el, {
									previewDone: !0,
									dry: e,
									originalValue: c
								}),
									i = a
							}, this)) : g.on("option:select", function(a, b) {
							this.processInput(g.$el)
						}, this),
						this.widgets[d] = g;
					break;
				case "color-palette":
					h = joint.util.toArray(c.items).findIndex(function(a) {
						return a.value === e || void 0 === a.value && a.content === e
					});
					var l = joint.util.assign({
						theme: this.options.theme
					}, joint.util.omit(c, "type", "group", "index", "options"), {
						options: c.items,
						selected: h
					});
					g = new joint.ui.ColorPalette(l),
						g.$el.attr({
							"data-attribute": d,
							"data-type": c.type
						}),
						g.render(),
						j = $("<label/>", {
							html: c.label || d
						}),
						f = $("<div/>").append(j, g.el),
						c.previewMode ? (i = g.selection,
							g.on("options:mouseout close", function() {
								g.selection = i,
									this.processInput(g.$el, {
										previewCancel: !0,
										dry: !0
									})
							}, this),
							g.on("option:hover", function(a, b) {
								g.selection = a,
									this.processInput(g.$el, {
										dry: !0
									})
							}, this),
							g.on("option:select", function(a, b) {
								var c = void 0 === i ? void 0 : g.getSelectionValue(i)
									, d = g.getSelectionValue(a)
									, e = c === d;
								this.processInput(g.$el, {
									previewDone: !0,
									dry: e,
									originalValue: c
								}),
									i = a
							}, this)) : g.on("option:select", function(a, b) {
							this.processInput(g.$el)
						}, this),
						this.widgets[d] = g;
					break;
				case "select-button-group":
					c.multi ? (h = [],
						joint.util.toArray(c.items).forEach(function(b, d) {
							var f = void 0 === b.value ? b.content : b.value
								, g = c.key;
							g && (f = joint.util.getByPath(f, g, "/"));
							var i = joint.util.toArray(e).find(function(b) {
								return g && (b = joint.util.getByPath(b, g, "/")),
									joint.util.isEqual(f, b)
							});
							i && h.push(d)
						})) : h = joint.util.toArray(c.items).findIndex(function(b) {
						var d = b.value
							, f = e;
						if (void 0 === d && b.content === f)
							return !0;
						var g = c.key;
						return g && (f = joint.util.getByPath(f, g, "/"),
							d = joint.util.getByPath(d, g, "/")),
							joint.util.isEqual(d, f)
					});
					var m = joint.util.assign({
						theme: this.options.theme
					}, joint.util.omit(c, "type", "group", "index", "options"), {
						options: c.items,
						selected: h
					});
					g = new joint.ui.SelectButtonGroup(m),
						g.$el.attr({
							"data-attribute": d,
							"data-type": c.type,
							"data-overwrite": c.overwrite
						}),
						g.render(),
						j = $("<label/>", {
							html: c.label || d
						}),
						f = $("<div/>").append(j, g.el),
						c.previewMode ? (i = g.selection,
							g.on("mouseout", function() {
								g.selection = i,
									this.processInput(g.$el, {
										previewCancel: !0,
										dry: !0
									})
							}, this),
							g.on("option:hover", function(a, d) {
								c.multi ? g.selection = b.uniq(g.selection.concat([a])) : g.selection = a,
									this.processInput(g.$el, {
										dry: !0
									})
							}, this),
							g.on("option:select", function(b, c) {
								var d = void 0 === i ? void 0 : g.getSelectionValue(i)
									, e = g.getSelectionValue(b)
									, f = joint.util.isEqual(d, e);
								this.processInput(g.$el, {
									previewDone: !0,
									dry: f,
									originalValue: d
								}),
									i = b
							}, this)) : g.on("option:select", function(a, b) {
							this.processInput(g.$el)
						}, this),
						this.widgets[d] = g;
					break;
				default:
					f = this.renderOwnFieldContent({
						options: c,
						type: c.type,
						overwrite: c.overwrite,
						label: c.label || d,
						attribute: d,
						value: e
					})
			}
			return f
		},
		renderGroup: function(a) {
			a = a || {};
			var b = $("<div/>").addClass("group").attr("data-name", a.name)
				, c = $("<h3/>").addClass("group-label").text(a.label || a.name);
			return b.append(c)
		},
		renderOwnFieldContent: function(b) {
			var c, d, e, f, g, h, i, j;
			switch (j = $("<label/>").text(b.label), b.type) {
				case "number":
					d = $("<input/>", {
						type: "number",
						min: b.options.min,
						max: b.options.max,
						step: b.options.step
					}).val(b.value),
						c = [j, $("<div/>").addClass("input-wrapper").append(d)];
					break;
				case "range":
					j.addClass("with-output"),
						f = $("<output/>").text(b.value),
						g = $("<span/>").addClass("units").text(b.options.unit),
						d = $("<input/>", {
							type: "range",
							name: b.type,
							min: b.options.min,
							max: b.options.max,
							step: b.options.step
						}).val(b.value),
						d.on("change input", function() {
							f.text(d.val())
						}),
						c = [j, f, g, d];
					break;
				case "textarea":
					d = $("<textarea/>").text(b.value),
						c = [j, $("<div/>").addClass("input-wrapper").append(d)];
					break;
				case "content-editable":
					var k = joint.util.isString(b.value) ? b.value.replace(/\n/g, "<br>").replace(/ /g, "&nbsp;") : "";
					d = $("<div/>").prop("contenteditable", !0).css("display", "inline-block").html(k).on("blur", this.onContentEditableBlur),
						c = [j, $("<div/>").addClass("input-wrapper").append(d)];
					break;
				case "select":
					var l = b.options.items;
					d = $("<select/>"),
					b.options.multiple && d.prop({
						size: b.options.size || l.length,
						multiple: !0
					});
					var m = function(c) {
						return b.options.multiple ? joint.util.toArray(b.value).find(function(b) {
							return joint.util.isEqual(c, b)
						}) : joint.util.isEqual(c, b.value)
					};
					joint.util.toArray(l).forEach(function(a) {
						var b = $("<option/>", {
							value: a.value
						}).text(a.content);
						m(a.value) && b.attr("selected", "selected"),
							d.append(b)
					}),
						c = [j, d];
					break;
				case "toggle":
					h = $("<span><i/></span>"),
						d = $("<input/>", {
							type: "checkbox"
						}).prop("checked", !!b.value),
						e = $("<div/>").addClass(b.type),
						c = [j, e.append(d, h)];
					break;
				case "color":
					d = $("<input/>", {
						type: "color"
					}).val(b.value),
						c = [j, d];
					break;
				case "text":
					d = $("<input/>", {
						type: "text"
					}).val(b.value),
						c = [j, $("<div/>").addClass("input-wrapper").append(d)];
					// TODO temp 样式处理
					b.options.disabled === true && d.attr('disabled', true)
					b.options.border === false && d.css('border', 'none')

					break;
				case "textDialog":
					d = $("<input/>", {
						type: "text",
					}).val(b.value),
						c = [j, $("<div/>").addClass("input-wrapper").append(d)];
					break;
				case "object":
					d = $("<div/>"),
						i = $("<div/>").addClass("object-properties"),
						c = [j, d.append(i)];
					break;
				case "list":
					h = $("<button/>").addClass("btn-list-add").text(b.options.addButtonLabel || "+"),
						i = $("<div/>").addClass("list-items"),
						d = $("<div/>"),
						c = [j, d.append(h, i)]
					break
				case "serviceInput":
					h = $("<button/>").addClass("btn-list-add hide").text(b.options.addButtonLabel || "+"),
						i = $("<div/>").addClass("list-items"),
						d = $("<div/>"),
						c = [j, d.append(h, i)]
					break
				case "serviceOutput":
					h = $("<button/>").addClass("btn-list-add hide").text(b.options.addButtonLabel || "+"),
						i = $("<div/>").addClass("list-items"),
						d = $("<div/>"),
						c = [j, d.append(h, i)]
					break
			}
			return d && d.addClass(b.type).attr({
				"data-type": b.type,
				"data-attribute": b.attribute,
				"data-overwrite": b.overwrite
			}),
				$.fn.append.apply($("<div>"), c).children()
		},
		showTextDialog: function (e) {
			// TODO temp dialog
			var $table = $('<div class="content-container">'+
												'<div class="search-container">'+
													'<form class="form-inline">'+
														'<select class="form-control" placeholder="Domain" style="margin-top:-3px;margin-right:2px;">'+
															'<option selected="selected">All</option>'+
															'<option>Order</option>'+
															'<option>Product</option>'+
															'<option>Resource</option>'+
															'<option>Partner</option>'+
															'<option>CustomerService</option>'+
															'<option>PaaS</option>'+
														'</select>'+
														'<div class="form-group">'+
															'<label class="sr-only">Search Input</label>'+
															'<input type="text" class="form-control" placeholder="Service Name">'+
														'</div>'+
														'<button type="button" class="btn btn-custom">Search</button>'+
													'</form>'+
												'</div>'+
												'<table class="table table-striped service-table">'+
													'<thead>'+
														'<tr>'+
															'<th>Service Name</th>'+
															'<th>Domain</th>'+
															'<th>Interface</th>'+
															'<th>Desc</th>'+
															// '<th class="hide">Method</th>'+
														'</tr>'+
													'</thead>'+
													'<tbody>'+
													'</tbody>'+
												'</table>'+
											'</div>');
			var dataTable = _.slice(App.config.service.queryDialog, 0, 5), contentTable = []
			for(var i = 0; i < dataTable.length; i++){
				var tr = '<tr data='+ JSON.stringify(dataTable[i]) +'>'+
										'<td data-field="serviceName">'+ dataTable[i]['serviceName'] +'</td>'+
										'<td data-field="domain">'+ dataTable[i]['domain'] +'</td>'+
										'<td data-field="interface">'+ dataTable[i]['interface'] +'</td>'+
										'<td data-field="desc">'+ dataTable[i]['desc'] +'</td>'+
								'</tr>'
				contentTable.push(tr)
			}
			$table.find('tbody').html(contentTable.join(''))
			$table.find('tbody tr').on('click',function (e) {
				$(e.target).parent('tr').addClass('on').siblings('tr').removeClass('on')
			})

			// var contentTable = $('#serviceDialog').html()
			var dialog = new joint.ui.Dialog({
				width: 800,
				title: 'Choose Service',
				content: $table,
				buttons: [
					{ action: 'cancel', content: 'Cancel' },
					{ action: 'comfirm', content: 'Comfirm'}
				]
			}).open();
			dialog.on('action:cancel', dialog.close, dialog)
				.on('action:comfirm', this.confirmTextDialog, {_dialog: dialog, _inspector: this, _e: e});
		},
		confirmTextDialog: function () {
			var dataService = JSON.parse(this._dialog.$el.find('.table tbody tr.on').attr('data'))
			$(this._e.target).parents('.group:first').find('input').each(function(index, item){
				$(item).val(dataService[_.last($(item).attr('data-attribute').split('/'))])
			}, this)
			// 同时刷新 inputparams 和 outputparam 值
			var $addIn = $(this._e.target).parents('.group:first').siblings('[data-name=params]').find('[data-field="attrs/inputparams"] button.btn-list-add.hide'),
				$addOut = $(this._e.target).parents('.group:first').siblings('[data-name=params]').find('[data-field="attrs/outputparam"] button.btn-list-add.hide')

			dataService.inputparams.forEach(function(item){
				$addIn.trigger('click')
				$addIn.next('.list-items').find('.list-item:last input[data-attribute]').each(function(index, input){
					$(input).val(item[_.last($(input).attr('data-attribute').split('/'))])

				})
			}, this)

			$addOut.trigger('click')
			$addOut.next('.list-items').find('.list-item:last input[data-attribute]').each(function(index, input){
				$(input).val(dataService.outputparam[_.last($(input).attr('data-attribute').split('/'))]).trigger('change')
			})

			this._dialog.close()
			$(this._e.target).trigger('change')
		},
		onContentEditableBlur: function(a) {
			var b = $("<input/>", {
				disabled: !0,
				tabIndex: -1,
				style: {
					width: "1px",
					height: "1px",
					border: "none",
					margin: 0,
					padding: 0
				}
			}).appendTo(this.$el);
			b.focus(),
				b[0].setSelectionRange(0, 0),
				b.blur().remove(),
				$(a.target).trigger("change")
		},
		replaceHTMLEntity: function(a, b) {
			return this.HTMLEntities[b] || ""
		},
		renderObjectProperty: function(a) {
			a = a || {};
			var b = $("<div/>", {
				"data-property": a.property,
				"class": "object-property " + (a.visible === false ? "hide" : "")
			});
			return b
		},
		renderListItem: function(a) {
			a = a || {};
			var $delBtn, $editBtn,
				$listItem = $("<div/>", {
					"data-index": a.index,
					"class": "list-item"
				});
			if ($.inArray(a.options.type, ['serviceInput', 'serviceOutput']) === -1){
				$delBtn = $("<button/>").addClass("btn-list-del").text(a.options.removeButtonLabel || "-")
			}

			if (a.options.editButtonLabel) {
				$editBtn = $("<button/>").addClass("btn-list-edit").text(a.options.editButtonLabel)
			}
			// return $listItem.append($delBtn)
			return $listItem.append([$editBtn, $delBtn])
		},
		renderFieldContainer: function(a) {
			a = a || {};
			var b = $("<div/>", {
				"data-field": a.path,
				"class": "field " + a.type + "-field"
			});
			return b
		},
		renderTemplate: function(group, opt, path, extendObj) {
			var $group = group || this.$el, extendObj = extendObj || {};
			this.resolveBindings(opt);
			var $field = this.renderFieldContainer({
				path: path,
				type: opt.type
			});
			opt.when && !this.isExpressionValid(opt.when) && ($field.addClass("hidden"),
			opt.when.otherwise && opt.when.otherwise.unset && this.unsetProperty(path));
			var value = this.getCellAttributeValue(path, opt),
				$fieldContent = this.renderFieldContent(opt, path, value);
			if ($field.append($fieldContent), joint.util.setAttributesBySelector($field, opt.attrs), "list" === opt.type){
				joint.util.toArray(value).forEach(function(a, b) {
					var $group = this.renderListItem({
						index: b,
						options: opt
					});
					this.renderTemplate($group, opt.item, path + "/" + b),
						$fieldContent.children(".list-items").append($group)
				}, this);
			} else if ("object" === opt.type) {
				opt.flatAttributes = this.flattenInputs(opt.properties);
				var j = Object.keys(opt.flatAttributes).map(function(a) {
					var b = this[a];
					return b.path = a,
						b
				}, opt.flatAttributes);
				j = b.sortBy(j, function(a) {
					return a.index
				}),
					// 渲染 list -item -properties
					j.forEach(function(a) {
						var b = this.renderObjectProperty({
							property: a.path,
							visible: a.visible
						});
						this.renderTemplate(b, a, path + "/" + a.path),
							$fieldContent.children(".object-properties").append(b)
					}, this)
			}
			extendObj.replace ? $group.find('[data-field="' + path + '"]').replaceWith($field) : $group.append($field)
		},
		updateInputPosition: function() {
			var a = this._byPath["position/x"]
				, b = this._byPath["position/y"]
				, c = this.getModel().get("position");
			a && a.val(c.x),
			b && b.val(c.y)
		},
		updateInputSize: function() {
			var a = this._byPath["size/width"]
				, b = this._byPath["size/height"]
				, c = this.getModel().get("size");
			a && a.val(c.width),
			b && b.val(c.height)
		},
		updateInputAngle: function() {
			var a = this._byPath.angle
				, b = this.getModel().get("angle");
			a && a.val(b)
		},
		validateInput: function(a, b, c) {
			switch (a) {
				case "select-box":
				case "color-palette":
				case "select-button-group":
					return !0;
				default:
					return this.options.validateInput(b, c, a)
			}
		},
		onChangeInput: function(a) {
			a.target === a.currentTarget && this.processInput($(a.target))
		},
		processInput: function(a, b) {
			var c = a.attr("data-attribute")
				, d = a.attr("data-type");
			if (this.validateInput(d, a[0], c)) {
				this.options.live && this.updateCell(a, c, b);
				var e = this.getFieldValue(a[0], d)
					, f = this.parse(d, e, a[0]);
				this.trigger("change:" + c, f, a[0], b)
			}
		},
		updateDependants: function(b) {
			joint.util.toArray(this._when[b]).forEach(function(a) {
				var b = this._byPath[a.path]
					, c = b.closest(".field")
					, d = c.hasClass("hidden")
					, e = this.isExpressionValid(a.expression);
				c.toggleClass("hidden", !e),
				a.expression.otherwise && a.expression.otherwise.unset && this.options.live && (e ? d && this.updateCell(b, a.path) : (this.unsetProperty(a.path),
					this.renderTemplate(null, this.flatAttributes[a.path], a.path, {
						replace: !0
					}),
					this.afterRender()))
			}, this)
		},
		unsetProperty: function(b, c) {
			var d = this.getModel()
				, e = b.split("/")
				, f = e[0]
				, g = e.slice(1).join("/");
			if (c = c || {},
					c.inspector = this.cid,
					c["inspector_" + this.cid] = !0,
				"attrs" == b)
				d.removeAttr(g, c);
			else if (b == f)
				d.unset(f, c);
			else {
				var h = joint.util.merge({}, d.get(f))
					, i = joint.util.unsetByPath(h, g, "/");
				d.set(f, i, c)
			}
		},
		getOptions: function(a) {
			if (0 !== a.length) {
				var b = a.attr("data-attribute"), c = this.flatAttributes[b];
				if (!c) {
					var d = a.parent().closest("[data-attribute]")
						, e = d.attr("data-attribute");
					c = this.getOptions(d);
					var f = b.replace(e + "/", "")
						, g = c;
					c = g.item || g.flatAttributes[f],
						c.parent = g
				}
				return c
			}
		},
		markForRemoval: function(a, b) {
			var c = this.findParentListByPath(a);
			if (c) {
				var d = a.substr(c.length + 1)
					, e = parseInt(d, 10);
				b.remove[c] = b.remove[c] || [],
				Number.isFinite(e) && !b.remove[c].includes(e) && b.remove[c].push(e)
			}
		},
		markForUpdate: function(b, c, d, e) {
			if (e = e || this.findParentListByPath(b)) {
				var f = b.substr(e.length + 1);
				c.update[e] && joint.util.setByPath(c.update[e].value, f, d, "/")
			}
		},
		updateCell: function(b, c, d) {
			var cell = this.getModel(), pathItemObj = {};
			b ? pathItemObj[c] = b : pathItemObj = this._byPath, this.startBatchCommand();
			var g = {},
				h = {
					update: {},
					remove: {}
				};
			joint.util.forIn(pathItemObj, function(b, c) {
				if (!b.closest(".field").hasClass("hidden")) {
					var d, type = b.attr("data-type"), i = b.attr("data-overwrite"), isOverwrite = "false" !== i && void 0 !== i, k = b.hasClass("remove");
					switch (type) {
						case "list":
							k || (d = this.findParentListByPath(c),
								d ? (h.update[d] = h.update[d] || [],
									this.markForUpdate(c, h, [], d),
								isOverwrite && (h.update[d].overwrite = isOverwrite)) : h.update[c] = {
									value: [],
									overwrite: isOverwrite
								});
							break;
						case "serviceOutput":
							k || (d = this.findParentListByPath(c),
								d ? (h.update[d] = h.update[d] || [],
									this.markForUpdate(c, h, [], d),
								isOverwrite && (h.update[d].overwrite = isOverwrite)) : h.update[c] = {
									value: [],
									overwrite: isOverwrite
								});
							break;
						case "serviceInput":
							k || (d = this.findParentListByPath(c),
								d ? (h.update[d] = h.update[d] || [],
									this.markForUpdate(c, h, [], d),
								isOverwrite && (h.update[d].overwrite = isOverwrite)) : h.update[c] = {
									value: [],
									overwrite: isOverwrite
								});
							break;
						case "object":
							k && this.markForRemoval(c, h);
							break;
						default:
							if (!this.validateInput(type, b[0], c))
								return;
							var l = this.getFieldValue(b[0], type)
								, m = this.parse(type, l, b[0])
								, n = this.getOptions(b);
							if (n.valueRegExp) {
								var o = joint.util.getByPath(cell.attributes, c, "/") || n.defaultValue;
								m = o.replace(new RegExp(n.valueRegExp), "$1" + m + "$3")
							}
							k ? this.markForRemoval(c, h) : (d = this.findParentListByPath(c),
								d && h.update[d] ? this.markForUpdate(c, h, m) : g[c] = {
									value: m,
									overwrite: isOverwrite
								})
					}
				}
			}
				.bind(this)),
				joint.util.forIn(g, function(b, c) {
					this.setProperty(c, b.value, joint.util.assign({
						overwrite: b.overwrite
					}, d)),
						this.updateBindings(c),
						this.updateDependants(c)
				}
					.bind(this)),
				joint.util.forIn(h.remove, function(b, c) {
					this.removeProperty(c, b, joint.util.assign({
						rewrite: !0
					}, d))
				}
					.bind(this)),
				joint.util.forIn(h.update, function(b, c) {
					this.setProperty(c, this.compactDeep(b.value), joint.util.assign({
						rewrite: !0,
						overwrite: b.overwrite
					}, d)),
						this.updateBindings(c),
						this.updateDependants(c)
				}
					.bind(this)),
				this.updateGroupsVisibility(),
				this.stopBatchCommand()
		},
		compactDeep: function(a) {
			return Array.isArray(a) ? a.reduce(function(a, b) {
				return void 0 !== b && a.push(this.compactDeep(b)),
					a
			}
				.bind(this), []) : a
		},
		findParentListByPath: function(a) {
			for (var b, c, d = a.split("/"), e = 0, f = d[e], g = this.flatAttributes[f]; e < d.length - 1 && (!g || "list" !== g.type); )
				g && "object" === g.type && (b = g.properties),
					c = d[++e],
					f += "/" + c,
					g = b ? b[c] : this.flatAttributes[f];
			return f !== a ? f : null
		},
		getFieldValue: function(b, c) {
			if (joint.util.isFunction(this.options.getFieldValue)) {
				var d = this.options.getFieldValue(b, c);
				if (d)
					return d.value
			}
			var e = $(b);
			switch (c) {
				case "select-box":
				case "color-palette":
				case "select-button-group":
					var f = e.attr("data-attribute")
						, g = this.widgets[f];
					return g ? g.getSelectionValue() : joint.dia.Cell.prototype.prop.call(this.getModel(), f);
				case "content-editable":
					return e.html().replace(/<br(\s*)\/*>/gi, "\n").replace(/<[p|div]\s/gi, "\n$0").replace(/(<([^>]+)>)/gi, "").replace(/&(\w+);/gi, this.replaceHTMLEntity).replace(/\n$/, "");
				default:
					return e.val()
			}
		},
		removeProperty: function(b, c, d) {
			var e = this.getModel()
				, f = joint.dia.Cell.prototype.prop
				, g = f.call(e, b);
			if (g) {
				var h = g.reduce(function(a, b, d) {
					return c.includes(d) || a.push(b),
						a
				}, []);
				f.call(e, b, h, d)
			}
		},
		setProperty: function(b, c, d) {
			d = d || {},
				d.inspector = this.cid;
			var e = joint.dia.Cell.prototype.prop
				, f = this.getModel()
				, g = d.overwrite || !1;
			if (d.previewDone && e.call(f, b, d.originalValue, {
					rewrite: !0,
					silent: !0
				}),
				void 0 === c)
				joint.dia.Cell.prototype.removeProp.call(f, b, d);
			else {
				var h;
				if (joint.util.isObject(c) && !g) {
					var i = e.call(f, b)
						, j = Array.isArray(c) ? [] : {};
					h = joint.util.merge(j, i, c)
				} else
					h = joint.util.clone(c);
				g && (d.rewrite = !0),
					e.call(f, b, h, d)
			}
		},
		parse: function(a, b, c) {
			switch (a) {
				case "number":
				case "range":
					b = parseFloat(b);
					break;
				case "toggle":
					b = c.checked
			}
			return b
		},
		startBatchCommand: function() {
			this.inBatch || (this.inBatch = !0,
				this.getModel().startBatch("inspector", {
					cid: this.cid
				}))
		},
		stopBatchCommand: function() {
			this.inBatch && (this.getModel().stopBatch("inspector", {
				cid: this.cid
			}),
				this.inBatch = !1)
		},
		afterRender: function() {
			this.cacheInputs(),
				this.updateGroupsVisibility(),
				this.trigger("render")
		},
		addListItem: function(e) {
			var $addBtn = $(e.target),
				$list = $addBtn.closest("[data-attribute]"),
				path = $list.attr("data-attribute"),
				opt = this.getOptions($list),
				$lastItem = $list.children(".list-items").children(".list-item").last(),
				lastItemIndex = 0 === $lastItem.length ? -1 : parseInt($lastItem.attr("data-index"), 10),
				addItemIndex = lastItemIndex + 1,
				$addItem = this.renderListItem({
					index: addItemIndex,
					options: opt
				});
			var _path = path
			if(opt.type !== 'serviceOutput'){
				_path = path + "/" + addItemIndex
			}
			this.renderTemplate($addItem, opt.item, _path),
				$addBtn.parent().children(".list-items").append($addItem),
				$addItem.find("input:first").focus(),
				this.afterRender(),
			this.options.live && this.updateCell()
			// TODO dialog setvalue
			if($.inArray(this.getModel().attributes.type, ['csf.Start','csf.End']) !== -1){
				this.outputParamsDialog(e.target)
			}

		},
		editListItem: function (e) {
			var $btn = $(e.target),
				$list = $btn.closest("[data-attribute]"),
				path = $list.attr("data-attribute"),
				opt = this.getOptions($list)
			var nodeType = this.getModel().attributes.type
			// csf.Service 只可以修改 paramName
			var dataForm = this.getCellAttributeValue(path, opt)
			$.isArray(dataForm) && (dataForm = dataForm[0])
			var contentForm = '<div style="height:35px;">'+
					'<label class="col-sm-4 control-label required">Parameter Name:</label>'+
					'<div class="col-sm-6">'+
						'<input data-attribute="paramName" type="text" class="form-control" placeholder="Parameter Name" value="'+ dataForm.paramName +'">'+
					'</div>'+
				'</div>'+
				'<div style="height:35px;">'+
					'<label class="col-sm-4 control-label required">Parameter Type:</label>'+
					'<div class="col-sm-2" style="padding-right: 0;">'+
						'<select data-attribute="paramType" class="form-control" '+ (nodeType === "csf.Service" ? "disabled": "") +' placeholder="Parameter Type">'+
						(dataForm.paramType === "Simple" ? '<option selected="selected">Simple</option>' : '<option>Simple</option>')+
						(dataForm.paramType === "POJO" ? '<option selected="selected">POJO</option>' : '<option>POJO</option>')+
						'</select>'+
					'</div>'+
					'<div class="col-sm-4" data-source="Simple" style='+ (dataForm.paramType === "POJO" ? "display:none;" : "") +'>'+
						'<select data-attribute="paramTypeValue" class="form-control" '+ (nodeType === "csf.Service" ? "disabled": "") +' placeholder="Parameter Value">'+
						(dataForm.paramTypeValue === "java.lang.String" ? '<option selected="selected">java.lang.String</option>' : '<option>java.lang.String</option>')+
						(dataForm.paramTypeValue === "java.lang.Integer" ? '<option selected="selected">java.lang.Integer</option>' : '<option>java.lang.Integer</option>')+
						(dataForm.paramTypeValue === "java.lang.Long" ? '<option selected="selected">java.lang.Long</option>' : '<option>java.lang.Long</option>')+
						'</select>'+
					'</div>'+
					'<div class="col-sm-4" data-source="POJO" style='+ (dataForm.paramType === "Simple" ? "display:none;" : "") +'>'+
						'<select data-attribute="paramTypeValue" class="form-control" '+ (nodeType === "csf.Service" ? "disabled": "") +' placeholder="Parameter Value">'+
						(dataForm.paramTypeValue === "com.aii.crm.eshop.persistence.OseProfileDto" ? '<option selected="selected" >com.aii.crm.eshop.persistence.OseProfileDto</option>' : '<option>com.aii.crm.eshop.persistence.OseProfileDto</option>')+
						(dataForm.paramTypeValue === "com.aii.crm.eshop.persistence.PaymentMethodDTO" ? '<option selected="selected" >com.aii.crm.eshop.persistence.PaymentMethodDTO</option>' : '<option>com.aii.crm.eshop.persistence.PaymentMethodDTO</option>')+
						(dataForm.paramTypeValue === "com.aii.crm.eshop.persistence.PreQualificationDTO" ? '<option selected="selected" >com.aii.crm.eshop.persistence.PreQualificationDTO</option>' : '<option>com.aii.crm.eshop.persistence.PreQualificationDTO</option>')+
						(dataForm.paramTypeValue === "com.aii.crm.eshop.persistence.PreQualificationSimpleDTO" ? '<option selected="selected" >com.aii.crm.eshop.persistence.PreQualificationSimpleDTO</option>' : '<option>com.aii.crm.eshop.persistence.PreQualificationSimpleDTO</option>')+
						(dataForm.paramTypeValue === "com.aii.crm.eshop.persistence.ProdPriceDTO" ? '<option selected="selected" >com.aii.crm.eshop.persistence.ProdPriceDTO</option>' : '<option>com.aii.crm.eshop.persistence.ProdPriceDTO</option>')+
						(dataForm.paramTypeValue === "com.aii.crm.eshop.persistence.ProductOfferingSimpleDTO" ? '<option selected="selected" >com.aii.crm.eshop.persistence.ProductOfferingSimpleDTO</option>' : '<option>com.aii.crm.eshop.persistence.ProductOfferingSimpleDTO</option>')+
						(dataForm.paramTypeValue === "com.aii.crm.eshop.persistence.ShoppingCartDTO" ? '<option selected="selected" >com.aii.crm.eshop.persistence.ShoppingCartDTO</option>' : '<option>com.aii.crm.eshop.persistence.ShoppingCartDTO</option>')+
						(dataForm.paramTypeValue === "com.aii.crm.eshop.persistence.ShoppingCartDeliveryDTO" ? '<option selected="selected" >com.aii.crm.eshop.persistence.ShoppingCartDeliveryDTO</option>' : '<option>com.aii.crm.eshop.persistence.ShoppingCartDeliveryDTO</option>')+
						(dataForm.paramTypeValue === "com.aii.crm.eshop.persistence.ShoppingCartDeliverySimpleDTO" ? '<option selected="selected" >com.aii.crm.eshop.persistence.ShoppingCartDeliverySimpleDTO</option>' : '<option>com.aii.crm.eshop.persistence.ShoppingCartDeliverySimpleDTO</option>')+
						(dataForm.paramTypeValue === "com.aii.crm.eshop.persistence.ShoppingCartItemDTO" ? '<option selected="selected" >com.aii.crm.eshop.persistence.ShoppingCartItemDTO</option>' : '<option>com.aii.crm.eshop.persistence.ShoppingCartItemDTO</option>')+
						(dataForm.paramTypeValue === "com.aii.crm.eshop.persistence.ShoppingCartItemSimpleDTO" ? '<option selected="selected" >com.aii.crm.eshop.persistence.ShoppingCartItemSimpleDTO</option>' : '<option>com.aii.crm.eshop.persistence.ShoppingCartItemSimpleDTO</option>')+
						(dataForm.paramTypeValue === "com.aii.crm.eshop.persistence.ShoppingCartPayMethodDTO" ? '<option selected="selected" >com.aii.crm.eshop.persistence.ShoppingCartPayMethodDTO</option>' : '<option>com.aii.crm.eshop.persistence.ShoppingCartPayMethodDTO</option>')+
						(dataForm.paramTypeValue === "com.aii.crm.eshop.persistence.ShoppingCartPayMethodSimpleDTO" ? '<option selected="selected" >com.aii.crm.eshop.persistence.ShoppingCartPayMethodSimpleDTO</option>' : '<option>com.aii.crm.eshop.persistence.ShoppingCartPayMethodSimpleDTO</option>')+
						(dataForm.paramTypeValue === "com.aii.crm.eshop.persistence.ShoppingCartSimpleDTO" ? '<option selected="selected" >com.aii.crm.eshop.persistence.ShoppingCartSimpleDTO</option>' : '<option>com.aii.crm.eshop.persistence.ShoppingCartSimpleDTO</option>')+
						(dataForm.paramTypeValue === "com.aii.crm.eshop.persistence.SimpleDTO" ? '<option selected="selected" >com.aii.crm.eshop.persistence.SimpleDTO</option>' : '<option>com.aii.crm.eshop.persistence.SimpleDTO</option>')+
						(dataForm.paramTypeValue === "com.aii.crm.eshop.persistence.ViewBasketDTO" ? '<option selected="selected" >com.aii.crm.eshop.persistence.ViewBasketDTO</option>' : '<option>com.aii.crm.eshop.persistence.ViewBasketDTO</option>')+
						(dataForm.paramTypeValue === "com.aii.crm.eshop.persistence.ViewOrderFeeDTO" ? '<option selected="selected" >com.aii.crm.eshop.persistence.ViewOrderFeeDTO</option>' : '<option>com.aii.crm.eshop.persistence.ViewOrderFeeDTO</option>')+
						'</select>'+
					'</div>'+
				'</div>'

			var dialog = new joint.ui.Dialog({
				width: 580,
				title: 'Edit OutputParam',
				content: contentForm,
				// close: false,
				buttons: [
					{ action: 'cancel', content: 'Cancel' },
					{ action: 'comfirm', content: 'Comfirm'}
				]
			}).open();
			if (nodeType !== 'csf.Service') {
				dialog.$el.find('select[data-attribute="paramType"]').on('change',function(e){
					$(e.target).parent().nextAll('[data-source='+ $(e.target).val() +']').show().siblings('[data-source]').hide()
					e.preventDefault();
					e.stopPropagation();
				})
			}

			dialog.on('action:cancel', dialog.close, dialog)
				.on('action:comfirm', this.comfirmEditOutputParam, {_dialog: dialog, _inspector: this, _btn: $btn});
		},
		comfirmEditOutputParam: function () {
			var paramName = this._dialog.$el.find('input[data-attribute="paramName"]').val(),
				paramType = this._dialog.$el.find('select[data-attribute="paramType"]').val(),
				paramTypeValue = this._dialog.$el.find('select[data-attribute="paramTypeValue"]').val();
			if (this._inspector.getModel().attributes.type === 'csf.Service'){
				this._btn.next().find('[data-property=paramName] input').val(paramName)
			} else {
				// Start End
				this._btn.nextAll('[data-field]').find('[data-property=paramName] input').val(paramName)
				this._btn.nextAll('[data-field]').find('[data-property=paramType] input').val(paramType)
				this._btn.nextAll('[data-field]').find('[data-property=paramTypeValue] input').val(paramTypeValue)
			}

			this._inspector.afterRender()
			this._inspector.options.live && this._inspector.updateCell()
			this._dialog.close()
		},
		outputParamsDialog: function (btn, dataForm) {
			var $btn = $(btn);
			dataForm = dataForm || {paramName: '', paramType: '', paramTypeValue: ''}
				var contentForm = '<div style="height:35px;">'+
						'<label class="col-sm-4 control-label required">Parameter Name:</label>'+
						'<div class="col-sm-6">'+
							'<input data-attribute="paramName" type="text" class="form-control" placeholder="Parameter Name" value="'+dataForm.paramName+'">'+
						'</div>'+
					'</div>'+
					'<div style="height:35px;">'+
						'<label class="col-sm-4 control-label required">Parameter Type:</label>'+
						'<div class="col-sm-2" style="padding-right: 0;">'+
							'<select data-attribute="paramType" class="form-control" placeholder="Parameter Type" value="'+dataForm.paramType+'">'+
								'<option selected="selected">Simple</option>'+
								'<option>POJO</option>'+
							'</select>'+
						'</div>'+
						'<div class="col-sm-4" data-source="Simple">'+
							'<select data-attribute="paramTypeValue" class="form-control" placeholder="Parameter Value" value="'+ dataForm.paramTypeValue +'">'+
								'<option selected="selected">java.lang.String</option>'+
								'<option>java.lang.Integer</option>'+
								'<option>java.lang.Long</option>'+
							'</select>'+
						'</div>'+
						'<div class="col-sm-4" data-source="POJO" style="display:none;">'+
							'<select data-attribute="paramTypeValue" class="form-control" placeholder="Parameter Value" value="'+ dataForm.paramTypeValue +'">'+
								'<option selected="selected">com.aii.crm.eshop.persistence.OseProfileDto</option>'+
								'<option>com.aii.crm.eshop.persistence.PaymentMethodDTO</option>'+
								'<option>com.aii.crm.eshop.persistence.PreQualificationDTO</option>'+
								'<option>com.aii.crm.eshop.persistence.PreQualificationSimpleDTO</option>'+
								'<option>com.aii.crm.eshop.persistence.ProdPriceDTO</option>'+
								'<option>com.aii.crm.eshop.persistence.ProductOfferingSimpleDTO</option>'+
								'<option>com.aii.crm.eshop.persistence.ShoppingCartDTO</option>'+
								'<option>com.aii.crm.eshop.persistence.ShoppingCartDeliveryDTO</option>'+
								'<option>com.aii.crm.eshop.persistence.ShoppingCartDeliverySimpleDTO</option>'+
								'<option>com.aii.crm.eshop.persistence.ShoppingCartItemDTO</option>'+
								'<option>com.aii.crm.eshop.persistence.ShoppingCartItemSimpleDTO</option>'+
								'<option>com.aii.crm.eshop.persistence.ShoppingCartPayMethodDTO</option>'+
								'<option>com.aii.crm.eshop.persistence.ShoppingCartPayMethodSimpleDTO</option>'+
								'<option>com.aii.crm.eshop.persistence.ShoppingCartSimpleDTO</option>'+
								'<option>com.aii.crm.eshop.persistence.SimpleDTO</option>'+
								'<option>com.aii.crm.eshop.persistence.ViewBasketDTO</option>'+
								'<option>com.aii.crm.eshop.persistence.ViewOrderFeeDTO</option>'+
							'</select>'+
						'</div>'+
					'</div>'
				var dialog = new joint.ui.Dialog({
					width: 580,
					title: 'Add Parameter',
					content: contentForm,
					buttons: [
						{ action: 'cancel', content: 'Cancel' },
						{ action: 'comfirm', content: 'Comfirm'}
					]
				}).open();
				dialog.$el.find('select[data-attribute="paramType"]').on('change',function(e){
					$(e.target).parent().nextAll('[data-source='+ $(e.target).val() +']').show().siblings('[data-source]').hide()
					e.preventDefault();
					e.stopPropagation();
				})
				dialog.on('action:cancel', this.cancelListItemDialog, {_dialog: dialog, _inspector: this, _btn: $btn})
					.on('action:comfirm', this.comfirmListItemDialog, {_dialog: dialog, _inspector: this, _btn: $btn});
		},
		cancelListItemDialog: function () {
			if(this._btn.hasClass('btn-list-add')){
				this._btn.next('.list-items').children(':last').find('button.btn-list-del').click()
			}
			this._dialog.close()
		},
		comfirmListItemDialog: function () {
			var dialog = this._dialog
			Array.from(this._btn.next('.list-items').children(':last').find('input[data-attribute]')).forEach(function(item, index){
				$(item).val(dialog.$el.find('[data-attribute]:visible')[index].value)
			}, this)
			// BUG 触发更新
			this._inspector.afterRender()
			this._inspector.options.live && this._inspector.updateCell()
			this._dialog.close()
		},
		deleteListItem: function(a) {
			var b = $(a.target).closest(".list-item");
			b.hide(),
				b.addClass("remove"),
				b.find("[data-field]").each(function() {
					$(this).hide().addClass("remove")
				}),
				b.find("[data-attribute]").each(function() {
					$(this).hide().addClass("remove")
				}),
				this.afterRender(),
			this.options.live && this.updateCell()
		},
		bindDocumentEvents: function() {
			var a = this.getEventNamespace();
			this.$document.on("mouseup" + a + " touchend" + a, this.pointerup)
		},
		unbindDocumentEvents: function() {
			this.$document.off(this.getEventNamespace())
		},
		pointerdown: function(a) {
			this.bindDocumentEvents(),
				this.startBatchCommand(),
				this._$activeField = $(a.currentTarget).addClass("is-in-action")
		},
		pointerup: function() {
			this.unbindDocumentEvents(),
				this.stopBatchCommand(),
			this._$activeField && (this._$activeField.removeClass("is-in-action"),
				this._$activeField = null)
		},
		pointerfocusin: function(a) {
			a.stopPropagation(),
				$(a.currentTarget).addClass("is-focused")
		},
		pointerfocusout: function(a) {
			a.stopPropagation(),
				$(a.currentTarget).removeClass("is-focused")
		},
		onRemove: function() {
			this.unbindDocumentEvents(),
				this.removeWidgets(),
			this === this.constructor.instance && (this.constructor.instance = null)
		},
		removeWidgets: function() {
			var a = this.widgets;
			for (var b in a)
				a[b].remove();
			this.widgets = {}
		},
		onGroupLabelClick: function(a) {
			a.preventDefault(),
			this.options.multiOpenGroups || this.closeGroups();
			var b = $(a.target).closest(".group");
			this.toggleGroup(b)
		},
		toggleGroup: function(b) {
			var c = joint.util.isString(b) ? this.$('.group[data-name="' + b + '"]') : $(b);
			c.hasClass("closed") ? this.openGroup(c) : this.closeGroup(c)
		},
		closeGroup: function(b, c) {
			c = c || {};
			var d = joint.util.isString(b) ? this.$('.group[data-name="' + b + '"]') : $(b);
			!c.init && d.hasClass("closed") || (d.addClass("closed"),
				this.trigger("group:close", d.data("name"), c))
		},
		openGroup: function(b, c) {
			c = c || {};
			var d = joint.util.isString(b) ? this.$('.group[data-name="' + b + '"]') : $(b);
			(c.init || d.hasClass("closed")) && (d.removeClass("closed"),
				this.trigger("group:open", d.data("name"), c))
		},
		closeGroups: function() {
			for (var a = 0, b = this.$groups.length; a < b; a++)
				this.closeGroup(this.$groups[a])
		},
		openGroups: function() {
			for (var a = 0, b = this.$groups.length; a < b; a++)
				this.openGroup(this.$groups[a])
		},
		COMPOSITE_OPERATORS: ["not", "and", "or", "nor"],
		PRIMITIVE_OPERATORS: ["eq", "ne", "regex", "text", "lt", "lte", "gt", "gte", "in", "nin", "equal"],
		_isComposite: function(a) {
			return b.intersection(this.COMPOSITE_OPERATORS, Object.keys(a)).length > 0
		},
		_isPrimitive: function(a) {
			var c = Object.keys(this.options.operators).concat(this.PRIMITIVE_OPERATORS);
			return b.intersection(c, Object.keys(a)).length > 0
		},
		_evalCustomPrimitive: function(a, b, c) {
			return !!this.options.operators[a].apply(this, [this.getModel(), b].concat(c))
		},
		_evalPrimitive: function(b) {
			return Object.keys(b).reduce(function(c, d) {
				var e = b[d];
				return Object.keys(e).reduce(function(b, c) {
					var f = e[c]
						, g = this.getCellAttributeValue(c);
					if (joint.util.isFunction(this.options.operators[d]))
						return this._evalCustomPrimitive(d, g, f);
					switch (d) {
						case "eq":
							return f == g;
						case "ne":
							return f != g;
						case "regex":
							return new RegExp(f).test(g);
						case "text":
							return !f || joint.util.isString(g) && g.toLowerCase().indexOf(f) > -1;
						case "lt":
							return g < f;
						case "lte":
							return g <= f;
						case "gt":
							return g > f;
						case "gte":
							return g >= f;
						case "in":
							return Array.isArray(f) && f.includes(g);
						case "nin":
							return Array.isArray(f) && !f.includes(g);
						case "equal":
							return joint.util.isEqual(f, g);
						default:
							return b
					}
				}
					.bind(this), !1)
			}
				.bind(this), !1)
		},
		_evalExpression: function(a) {
			return this._isPrimitive(a) ? this._evalPrimitive(a) : Object.keys(a).reduce(function(c, d) {
				var e = a[d];
				if ("not" == d)
					return !this._evalExpression(e);
				var f = b.toArray(e).map(this._evalExpression, this);
				switch (d) {
					case "and":
						return f.every(function(a) {
							return !!a
						});
					case "or":
						return f.some(function(a) {
							return !!a
						});
					case "nor":
						return !f.some(function(a) {
							return !!a
						});
					default:
						return c
				}
			}
				.bind(this), !1)
		},
		_extractVariables: function(a) {
			return Array.isArray(a) || this._isComposite(a) ? b.toArray(a).reduce(function(a, b) {
				return a.concat(this._extractVariables(b))
			}
				.bind(this), []) : b.toArray(a).reduce(function(a, b) {
				return Object.keys(b)
			}, [])
		},
		isExpressionValid: function(b) {
			return b = joint.util.omit(b, "otherwise", "dependencies"),
				this._evalExpression(b)
		},
		extractExpressionPaths: function(a) {
			var c = a && a.dependencies || [];
			return a = b.omit(a, "otherwise", "dependencies"),
				b.uniq(this._extractVariables(a).concat(c))
		},
		getGroupsStateKey: function() {
			if (joint.util.isFunction(this.options.stateKey))
				return this.options.stateKey(this.getModel());
			throw new Error("Inspector: Option stateKey must be a function")
		},
		storeGroupsState: function() {
			var c = this.getGroupsStateKey()
				, d = b.toArray(this.$(".group.closed"));
			joint.ui.Inspector.groupStates[c] = d.map(function(a) {
				return $(a).attr("data-name")
			})
		},
		getGroupsState: function() {
			return joint.ui.Inspector.groupStates[this.getGroupsStateKey()]
		},
		restoreGroupsState: function() {
			var b = function(b, c) {
				joint.util.forIn(c.options.groups, function(a, c) {
					b(a, c) ? this.closeGroup(c) : this.openGroup(c)
				}
					.bind(c))
			}
				, c = this.getGroupsStateKey();
			joint.ui.Inspector.groupStates[c] ? b(function(b, d) {
				return joint.ui.Inspector.groupStates[c].includes(d)
			}, this) : b(function(a) {
				return a.closed
			}, this)
		}
	}, {
		groupStates: {},
		instance: null,
		/**
		 * @param selector 构造元素编辑器的页面dom选择器, eg: '.inspector-container'
		 * @param cellConf 当前cell对象以及该类型的自定义配置(cell + config/inspector)
		 */
		create: function(selector, cellConf) {
			cellConf = cellConf || {},
			joint.util.defaults(cellConf, {
				restoreGroupsState: !0,
				storeGroupsState: !0
			});
			var cell = cellConf.cell || cellConf.cellView.model, _instance = this.instance;
			// 语义化 return 逻辑
			if(_instance && _instance.options.cell === cell) {
				return _instance
			}else{
				if(_instance && _instance.el.parentNode) {
					if (cellConf.storeGroupsState) {
						_instance.storeGroupsState()
					}
					_instance.updateCell()
					_instance.remove()
				}
				_instance = new this(cellConf).render()
				this.instance = _instance
				$(selector).html(_instance.el)
				cellConf.restoreGroupsState && _instance.restoreGroupsState()
				return _instance
			}
		},
		close: function() {
			var a = this.instance;
			a && a.remove()
		}
	})
}(joint, joint.util);