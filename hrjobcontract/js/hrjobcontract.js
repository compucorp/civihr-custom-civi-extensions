(function ($, $CRM) {

    var module = 'hrjob-contract';
    var prefix = 'hrjobcont-';

    /**
     * TEMPORARY JS FOR MOCKUP USE ONLY - START
     */

    $(document).on('HRLoaded', function(){
        $('#'+prefix+'modal-wizard').on('show.bs.modal', function (event) {
            var $modal = $(this),
                $buttonTarget = $(event.relatedTarget),
                $buttonSave = $modal.find('.btn-primary'),
                action = $buttonTarget.data('action'),
                title = $buttonTarget.data('title');
            $modal.find('.modal-title').text(title);
            $modal.attr('aria-labelledby',title);

            switch (action) {
                case 'edit':
                    $buttonSave.show();
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
                    $buttonSave.hide();
                    $modal.find('input, select, textarea').each(function(){
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
