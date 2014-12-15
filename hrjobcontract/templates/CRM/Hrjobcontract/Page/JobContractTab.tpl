{assign var="module" value="hrjob-contract" }
{assign var="prefix" value="hrjobcont-" }

<div id="{$module}">
    <div class="container" ng-view>
    </div>
</div>
<script type="text/javascript">
    /**
     * TODO
     */
    
    var appKey = '{$smarty.const.CIVICRM_SITE_KEY}';
    var userKey = 'demoapikey';
    
    document.dispatchEvent(new Event('hrjcLoad'));
    /**
     *
     */
</script>