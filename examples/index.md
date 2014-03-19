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
    },
    image:'http://localhost:8000/src/star.gif'
}
$('#demo5').rater(options);
});
````
