var _mm = require('util/mm.js');

var _product = {
    // 获取商品列表
    getProductList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 获取商品详细信息
    getProductDetail : function(productId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 获取商品评价信息
    getProductAppraise : function(productId, grade, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/appraise/query_appraise_model.do'),
            data    : {
                productId : productId,
                grade : grade,
                pageNum : 1,
                pageSize : 10
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _product;