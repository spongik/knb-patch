$.knb.plugins.tabAll = function () {
	$('.commentsAnchor').click(function(){
		var currShoutLink = $(this).attr('href');
		var currShoutId = currShoutLink.substr(13);
		alert(currShoutId);
		$(this).attr('href','#');
		$('body').append('<div class="shoutLightbox" style="display:none; position:fixed; top:200px; left:45%; background:#fff; width:400px; height:200px;"></div>')
		$.get('http://kanobu.ru/shouts/?cry='+currShoutId, function(data){
			$('.shoutLightbox').append($(data.list).find('.showAllAnswers').html());
			$('.shoutLightbox').fadeIn('slow');
		});
	});
};