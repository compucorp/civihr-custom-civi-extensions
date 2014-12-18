console.log('Filter: formatAmount');
define(['filters/filters'], function(filters){
    filters.filter('formatAmount',function(){
        return function(input) {
            return input && input.indexOf('.') === -1 ? input+'.00' : input
        }
    });
});