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
                'jobcontract_revision_id' => array(
                    'title' => ts('Revision ID'),
                    'no_repeat' => TRUE,
                    'name' => 'id',
                ),
                'editor_uid' => array(
                    'title' => ts('Editor UID'),
                    'no_repeat' => TRUE,
                    'name' => 'editor_uid',
                ),
                'created_date' => array(
                    'title' => ts('Created date'),
                    'no_repeat' => TRUE,
                    'name' => 'created_date',
                ),
                'modified_date' => array(
                    'title' => ts('Modified date'),
                    'no_repeat' => TRUE,
                    'name' => 'modified_date',
                ),
                'effective_date' => array(
                    'title' => ts('Effective date'),
                    'no_repeat' => TRUE,
                    'name' => 'effective_date',
                ),
                'change_reason' => array(
                    'title' => ts('Change reason'),
                    'no_repeat' => TRUE,
                    'name' => 'change_reason',
                ),
                'status' => array(
                    'title' => ts('Revision status'),
                    'no_repeat' => TRUE,
                    'name' => 'status',
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
                'details_revision_id' => array(
                    'title' => ts('Details Revision ID'),
                    'no_repeat' => TRUE,
                    'name' => 'details_revision_id',
                    'dbAlias' => 'hrjobcontract_details_civireport.jobcontract_revision_id',
                ),
                'details_id' => array(
                    'title' => ts('Details ID'),
                    'no_repeat' => TRUE,
                    'name' => 'id',
                    'dbAlias' => 'hrjobcontract_details_civireport.id',
                ),
                'details_position' => array(
                    'title' => ts('Position'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_details_civireport.position',
                ),
                'details_title' => array(
                    'title' => ts('Title'),
                    'no_repeat' => TRUE,
                    'name' => 'title',
                    'dbAlias' => 'hrjobcontract_details_civireport.title',
                ),
                'details_funding_notes' => array(
                    'title' => ts('Funding notes'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_details_civireport.funding_notes',
                ),
                'details_contract_type' => array(
                    'title' => ts('Contract type'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_details_civireport.contract_type',
                ),
                'details_period_type' => array(
                    'title' => ts('Period type'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_details_civireport.period_type',
                ),
                'details_period_start_date' => array(
                    'title' => ts('Period start date'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_details_civireport.period_start_date',
                ),
                'details_period_end_date' => array(
                    'title' => ts('Period end date'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_details_civireport.period_end_date',
                ),
                'details_notice_amount' => array(
                    'title' => ts('Notice amount'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_details_civireport.notice_amount',
                ),
                'details_notice_unit' => array(
                    'title' => ts('Notice unit'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_details_civireport.notice_unit',
                ),
                'details_notice_amount_employee' => array(
                    'title' => ts('Notice amount employee'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_details_civireport.notice_amount_employee',
                ),
                'details_notice_unit_employee' => array(
                    'title' => ts('Notice unit employee'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_details_civireport.notice_unit_employee',
                ),
                'details_location' => array(
                    'title' => ts('Location'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_details_civireport.location',
                ),
                'details_is_primary' => array(
                    'title' => ts('Is primary'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_details_civireport.is_primary',
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
                'health_revision_id' => array(
                    'title' => ts('Health Revision ID'),
                    'no_repeat' => TRUE,
                    'name' => 'health_revision_id',
                    'dbAlias' => 'hrjobcontract_health_civireport.jobcontract_revision_id',
                ),
                'health_id' => array(
                    'title' => ts('Health ID'),
                    'no_repeat' => TRUE,
                    'name' => 'id',
                    'dbAlias' => 'hrjobcontract_health_civireport.id',
                ),
                'health_provider' => array(
                    'title' => ts('Provider'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_health_civireport.provider',
                ),
                'health_plan_type' => array(
                    'title' => ts('Plan type'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_health_civireport.plan_type',
                ),
                'health_description' => array(
                    'title' => ts('Description'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_health_civireport.description',
                ),
                'health_dependents' => array(
                    'title' => ts('Dependents'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_health_civireport.dependents',
                ),
                'health_provider_life_insurance' => array(
                    'title' => ts('Provider life insurance'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_health_civireport.provider_life_insurance',
                ),
                'health_plan_type_life_insurance' => array(
                    'title' => ts('Plan type life insurance'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_health_civireport.plan_type_life_insurance',
                ),
                'health_description_life_insurance' => array(
                    'title' => ts('Description life insurance'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_health_civireport.description_life_insurance',
                ),
                'health_dependents_life_insurance' => array(
                    'title' => ts('Dependents life insurance'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_health_civireport.dependents_life_insurance',
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
                'hour_revision_id' => array(
                    'title' => ts('Hour Revision ID'),
                    'no_repeat' => TRUE,
                    'name' => 'hour_revision_id',
                    'dbAlias' => 'hrjobcontract_hour_civireport.jobcontract_revision_id',
                ),
                'hour_id' => array(
                    'title' => ts('Hour ID'),
                    'no_repeat' => TRUE,
                    'name' => 'id',
                    'dbAlias' => 'hrjobcontract_hour_civireport.id',
                ),
                'hour_location_standard_hours' => array(
                    'title' => ts('Location/Standard hours'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_hour_civireport.location_standard_hours',
                ),
                'hour_hours_type' => array(
                    'title' => ts('Hours type'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_hour_civireport.hours_type',
                ),
                'hour_hours_amount' => array(
                    'title' => ts('Hours amount'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_hour_civireport.hours_amount',
                ),
                'hour_hours_unit' => array(
                    'title' => ts('Hours unit'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_hour_civireport.hours_unit',
                ),
                'hour_hours_fte' => array(
                    'title' => ts('Hours FTE'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_hour_civireport.hours_fte',
                ),
                'hour_fte_num' => array(
                    'title' => ts('FTE num'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_hour_civireport.fte_num',
                ),
                'hour_fte_denom' => array(
                    'title' => ts('FTE denom'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_hour_civireport.fte_denom',
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
                'leave_revision_id' => array(
                    'title' => ts('Leave Revision ID'),
                    'no_repeat' => TRUE,
                    'name' => 'leave_revision_id',
                    'dbAlias' => 'hrjobcontract_leave_civireport.jobcontract_revision_id',
                ),
                'leave_id' => array(
                    'title' => ts('Leave ID'),
                    'no_repeat' => TRUE,
                    'name' => 'id',
                    'dbAlias' => 'hrjobcontract_leave_civireport.id',
                ),
                'leave_leave_type' => array(
                    'title' => ts('Leave type'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_leave_civireport.leave_type',
                ),
                'leave_leave_amount' => array(
                    'title' => ts('Leave amount'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_leave_civireport.leave_amount',
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
                'pay_revision_id' => array(
                    'title' => ts('Pay Revision ID'),
                    'no_repeat' => TRUE,
                    'name' => 'pay_revision_id',
                    'dbAlias' => 'hrjobcontract_pay_civireport.jobcontract_revision_id',
                ),
                'pay_id' => array(
                    'title' => ts('Pay ID'),
                    'no_repeat' => TRUE,
                    'name' => 'id',
                    'dbAlias' => 'hrjobcontract_pay_civireport.id',
                ),
                'pay_pay_scale' => array(
                    'title' => ts('Pay scale'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_pay_civireport.pay_scale',
                ),
                'pay_is_paid' => array(
                    'title' => ts('Is paid'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_pay_civireport.is_paid',
                ),
                'pay_pay_amount' => array(
                    'title' => ts('Pay amount'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_pay_civireport.pay_amount',
                ),
                'pay_pay_unit' => array(
                    'title' => ts('Pay unit'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_pay_civireport.pay_unit',
                ),
                'pay_pay_currency' => array(
                    'title' => ts('Pay currency'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_pay_civireport.pay_currency',
                ),
                'pay_pay_annualized_est' => array(
                    'title' => ts('Pay annualized est'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_pay_civireport.pay_annualized_est',
                ),
                'pay_pay_is_auto_est' => array(
                    'title' => ts('Pay is auto est'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_pay_civireport.pay_is_auto_est',
                ),
                'pay_annual_benefits' => array(
                    'title' => ts('Annual benefits'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_pay_civireport.annual_benefits',
                ),
                'pay_annual_deductions' => array(
                    'title' => ts('Annual deductions'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_pay_civireport.annual_deductions',
                ),
                'pay_pay_cycle' => array(
                    'title' => ts('Pay cycle'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_pay_civireport.pay_cycle',
                ),
                'pay_pay_per_cycle_gross' => array(
                    'title' => ts('Pay per cycle gross'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_pay_civireport.pay_per_cycle_gross',
                ),
                'pay_pay_per_cycle_net' => array(
                    'title' => ts('Pay per cycle net'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_pay_civireport.pay_per_cycle_net',
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
                'pension_revision_id' => array(
                    'title' => ts('Pension Revision ID'),
                    'no_repeat' => TRUE,
                    'name' => 'pension_revision_id',
                    'dbAlias' => 'hrjobcontract_pension_civireport.jobcontract_revision_id',
                ),
                'pension_id' => array(
                    'title' => ts('Pension ID'),
                    'no_repeat' => TRUE,
                    'name' => 'id',
                    'dbAlias' => 'hrjobcontract_pension_civireport.id',
                ),
                'pension_is_enrolled' => array(
                    'title' => ts('Is enrolled'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_pension_civireport.is_enrolled',
                ),
                'pension_ee_contrib_pct' => array(
                    'title' => ts('EE contrib pct'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_pension_civireport.ee_contrib_pct',
                ),
                'pension_er_contrib_pct' => array(
                    'title' => ts('ER contrib pct'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_pension_civireport.er_contrib_pct',
                ),
                'pension_pension_type' => array(
                    'title' => ts('Pension type'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_pension_civireport.pension_type',
                ),
                'pension_ee_contrib_abs' => array(
                    'title' => ts('EE contrib abs'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_pension_civireport.ee_contrib_abs',
                ),
                'pension_ee_evidence_note' => array(
                    'title' => ts('EE evidence note'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_pension_civireport.ee_evidence_note',
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
                'role_revision_id' => array(
                    'title' => ts('Role Revision ID'),
                    'no_repeat' => TRUE,
                    'name' => 'role_revision_id',
                    'dbAlias' => 'hrjobcontract_role_civireport.jobcontract_revision_id',
                ),
                'role_id' => array(
                    'title' => ts('Role ID'),
                    'no_repeat' => TRUE,
                    'name' => 'id',
                    'dbAlias' => 'hrjobcontract_role_civireport.id',
                ),
                'role_title' => array(
                    'title' => ts('Title'),
                    'no_repeat' => TRUE,
                    'name' => 'title',
                    'dbAlias' => 'hrjobcontract_role_civireport.title',
                ),
                'role_description' => array(
                    'title' => ts('Description'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_role_civireport.description',
                ),
                'role_hours' => array(
                    'title' => ts('Hours'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_role_civireport.hours',
                ),
                'role_role_hours_unit' => array(
                    'title' => ts('Role hours unit'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_role_civireport.role_hours_unit',
                ),
                'role_region' => array(
                    'title' => ts('Region'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_role_civireport.region',
                ),
                'role_department' => array(
                    'title' => ts('Department'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_role_civireport.department',
                ),
                'role_level_type' => array(
                    'title' => ts('Level type'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_role_civireport.level_type',
                ),
                'role_manager_contact_id' => array(
                    'title' => ts('Manager contact ID'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_role_civireport.manager_contact_id',
                ),
                'role_functional_area' => array(
                    'title' => ts('Functional area'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_role_civireport.functional_area',
                ),
                'role_organization' => array(
                    'title' => ts('Organization'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_role_civireport.organization',
                ),
                'role_cost_center' => array(
                    'title' => ts('Cost center'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_role_civireport.cost_center',
                ),
                'role_funder' => array(
                    'title' => ts('Funder'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_role_civireport.funder',
                ),
                'role_percent_pay_funder' => array(
                    'title' => ts('Percent pay funder'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_role_civireport.percent_pay_funder',
                ),
                'role_percent_pay_role' => array(
                    'title' => ts('Percent pay role'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_role_civireport.percent_pay_role',
                ),
                'role_location' => array(
                    'title' => ts('Location'),
                    'no_repeat' => TRUE,
                    'dbAlias' => 'hrjobcontract_role_civireport.location',
                ),
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

