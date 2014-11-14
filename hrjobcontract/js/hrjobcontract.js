(function ($, $CRM) {
    $(document).ready(function(){
        $('.nav-tabs a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        })
    });
}(HR.$, CRM.$));
