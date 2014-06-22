# 方法 && 事件

---

````html
<div class="moekit-star-6"></div>
<span id="set6">设为6星</span>
<span id="set8">设为8星</span>
<span id="set60">设为6星</span>
<span id="set80">设为8星</span>
````
````javascript
seajs.use(['index','jquery'], function(Rater,$){
var rater = new Rater({
    target:'.moekit-star-6',
    min:1.5,
    max:20,
    value:4,
    half:true,
    step:2
}).on('all',function(event,a,b){
    console.log(event,a,b);
});

$('#set6').click(function(){
    rater.setNumber(6);
});

$('#set8').click(function(){
    rater.setNumber(8);
});

$('#set60').click(function(){
    rater.setValue(6);
});

$('#set80').click(function(){
    rater.setValue(8);
});


});
````