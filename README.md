# require

上面release是执行命令 node r.js -o build.js 生成的，需要切换到目录require/tools下面，也就是 有r.js和build.js的目录，才能执行命令

代码目录如上：

main.html代码如下：

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Hello RequireJS</title>
    </head>
    <body>
        <h1>Hello RequireJS</h1>

        <script type="text/javascript" src="js/lib/require.js"></script>

        <!-- main.js：requireJS 配置信息 -->
        <script type="text/javascript" src="js/config.js"></script>
        <!-- <script type="text/javascript" src="js/combine.js"></script> -->

        <script type="text/javascript">
          /*如果没有配置信息，加载one,two模块，要找到他们的存放路径*/
          /*  require(["./js/mod/one", "./js/mod/two"], function (one, two) {
                console.log('加载模块：', one.name, two.name );
                console.log("bootstrap the application");
            });*/
            require(["one", "two"], function (one, two) {
                console.log('加载模块：', one.name, two.name );
                console.log("bootstrap the application");                  
            });

        </script>
    </body>
</html>
config.js代码如下，配置信息，便于 require引入这些模块 one,two,three，如上代码

// requireJS的简单配置，更详细的配置信息请看 http://requirejs.org/docs/api.html#config
requirejs.config({
    baseUrl: "./js", //相对于当前 Html的路径
    
    paths: { 
        one: "mod/one",
        two: "mod/two",
        three: "mod/three"
    }
});
one模块代码：

define(function(){
    return {name:"one"}
});
two模块代码：其中two模块引入了three模块

define(function(require){
    /*var three = require('./three');*/
    var three = require('three');


    console.log('加载模块：'+three.name);

    return {name:"two"}
});
three模块代码：

define(function(){
    return {name:"three"}
});
build.js是r.js压缩代码的依据,代码如下：

({
    appDir:"../src",   
    dir:"../release", 
    mainConfigFile:"../src/js/config.js", 
    paths:{
        one:"mod/one",
        two:"mod/two",
        three:"mod/three"
    },
    modules:[{  
        name:"combine",
        include:[
            'one',
            'two'
        ]
    }],
    optimize:"uglify" 
   
})
     appDir

　　应用程序的最顶层目录。可选的，如果设置了的话，r.js 会认为脚本在这个路径的子目录中，应用程序的文件都会被拷贝到输出目录（dir 定义的路径）。如果不设置，则使用下面的 baseUrl 路径。

　　baseUrl

　　默认情况下，所有的模块都是相对于这个路径的。如果没有设置，则模块的加载是相对于 build 文件所在的目录。另外，如果设置了appDir，那么 baseUrl 应该定义为相对于 appDir 的路径。

　　dir

　　输出目录的路径。如果不设置，则默认为和 build 文件同级的 build 目录。

　　optimize

　　JavaScript 代码优化方式。可设置的值：

"uglify：使用 UglifyJS 压缩代码，默认值；
"uglify2"：使用 2.1.2+ 版本进行压缩；
"closure"： 使用 Google's Closure Compiler 进行压缩合并，需要 Java 环境；
"closure.keepLines"：使用 Closure Compiler 进行压缩合并并保留换行；
"none"：不做压缩合并；
　　optimizeCss

　　CSS 代码优化方式，可选的值有：

"standard"：标准的压缩方式；
"standard.keepLines"：保留换行；
"standard.keepComments"：保留注释；
"standard.keepComments.keepLines"：保留换行；
"none"：不压缩；
　　mainConfigFile

　　如果不想重复定义的话，可以使用这个参数配置 RequireJS 的配置文件路径。

　　removeCombined

　　删除之前压缩合并的文件，默认值 false。

　　fileExclusionRegExp

　　要排除的文件的正则匹配的表达式。

　　modules

　　定义要被优化的模块数组。每一项是模块优化的配置，常用的几个参数如下：

　　　　name：模块名；

　　　　create：如果不存在，是否创建。默认 false；

　　　　include：额外引入的模块，和 name 定义的模块一起压缩合并；

　　　　exclude：要排除的模块。有些模块有公共的依赖模块，在合并的时候每个都会压缩进去，例如一些基础库。使用 exclude 就可以把这些模块在压缩在一个更早之前加载的模块中，其它模块不用重复引入。

 

 

代码目录如下

 



main-build.js,production都是运行 node r.js -o build.js生成的，需要切换到目录test/develop下面，也就是 有r.js和build.js的目录，才能执行命令

<!DOCTYPE html>
<html>
    <head>
        <title>My App</title>
       <!--  <link rel="stylesheet" type="text/css" href="css/main.css"> -->
        <script data-main="js/main-build" src="js/require.js"></script>
    </head>
    <body>
        <h1>My App</h1>
    </body>
</html>
data-main属性的作用是，指定网页程序的主模块。在上例中，就是js目录下面的main.js，这个文件会第一个被require.js加载。由于require.js默认的文件后缀名是js，所以可以把main.js简写成main。

 

 

build.js 如下：out是压缩为一个.js文件，dir是将本地代码，重新复制一份代码，作为上线代码，out和dir不能同时出现，同时使用会报冲突。

({
    baseUrl:'.',
    name:'main',
    paths:{jquery:'jquery/jquery-1.11.0.min'},
    out:'main-build.js'
    /*dir:'../production'*/
})
main.js 配置：方便require加载模块

理论上，require.js加载的模块，必须是按照AMD规范、用define()函数定义的模块。但是实际上，虽然已经有一部分流行的函数库（比如jQuery）符合AMD规范，更多的库并不符合。那么，require.js是否能够加载非规范的模块呢？

回答是可以的。

这样的模块在用require()加载之前，要先用require.config()方法，定义它们的一些特征。

举例来说，underscore和backbone这两个库，都没有采用AMD规范编写。如果要加载它们的话，必须先定义它们的特征。

require.config({
    paths:{
        jquery:'jquery/jquery-1.11.0.min'
    },
　    shim: {  
　　　　　　'underscore':{
　　　　　　　　exports: '_'
　　　　　　},

　　　　　　'backbone': {
　　　　　　　　deps: ['underscore', 'jquery'],
　　　　　　　　exports: 'Backbone'
　　　　　　}

　　　　}

})
require(['one','sub/three',jquery,_,Backbone],function(one,three){
   alert(one+three);
});
require.config()接受一个配置对象，这个对象除了有前面说过的paths属性之外，还有一个shim属性，专门用来配置不兼容的模块。具体来说，每个模块要定义（1）exports值（输出的变量名），表明这个模块外部调用时的名称；（2）deps数组，表明该模块的依赖性。

 
