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
            this.initializeJsonview();  // 渲染右侧 jsonview 面板
            this.initializeNavigator();  // 渲染缩略图导航
            this.initializeToolbar();    // 渲染顶部工具栏
            // this.initializeKeyboardShortcuts();  // 快捷键命令定义
            this.initializeTooltips();
        },

        // Create a graph, paper and wrap the paper in a PaperScroller.
        initializePaper: function() {

            var graph = this.graph = new joint.dia.Graph;

            // // TODO 暂时屏蔽 Inspector
            graph.on('add', function(cell, collection, opt) {
                if (opt.stencil) this.createInspector(cell);
            }, this);

            this.commandManager = new joint.dia.CommandManager({ graph: graph });

            var paper = this.paper = new joint.dia.Paper({
                width: 1000,
                height: 1000,
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
                width: 240,
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

        // initializeKeyboardShortcuts: function() {
        //
        //     this.keyboard = new joint.ui.Keyboard();
        //     this.keyboard.on({
        //
        //         'ctrl+c': function() {
        //             // Copy all selected elements and their associated links.
        //             this.clipboard.copyElements(this.selection.collection, this.graph);
        //         },
        //
        //         'ctrl+v': function() {
        //
        //             var pastedCells = this.clipboard.pasteCells(this.graph, {
        //                 translate: { dx: 20, dy: 20 },
        //                 useLocalStorage: true
        //             });
        //
        //             var elements = _.filter(pastedCells, function(cell) {
        //                 return cell.isElement();
        //             });
        //
        //             // Make sure pasted elements get selected immediately. This makes the UX better as
        //             // the user can immediately manipulate the pasted elements.
        //             this.selection.collection.reset(elements);
        //         },
        //
        //         'ctrl+x shift+delete': function() {
        //             this.clipboard.cutElements(this.selection.collection, this.graph);
        //         },
        //
        //         'delete backspace': function(evt) {
        //             evt.preventDefault();
        //             this.graph.removeCells(this.selection.collection.toArray());
        //         },
        //
        //         'ctrl+z': function() {
        //             this.commandManager.undo();
        //             this.selection.cancelSelection();
        //         },
        //
        //         'ctrl+y': function() {
        //             this.commandManager.redo();
        //             this.selection.cancelSelection();
        //         },
        //
        //         'ctrl+a': function() {
        //             this.selection.collection.reset(this.graph.getElements());
        //         },
        //
        //         'ctrl+plus': function(evt) {
        //             evt.preventDefault();
        //             this.paperScroller.zoom(0.2, { max: 5, grid: 0.2 });
        //         },
        //
        //         'ctrl+minus': function(evt) {
        //             evt.preventDefault();
        //             this.paperScroller.zoom(-0.2, { min: 0.2, grid: 0.2 });
        //         },
        //
        //         'keydown:shift': function(evt) {
        //             this.paperScroller.setCursor('crosshair');
        //         },
        //
        //         'keyup:shift': function() {
        //             this.paperScroller.setCursor('grab');
        //         }
        //
        //     }, this);
        // },

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

        // TODO 暂时屏蔽右侧上部分 元素编辑器
        createInspector: function(cell) {
            var _inspector = joint.ui.Inspector.create('.inspector-container', _.extend({
                cell: cell
            }, App.config.inspector[cell.get('type')]));

            // _inspector.on('change:attrs/linkSource', function(value, el, opt) {
            //     if (opt.dry) {
            //         /* do something when in preview mode */
            //     } else {
            //         // TODO 加载对应子流程数据到当前画布
            //         console.log(value)
            //     }
            // })



            // _inspector.on({
            //     'change:attrs/linkSource': _.bind(function(_cell, _app, value, change, opt) {
            //         if (opt.dry) {
            //             /* do something when in preview mode */
            //         } else {
            //             // TODO 加载对应子流程数据到当前画布
            //             console.log(value)
            //             // _cell.graph.toJSON()
            //
            //         }
            //     }, _inspector, cell, this)
            // });

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

                    var _halo = new joint.ui.Halo({
                        cellView: elementView,
                        handles: App.config.halo.handles
                    }).render();

                    // _halo.on('action:view:pointerdown',_.bind(_halo.viewDialog, _halo, function(cell){
                    //
                    // }, elementView))

                    _halo.on('action:view:pointerdown', function (e) {
                        e.stopPropagation()

                        var flowName = this.options.cellView.model.attributes.attrs.linkSource,
                          flowJson = JSON.parse(App.config.flowList[flowName]);
                        var __graph = new joint.dia.Graph;
                        var __paper = new joint.dia.Paper({ width: 400, height: 300, model: __graph, gridSize: 1 });

                        var paperScroller = new joint.ui.PaperScroller({
                            paper: __paper
                        });

                        (new joint.ui.Dialog({
                            width: 500,
                            draggable: true,
                            title: flowName,
                            content: paperScroller.render().el
                        })).open();

                        __graph.fromJSON(flowJson)

                        // joint.layout.DirectedGraph.layout(__graph, {
                        //     nodeSep: 50,
                        //     edgeSep: 80,
                        //     rankDir: "LR"
                        // });
                        __graph.resizeCells(__graph.getCells())
                        __paper.scaleContentToFit({ padding: 10})


                    })

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

        /**
         * @name initializeJsonview
         * @desc 渲染右侧datajson面板
         */
        initializeJsonview: function () {
            var jsonview = this.jsonview = new joint.ui.Jsonview({
                groups: App.config.jsonview.groups,
                tools: App.config.jsonview.tools,
                references: {
                    paperScroller: this.paperScroller,
                    commandManager: this.commandManager
                }
            });
            jsonview.on({
                'copy:pointerclick': _.bind(jsonview.copyToClipboard, jsonview),
                'clearjson:pointerclick': _.bind(jsonview.clear, jsonview),
                'render:pointerclick': _.bind(jsonview.fromJSON, jsonview, this.graph)
            });

            this.$('.jsonview-container').append(jsonview.el);
            jsonview.render();
        },

        // 渲染缩略图导航
        initializeNavigator: function() {

            var navigator = this.navigator = new joint.ui.Navigator({
                width: 240,
                height: 120,
                paperScroller: this.paperScroller,
                zoom: false,
                paperOptions: {
                    elementView: joint.shapes.csf.NavigatorElementView,
                    linkView: joint.shapes.csf.NavigatorLinkView
                }
            });

            this.$('.navigator-container').append(navigator.el);
            navigator.render();
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
                // 'svg:pointerclick': _.bind(this.openAsSVG, this),
                // 'png:pointerclick': _.bind(this.openAsPNG, this),
                'json:pointerclick': _.bind(this.exportJson, this),
                'cleargraph:pointerclick': _.bind(this.graph.clear, this.graph),
                'printpager:pointerclick': _.bind(this.paper.print, this.paper)
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

        exportJson: function () {
            this.jsonview.$codearea.val(JSON.stringify(this.graph.toJSON()))
        },

        // openAsSVG: function() {
        //
        //     var paper = this.paper;
        //     paper.hideTools().toSVG(function(svg) {
        //         new joint.ui.Lightbox({
        //             image: 'data:image/svg+xml,' + encodeURIComponent(svg),
        //             downloadable: true,
        //             fileName: 'Rappid'
        //         }).open();
        //         paper.showTools();
        //     }, {
        //         preserveDimensions: true,
        //         convertImagesToDataUris: true,
        //         useComputedStyles: false,
        //         stylesheet: this.exportStylesheet
        //     });
        // },

        // openAsPNG: function() {
        //
        //     var paper = this.paper;
        //     paper.hideTools().toPNG(function(dataURL) {
        //         new joint.ui.Lightbox({
        //             image: dataURL,
        //             downloadable: true,
        //             fileName: 'Rappid'
        //         }).open();
        //         paper.showTools();
        //     }, {
        //         padding: 10,
        //         useComputedStyles: false,
        //         stylesheet: this.exportStylesheet
        //     });
        // },

        onMousewheel: function(cellView, evt, x, y, delta) {

        //     if (this.keyboard.isActive('alt', evt)) {
        //         evt.preventDefault();
        //         this.paperScroller.zoom(delta * 0.2, { min: 0.2, max: 5, grid: 0.2, ox: x, oy: y });
        //     }
        }

    });

})(_, joint);
