<?php

require_once 'hrjobcontract.civix.php';

/**
 * Implementation of hook_civicrm_config
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_config
 */
function hrjobcontract_civicrm_config(&$config) {
  _hrjobcontract_civix_civicrm_config($config);
}

/**
 * Implementation of hook_civicrm_xmlMenu
 *
 * @param $files array(string)
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_xmlMenu
 */
function hrjobcontract_civicrm_xmlMenu(&$files) {
  _hrjobcontract_civix_civicrm_xmlMenu($files);
}

/**
 * Implementation of hook_civicrm_install
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_install
 */
function hrjobcontract_civicrm_install() {
  $cType = CRM_Contact_BAO_ContactType::basicTypePairs(false,'id');
  $org_id = array_search('Organization',$cType);
  $sub_type_name = array('Health Insurance Provider','Life Insurance Provider');
  $orgSubType = CRM_Contact_BAO_ContactType::subTypes('Organization', true);
  $orgSubType = CRM_Contact_BAO_ContactType::subTypeInfo('Organization');
  $params['parent_id'] = $org_id;
  $params['is_active'] = 1;

  if ($org_id) {
    foreach($sub_type_name as $sub_type_name) {
      $subTypeName = ucfirst(CRM_Utils_String::munge($sub_type_name));
      $subID = array_key_exists( $subTypeName, $orgSubType );
      if (!$subID) {
        $params['name'] = $subTypeName;
        $params['label'] = $sub_type_name;
        CRM_Contact_BAO_ContactType::add($params);
      }
      elseif ($subID && $orgSubType[$subTypeName]['is_active']==0) {
        CRM_Contact_BAO_ContactType::setIsActive($orgSubType[$subTypeName]['id'], 1);
      }
    }
  }

  //Add job import navigation menu
  $weight = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_Navigation', 'Import Contacts', 'weight', 'name');
  $contactNavId = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_Navigation', 'Contacts', 'id', 'name');
  $administerNavId = CRM_Core_DAO::getFieldValue('CRM_Core_DAO_Navigation', 'Dropdown Options', 'id', 'name');

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
  $importJobMenuTree = array(
    array(
      'label'      => ts('Hours Types'),
      'name'       => 'hoursType',
      'url'        => 'civicrm/hour/editoption',
      'permission' => 'administer CiviCRM',
      'parent_id'  => $administerNavId,
    ),
  );
  foreach ($importJobMenuTree as $key => $menuItems) {
    $menuItems['is_active'] = 1;
    CRM_Core_BAO_Navigation::add($menuItems);
  }
  CRM_Core_BAO_Navigation::resetNavigation();
    
  return _hrjobcontract_civix_civicrm_install();
}

/**
 * Implementation of hook_civicrm_uninstall
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_uninstall
 */
function hrjobcontract_civicrm_uninstall() {
  $subTypeInfo = CRM_Contact_BAO_ContactType::subTypeInfo('Organization');
  $sub_type_name = array('Health Insurance Provider','Life Insurance Provider');
  foreach($sub_type_name as $sub_type_name) {
    $subTypeName = ucfirst(CRM_Utils_String::munge($sub_type_name));
    $orid = array_key_exists($subTypeName, $subTypeInfo);
    if($orid) {
      $id = $subTypeInfo[$subTypeName]['id'];
      CRM_Contact_BAO_ContactType::del($id);
    }
  }
  //delete job import navigation menu
  CRM_Core_DAO::executeQuery("DELETE FROM civicrm_navigation WHERE name IN ('jobImport','hoursType')");
  CRM_Core_BAO_Navigation::resetNavigation();

  //delete custom groups and field
  $customGroup = civicrm_api3('CustomGroup', 'getsingle', array('return' => "id",'name' => "HRJob_Summary",));
  civicrm_api3('CustomGroup', 'delete', array('id' => $customGroup['id']));

  //delete all option group and values
  CRM_Core_DAO::executeQuery("DELETE FROM civicrm_option_group WHERE name IN ('hrjc_contract_type', 'hrjc_level_type', 'hrjc_department', 'hrjc_hours_type', 'hrjc_pay_grade', 'hrjc_health_provider', 'hrjc_life_provider', 'hrjc_location', 'hrjc_pension_type', 'hrjc_region', 'hrjc_pay_scale')");

  return _hrjobcontract_civix_civicrm_uninstall();
}

/**
 * Implementation of hook_civicrm_enable
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_enable
 */
function hrjobcontract_civicrm_enable() {
  _hrjobcontract_setActiveFields(1);
  return _hrjobcontract_civix_civicrm_enable();
}

/**
 * Implementation of hook_civicrm_disable
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_disable
 */
function hrjobcontract_civicrm_disable() {
  _hrjobcontract_setActiveFields(0);
  return _hrjobcontract_civix_civicrm_disable();
}

function _hrjobcontract_setActiveFields($setActive) {
  $sql = "UPDATE civicrm_navigation SET is_active= {$setActive} WHERE name IN ('jobs','jobImport','hoursType')";
  CRM_Core_DAO::executeQuery($sql);
  CRM_Core_BAO_Navigation::resetNavigation();

  //disable/enable customgroup and customvalue
  $sql = "UPDATE civicrm_custom_field JOIN civicrm_custom_group ON civicrm_custom_group.id = civicrm_custom_field.custom_group_id SET civicrm_custom_field.is_active = {$setActive} WHERE civicrm_custom_group.name = 'HRJob_Summary'";
  CRM_Core_DAO::executeQuery($sql);
  CRM_Core_DAO::executeQuery("UPDATE civicrm_custom_group SET is_active = {$setActive} WHERE name = 'HRJob_Summary'");

  //disable/enable optionGroup and optionValue
  $query = "UPDATE civicrm_option_value JOIN civicrm_option_group ON civicrm_option_group.id = civicrm_option_value.option_group_id SET civicrm_option_value.is_active = {$setActive} WHERE civicrm_option_group.name IN ('hrjc_contract_type', 'hrjc_level_type', 'hrjc_department', 'hrjc_hours_type', 'hrjc_pay_grade', 'hrjc_health_provider', 'hrjc_life_provider', 'hrjc_location', 'hrjc_pension_type', 'hrjc_region', 'hrjc_pay_scale')";
  CRM_Core_DAO::executeQuery($query);
  CRM_Core_DAO::executeQuery("UPDATE civicrm_option_group SET is_active = {$setActive} WHERE name IN ('hrjc_contract_type', 'hrjc_level_type', 'hrjc_department', 'hrjc_hours_type', 'hrjc_pay_grade', 'hrjc_health_provider', 'hrjc_life_provider', 'hrjc_location', 'hrjc_pension_type',  'hrjc_region', 'hrjc_pay_scale')");
}

/**
 * Implementation of hook_civicrm_upgrade
 *
 * @param $op string, the type of operation being performed; 'check' or 'enqueue'
 * @param $queue CRM_Queue_Queue, (for 'enqueue') the modifiable list of pending up upgrade tasks
 *
 * @return mixed  based on op. for 'check', returns array(boolean) (TRUE if upgrades are pending)
 *                for 'enqueue', returns void
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_upgrade
 */
function hrjobcontract_civicrm_upgrade($op, CRM_Queue_Queue $queue = NULL) {
  return _hrjobcontract_civix_civicrm_upgrade($op, $queue);
}

/**
 * Implementation of hook_civicrm_managed
 *
 * Generate a list of entities to create/deactivate/delete when this module
 * is installed, disabled, uninstalled.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_managed
 */
function hrjobcontract_civicrm_managed(&$entities) {
  _hrjobcontract_civix_civicrm_managed($entities);
}

/**
 * Implementation of hook_civicrm_caseTypes
 *
 * Generate a list of case-types
 *
 * Note: This hook only runs in CiviCRM 4.4+.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_caseTypes
 */
function hrjobcontract_civicrm_caseTypes(&$caseTypes) {
  _hrjobcontract_civix_civicrm_caseTypes($caseTypes);
}

/**
 * Implementation of hook_civicrm_alterSettingsFolders
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_alterSettingsFolders
 */
function hrjobcontract_civicrm_alterSettingsFolders(&$metaDataFolders = NULL) {
  _hrjobcontract_civix_civicrm_alterSettingsFolders($metaDataFolders);
}

/**
 * Implementation of hook_civicrm_pageRun
 */
function hrjobcontract_civicrm_pageRun($page) {
    if ($page instanceof CRM_Contact_Page_View_Summary) {

        CRM_Core_Region::instance('page-footer')->add(array(
            'type' => 'markup',
            'markup' => '<script data-main="'
                .CRM_Core_Resources::singleton()->getUrl('org.civicrm.hrjobcontract', 'js/hrjc-main', FALSE).
                '" src="'
                .CRM_Core_Resources::singleton()->getUrl('org.civicrm.hrjobcontract', 'js/vendor/require.js', TRUE).
                '"></script>',
            'weight' => 1003
        ));

        CRM_Core_Resources::singleton()
            ->addStyleFile('org.civicrm.hrjobcontract', 'css/hrjobcontract.css');
    }
}

/**
 * Implementation of hook_civicrm_buildForm
 *
 * @params string $formName - the name of the form
 *         object $form - reference to the form object
 * @return void
 */
function hrjobcontract_civicrm_buildForm($formName, &$form) {
  if ($formName == 'CRM_Export_Form_Select') {
    $_POST['unchange_export_selected_column'] = TRUE;
    if (!empty($form->_submitValues) && $form->_submitValues['exportOption'] == CRM_Export_Form_Select::EXPORT_SELECTED) {
      $_POST['unchange_export_selected_column'] = FALSE;
    }
  }
}


/**
 * Implementation of hook_civicrm_tabs
 */
function hrjobcontract_civicrm_tabs(&$tabs) {
    CRM_Hrjobcontract_Page_JobContractTab::registerScripts();
    $tabs[] = Array(
        'id'        => 'hrjobcontract',
        'url'       => CRM_Utils_System::url('civicrm/contact/view/hrjobcontract'),
        'title'     => ts('Job Contract'),
        'weight'    => 1
    );

}

/**
 * Implementation of hook_civicrm_entityTypes
 */
function hrjobcontract_civicrm_entityTypes(&$entityTypes) {
  $entityTypes[] = array(
    'name' => 'HRJobContract',
    'class' => 'CRM_Hrjobcontract_DAO_HRJobContract',
    'table' => 'civicrm_hrjobcontract',
  );
  $entityTypes[] = array(
    'name' => 'HRJobContractRevision',
    'class' => 'CRM_Hrjobcontract_DAO_HRJobContractRevision',
    'table' => 'civicrm_hrjobcontract_revision',
  );
  $entityTypes[] = array(
    'name' => 'HRJobDetails',
    'class' => 'CRM_Hrjobcontract_DAO_HRJobDetails',
    'table' => 'civicrm_hrjobcontract_details',
  );
  $entityTypes[] = array(
    'name' => 'HRJobPay',
    'class' => 'CRM_Hrjobcontract_DAO_HRJobPay',
    'table' => 'civicrm_hrjobcontract_pay',
  );
  $entityTypes[] = array(
    'name' => 'HRJobHealth',
    'class' => 'CRM_Hrjobcontract_DAO_HRJobHealth',
    'table' => 'civicrm_hrjobcontract_health',
  );
  $entityTypes[] = array(
    'name' => 'HRJobHour',
    'class' => 'CRM_Hrjobcontract_DAO_HRJobHour',
    'table' => 'civicrm_hrjobcontract_hour',
  );
  $entityTypes[] = array(
    'name' => 'HRJobLeave',
    'class' => 'CRM_Hrjobcontract_DAO_HRJobLeave',
    'table' => 'civicrm_hrjobcontract_leave',
  );
  $entityTypes[] = array(
    'name' => 'HRJobPension',
    'class' => 'CRM_Hrjobcontract_DAO_HRJobPension',
    'table' => 'civicrm_hrjobcontract_pension',
  );
  $entityTypes[] = array(
    'name' => 'HRJobRole',
    'class' => 'CRM_Hrjobcontract_DAO_HRJobRole',
    'table' => 'civicrm_hrjobcontract_role',
  );
  $entityTypes[] = array(
    'name' => 'HRHoursLocation',
    'class' => 'CRM_Hrjobcontract_DAO_HoursLocation',
    'table' => 'civicrm_hrhours_location',
  );
  $entityTypes[] = array(
    'name' => 'HRPayScale',
    'class' => 'CRM_Hrjobcontract_DAO_PayScale',
    'table' => 'civicrm_hrpay_scale',
  );
}

/**
 * Implementaiton of hook_civicrm_alterAPIPermissions
 *
 * @param $entity
 * @param $action
 * @param $params
 * @param $permissions
 * @return void
 */
function hrjobcontract_civicrm_alterAPIPermissions_($entity, $action, &$params, &$permissions) {
  $session = CRM_Core_Session::singleton();
  $cid = $session->get('userID');

  if (substr($entity, 0, 7) == 'h_r_job' && $cid == $params['contact_id'] && $action == 'get') {
    $permissions[$entity]['get'] = array('access CiviCRM', array('access own HRJobs', 'access HRJobs'));
   } elseif (substr($entity, 0, 7) == 'h_r_job' && $action == 'get') {
    $permissions[$entity]['get'] = array('access CiviCRM', 'access HRJobs');
  }
  if (substr($entity, 0, 7) == 'h_r_job') {
    $permissions[$entity]['create'] = array('access CiviCRM', 'edit HRJobs');
    $permissions[$entity]['update'] = array('access CiviCRM', 'edit HRJobs');
    $permissions[$entity]['replace'] = array('access CiviCRM', 'edit HRJobs');
    $permissions[$entity]['duplicate'] = array('access CiviCRM', 'edit HRJobs');
    $permissions[$entity]['delete'] = array('access CiviCRM', 'delete HRJobs');
  }
  $permissions['CiviHRJobContract'] = $permissions['h_r_job'];
}

/**
 * @return array list fields keyed by stable name; each field has:
 *   - id: int
 *   - name: string
 *   - column_name: string
 *   - field: string, eg "custom_123"
 */
function hrjobcontract_getSummaryFields($fresh = FALSE) {
  static $cache = NULL;
  if ($cache === NULL || $fresh) {
    $sql =
      "SELECT ccf.id, ccf.name, ccf.column_name, concat('custom_', ccf.id) as field
      FROM civicrm_custom_group ccg
      INNER JOIN civicrm_custom_field ccf ON ccf.custom_group_id = ccg.id
      WHERE ccg.name = 'HRJob_Summary'
    ";
    $dao = CRM_Core_DAO::executeQuery($sql);
    $cache = array();
    while ($dao->fetch()) {
      $cache[$dao->name] = $dao->toArray();
    }
  }
  return $cache;
}

/**
 * Implementation of hook_civicrm_queryObjects
 */
function hrjobcontract_civicrm_queryObjects(&$queryObjects, $type) {
  if ($type == 'Contact') {
    $queryObjects[] = new CRM_Hrjobcontract_BAO_Query();
  }
  elseif ($type == 'Report') {
    $queryObjects[] = new CRM_Hrjobcontract_BAO_ReportHook();
  }
}

/**
 * Implementation of hook_civicrm_permission
 *
 * @param array $permissions
 * @return void
 */
function hrjobcontract_civicrm_permission(&$permissions) {
  $prefix = 'CiviHRJobContract' . ': ';
  $permissions += array(
    'access HRJobs' => $prefix . ts('access HRJobs'),
    'edit HRJobs' => $prefix . ts('edit HRJobs'),
    'delete HRJobs' => $prefix . ts('delete HRJobs'),
    'access own HRJobs' => $prefix . ts('access own HRJobs'),
  );
}

/**
 * Helper function to load data into DB between iterations of the unit-test
 */
function _hrjobcontract_phpunit_populateDB() {
  $import = new CRM_Utils_Migrate_Import();
  $import->run(
    CRM_Extension_System::singleton()->getMapper()->keyToBasePath('org.civicrm.hrjobcontract')
      . '/xml/option_group_install.xml'
  );
  $import->run(
    CRM_Extension_System::singleton()->getMapper()->keyToBasePath('org.civicrm.hrjobcontract')
      . '/xml/job_summary_install.xml'
  );

  //create option value for option group region
  $result = civicrm_api3('OptionGroup', 'get', array(
    'name' => "hrjc_region",
  ));
  $regionVal = array(
    'Asia' => ts('Asia'),
    'Europe' => ts('Europe'),
  );

  foreach ($regionVal as $name => $label) {
    $regionParam = array(
      'option_group_id' => $result['id'],
      'label' => $label,
      'name' => $name,
      'value' => $name,
      'is_active' => 1,
    );
    civicrm_api3('OptionValue', 'create', $regionParam);
  }
}

function hrjobcontract_civicrm_export( $exportTempTable, $headerRows, $sqlColumns, $exportMode ) {
  if ($exportMode == CRM_Export_Form_Select::EXPORT_ALL && !empty($_POST['unchange_export_selected_column'])) {
    //drop column from table -- HR-379
    $col = array('do_not_trade', 'do_not_email');
    if ($_POST['unchange_export_selected_column']) {
      $sql = "ALTER TABLE ".$exportTempTable." ";
      $sql .= "DROP COLUMN do_not_email ";
      $sql .= ",DROP COLUMN do_not_trade ";
      CRM_Core_DAO::singleValueQuery($sql);

      $i = 0;
      foreach($sqlColumns as $key => $val){
        if (in_array($key, $col)){
          //unset column from sqlColumn and headerRow
          unset($sqlColumns[$key]);
          unset($headerRows[$i]);
        }
        $i++;
      }
      CRM_Export_BAO_Export::writeCSVFromTable($exportTempTable, $headerRows, $sqlColumns, $exportMode);

      // delete the export temp table
      $sql = "DROP TABLE IF EXISTS {$exportTempTable}";
      CRM_Core_DAO::executeQuery($sql);
      CRM_Utils_System::civiExit();
    }
  }
}
