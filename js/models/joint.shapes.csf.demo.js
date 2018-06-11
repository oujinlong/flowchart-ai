/**
 * Created by wendyliu on 2018/5/28.
 */
(function(joint, V) {

	'use strict';

	joint.shapes.standard.Circle.define('csf.Start', {
		attrs: {
			root: {
				magnet: false
			},
			'circle': {
				fill: '#FFFFFF',
				stroke: 'none',
				r: 30,
				cx: 30,
				cy: 30
			},
			'path': {
				fill: '#699CFF',
				stroke: '#699CFF'
			}
		}
	}, {
		markup: [
			'<g class="rotatable"><g class="scalable"><circle/>',
			'<path d="M 22 18 L 22 42 44 30 z"></path>',
			'</g></g>',
		].join('')
	});

	joint.shapes.standard.Circle.define('csf.End', {
		attrs: {
			root: {
				magnet: true
			},
			'circle': {
				fill: '#FFFFFF',
				stroke: 'none',
				r: 30,
				cx: 30,
				cy: 30
			},
			'rect': {
				fill: '#699CFF',
				stroke: '#699CFF'
			}
		}
	}, {
		markup: [
			'<g class="rotatable"><g class="scalable"><circle/>',
			'<rect width="20" height="20" x="20" y="20" rx="2" ry="2"></rect>',
			'</g></g>',
		].join('')
	});

	joint.shapes.basic.Generic.define('csf.Decision', {
		size: { width: 30, height: 30 },
		attrs: {
			root: {
				magnet: true
			},
			'rect': {
				fill: '#FFFFFF',
				stroke: 'none',
				width: 30,
				height: 30,
				rx: 4,
				ry: 4
			},
			'path': {
				fill: '#699CFF',
				stroke: 'none',
				'stroke-width': 1,
				d: 'M1468.20508,102.52259 L1467.67736,102.002627 L1459.03669,110.562774 C1458.45985,111.134196 1457.70783,111.418501 1456.9504,111.418501 C1456.19571,111.418501 1455.44105,111.134196 1454.86141,110.562774 C1454.28707,109.99677 1454,109.246701 1454,108.493856 C1454,107.749069 1454.28707,107.001776 1454.86141,106.432995 L1463.50198,97.8673975 L1462.98516,97.3528509 C1462.69529,97.4558685 1462.39729,97.51535 1462.09641,97.51535 C1461.48395,97.51535 1460.86876,97.2933356 1460.38757,96.8356298 L1460.34094,96.7977134 L1459.52349,95.9879939 C1459.04213,95.5059472 1458.80151,94.8778205 1458.80151,94.244074 C1458.80151,93.6429628 1459.03132,93.0309168 1459.47974,92.5515106 L1459.52069,92.5109535 L1464.35788,87.7177043 C1464.83911,87.2410742 1465.48165,87 1466.11602,87 C1466.75305,87 1467.38749,87.2410742 1467.86872,87.7177043 L1468.68627,88.5246477 C1469.1703,89.0094028 1469.41642,89.6376988 1469.41642,90.2658593 C1469.41642,90.5638082 1469.36449,90.8643638 1469.24964,91.1460627 L1474.46401,96.3156666 C1474.75122,96.2074016 1475.05192,96.1559435 1475.35277,96.1559435 C1475.99527,96.1559435 1476.62971,96.3942417 1477.1109,96.8681974 L1477.92849,97.6751408 L1477.92586,97.6859402 L1477.92306,97.6859402 C1478.40425,98.1625703 1478.64486,98.7854158 1478.64486,99.4137117 C1478.64486,100.025724 1478.42336,100.637736 1477.96681,101.114332 L1477.92306,101.155059 L1473.08586,105.948308 L1473.08042,105.948308 C1472.60466,106.427579 1471.96476,106.663236 1471.336,106.663236 C1470.7207,106.663236 1470.10274,106.441188 1469.62698,105.986157 L1469.5805,105.948308 L1468.76291,105.135813 C1468.28168,104.651159 1468.03826,104.022863 1468.03826,103.394601 C1468.03826,103.102069 1468.09302,102.804255 1468.20508,102.52259 Z M1480.25,113 L1467.99995,113 C1467.0375,113 1466.24996,112.220174 1466.24996,111.266846 C1466.24996,110.313619 1467.0375,109.533657 1467.99995,109.533657 L1480.25,109.533657 C1481.21246,109.533657 1482,110.313619 1482,111.266846 C1482,112.220174 1481.21246,113 1480.25,113 Z',
				transform: 'translate(-1013.000000, -54.000000) scale(0.7)',
				'fill-rule': 'evenodd'
			},
			'text': {
				'font-size': 14,
				text: 'Decision',
				'text-anchor': 'middle',
				'ref': 'path',
				'ref-x': .5,
				'ref-dy': 10,
				fill: '#699CFF',
				'font-family': 'PingFangSC-Medium'
			}
		}

	}, {
		markup: '<g class="rotatable"><g class="scalable"><rect/><path/></g><text/></g>',
	});

	joint.shapes.basic.Generic.define('csf.Sync', {
		size: { width: 30, height: 30 },
		attrs: {
			root: {
				magnet: true
			},
			'rect': {
				fill: '#FFFFFF',
				stroke: 'none',
				width: 30,
				height: 30,
				rx: 4,
				ry: 4
			},
			'path': {
				fill: '#699CFF',
				stroke: 'none',
				'stroke-width': 1,
				d: 'M676.863689,92.5000549 C676.863689,91.7466107 676.253471,91.1363187 675.499991,91.1363187 L672.090966,91.1363187 C671.337486,91.1363187 670.727378,91.7466107 670.727378,92.5000549 L670.727378,95.9091209 C670.727378,96.6618327 671.337486,97.2728205 672.090966,97.2728205 L675.499991,97.2728205 C676.253471,97.2728205 676.863689,96.6618327 676.863689,95.9091209 L676.863689,92.5000549 Z M657.090984,106.136392 C656.337541,106.136392 655.727286,106.746647 655.727286,107.499982 L655.727286,110.909157 C655.727286,111.662492 656.337541,112.272784 657.090984,112.272784 L660.500082,112.272784 C661.253489,112.272784 661.863597,111.662492 661.863597,110.909157 L661.863597,107.499982 C661.863597,106.746647 661.253489,106.136392 660.500082,106.136392 L657.090984,106.136392 Z M679.590975,89.7727656 L679.590975,98.6363736 C679.590975,99.389122 678.98072,100.00011 678.22724,100.00011 L669.363643,100.00011 C668.6102,100.00011 668.000092,99.389122 668.000092,98.6363736 L668.000092,95.9091209 L660.500082,95.9091209 L660.500082,103.409139 L663.227295,103.409139 C663.980775,103.409139 664.59092,104.019395 664.59092,104.772729 L664.59092,113.636483 C664.59092,114.389232 663.980775,115 663.227295,115 L654.363735,115 C653.610255,115 653,114.389232 653,113.636483 L653,104.772729 C653,104.019395 653.610255,103.409139 654.363735,103.409139 L657.77276,103.409139 L657.77276,94.5454945 C657.77276,93.7920869 658.383014,93.1818315 659.136311,93.1818315 L668.000092,93.1818315 L668.000092,89.7727656 C668.000092,89.0193213 668.6102,88.4090659 669.363643,88.4090659 L678.22724,88.4090659 C678.98072,88.4090659 679.590975,89.0193213 679.590975,89.7727656 Z M681.636449,94.5454945 C680.883042,94.5454945 680.272787,93.9345799 680.272787,93.1818315 L680.272787,87.7272894 L674.818215,87.7272894 C674.064735,87.7272894 673.454627,87.1163016 673.454627,86.3636996 C673.454627,85.6102554 674.064735,85 674.818215,85 L681.636449,85 C682.389745,85 683,85.6102554 683,86.3636996 L683,93.1818315 C683,93.9345799 682.389745,94.5454945 681.636449,94.5454945 Z',
				transform: 'translate(-452.000000, -55.000000) scale(0.7)',
				'fill-rule': 'evenodd'
			},
			'text': {
				'font-size': 14,
				text: 'Sync',
				'text-anchor': 'middle',
				'ref': 'path',
				'ref-x': .5,
				'ref-dy': 10,
				fill: '#699CFF',
				'font-family': 'PingFangSC-Medium'
			}
		}

	}, {
		markup: '<g class="rotatable"><g class="scalable"><rect/><path/></g><text/></g>',
	});

	joint.shapes.basic.Generic.define('csf.Async', {
		size: { width: 30, height: 30 },
		attrs: {
			root: {
				magnet: true
			},
			'rect': {
				fill: '#FFFFFF',
				stroke: 'none',
				width: 30,
				height: 30,
				rx: 4,
				ry: 4
			},
			'path': {
				fill: '#699CFF',
				stroke: 'none',
				'stroke-width': 1,
				d: 'M1057,105.533321 L1057,108.866766 C1057,109.603366 1057.5967,110.200101 1058.3334,110.200101 L1061.66677,110.200101 C1062.40344,110.200101 1063,109.603366 1063,108.866766 L1063,105.533321 C1063,104.796721 1062.40344,104.200021 1061.66677,104.200021 L1058.3334,104.200021 C1057.5967,104.200021 1057,104.796721 1057,105.533321 Z M1062,87 L1062,101.409137 L1064.6,101.409137 C1065.35348,101.409137 1066,102.019393 1066,102.772727 L1066,111.636483 C1066,112.389232 1065.35348,113 1064.6,113 L1055.36373,113 C1054.61025,113 1054,112.389232 1054,111.636483 L1054,102.772727 C1054,102.019393 1054.61025,101.409137 1055.36373,101.409137 L1058,101.409137 L1058,87 L1062,87 Z M1078,113 L1074,113 L1074,98.590863 L1071.36373,98.590863 C1070.61025,98.590863 1070,97.9806075 1070,97.227273 L1070,88.3635168 C1070,87.6107682 1070.61025,87 1071.36373,87 L1080.6,87 C1081.35348,87 1082,87.6107682 1082,88.3635168 L1082,97.227273 C1082,97.9806075 1081.35348,98.590863 1080.6,98.590863 L1078,98.590863 L1078,113 Z M1073,94.4666794 C1073,95.2032794 1073.5967,95.7999788 1074.3334,95.7999788 L1077.66677,95.7999788 C1078.40344,95.7999788 1079,95.2032794 1079,94.4666794 L1079,91.133234 C1079,90.3966339 1078.40344,89.7998988 1077.66677,89.7998988 L1074.3334,89.7998988 C1073.5967,89.7998988 1073,90.3966339 1073,91.133234 L1073,94.4666794 Z',
				transform: 'translate(-733.000000, -54.000000) scale(0.7)',
				'fill-rule': 'evenodd'
			},
			'text': {
				'font-size': 14,
				text: 'Async',
				'text-anchor': 'middle',
				'ref': 'path',
				'ref-x': .5,
				'ref-dy': 10,
				fill: '#699CFF',
				'font-family': 'PingFangSC-Medium'
			}
		}

	}, {
		markup: '<g class="rotatable"><g class="scalable"><rect/><path/></g><text/></g>',
	});

	joint.shapes.basic.Generic.define('csf.Service', {
		size: { width: 30, height: 30 },
		attrs: {
			root: {
				magnet: true
			},
			'rect': {
				fill: '#FFFFFF',
				stroke: 'none',
				width: 30,
				height: 30,
				rx: 4,
				ry: 4
			},
			'path': {
				fill: '#699CFF',
				stroke: 'none',
				'stroke-width': 1,
				d: 'M1875.46236,106.494839 C1874.27266,107.220924 1872.77027,107.144946 1871.65703,106.302297 C1870.54396,105.459845 1870.03985,104.017022 1870.38043,102.648216 C1870.72104,101.279508 1871.83899,100.254904 1873.21188,100.053343 C1874.58479,99.8516513 1875.94169,100.512836 1876.6484,101.727857 C1877.10889,102.525116 1877.2383,103.47629 1877.00805,104.370865 C1876.77784,105.265571 1876.20673,106.029889 1875.42149,106.494839 L1875.46236,106.494839 Z M1881.30083,105.516509 C1881.53997,105.830811 1881.5983,106.250273 1881.45422,106.61977 C1881.31438,106.981456 1881.14333,107.329809 1880.94298,107.660679 C1880.75897,108.024097 1880.54709,108.372156 1880.30907,108.70136 C1880.0354,109.006872 1879.61905,109.134775 1879.22518,109.034583 L1878.96948,108.961645 C1878.29018,108.800572 1877.57602,108.912365 1876.97563,109.273921 C1876.37328,109.6376 1875.93049,110.222317 1875.73841,110.907979 L1875.67703,111.17859 C1875.57421,111.577333 1875.26351,111.885655 1874.86932,111.980063 C1874.48386,112.041009 1874.09359,112.065387 1873.7036,112.052871 C1873.3122,112.081465 1872.91919,112.081465 1872.5277,112.052871 C1872.13254,111.95892 1871.81678,111.657265 1871.69954,111.261953 L1871.62795,110.991342 C1871.1988,109.575772 1869.75769,108.748515 1868.34577,109.107293 L1868.10038,109.190688 C1867.70699,109.293201 1867.28978,109.174186 1867.00624,108.878314 C1866.76021,108.550483 1866.54123,108.202424 1866.35189,107.837601 C1866.1436,107.506175 1865.96238,107.158116 1865.80989,106.796691 C1865.68524,106.402686 1865.78357,105.970839 1866.06559,105.672647 L1866.25985,105.485203 C1867.25703,104.410308 1867.25703,102.730043 1866.25985,101.654951 L1866.05532,101.467703 C1865.76839,101.172583 1865.65904,100.743416 1865.76903,100.343496 C1865.91888,99.984653 1866.09304,99.6369533 1866.29044,99.3027498 C1866.47815,98.9413251 1866.68997,98.5936581 1866.92448,98.2618729 C1867.20047,97.9603807 1867.61443,97.8330651 1868.00831,97.9288459 L1868.26391,97.9808047 C1868.96099,98.1450798 1869.69336,98.0295611 1870.309,97.6582349 C1870.90749,97.2973657 1871.34695,96.7160471 1871.53588,96.0345034 L1871.59732,95.7534353 C1871.70968,95.3566851 1872.02156,95.0512061 1872.41534,94.9520267 C1872.80333,94.9226814 1873.19297,94.9226814 1873.58096,94.9520267 C1873.9722,94.918858 1874.36547,94.918858 1874.75683,94.9520267 C1875.14701,95.0422849 1875.46162,95.3348559 1875.58499,95.7222927 L1875.64644,95.9929037 C1876.07106,97.408244 1877.50465,98.2427233 1878.91844,97.8975725 L1879.18431,97.8143402 C1879.57754,97.7023509 1879.99954,97.8227713 1880.27832,98.1265837 C1880.51832,98.438435 1880.73364,98.7690439 1880.9225,99.1153711 C1881.12378,99.4508163 1881.30472,99.7984179 1881.46449,100.156183 C1881.59653,100.561495 1881.49371,101.008047 1881.19865,101.311467 L1881.00426,101.498846 C1880.52497,102.019775 1880.26439,102.710762 1880.27832,103.424462 C1880.29976,104.142834 1880.5927,104.825293 1881.0963,105.32913 L1881.30083,105.516509 Z M1869.41938,111.24111 L1869.41938,111.251437 C1870.10918,111.645246 1870.65204,112.259929 1870.96331,113 L1862.49705,113 C1861.65855,113 1860.96323,112.542141 1860.96323,111.959319 C1860.96323,111.376465 1861.65855,110.91841 1862.49705,110.91841 C1863.04052,110.381501 1863.6289,109.893905 1864.25565,109.461273 C1864.4717,109.848481 1864.71787,110.217389 1864.9919,110.564599 C1865.36307,110.958539 1865.91451,111.117716 1866.43367,110.980826 L1866.76084,110.86632 C1867.66132,110.637701 1868.61376,110.771912 1869.41938,111.24111 Z M1863.40707,107.858358 L1863.43763,107.879174 C1863.57789,108.215142 1863.73841,108.54183 1863.91834,108.857537 L1855.9735,108.857537 C1854.87205,108.81829 1853.99936,107.897703 1854,106.775881 L1854,89.081758 C1853.99936,87.9598056 1854.87205,87.0393491 1855.9735,87.0000041 L1880.07378,87.0000041 C1880.6056,86.9988931 1881.11414,87.2221529 1881.47841,87.6165829 C1881.84256,88.0110129 1882.03004,88.5413856 1881.99607,89.081758 L1881.99607,96.0865669 C1881.66374,95.8945805 1881.26987,95.8458568 1880.90207,95.9512451 L1880.55442,96.0552935 C1880.38614,96.0975469 1880.21538,96.1288203 1880.04318,96.1490156 L1880.04318,91.1009324 C1880.04379,89.9791108 1879.17114,89.0585235 1878.06975,89.0191786 L1858.01839,89.0191786 C1856.91713,89.0585235 1856.04435,89.9791108 1856.04509,91.1009324 L1856.04509,100.468465 C1856.04435,101.590254 1856.91713,102.510874 1858.01839,102.550056 L1864.79767,102.550056 C1864.89735,102.887527 1864.94564,103.23856 1864.94076,103.590933 C1864.96108,104.533709 1864.62836,105.449002 1864.01038,106.151427 L1863.7445,106.401157 C1863.38665,106.791894 1863.25824,107.346155 1863.40707,107.858358 Z',
				transform: 'translate(-1293.000000, -54.000000) scale(0.7)',
				'fill-rule': 'evenodd'
			},
			'text': {
				'font-size': 14,
				text: 'Service',
				'text-anchor': 'middle',
				'ref': 'path',
				'ref-x': .5,
				'ref-dy': 10,
				fill: '#699CFF',
				'font-family': 'PingFangSC-Medium'
			}
		}

	}, {
		markup: '<g class="rotatable"><g class="scalable"><rect/><path/></g><text/></g>',
	});


	joint.shapes.standard.Link.define('csf.Link', {
		router: {
			name: 'orthogonal'
		},
		connector: {
			name: 'rounded'
		},
		// labels: [],
		attrs: {
			line: {
				stroke: '#699CFF',
				strokeDasharray: '5',
				strokeWidth: 2,
				fill: 'none',
				sourceMarker: {
					type: 'path',
					d: 'M 0 0 0 0',
					stroke: 'none'
				},
				targetMarker: {
					type: 'path',
					d: 'M 0 -5 -10 0 0 5',
					fill: 'none',
					stroke: '#699CFF',
					'stroke-width': 2
				}
			},
		}
	}, {
		defaultLabel: {
			attrs: {
				rect: {
					fill: '#000000',
					stroke: '#699CFF',
					strokeWidth: 1,
					refWidth: 10,
					refHeight: 10,
					refX: -5,
					refY: -5
				},
				text: {
					fill: '#FFFFFF'
				}
			}
		},

		getMarkerWidth: function(type) {
			var d = (type === 'source') ? this.attr('line/sourceMarker/d') : this.attr('line/targetMarker/d');
			return this.getDataWidth(d);
		},

		getDataWidth: _.memoize(function(d) {
			return (new g.Path(d)).bbox().width;
		})

	}, {

		connectionPoint: function(line, view, magnet, opt, type, linkView) {
			var markerWidth = linkView.model.getMarkerWidth(type);
			opt = { offset: markerWidth, stroke: true };
			// connection point for UML shapes lies on the root group containg all the shapes components
			if (view.model.get('type').indexOf('uml') === 0) opt.selector = 'root';
			return joint.connectionPoints.boundary.call(this, line, view, magnet, opt, type, linkView);
		}
	});

	// Navigator Views

	joint.shapes.csf.NavigatorElementView = joint.dia.ElementView.extend({

		rect: null,

		initialize: function() {
			this.listenTo(this.model, 'change:position', this.translate);
			this.listenTo(this.model, 'change:size', this.resize);
			this.listenTo(this.model, 'change:angle', this.rotate);
		},

		render: function() {
			this.rect = V('rect', { fill: '#31d0c6' }).appendTo(this.el)
			this.update();
		},

		update: function() {
			this.rect.attr(this.model.get('size'));
			this.updateTransformation();
		}
	});

	joint.shapes.csf.NavigatorLinkView = joint.dia.LinkView.extend({

		initialize: function() {},

		render: function() {},

		update: function() {}
	});

})(joint, V);
