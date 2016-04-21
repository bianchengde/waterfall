$(document).ready(function(){
	$(window).on("load",function(){
		imgLocation();
		var dataImg={"data":[{"src":"img/pic1.jpg"},{"src":"img/pic2.jpg"},{"src":"img/pic3.jpg"},{"src":"img/pic4.jpg"},{"src":"img/pic5.jpg"},{"src":"img/pic6.jpg"}]}
		window.onscroll=function(){
			if(scrollside()){
				$.each(dataImg.data, function(index,value) {
					var box=$("<div>").addClass("box").appendTo("#container");
					var content=$("<div>").addClass("content").appendTo(box);
					var img=$("<img>").attr("src",$(value).attr("src")).appendTo(content);
				});
				imgLocation();
			}
		};
	});
});
/*让图片排到高度最小的图片后面*/
function imgLocation(){
	var box =$(".box");
	var boxWidth=box.eq(0).width();
	var num=Math.floor($(window).width()/boxWidth);
	var boxArr=[];
	box.each(function(index,value){
		var boxHeight=box.eq(index).height();
		if(index<num){
			boxArr[index]=boxHeight;
		}
		else
		{
			var minboxHeight=Math.min.apply(null,boxArr);
			var minboxIndex=$.inArray(minboxHeight,boxArr);
			$(value).css({
				"position":"absolute",
				"top":minboxHeight,
				"left":box.eq(minboxIndex).position().left
			});
			boxArr[minboxIndex]+=box.eq(index).height();
		}
	});
}
/*监听滚动条*/
function scrollside(){
	var box =$(".box");
	var lastboxHeight=box.last().get(0).offsetTop+Math.floor(box.last().height()/2);
	var documentHeight=$(document).width();
	var scrollHeight=$(window).scrollTop();
	return (lastboxHeight<scrollHeight+documentHeight)?true:false;
}
