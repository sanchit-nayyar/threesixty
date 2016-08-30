var ThreeSixty = (function (window) {

	return function (container, options) {
		var self = this;
		var index = 0;

		var loopTimeoutId = null;
		var looping = false;
		var dragOrigin = false;
		var loop = function (reversed = false) {
			reversed ? self.prev() : self.next();

			loopTimeoutId = window.setTimeout(function () {
				loop(reversed);
			}, options.speed);
		};

		options.width = options.width || 300;
		options.height = options.height || 300;
		options.count = options.count || 0;
		options.perRow = options.perRow || 0;
		options.speed = options.speed || 100;
		options.dragTolerance = options.dragTolerance || 10;
		options.draggable = options.draggable || true;
		options.prev = options.prev || false;
		options.next = options.next || false;

		container.style.width = options.width + 'px';
		container.style.height = options.height + 'px';
		container.style.backgroundImage = 'url("' + options.image + '")';
		container.style.backgroundPosition = '0 0';

		if (options.prev) {
			options.prev.addEventListener('mousedown', function (e) {
				e.preventDefault();
				self.play(true);
			});

			options.prev.addEventListener('mouseup', function (e) {
				e.preventDefault();
				self.stop();
			});
		}

		if (options.next) {
			options.next.addEventListener('mousedown', function (e) {
				e.preventDefault();
				self.play();
			});

			options.next.addEventListener('mouseup', function (e) {
				e.preventDefault();
				self.stop();
			});
		}

		self.next = function () {
			index = index + 1 > options.count - 1 ? 0 : index + 1;
			self.update();
		};

		self.prev = function () {
			index = index - 1 < 0 ? options.count - 1 : index - 1;
			self.update();
		};

		self.update = function () {
			container.style.backgroundPositionX = -(index % options.perRow) * options.width + 'px';
			container.style.backgroundPositionY = -Math.floor(index / options.perRow) * options.height + 'px';
		};

		self.play = function (reversed) {
			if (looping) {
				return;
			}

			loop(reversed);
			looping = true;
		};

		self.stop = function () {
			if (!looping) {
				return;
			}
			
			window.clearTimeout(loopTimeoutId);
			looping = false;
		}
	};
} (window));