define("moe/rater/1.1.1/rater-debug", [ "./rater-debug.css" ], function(require, exports, module) {
    var $ = window.jQuery || window.Zepto;
    require("./rater-debug.css");
    var html = '<div class="moekit-star-box"><span class="moekit-star-bg"><em class="moekit-star-front"></em></span></div>';
    var handler = function(options) {
        this.each(function() {
            // default settings
            var settings = {
                enabled: true,
                // is can be selected
                max: 5,
                // how many starts
                value: 3,
                // current value
                width: 22,
                // rater width
                height: 25,
                // rater height,
                onselect: null,
                // when selected
                onhover: null,
                // when hover
                onleave: null
            };
            if (options) {
                $.extend(settings, options);
            }
            var $this = $(this);
            // set rater width
            var $box = $(html).css({
                width: settings.width * settings.max
            });
            var $start = $box.find(".moekit-star-front").css({
                width: settings.width * settings.value
            });
            // min star
            if (settings.min) {
                $start.css({
                    width: settings.width * settings.min
                });
            }
            $this.html($box);
            if (settings.enabled) {
                var render = false;
                $box.mousemove(function(e) {
                    if (!render && settings.value) {
                        this.number = settings.value;
                        render = true;
                    } else {
                        this.number = this.number || 0;
                    }
                    this.hoverNumber = this.hoverNumber || 0;
                    var parentOffset = $(this).offset();
                    var relX = e.pageX - parentOffset.left;
                    var hoverNumber = this.hoverNumber = Math.ceil(relX / 22);
                    // if min is setting
                    if (settings.min && hoverNumber < settings.min) {
                        $box.css({
                            cursor: "text"
                        });
                    } else {
                        $box.css({
                            cursor: "pointer"
                        });
                        $start.css({
                            width: hoverNumber * 22
                        });
                    }
                    settings.onhover && settings.onhover.call($(this), this.hoverNumber, $this);
                }).click(function() {
                    this.number = this.hoverNumber;
                    var _this = this;
                    if (settings.min && _this.number < settings.min) {
                        _this.number = settings.min;
                    }
                    $start.css({
                        width: _this.number * 22
                    });
                    settings.onselect && settings.onselect.call($(this), this.number, $this);
                }).mouseleave(function() {
                    var _this = this;
                    $start.css({
                        width: _this.number * 22
                    });
                    settings.onleave && settings.onleave.call($(this), this.number, this.hoverNumber, $this);
                });
            } else {
                $box.addClass("moekit-star-box-disabled");
            }
        });
    };
    var rater = function(options) {
        return handler.call($(options.target), options);
    };
    module.exports = rater;
});

define("moe/rater/1.1.1/rater-debug.css", [], function() {
    seajs.importStyle(".rater-star{position:relative;list-style:none;margin:0;padding:0;background-repeat:repeat-x;background-position:left top}.rater-star-item,.rater-star-item-current,.rater-star-item-hover{position:absolute;top:0;left:0;background-repeat:repeat-x}.rater-star-item{background-position:-100% -100%}.rater-star-item-hover{background-position:left bottom;cursor:pointer}.moekit-star-box{overflow:hidden;cursor:pointer}.moekit-star-box-disabled{cursor:text}.moekit-star-bg,.moekit-star-front{display:block;overflow:hidden;width:100%;height:20px;background:url(moekit-rater.png) repeat-x 0 -33px;float:left}.moekit-star-front{float:none;background-position:0 -55px}.rater-item{background:url(moerater.png) no-repeat}");
});
