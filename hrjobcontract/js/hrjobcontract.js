(function ($, $CRM) {

    var module = 'hrjob-contract';
    var prefix = 'hrjobcont-';

    /**
     * TEMPORARY JS FOR MOCKUP USE ONLY - START
     */

    $(document).on('HRLoaded', function(){
        var $collapse = $('.collapse'), $this;

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

        });

        $('#'+prefix+'modal-history-section').on('show.bs.modal', function (event) {
            var $modal = $(this),
                $buttonTarget = $(event.relatedTarget),
                title = $buttonTarget.data('title');

            $modal.find('.modal-title').text(title);
            $modal.attr('aria-labelledby',title);
        });

        $collapse.each(function(){
            $this = $(this);
            $this.on('hide.bs.collapse', function () {
               $('a[data-target="#'+$(this).attr('id')+'"]')
                   .find('.fa').removeClass('fa-caret-down').addClass('fa-caret-right')
                   .next('span').html('More details');
           });
            $this.on('show.bs.collapse', function () {
                $('a[data-target="#'+$(this).attr('id')+'"]')
                    .find('.fa').removeClass('fa-caret-right').addClass('fa-caret-down')
                    .next('span').html('Hide details');
            });
        });


    });
    /**
     * TEMPORARY JS FOR MOCKUP USE ONLY - END
     */
}(HR.$, CRM.$));
