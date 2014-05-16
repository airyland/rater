# rater

---

 [![Build Status](https://secure.travis-ci.org/airyland/rater.png)](https://travis-ci.org/airyland/rater)
 [![Coverage Status](https://coveralls.io/repos/airyland/rater/badge.png?branch=master)](https://coveralls.io/r/airyland/rater)


---

## 需求来源
商业需求的试用报告需要星级评分

`Discuz`特定版块发帖中使用需要去修改版块的自定义信息的显示模块。

比较麻烦，请咨询`李政`或者`阿钢`。

## 使用说明

支持`PC站`的jQuery和`WAP站`的Zepto。

## API

完善中。请先看演示。

## 配置

### target
评分容器选择器

### enabled <em>Boolean</em>
是否鼠标经过有响应，默认为`true`


### min
最小值

### max
最多显示的星星数

### value
默认显示的星数

### onselect
选择星星时的回调,`this`指向`target`，参数为当前选择到的值

### onhover
经过星星时的回调,`this`指向`target`，参数为当前经过的星星值(星星值由左到右从1开始)

### onleave
离开整个评分区域的回调,`this`指向`target`，参数1为当前选择的星星值，参数2为当前经过到的值
