# rater

---
 [![moekit version](http://moekit.com/badge/rater)](http://moekit.com/package/rater)
 [![Build Status](https://img.shields.io/travis/airyland/rater.svg)](https://travis-ci.org/airyland/rater)
 [![Coverage Status](https://img.shields.io/coveralls/airyland/rater.svg)](https://coveralls.io/r/airyland/rater)


---


## 使用说明

完善中。请先看演示。

## 配置

### target <em>String</em>
评分容器选择器

### enabled <em>Boolean</em>
是否鼠标经过有响应，默认为`true`


### min <em>Number</em>
最小值

### max <em>Number</em>
最多显示的星星数

### value <em>Number</em>
默认显示的星数

### on('select' <em>function(number,target)</em>)
选择星星时的回调,`this`指向`target`，参数为当前选择到的值

### on('hover' <em>function(hoverNumber,target)</em>)
经过星星时的回调,`this`指向`target`，参数为当前经过的星星值(星星值由左到右从1开始)

### on('leave' <em>function(number,hoverNumber,target)</em>)
离开整个评分区域的回调,`this`指向`target`，参数1为当前选择的星星值，参数2为当前经过到的值
