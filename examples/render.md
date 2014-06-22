# 从html渲染

---

## 从input渲染

渲染时`input`被隐藏，当选择星星时会自动改变对应 `input`的value。

````html
<input class="moekit-star-6" value="1"/>
<input class="moekit-star-6" value="2"/>
<input class="moekit-star-6" value="3"/>
<input class="moekit-star-6" value="4"/>
<input class="moekit-star-6" value="5"/>
<input class="moekit-star-6" value="6"/>
<input class="moekit-star-6" value="7"/>
<input class="moekit-star-6" value="8"/>
<input class="moekit-star-6" value="9"/>
<input class="moekit-star-6" value="10"/>
<input class="moekit-star-6" value="11"/>
<input class="moekit-star-6" value="12"/>
<input class="moekit-star-6" value="13"/>
<input class="moekit-star-6" value="14"/>
<input class="moekit-star-6" value="15"/>
<input class="moekit-star-6" value="16"/>
<input class="moekit-star-6" value="17"/>
<input class="moekit-star-6" value="18"/>
<input class="moekit-star-6" value="19"/>
<input class="moekit-star-6" value="20"/>
````
````javascript
seajs.use(['index','jquery'], function(Rater,$){
console.log(Rater);
console.log($('.moekit-star-6'))
$('.moekit-star-6').each(function(index,target){
    new Rater({
    target:target,
    min:1,
    max:20,
    value:$(target).val(),
    half:true
}).on('select',function(value,$box,$target){
   // console.log(event,a,b);
    console.log(value,$target.val());
})
});
});


````