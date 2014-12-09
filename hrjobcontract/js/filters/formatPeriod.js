console.log('Filter: formatPeriod');
define(['filters/filters'], function(filters){
    filters.filter('formatPeriod',function(){
        return function(input) {
            //return input ? input.replace(/-/g, '/') : 'Unspecified';
            return input.replace(/-/g, '/');
        }
    });
});