/**
 * Created by wendyliu on 2018/5/28.
 */
var App = App || {};
App.config = App.config || {};

(function() {

	'use strict';

	App.config.toolbar = {
		groups: {
			'save': { index: 1 },
			'generate': { index: 2 },
			'import': { index: 3 },
			'export': { index: 4 },
		},
		tools: [
			{
				type: 'textButton',
				name: 'save',
				group: 'options',
				text: 'Save',
				attrs: {
					button: {
						id: 'text-btn-save',
						'data-tooltip': 'Save the Flow',
						'data-tooltip-position': 'top',
						'data-tooltip-position-selector': '.toolbar-container'
					}
				}
			},
			{
				type: 'textButton',
				name: 'generate',
				group: 'options',
				text: 'Generate Code',
				attrs: {
					button: {
						id: 'text-btn-generate',
						'data-tooltip': 'Clear Paper',
						'data-tooltip-position': 'top',
						'data-tooltip-position-selector': '.toolbar-container'
					}
				}
			},
			{
				type: 'textButton',
				name: 'import',
				group: 'options',
				text: 'Import',
				attrs: {
					button: {
						id: 'text-btn-import',
						'data-tooltip': 'Import the json data',
						'data-tooltip-position': 'top',
						'data-tooltip-position-selector': '.toolbar-container'
					}
				}
			},
			{
				type: 'textButton',
				name: 'export',
				group: 'options',
				text: 'Export',
				attrs: {
					button: {
						id: 'text-btn-export',
						'data-tooltip': 'Export the json data',
						'data-tooltip-position': 'top',
						'data-tooltip-position-selector': '.toolbar-container'
					}
				}
			},
			{
				type: 'textButton',
				name: 'clear-page',
				group: 'options',
				text: 'Clear',
				attrs: {
					button: {
						id: 'text-btn-clear',
						'data-tooltip': 'Clear the pager',
						'data-tooltip-position': 'top',
						'data-tooltip-position-selector': '.toolbar-container'
					}
				}
			},
			{
				type: 'textButton',
				name: 'exit',
				group: 'options',
				text: 'Exit',
				attrs: {
					button: {
						id: 'text-btn-exit',
						'data-tooltip': 'Exit Design',
						'data-tooltip-position': 'top',
						'data-tooltip-position-selector': '.toolbar-container'
					}
				}
			}
		]
	};
})();