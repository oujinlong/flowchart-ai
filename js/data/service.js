/**
 * Created by wendyliu on 2018/6/5.
 */
var App = App || {};
App.config = App.config || {};

(function() {

	'use strict';

	App.config.service = {
		queryTable: [{
			method: 'subscribeBundleOffer',
			class: 'com.aii.crm.eshop.basket.controller.ShoppingCartController',
			status: 'Online'
		},{
			method: 'addBasket',
			class: 'com.aii.crm.eshop.basket.controller.ShoppingCartController',
			status: 'Online'
		},{
			method: 'deleteBasketItem',
			class: 'com.aii.crm.eshop.basket.controller.ShoppingCartController',
			status: 'Online'
		},{
			method: 'getBasketQuantity',
			class: 'com.aii.crm.eshop.basket.controller.ShoppingCartController',
			status: 'Online'
		},{
			method: 'clearBasket',
			class: 'com.aii.crm.eshop.basket.controller.ShoppingCartController',
			status: 'Online'
		},{
			method: 'sendBasket',
			class: 'com.aii.crm.eshop.basket.controller.ShoppingCartController',
			status: 'Online'
		},{
			method: 'saveBasketAddress',
			class: 'com.aii.crm.eshop.basket.controller.ShoppingCartController',
			status: 'Online'
		},{
			method: 'combineBasket',
			class: 'com.aii.crm.eshop.basket.controller.ShoppingCartController',
			status: 'Online'
		},{
			method: 'setBasketPayDetail',
			class: 'com.aii.crm.eshop.basket.controller.ShoppingCartController',
			status: 'Online'
		},{
			method: 'setCartPayMethod',
			class: 'com.aii.crm.eshop.basket.controller.ShoppingCartController',
			status: 'Online'
		}],
		queryDialog: [{
			serviceName: 'checkOffer',
			domain: 'product',
			interface: 'com.aii.crm.product.api',
			desc: 'checkOffer',
			inputparams: [{
				paramName: 'offerList',
				paramType: 'simple',
				paramTypeValue: 'java.lang.String',
			}],
			outputparam: {
				paramName: 'checkResp',
				paramType: 'POJO',
				paramTypeValue: 'com.aii.crm.common.persistence.BaseResponse',
			}
		},{
			serviceName: 'checkCustomer',
			domain: 'customer',
			interface: 'com.aii.crm.cust.api',
			desc: 'checkCustomer',
			inputparams: [{
				paramName: 'customerId',
				paramType: 'simple',
				paramTypeValue: 'java.lang.String',
			},],
			outputparam: {
				paramName: 'checkResp',
				paramType: 'POJO',
				paramTypeValue: 'com.aii.crm.common.persistence.BaseResponse',
			}
		},{
			serviceName: 'checkLogistics',
			domain: 'address',
			interface: 'com.aii.crm.address.api',
			desc: 'checkLogistics',
			inputparams: [{
				paramName: 'deliveryDTO',
				paramType: 'POJO',
				paramTypeValue: 'com.aii.crm.eshop.persistence.ShoppingCartDeliveryDTO',
			},],
			outputparam: {
				paramName: 'checkResp',
				paramType: 'POJO',
				paramTypeValue: 'com.aii.crm.common.persistence.BaseResponse',
			}
		},{
			serviceName: 'sync2Provision',
			domain: 'shop',
			interface: 'com.aii.crm.eshop.api',
			desc: 'sync2Provision',
			inputparams: [{
				paramName: 'orderId',
				paramType: 'simple',
				paramTypeValue: 'java.lang.String',
			},],
			outputparam: {
				paramName: 'profileResp',
				paramType: 'POJO',
				paramTypeValue: 'com.aii.crm.eshop.persistence.OseProfileDto',
			}
		},{
			serviceName: 'sync2ERP',
			domain: 'erp',
			interface: 'com.aii.crm.erp.api',
			desc: 'sync2ERP',
			inputparams: [{
				paramName: 'orderId',
				paramType: 'simple',
				paramTypeValue: 'java.lang.String',
			},],
			outputparam: {
				paramName: 'profileResp',
				paramType: 'POJO',
				paramTypeValue: 'com.aii.crm.eshop.persistence.OseProfileDto',
			}
		},{
			serviceName: 'confrimOrder',
			domain: 'shop',
			interface: 'com.aii.crm.eshop.api',
			desc: 'confrimOrder',
			inputparams: [{
				paramName: 'orderId',
				paramType: 'simple',
				paramTypeValue: 'java.lang.String',
			},],
			outputparam: {
				paramName: 'profileResp',
				paramType: 'POJO',
				paramTypeValue: 'com.aii.crm.eshop.persistence.OseProfileDto',
			}
		},{
			serviceName: 'sync2Billing',
			domain: 'shop',
			interface: 'com.aii.crm.eshop.api',
			desc: 'sync2Billing',
			inputparams: [{
				paramName: 'orderId',
				paramType: 'simple',
				paramTypeValue: 'java.lang.String',
			},],
			outputparam: {
				paramName: '',
				paramType: '',
				paramTypeValue: '',
			}
		},{
			serviceName: 'placeOrder',
			domain: 'shop',
			interface: 'com.aii.crm.eshop.api',
			desc: 'placeOrder',
			inputparams: [{
				paramName: 'orderId',
				paramType: 'simple',
				paramTypeValue: 'java.lang.String',
			},],
			outputparam: {
				paramName: '',
				paramType: '',
				paramTypeValue: '',
			}
		},{
			serviceName: 'clearBasket',
			domain: 'shop',
			interface: 'com.aii.crm.eshop.api',
			desc: 'clearBasket',
			inputparams: [{
				paramName: 'basketId',
				paramType: 'simple',
				paramTypeValue: 'java.lang.String',
			},],
			outputparam: {
				paramName: '',
				paramType: '',
				paramTypeValue: '',
			}
		},{
			serviceName: 'getProfileByParty',
			domain: 'shop',
			interface: 'com.aii.crm.eshop.api',
			desc: 'getProfileByParty',
			inputparams: [{
				paramName: 'partyId',
				paramType: 'simple',
				paramTypeValue: 'java.lang.String',
			},],
			outputparam: {
				paramName: 'profileResp',
				paramType: 'POJO',
				paramTypeValue: 'com.aii.crm.eshop.persistence.OseProfileDto',
			}
		},{
			serviceName: 'getProfileByProfileId',
			domain: 'shop',
			interface: 'com.aii.crm.eshop.api',
			desc: 'getProfileByProfileId',
			inputparams: [{
				paramName: 'profileId',
				paramType: 'simple',
				paramTypeValue: 'java.lang.String',
			},],
			outputparam: {
				paramName: 'profileResp',
				paramType: 'POJO',
				paramTypeValue: 'com.aii.crm.eshop.persistence.OseProfileDto',
			}
		}]
	};
})();