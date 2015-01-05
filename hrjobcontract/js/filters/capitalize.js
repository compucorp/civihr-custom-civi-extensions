console.log('Filter: capitalize');
define(['filters/filters'], function(filters){
    filters.filter('capitalize',function(){
        return function(input, all) {
            return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
        }
    });
});