# jQuery使用

---

## 可选择
````html
<div class="moekit-star">
    <div id="demo5" class="moekit-star-1"></div>
    <label>选择</label><input class="select" type="text" />
    <label>经过</label><input class="hover" type="text" />
    <label>离开</label><input class="leave" type="text" />
</div>
````
````javascript
seajs.use('index', function(rater) {
    new rater({
        target: '.moekit-star-1',
        min: 1,
        max: 5,
        half: true,
        step:2
    }).on('select', function(number, $this) {
        $this.closest('.moekit-star').find('input.select').val(number);
    }).on('leave', function(number, hoverNumber, $this) {
        $this.closest('.moekit-star').find('input.leave').val(number + ' ' + hoverNumber);
    }).on('hover', function(number, $this) {
        $this.closest('.moekit-star').find('input.hover').val(number);
    });
});
````


## 不可选择
````html
<div class="moekit-star-2"></div>
````
````javascript
seajs.use('index', function(rater){
new rater({
    target:'.moekit-star-2',
    readonly:true,
    value:2
});
});
````

## 多个
````html
<div class="moekit-star-5"></div>
<div class="moekit-star-5"></div>
<div class="moekit-star-5"></div>
<div class="moekit-star-5"></div>
````
````javascript
seajs.use(['index','jquery'], function(rater,$){

$('.moekit-star-5').each(function(index,one){
new rater({
    target:$(one),
    enabled:true,
    value:2
});
});

});
````

## 定义数量
````html
<div class="moekit-star-3"></div>
````
````javascript
seajs.use('index', function(rater){
new rater({
   target:'.moekit-star-3',
   max:20,
   value:2
});
});
````


## 定义最小
````html
<div class="moekit-star-4"></div>
````
````javascript
seajs.use('index', function(rater){
new rater({
    target:'.moekit-star-4',
    min:3,
    max:20,
    value:4
});
});
````

## 半颗星星
````html
<div class="moekit-star-6"></div>
````
````javascript
seajs.use('index', function(rater){
new rater({
    target:'.moekit-star-6',
    min:1.5,
    max:20,
    value:4,
    half:true
});
});
````




