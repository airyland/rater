/**
 * [x] 1. half star support
 * 2. star image config
 * 3. reset function
 * 4. single star width
 */
var $ = require('jquery');
var Events = require('eventor');
window.__rater_uid = 0;

require.async('./rater.css');
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
        half: false, // if can select half star
        step: 1 // can be 1 or 2
    };

    $.extend(settings, options);

    this.o = settings;

    _this.$targets = $(this.o.target);
    _this.$targets.each(function (index, target) {
        _this._render(target);
        _this._bind(target);
    });

    return _this;
};

// mixin
Events.mixTo(rater);

rater.prototype._render = function (target) {
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
        this.setNumber(settings.min, false);
    }
    if (settings.value && settings.value > settings.min) {
        this.setNumber(settings.value / this.o.step, false);
    }

    if ($this.is('input')) {
        $this.hide().after(this.$box);
    } else {
        $this.html(this.$box);
    }
};

rater.prototype._bind = function (target) {
    var $this = $(target);
    var $box = this.$box;
    var $star = this.$star;
    var settings = this.o;
    var _this = this;
    if (settings.readonly === false) {
        var render = false;
        $box.mousemove(function (e) {
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
            _this.trigger('hover', _this.hoverNumber * _this.o.step, $this);
        }).
            click(function () {
                _this.number = _this.hoverNumber;
                if (settings.min && _this.number < settings.min) {
                    _this.number = settings.min;
                }
                _this.setNumber(_this.number, true);
            }).
            mouseleave(function () {
                _this.setNumber(_this.number, false);
                // leave callback
                _this.trigger('leave', _this.number * _this.o.step, _this.hoverNumber * _this.o.step, $this);
            });
    } else { // disabled
        $box.addClass('moekit-star-box-disabled');
    }

    _this.trigger('init');

    // input value change handler 
    _this.on('select', function (number, $target) {
        if ($target.is('input')) {
            $target.val(number * _this.o.step);
        }
    });

};

rater.prototype.reset = function () {
    return this;
};

rater.prototype.setNumber = function (number, isSet) {
    if (typeof isSet === 'undefined' || isSet === true) {
        this.number = number;
        // select callback
        this.trigger('select', this.number * this.o.step, this.$box);
    }

    this.$star.css({
        width: this.o.width * number
    });
    return this;
};

rater.prototype.setValue = function (value) {
    this.setNumber(value / this.o.step);
};

rater.prototype.getNumber = function () {
    return this.number;
};

rater.prototype._bindClick = function () {

};

rater.prototype.destroy = function () {
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