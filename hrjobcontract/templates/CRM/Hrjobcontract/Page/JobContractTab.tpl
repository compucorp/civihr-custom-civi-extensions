{assign var="module" value="hrjob-contract" }
{assign var="prefix" value="hrjobcont-" }

<div id="{$module}">
    <div class="container" ng-view>
    </div>
</div>
{literal}
<script type="text/javascript">
    /**
     * TODO
     */
    document.dispatchEvent(new CustomEvent('hrjcLoad', {
        detail: {
            keyApi: "hrjc9c9jwe5v7upfzb40f6aq",
            key: "{/literal}{$smarty.const.CIVICRM_SITE_KEY}{literal}"
        }
    }));
    /**
     *
     */
</script>
{/literal}