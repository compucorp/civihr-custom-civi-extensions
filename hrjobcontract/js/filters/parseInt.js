console.log('Filter: parseInt');
define(['filters/filters'], function(filters){
    filters.filter('parseInt',function(){
        return function(input) {
            return input ? parseInt(input) : null;
        }
    });
});