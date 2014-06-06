# 方法 && 事件

---

````html
<div class="moekit-star-6"></div>
````
````javascript
seajs.use('index', function(Rater){
var rater = new Rater({
    target:'.moekit-star-6',
    min:1.5,
    max:20,
    value:4,
    half:true
}).on('all',function(event,a,b){
    console.log(event,a,b);
})
});
````