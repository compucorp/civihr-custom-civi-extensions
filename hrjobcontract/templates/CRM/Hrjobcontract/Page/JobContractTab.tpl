{assign var="module" value="hrjob-contract" }
{assign var="prefix" value="hrjobcont-" }

<div id="{$module}" ng-controller="RootCtrl">
    <div class="container" ng-view>
    </div>
</div>
<script type="text/javascript">
    /**
     * TEMPORARY JS FOR MOCKUP USE ONLY - START
     * TODO
     */
    document.dispatchEvent(new Event('hrjcLoad'));
    /**
     * TEMPORARY JS FOR MOCKUP USE ONLY - END
     */
</script>