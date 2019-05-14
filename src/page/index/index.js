require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var templateBanner  = require('./banner.string');
var templateFloor   = require('./floor.string');
var _mm = require('util/mm.js');

var floorList = {
    floor1List : [
        {categoryId : "", floorImg : require('../../image/floor/floor1-1.jpg'), descText : "21世纪的定位：定位之父重新定义“定位”", price : "71.10"},
        {categoryId : "", floorImg : require('../../image/floor/floor1-2.jpg'), descText : "冯唐 成事（专享送冯唐手书成事红包，以麦肯锡的方法论，解读曾国藩的成事学）", price : "49.00"},
        {categoryId : "", floorImg : require('../../image/floor/floor1-3.jpg'), descText : "Java从入门到精通（第5版）", price : "55.10"},
        {categoryId : "", floorImg : require('../../image/floor/floor1-4.jpg'), descText : "小猛犸童书：深见春夫幻想图画书(平装套装共4册) [3-6岁]", price : "77.40"},
        {categoryId : "", floorImg : require('../../image/floor/floor1-5.jpg'), descText : "局外人(如果你在人群中感到格格不入，一定要读《局外人》 ！精装插图珍藏版！诺奖作品，此生必读)(读客经典文库)", price : "37.00"}
    ],
    floor2List : [
        {categoryId : "", floorImg : require('../../image/floor/floor2-1.jpg'), descText : "浮生六记（畅销250万册，全译本，蝉联京东图书2017，2018年度十大畅销书）", price : "25.00"},
        {categoryId : "", floorImg : require('../../image/floor/floor2-2.jpg'), descText : "自在独行：贾平凹的独行世界", price : "22.20"},
        {categoryId : "", floorImg : require('../../image/floor/floor2-3.jpg'), descText : "余华作品：活着", price : "25.20"},
        {categoryId : "", floorImg : require('../../image/floor/floor2-4.jpg'), descText : "小王子（畅销300万册，法国“圣埃克苏佩里基金会”官方认可简体中文版）", price : "33.20"},
        {categoryId : "", floorImg : require('../../image/floor/floor2-5.jpg'), descText : "杀死一只知更鸟 [To Kill a Mockingbird]", price : "44.20"}
    ],
    floor3List : [
        {categoryId : "", floorImg : require('../../image/floor/floor3-1.jpg'), descText : "东野圭吾：解忧杂货店 [ナミヤ雑貨店の奇蹟]", price : "36.20"},
        {categoryId : "", floorImg : require('../../image/floor/floor3-2.jpg'), descText : "岛上书店（每个人的生命中，都有无比艰难的那一年，将人生变得美好而辽阔。加·泽文感动全球千万读者的治愈小说！", price : "29.00"},
        {categoryId : "", floorImg : require('../../image/floor/floor3-3.jpg'), descText : "摆渡人　【荐书联盟推荐】 [Ferryman]", price : "29.90"},
        {categoryId : "", floorImg : require('../../image/floor/floor3-4.jpg'), descText : "追风筝的人 [The Kite Runner]", price : "20.80"},
        {categoryId : "", floorImg : require('../../image/floor/floor3-5.jpg'), descText : "我们仨/杨绛作品", price : "15.20"}
    ]
};
    


$(function() {
	// 渲染banner的html
	var bannerHtml = _mm.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
    
    var floor1Html = _mm.renderHtml(templateFloor, {
        floorList : floorList.floor1List
    });
    $("#floor1").html(floor1Html);
    
    var floor2Html = _mm.renderHtml(templateFloor, {
        floorList : floorList.floor2List
    });
    $('#floor2').html(floor2Html);
    
    var floor3Html = _mm.renderHtml(templateFloor, {
        floorList : floorList.floor3List
    });
    $('#floor3').html(floor3Html);
});