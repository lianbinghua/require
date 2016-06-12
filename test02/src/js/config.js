// requireJS的简单配置，更详细的配置信息请看 http://requirejs.org/docs/api.html#config
requirejs.config({
    baseUrl: "./js", //相对于当前 Html的路径
    
    paths: { 
        one: "mod/one",
        two: "mod/two",
        three: "mod/three"
    }
});