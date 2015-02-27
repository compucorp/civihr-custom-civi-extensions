<?php
/*
 +--------------------------------------------------------------------+
 | CiviHR version 1.4                                                 |
 +--------------------------------------------------------------------+
 | Copyright CiviCRM LLC (c) 2004-2014                                |
 +--------------------------------------------------------------------+
 | This file is a part of CiviCRM.                                    |
 |                                                                    |
 | CiviCRM is free software; you can copy, modify, and distribute it  |
 | under the terms of the GNU Affero General Public License           |
 | Version 3, 19 November 2007 and the CiviCRM Licensing Exception.   |
 |                                                                    |
 | CiviCRM is distributed in the hope that it will be useful, but     |
 | WITHOUT ANY WARRANTY; without even the implied warranty of         |
 | MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.               |
 | See the GNU Affero General Public License for more details.        |
 |                                                                    |
 | You should have received a copy of the GNU Affero General Public   |
 | License and the CiviCRM Licensing Exception along                  |
 | with this program; if not, contact CiviCRM LLC                     |
 | at info[AT]civicrm[DOT]org. If you have questions about the        |
 | GNU Affero General Public License or the licensing of CiviCRM,     |
 | see the CiviCRM license FAQ at http://civicrm.org/licensing        |
 +--------------------------------------------------------------------+
*/

/**
 *
 * @package CRM
 * @copyright CiviCRM LLC (c) 2004-2013
 * $Id$
 *
 */
class CRM_Hrjobcontract_BAO_Query extends CRM_Contact_BAO_Query_Interface {

  /**
   * static field for all the export/import hrjob fields
   *
   * @var array
   * @static
   */
  static $_hrjobFields = array();

  /**
   * Function get the import/export fields for hrjobcontract
   *
   * @return array self::$_hrjobFields  associative array of hrjobcontract fields
   * @static
   */
  function &getFields() {
    if (!self::$_hrjobFields) {
      self::$_hrjobFields = CRM_Hrjobcontract_BAO_HRJobDetails::export();
      self::$_hrjobFields['hrjob_role_manager_contact'] =
        array(
          'name'  => 'manager_contact',
          'title' => 'Job Manager',
          'type'  => CRM_Utils_Type::T_STRING,
          'where' => 'civicrm_hrjob_role_manager.display_name'
        );
      self::$_hrjobFields = array_merge(self::$_hrjobFields, CRM_Hrjobcontract_BAO_HRJobHour::export());

      // special case to check for existence of health record entry
      self::$_hrjobFields['hrjob_is_healthcare'] =
        array(
          'name'  => 'is_healthcare',
          'title' => 'Is health care',
          'type'  => CRM_Utils_Type::T_BOOLEAN,
          'where' => 'civicrm_hrjobcontract_health.id'
        );

      self::$_hrjobFields = array_merge(self::$_hrjobFields, CRM_Hrjobcontract_BAO_HRJobPension::export());
      self::$_hrjobFields = array_merge(self::$_hrjobFields, CRM_Hrjobcontract_BAO_HRJobPay::export());
      self::$_hrjobFields = array_merge(self::$_hrjobFields, CRM_Hrjobcontract_BAO_HRJobRole::export());
    }
    return self::$_hrjobFields;
  }

  function select(&$query) {
    if (CRM_Contact_BAO_Query::componentPresent($query->_returnProperties, 'hrjob_')) {
      $fields = $this->getFields();
      foreach ($fields as $fldName => $params) {
        if (!empty($query->_returnProperties[$fldName])) {
          $query->_select[$fldName]  = "{$params['where']} as $fldName";
          if ($fldName == 'hrjob_role_manager_contact') {
            $query->_select[$fldName]  = "GROUP_CONCAT(DISTINCT(civicrm_hrjob_role_manager.sort_name) SEPARATOR ' | ') as $fldName";
          }
          if ($fldName == 'hrjob_role_department') {
            $query->_select[$fldName]  = "GROUP_CONCAT(DISTINCT(civicrm_hrjobcontract_role.department) SEPARATOR ' | ') as $fldName";
          }
          $query->_element[$fldName] = 1;
          list($tableName, $dnc) = explode('.', $params['where'], 2);
          $query->_tables[$tableName]  = $query->_whereTables[$tableName] = 1;
        }
      }
    }
  }

  function where(&$query) {
    $grouping = NULL;
    foreach (array_keys($query->_params) as $id) {
      if (empty($query->_params[$id][0])) {
        continue;
      }
      if (substr($query->_params[$id][0], 0, 6) == 'hrjob_') {
        if ($query->_mode == CRM_Contact_BAO_QUERY::MODE_CONTACTS) {
          $query->_useDistinct = TRUE;
        }
        $this->whereClauseSingle($query->_params[$id], $query);
      }
    }
  }

  function whereClauseSingle(&$values, &$query) {
    list($name, $op, $value, $grouping, $wildcard) = $values;

    $fields = $this->getFields();
    if (!empty($value) && !is_array($value)) {
      $quoteValue = "\"$value\"";
    }

    $strtolower = function_exists('mb_strtolower') ? 'mb_strtolower' : 'strtolower';
    switch ($name) {
      case 'hrjob_role_level_type':
      case 'hrjob_contract_type':
      case 'hrjob_is_paid':
      case 'hrjob_hours_type':
      case 'hrjob_hours_unit':
        $display = $options = $value;
        if (is_array($value) && count($value) >= 1) {
          $op      = 'IN';
          $options = "('" . implode("','", $value) . "')";
          $display = implode(' ' . ts('or') . ' ', $value);
        }
        $query->_qill[$grouping][]  = ts('%1 %2', array(1 => $fields[$name]['title'], 2 => $op)) . ' ' . $display;
        $query->_where[$grouping][] = CRM_Contact_BAO_Query::buildClause($fields[$name]['where'], $op, $options);
        list($tableName, $fieldName) = explode('.', $fields[$name]['where'], 2);
        $query->_tables[$tableName]  = $query->_whereTables[$tableName] = 1;
        return;

      case 'hrjob_is_healthcare':
        $op = "IS NOT NULL";
        $query->_qill[$grouping][]  = ts('Healthcare is provided');
        $query->_where[$grouping][] = CRM_Contact_BAO_Query::buildClause("civicrm_hrjobcontract_health.id", $op);
        $query->_tables['civicrm_hrjobcontract_health'] = $query->_whereTables['civicrm_hrjobcontract_health'] = 1;
        return;

      case 'hrjob_is_enrolled':
        $query->_qill[$grouping][]  = $value ? ts('Is enrolled') : ts('Is not enrolled');
        $query->_where[$grouping][] = CRM_Contact_BAO_Query::buildClause("civicrm_hrjobcontract_pension.is_enrolled", $op, $value, "Boolean");
        $query->_tables['civicrm_hrjobcontract_pension'] = $query->_whereTables['civicrm_hrjobcontract_pension'] = 1;
        return;

      case 'hrjob_period_start_date_low':
      case 'hrjob_period_start_date_high':
        $query->dateQueryBuilder($values,
          'civicrm_hrjobcontract_details', 'hrjob_period_start_date', 'period_start_date', 'Period Start Date'
        );
        return;

      case 'hrjob_period_end_date_low':
      case 'hrjob_period_end_date_high':
        $query->dateQueryBuilder($values,
          'civicrm_hrjobcontract_details', 'hrjob_period_end_date', 'period_end_date', 'Period End Date'
        );
        return;

      case 'hrjob_hours_amount':
      case 'hrjob_hours_amount_low':
      case 'hrjob_hours_amount_high':
        // process min/max amount
        $query->numberRangeBuilder($values,
          'civicrm_hrjobcontract_hour', 'hrjob_hours_amount',
          'hours_amount', 'Hours Amount',
          NULL
        );
        return;

      case 'hrjob_hours_fte':
      case 'hrjob_hours_fte_low':
      case 'hrjob_hours_fte_high':
        // process min/max fte
        $query->numberRangeBuilder($values,
          'civicrm_hrjobcontract_hour', 'hrjob_hours_fte',
          'hours_fte', 'Hours FTE',
          NULL
        );
        return;

      default:
        if (!isset($fields[$name])) {
          CRM_Core_Session::setStatus(ts(
              'We did not recognize the search field: %1.',
              array(1 => $name)
            )
          );
          return;
        }
        $whereTable = $fields[$name];
        $value      = trim($value);
        $dataType   = "String";

        if (in_array($name, array('hrjob_position', 'hrjob_title')) &&
          strpos($value, '%') === FALSE) {
          $op = 'LIKE';
          $value = "%" . trim($value, '%') . "%";
          $quoteValue = "\"$value\"";
        }
        $wc = ($op != 'LIKE') ? "LOWER($whereTable[where])" : "$whereTable[where]";
        $query->_where[$grouping][] = CRM_Contact_BAO_Query::buildClause($wc, $op, $value, $dataType);
        $query->_qill [$grouping][] = "{$whereTable['title']} {$op} {$quoteValue}";
        list($tableName, $fieldName) = explode('.', $whereTable['where'], 2);
        $query->_tables[$tableName] = $query->_whereTables[$tableName] = 1;
    }
  }

  function from($name, $mode, $side) {
    $from = '';
    
/*    $from .= "
            $side JOIN civicrm_hrjobcontract hrjobcontract ON hrjobcontract.contact_id = contact_a.id
            $side JOIN civicrm_hrjobcontract_revision rev ON rev.jobcontract_id = hrjobcontract.id AND rev.status = 1
            ";*/
    
    switch ($name) {
      case 'civicrm_contact':
        $from .= "
            $side JOIN civicrm_hrjobcontract hrjobcontract ON hrjobcontract.contact_id = contact_a.id
            $side JOIN civicrm_hrjobcontract_revision rev ON rev.jobcontract_id = hrjobcontract.id AND rev.status = 1
            ";
      break;
      case 'civicrm_hrjobcontract':
        $from .= " /*civicrm_hrjobcontract*/
        ";
        break;
      case 'civicrm_hrjob_role_manager':
         /*$side JOIN civicrm_hrjobcontract hrjobcontract ON hrjobcontract.contact_id = contact_a.id
         $side JOIN civicrm_hrjobcontract_revision rev ON rev.jobcontract_id = hrjobcontract.id AND rev.status = 1*/
        $from .= "
         $side JOIN civicrm_hrjobcontract_role civicrm_hrjob_role_manager_contact ON civicrm_hrjob_role_manager_contact.jobcontract_revision_id = rev.role_revision_id
         $side JOIN civicrm_contact civicrm_hrjob_role_manager ON civicrm_hrjob_role_manager_contact.manager_contact_id = civicrm_hrjob_role_manager.id
        ";
        break;
      case 'civicrm_hrjobcontract_details':
        $from .= " $side JOIN civicrm_hrjobcontract_details ON rev.details_revision_id = civicrm_hrjobcontract_details.jobcontract_revision_id ";
        break;
      case 'civicrm_hrjobcontract_hour':
        $from .= " $side JOIN civicrm_hrjobcontract_hour ON rev.hour_revision_id = civicrm_hrjobcontract_hour.jobcontract_revision_id ";
        break;
      case 'civicrm_hrjobcontract_health':
        $from .= " $side JOIN civicrm_hrjobcontract_health ON rev.health_revision_id = civicrm_hrjobcontract_health.jobcontract_revision_id ";
        break;
      case 'civicrm_hrjobcontract_pension':
        $from .= " $side JOIN civicrm_hrjobcontract_pension ON rev.pension_revision_id = civicrm_hrjobcontract_pension.jobcontract_revision_id ";
        break;
      case 'civicrm_hrjobcontract_pay':
        $from .= " $side JOIN civicrm_hrjobcontract_pay ON rev.pay_revision_id = civicrm_hrjobcontract_pay.jobcontract_revision_id ";
        break;
      case 'civicrm_hrjob_role':
        $from .= " $side JOIN civicrm_hrjob_role ON civicrm_hrjob.id = civicrm_hrjob_role.job_id ";
        break;
      case 'civicrm_hrjobcontract_role':
        $from .= " $side JOIN civicrm_hrjobcontract_role ON rev.role_revision_id = civicrm_hrjobcontract_role.jobcontract_revision_id ";
        break;
    }
    
    return $from;
  }

  function setTableDependency(&$tables) {
    if (!empty($tables['civicrm_hrjobcontract_hour']) || !empty($tables['civicrm_hrjobcontract_health']) || !empty($tables['civicrm_hrjobcontract_pension'])|| !empty($tables['civicrm_hrjobcontract_pay'])) {
      $tables = array_merge(array('civicrm_hrjobcontract' => 1), $tables);
    }
  }

  public function registerAdvancedSearchPane(&$panes) {
    //if (!CRM_Core_Permission::check('access HRJobs')) { echo 'not accessible'; return; }
    $panes['Job Contract'] = 'hrjobcontract';
    $panes['Job Contract: Hour']  = 'hrjobcontract_hour';
    $panes['Job Contract: Health']  = 'hrjobcontract_health';
    $panes['Job Contract: Pension'] = 'hrjobcontract_pension';
    $panes['Job Contract: Pay']  = 'hrjobcontract_pay';
  }

  public function getPanesMapper(&$panes) {
    //if (!CRM_Core_Permission::check('access HRJobs')) { echo 'not accessible'; return; }
    $panes['Job Contract']          = 'civicrm_hrjobcontract';
    $panes['Job Contract: Hour']    = 'civicrm_hrjobcontract_hour';
    $panes['Job Contract: Health']  = 'civicrm_hrjobcontract_health';
    $panes['Job Contract: Pension'] = 'civicrm_hrjobcontract_pension';
    $panes['Job Contract: Pay']     = 'civicrm_hrjobcontract_pay';
  }

  public function buildAdvancedSearchPaneForm(&$form, $type) {
    //if (!CRM_Core_Permission::check('access HRJobs')) { echo 'not accessible'; return; }
    if ($type  == 'hrjobcontract') {
      $form->add('hidden', 'hidden_hrjobcontract', 1);
      $form->addElement('text', 'hrjob_position', ts('Position'), CRM_Core_DAO::getAttribute('CRM_Hrjobcontract_DAO_HRJobContract', 'position'));
      $form->addElement('text', 'hrjob_title', ts('Title'), CRM_Core_DAO::getAttribute('CRM_Hrjobcontract_DAO_HRJobContract', 'title'));
      $form->add('select', 'hrjob_role_level_type', ts('Level'),
        CRM_Core_PseudoConstant::get('CRM_Hrjobcontract_DAO_HRJobRole', 'hrjob_role_level_type'), FALSE,
        array('id' => 'hrjob_role_level_type', 'multiple' => 'multiple', 'title' => ts('- select -'))
      );
      $form->add('select', 'hrjob_contract_type', ts('Contract Type'),
        CRM_Core_PseudoConstant::get('CRM_Hrjobcontract_DAO_HRJobDetails', 'hrjob_contract_type'), FALSE,
        array('id' => 'hrjob_contract_type', 'multiple' => 'multiple', 'title' => ts('- select -'))
      );
      CRM_Core_Form_Date::buildDateRange($form, 'hrjob_period_start_date', 1, '_low', '_high', ts('From:'), FALSE, FALSE);
      CRM_Core_Form_Date::buildDateRange($form, 'hrjob_period_end_date', 1, '_low', '_high', ts('From:'), FALSE, FALSE);
    }
    if ($type  == 'hrjobcontract_health') {
      $form->add('hidden', 'hidden_hrjobcontract_health', 1);
      $form->add('checkbox', 'hrjob_is_healthcare', ts('Is healthcare provided?'));
    }
    if ($type  == 'hrjobcontract_hour') {
      $form->add('hidden', 'hidden_hrjobcontract_hour', 1);
      $hoursType = CRM_Core_PseudoConstant::get('CRM_Hrjobcontract_DAO_HRJobHour', 'hrjob_hours_type');
      $form->add('select', 'hrjob_hours_type', ts('Hours Types'), $hoursType, FALSE,
        array('id' => 'hrjob_hours_type', 'multiple' => 'multiple', 'title' => ts('- select -'))
      );

      $form->add('select', 'hrjob_hours_unit', ts('Hours Unit'),
        array('Day' => ts('Day'), 'Week' => ts('Week'), 'Month' => ts('Month'), 'Year' => ts('Year')), FALSE,
        array('id' => 'hrjob_hours_unit', 'multiple' => 'multiple', 'title' => ts('- select -'))
      );

      $form->add('text', 'hrjob_hours_amount_low', ts('From'), array('size' => 8, 'maxlength' => 8));
      $form->addRule('hrjob_hours_amount_low', ts('Please enter a valid money value (e.g. %1).', array(1 => CRM_Utils_Money::format('9.99', ' '))), 'money');
      $form->add('text', 'hrjob_hours_amount_high', ts('To'), array('size' => 8, 'maxlength' => 8));
      $form->addRule('hrjob_hours_amount_high', ts('Please enter a valid money value (e.g. %1).', array(1 => CRM_Utils_Money::format('99.99', ' '))), 'money');

      $form->add('text', 'hrjob_hours_fte_low', ts('From'), array('size' => 8, 'maxlength' => 8));
      $form->addRule('hrjob_hours_fte_low', ts('Please enter a valid decimal value (e.g. %1).', array(1 => CRM_Utils_Money::format('9.99', ' '))), 'money');
      $form->add('text', 'hrjob_hours_fte_high', ts('To'), array('size' => 8, 'maxlength' => 8));
      $form->addRule('hrjob_hours_fte_high', ts('Please enter a valid decimal value (e.g. %1).', array(1 => CRM_Utils_Money::format('99.99', ' '))), 'money');
    }
    if ($type  == 'hrjobcontract_pension') {
      $form->add('hidden', 'hidden_hrjobcontract_pension', 1);
      $form->addYesNo( 'hrjob_is_enrolled', ts('Is enrolled?'));
    }
    if ($type  == 'hrjobcontract_pay') {
      $form->add('hidden', 'hidden_hrjobcontract_pay', 1);
      $form->add('select', 'hrjob_is_paid', ts('Paid / Unpaid'),
        CRM_Core_PseudoConstant::get('CRM_Hrjobcontract_DAO_HRJobPay', 'is_paid'), FALSE,
        array('id' => 'hrjob_is_paid', 'multiple' => 'multiple', 'title' => ts('- select -'))
      );
    }
  }

  public function setAdvancedSearchPaneTemplatePath(&$paneTemplatePathArray, $type) {
    //if (!CRM_Core_Permission::check('access HRJobs')) { echo 'not accessible'; return; }
    if ($type  == 'hrjobcontract') {
      $paneTemplatePathArray['hrjobcontract'] = 'CRM/Hrjobcontract/Form/Search/Criteria/JobContract.tpl';
    }
    if ($type  == 'hrjobcontract_hour') {
      $paneTemplatePathArray['hrjobcontract_hour'] = 'CRM/Hrjobcontract/Form/Search/Criteria/Hour.tpl';
    }
    if ($type  == 'hrjobcontract_health') {
      $paneTemplatePathArray['hrjobcontract_health'] = 'CRM/Hrjobcontract/Form/Search/Criteria/Health.tpl';
    }
    if ($type  == 'hrjobcontract_pension') {
      $paneTemplatePathArray['hrjobcontract_pension'] = 'CRM/Hrjobcontract/Form/Search/Criteria/Pension.tpl';
    }
    if ($type  == 'hrjobcontract_pay') {
      $paneTemplatePathArray['hrjobcontract_pay'] = 'CRM/Hrjobcontract/Form/Search/Criteria/Pay.tpl';
    }
  }

  /**
   * Describe options for available for use in the search-builder.
   *
   * The search builder determines its options by examining the API metadata corresponding to each
   * search field. This approach assumes that each field has a unique-name (ie that the field's
   * unique-name in the API matches the unique-name in the search-builder).
   *
   * @param array $apiEntities list of entities whose options should be automatically scanned using API metadata
   * @param array $fieldOptions keys are field unique-names; values describe how to lookup the options
   *   For boolean options, use value "yesno". For pseudoconstants/FKs, use the name of an API entity
   *   from which the metadata of the field may be queried. (Yes - that is a mouthful.)
   * @void
   */
  public function alterSearchBuilderOptions(&$apiEntities, &$fieldOptions) {
    //if (!CRM_Core_Permission::check('access HRJobs')) { echo 'not accessible'; return; }
    $apiEntities = array_merge($apiEntities, array(
      //'HRJob',
      'HRJobContract',
      'HRJobDetails',
      'HRJobHealth',
      'HRJobHour',
      'HRJobPay',
      'HRJobPension',
    ));
  }
}
