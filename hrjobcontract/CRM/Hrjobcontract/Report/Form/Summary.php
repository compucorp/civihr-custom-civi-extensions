<?php

/*
 +--------------------------------------------------------------------+
 | CiviCRM version 4.5                                                |
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
 * @copyright CiviCRM LLC (c) 2004-2014
 * $Id$
 *
 */
class CRM_Hrjobcontract_Report_Form_Summary extends CRM_Report_Form {

  protected $_summary = NULL;

  public $_drilldownReport = array('contact/detail' => 'Link to Detail Report');

  /**
   *
   */
    function __construct()
    {
        $this->_autoIncludeIndexedFieldsAsOrderBys = 1;
        $this->_groupFilter = TRUE;
        $this->_tagFilter = TRUE;
        
        if (empty($_POST))
        {
            $_POST = $_GET;
        }
        
        parent::__construct();
        
        $this->_columns = array(
            'civicrm_contact' => array(
                'dao' => 'CRM_Contact_DAO_Contact',
                'fields' => array(
                    'sort_name' => array(
                        'title' => ts('Contact Name'),
                        //'required' => TRUE,
                        'no_repeat' => TRUE,
                    ),
                    'first_name' => array(
                        'title' => ts('First Name'),
                    ),
                    'middle_name' => array(
                        'title' => ts('Middle Name'),
                    ),
                    'last_name' => array(
                        'title' => ts('Last Name'),
                    ),
                ),
                'filters' => array(
                    'id' => array(
                        'title' => ts('Contact Id')),
                    'sort_name' => array(
                        'title' => ts('Contact Name')),
                ),
                'grouping' => 'contact-fields',
                'order_bys' => array(
                    'sort_name' => array(
                        'title' => ts('Last Name, First Name'), 'default' => '1', 'default_weight' => '0', 'default_order' => 'ASC',
                    ),
                ),
            ),


            'civicrm_hrjobcontract' => array(
                'dao' => 'CRM_Hrjobcontract_DAO_HRJobContract',
                'fields' => array(
                    'contact_id' => array(
                        'title' => ts('Contact Id'),
                        'no_repeat' => TRUE,
                    ),
                    'contract_id' => array('title' => ts('Contract Id'),
                        'no_repeat' => TRUE,
                        //'required' => TRUE,
                        'name' => 'id',
                    ),
                ),
                'filters' => array( 'contract_id'   =>
                    array('name'       => 'id' ,
                    //'alias'      => 'contract_id',
                    'title'      => ts( 'Contract Id' ),
                    'operator'   => '=',
                    'type'       => CRM_Report_Form::OP_INT )
                ),
                'grouping' => 'contract-fields',
                'order_bys' => array(
                    'contact_id' => array(
                        'title' => ts('Contact Id'),
                    ),
                    'id' => array(
                        'title' => ts('Contract Id'),
                    ),
                ),
            ),
            
            'civicrm_hrjobcontract_revision' => array(
              'dao' => 'CRM_Hrjobcontract_DAO_HRJobContractRevision',
              'fields' => array(
                'revision_id' => array(
                    'title' => ts('Revision ID'),
                    'no_repeat' => TRUE,
                    'name' => 'id',
                ),
              ),
              'grouping' => 'revision-fields',
              'order_bys' => array(
                    'civicrm_hrjobcontract_revision_revision_id' => array(
                        'title' => ts('Revision Id'),
                        'dbAlias' => 'hrjobcontract_revision_civireport.id',
                    ),
              ),
              'group_bys' => array(
                    'civicrm_hrjobcontract_revision_revision_id' => array(
                        'title' => ts('Revision Id'),
                        'dbAlias' => 'hrjobcontract_revision_civireport.id',
                    ),
              ),
            ),

            'civicrm_hrjobcontract_details' => array(
              'dao' => 'CRM_Hrjobcontract_DAO_HRJobDetails',
              'fields' => array(
                'details_id' => array(
                    'title' => ts('Details ID'),
                    'no_repeat' => TRUE,
                    'name' => 'id',
                ),
                'position' => array(
                    'title' => ts('Position'),
                    'no_repeat' => TRUE,
                ),
                'details_title' => array(
                    'title' => ts('Title'),
                    'no_repeat' => TRUE,
                    'name' => 'title',
                ),
                'funding_notes' => array(
                    'title' => ts('Funding notes'),
                    'no_repeat' => TRUE,
                ),
                'contract_type' => array(
                    'title' => ts('Contract type'),
                    'no_repeat' => TRUE,
                ),
                'period_type' => array(
                    'title' => ts('Period type'),
                    'no_repeat' => TRUE,
                ),
                'period_start_date' => array(
                    'title' => ts('Period start date'),
                    'no_repeat' => TRUE,
                ),
                'period_end_date' => array(
                    'title' => ts('Period end date'),
                    'no_repeat' => TRUE,
                ),
                'notice_amount' => array(
                    'title' => ts('Notice amount'),
                    'no_repeat' => TRUE,
                ),
                'notice_unit' => array(
                    'title' => ts('Notice unit'),
                    'no_repeat' => TRUE,
                ),
                'notice_amount_employee' => array(
                    'title' => ts('Notice amount employee'),
                    'no_repeat' => TRUE,
                ),
                'notice_unit_employee' => array(
                    'title' => ts('Notice unit employee'),
                    'no_repeat' => TRUE,
                ),
                'location' => array(
                    'title' => ts('Location'),
                    'no_repeat' => TRUE,
                ),
                'is_primary' => array(
                    'title' => ts('Is primary'),
                    'no_repeat' => TRUE,
                ),
              ),
              'grouping' => 'details-fields',
              'group_bys' => array(
                    'civicrm_hrjobcontract_details_jobcontract_revision_id' => array(
                        'title' => ts('Details Revision Id'),
                        'dbAlias' => 'hrjobcontract_details_civireport.jobcontract_revision_id',
                    ),
              ),
            ),
            
            'civicrm_hrjobcontract_health' => array(
              'dao' => 'CRM_Hrjobcontract_DAO_HRJobHealth',
              'fields' => array(
                'health_id' => array(
                    'title' => ts('Health ID'),
                    'no_repeat' => TRUE,
                    'name' => 'id',
                ),
                'provider' => array(
                    'title' => ts('Provider'),
                    'no_repeat' => TRUE,
                ),
                'plan_type' => array(
                    'title' => ts('Plan type'),
                    'no_repeat' => TRUE,
                ),
                'description' => array(
                    'title' => ts('Description'),
                    'no_repeat' => TRUE,
                ),
                'dependents' => array(
                    'title' => ts('Dependents'),
                    'no_repeat' => TRUE,
                ),
                'provider_life_insurance' => array(
                    'title' => ts('Provider life insurance'),
                    'no_repeat' => TRUE,
                ),
                'plan_type_life_insurance' => array(
                    'title' => ts('Plan type life insurance'),
                    'no_repeat' => TRUE,
                ),
                'description_life_insurance' => array(
                    'title' => ts('Description life insurance'),
                    'no_repeat' => TRUE,
                ),
                'dependents_life_insurance' => array(
                    'title' => ts('Dependents life insurance'),
                    'no_repeat' => TRUE,
                ),
              ),
              'grouping' => 'health-fields',
              'group_bys' => array(
                    'civicrm_hrjobcontract_health_jobcontract_revision_id' => array(
                        'title' => ts('Health Revision Id'),
                        'dbAlias' => 'hrjobcontract_health_civireport.jobcontract_revision_id',
                    ),
              ),
            ),
            
            'civicrm_hrjobcontract_hour' => array(
              'dao' => 'CRM_Hrjobcontract_DAO_HRJobHour',
              'fields' => array(
                'hour_id' => array(
                    'title' => ts('Hour ID'),
                    'no_repeat' => TRUE,
                    'name' => 'id',
                ),
                'hours_type' => array(
                    'title' => ts('Hours type'),
                    'no_repeat' => TRUE,
                ),
                'hours_amount' => array(
                    'title' => ts('Hours amount'),
                    'no_repeat' => TRUE,
                ),
                'hours_unit' => array(
                    'title' => ts('Hours unit'),
                    'no_repeat' => TRUE,
                ),
                'hours_fte' => array(
                    'title' => ts('Hours FTE'),
                    'no_repeat' => TRUE,
                ),
                'fte_num' => array(
                    'title' => ts('FTE num'),
                    'no_repeat' => TRUE,
                ),
                'fte_denom' => array(
                    'title' => ts('FTE denom'),
                    'no_repeat' => TRUE,
                ),
              ),
              'grouping' => 'hour-fields',
              'group_bys' => array(
                    'civicrm_hrjobcontract_hour_jobcontract_revision_id' => array(
                        'title' => ts('Hour Revision Id'),
                        'dbAlias' => 'hrjobcontract_hour_civireport.jobcontract_revision_id',
                    ),
              ),
            ),
            
            'civicrm_hrjobcontract_leave' => array(
              'dao' => 'CRM_Hrjobcontract_DAO_HRJobLeave',
              'fields' => array(
                'leave_id' => array(
                    'title' => ts('Leave ID'),
                    'no_repeat' => TRUE,
                    'name' => 'id',
                ),
                'leave_type' => array(
                    'title' => ts('Leave type'),
                    'no_repeat' => TRUE,
                ),
                'leave_amount' => array(
                    'title' => ts('Leave amount'),
                    'no_repeat' => TRUE,
                ),
              ),
              'grouping' => 'leave-fields',
              'group_bys' => array(
                    'civicrm_hrjobcontract_leave_jobcontract_revision_id' => array(
                        'title' => ts('Leave Revision Id'),
                        'dbAlias' => 'hrjobcontract_leave_civireport.jobcontract_revision_id',
                    ),
              ),
            ),
            
            'civicrm_hrjobcontract_pay' => array(
              'dao' => 'CRM_Hrjobcontract_DAO_HRJobPay',
              'fields' => array(
                'pay_id' => array(
                    'title' => ts('Pay ID'),
                    'no_repeat' => TRUE,
                    'name' => 'id',
                ),
                'pay_scale' => array(
                    'title' => ts('Pay scale'),
                    'no_repeat' => TRUE,
                ),
                'is_paid' => array(
                    'title' => ts('Is paid'),
                    'no_repeat' => TRUE,
                ),
                'pay_amount' => array(
                    'title' => ts('Pay amount'),
                    'no_repeat' => TRUE,
                ),
                'pay_unit' => array(
                    'title' => ts('Pay unit'),
                    'no_repeat' => TRUE,
                ),
                'pay_currency' => array(
                    'title' => ts('Pay currency'),
                    'no_repeat' => TRUE,
                ),
                'pay_annualized_est' => array(
                    'title' => ts('Pay annualized est'),
                    'no_repeat' => TRUE,
                ),
                'pay_is_auto_est' => array(
                    'title' => ts('Pay is auto est'),
                    'no_repeat' => TRUE,
                ),
              ),
              'grouping' => 'pay-fields',
              'group_bys' => array(
                    'civicrm_hrjobcontract_pay_jobcontract_revision_id' => array(
                        'title' => ts('Pay Revision Id'),
                        'dbAlias' => 'hrjobcontract_pay_civireport.jobcontract_revision_id',
                    ),
              ),
            ),
            
            'civicrm_hrjobcontract_pension' => array(
              'dao' => 'CRM_Hrjobcontract_DAO_HRJobPension',
              'fields' => array(
                'pension_id' => array(
                    'title' => ts('Pension ID'),
                    'no_repeat' => TRUE,
                    'name' => 'id',
                ),
                'is_enrolled' => array(
                    'title' => ts('Is enrolled'),
                    'no_repeat' => TRUE,
                ),
                'ee_contrib_pct' => array(
                    'title' => ts('EE contrib pct'),
                    'no_repeat' => TRUE,
                ),
                'er_contrib_pct' => array(
                    'title' => ts('ER contrib pct'),
                    'no_repeat' => TRUE,
                ),
                'pension_type' => array(
                    'title' => ts('Pension type'),
                    'no_repeat' => TRUE,
                ),
                'ee_contrib_abs' => array(
                    'title' => ts('EE contrib abs'),
                    'no_repeat' => TRUE,
                ),
                'ee_evidence_note' => array(
                    'title' => ts('EE evidence note'),
                    'no_repeat' => TRUE,
                ),
              ),
              'grouping' => 'pension-fields',
              'group_bys' => array(
                    'civicrm_hrjobcontract_pension_jobcontract_revision_id' => array(
                        'title' => ts('Pension Revision Id'),
                        'dbAlias' => 'hrjobcontract_pension_civireport.jobcontract_revision_id',
                    ),
              ),
            ),
            
            'civicrm_hrjobcontract_role' => array(
              'dao' => 'CRM_Hrjobcontract_DAO_HRJobRole',
              'fields' => array(
                'role_id' => array(
                    'title' => ts('Role ID'),
                    'no_repeat' => TRUE,
                    'name' => 'id',
                ),
                'role_title' => array(
                    'title' => ts('Title'),
                    'no_repeat' => TRUE,
                    'name' => 'title',
                ),
                'description' => array(
                    'title' => ts('Description'),
                    'no_repeat' => TRUE,
                ),
                'hours' => array(
                    'title' => ts('Hours'),
                    'no_repeat' => TRUE,
                ),
                'role_hours_unit' => array(
                    'title' => ts('Role hours unit'),
                    'no_repeat' => TRUE,
                ),
                'region' => array(
                    'title' => ts('Region'),
                    'no_repeat' => TRUE,
                ),
                'department' => array(
                    'title' => ts('Department'),
                    'no_repeat' => TRUE,
                ),
                'level_type' => array(
                    'title' => ts('Level type'),
                    'no_repeat' => TRUE,
                ),
                'manager_contact_id' => array(
                    'title' => ts('Manager contact ID'),
                    'no_repeat' => TRUE,
                ),
                'functional_area' => array(
                    'title' => ts('Functional area'),
                    'no_repeat' => TRUE,
                ),
                'organization' => array(
                    'title' => ts('Organization'),
                    'no_repeat' => TRUE,
                ),
                'cost_center' => array(
                    'title' => ts('Cost center'),
                    'no_repeat' => TRUE,
                ),
                'funder' => array(
                    'title' => ts('Funder'),
                    'no_repeat' => TRUE,
                ),
                'percent_pay_funder' => array(
                    'title' => ts('Percent pay funder'),
                    'no_repeat' => TRUE,
                ),
                'percent_pay_role' => array(
                    'title' => ts('Percent pay role'),
                    'no_repeat' => TRUE,
                ),
                'location' => array(
                    'title' => ts('Location'),
                    'no_repeat' => TRUE,
                ),
                /*'jobcontract_revision_id' => array(
                    'title' => ts('Job')
                )*/
              ),
              'grouping' => 'role-fields',
              'group_bys' => array(
                    'civicrm_hrjobcontract_role_jobcontract_revision_id' => array(
                        'title' => ts('Role Revision Id'),
                        'dbAlias' => 'hrjobcontract_role_civireport.jobcontract_revision_id',
                    ),
              ),
            ),
            
        );
    }

  function preProcess() {
    parent::preProcess();
  }

  function select() {
    $select = array();
    $this->_columnHeaders = array();
    foreach ($this->_columns as $tableName => $table) {
      if (array_key_exists('fields', $table)) {
        foreach ($table['fields'] as $fieldName => $field) {
          if (!empty($field['required']) || !empty($this->_params['fields'][$fieldName])) {
            $alias = "{$tableName}_{$fieldName}";
            $select[] = "{$field['dbAlias']} as {$alias}";
            $this->_columnHeaders["{$tableName}_{$fieldName}"]['type'] = CRM_Utils_Array::value('type', $field);
            $this->_columnHeaders["{$tableName}_{$fieldName}"]['title'] = $field['title'];
            $this->_selectAliases[] = $alias;
          }
        }
      }
    }

    $this->_select = "SELECT " . implode(', ', $select) . " ";
  }

  /**
   * @param $fields
   * @param $files
   * @param $self
   *
   * @return array
   */
  static function formRule($fields, $files, $self) {
    $errors = $grouping = array();
    return $errors;
  }

  function from() {
    $this->_from = "
    FROM civicrm_contact {$this->_aliases['civicrm_contact']} {$this->_aclFrom}
    LEFT JOIN civicrm_hrjobcontract AS {$this->_aliases['civicrm_hrjobcontract']} ON {$this->_aliases['civicrm_contact']}.id = {$this->_aliases['civicrm_hrjobcontract']}.contact_id
    LEFT JOIN civicrm_hrjobcontract_revision AS {$this->_aliases['civicrm_hrjobcontract_revision']} ON {$this->_aliases['civicrm_hrjobcontract']}.id = {$this->_aliases['civicrm_hrjobcontract_revision']}.jobcontract_id
    LEFT JOIN civicrm_hrjobcontract_details AS {$this->_aliases['civicrm_hrjobcontract_details']} ON {$this->_aliases['civicrm_hrjobcontract_revision']}.details_revision_id = {$this->_aliases['civicrm_hrjobcontract_details']}.jobcontract_revision_id
    LEFT JOIN civicrm_hrjobcontract_health AS {$this->_aliases['civicrm_hrjobcontract_health']} ON {$this->_aliases['civicrm_hrjobcontract_revision']}.health_revision_id = {$this->_aliases['civicrm_hrjobcontract_health']}.jobcontract_revision_id
    LEFT JOIN civicrm_hrjobcontract_hour AS {$this->_aliases['civicrm_hrjobcontract_hour']} ON {$this->_aliases['civicrm_hrjobcontract_revision']}.hour_revision_id = {$this->_aliases['civicrm_hrjobcontract_hour']}.jobcontract_revision_id
    LEFT JOIN civicrm_hrjobcontract_leave AS {$this->_aliases['civicrm_hrjobcontract_leave']} ON {$this->_aliases['civicrm_hrjobcontract_revision']}.leave_revision_id = {$this->_aliases['civicrm_hrjobcontract_leave']}.jobcontract_revision_id
    LEFT JOIN civicrm_hrjobcontract_pay AS {$this->_aliases['civicrm_hrjobcontract_pay']} ON {$this->_aliases['civicrm_hrjobcontract_revision']}.pay_revision_id = {$this->_aliases['civicrm_hrjobcontract_pay']}.jobcontract_revision_id
    LEFT JOIN civicrm_hrjobcontract_pension AS {$this->_aliases['civicrm_hrjobcontract_pension']} ON {$this->_aliases['civicrm_hrjobcontract_revision']}.pension_revision_id = {$this->_aliases['civicrm_hrjobcontract_pension']}.jobcontract_revision_id
    LEFT JOIN civicrm_hrjobcontract_role AS {$this->_aliases['civicrm_hrjobcontract_role']} ON {$this->_aliases['civicrm_hrjobcontract_revision']}.role_revision_id = {$this->_aliases['civicrm_hrjobcontract_role']}.jobcontract_revision_id
    ";
  }

  function postProcess() {
    $this->beginPostProcess();

    // get the acl clauses built before we assemble the query
    $this->buildACLClause($this->_aliases['civicrm_contact']);

    $sql = $this->buildQuery(TRUE);

    $rows = $graphRows = array();
    $this->buildRows($sql, $rows);

    $this->formatDisplay($rows);
    $this->doTemplateAssignment($rows);
    $this->endPostProcess($rows);
  }

  function alterDisplay(&$rows) {
    // custom code to alter rows
    $entryFound = FALSE;

    foreach ($rows as $rowNum => $row) {
      // make count columns point to detail report
      // convert sort name to links
      if (array_key_exists('civicrm_contact_sort_name', $row) &&
        array_key_exists('civicrm_hrjobcontract_contact_id', $row)
      ) {
        $url = CRM_Report_Utils_Report::getNextUrl('contact/detail',
          'reset=1&force=1&id_op=eq&id_value=' . $row['civicrm_hrjobcontract_contact_id'],
          $this->_absoluteUrl, $this->_id, $this->_drilldownReport
        );
        $rows[$rowNum]['civicrm_contact_sort_name_link'] = $url;
        $rows[$rowNum]['civicrm_contact_sort_name_hover'] = ts("View Constituent Detail Report for this contact.");
        $entryFound = TRUE;
      }

      // skip looking further in rows, if first row itself doesn't
      // have the column we need
      if (!$entryFound) {
        break;
      }
    }
  }
  
  function buildQuickForm() {

    $this->addColumns();

    $this->addFilters();

    $this->addOptions();

    $this->addGroupBys();

    $this->addOrderBys();

    $this->buildInstanceAndButtons();

    //add form rule for report
    if (is_callable(array(
          $this, 'formRule'))) {
      $this->addFormRule(array(get_class($this), 'formRule'), $this);
    }
  }
}

