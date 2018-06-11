/**
 * @name toolbar.js
 * @desc 顶部工具栏配置
 */
var App = App || {};
App.config = App.config || {};

(function() {

    'use strict';

    App.config.toolbar = {
        groups: {
            'export': { index: 1 },
            'clear': { index: 2 },
            'print': { index: 3 }
        },
        tools: [
            {
                type: 'button',
                name: 'json',
                group: 'export',
                text: 'Export JSON',
                attrs: {
                    button: {
                        id: 'btn-json',
                        'data-tooltip': 'Export as JSON in JsonView',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'cleargraph',
                group: 'clear',
                text: 'Clear',
                attrs: {
                    button: {
                        id: 'btn-clear',
                        'data-tooltip': 'Clear Paper',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'printpager',
                group: 'print',
                text: 'Print',
                attrs: {
                    button: {
                        id: 'btn-print',
                        'data-tooltip': 'Open a Print Dialog',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            }
        ]
    };
})();
