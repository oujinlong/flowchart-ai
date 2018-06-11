/**
 * Created by wendyliu on 2018/5/29.
 */
var App = App || {};
App.config = App.config || {};

(function() {

	'use strict';

	var options = {

		colorPalette: [
			{ content: 'transparent', icon: '../assets/img/transparent-icon.svg' },
			{ content: '#f6f6f6' },
			{ content: '#dcd7d7' },
			{ content: '#8f8f8f' },
			{ content: '#c6c7e2' },
			{ content: '#feb663' },
			{ content: '#fe854f' },
			{ content: '#b75d32' },
			{ content: '#31d0c6' },
			{ content: '#7E6BFF' },     // 自定义颜色
			{ content: '#61549c' },
			{ content: '#6a6c8a' },
			{ content: '#4b4a67' },
			{ content: '#3c4260' },
			{ content: '#33334e' },
			{ content: '#222138' },
			{ content: '#699CFF' }  // 自定义颜色
		],

		colorPaletteReset: [
			{ content: undefined, icon: '../assets/img/no-color-icon.svg' },
			{ content: '#f6f6f6' },
			{ content: '#dcd7d7' },
			{ content: '#8f8f8f' },
			{ content: '#c6c7e2' },
			{ content: '#feb663' },
			{ content: '#fe854f' },
			{ content: '#b75d32' },
			{ content: '#31d0c6' },
			{ content: '#7E6BFF' },
			{ content: '#61549c' },
			{ content: '#6a6c8a' },
			{ content: '#4b4a67' },
			{ content: '#3c4260' },
			{ content: '#33334e' },
			{ content: '#222138' },
			{ content: '#699CFF' }  // 自定义颜色
		],

		fontWeight: [
			{ value: '300', content: '<span style="font-weight: 300">Light</span>' },
			{ value: 'Normal', content: '<span style="font-weight: Normal">Normal</span>' },
			{ value: 'Bold', content: '<span style="font-weight: Bolder">Bold</span>' }
		],

		fontFamily: [
			{ value: 'Alegreya Sans', content: '<span style="font-family: Alegreya Sans">Alegreya Sans</span>' },
			{ value: 'Averia Libre', content: '<span style="font-family: Averia Libre">Averia Libre</span>' },
			{ value: 'Roboto Condensed', content: '<span style="font-family: Roboto Condensed">Roboto Condensed</span>' }
		],

		strokeStyle: [
			{ value: '0', content: 'Solid' },
			{ value: '2,5', content: 'Dotted' },
			{ value: '10,5', content: 'Dashed' }
		],

		side: [
			{ value: 'top', content: 'Top Side' },
			{ value: 'right', content: 'Right Side' },
			{ value: 'bottom', content: 'Bottom Side' },
			{ value: 'left', content: 'Left Side' }
		],

		portLabelPositionRectangle: [
			{ value: { name: 'top', args: { y: -12 }}, content: 'Above' },
			{ value: { name: 'right', args: { y: 0 }}, content: 'On Right' },
			{ value: { name: 'bottom', args: { y: 12 }}, content: 'Below' },
			{ value: { name: 'left', args: { y: 0 }}, content: 'On Left' }
		],

		portLabelPositionEllipse: [
			{ value: 'radial' , content: 'Horizontal' },
			{ value: 'radialOriented' , content: 'Angled' }
		],

		autoImages: [
			{ value: '../assets/img/auto-images/ord.svg', content: '<img height="42px" src="../assets/img/auto-images/ord.svg"/>' },
			{ value: '../assets/img/auto-images/cust.svg', content: '<img height="42px" src="../assets/img/auto-images/cust.svg"/>' },
			{ value: '../assets/img/auto-images/res.svg', content: '<img height="42px" src="../assets/img/auto-images/res.svg"/>' },
		],

		imageGender: [
			{ value: '../assets/member-male.png', content: '<img height="50px" src="../assets/member-male.png" style="margin: 5px 0 0 2px;"/>' },
			{ value: '../assets/member-female.png', content: '<img height="50px" src="../assets/member-female.png" style="margin: 5px 0 0 2px;"/>' }
		],

		strokeWidth: [
			{ value: 1, content: '<div style="background:#fff;width:2px;height:30px;margin:0 14px;border-radius: 2px;"/>' },
			{ value: 2, content: '<div style="background:#fff;width:4px;height:30px;margin:0 13px;border-radius: 2px;"/>' },
			{ value: 4, content: '<div style="background:#fff;width:8px;height:30px;margin:0 11px;border-radius: 2px;"/>' },
			{ value: 8, content: '<div style="background:#fff;width:16px;height:30px;margin:0 8px;border-radius: 2px;"/>' }
		],

		router: [
			{ value: 'normal', content: '<p style="background:#fff;width:2px;height:30px;margin:0 14px;border-radius: 2px;"/>' },
			{ value: 'orthogonal', content: '<p style="width:20px;height:30px;margin:0 5px;border-bottom: 2px solid #fff;border-left: 2px solid #fff;"/>' },
			{ value: 'oneSide', content: '<p style="width:20px;height:30px;margin:0 5px;border: 2px solid #fff;border-top: none;"/>' }
		],

		connector: [
			{ value: 'normal', content: '<p style="width:20px;height:20px;margin:5px;border-top:2px solid #fff;border-left:2px solid #fff;"/>' },
			{ value: 'rounded', content: '<p style="width:20px;height:20px;margin:5px;border-top-left-radius:30%;border-top:2px solid #fff;border-left:2px solid #fff;"/>' },
			{ value: 'smooth', content: '<p style="width:20px;height:20px;margin:5px;border-top-left-radius:100%;border-top:2px solid #fff;border-left:2px solid #fff;"/>' }
		],

		labelPosition: [
			{ value: 30, content: 'Close to source' },
			{ value: 0.5, content: 'In the middle' },
			{ value: -30, content: 'Close to target' },
		],

		portMarkup: [{
			value: [{
				tagName: 'rect',
				selector: 'portBody',
				attributes: {
					'width': 20,
					'height': 20,
					'x': -10,
					'y': -10
				}
			}],
			content: 'Rectangle'
		}, {
			value: [{
				tagName: 'circle',
				selector: 'portBody',
				attributes: {
					'r': 10
				}
			}],
			content: 'Circle'
		}, {
			value: [{
				tagName: 'path',
				selector: 'portBody',
				attributes: {
					'd': 'M -10 -10 10 -10 0 10 z'
				}
			}],
			content: 'Triangle'
		}],

	};

	App.config.inspector = {

		'csf.Link': {
			inputs: {
				attrs: {

				},
				labels: {
					type: 'list',
					group: 'connection',
					label: 'connection',
					item: {
						type: 'object',
						properties: {
							attrs: {
								text: {
									text: {
										type: 'text',
										label: 'text',
										defaultValue: 'label',
									},
								},
							},
						}
					}
				}
			},
			groups: {
				connection: {
					label: 'Connection',
				},
			}
		},

		'csf.Start': {
			inputs: {
				attrs: {
					inputparams: {
						type: 'list',
						group: 'params',
						label: 'Input Parameters',
						removeButtonLabel: 'del',
						editButtonLabel: 'edit',
						attrs: {
							label: {
								'data-tooltip': 'Set Parameters for the Start',
								'data-tooltip-position': 'right',
								'data-tooltip-position-selector': '.joint-inspector'
							}
						},
						item: {
							type: 'object',
							properties: {
								paramName: {
									type: 'text',
									label: 'paramName',
									disabled: true,
									// border: false
									// visible: false,
									// defaultValue: 'key',
								},
								paramType: {
									type: 'text',
									visible: false,
									// defaultValue: 'value',
									label: 'paramType',
								},
								paramTypeValue: {
									type: 'text',
									// defaultValue: 'value',
									label: 'paramTypeValue',
									disabled: true,
									// border: false
								}
							}
						}
					}
				}
			},
			groups: {
				params: {
					label: 'Parameters',
				}
			}
		},
		'csf.End': {
			inputs: {
				attrs: {
					outputparam: {
						type: 'list',
						group: 'params',
						label: 'Output Parameters',
						removeButtonLabel: 'del',
						editButtonLabel: 'edit',
						attrs: {
							label: {
								'data-tooltip': 'Set Parameters for the End',
								'data-tooltip-position': 'right',
								'data-tooltip-position-selector': '.joint-inspector'
							}
						},
						item: {
							type: 'object',
							properties: {
								paramName: {
									type: 'text',
									label: 'paramName',
									disabled: true,
									// border: false
									// visible: false,
									// defaultValue: 'key',
								},
								paramType: {
									type: 'text',
									visible: false,
									// defaultValue: 'value',
									label: 'paramType',
								},
								paramTypeValue: {
									type: 'text',
									// defaultValue: 'value',
									label: 'paramTypeValue',
									disabled: true,
									// border: false
								}
							}
						}
					}
				}
			},
			groups: {
				params: {
					label: 'Parameters',
				}
			}
		},
		'csf.Decision': {
			inputs: {
				attrs: {
					text: {
						text: {
							type: 'text',
							label: 'Label',
							group: 'label',
							defaultValue: 'Decision',
							attrs: {
								label: {
									'data-tooltip': 'Set Label for the Decision Node',
									'data-tooltip-position': 'right',
									'data-tooltip-position-selector': '.joint-inspector'
								}
							}
						}
					},
					condition: {
						text: {
							type: 'content-editable',
							group: 'params',
							label: 'condition',
							attrs: {
								label: {
									'data-tooltip': 'Set Condition for the Decision Node',
									'data-tooltip-position': 'right',
									'data-tooltip-position-selector': '.joint-inspector'
								}
							}
						}
					}
				}
			},
			groups: {
				label: {
					label: 'Decision Node',
				},
				params: {
					label: 'Condition',
				}
			}
		},
		'csf.Sync': {
			inputs: {
				attrs: {
					text: {
						text: {
							type: 'text',
							label: 'Label',
							group: 'label',
							defaultValue: 'Sync',
							attrs: {
								label: {
									'data-tooltip': 'Set Label for the Sync Node',
									'data-tooltip-position': 'right',
									'data-tooltip-position-selector': '.joint-inspector'
								}
							}
						}
					},
					nodesetting: {
						flow: {
							type: 'text',
							label: 'Flow',
							group: 'setting',
						},
						interface: {
							type: 'text',
							label: 'Interface',
							group: 'setting',
						},
						method: {
							type: 'text',
							label: 'Method',
							group: 'setting',
						}
					}
				}
			},
			groups: {
				label: {
					label: 'Sync Flow',
				},
				setting: {
					label: 'Choose Flow',
				}
			}
		},
		'csf.Async': {
			inputs: {
				attrs: {
					text: {
						text: {
							type: 'text',
							label: 'Label',
							group: 'label',
							defaultValue: 'Async',
							attrs: {
								label: {
									'data-tooltip': 'Set Label for the Async Node',
									'data-tooltip-position': 'right',
									'data-tooltip-position-selector': '.joint-inspector'
								}
							}
						}
					},
					nodesetting: {
						flow: {
							type: 'text',
							label: 'Flow',
							group: 'setting',
						},
						interface: {
							type: 'text',
							label: 'Interface',
							group: 'setting',
						},
						method: {
							type: 'text',
							label: 'Method',
							group: 'setting',
						}
					}
				}
			},
			groups: {
				label: {
					label: 'Sync Flow',
				},
				setting: {
					label: 'Choose Flow',
				}
			}
		},
		'csf.Service': {
			inputs: {
				attrs: {
					text: {
						text: {
							type: 'text',
							label: 'Label',
							group: 'label',
							defaultValue: 'Service',
							attrs: {
								label: {
									'data-tooltip': 'Set Label for the Service Node',
									'data-tooltip-position': 'right',
									'data-tooltip-position-selector': '.joint-inspector'
								}
							}
						}
					},
					servicesetting: {
						serviceName: {
							type: 'textDialog',
							label: 'Service Name',
							group: 'setting',
							defaultValue: '',
							attrs: {
								label: {
									'data-tooltip': 'Please choose one service',
									'data-tooltip-position': 'right',
									'data-tooltip-position-selector': '.joint-inspector'
								}
							}
						},
						interface: {
							type: 'text',
							label: 'Interface',
							group: 'setting',
							disabled: true
						},
						// method: {
						// 	type: 'text',
						// 	label: 'Method',
						// 	group: 'setting',
						// 	disabled: true
						// },
						desc: {
							type: 'text',
							label: 'Description',
							group: 'setting',
							disabled: true
						},
					},
					inputparams: {
						type: 'serviceInput',
						group: 'params',
						label: 'Input Parameters',
						item: {
							type: 'object',
							properties: {
								paramName: {
									type: 'text',
									label: 'paramName',
									// visible: false,
									disabled: true,
									// border: false
								},
								paramType: {
									type: 'text',
									visible: false,
									label: 'paramType',
									// border: false
								},
								paramTypeValue: {
									type: 'text',
									label: 'paramTypeValue',
									disabled: true,
									// visible: false,
									// border: false
								}
							}
						}
					},
					outputparam: {
						type: 'serviceOutput',
						group: 'params',
						label: 'Output Parameters',
						editButtonLabel: 'edit',
						item: {
							type: 'object',
							properties: {
								paramName: {
									type: 'text',
									label: 'paramName',
									// visible: false,
									disabled: true,
									// border: false
								},
								paramType: {
									type: 'text',
									visible: false,
									label: 'paramType',
									// border: false
								},
								paramTypeValue: {
									type: 'text',
									label: 'paramTypeValue',
									disabled: true,
									// border: false
								}
							}
						}
					}
				}
			},
			groups: {
				label: {
					label: 'Service Node',
				},
				setting: {
					label: 'Service Setting',
				},
				params: {
					label: 'Parameters',
				}
			}
		}
	};

})();
