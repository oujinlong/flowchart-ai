/**
 * Created by wendyliu on 2018/5/28.
 */
var App = App || {};
App.config = App.config || {};

(function() {

	'use strict';

	App.config.stencil = {};

	App.config.stencil.shapes = {};

	/**
	 * [csf description]
	 * @width height  表示比例
	 */
	App.config.stencil.shapes.csf = [
		{
			type: 'csf.Start',
			size: { width: 30, height: 30 },
			attrs: {
				root: {
					dataTooltip: 'Start',
					dataTooltipPosition: 'left',
					dataTooltipPositionSelector: '.joint-stencil'
				}
			}
		},
		{
			type: 'csf.End',
			size: { width: 30, height: 30 },
			attrs: {
				root: {
					dataTooltip: 'End',
					dataTooltipPosition: 'left',
					dataTooltipPositionSelector: '.joint-stencil'
				}
			}
		},
		{
			type: 'csf.Decision',
			size: { width: 30, height: 30 },
			attrs: {
				root: {
					dataTooltip: 'Decision',
					dataTooltipPosition: 'left',
					dataTooltipPositionSelector: '.joint-stencil'
				}
			}
		},
		{
			type: 'csf.Sync',
			size: { width: 30, height: 30 },
			attrs: {
				root: {
					dataTooltip: 'Sync',
					dataTooltipPosition: 'left',
					dataTooltipPositionSelector: '.joint-stencil'
				}
			}
		},
		{
			type: 'csf.Async',
			size: { width: 30, height: 30 },
			attrs: {
				root: {
					dataTooltip: 'Async',
					dataTooltipPosition: 'left',
					dataTooltipPositionSelector: '.joint-stencil'
				}
			}
		},
		{
			type: 'csf.Service',
			size: { width: 30, height: 30 },
			attrs: {
				root: {
					dataTooltip: 'Service',
					dataTooltipPosition: 'left',
					dataTooltipPositionSelector: '.joint-stencil'
				}
			}
		}

	];

})();