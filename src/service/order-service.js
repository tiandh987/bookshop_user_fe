var _mm = require('util/mm.js');

var _order = {
    // 获取商品列表
    getProductList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        });
    },
    
    // 提交订单
    createOrder : function(shippingId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/create.do'),
            data    : shippingId,
            success : resolve,
            error   : reject
        });
    },
    
    // 获取订单列表
    getOrderList : function(listParam, resolve, reject){
    	_mm.request({
    		url     : _mm.getServerUrl('/order/list.do'),
            data    : listParam,
    		success : resolve,
    		error   : reject
    	});
    },
     
    // 获取订单详情
    getOrderDetail : function(orderNo, resolve, reject){
    	_mm.request({
    		url     : _mm.getServerUrl('/order/detail.do'),
    		data    : {
                orderNo : orderNo
            },
    		success : resolve,
    		error   : reject
    	});
    },
    
    // 取消订单
    cancelOrder : function(orderNo, resolve, reject){
    	_mm.request({
    		url     : _mm.getServerUrl('/order/cancel.do'),
    		data    : {
    			orderNo : orderNo
    		},
    		success : resolve,
    		error   : reject
    	});
    },
    
    // 确认收货
    confirmReceipt : function(orderNo, resolve, reject){
    	_mm.request({
    		url     : _mm.getServerUrl('/order/confirmReceipt.do'),
    		data    : {
    			orderNo : orderNo
    		},
    		success : resolve,
    		error   : reject
    	});
    },
    
     // 提交评价
    publishAppraise : function(orderNo, productId, rank ,appraise, resolve, reject){
    	_mm.request({
    		url     : _mm.getServerUrl('/appraise/create.do'),
    		data    : {
    			orderId   : orderNo,
                productId : productId,
                grade     : rank,
                text      : appraise
    		},
    		success : resolve,
    		error   : reject 
    	});
    }
}
module.exports = _order;