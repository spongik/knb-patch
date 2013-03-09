$.knb = {};
$.knb.watchData = {};
$.knb.uniqueId = 1;

$.fn.extend({
    getNextUniqueId: function () {
        return $.knb.uniqueId++;
    }
});

$.fn.extend({
    watch: function (cb, data) {	
        $this = $(this);

		if ($this.length == 0) {
			$this = $([$this]);
		}
		
		$this.each(function(i, item) {
			$item = $(item);
			var onDOMSubtreeModified = function(ev) {
				data = $.knb.watchData[ev.data];		
				clearTimeout(data.timer);
				data.context.unbind('DOMSubtreeModified', onDOMSubtreeModified);				
				data.timer = setTimeout(function() {
					if (cb.call(data.context[0], ev, data.data)) {
						data.context.bind('DOMSubtreeModified', data.id, onDOMSubtreeModified);
					}
				}, 100);
			}
			
			var id = $.fn.getNextUniqueId();
			$.knb.watchData[id] = {
				id: id,
				data: data,
				context: $item,
				timer: null
			};
			$item.bind('DOMSubtreeModified', id, onDOMSubtreeModified);
		});
		
		return $this;	
    }
});

$(function() {

	// common stuff here

});