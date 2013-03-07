jQuery.fn.watch = function( cb ) {
	var timer = null;
	var cleaner = null;

	timer = setInterval(function() {
		cb(function() {
			timer && clearInterval(timer);
			cleaner && clearTimeout(cleaner);
		});
	}, 20);
	cleaner = setTimeout(function() {
		timer && clearInterval(timer);
	}, 5000);
};

$(function() {

	// change background color and remove link
	$('.screenGlideContent')
		.css('background-image', 'url("' + chrome.extension.getURL('bg.jpg') + '")')
		.html('');
		
	// refresh comments
	var $refresh = $('<a href="#" id="refresh-comments" class="wrapBtnTxt">Обновить комментарии</a>');
	$refresh.click(function(ev) {
		url = $('#comments .showMore').data('url').replace(/max_id=\d+&/g, "max_id=9999999999&");		
		$('#comments .showMore').attr('data-url', url);
		$('#comments .comment').attr('old', '1');
		$.fn.watch(function(clean) {
			$comments = $('#comments .comment[old!=1]');
			if  ($comments.length > 0) {
				clean && clean();
				$('#comments .comment[old=1]').remove();
				document.location.replace('#refresh-comments');
			}
		});
		$('#comments .showMore, #comments .showMore .wrapBtnTxt').trigger('click');
		
		ev.preventDefault();
		return false;
	});
	$('#comments .showMore').length > 0 && $refresh.insertBefore($('.writeComment'));
	$refresh.wrap('<div id="refresh-comments-wrap"></div>');
	
	// comments highlight
	var bindComments = function(clean) {
		$comments = $('#comments .comment[binded!=1]');
		if  ($comments.length > 0) {
			clean && clean();
			$comments
				.attr('binded', '1')
					.hover(function (ev) {
					$comment = $(this);
					if ($comment.has('.whom')) {
						whom = $('.whom', $comment).attr('href');
						$('#comments .comment .userNamesBlock .userName[href="' + whom + '"]').closest('.comment')
							.css('background', 'rgba(204,1,0,0.1)');
					}
					who = $('.userNamesBlock .userName', $comment).attr('href');
					$('#comments .comment .userNamesBlock .userName[href="' + who + '"]').closest('.comment').not($comment)
						.css('background', 'rgba(0,91,217,0.1)');
				}, function (ev) {
					$('#comments .comment')
						.css('background', 'transparent');
				});
		}
	};
	$('#comments .showMore').click(function() {
		$.fn.watch(bindComments);
	});
	bindComments();
	
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