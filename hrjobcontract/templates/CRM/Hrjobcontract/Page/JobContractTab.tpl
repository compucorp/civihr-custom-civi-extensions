{assign var="module" value="hrjob-contract" }
{assign var="prefix" value="hrjobcont-" }

<div id="{$module}">
    <div class="container">
        <ul class="{$prefix}list-contract">
            <li>
                <div class="panel panel-default {$prefix}panel-action">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-xs-3">
                                Position: General Manager
                                Contact Type: Apprentice
                            </div>
                            <div class="col-xs-3">
                                Dates: 13/4/2014 - 13/7/2014<br>
                                Paid: Is primary
                            </div>
                            <div class="col-xs-6 text-right ">
                                <a href="#" class="btn btn-default btn-sm" role="button"
                                   data-toggle="modal"
                                   data-action="view"
                                   data-title="Job Contract (rev. 4.1)"
                                   data-target="#{$prefix}modal-wizard">
                                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span> View current revision
                                </a>
                                <a href="#" class="btn btn-default btn-sm" role="button"
                                   data-toggle="modal"
                                   data-action="edit"
                                   data-title="Correct error on contract (rev. 4.1)"
                                   data-target="#{$prefix}modal-wizard">
                                    <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Correct error on contract
                                </a>
                                <a href="#" class="btn btn-default btn-sm" role="button" role="button"
                                   data-toggle="modal"
                                   data-action="edit"
                                   data-title="Change contract terms"
                                   data-target="#{$prefix}modal-wizard">
                                    <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span> Change contract terms
                                </a>
                                <a href="#" class="btn btn-sm">
                                    <i class="fa fa-question-circle fa-lg"></i>
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
                                            <td><a href="#"
                                                   data-toggle="modal"
                                                   data-action="view"
                                                   data-title="Job Contract (rev. 4.0)"
                                                   data-target="#{$prefix}modal-wizard">view this contract revision</a></td>
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
                                            <td><a href="#"
                                                   data-toggle="modal"
                                                   data-action="view"
                                                   data-title="Job Contract (rev. 3.9)"
                                                   data-target="#{$prefix}modal-wizard">view this contract revision</a></td>
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
                                            <td><a href="#"
                                                   data-toggle="modal"
                                                   data-action="view"
                                                   data-title="Job Contract (rev. 3.8)"
                                                   data-target="#{$prefix}modal-wizard">view this contract revision</a></td>
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
                                            <td><a href="#"
                                                   data-toggle="modal"
                                                   data-action="view"
                                                   data-title="Job Contract (rev. 3.7)"
                                                   data-target="#{$prefix}modal-wizard">view this contract revision</a></td>
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
                                            <td><a href="#"
                                                   data-toggle="modal"
                                                   data-action="view"
                                                   data-title="Job Contract (rev. 3.6)"
                                                   data-target="#{$prefix}modal-wizard">view this contract revision</a></td>
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
                                            <td><a href="#"
                                                   data-toggle="modal"
                                                   data-action="view"
                                                   data-title="Job Contract (rev. 3.5)"
                                                   data-target="#{$prefix}modal-wizard">view this contract revision</a></td>
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
                                            <td><a href="#"
                                                   data-toggle="modal"
                                                   data-action="view"
                                                   data-title="Job Contract (rev. 3.4)"
                                                   data-target="#{$prefix}modal-wizard">view this contract revision</a></td>
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
            <a href="#" class="btn btn-default btn-sm btn-primary" role="button"
               data-action="add"
               data-toggle="modal"
               data-title="Add New Job Contract"
               data-target="#{$prefix}modal-wizard">
                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add New Job Contract
            </a>
        </p>
        <!-- Modal -->
        <div class="modal fade" id="{$prefix}modal-wizard" tabindex="-1" role="dialog" aria-labelledby="Add New Job Contract" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <form class="form-horizontal {$prefix}wizard" role="form">
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
                                    <div role="tabpanel" class="tab-pane active" id="{$prefix}tab-general">
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <h4>General</h4>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <div class="form-group required">
                                                    <label for="position" class="col-sm-4 control-label">Position</label>
                                                    <div class="col-sm-8">
                                                        <input type="text" class="form-control" id="position" value="General Manager">
                                                    </div>
                                                </div>
                                                <div class="form-group required">
                                                    <label for="title" class="col-sm-4 control-label">Title</label>
                                                    <div class="col-sm-8">
                                                        <input type="text" class="form-control" id="title" value="General Manager">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="contract-type" class="col-sm-4 control-label">Contract type</label>
                                                    <div class="col-sm-5">
                                                        <select id="contract-type" class="form-control">
                                                            <option value="">- select -</option>
                                                            <option value="Apprentice" selected>Apprentice</option>
                                                            <option value="Contractor">Contractor</option>
                                                            <option value="Employee - Temporary">Employee - Temporary</option>
                                                            <option value="Employee - Permanent">Employee - Permanent</option>
                                                            <option value="Intern">Intern</option>
                                                            <option value="Trustee">Trustee</option>
                                                            <option value="Volunteer">Volunteer</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="place-of-work" class="col-sm-4 control-label">Normal Place of Work</label>
                                                    <div class="col-sm-5">
                                                        <select id="place-of-work" class="form-control">
                                                            <option value="">- select -</option>
                                                            <option value="Headquarters" selected>Headquarters</option>
                                                            <option value="Home or Home-Office">Home or Home-Office</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="date-start" class="col-sm-4 control-label">Contract Start Date</label>
                                                    <div class="col-sm-4">
                                                        <input type="date" class="form-control" id="date-start" value="2014-08-26">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="date-end" class="col-sm-4 control-label">Contract End Date</label>
                                                    <div class="col-sm-4">
                                                        <input type="date" class="form-control" id="date-end">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="duration" class="col-sm-4 control-label">Contract Duration</label>
                                                    <div class="col-sm-8">
                                                        <p class="form-control-static">2 months and 15 days</p>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="notice-employer" class="col-sm-4 control-label">Notice Period from Employer</label>
                                                    <div class="col-sm-8">
                                                        <div class="form-inline">
                                                            <input type="text" class="form-control" id="notice-employer" value="3">
                                                            <select id="notice-employer-unit" class="form-control">
                                                                <option value="">- select -</option>
                                                                <option value="Day">Day</option>
                                                                <option value="Week" selected>Week</option>
                                                                <option value="Month" selected>Month</option>
                                                                <option value="Year">Year</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="notice-employee" class="col-sm-4 control-label">Notice Period from Employee</label>
                                                    <div class="col-sm-8">
                                                        <div class="form-inline">
                                                            <input type="text" class="form-control" id="notice-employee" value="3">
                                                            <select id="notice-employee-unit" class="form-control">
                                                                <option value="">- select -</option>
                                                                <option value="Day">Day</option>
                                                                <option value="Week">Week</option>
                                                                <option value="Month" selected>Month</option>
                                                                <option value="Year">Year</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="{$prefix}tab-hours">
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <h4>Hours</h4>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <div class="form-group">
                                                    <label for="contract-type" class="col-sm-4 control-label">Location/Standard hours</label>
                                                    <div class="col-sm-5">
                                                        <select id="contract-type" class="form-control">
                                                            <option value="1" selected>Head office - 40 hours per week</option>
                                                            <option value="2">Other office - 8 per day</option>
                                                            <option value="3">Small office - 36 per week</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="contract-type" class="col-sm-4 control-label">Hours type</label>
                                                    <div class="col-sm-5">
                                                        <select id="contract-type" class="form-control">
                                                            <option value="1">Full Time</option>
                                                            <option value="2">Part Time</option>
                                                            <option value="3">Casual</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group required">
                                                    <label for="actual-hours" class="col-sm-4 control-label">Actual hours</label>
                                                    <div class="col-sm-8">
                                                        <div class="form-inline">
                                                            <input type="text" class="form-control disabled" id="actual-hours" value="40" disabled>
                                                            per
                                                            <input type="text" class="form-control disabled" value="Week" disabled>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group required">
                                                    <label for="actual-hours" class="col-sm-4 control-label">FTE</label>
                                                    <div class="col-sm-8">
                                                        <div class="form-inline">
                                                            <input type="text" class="form-control disabled" id="fte" value="1" disabled>
                                                            per
                                                            <input type="text" class="form-control disabled" value="1" disabled>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="{$prefix}tab-pay">
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <h4>Pay</h4>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <div class="form-group">
                                                    <div class="col-sm-5 col-sm-offset-4">
                                                        <label class="radio-inline">
                                                            <input type="radio" name="isPaid" id="paid" value="paid"> Paid
                                                        </label>
                                                        <label class="radio-inline">
                                                            <input type="radio" name="isPaid" id="unpaid" value="unpaid" checked> Unpaid
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="form-group">
                                            <label for="contract-type" class="col-sm-4 control-label">Pay Scale / Grade</label>
                                            <div class="col-sm-5">
                                                <select id="pay-scale" class="form-control">
                                                    <option value="1">US</option>
                                                    <option value="2"> - Senior</option>
                                                    <option value="3"> - Junior</option>
                                                    <option value="4">UK</option>
                                                    <option value="5"> - Senior</option>
                                                    <option value="6"> - Junior</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="pay-currency" class="col-sm-4 control-label">Pay</label>
                                            <div class="col-sm-8">
                                                <div class="form-inline">
                                                <select id="pay-currency" class="form-control">
                                                    <option value="GBP">&pound;</option>
                                                    <option value="USD">&dollar;</option>
                                                    <option value="EUR">&euro;</option>
                                                </select>
                                                <input type="text" name="pay-value" class="form-control" value="1500">
                                                per
                                                <select name="pay-timeunit" class="form-control">
                                                    <option value="">- select -</option>
                                                    <option value="Day">Day</option>
                                                    <option value="Week">Week</option>
                                                    <option value="Month" selected>Month</option>
                                                    <option value="Year">Year</option>
                                                </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="pay-estimate-annual" class="col-sm-4 control-label control-label-line-2">Annual pay estimate before benefits and deductions</label>
                                            <div class="col-sm-5">
                                                <input type="text" id="pay-estimate-annual" class="form-control disabled"  value="18000" disabled>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="pay-cycle" class="col-sm-4 control-label">Pay cycle</label>
                                            <div class="col-sm-5">
                                                <select id="pay-cycle" class="form-control">
                                                    <option value="">- select -</option>
                                                    <option value="1">weekly</option>
                                                    <option value="2" selected>monthly</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="well">
                                            <div class="form-group">
                                                <label for="pay-gross-cycle" class="col-sm-4 control-label control-label-line-2">Gross Pay per cycle<br />
                                                    <small>(before benefits and deductions)</small></label>
                                                <div class="col-sm-5">
                                                    <input type="text" id="pay-gross-cycle" class="form-control disabled"  value="18000" disabled>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="{$prefix}tab-leave">
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <h4>Hours</h4>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <div class="form-group">
                                                    <div class="col-sm-4 text-right">
                                                        Leave type
                                                    </div>
                                                    <div class="col-sm-4">
                                                        Days per year
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="leave-sick" class="col-sm-4 control-label">Sick</label>
                                                    <div class="col-sm-4">
                                                        <input type="text" id="leave-sick" name="leave-sick" class="form-control"  value="0" >
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="leave-vacation" class="col-sm-4 control-label">Vacation</label>
                                                    <div class="col-sm-4">
                                                        <input type="text" id="leave-vacation" name="leave-vacation" class="form-control"  value="0" >
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="leave-maternity" class="col-sm-4 control-label">Maternity</label>
                                                    <div class="col-sm-4">
                                                        <input type="text" id="leave-maternity" name="leave-maternity" class="form-control"  value="0" >
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="leave-paternity" class="col-sm-4 control-label">Paternity</label>
                                                    <div class="col-sm-4">
                                                        <input type="text" id="leave-paternity" name="leave-paternity" class="form-control"  value="0" >
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="leave-toil" class="col-sm-4 control-label">TOIL</label>
                                                    <div class="col-sm-4">
                                                        <input type="text" id="leave-toil" name="leave-toil" class="form-control"  value="0" >
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="leave-other" class="col-sm-4 control-label">Other</label>
                                                    <div class="col-sm-4">
                                                        <input type="text" id="leave-other" name="leave-other" class="form-control"  value="0" >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="{$prefix}tab-insurance">
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <h4>Healt Insurance</h4>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <div class="form-group">
                                                    <label for="insurance-health-provider" class="col-sm-4 control-label">Provider</label>
                                                    <div class="col-sm-8">
                                                        <input type="text" id="insurance-health-provider" name="insurance-health-provider" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="insurance-health-plan" class="col-sm-4 control-label">Plan Type</label>
                                                    <div class="col-sm-4">
                                                        <select id="insurance-health-plan" class="form-control">
                                                            <option value="">- select -</option>
                                                            <option value="1">Family</option>
                                                            <option value="2">Individual</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="insurance-health-desc" class="col-sm-4 control-label">Description</label>
                                                    <div class="col-sm-8">
                                                        <textarea id="insurance-health-desc" name="insurance-health-desc" class="form-control" rows="3"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <h4>Life Insurance</h4>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <div class="form-group">
                                                    <label for="insurance-life-provider" class="col-sm-4 control-label">Provider</label>
                                                    <div class="col-sm-8">
                                                        <input type="text" id="insurance-life-provider" name="insurance-life-provider" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="insurance-life-plan" class="col-sm-4 control-label">Plan Type</label>
                                                    <div class="col-sm-4">
                                                        <select id="insurance-life-plan" class="form-control">
                                                            <option value="">- select -</option>
                                                            <option value="1">Family</option>
                                                            <option value="2">Individual</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="insurance-life-desc" class="col-sm-4 control-label">Description</label>
                                                    <div class="col-sm-8">
                                                        <textarea id="insurance-life-desc" name="insurance-life-desc" class="form-control" rows="3"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="{$prefix}tab-pension">
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <h4>Pension</h4>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <div class="form-group">
                                                    <label for="pension-isenrolled" class="col-sm-4 control-label">Is Enrolled</label>
                                                    <div class="col-sm-4">
                                                        <select id="insurance-life-plan" class="form-control">
                                                            <option value="">- select -</option>
                                                            <option value="1">No</option>
                                                            <option value="2">Yes</option>
                                                            <option value="3">Opted out</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="pension-provider" class="col-sm-4 control-label">Provider</label>
                                                    <div class="col-sm-4">
                                                        <select id="insurance-provider" class="form-control">
                                                            <option value="">- select -</option>
                                                            <option value="1">Employer Pension</option>
                                                            <option value="2">Personal Pension</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="pension-contrib-emplr" class="col-sm-4 control-label">Employer Contribution (%)</label>
                                                    <div class="col-sm-8">
                                                        <input type="text" id="pension-contrib-emplr" name="pension-contrib-emplr" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="pension-contrib-emple" class="col-sm-4 control-label">Employee Contribution (%)</label>
                                                    <div class="col-sm-8">
                                                        <input type="text" id="pension-contrib-emple" name="pension-contrib-emple" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="pension-contrib-emple-abs" class="col-sm-4 control-label control-label-line-2">Employee Contribution (absolute amount)</label>
                                                    <div class="col-sm-8">
                                                        <input type="text" id="pension-contrib-emple-abs" name="pension-contrib-emple-abs" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="pension-evidence-file" class="col-sm-4 control-label">Evidence File</label>
                                                    <div class="col-sm-8">
                                                        <input type="file" id="pension-evidence-file" name="pension-evidence-file">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="pension-evidence-note" class="col-sm-4 control-label">Evidence Note</label>
                                                    <div class="col-sm-8">
                                                        <input type="text" id="pension-evidence-note" name="pension-evidence-note" class="form-control">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="{$prefix}tab-funding">
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <h4>Funding</h4>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <div class="form-group">
                                                    <label for="pension-funding-notes" class="col-sm-4 control-label">Funding Notes</label>
                                                    <div class="col-sm-8">
                                                        <textarea id="pension-funding-notes" name="pension-funding-notes" class="form-control" rows="3"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</div>

<script type="text/javascript">
    /**
     * TEMPORARY JS FOR MOCKUP USE ONLY - START
     */

    HR.$.event.trigger('HRLoaded');


</script>