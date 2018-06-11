/**
 * @name joint.shapes.csf.js
 * @desc csf 定制元素样式
 * Created by wendyliu on 2018/5/15.
 */
(function(joint, V) {

	'use strict';

	joint.shapes.standard.Circle.define('csf.Start', {
		attrs: {
			root: {
				magnet: false
			},
			'circle': {
				fill: '#1A9DF5',
				stroke: 'none',
				r: 30,
				cx: 30,
				cy: 30
			},
			'path': {
				fill: '#fff',
				stroke: '#fff'
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
				fill: '#1A9DF5',
				stroke: 'none',
				r: 30,
				cx: 30,
				cy: 30
			},
			'rect': {
				fill: '#fff'
			}
		}
	}, {
		markup: [
			'<g class="rotatable"><g class="scalable"><circle/>',
			'<rect width="20" height="20" x="20" y="20" rx="2" ry="2"></rect>',
			'</g></g>',
		].join('')
	});


	joint.shapes.standard.Polygon.define('csf.Judge', {
		attrs: {
			root: {
				magnet: true
			},
			'.outer': {
				fill: '', stroke: '#FCE173', 'stroke-width': 2,
				points: '40,0 80,40 40,80 0,40'
			},
			text: {
				fill: '#FFFFFF',
				text: '判断',
				'font-family': 'Microsoft YaHei',
				'font-size': 12,
				'ref-x': .5,
				'ref-y': 70,
				y: 0,
				opacity: 0.8,
				'y-alignment': 'middle',
				'text-anchor': 'middle'
			}
		}
	}, {
		markup: [
			'<g class="rotatable"><g class="scalable"><polygon class="outer"/></g>',
			'<svg width="24px" height="24px" viewBox="0 0 24 24" x="18" y="18">',
			'<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">',
			'<g>',
			'<g>',
			'<rect x="0" y="0" width="20" height="20"></rect>',
			'<path fill="#FCE173" d="M22.9791632,15.385229 L22.9791632,16.6961821 C22.9791632,17.1331664 22.9575847,17.5483016 22.9144276,17.9415875 C22.8712705,18.3348734 22.789272,18.6975704 22.6684322,19.0296785 C22.5475923,19.3617866 22.374964,19.6501963 22.1505471,19.8949075 C21.8052904,20.1920569 21.3650881,20.4061792 20.8299402,20.5372745 C20.2947923,20.6683698 19.751013,20.7557667 19.1986023,20.7994651 C18.6461916,20.8431636 18.1283065,20.8475334 17.6449471,20.8125747 C17.1615877,20.7776159 16.8076996,20.7426572 16.5832828,20.7076984 L16.816331,20.2619744 C16.8681195,20.1396188 16.9155923,20.021633 16.9587494,19.9080171 C17.0019065,19.7944011 17.0493793,19.6764154 17.1011678,19.5540597 C17.1529563,19.4317041 17.2047448,19.2743898 17.2565333,19.0821166 C17.5500015,19.0821166 17.8348383,19.0515277 18.1110437,18.9903499 C18.387249,18.9291721 18.6332444,18.8286657 18.8490299,18.6888307 C19.0648153,18.5489957 19.2417594,18.3567226 19.3798621,18.1120114 C19.5179648,17.8673001 19.5956475,17.5614111 19.6129103,17.1943442 L19.6129103,3.14092745 L22.9791632,3.14092745 L22.9791632,15.385229 L22.9791632,15.385229 Z M18.1628322,16.2766771 L15.6251954,16.2766771 L15.6251954,4.81894737 L18.1628322,4.81894737 L18.1628322,16.2766771 L18.1628322,16.2766771 Z M3.40310805,8.33230156 C3.17869119,7.84287909 2.92838008,7.38404552 2.65217471,6.95580085 C2.37596935,6.52755619 2.11702682,6.1473798 1.87534713,5.81527169 C1.58187893,5.43072546 1.29704215,5.07239829 1.02083678,4.74029018 L2.60038621,3.48177525 C2.91111724,3.70900711 3.24774253,3.99741679 3.61026207,4.34700427 C3.97278161,4.69659175 4.31803831,5.04617923 4.64603218,5.39576671 C5.02581456,5.79779232 5.40559693,6.2172973 5.78537931,6.65428165 L3.40310805,8.33230156 Z M10.1874023,7.15244381 C10.4808705,6.87277383 10.7570759,6.54066572 11.0160184,6.15611949 C11.2404352,5.82401138 11.4691678,5.41761593 11.7022161,4.93693314 C11.9352644,4.45625036 12.1294713,3.90128023 12.2848368,3.27202276 L15.1073103,4.60919488 C14.831105,5.09861735 14.5117425,5.57056046 14.149223,6.02502418 C13.838492,6.42704979 13.467341,6.83781508 13.0357701,7.25732006 C12.6041992,7.67682504 12.1294713,8.0351522 11.6115862,8.33230156 L10.1874023,7.15244381 Z M9.82488276,10.5609218 C9.80761992,11.0153855 9.7946728,11.4436302 9.78604138,11.8456558 C9.77740996,12.2476814 9.76446284,12.5972688 9.7472,12.8944182 L14.9519448,12.8944182 L14.9519448,14.5462191 L9.69541149,14.5462191 C9.66088582,15.0006828 9.57457165,15.525064 9.43646897,16.1193627 C9.29836628,16.7136615 9.05668659,17.2992205 8.71142989,17.8760398 C8.36617318,18.4528592 7.8871295,18.9903499 7.27429885,19.4885121 C6.6614682,19.9866743 5.86306207,20.3493713 4.87908046,20.5766031 C4.55108659,20.6465206 4.19719847,20.7076984 3.81741609,20.7601366 C3.43763372,20.8125747 3.07511418,20.8562731 2.72985747,20.8912319 C2.33281226,20.94367 1.93576705,20.9786287 1.53872184,20.9961081 L1.79766437,19.1083357 C2.52270345,19.3355676 3.18732261,19.3355676 3.79152184,19.1083357 C4.05046437,19.0209388 4.30509119,18.876734 4.5554023,18.6757212 C4.80571341,18.4747084 5.03444598,18.1950384 5.2416,17.8367112 C5.44875402,17.4783841 5.62569808,17.03266 5.77243218,16.4995391 C5.91916628,15.9664182 6.01842759,15.3153115 6.07021609,14.5462191 L1.59051034,14.5462191 L1.59051034,12.8944182 L6.1220046,12.8944182 C6.13926743,12.5623101 6.15221456,12.1996131 6.16084598,11.8063272 C6.16947739,11.4130413 6.18242452,10.9979061 6.19968736,10.5609218 L2.0566069,10.5609218 L2.0566069,8.93533997 L6.22558161,8.93533997 C6.24284444,8.18372688 6.26442299,7.45396302 6.29031724,6.74604836 C6.31621149,6.03813371 6.33779004,5.4045064 6.35505287,4.84516643 C6.37231571,4.19842959 6.38957854,3.58665149 6.40684138,3.00983215 L10.0320368,3.00983215 C10.0147739,3.58665149 9.99751111,4.20716927 9.98024828,4.87138549 C9.96298544,5.43072546 9.9414069,6.06435277 9.91551264,6.77226743 C9.88961839,7.48018208 9.86803985,8.20120626 9.85077701,8.93533997 L14.4858483,8.93533997 L14.4858483,10.5609218 L9.82488276,10.5609218 L9.82488276,10.5609218 Z" ></path>',
			'</g>',
			'</g>',
			'</g>',
			'</svg>',
			'</g>',
			'<text/>'
		].join('')
	});

	joint.shapes.standard.Rectangle.define('csf.Auto', {
		attrs: {
			root: {
				magnet: true
			},
			'rect': {
				fill: '#7E6BFF',
				stroke: 'none',
				width: 20,
				height: 20,
				// refWidth: '100%',
				// refHeight: '100%',
				rx: 3,
				ry: 3
			},
			'text': {
				fill: '#dcd7d7',
				text: '',
				fontSize: 12,
        refX: .5,
        refY: '100%',
				'text-anchor': 'middle',
				'font-family': 'Microsoft YaHei',
				opacity: 0.8,
				lineHeight: 'auto'
			},
			// foreignObject: {
			// 	width: 24,
			// 	height: 24,
			// 	x: 12,
			// 	y: 12
			// },
			image: {
				refWidth: '60%',
				refHeight: '60%',
				refX: '20%',
				refY: '20%',
				preserveAspectRatio: 'xMidYMin'
			}
		}
	}, {
		markup: [
			'<g class="rotatable"><g class="scalable"><rect/></g>',
			// '<foreignObject></foreignObject>',
			'<image/>',
			'<text/>',
			'</g>',
		].join('')
	});

	// 放置子流程的组节点
	joint.shapes.standard.Rectangle.define('csf.group', {
		attrs: {
			root: {
				magnet: true
			},
			'rect': {
				width: 100,
				height: 30,
				rx: 3,
				ry: 3,
				fill: 'transparent',
				stroke: '#ccc',
				strokeWidth: 2,
				strokeDasharray: "1,2"
			}
		}
	}, {
		markup: [
			'<g class="rotatable"><g class="scalable"><rect/></g>',
			'</g>',
		].join('')
	});

	// 流程节点
	joint.shapes.basic.Rect.define('csf.Flow', {
		attrs: {
			root: {
				magnet: true
			},
			rect: {
				rx: 2,
				ry: 2,
				fill: '#31D0C6',
				stroke: '#4B4A67',
				strokeWidth: 2,
				strokeDasharray: "1,2"
			},
			text: {
				text: 'flow',
				fill: 'pink',
				'ref-y': '120%'
			}
		}
	});

	joint.shapes.standard.Link.define('csf.Link', {
		router: {
			name: 'normal'
		},
		connector: {
			name: 'rounded'
		},
		labels: [],
		attrs: {
			line: {
				stroke: '#8f8f8f',
				strokeDasharray: '0',
				strokeWidth: 2,
				fill: 'none',
				sourceMarker: {
					type: 'path',
					d: 'M 0 0 0 0',
					stroke: 'none'
				},
				targetMarker: {
					type: 'path',
					d: 'M 0 -5 -10 0 0 5 z',
					stroke: 'none'
				}
			}
		}
	}, {
		defaultLabel: {
			attrs: {
				rect: {
					fill: '#ffffff',
					stroke: '#8f8f8f',
					strokeWidth: 1,
					refWidth: 10,
					refHeight: 10,
					refX: -5,
					refY: -5
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
