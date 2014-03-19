# 演示文档

---

````html
<div id="demo5"></div>
<input type="text" />
````

````javascript
seajs.use('rater', function($){
    var options = {
    after_click : function(ret) {
        $('#demo5 + input').val(ret.number);
    }
}
$('#demo5').rater(options);
});
````
