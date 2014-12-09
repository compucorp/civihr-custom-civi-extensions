console.log('Filter: getObjByContractId');
define(['filters/filters'], function(filters){
    filters.filter('getObjByContractId',function(){
        return function(input, id) {
            var i=0, len=input.length;
            for (; i<len; i++) {
                if (+input[i].contract_id == +id) {
                    return input[i];
                }
            }
            return null;
        }
    });
});