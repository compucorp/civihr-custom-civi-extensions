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
 * @copyright CiviCRM LLC (c) 2004-2014
 *
 */
require_once 'CRM/Core/DAO.php';
require_once 'CRM/Utils/Type.php';
class CRM_Hrjobcontract_DAO_HRJobData extends CRM_Hrjobcontract_DAO_Base
{
  /**
   * static instance to hold the table name
   *
   * @var string
   * @static
   */
  static $_tableName = 'civicrm_hrjobcontract_data';
  /**
   * static instance to hold the field values
   *
   * @var array
   * @static
   */
  static $_fields = null;
  /**
   * static instance to hold the keys used in $_fields for each field.
   *
   * @var array
   * @static
   */
  static $_fieldKeys = null;
  /**
   * static instance to hold the FK relationships
   *
   * @var string
   * @static
   */
  static $_links = null;
  /**
   * static instance to hold the values that can
   * be imported
   *
   * @var array
   * @static
   */
  static $_import = null;
  /**
   * static instance to hold the values that can
   * be exported
   *
   * @var array
   * @static
   */
  static $_export = null;
  /**
   * static value to see if we should log any modifications to
   * this table in the civicrm_log table
   *
   * @var boolean
   * @static
   */
  static $_log = true;
  /**
   * Unique HRJob ID
   *
   * @var int unsigned
   */
  public $id;
  /**
   * Internal name for the job (for HR)
   *
   * @var string
   */
  public $position;
  /**
   * Negotiated name for the job
   *
   * @var string
   */
  public $title;
  /**
   *
   * @var text
   */
  public $funding_notes;
  /**
   * Contract for employment, internship, etc.
   *
   * @var string
   */
  public $contract_type;
  /**
   * .
   *
   * @var string
   */
  public $period_type;
  /**
   * First day of the job
   *
   * @var date
   */
  public $period_start_date;
  /**
   * Last day of the job
   *
   * @var date
   */
  public $period_end_date;
  /**
   * Amount of time allocated for notice period. Number part without the unit e.g 3 in 3 Weeks.
   *
   * @var float
   */
  public $notice_amount;
  /**
   * Unit of a notice period assigned to a quantity e.g Week in 3 Weeks.
   *
   * @var string
   */
  public $notice_unit;
  /**
   * Amount of time allocated for notice period. Number part without the unit e.g 3 in 3 Weeks.
   *
   * @var float
   */
  public $notice_amount_employee;
  /**
   * Unit of a notice period assigned to a quantity e.g Week in 3 Weeks.
   *
   * @var string
   */
  public $notice_unit_employee;
  /**
   * Normal place of work
   *
   * @var string
   */
  public $location;
  /**
   * Is this the primary?
   *
   * @var boolean
   */
  public $is_primary;

  /**
   * class constructor
   *
   * @access public
   * @return civicrm_hrjob
   */
  function __construct()
  {
    $this->__table = 'civicrm_hrjobcontract_data';
    parent::__construct();
  }
  /**
   * return foreign keys and entity references
   *
   * @static
   * @access public
   * @return array of CRM_Core_Reference_Interface
   */
  static function getReferenceColumns()
  {
    if (!self::$_links) {
      self::$_links = array(
        new CRM_Core_Reference_Basic(self::getTableName() , 'jobcontract_revision_id', 'civicrm_hrjobcontract_revision', 'id') ,
      );
    }
    return self::$_links;
  }
  /**
   * returns all the column names of this table
   *
   * @access public
   * @return array
   */
  static function &fields()
  {
    if (!(self::$_fields)) {
        self::$_fields = self::setFields(
            array(
                'id' => array(
                  'name' => 'id',
                  'type' => CRM_Utils_Type::T_INT,
                  'title' => ts('Id') ,
                  'required' => true,
                ) ,
                'hrjob_position' => array(
                  'name' => 'position',
                  'type' => CRM_Utils_Type::T_STRING,
                  'title' => ts('Job Contract Position') ,
                  'maxlength' => 127,
                  'size' => CRM_Utils_Type::HUGE,
                  'export' => true,
                  'import' => true,
                  'where' => 'civicrm_hrjobcontract_data.position',
                  'headerPattern' => '',
                  'dataPattern' => '',
                ) ,
                'hrjob_title' => array(
                  'name' => 'title',
                  'type' => CRM_Utils_Type::T_STRING,
                  'title' => ts('Job Contract Title') ,
                  'maxlength' => 127,
                  'size' => CRM_Utils_Type::HUGE,
                  'export' => true,
                  'import' => true,
                  'where' => 'civicrm_hrjobcontract_data.title',
                  'headerPattern' => '',
                  'dataPattern' => '',
                ) ,
                'funding_notes' => array(
                  'name' => 'funding_notes',
                  'type' => CRM_Utils_Type::T_TEXT,
                  'title' => ts('Funding Notes') ,
                  'export' => true,
                  'import' => true,
                ) ,
                'hrjob_contract_type' => array(
                  'name' => 'contract_type',
                  'type' => CRM_Utils_Type::T_STRING,
                  'title' => ts('Job Contract Type') ,
                  'maxlength' => 63,
                  'size' => CRM_Utils_Type::BIG,
                  'export' => true,
                  'import' => true,
                  'where' => 'civicrm_hrjobcontract_data.contract_type',
                  'headerPattern' => '',
                  'dataPattern' => '',
                  'pseudoconstant' => array(
                    'optionGroupName' => 'hrjob_contract_type',
                  )
                ) ,
                'period_type' => array(
                  'name' => 'period_type',
                  'type' => CRM_Utils_Type::T_STRING,
                  'title' => ts('Job Contract Duration') ,
                  'export' => true,
                  'maxlength' => 63,
                  'size' => CRM_Utils_Type::BIG,
                  'import' => true,
                  'where' => 'civicrm_hrjobcontract_data.period_type',
                  'headerPattern' => '',
                  'dataPattern' => '',
                  'pseudoconstant' => array(
                    'callback' => 'CRM_Hrjobcontract_SelectValues::periodType',
                  )
                ) ,
                'hrjob_period_start_date' => array(
                  'name' => 'period_start_date',
                  'type' => CRM_Utils_Type::T_DATE,
                  'title' => ts('Job Contract Start Date') ,
                  'export' => true,
                  'import' => true,
                  'where' => 'civicrm_hrjobcontract_data.period_start_date',
                  'headerPattern' => '',
                  'dataPattern' => '',
                ) ,
                'hrjob_period_end_date' => array(
                  'name' => 'period_end_date',
                  'type' => CRM_Utils_Type::T_DATE,
                  'title' => ts('Job Contract End Date') ,
                  'export' => true,
                  'import' => true,
                  'where' => 'civicrm_hrjobcontract_data.period_end_date',
                  'headerPattern' => '',
                  'dataPattern' => '',
                ) ,
                'hrjob_notice_amount' => array(
                  'name' => 'notice_amount',
                  'type' => CRM_Utils_Type::T_FLOAT,
                  'title' => ts('Notice Period from Employer (Amount)') ,
                  'export' => true,
                  'import' => true,
                  'where' => 'civicrm_hrjobcontract_data.notice_amount',
                  'headerPattern' => '',
                  'dataPattern' => '',
                ) ,
                'hrjob_notice_unit' => array(
                  'name' => 'notice_unit',
                  'type' => CRM_Utils_Type::T_STRING,
                  'title' => ts('Notice Period from Employer (Unit)') ,
                  'export' => true,
                  'maxlength' => 63,
                  'size' => CRM_Utils_Type::BIG,
                  'import' => true,
                  'where' => 'civicrm_hrjobcontract_data.notice_unit',
                  'headerPattern' => '',
                  'dataPattern' => '',
                  'pseudoconstant' => array(
                    'callback' => 'CRM_Hrjobcontract_SelectValues::commonUnit',
                  )
                ) ,
                'hrjob_notice_amount_employee' => array(
                  'name' => 'notice_amount_employee',
                  'type' => CRM_Utils_Type::T_FLOAT,
                  'title' => ts('Notice Period from Employee (Amount)') ,
                  'import' => true,
                  'where' => 'civicrm_hrjobcontract_data.notice_amount_employee',
                  'headerPattern' => '',
                  'dataPattern' => '',
                  'export' => true,
                ) ,
                'hrjob_notice_unit_employee' => array(
                  'name' => 'notice_unit_employee',
                  'type' => CRM_Utils_Type::T_STRING,
                  'title' => ts('Notice Period from Employee (Unit)') ,
                  'maxlength' => 63,
                  'size' => CRM_Utils_Type::BIG,
                  'import' => true,
                  'where' => 'civicrm_hrjobcontract_data.notice_unit_employee',
                  'headerPattern' => '',
                  'dataPattern' => '',
                  'export' => true,
                  'pseudoconstant' => array(
                    'callback' => 'CRM_Hrjobcontract_SelectValues::commonUnit',
                  )
                ) ,
                'hrjob_location' => array(
                  'name' => 'location',
                  'type' => CRM_Utils_Type::T_STRING,
                  'title' => ts('Job Contract Normal Place of Work') ,
                  'maxlength' => 127,
                  'size' => CRM_Utils_Type::HUGE,
                  'export' => true,
                  'import' => true,
                  'where' => 'civicrm_hrjobcontract_data.location',
                  'headerPattern' => '',
                  'dataPattern' => '',
                  'pseudoconstant' => array(
                    'optionGroupName' => 'hrjob_location',
                  )
                ) ,
                'hrjob_is_primary' => array(
                  'name' => 'is_primary',
                  'type' => CRM_Utils_Type::T_BOOLEAN,
                  'title' => ts('Job Contract Is Primary') ,
                  'export' => true,
                  'import' => true,
                  'where' => 'civicrm_hrjobcontract_data.is_primary',
                  'headerPattern' => '',
                  'dataPattern' => '',
                ) ,
              )
        );
    }
    return self::$_fields;
  }
  /**
   * Returns an array containing, for each field, the arary key used for that
   * field in self::$_fields.
   *
   * @access public
   * @return array
   */
  static function &fieldKeys()
  {
    if (!(self::$_fieldKeys)) {
        self::$_fieldKeys = self::setFieldKeys(
            array(
                'id' => 'id',
                'position' => 'hrjob_position',
                'title' => 'hrjob_title',
                'funding_notes' => 'funding_notes',
                'contract_type' => 'hrjob_contract_type',
                'period_type' => 'hrjob_period_start_date',
                'period_start_date' => 'period_start_date',
                'period_end_date' => 'hrjob_period_end_date',
                'notice_amount' => 'hrjob_notice_amount',
                'notice_unit' => 'hrjob_notice_unit',
                'notice_amount_employee' => 'hrjob_notice_amount_employee',
                'notice_unit_employee' => 'hrjob_notice_unit_employee',
                'location' => 'hrjob_location',
                'is_primary' => 'hrjob_is_primary',
            )
        );
    }
    return self::$_fieldKeys;
  }
  /**
   * returns the names of this table
   *
   * @access public
   * @static
   * @return string
   */
  static function getTableName()
  {
    return self::$_tableName;
  }
  /**
   * returns if this table needs to be logged
   *
   * @access public
   * @return boolean
   */
  function getLog()
  {
    return self::$_log;
  }
  /**
   * returns the list of fields that can be imported
   *
   * @access public
   * return array
   * @static
   */
  static function &import($prefix = false)
  {
    if (!(self::$_import)) {
      self::$_import = array();
      $fields = self::fields();
      foreach($fields as $name => $field) {
        if (!empty($field['import'])) {
          if ($prefix) {
            self::$_import['hrjobcontract_data'] = & $fields[$name];
          } else {
            self::$_import[$name] = & $fields[$name];
          }
        }
      }
    }
    return self::$_import;
  }
  /**
   * returns the list of fields that can be exported
   *
   * @access public
   * return array
   * @static
   */
  static function &export($prefix = false)
  {
    if (!(self::$_export)) {
      self::$_export = array();
      $fields = self::fields();
      foreach($fields as $name => $field) {
        if (!empty($field['export'])) {
          if ($prefix) {
            self::$_export['hrjobcontract_data'] = & $fields[$name];
          } else {
            self::$_export[$name] = & $fields[$name];
          }
        }
      }
    }
    return self::$_export;
  }
}
