<?php

/**
 * Collection of upgrade steps
 */
class CRM_Hrjobcontract_Upgrader extends CRM_Hrjobcontract_Upgrader_Base {

  public function install() {
    // $this->executeCustomDataFile('xml/customdata.xml');
    $this->executeSqlFile('sql/install.sql');
    
    CRM_Core_DAO::executeQuery("
      INSERT INTO `civicrm_contact` (`contact_type`, `contact_sub_type`, `do_not_email`, `do_not_phone`, `do_not_mail`, `do_not_sms`, `do_not_trade`, `is_opt_out`, `legal_identifier`, `external_identifier`, `sort_name`, `display_name`, `nick_name`, `legal_name`, `image_URL`, `preferred_communication_method`, `preferred_language`, `preferred_mail_format`, `hash`, `api_key`, `source`, `first_name`, `middle_name`, `last_name`, `prefix_id`, `suffix_id`, `formal_title`, `communication_style_id`, `email_greeting_id`, `email_greeting_custom`, `email_greeting_display`, `postal_greeting_id`, `postal_greeting_custom`, `postal_greeting_display`, `addressee_id`, `addressee_custom`, `addressee_display`, `job_title`, `gender_id`, `birth_date`, `is_deceased`, `deceased_date`, `household_name`, `primary_contact_id`, `organization_name`, `sic_code`, `user_unique_id`, `employer_id`, `is_deleted`, `created_date`, `modified_date`) VALUES
      ('Individual', NULL, 0, 0, 0, 0, 0, 0, NULL, NULL, 'apiclient', 'apiclient@compucorp.co.uk', NULL, NULL, NULL, NULL, 'en_US', 'Both', '', 'demoapikey', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 'Dear', 1, NULL, 'Dear', 1, NULL, '', NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2014-12-01 13:59:51', '2014-12-11 15:51:50');
    ");
    
    $this->migrateData();
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
        }
        
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
        }
        
        // MULTIPLE
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
        }
        
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
        }
        
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
        }
        
        // MULTIPLE
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
            4 => array($revisionId, 'Integer'),
            5 => array($revisionId, 'Integer'),
            6 => array($revisionId, 'Integer'),
            7 => array($revisionId, 'Integer'),
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
  
/*  public function upgrade_u0010() {
      $this->ctx->log->info('Applying update 0010');
      CRM_Core_DAO::executeQuery("
        INSERT INTO `civicrm_contact` (`contact_type`, `contact_sub_type`, `do_not_email`, `do_not_phone`, `do_not_mail`, `do_not_sms`, `do_not_trade`, `is_opt_out`, `legal_identifier`, `external_identifier`, `sort_name`, `display_name`, `nick_name`, `legal_name`, `image_URL`, `preferred_communication_method`, `preferred_language`, `preferred_mail_format`, `hash`, `api_key`, `source`, `first_name`, `middle_name`, `last_name`, `prefix_id`, `suffix_id`, `formal_title`, `communication_style_id`, `email_greeting_id`, `email_greeting_custom`, `email_greeting_display`, `postal_greeting_id`, `postal_greeting_custom`, `postal_greeting_display`, `addressee_id`, `addressee_custom`, `addressee_display`, `job_title`, `gender_id`, `birth_date`, `is_deceased`, `deceased_date`, `household_name`, `primary_contact_id`, `organization_name`, `sic_code`, `user_unique_id`, `employer_id`, `is_deleted`, `created_date`, `modified_date`) VALUES
        ('Individual', NULL, 0, 0, 0, 0, 0, 0, NULL, NULL, 'apiclient', 'apiclient@compucorp.co.uk', NULL, NULL, NULL, NULL, 'en_US', 'Both', '', 'demoapikey', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 'Dear', 1, NULL, 'Dear', 1, NULL, '', NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2014-12-01 13:59:51', '2014-12-11 15:51:50');
      ");
      return TRUE;
  }*/
  
  public function upgrade_u0999() {
    $this->ctx->log->info('Applying update 0999');
    $this->executeCustomDataFile('xml/option_group_install.xml');
    return TRUE;
  }

  public function upgrade_u1101() {
    $this->ctx->log->info('Applying update 1101');
    $this->executeCustomDataFile('xml/1101_departments.xml');
    return TRUE;
  }

  public function upgrade_u1103() {
    $this->ctx->log->info('Applying update 1103');
    
    if (!CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup','hrjc_life_provider', 'name')) {
      $this->executeCustomDataFile('xml/1103_life_provider.xml');
    }
    return TRUE;
  }
  public function upgrade_u1105() {
    $this->ctx->log->info('Applying update 1105');
    
    if (!CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup','hrjc_pension_type', 'name')) {
      $this->executeCustomDataFile('xml/1105_pension_type.xml');
    }
    return TRUE;
  }

  public function upgrade_u1201() {
    $this->ctx->log->info('Applying update 1201');

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
    CRM_Core_DAO::triggerRebuild();

    return TRUE;
  }

  public function upgrade_u1202() {
    $this->ctx->log->info('Applying update 1202');

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
    return TRUE;
  }

  public function upgrade_u1400() {
    $this->ctx->log->info('Applying update 1400');

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
    $empoption_id = civicrm_api3('OptionValue', 'getsingle', array('return' => "id",'option_group_id' => 'hrjc_contract_type', 'name' => "Employee"));
    civicrm_api3('OptionValue', 'create',array('id' => $empoption_id['id'],'name' => "Employee_Temporary",'label' => 'Employee - Temporary', 'value' => 'Employee - Temporary'));
    $optionGroupID = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup', 'hrjc_contract_type', 'id', 'name');

    foreach (array('Intern','Trustee','Volunteer') as $opName) {
      $i++;
      CRM_Core_DAO::executeQuery("UPDATE civicrm_option_value SET weight = {$i} WHERE name = '{$opName}' and option_group_id = {$optionGroupID}");
    }

    $optionGroupId = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup', 'hrjc_hours_type', 'id', 'name');

    //change value of stored hours type
    CRM_Core_DAO::executeQuery("UPDATE civicrm_hrjobcontract_hour SET hours_type = CASE hours_type WHEN 'full' THEN 8 WHEN 'part' THEN 4 WHEN 'casual' THEN 0 ELSE NULL END");
    return TRUE;
  }

  public function upgrade_u1401() {
    $this->ctx->log->info('Applying update 1401');
    $administerNavId = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_Navigation', 'Dropdown Options', 'id', 'name');
    $params = array(
      'label'      => ts('Hours Types'),
      'name'       => 'hoursType',
      'url'        => 'civicrm/hour/editoption',
      'permission' => 'administer CiviCRM',
      'parent_id'  => $administerNavId,
      'is_active' => 1,
    );
    CRM_Core_BAO_Navigation::add($params);
    CRM_Core_BAO_Navigation::resetNavigation();
    return TRUE;
  }

  public function upgrade_u1402() {
    $this->ctx->log->info('Applying update 1402');
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

    return TRUE;
  }

  public function upgrade_u1403() {
    $this->ctx->log->info('Applying update 1403');

    $result = civicrm_api3('HRJobHour', 'get');
    foreach ($result['values'] as $key => $value) {
      $fteFraction = CRM_Hrjobcontract_Upgrader::decToFraction($value['hours_fte']);
      CRM_Core_DAO::executeQuery("update civicrm_hrjobcontract_hour set fte_num={$fteFraction[0]} , fte_denom={$fteFraction[1]} where id = {$value['id']}");
    }
    return TRUE;
  }

  public function upgrade_u1404() {
    $this->ctx->log->info('Applying update 1404');

    $optionGroupId = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_OptionGroup', 'hrjc_pay_grade', 'id', 'name');
    $sql = "UPDATE civicrm_option_value SET civicrm_option_value.value = CASE civicrm_option_value.label WHEN 'Paid' THEN 1 WHEN 'Unpaid' THEN 0 END WHERE option_group_id = $optionGroupId";
    CRM_Core_DAO::executeQuery($sql);

    CRM_Core_DAO::triggerRebuild();
    return TRUE;
  }
  
  public function upgrade_z9111() {
      CRM_Core_DAO::executeQuery("UPDATE civicrm_contact SET api_key = 'demoapikey' WHERE sort_name = 'demo@example.com'");
      return TRUE;
  }
  
  public function upgrade_z9112() {
      CRM_Core_DAO::executeQuery("INSERT INTO `civicrm_option_value` (`option_group_id`, `label`, `value`, `name`, `grouping`, `filter`, `is_default`, `weight`, `description`, `is_optgroup`, `is_reserved`, `is_active`, `component_id`, `domain_id`, `visibility_id`) VALUES
        (40, 'JobContract Revision Report', 'hrjobcontract/summary', 'CRM_Hrjobcontract_Report_Form_Summary', NULL, 0, 0, 54, 'JobContract Revision Report', 0, 0, 1, NULL, NULL, NULL)");
      return TRUE;
  }
  
  public function upgrade_z9113() {
      CRM_Core_DAO::executeQuery("INSERT INTO `civicrm_setting` (`group_name`, `name`, `value`, `domain_id`, `contact_id`, `is_domain`, `component_id`, `created_date`, `created_id`) VALUES
        ('hrjobcontract', 'work_days_per_month', 'i:22;', 1, NULL, 1, NULL, '2014-12-01 03:01:02', NULL),
        ('hrjobcontract', 'work_days_per_week', 'i:5;', 1, NULL, 1, NULL, '2014-12-01 03:01:02', NULL),
        ('hrjobcontract', 'work_hour_per_day', 'i:8;', 1, NULL, 1, NULL, '2014-12-01 03:01:02', NULL),
        ('hrjobcontract', 'work_months_per_year', 'i:12;', 1, NULL, 1, NULL, '2014-12-01 03:01:02', NULL),
        ('hrjobcontract', 'work_weeks_per_year', 'i:50;', 1, NULL, 1, NULL, '2014-12-01 03:01:02', NULL)");
      return TRUE;
  }

  function decToFraction($fte) {
    $fteDecimalPart = explode('.', $fte);
    $array  = str_split($fteDecimalPart[1]);
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
        $result = $numerators[$i] / $denominators[$i];
        if ((string)$result == (string)$fte) {
          $num = $numerators[$i];
          $denom = $denominators[$i];
          $val = array($num, $denom);
          return $val;
        }
        $tempFte = 1/($tempFte-$floorFte);
      }
    }
  }

  function commonDivisor($a,$b) {
    return ($a % $b) ? CRM_Hrjobcontract_Upgrader::commonDivisor($b,$a % $b) : $b;
  }

}
