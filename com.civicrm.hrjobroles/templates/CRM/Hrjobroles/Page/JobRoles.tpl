{assign var="module" value="com.civicrm.hrjobroles" }
{assign var="prefix" value="hrjobroles-" }

hmm22
<div id="{$module}">
    <div class="container" ng-view>
    </div>
</div>
{literal}
    <script type="text/javascript">
        document.dispatchEvent(new CustomEvent('hrjobrolesLoad'));
    </script>
{/literal}