require.config({
	paths:{
		jquery:'jquery/jquery-1.11.0.min'
	},
	shim:{
		
	}
})
require(['one','sub/three',jquery,_,Backbone],function(one,three){
   alert(one+three);
});