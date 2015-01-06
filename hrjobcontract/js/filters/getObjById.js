console.log('Filter: getObjById');
define(['filters/filters'], function(filters){
    filters.filter('getObjById',function(){
        return function(input, id) {
            var i=0, len=input.length;
            for (; i<len; i++) {
                if (+input[i].id == +id) {
                    return input[i];
                }
            }
            return null;
        }
    });
});