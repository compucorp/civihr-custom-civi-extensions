{assign var="module" value="hrjob-contract" }
{assign var="prefix" value="hrjobcont-" }

<div id="{$module}">
    <div class="container">
        <ul class="{$prefix}list-contract">
            <li>
                <div class="row">
                    <div class="col-xs-6">
                        Position: General Manager Dates: 13/4/2014 Paid: Is primary<br />
                        Contact Type: Apprentice
                    </div>
                    <div class="col-xs-6">
                        <a href="#" class="btn btn-default" role="button">View current revision</a>
                        <a href="#" class="btn btn-default" role="button">Correct error on contract</a>
                        <a href="#" class="btn btn-default" role="button">Change contract terms</a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs" role="tablist">
                            <li role="presentation" class="active"><a href="#{$prefix}summary" role="tab" data-toggle="tab">Summary</a></li>
                            <li role="presentation"><a href="#{$prefix}full-history" role="tab" data-toggle="tab">Full History</a></li>
                        </ul>

                        <!-- Tab panes -->
                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane active" id="{$prefix}summary">
                                <form class="form-horizontal" role="form">
                                    <div class="row">
                                        <div class="col-xs-6">
                                            <div class="form-group">
                                                <label for="position" class="col-sm-3 control-label">Position</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control" id="position" placeholder="General Manager">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="title" class="col-sm-3 control-label">Title</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control" id="title" placeholder="General Manager">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="type" class="col-sm-3 control-label">Contract Type</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control" id="type" placeholder="Apprentice">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="department" class="col-sm-3 control-label">Department</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control" id="department" placeholder="">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="level" class="col-sm-3 control-label">Level</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control" id="level" placeholder="">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="manager" class="col-sm-3 control-label">Manager</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control" id="manager" placeholder="">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="time" class="col-sm-3 control-label">Time Period</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control" id="time" placeholder="">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="funding" class="col-sm-3 control-label">Funding</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control" id="funding" placeholder="">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6">
                                            <div class="form-group">
                                                <label for="insurance-health" class="col-sm-3 control-label">Health Insurance</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control" id="insurance-health" placeholder="">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="insurance-life" class="col-sm-3 control-label">Life Insurance</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control" id="insurance-life" placeholder="General Manager">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="hours" class="col-sm-3 control-label">Hours</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control" id="hours" placeholder="Part Time (4 per Day) (1/1 FTE)">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="leave" class="col-sm-3 control-label">Leave</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control" id="leave" placeholder="">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="pay" class="col-sm-3 control-label">Pay</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control" id="pay" placeholder="Paid (USD 40000.00 Year)">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="pension" class="col-sm-3 control-label">Pension</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control" id="pension" placeholder="Enrolled">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="{$prefix}full-history">
                                Tab 2
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>