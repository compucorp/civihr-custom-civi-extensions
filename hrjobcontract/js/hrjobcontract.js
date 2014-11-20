(function ($, $CRM) {

    var module = 'hrjob-contract';
    var prefix = 'hrjobcont-';

    /**
     * TEMPORARY JS FOR MOCKUP USE ONLY - START
     */

    $(document).on('HRLoaded', function(){
        $('#'+prefix+'modal-edit').on('show.bs.modal', function (event) {
            var $modal = $(this),
                title = $(event.relatedTarget).data('title');
            $modal.find('.modal-title').text(title);
            $modal.attr('aria-labelledby',title);
        })
    });
    /**
     * TEMPORARY JS FOR MOCKUP USE ONLY - END
     */
}(HR.$, CRM.$));
