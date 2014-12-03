<?php

require_once 'Setup/JobContractSetup.php';

/**
 * FIXME
 */
class CRM_Hrjobcontract_CreateRevisionTest extends Setup_JobContractSetup {
  function setUp() {
    parent::setUp();
    $this->quickCleanup(array(
        'civicrm_hrjobcontract_data',
        'civicrm_hrjobcontract_health',
        'civicrm_hrjobcontract_role',
        'civicrm_hrjobcontract_hour',
        'civicrm_hrjobcontract_pay',
        'civicrm_hrjobcontract_leave',
        'civicrm_hrjobcontract_pension',
        'civicrm_hrjobcontract_revision',
        'civicrm_hrjobcontract',
    ));
  }

  function tearDown() {
    parent::tearDown();
  }

  /**
   * Test Job Contract Revision after creating Job Contract and its entities.
   */
  function testCreateRevision() {
    
    $expected = array(
        "id" => "7",
        "jobcontract_id" => "1",
        "data_revision_id" => "1",
        "health_revision_id" => "2",
        "role_revision_id" => "3",
        "hour_revision_id" => "4",
        "pay_revision_id" => "5",
        "leave_revision_id" => "6",
        "pension_revision_id" => "7",
    );
    
    
    // creating Job Contract:
    civicrm_api3('HRJobContract', 'create', array(
      'sequential' => 1,
      'contact_id' => 229,
    ));

    // creating Data entity:
    civicrm_api3('HRJobData', 'create', array(
      'sequential' => 1,
      'position' => "some position",
      'title' => "some title",
      'funding_notes' => "some funding notes",
      'contract_type' => "",
      'period_type' => "Temporary",
      'period_start_date' => "2014-09-01",
      'period_end_date' => "2015-08-31",
      'notice_amount' => 3,
      'notice_unit' => "Week",
      'notice_amount_employee' => 4,
      'notice_unit_employee' => "Month",
      'location' => "",
      'is_primary' => 1,
      'jobcontract_id' => 1,
    ));

    // creating Health entity:
    civicrm_api3('HRJobHealth', 'create', array(
      'sequential' => 1,
      'description' => 111,
      'dependents' => 222,
      'description_life_insurance' => 333,
      'dependents_life_insurance' => 444,
      'provider' => 158,
      'plan_type' => "Family",
      'provider_life_insurance' => 284,
      'plan_type_life_insurance' => "Individual",
      'jobcontract_id' => 1,
    ));

    // creating Role entity:
    civicrm_api3('HRJobRole', 'create', array(
      'sequential' => 1,
      'title' => "some role title",
      'description' => "some role description",
      'manager_contact_id' => 229,
      'functional_area' => "some role functional area",
      'organization' => "some role organization",
      'cost_center' => "some role cost center",
      'location' => "",
      'hours' => 1,
      'role_hours_unit' => "Week",
      'region' => "",
      'department' => "",
      'level_type' => "",
      'funder' => "some role funder",
      'percent_pay_funder' => 15,
      'percent_pay_role' => 20,
      'jobcontract_id' => 1,
    ));


    // creating Hour entity:
    civicrm_api3('HRJobHour', 'create', array(
      'sequential' => 1,
      'hours_type' => "",
      'hours_amount' => 5,
      'hours_unit' => "Week",
      'hours_fte' => 1,
      'fte_num' => 2,
      'fte_denom' => 3,
      'jobcontract_id' => 1,
    ));

    // creating Pay entity:
    civicrm_api3('HRJobPay', 'create', array(
      'sequential' => 1,
      'pay_is_auto_est' => 1,
      'pay_scale' => "",
      'is_paid' => "",
      'pay_amount' => 2,
      'pay_unit' => "Day",
      'pay_currency' => "",// "USD",
      'pay_annualized_est' => 3,
      'jobcontract_id' => 1,
    ));

    // creating Leave entity:
    civicrm_api3('HRJobLeave', 'create', array(
      'sequential' => 1,
      'leave_type' => '',
      'leave_amount' => 1,
      'jobcontract_id' => 1,
    ));

    // creating Pension entity:
    civicrm_api3('HRJobPension', 'create', array(
      'sequential' => 1,
      'ee_contrib_pct' => 1,
      'er_contrib_pct' => 2,
      'ee_contrib_abs' => 3,
      'ee_evidence_note' => 4,
      'is_enrolled' => 5,
      'pension_type' => "",
      'jobcontract_id' => 1,
    ));
      
    $current_revision = civicrm_api3('HRJobContractRevision', 'getcurrentrevision', array(
        'sequential' => 1,
        'jobcontract_id' => 1,
    ));
    
    $this->assertAPIArrayComparison($current_revision['values'], $expected);
  }
}