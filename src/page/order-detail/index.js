require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var templateOrderDetail = require('./index.string');

// page 逻辑部分
var page = {
	data: {
		orderNumber : _mm.getUrlParam('orderNumber')
	},
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function() {
		// 初始化左侧菜单
		navSide.init({
			name: 'order-list'
		});
		// 加载订单详细信息
		this.loadOrderDetail();
	},
	bindEvent: function() {
        var _this = this;
        // 取消订单
        $(document).on('click', '.order-cancel', function() {
            if(window.confirm('确定要取消订单吗？')){
                _order.cancelOrder(_this.data.orderNumber, function(res){
                	_mm.successTips("该订单取消成功");
                	_this.loadOrderDetail();
                }, function(err){
                	_mm.errorTips(err.msg);
                });
            }
        });
        
        // 确认收货
        $(document).on('click', '.confirmReceipt', function() {
            $(".close").click();
            _order.confirmReceipt(_this.data.orderNumber, function(res){
                _mm.successTips("完成收货，评价一下购买的商品吧！");
            	_this.loadOrderDetail();
            }, function(err){
            	_mm.errorTips(err.msg);
            });
        });
        
        // 星级评价-差评
        $(document).on('click', '.bad', function() {
            var productId = $(this).attr("productId");
            var badSpan = document.getElementById("bad-" + productId);
            var midSpan = document.getElementById("mid-" + productId);
            var greatSpan = document.getElementById("great-" + productId);
            badSpan.className = "glyphicon glyphicon-star-empty active";
            midSpan.className = "glyphicon glyphicon-star-empty";
            greatSpan.className = "glyphicon glyphicon-star-empty";
            $("#one-"+productId).click();
        });
        // 星级评价-中评
        $(document).on('click', '.mid', function() {      
            var productId = $(this).attr("productId");
            var badSpan = document.getElementById("bad-" + productId);
            var midSpan = document.getElementById("mid-" + productId);
            var greatSpan = document.getElementById("great-" + productId);
            badSpan.className = "glyphicon glyphicon-star-empty active";
            midSpan.className = "glyphicon glyphicon-star-empty active";
            greatSpan.className = "glyphicon glyphicon-star-empty";
            $("#two-"+productId).click();
        });
        // 星级评价-好评
        $(document).on('click', '.great', function() {
            var productId = $(this).attr("productId");
            var badSpan = document.getElementById("bad-" + productId);
            var midSpan = document.getElementById("mid-" + productId);
            var greatSpan = document.getElementById("great-" + productId);
            badSpan.className = "glyphicon glyphicon-star-empty active";
            midSpan.className = "glyphicon glyphicon-star-empty active";
            greatSpan.className = "glyphicon glyphicon-star-empty active";
            $("#three-"+productId).click();
        });
        // 评价提交
        $(document).on('click', '.btn-publish', function() {
            // 获取订单No
            var orderNo= document.getElementById("orderNo").innerText;
            //获取商品Id
            var productId = $(this).attr("productId");
            //获取评价等级 1：差评 2：中评 3：好评
            var rank = $('input[name="appraise"]:checked').val(); 
            //获取评价内容
            var appraise = document.getElementById("appraise-text-" + productId).value;
            console.log(orderNo,productId,rank,appraise);
            //调用接口传入数据库
            _order.publishAppraise(orderNo, productId, rank ,appraise, function(res){
                $(".close").click();
                _mm.successTips("评价完成");
            	_this.loadOrderDetail();
            }, function(err){
            	_mm.errorTips(err.msg);
            });
        });
	},

	// 加载订单详细信息
	loadOrderDetail: function() {
		var _this = this,
			orderDetailHtml = '',
			$content = $('.content');
        $content.html(orderDetailHtml);
		_order.getOrderDetail(this.data.orderNumber, function(res) {
            // 数据的适配
            _this.dataFilter(res.data);
			// 渲染页面
            // console.log(res.data);
			orderDetailHtml = _mm.renderHtml(templateOrderDetail, res.data);
			$content.html(orderDetailHtml);
		}, function(err) {
			content.html('<p class="err-tip">' + err.msg + '</p>');
		});
	},
    
    // 数据的适配
    dataFilter : function(data){
        data.needPay        = data.status == 10;//去支付
        data.isCancelable   = data.status == 10;//取消订单
        data.confirmReceipt = data.status == 40;//等待客户收货
        data.isAppraise     = data.status == 50 | 60;//等待客户评价
    }
};

$(function() {
	page.init();
});
