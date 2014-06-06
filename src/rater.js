/**
 * [x] 1. half star support
 * 2. star image config
 * 3. reset function
 * 4. single star width
 */
var $ = require('jquery');
var Events = require('events');
window.__rater_uid = 0;

require('./rater.css');
var html = '<div class="moekit-star-box"><span class="moekit-star-bg"><em class="moekit-star-front"></em></span></div>';

function rater(options) {
    var _this = this;
    // default settings
    var settings = {
        readonly: false, // is can be selected
        max: 5, // how many starts
        value: 3, // current value
        width: 22, // rater width
        height: 25, // rater height,
        onselect: null, // when selected
        onhover: null, // when hover
        onleave: null, // when leave
        half: false // if can select half star
    };

    $.extend(settings, options);

    this.o = settings;

    _this.$targets = $(this.o.target);
    _this.$targets.each(function(index, target) {
        _this._render(target);
        _this._bind(target);
    });

    return _this;
};

// mixin
Events.mixTo(rater);

rater.prototype._render = function(target) {
    window.__rater_uid++;
    var settings = this.o;
    var $this = $(target);
    // set rater width
    this.$box = $(html).css({
        width: settings.width * settings.max
    }) //.addClass('rater-target-' + window.__rater_uid);
    this.$star = this.$box.find('.moekit-star-front').css({
        width: settings.width * settings.value
    });
    // min star
    if (settings.min) {
        this.setNumber(settings.min);
    }
    if (settings.value && settings.value > settings.min) {
        this.setNumber(settings.value);
    }

    if ($this.is('input')) {
        $this.hide().after(this.$box);
    } else {
        $this.html(this.$box);
    }
};

rater.prototype._bind = function(target) {
    var $this = $(target);
    var $box = this.$box;
    var $star = this.$star;
    var settings = this.o;
    var _this = this;
    if (settings.readonly === false) {
        var render = false;
        $box.mousemove(function(e) {
            if (!render && settings.value) {
                _this.number = settings.value;
                render = true;
            } else {
                _this.number = _this.number || 0;
            }
            _this.hoverNumber = _this.hoverNumber || 0;

            var parentOffset = $(this).offset();
            var relX = e.pageX - parentOffset.left;
            var hoverNumber = _this.hoverNumber = caculateNumber(relX / settings.width, settings.half);
            // if min is setting
            if (settings.min && hoverNumber < settings.min) {
                $box.css({
                    cursor: 'text'
                });
            } else {
                $box.css({
                    cursor: 'pointer'
                });
                _this.setNumber(hoverNumber, false);
            }
            // hover callback
            settings.onhover && settings.onhover.call($(this), _this.hoverNumber, $this);
            _this.trigger('hover', _this.hoverNumber, $this);
        }).
        click(function() {
            _this.number = _this.hoverNumber;
            if (settings.min && _this.number < settings.min) {
                _this.number = settings.min;
            }
            _this.setNumber(_this.number);
            // select callback
            settings.onselect && settings.onselect.call($(this), _this.number, $this);
            _this.trigger('select', _this.number, $this);
        }).
        mouseleave(function() {
            _this.setNumber(_this.number);
            // leave callback
            settings.onleave && settings.onleave.call($(this), _this.number, _this.hoverNumber, $this);
            _this.trigger('leave', _this.number, _this.hoverNumber, $this);
        });
    } else { // disabled
        $box.addClass('moekit-star-box-disabled');
    }

    _this.trigger('init');

    // input value change handler 
    _this.on('select', function(number, $target) {
        if ($target.is('input')) {
            $target.val(number);
        }
    });

};

rater.prototype.reset = function() {
    return this;
};

rater.prototype.setNumber = function(number, isSet) {
    if (isSet === true) {
        this.number = number;
    }

    this.$star.css({
        width: this.o.width * number
    });
    return this;
};

rater.prototype.getNumber = function() {
    return this.number;
};

rater.prototype._bindClick = function() {

};

rater.prototype.destroy = function() {
    return this;
};

function caculateNumber(number, isHalf) {
    if (!isHalf) {
        return Math.ceil(number);
    } else {
        var no = parseInt(number),
            point = number - no;
        if (point <= 0.5) {
            return no + 0.5;
        } else {
            return no + 1;
        }
    }
};

module.exports = rater;