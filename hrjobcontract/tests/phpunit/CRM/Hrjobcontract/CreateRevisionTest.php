<?php

require_once 'HRJobContractTestBase.php';

/**
 * FIXME
 */
class CRM_Hrjobcontract_CreateRevisionTest extends HRJobContractTestBase {
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
    
    
    $this->createJobContract();
    $this->createJobContractEntities(1);
      
    $current_revision = civicrm_api3('HRJobContractRevision', 'getcurrentrevision', array(
        'sequential' => 1,
        'jobcontract_id' => 1,
    ));
    
    $this->assertAPIArrayComparison($current_revision['values'], $expected);
  }
}