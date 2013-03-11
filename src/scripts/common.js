$.knb = {};
$.knb.storageKeys = {};
$.knb.fn = {};
$.knb.vars = {};
$.knb.plugins = {};
$.knb.watchData = {};
$.knb.uniqueId = 1;

$.knb.fn.isInjected = function () {
	return $('#injected').length > 0;
};

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
				data.context.unbind('DOMSubtreeModified', onDOMSubtreeModified);
				
				cbWrapped = function() {
					if (cb.call(data.context[0], ev, data.data)) {
						data.context.bind('DOMSubtreeModified', data.id, onDOMSubtreeModified);
					}
					data.timer = null;
				};
				
				if (data.timer == null) {
					cbWrapped();
					cbWrapped = function() {};
				}
				
				clearTimeout(data.timer);
				data.timer = setTimeout(cbWrapped, 100);
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