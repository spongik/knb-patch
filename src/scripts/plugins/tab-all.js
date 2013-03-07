$(function() {

	// Вкладка "всё"
	$('.tabs').find('ul').append('<li><a href="#" class="allShowLink" data-grid="4"><i></i><span>Все</span><b></b></a></li>');
	$('#gridScroll').append('<div class="matrixContainer allShow" data-grid-item="4"></div>')
					.css('width','3840px');
	$('.matrixContainer.allShow').append('<div class="matrixContainer">'+$('.matrixContainer[data-grid-item=1]').html()+'</div>')
								.append('<div class="matrixContainer">'+$('.matrixContainer[data-grid-item=2]').html()+'</div>')
								.append('<div class="matrixContainer">'+$('.matrixContainer[data-grid-item=3]').html()+'</div>');
	$('.tabs a').click(function(){
		if($(this).hasClass('allShowLink')){
		$('#gridScroll, #gridWrapper').animate({
			height:1551
		},2000);
		}else{
			$('#gridScroll, #gridWrapper').animate({
				height:517
			},500);		
		}
	});

});