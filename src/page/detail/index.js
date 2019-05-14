require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _product        = require('service/product-service.js');
var _cart           = require('service/cart-service.js');
var templateDetail   = require('./index.string');
var templateAppraiseType = require('./appraise-type.string');
var templateAppraise = require('./appraise.string');

var page = { 
    data : {
        productId : _mm.getUrlParam('productId') || '',
    },
    
    appraiseType : {
    	name : '',
    	appraiseTypeList : [
    		{name : 'all-appraise',   desc : '全部评论'},
    		{name : 'good-appraise',  desc : '好评'},
    		{name : 'mid-appraise',   desc : '中评'},
    		{name : 'bad-appraise',   desc : '差评'}
    	]
    },
    appraiseTypeInit : function(option){
    	//合并选项
    	$.extend(this.appraiseType,option);
    	this.appraiseTypeRender();
    },
    //渲染评价类型
    appraiseTypeRender : function(){
    	//计算active数据
    	for (var i = 0, iLength = this.appraiseType.appraiseTypeList.length; i < iLength; i++) {
    		if (this.appraiseType.appraiseTypeList[i].name === this.appraiseType.name) {
    			this.appraiseType.appraiseTypeList[i].isActive = true;
    		}else{
                this.appraiseType.appraiseTypeList[i].isActive = false;
            }
    	};
    	//渲染list数据
    	var appraiseTypeHtml = _mm.renderHtml(templateAppraiseType, {
    		appraiseTypeList : this.appraiseType.appraiseTypeList
    	});
    	//把html放入容器
    	$('.appraise-type').html(appraiseTypeHtml);
    },
    
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    
    onLoad : function(){
        // 如果没有传productId, 自动跳回首页
        if(!this.data.productId){
            _mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function(){
            var imageUrl   = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        // count的操作
        $(document).on('click', '.p-count-btn', function(){
            var type        = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount     = $('.p-count'),
                currCount   = parseInt($pCount.val()),
                minCount    = 1,
                maxCount    = _this.data.detailInfo.stock || 1;
            if(type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            }
            else if(type === 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        // 加入购物车
        $(document).on('click', '.cart-add', function(){
            _cart.addToCart({
                productId   : _this.data.productId,
                count       : $('.p-count').val()
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(err){
                _mm.errorTips(err.msg);
            });
        });
        //商品详情
        $(document).on('click', '#tab-detail', function(){
            var detailTab = document.getElementById("tab-detail");
            var appraiseTab = document.getElementById("tab-appraise");
            var detailCon = document.getElementById("detail-con");
            var appraiseCon = document.getElementById("appraise-con");
            detailTab.className = "tab-item active";
            appraiseTab.className = "tab-item";
            appraiseCon.style.display='none';
            detailCon.style.display='';
        });
        //商品评价
        $(document).on('click', '#tab-appraise', function(){
            var productId = $(this).attr("productId");
             var detailTab = document.getElementById("tab-detail");
             var appraiseTab = document.getElementById("tab-appraise");
             var detailCon = document.getElementById("detail-con");
             var appraiseCon = document.getElementById("appraise-con");
             detailTab.className = "tab-item";
             appraiseTab.className = "tab-item active";
             detailCon.style.display='none';
             appraiseCon.style.display='';
             
             _this.appraiseTypeInit({
                 name: 'all-appraise'
             });
             
             // 请求商品appraise信息
             _product.getProductAppraise(productId, null, function(res){
                 _this.appraiseFilter(res.data);
                 console.log(res.data);
                 var appraiseHtml = _mm.renderHtml(templateAppraise, res.data);
                 $('.appraise-items').html(appraiseHtml);
             }, function(err){
                 $('.appraise-items').html('<p class="err-tip">该商品暂无评论</p>');
             });
        });
        //商品评价类型切换
        $(document).on('click', '.tab-appraise-type', function(){
            var type = $(this).attr("type");
            var productId = _this.data.productId;
             _this.appraiseTypeInit({
                 name: type
             });
             // all-appraise good-appraise mid-appraise bad-appraise
             if("all-appraise" == type){
                 // 请求商品appraise信息
                 _product.getProductAppraise(productId, null, function(res){
                     _this.appraiseFilter(res.data);
                     var appraiseHtml = _mm.renderHtml(templateAppraise, res.data);
                     $('.appraise-items').html(appraiseHtml);
                 }, function(err){
                     $('.appraise-items').html('<p class="err-tip">该商品暂无评论</p>');
                 });
             }else if("good-appraise" == type){
                 // 请求商品appraise信息
                 _product.getProductAppraise(productId, 3, function(res){
                     _this.appraiseFilter(res.data);
                     var appraiseHtml = _mm.renderHtml(templateAppraise, res.data);
                     $('.appraise-items').html(appraiseHtml);
                 }, function(err){
                     $('.appraise-items').html('<p class="err-tip">该商品暂无评论</p>');
                 });
             }else if("mid-appraise" == type){
                // 请求商品appraise信息
                _product.getProductAppraise(productId, 2, function(res){
                    _this.appraiseFilter(res.data);
                    var appraiseHtml = _mm.renderHtml(templateAppraise, res.data);
                    $('.appraise-items').html(appraiseHtml);
                }, function(err){
                    $('.appraise-items').html('<p class="err-tip">该商品暂无评论</p>');
                });
             }else if("bad-appraise" == type){
                 // 请求商品appraise信息
                 _product.getProductAppraise(productId, 1, function(res){
                     _this.appraiseFilter(res.data);
                     var appraiseHtml = _mm.renderHtml(templateAppraise, res.data);
                     $('.appraise-items').html(appraiseHtml);
                 }, function(err){
                     $('.appraise-items').html('<p class="err-tip">该商品暂无评论</p>');
                 });
             }
        });
    },
    // 加载商品详情的数据
    loadDetail : function(){
        var _this       = this,
            html        = '',
            $pageWrap   = $('.page-wrap');
        // loading
        $pageWrap.html('<div class="loading"></div>');
        // 请求detail信息
        _product.getProductDetail(this.data.productId, function(res){
            _this.filter(res.data);
            // 缓存住detail的数据
            _this.data.detailInfo = res.data;
            // render
            html = _mm.renderHtml(templateDetail, res.data);
            $pageWrap.html(html);
        }, function(err){
            $pageWrap.html('<p class="err-tip">找不到您查找的商品~~~</p>');
        });
    },
    // 数据匹配
    filter : function(data){
        data.subImages = data.subImages.split(',');
    },
    appraiseFilter : function(data){
        for (var i = 0; i < data.list.length; i++) {
            if(3 == data.list[i].grade){
                data.list[i].good = true;
                data.list[i].mid  = false;
                data.list[i].bad  = false;
            }else if(2 == data.list[i].grade){
                data.list[i].good = false;
                data.list[i].mid  = true;
                data.list[i].bad  = false;
            }else if(1 == data.list[i].grade){
                data.list[i].good = false;
                data.list[i].mid  = false;
                data.list[i].bad  = true;
            }
        }
    }
};

$(function(){
    page.init();
})