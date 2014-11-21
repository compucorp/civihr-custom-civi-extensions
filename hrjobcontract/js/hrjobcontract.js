(function ($, $CRM) {

    var module = 'hrjob-contract';
    var prefix = 'hrjobcont-';

    /**
     * TEMPORARY JS FOR MOCKUP USE ONLY - START
     */

    $(document).on('HRLoaded', function(){
        $('#'+prefix+'modal-wizard').on('show.bs.modal', function (event) {
            var $modal = $(this),
                $button = $(event.relatedTarget),
                action = $button.data('action'),
                title = $button.data('title');
            $modal.find('.modal-title').text(title);
            $modal.attr('aria-labelledby',title);

            switch (action) {
                case 'edit':
                    $modal.find('*[disabled]:not(.disabled)').each(function(){
                        $(this).removeAttr('disabled');
                    });
                    break;
                case 'add':
                    $modal.find('*[disabled]').each(function(){
                        $(this).removeAttr('disabled');
                    });
                    break;
                case 'view':
                    $modal.find('input, select').each(function(){
                        $(this).attr('disabled',true);
                    });
                    break;
            }

        })
    });
    /**
     * TEMPORARY JS FOR MOCKUP USE ONLY - END
     */
}(HR.$, CRM.$));
