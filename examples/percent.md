# 数值带小数

---

## 小数

````html
<div class="moekit-star-4"></div>
````

````javascript
seajs.use('index', function(rater){
new rater({
    enabled: false,
    target:'.moekit-star-4',
    min:3,
    max:20,
    value:4.5
});
});
````


````html
<div class="moekit-star-5"></div>
````

````javascript
seajs.use('index', function(rater){
new rater({
    enabled: false,
    target:'.moekit-star-5',
    min:3,
    max:20,
    value:4.3,
    readonly:true
});
});
````

