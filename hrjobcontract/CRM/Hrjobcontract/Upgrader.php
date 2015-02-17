<?php

/**
 * Collection of upgrade steps
 */
class CRM_Hrjobcontract_Upgrader extends CRM_Hrjobcontract_Upgrader_Base {

  public function install() {
      
    // $this->executeCustomDataFile('xml/customdata.xml');
    $this->executeSqlFile('sql/install.sql');
    $this->migrateData();
    $this->upgradeBundle();
  }
  
  /*
   * Migrate old HRJob existing data into new HRJobContract entities.
   */
  protected function migrateData()
  {
    $hrJob = CRM_Core_DAO::executeQuery('SELECT * FROM civicrm_hrjob ORDER BY id ASC');
    while ($hrJob->fetch())
    {
        // Creating Job Contract:
        $insertContractQuery = 'INSERT INTO civicrm_hrjobcontract SET contact_id = %1';
        $insertContractParams = array(1 => array($hrJob->contact_id, 'Integer'));
        CRM_Core_DAO::executeQuery($insertContractQuery, $insertContractParams);
        $jobContractId = (int)CRM_Core_DAO::singleValueQuery('SELECT LAST_INSERT_ID()');
        
        // Creating Job Contract Revision:
        $insertRevisionQuery = 'INSERT INTO civicrm_hrjobcontract_revision SET jobcontract_id = %1';
        $insertRevisionParams = array(1 => array($jobContractId, 'Integer'));
        CRM_Core_DAO::executeQuery($insertRevisionQuery, $insertRevisionParams);
        $revisionId = (int)CRM_Core_DAO::singleValueQuery('SELECT LAST_INSERT_ID()');
        
        // Populating data with existing HRJob entities:
        $this->populateTableWithEntity(
            'civicrm_hrjobcontract_details',
            $hrJob,
            array(
                'position' => 'String',
                'title' => 'String',
                'funding_notes' => 'String',
                'contract_type' => 'String',
                'period_type' => 'String',
                'period_start_date' => 'Date',
                'period_end_date' => 'Date',
                'notice_amount' => 'Float',
                'notice_unit' => 'String',
                'notice_amount_employee' => 'Float',
                'notice_unit_employee' => 'String',
                'location' => 'String',
                'is_primary' => 'Integer',
            ),
            $revisionId
        );
        
        $healthRevisionId = 0;
        $hrJobHealth = CRM_Core_DAO::executeQuery('SELECT * FROM civicrm_hrjob_health WHERE job_id = %1', array(1 => array($hrJob->id, 'Integer')));
        while ($hrJobHealth->fetch())
        {
            $this->populateTableWithEntity(
                'civicrm_hrjobcontract_health',
                $hrJobHealth,
                array(
                    'provider' => 'Integer',
                    'plan_type' => 'String',
                    'description' => 'String',
                    'dependents' => 'String',
                    'provider_life_insurance' => 'Integer',
                    'plan_type_life_insurance' => 'String',
                    'description_life_insurance' => 'String',
                    'dependents_life_insurance' => 'String',
                ),
                $revisionId
            );
            $healthRevisionId = $revisionId;
        }
        
        $hourRevisionId = 0;
        $hrJobHour = CRM_Core_DAO::executeQuery('SELECT * FROM civicrm_hrjob_hour WHERE job_id = %1', array(1 => array($hrJob->id, 'Integer')));
        while ($hrJobHour->fetch())
        {
            $this->populateTableWithEntity(
                'civicrm_hrjobcontract_hour',
                $hrJobHour,
                array(
                    'hours_type' => 'String',
                    'hours_amount' => 'Float',
                    'hours_unit' => 'String',
                    'hours_fte' => 'Float',
                    'fte_num' => 'Integer',
                    'fte_denom' => 'Integer',
                ),
                $revisionId
            );
            $hourRevisionId = $revisionId;
        }
        
        // MULTIPLE
        $leaveRevisionId = 0;
        $hrJobLeave = CRM_Core_DAO::executeQuery('SELECT * FROM civicrm_hrjob_leave WHERE job_id = %1', array(1 => array($hrJob->id, 'Integer')));
        while ($hrJobLeave->fetch())
        {
            $this->populateTableWithEntity(
                'civicrm_hrjobcontract_leave',
                $hrJobLeave,
                array(
                    'leave_type' => 'Integer',
                    'leave_amount' => 'Integer',
                ),
                $revisionId
            );
            $leaveRevisionId = $revisionId;
        }
        
        $payRevisionId = 0;
        $hrJobPay = CRM_Core_DAO::executeQuery('SELECT * FROM civicrm_hrjob_pay WHERE job_id = %1', array(1 => array($hrJob->id, 'Integer')));
        while ($hrJobPay->fetch())
        {
            $this->populateTableWithEntity(
                'civicrm_hrjobcontract_pay',
                $hrJobPay,
                array(
                    'pay_scale' => 'String',
                    'is_paid' => 'Integer',
                    'pay_amount' => 'Float',
                    'pay_unit' => 'String',
                    'pay_currency' => 'String',
                    'pay_annualized_est' => 'Float',
                    'pay_is_auto_est' => 'Integer',
                ),
                $revisionId
            );
            $payRevisionId = $revisionId;
        }
        
        $pensionRevisionId = 0;
        $hrJobPension = CRM_Core_DAO::executeQuery('SELECT * FROM civicrm_hrjob_pension WHERE job_id = %1', array(1 => array($hrJob->id, 'Integer')));
        while ($hrJobPension->fetch())
        {
            $this->populateTableWithEntity(
                'civicrm_hrjobcontract_pension',
                $hrJobPension,
                array(
                    'is_enrolled' => 'Integer',
                    'ee_contrib_pct' => 'Float',
                    'er_contrib_pct' => 'Float',
                    'pension_type' => 'String',
                    'ee_contrib_abs' => 'Float',
                    'ee_evidence_note' => 'String',
                ),
                $revisionId
            );
            $pensionRevisionId = $revisionId;
        }
        
        // MULTIPLE
        $roleRevisionId = 0;
        $hrJobRole = CRM_Core_DAO::executeQuery('SELECT * FROM civicrm_hrjob_role WHERE job_id = %1', array(1 => array($hrJob->id, 'Integer')));
        while ($hrJobRole->fetch())
        {
            $this->populateTableWithEntity(
                'civicrm_hrjobcontract_role',
                $hrJobRole,
                array(
                    'title' => 'String',
                    'description' => 'String',
                    'hours' => 'Float',
                    'role_hours_unit' => 'String',
                    'region' => 'String',
                    'department' => 'String',
                    'level_type' => 'String',
                    'manager_contact_id' => 'Integer',
                    'functional_area' => 'String',
                    'organization' => 'String',
                    'cost_center' => 'String',
                    'funder' => 'String',
                    'percent_pay_funder' => 'String',
                    'percent_pay_role' => 'Integer',
                    'location' => 'String',
                ),
                $revisionId
            );
            $roleRevisionId = $revisionId;
        }
        
        // Creating entities entries with default values for non existing entities.
        if (!$healthRevisionId)
        {
            CRM_Core_DAO::executeQuery(
                'INSERT INTO civicrm_hrjobcontract_health SET jobcontract_revision_id = %1',
                array(1 => array($revisionId, 'Integer'))
            );
        }
        if (!$hourRevisionId)
        {
            CRM_Core_DAO::executeQuery(
                'INSERT INTO civicrm_hrjobcontract_hour SET jobcontract_revision_id = %1',
                array(1 => array($revisionId, 'Integer'))
            );
        }
        if (!$payRevisionId)
        {
            CRM_Core_DAO::executeQuery(
                'INSERT INTO civicrm_hrjobcontract_pay SET jobcontract_revision_id = %1',
                array(1 => array($revisionId, 'Integer'))
            );
        }
        if (!$pensionRevisionId)
        {
            CRM_Core_DAO::executeQuery(
                'INSERT INTO civicrm_hrjobcontract_pension SET jobcontract_revision_id = %1',
                array(1 => array($revisionId, 'Integer'))
            );
        }
        
        // Updating Revision:
        $updateRevisionQuery = 'UPDATE civicrm_hrjobcontract_revision SET '
            . 'details_revision_id = %1,'
            . 'health_revision_id = %2,'
            . 'hour_revision_id = %3,'
            . 'leave_revision_id = %4,'
            . 'pay_revision_id = %5,'
            . 'pension_revision_id = %6,'
            . 'role_revision_id = %7,'
            . 'created_date = %8,'
            . 'modified_date = %9,'
            . 'status = %10'
            . ' WHERE id = %11';
        $updateRevisionParams = array(
            1 => array($revisionId, 'Integer'),
            2 => array($revisionId, 'Integer'),
            3 => array($revisionId, 'Integer'),
            4 => array($leaveRevisionId, 'Integer'),
            5 => array($revisionId, 'Integer'),
            6 => array($revisionId, 'Integer'),
            7 => array($roleRevisionId, 'Integer'),
            8 => array(CRM_Utils_Date::getToday( null, 'YmdHis' ), 'Timestamp'),
            9 => array(CRM_Utils_Date::getToday( null, 'YmdHis' ), 'Timestamp'),
            10 => array(1, 'Integer'),
            11 => array($revisionId, 'Integer'),
        );
        
        CRM_Core_DAO::executeQuery($updateRevisionQuery, $updateRevisionParams);

    }
      
    return true;
  }
  
  protected function populateTableWithEntity($tableName, $entity, array $fields, $revisionId)
    {
        $insertQuery = "INSERT INTO {$tableName} SET ";
        $insertParams = array(1 => array($revisionId, 'Integer'));
        
        foreach ($fields as $name => $type)
        {
            $value = $entity->{$name};
            if ($value !== null)
            {
                switch ($type)
                {
                    case 'String':
                    case 'Date':
                    case 'Timestamp':
                        $value = '"' . $value . '"';
                    break;
                }
            }
            else
            {
                $value = 'NULL';
            }
            
            $insertQuery .= "{$name} = {$value},";
        }
        $insertQuery .= "jobcontract_revision_id = %1";
        
        return CRM_Core_DAO::executeQuery($insertQuery, $insertParams);
    }
    
  public function upgradeBundle() {
    //$this->ctx->log->info('Applying update 0999');
    $this->executeCustomDataFile('xml/option_group_install.xml');

    //$this->ctx->log->info('Applying update 1101');
    $this->executeCustomDataFile('xml/1101_departments.xml');

    //$this->ctx->log->info('Applying update 1103');
    if (!CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup','hrjc_life_provider', 'name')) {
      $this->executeCustomDataFile('xml/1103_life_provider.xml');
    }

    //$this->ctx->log->info('Applying update 1105');
    if (!CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup','hrjc_pension_type', 'name')) {
      $this->executeCustomDataFile('xml/1105_pension_type.xml');
    }

    /* DEPRECATED:
    //$this->ctx->log->info('Applying update 1201');
    //get all fields of Custom Group "HRJob_Summary"
    $params = array(
      'custom_group_id' => 'HRJob_Summary',
    );
    $results = civicrm_api3('CustomField', 'get', $params);
    foreach ($results['values'] as $result) {
      $result['is_view'] = 0; // make the field editable
      civicrm_api3('CustomField', 'create', $result);
    }
    //disable trigger
    CRM_Core_DAO::triggerRebuild();*/
    
    //$this->ctx->log->info('Applying update 1202');
    //Add job import navigation menu
    $weight = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_Navigation', 'Import Contacts', 'weight', 'name');
    $contactNavId = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_Navigation', 'Contacts', 'id', 'name');
    $importJobNavigation = new CRM_Core_DAO_Navigation();
    $params = array (
      'domain_id'  => CRM_Core_Config::domainID(),
      'label'      => ts('Import Jobs'),
      'name'       => 'jobImport',
      'url'        => null,
      'parent_id'  => $contactNavId,
      'weight'     => $weight+1,
      'permission' => 'access HRJobs',
      'separator'  => 1,
      'is_active'  => 1
    );
    $importJobNavigation->copyValues($params);
    $importJobNavigation->save();
    //$this->ctx->log->info('Applying update 1400');
    $optionGroupID = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup', 'hrjc_pay_scale', 'id', 'name');
    if (!$optionGroupID) {
        $params = array(
          'name' => 'hrjc_pay_scale',
          'title' => 'Pay Scale',
          'is_active' => 1,
          'is_reserved' => 1,
        );
        civicrm_api3('OptionGroup', 'create', $params);
        $optionsValue = array('NJC pay scale', 'JNC pay scale', 'Soulbury Pay Agreement');
        foreach ($optionsValue as $key => $value) {
          $opValueParams = array(
            'option_group_id' => 'hrjc_pay_scale',
            'name' => $value,
            'label' => $value,
            'value' => $value,
          );
          civicrm_api3('OptionValue', 'create', $opValueParams);
        }
    }
    
    $i = 4;
    $params = array(
      'option_group_id' => 'hrjc_contract_type',
      'name' => 'Employee_Permanent',
      'weight' => $i,
      'label' => 'Employee - Permanent',
      'value' => 'Employee - Permanent',
    );
    civicrm_api3('OptionValue', 'create',$params);
    /* DEPRECATED:
    $empoption_id = civicrm_api3('OptionValue', 'getsingle', array('return' => "id",'option_group_id' => 'hrjc_contract_type', 'name' => "Employee"));
    civicrm_api3('OptionValue', 'create',array('id' => $empoption_id['id'],'name' => "Employee_Temporary",'label' => 'Employee - Temporary', 'value' => 'Employee - Temporary'));
    */
    $optionGroupID = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup', 'hrjc_contract_type', 'id', 'name');
    foreach (array('Intern','Trustee','Volunteer') as $opName) {
      $i++;
      CRM_Core_DAO::executeQuery("UPDATE civicrm_option_value SET weight = {$i} WHERE name = '{$opName}' and option_group_id = {$optionGroupID}");
    }
    $optionGroupId = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup', 'hrjc_hours_type', 'id', 'name');
    //change value of stored hours type
    CRM_Core_DAO::executeQuery("UPDATE civicrm_hrjobcontract_hour SET hours_type = CASE hours_type WHEN 'full' THEN 8 WHEN 'part' THEN 4 WHEN 'casual' THEN 0 ELSE NULL END");

    //$this->ctx->log->info('Applying update 1402');
    //Upgrade for HR-394 and HR-395
    $optionGroupID = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup', 'hrjc_region', 'id', 'name');
    if (!$optionGroupID) {
      $params = array(
        'name' => 'hrjc_region',
        'title' => 'Region',
        'is_active' => 1,
      );
      civicrm_api3('OptionGroup', 'create', $params);
    }

    $result = CRM_Core_DAO::executeQuery('SELECT * FROM civicrm_hrjobcontract_hour ORDER BY id ASC');
    while ($result->fetch())
    {
        $fteFraction = CRM_Hrjobcontract_Upgrader::decToFraction($result->hours_fte);
        CRM_Core_DAO::executeQuery("UPDATE civicrm_hrjobcontract_hour SET fte_num={$fteFraction[0]} , fte_denom={$fteFraction[1]} WHERE id = {$result->id}");
    }

    //$this->ctx->log->info('Applying update 1404');
    $optionGroupId = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup', 'hrjc_pay_grade', 'id', 'name');
    $sql = "UPDATE civicrm_option_value SET civicrm_option_value.value = CASE civicrm_option_value.label WHEN 'Paid' THEN 1 WHEN 'Unpaid' THEN 0 END WHERE option_group_id = $optionGroupId";
    CRM_Core_DAO::executeQuery($sql);
    CRM_Core_DAO::triggerRebuild();

    CRM_Core_DAO::executeQuery("INSERT INTO `civicrm_option_value` (`option_group_id`, `label`, `value`, `name`, `grouping`, `filter`, `is_default`, `weight`, `description`, `is_optgroup`, `is_reserved`, `is_active`, `component_id`, `domain_id`, `visibility_id`) VALUES
        (40, 'JobContract Revision Report', 'hrjobcontract/summary', 'CRM_Hrjobcontract_Report_Form_Summary', NULL, 0, 0, 54, 'JobContract Revision Report', 0, 0, 1, NULL, NULL, NULL)");

    CRM_Core_DAO::executeQuery("INSERT INTO `civicrm_setting` (`group_name`, `name`, `value`, `domain_id`, `contact_id`, `is_domain`, `component_id`, `created_date`, `created_id`) VALUES
        ('hrjobcontract', 'work_days_per_month', 'i:22;', 1, NULL, 1, NULL, '2014-12-01 03:01:02', NULL),
        ('hrjobcontract', 'work_days_per_week', 'i:5;', 1, NULL, 1, NULL, '2014-12-01 03:01:02', NULL),
        ('hrjobcontract', 'work_hour_per_day', 'i:8;', 1, NULL, 1, NULL, '2014-12-01 03:01:02', NULL),
        ('hrjobcontract', 'work_months_per_year', 'i:12;', 1, NULL, 1, NULL, '2014-12-01 03:01:02', NULL),
        ('hrjobcontract', 'work_weeks_per_year', 'i:50;', 1, NULL, 1, NULL, '2014-12-01 03:01:02', NULL)");

    CRM_Core_DAO::executeQuery("ALTER TABLE `civicrm_hrjobcontract_hour` ADD `location_type` INT(3) NULL DEFAULT NULL AFTER `id`");

    CRM_Core_DAO::executeQuery("ALTER TABLE `civicrm_hrjobcontract_revision` ADD `effective_date` DATE NULL DEFAULT NULL AFTER `modified_date`, ADD `change_reason` INT(3) NULL DEFAULT NULL AFTER `effective_date`");

    CRM_Core_DAO::executeQuery("ALTER TABLE `civicrm_hrjobcontract_hour` CHANGE `location_type` `location_standard_hours` INT(3) NULL DEFAULT NULL");

    CRM_Core_DAO::executeQuery("DROP TABLE IF EXISTS civicrm_hrhours_location");
    CRM_Core_DAO::executeQuery("
        CREATE TABLE IF NOT EXISTS `civicrm_hrhours_location` (
        `id` int(10) unsigned NOT NULL,
          `location` varchar(63) DEFAULT NULL,
          `standard_hours` int(4) DEFAULT NULL,
          `periodicity` varchar(63) DEFAULT NULL,
          `is_active` tinyint(4) DEFAULT '1'
        ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1
      ");
      CRM_Core_DAO::executeQuery("
        INSERT INTO `civicrm_hrhours_location` (`id`, `location`, `standard_hours`, `periodicity`, `is_active`) VALUES
        (1, 'Head office', 40, 'Week', 1),
        (2, 'Other office', 8, 'Day', 1),
        (3, 'Small office', 36, 'Week', 1)
      ");

    $optionGroupID = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup', 'hrjc_revision_change_reason', 'id', 'name');
    if (!$optionGroupID) {
        $params = array(
          'name' => 'hrjc_revision_change_reason',
          'title' => 'Job Contract Revision Change Reason',
          'is_active' => 1,
          'is_reserved' => 1,
        );
        civicrm_api3('OptionGroup', 'create', $params);
        $optionsValue = array(
            1 => 'Reason 1',
            2 => 'Reason 2',
            3 => 'Reason 3',
        );
        foreach ($optionsValue as $key => $value) {
          $opValueParams = array(
            'option_group_id' => 'hrjc_revision_change_reason',
            'name' => $value,
            'label' => $value,
            'value' => $key,
          );
          civicrm_api3('OptionValue', 'create', $opValueParams);
        }
    }

    CRM_Core_DAO::executeQuery("
        ALTER TABLE `civicrm_hrjobcontract_pay` ADD `annual_benefits` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL AFTER `pay_is_auto_est`, ADD `annual_deductions` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL AFTER `annual_benefits`
    ");

    CRM_Core_DAO::executeQuery("DROP TABLE IF EXISTS civicrm_hrpay_scale");
    CRM_Core_DAO::executeQuery("
        CREATE TABLE IF NOT EXISTS `civicrm_hrpay_scale` (
        `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
          `pay_scale` VARCHAR(63) DEFAULT NULL,
          `pay_grade` VARCHAR(63) DEFAULT NULL,
          `currency` VARCHAR(63) DEFAULT NULL,
          `amount` DECIMAL(10,2) DEFAULT NULL,
          `periodicity` VARCHAR(63) DEFAULT NULL,
          `is_active` tinyint(4) DEFAULT '1',
          PRIMARY KEY(id)
        ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1
      ");
      CRM_Core_DAO::executeQuery("
        INSERT INTO `civicrm_hrpay_scale` (`id`, `pay_scale`, `pay_grade`, `currency`, `amount`, `periodicity`, `is_active`) VALUES
        (1, 'NJC pay scale', '', '', NULL, '', 1),
        (2, 'JNC pay scale', '', '', NULL, '', 1),
        (3, 'Soulbury Pay Agreement', '', '', NULL, '', 1),
        (4, 'US', 'Senior', 'USD', 38000, 'Year', 1),
        (5, 'US', 'Junior', 'USD', 24000, 'Year', 1),
        (6, 'UK', 'Senior', 'GBP', 35000, 'Year', 1),
        (7, 'UK', 'Junior', 'GBP', 22000, 'Year', 1),
        (8, 'Not Applicable', NULL, NULL, NULL, NULL, 1)
      ");

    CRM_Core_DAO::executeQuery("DROP TABLE IF EXISTS civicrm_hrhours_location");
      CRM_Core_DAO::executeQuery("
        CREATE TABLE IF NOT EXISTS `civicrm_hrhours_location` (
        `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
          `location` varchar(63) DEFAULT NULL,
          `standard_hours` int(4) DEFAULT NULL,
          `periodicity` varchar(63) DEFAULT NULL,
          `is_active` tinyint(4) DEFAULT '1',
          PRIMARY KEY(id)
        ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1
      ");
      CRM_Core_DAO::executeQuery("
        INSERT INTO `civicrm_hrhours_location` (`id`, `location`, `standard_hours`, `periodicity`, `is_active`) VALUES
        (1, 'Head office', 40, 'Week', 1),
        (2, 'Other office', 8, 'Day', 1),
        (3, 'Small office', 36, 'Week', 1)
      ");

    // pay_cycle:
    $optionGroupID = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup', 'hrjc_pay_cycle', 'id', 'name');
    if (!$optionGroupID) {
        $params = array(
          'name' => 'hrjc_pay_cycle',
          'title' => 'Job Contract Pay Cycle',
          'is_active' => 1,
          'is_reserved' => 1,
        );
        civicrm_api3('OptionGroup', 'create', $params);
        $optionsValue = array(
            1 => 'Weekly',
            2 => 'Monthly',
        );
        foreach ($optionsValue as $key => $value) {
          $opValueParams = array(
            'option_group_id' => 'hrjc_pay_cycle',
            'name' => $value,
            'label' => $value,
            'value' => $key,
          );
          civicrm_api3('OptionValue', 'create', $opValueParams);
        }
    }
    
    // benefit_name:
    $optionGroupID = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup', 'hrjc_benefit_name', 'id', 'name');
    if (!$optionGroupID) {
        $params = array(
          'name' => 'hrjc_benefit_name',
          'title' => 'Job Contract Benefit Name',
          'is_active' => 1,
          'is_reserved' => 1,
        );
        civicrm_api3('OptionGroup', 'create', $params);
        $optionsValue = array(
            1 => 'Bike',
            2 => 'Medical',
        );
        foreach ($optionsValue as $key => $value) {
          $opValueParams = array(
            'option_group_id' => 'hrjc_benefit_name',
            'name' => $value,
            'label' => $value,
            'value' => $key,
          );
          civicrm_api3('OptionValue', 'create', $opValueParams);
        }
    }
    
    // benefit_type:
    $optionGroupID = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup', 'hrjc_benefit_type', 'id', 'name');
    if (!$optionGroupID) {
        $params = array(
          'name' => 'hrjc_benefit_type',
          'title' => 'Job Contract Benefit Type',
          'is_active' => 1,
          'is_reserved' => 1,
        );
        civicrm_api3('OptionGroup', 'create', $params);
        $optionsValue = array(
            1 => 'Fixed',
            2 => '%',
        );
        foreach ($optionsValue as $key => $value) {
          $opValueParams = array(
            'option_group_id' => 'hrjc_benefit_type',
            'name' => $value,
            'label' => $value,
            'value' => $key,
          );
          civicrm_api3('OptionValue', 'create', $opValueParams);
        }
    }
    
    // deduction_name:
    $optionGroupID = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup', 'hrjc_deduction_name', 'id', 'name');
    if (!$optionGroupID) {
        $params = array(
          'name' => 'hrjc_deduction_name',
          'title' => 'Job Contract Deduction Name',
          'is_active' => 1,
          'is_reserved' => 1,
        );
        civicrm_api3('OptionGroup', 'create', $params);
        $optionsValue = array(
            1 => 'Bike',
            2 => 'Medical',
        );
        foreach ($optionsValue as $key => $value) {
          $opValueParams = array(
            'option_group_id' => 'hrjc_deduction_name',
            'name' => $value,
            'label' => $value,
            'value' => $key,
          );
          civicrm_api3('OptionValue', 'create', $opValueParams);
        }
    }
    
    // deduction_type:
    $optionGroupID = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup', 'hrjc_deduction_type', 'id', 'name');
    if (!$optionGroupID) {
        $params = array(
          'name' => 'hrjc_deduction_type',
          'title' => 'Job Contract Deduction Type',
          'is_active' => 1,
          'is_reserved' => 1,
        );
        civicrm_api3('OptionGroup', 'create', $params);
        $optionsValue = array(
            1 => 'Fixed',
            2 => '%',
        );
        foreach ($optionsValue as $key => $value) {
          $opValueParams = array(
            'option_group_id' => 'hrjc_deduction_type',
            'name' => $value,
            'label' => $value,
            'value' => $key,
          );
          civicrm_api3('OptionValue', 'create', $opValueParams);
        }
    }

    CRM_Core_DAO::executeQuery("ALTER TABLE `civicrm_hrjobcontract_pay`  ADD `pay_cycle` INT(4) DEFAULT NULL  AFTER `annual_deductions`,  ADD `pay_per_cycle_gross` DECIMAL(10,2)  DEFAULT NULL  AFTER `pay_cycle`,  ADD `pay_per_cycle_net` DECIMAL(10,2)  DEFAULT NULL  AFTER `pay_per_cycle_gross`");

    CRM_Core_DAO::executeQuery("ALTER TABLE `civicrm_hrjobcontract_revision` ADD `editor_uid` INT(10) NULL DEFAULT NULL AFTER `jobcontract_id`");
    
      CRM_Core_DAO::executeQuery("
        INSERT INTO `civicrm_hrpay_scale` (`id`, `pay_scale`, `pay_grade`, `currency`, `amount`, `periodicity`, `is_active`) VALUES
        (8, 'Not Applicable', NULL, NULL, NULL, NULL, 1)
      ");
    
      CRM_Core_DAO::executeQuery("ALTER TABLE `civicrm_hrjobcontract` ADD `deleted` INT(2) UNSIGNED NOT NULL DEFAULT '0'");
      CRM_Core_DAO::executeQuery("ALTER TABLE `civicrm_hrjobcontract_revision` ADD `deleted` INT(2) UNSIGNED NOT NULL DEFAULT '0'");
  }
          
  function decToFraction($fte) {
    $fteDecimalPart = explode('.', $fte);
    $array = array();
    if (!empty($fteDecimalPart[1])) {
        $array  = str_split($fteDecimalPart[1]);
    }
    $numerators = array(0, 1);
    $denominators = array(1, 0);
    $tempFte = $fte;
    $result= '';
    //check whether same value is repeating  in decimal like 3 is repeating in 0.33333 0.33 and have value in decimal more than 1
    if(count(array_unique($array)) == 1 && count($array) != 1) {
      $repeatNum = array_unique($array);
      $num = $repeatNum[0];
      $denom = 9;
      $gcd = CRM_Hrjobcontract_Upgrader::commonDivisor($num,$denom);
      $val = array($num/$gcd, $denom/$gcd);
      return $val;
    }
    else {
      for ($i = 2; $i < 1000; $i++) {
        $floorFte = floor($tempFte);
        $numerators[$i] = $floorFte * $numerators[$i-1] + $numerators[$i-2];
        $denominators[$i] = $floorFte * $denominators[$i-1] + $denominators[$i-2];
        $result = '';
        if ($denominators[$i] != 0) {
          $result = $numerators[$i] / $denominators[$i];
        }
        if ((string)$result == (string)$fte) {
          $num = $numerators[$i];
          $denom = $denominators[$i];
          $val = array($num, $denom);
          return $val;
        }
        if ($tempFte-$floorFte != 0) {
          $tempFte = 1/($tempFte-$floorFte);
        }
      }
    }
  }

  function commonDivisor($a,$b) {
    return ($a % $b) ? CRM_Hrjobcontract_Upgrader::commonDivisor($b,$a % $b) : $b;
  }

}
