$.knb.plugins.tabAll = {};

$.knb.plugins.tabAll.async = false;
$.knb.plugins.tabAll.run = function () {

	if ($('.tabs').length > 0) {
		$('.tabs').find('ul')
			.append('<li><a href="#" class="allShowLink" data-grid="4"><i></i><span>Все</span><b></b></a></li>');
		
		$('#gridScroll')
			.append('<div class="matrixContainer allShow" data-grid-item="4"></div>')
			.css('width','3840px');
		
		$('.matrixContainer.allShow')
			.append($('<div class="matrixContainer"></div>').append($('.matrixContainer[data-grid-item=3]').clone(true)))
			.append($('<div class="matrixContainer"></div>').append($('.matrixContainer[data-grid-item=2]').clone(true)))
			.append($('<div class="matrixContainer"></div>').append($('.matrixContainer[data-grid-item=1]').clone(true)));
		
		$('.tabs a').click(function() {
			if ($(this).hasClass('allShowLink')) {
				$('#gridScroll, #gridWrapper').height(1551);
			} else {
				$('#gridScroll, #gridWrapper').height(517);
			}
		});
	}

};