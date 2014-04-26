# 支持Zepto

---

因为不会有同时使用jQuery和Zepto的场景存在，当需要在WAP上使用时，请使用seajs的`alias`对`$`进行配置。

````html
<div id="demo5"></div>
<input type="text" />
````

````javascript

seajs.config({
    alias: {
         "$": 'gallery/zepto/1.1.3/zepto'
    }
});

seajs.use('rater', function($){
    console.log($);
    var options = {
    after_click : function(ret) {
        $('#demo5 + input').val(ret.number);
    }
}
$('#demo5').rater(options);
});
````
