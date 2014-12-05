console.log('jquery-private');
define(['jquery'], function (jq) {
    return jq.noConflict(true);
});