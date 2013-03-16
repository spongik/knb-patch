$.knb = {};
$.knb.fn = {};
$.knb.vars = {};
$.knb.plugins = {};

$.knb.vars.storageKeys = {};

$.knb.fn.isInjected = function () {
	return $('#injected').length > 0;
};

$.knb.vars._uniqueId = 1;
$.knb.fn.getNextUniqueId = function () {
	return $.knb.vars._uniqueId++;
};

$.knb.vars._watchData = {};
$.fn.extend({
	watch: function (cb, data, delayed) {
		$this = $(this);

		if ($this.length == 0) {
			$this = $([$this]);
		}
		
		$this.each(function(i, item) {
			$item = $(item);
			var onDOMSubtreeModified = function(ev) {
				data = $.knb.vars._watchData[ev.data];
				data.context.unbind('DOMSubtreeModified', onDOMSubtreeModified);
				
				cbWrapped = function() {
					if (cb.call(data.context[0], ev, data.data)) {
						data.context.bind('DOMSubtreeModified', data.id, onDOMSubtreeModified);
					}
					data.timer = null;
				};
				
				if (data.timer == null && !delayed) {
					cbWrapped();
					cbWrapped = function() {};
				}
				
				clearTimeout(data.timer);
				data.timer = setTimeout(cbWrapped, 100);
			}
			
			var id = $.knb.fn.getNextUniqueId();
			$.knb.vars._watchData[id] = {
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