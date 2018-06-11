/**
 * @name config/jsonview.js
 * @desc jsonview 配置
 * Created by wendyliu on 2018/5/17.
 */
var App = App || {};
App.config = App.config || {};

(function() {

	'use strict';

	App.config.jsonview = {
		groups: {
			'copy': { index: 1 },
			'clear': { index: 2 },
			'render': { index: 3 }
		},
		tools: [
			{
				type: 'button',
				name: 'copy',
				text: 'Copy',
				attrs: {
					button: {
						id: 'btn-copy',
						'data-tooltip': 'Copy the json to clipboard',
						'data-tooltip-position': 'right',
						'data-tooltip-position-selector': '.joint-jsonview'
					}
				}
			},
			{
				type: 'button',
				name: 'clearjson',
				text: 'Clear',
				attrs: {
					button: {
						id: 'btn-clear',
						'data-tooltip': 'Clear the json data',
						'data-tooltip-position': 'right',
						'data-tooltip-position-selector': '.joint-jsonview'
					}
				}
			},
			{
				type: 'button',
				name: 'render',
				text: 'Render',
				attrs: {
					button: {
						id: 'btn-render',
						'data-tooltip': 'Load a graph from the json data',
						'data-tooltip-position': 'right',
						'data-tooltip-position-selector': '.joint-jsonview'
					}
				}
			}
		]
	};
})();