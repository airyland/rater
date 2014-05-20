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
seajs.use('index', function(rater){
new rater({
    target:'.moekit-star-1',
    min:1,
    max:5,
    //enabled:false,
    onselect : function(number,$this) {
    console.log('on select',arguments)
      $this.closest('.moekit-star').find('input.select').val(number);
    },
     onhover : function(number,$this) {
        console.log('on hover',arguments)
          $this.closest('.moekit-star').find('input.hover').val(number);
     },
     onleave : function(number,hoverNumber,$this) {
            console.log('on leave',arguments)
             $this.closest('.moekit-star').find('input.leave').val(number+' '+hoverNumber);
     }

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
    enabled:false,
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
seajs.use('index', function(rater){
new rater({
    target:'.moekit-star-5',
    enabled:true,
    value:2
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




