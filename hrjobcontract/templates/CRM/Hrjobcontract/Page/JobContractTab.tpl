{assign var="module" value="hrjob-contract" }
{assign var="prefix" value="hrjobcont-" }

<div id="{$module}">
    <div class="container">
        <ul class="{$prefix}list-contract">
            <li>
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-xs-6">
                                Position: General Manager Dates: 13/4/2014 Paid: Is primary<br />
                                Contact Type: Apprentice
                            </div>
                            <div class="col-xs-6 text-right">
                                <a href="#" class="btn btn-default btn-sm" role="button">
                                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span> View current revision
                                </a>
                                <a href="#" class="btn btn-default btn-sm" role="button">
                                    <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Correct error on contract
                                </a>
                                <a href="#" class="btn btn-default btn-sm" role="button">
                                    <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span> Change contract terms
                                </a>
                            </div>
                        </div>
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
                                <div class="panel panel-default">
                                    <div class="panel-heading"><strong>Apprentice: General Manager</strong></div>
                                    <div class="panel-body">
                                        <form class="form-horizontal" role="form">
                                            <div class="row">
                                                <div class="col-xs-6">
                                                    <div class="form-group">
                                                        <label for="position" class="col-sm-4 control-label">Position</label>
                                                        <div class="col-sm-6">
                                                            <p class="form-control-static">General Manager</p>
                                                        </div>
                                                        <div class="col-sm-2">
                                                            <a href="#" class="btn">
                                                                <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="title" class="col-sm-4 control-label">Title</label>
                                                        <div class="col-sm-6">
                                                            <p class="form-control-static">General Manager</p>
                                                        </div>
                                                        <div class="col-sm-2">
                                                            <a href="#" class="btn">
                                                                <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="type" class="col-sm-4 control-label">Contract Type</label>
                                                        <div class="col-sm-6">
                                                            <p class="form-control-static">Apprentice</p>
                                                        </div>
                                                        <div class="col-sm-2">
                                                            <a href="#" class="btn">
                                                                <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="department" class="col-sm-4 control-label">Department</label>
                                                        <div class="col-sm-6">
                                                            <p class="form-control-static"></p>
                                                        </div>
                                                        <div class="col-sm-2">
                                                            <a href="#" class="btn">
                                                                <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="level" class="col-sm-4 control-label">Level</label>
                                                        <div class="col-sm-6">
                                                            <p class="form-control-static"></p>
                                                        </div>
                                                        <div class="col-sm-2">
                                                            <a href="#" class="btn">
                                                                <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="manager" class="col-sm-4 control-label">Manager</label>
                                                        <div class="col-sm-6">
                                                            <p class="form-control-static"></p>
                                                        </div>
                                                        <div class="col-sm-2">
                                                            <a href="#" class="btn">
                                                                <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="manager" class="col-sm-4 control-label">Normal Place of Work</label>
                                                        <div class="col-sm-6">
                                                            <p class="form-control-static">Headquarters</p>
                                                        </div>
                                                        <div class="col-sm-2">
                                                            <a href="#" class="btn">
                                                                <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="time" class="col-sm-4 control-label">Time Period</label>
                                                        <div class="col-sm-6">
                                                            <p class="form-control-static">
                                                                (2014-08-26 to Unspecified)<br />
                                                                <strong>Notice:</strong> 3 Month
                                                            </p>
                                                        </div>
                                                        <div class="col-sm-2">
                                                            <a href="#" class="btn">
                                                                <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="funding" class="col-sm-4 control-label">Funding</label>
                                                        <div class="col-sm-6">
                                                            <p class="form-control-static">
                                                                <strong>Tied to funding</strong><br />
                                                                <strong>Funding organization:</strong> <a href="#">Jackson
                                                                Wellness Partnership</a><br />
                                                                <strong>Notes:</strong> Notes
                                                            </p>
                                                        </div>
                                                        <div class="col-sm-2">
                                                            <a href="#" class="btn">
                                                                <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-6">
                                                    <div class="form-group">
                                                        <label for="insurance-health" class="col-sm-4 control-label">Health Insurance</label>
                                                        <div class="col-sm-6">
                                                            <p class="form-control-static"></p>
                                                        </div>
                                                        <div class="col-sm-2">
                                                            <a href="#" class="btn">
                                                                <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="insurance-life" class="col-sm-4 control-label">Life Insurance</label>
                                                        <div class="col-sm-6">
                                                            <p class="form-control-static"></p>
                                                        </div>
                                                        <div class="col-sm-2">
                                                            <a href="#" class="btn">
                                                                <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="hours" class="col-sm-4 control-label">Hours</label>
                                                        <div class="col-sm-6">
                                                            <p class="form-control-static">Part Time (4 per Day) (1/1 FTE)</p>
                                                        </div>
                                                        <div class="col-sm-2">
                                                            <a href="#" class="btn">
                                                                <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="leave" class="col-sm-4 control-label">Leave</label>
                                                        <div class="col-sm-6">
                                                            <p class="form-control-static"></p>
                                                        </div>
                                                        <div class="col-sm-2">
                                                            <a href="#" class="btn">
                                                                <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="pay" class="col-sm-4 control-label">Pay</label>
                                                        <div class="col-sm-6">
                                                            <p class="form-control-static">Paid (USD 40000.00 Year)</p>
                                                        </div>
                                                        <div class="col-sm-2">
                                                            <a href="#" class="btn">
                                                                <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="pension" class="col-sm-4 control-label">Pension</label>
                                                        <div class="col-sm-6">
                                                            <p class="form-control-static">
                                                                Enrolled<br />
                                                                <strong>Pension Type:</strong> Employer Pension<br />
                                                                <strong>Employer Contribution (%):</strong> 4<br />
                                                                <strong>Employer Contribution (%):</strong> 4<br />
                                                                <strong>Employer Contribution (absolute amount):</strong>
                                                                10000.00
                                                            </p>
                                                        </div>
                                                        <div class="col-sm-2">
                                                            <a href="#" class="btn">
                                                                <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <a href="#" class="btn btn-default btn-sm btn-danger" role="button">
                                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete this job contract
                                </a>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="{$prefix}full-history">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Effective Date</th>
                                            <th>Position</th>
                                            <th>Department</th>
                                            <th>Pay Scale</th>
                                            <th>Total Salary</th>
                                            <th>Hours (Full time/ Part time)</th>
                                            <th>Location</th>
                                            <th>Change Record By</th>
                                            <th>&nbsp;</th>
                                            <th>&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>2014-10-30</td>
                                            <td>Front-end Developer</td>
                                            <td>IT</td>
                                            <td>NJC</td>
                                            <td>264000.00 $</td>
                                            <td>Full time</td>
                                            <td>London</td>
                                            <td>John Smith</td>
                                            <td></td>
                                            <td><a href="#">view this contract revision</a></td>
                                        </tr>
                                        <tr>
                                            <td>2014-10-30</td>
                                            <td>Front-end Developer</td>
                                            <td>IT</td>
                                            <td>NJC</td>
                                            <td>264000.00 $</td>
                                            <td>Full time</td>
                                            <td>London</td>
                                            <td>John Smith</td>
                                            <td></td>
                                            <td><a href="#">view this contract revision</a></td>
                                        </tr>
                                        <tr>
                                            <td>2014-10-30</td>
                                            <td>Front-end Developer</td>
                                            <td>IT</td>
                                            <td>NJC</td>
                                            <td>264000.00 $</td>
                                            <td>Full time</td>
                                            <td>London</td>
                                            <td>John Smith</td>
                                            <td></td>
                                            <td><a href="#">view this contract revision</a></td>
                                        </tr>
                                        <tr>
                                            <td>2014-10-30</td>
                                            <td>Front-end Developer</td>
                                            <td>IT</td>
                                            <td>NJC</td>
                                            <td>264000.00 $</td>
                                            <td>Full time</td>
                                            <td>London</td>
                                            <td>John Smith</td>
                                            <td></td>
                                            <td><a href="#">view this contract revision</a></td>
                                        </tr>
                                        <tr>
                                            <td>2014-10-30</td>
                                            <td>Front-end Developer</td>
                                            <td>IT</td>
                                            <td>NJC</td>
                                            <td>264000.00 $</td>
                                            <td>Full time</td>
                                            <td>London</td>
                                            <td>John Smith</td>
                                            <td></td>
                                            <td><a href="#">view this contract revision</a></td>
                                        </tr>
                                        <tr>
                                            <td>2014-10-30</td>
                                            <td>Front-end Developer</td>
                                            <td>IT</td>
                                            <td>NJC</td>
                                            <td>264000.00 $</td>
                                            <td>Full time</td>
                                            <td>London</td>
                                            <td>John Smith</td>
                                            <td></td>
                                            <td><a href="#">view this contract revision</a></td>
                                        </tr>
                                        <tr>
                                            <td>2014-10-30</td>
                                            <td>Front-end Developer</td>
                                            <td>IT</td>
                                            <td>NJC</td>
                                            <td>264000.00 $</td>
                                            <td>Full time</td>
                                            <td>London</td>
                                            <td>John Smith</td>
                                            <td></td>
                                            <td><a href="#">view this contract revision</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <a href="#" class="btn btn-default btn-sm btn-danger" role="button">
                                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete this job contract
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <h3>Past Job Contracts:</h3>
        <p>
            <a href="#" class="btn btn-default btn-sm btn-primary" role="button" data-toggle="modal" data-target="#{$prefix}modal-newjob">
                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add New Job Contract
            </a>
        </p>
        <!-- Modal -->
        <div class="modal fade" id="{$prefix}modal-newjob" tabindex="-1" role="dialog" aria-labelledby="Add New Job Contract" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">Add New Job Contract</h4>
                    </div>
                    <div class="modal-body clearfix">
                        <div role="tabpanel" class="tabs-left">
                            <!-- Nav tabs -->
                            <ul class="nav nav-tabs" role="tablist">
                                <li role="presentation" class="active"><a href="#{$prefix}tab-general" aria-controls="#{$prefix}tab-general" role="tab" data-toggle="tab">General</a></li>
                                <li role="presentation"><a href="#{$prefix}tab-hours" aria-controls="{$prefix}tab-hours" role="tab" data-toggle="tab">Hours</a></li>
                                <li role="presentation"><a href="#{$prefix}tab-pay" aria-controls="{$prefix}tab-pay" role="tab" data-toggle="tab">Pay</a></li>
                                <li role="presentation"><a href="#{$prefix}tab-leave" aria-controls="{$prefix}tab-leave" role="tab" data-toggle="tab">Leave</a></li>
                                <li role="presentation"><a href="#{$prefix}tab-insurance" aria-controls="{$prefix}tab-insurance" role="tab" data-toggle="tab">Insurance</a></li>
                                <li role="presentation"><a href="#{$prefix}tab-pension" aria-controls="{$prefix}tab-pension" role="tab" data-toggle="tab">Pension</a></li>
                                <li role="presentation"><a href="#{$prefix}tab-funding" aria-controls="{$prefix}tab-funding" role="tab" data-toggle="tab">Funding</a></li>
                            </ul>
                            <!-- Tab panes -->
                            <div class="tab-content">
                                <div role="tabpanel" class="tab-pane active" id="{$prefix}tab-general">...</div>
                                <div role="tabpanel" class="tab-pane" id="{$prefix}tab-hours">...</div>
                                <div role="tabpanel" class="tab-pane" id="{$prefix}tab-pay">...</div>
                                <div role="tabpanel" class="tab-pane" id="{$prefix}tab-leave">...</div>
                                <div role="tabpanel" class="tab-pane" id="{$prefix}tab-insurance">...</div>
                                <div role="tabpanel" class="tab-pane" id="{$prefix}tab-pension">...</div>
                                <div role="tabpanel" class="tab-pane" id="{$prefix}tab-funding">...</div>
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>