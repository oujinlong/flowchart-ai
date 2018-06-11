/**
 * Created by wendyliu on 2018/5/28.
 */
var App = window.App || {};

(function(_, joint) {

	'use strict';

	App.MainView = joint.mvc.View.extend({

		className: 'app',

		events: {
			'focus input[type="range"]': 'removeTargetFocus',
			'mousedown': 'removeFocus',
			'touchstart': 'removeFocus'
		},

		removeTargetFocus: function(evt) {
			evt.target.blur();
		},

		removeFocus: function() {
			document.activeElement.blur();
			window.getSelection().removeAllRanges();
		},

		init: function() {

			this.initializePaper(); //定义画布
			this.initializeStencil();   // 左侧菜单元素栏
			this.initializeSelection();
			this.initializeToolsAndInspector();
			this.initializeToolbar();    // 渲染顶部工具栏
			this.initializeTooltips();
		},

		// Create a graph, paper and wrap the paper in a PaperScroller.
		initializePaper: function() {

			var graph = this.graph = new joint.dia.Graph;

			graph.on('add', function(cell, collection, opt) {
				if (opt.stencil) this.createInspector(cell);
			}, this);

			this.commandManager = new joint.dia.CommandManager({ graph: graph });

			var paper = this.paper = new joint.dia.Paper({
				width: 2000,
				height: 1500,
				gridSize: 10,
				drawGrid: true,
				model: graph,
				defaultLink: new joint.shapes.csf.Link,
				defaultConnectionPoint: joint.shapes.csf.Link.connectionPoint,
				interactive: { linkMove: false }
			});

			paper.on('blank:mousewheel', _.partial(this.onMousewheel, null), this);
			paper.on('cell:mousewheel', this.onMousewheel, this);

			this.snaplines = new joint.ui.Snaplines({ paper: paper });

			var paperScroller = this.paperScroller = new joint.ui.PaperScroller({
				paper: paper,
				autoResizePaper: true,
				cursor: 'grab'
			});

			this.$('.paper-container').append(paperScroller.el);
			paperScroller.render().center();
		},

		// Create and populate stencil.
		// 渲染左侧元素列表栏
		initializeStencil: function() {

			var stencil = this.stencil = new joint.ui.Stencil({
				paper: this.paperScroller,
				snaplines: this.snaplines,
				scaleClones: true,
				width: 100,
				columns: 1,
				dropAnimation: true,
				groupsToggleButtons: false,
				// Use default Grid Layout
				layout: true,
				// Remove tooltip definition from clone
				dragStartClone: function(cell) {
					return cell.clone().removeAttr('root/dataTooltip');
				}
			});

			this.$('.stencil-container').append(stencil.el);
			stencil.render().load(App.config.stencil.shapes.csf);
		},


		initializeSelection: function() {

			this.clipboard = new joint.ui.Clipboard();
			this.selection = new joint.ui.Selection({
				paper: this.paper,
				handles: App.config.selection.handles
			});

			// Initiate selecting when the user grabs the blank area of the paper while the Shift key is pressed.
			// Otherwise, initiate paper pan.
			this.paper.on('blank:pointerdown', function(evt, x, y) {

				// if (this.keyboard.isActive('shift', evt)) {
				//     this.selection.startSelecting(evt);
				// } else {
				this.selection.cancelSelection();
				this.paperScroller.startPanning(evt, x, y);
				this.paper.removeTools();
				// }

			}, this);

		},

		createInspector: function(cell) {
			var _inspector = joint.ui.Inspector.create('.inspector-container', _.extend({
				cell: cell
			}, App.config.inspector[cell.get('type')]));

			// _inspector.on('change:labels', function(value, el) {
			// 	if (value === true) {
			//
			// 	} else {
			//
			// 	}
			// })

			return _inspector
		},

		initializeToolsAndInspector: function() {

			this.paper.on({

				'element:pointerup': function(elementView) {

					var element = elementView.model;

					if (this.selection.collection.contains(element)) return;

					new joint.ui.FreeTransform({
						cellView: elementView,
						allowRotation: false,
						preserveAspectRatio: !!element.get('preserveAspectRatio'),
						allowOrthogonalResize: element.get('allowOrthogonalResize') !== false
					}).render();

					new joint.ui.Halo({
						cellView: elementView,
						handles: App.config.halo.handles
					}).render();

					this.selection.collection.reset([]);
					this.selection.collection.add(element, { silent: true });

					this.paper.removeTools();

					this.createInspector(element);
				},

				'link:pointerup': function(linkView) {

					var link = linkView.model;

					var ns = joint.linkTools;
					var toolsView = new joint.dia.ToolsView({
						name: 'link-pointerdown',
						tools: [
							new ns.Vertices(),
							new ns.SourceAnchor(),
							new ns.TargetAnchor(),
							new ns.SourceArrowhead(),
							new ns.TargetArrowhead(),
							new ns.Segments,
							new ns.Boundary({ padding: 15 }),
							new ns.Remove({ offset: -20, distance: 40 })
						]
					});

					this.selection.collection.reset([]);
					this.selection.collection.add(link, { silent: true });

					var paper = this.paper;
					joint.ui.Halo.clear(paper);
					joint.ui.FreeTransform.clear(paper);
					paper.removeTools();

					linkView.addTools(toolsView);

					this.createInspector(link);
				},

				'link:mouseenter': function(linkView) {

					// Open tool only if there is none yet
					if (linkView.hasTools()) return;

					var ns = joint.linkTools;
					var toolsView = new joint.dia.ToolsView({
						name: 'link-hover',
						tools: [
							new ns.Vertices({ vertexAdding: false }),
							new ns.SourceArrowhead(),
							new ns.TargetArrowhead()
						]
					});

					linkView.addTools(toolsView);
				},

				'link:mouseleave': function(linkView) {
					// Remove only the hover tool, not the pointerdown tool
					if (linkView.hasTools('link-hover')) {
						linkView.removeTools();
					}
				}

			}, this);

			this.graph.on('change', function(cell, opt) {

				if (!cell.isLink() || !opt.inspector) return;

				var ns = joint.linkTools;
				var toolsView = new joint.dia.ToolsView({
					name: 'link-inspected',
					tools: [
						new ns.Boundary({ padding: 15 }),
					]
				});

				cell.findView(this.paper).addTools(toolsView);

			}, this)
		},


		// 渲染顶部工具栏
		initializeToolbar: function() {

			var toolbar = this.toolbar = new joint.ui.Toolbar({
				groups: App.config.toolbar.groups,
				tools: App.config.toolbar.tools,
				references: {
					paperScroller: this.paperScroller,
					commandManager: this.commandManager
				}
			});

			toolbar.on({
				'save:pointerclick': _.bind(this.saveFlow, this),
				'generate:pointerclick': _.bind(this.generate, this),
				'import:pointerclick': _.bind(this.importJson, this),
				'export:pointerclick': _.bind(this.exportJson, this),
				'clear-page:pointerclick': _.bind(this.graph.clear, this.graph),
				'exit:pointerclick': _.bind(this.exitFlow, this),
			});

			this.$('.toolbar-container').append(toolbar.el);
			toolbar.render();
		},

		initializeTooltips: function() {
			new joint.ui.Tooltip({
				rootTarget: document.body,
				target: '[data-tooltip]',
				direction: 'auto',
				padding: 10
			});
		},

		// backwards compatibility for older shapes
		exportStylesheet: '.scalable * { vector-effect: non-scaling-stroke }',
		exitFlow: function () {
			var dialog = new joint.ui.Dialog({
				width: 400,
				title: 'Confirm',
				content: '<b>Are you sure exit without save?</b>',
				buttons: [
					{ action: 'yes', content: 'Yes' },
					{ action: 'no', content: 'No' }
				]
			});
			dialog.on('action:yes', this.backToServiceQuery, dialog);
			dialog.on('action:no', dialog.close, dialog);
			dialog.open();
		},
		backToServiceQuery: function () {
			this.close()
			window.location.href = './serviceQuery.html'
		},
		saveFlow: function () {
			var flowJson = JSON.stringify(this.graph.toJSON())
			var dialog = new joint.ui.Dialog({
				type: 'success',
				width: 400,
				title: 'success',
				content: '<b>Save success!</b>',
				buttons: [
					{ action: 'back', content: 'Back to ServiceList', position: 'left' },
					{ action: 'leave', content: 'Continue Design', position: 'right' }
				]
			});
			dialog.on('action:back', this.backToServiceQuery, dialog);
			dialog.on('action:leave', dialog.close, dialog);
			dialog.open();
		},
		exportJson: function () {
			var flowJson = JSON.stringify(this.graph.toJSON())
			var paper = this.paper;
			paper.hideTools().toSVG(function(svg) {
				var _lightbox = new joint.ui.Lightbox({
					image: 'data:image/svg+xml,' + encodeURIComponent(svg),
					dataUri: 'data:application/json,' + encodeURIComponent(flowJson),
					downloadable: true,
					fileName: 'flowNodes',
					downloadAction: 'downloadDataUri'
				}).open();
				paper.showTools();
			}, {
				preserveDimensions: true,
				convertImagesToDataUris: true,
				useComputedStyles: false,
				stylesheet: this.exportStylesheet
			});
		},
		importJson: function () {
			var _import = this.toolbar.getWidgetByName('import'), _self = this;
			if(!_import.$file){
				_import.$file = $('<input type="file" style="display: none;"/>').appendTo(_import.$el.parent())
				_import.$file.bind('change',function(e){
					var reader = new FileReader()
					reader.onload = function(evt) {
						_.isObject(JSON.parse(evt.target.result)) && _self.graph.fromJSON(JSON.parse(evt.target.result))
					}
					reader.readAsBinaryString(e.target.files[0]);
					e.preventDefault();
					e.stopPropagation();
				})
			}
			_import.$file.trigger('click')


		},

		generate: function () {
			$('#generateCodeModal').modal('show')
			console.log('generate')
		},


		onMousewheel: function(cellView, evt, x, y, delta) {
			//     if (this.keyboard.isActive('alt', evt)) {
			//         evt.preventDefault();
			//         this.paperScroller.zoom(delta * 0.2, { min: 0.2, max: 5, grid: 0.2, ox: x, oy: y });
			//     }
		}

	});

})(_, joint);
