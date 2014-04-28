define("moe/rater/1.1.0/rater-debug", [], function(require, exports, module) {
    var $ = window.jQuery || window.Zepto;
    var style = ".rater-star{position:relative;list-style:none;margin:0;padding:0;background-repeat:repeat-x;background-position:left top}.rater-star-item,.rater-star-item-current,.rater-star-item-hover{position:absolute;top:0;left:0;background-repeat:repeat-x}.rater-star-item{background-position:-100% -100%}.rater-star-item-hover{background-position:left bottom;cursor:pointer}.rater-star-item-current{background-position:left center}";
    $('<style type="text/css">' + style + "</style>").appendTo("head");
    var image = require.resolve("./star.png#");
    // Zepto doesnot support prevAll
    $.fn.prevAll = $.fn.prevAll || function(s) {
        var $els = $(), $el = this.prev();
        while ($el.length) {
            if (typeof s === "undefined" || $el.is(s)) $els = $els.add($el);
            $el = $el.prev();
        }
        return $els;
    };
    $.fn.rater = function(options) {
        return this.each(function() {
            // 默认参数
            var settings = {
                enabled: true,
                url: "",
                method: "post",
                min: 1,
                max: 3,
                step: 1,
                value: null,
                after_click: null,
                before_ajax: null,
                after_ajax: null,
                image: image,
                width: 25,
                height: 25
            };
            // 自定义参数
            if (options) {
                $.extend(settings, options);
            }
            // 主容器
            var content = $('<ul class="rater-star"></ul>');
            content.css("background-image", "url(" + settings.image + ")");
            content.css("height", settings.height);
            content.css("width", settings.width * ((settings.max - settings.min) / settings.step + 1));
            // 当前选中的
            var item = $('<li class="rater-star-item-current"></li>');
            item.css("background-image", "url(" + settings.image + ")");
            item.css("height", settings.height);
            item.css("width", 0);
            item.css("z-index", settings.max / settings.step + 1);
            if (settings.value) {
                item.css("width", ((settings.value - settings.min) / settings.step + 1) * settings.width);
            }
            content.append(item);
            // 星星
            if (settings.enabled) {
                // 是否能更改
                for (var value = settings.min; value <= settings.max; value += settings.step) {
                    item = $('<li class="rater-star-item"></li>');
                    item.attr("title", value);
                    item.css("height", settings.height);
                    item.css("width", settings.width * ((value - settings.min) / settings.step + 1));
                    item.css("z-index", (settings.max - value) / settings.step + 1);
                    item.css("background-image", "url(" + settings.image + ")");
                    content.append(item);
                }
            }
            if (settings.enabled) {
                content.mouseover(function() {
                    $(this).find(".rater-star-item-current").hide();
                }).mouseout(function() {
                    $(this).find(".rater-star-item-current").show();
                });
            }
            // 添加鼠标悬停/点击事件
            content.find(".rater-star-item").mouseover(function() {
                $(this).attr("class", "rater-star-item-hover");
            }).mouseout(function() {
                $(this).attr("class", "rater-star-item");
            }).click(function() {
                $(this).prevAll(".rater-star-item-current").css("width", $(this).width());
                var star_count = (settings.max - settings.min) / settings.step + 1;
                var current_number = $(this).width() / settings.width;
                var current_value = settings.min + (current_number - 1) * settings.step;
                var data = {
                    value: current_value,
                    number: current_number,
                    count: star_count,
                    min: settings.min,
                    max: settings.max
                };
                // 处理回调事件
                if (typeof settings.after_click == "function") {
                    settings.after_click(data, $(this));
                }
                // 处理ajax调用
                if (settings.url) {
                    $.ajax({
                        data: data,
                        type: settings.method,
                        url: settings.url,
                        beforeSend: function() {
                            if (typeof settings.before_ajax == "function") {
                                settings.before_ajax(data);
                            }
                        },
                        success: function(ret) {
                            if (typeof settings.after_ajax == "function") {
                                settings.after_ajax(ret);
                            }
                        }
                    });
                }
            });
            $(this).html(content);
        });
    };
    module.exports = $;
});
