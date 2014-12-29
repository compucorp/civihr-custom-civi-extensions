console.log('Filter: formatPeriod');
define(['filters/filters'], function(filters){
    filters.filter('formatPeriod',['$filter', function($filter){
        return function(period) {
            return period ? $filter('date')(period, 'yyyy/MM/dd') : 'Unspecified';
        }
    }]);
});