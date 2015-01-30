define(['filters/filters'], function(filters){
    filters.filter('parseInt',function($log){
        $log.debug('Filter: parseInt');

        return function(input) {
            return input ? parseInt(input) : null;
        }
    });
});