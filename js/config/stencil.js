/**
 * @name stencil.js
 * @desc 左侧工具菜单栏配置
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
            size: { width: 5, height: 5 },
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
            size: { width: 5, height: 5 },
            attrs: {
                root: {
                    dataTooltip: 'End',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                }
            }
        },
        {
            type: 'csf.Judge',
            size: { width: 5, height: 5 },
            attrs: {
                root: {
                    dataTooltip: 'Judge',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                }
            }
        },
        {
            type: 'csf.Auto',
            size: { width: 5, height: 5 },
            attrs: {
                root: {
                    dataTooltip: 'Auto',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                }
            }
        },
        {
            type: 'csf.group',
            size: { width: 2, height: 1 },
            attrs: {
                root: {
                    dataTooltip: 'Group',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                }
            }
        },
        {
            type: 'csf.Flow',
            size: { width: 2, height: 1 },
            attrs: {
                root: {
                    dataTooltip: 'Flow',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                }
            }
        }
    ];

})();
