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
class CRM_HRJob_DAO_HRJobData extends CRM_Core_DAO
{
  /**
   * static instance to hold the table name
   *
   * @var string
   * @static
   */
  static $_tableName = 'civicrm_hrjob_data';
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
   * Contract revision id
   * 
   * @var int
   */
  public $contract_revision_id;
  /**
   * class constructor
   *
   * @access public
   * @return civicrm_hrjob
   */
  function __construct()
  {
    $this->__table = 'civicrm_hrjob_data';
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
        new CRM_Core_Reference_Basic(self::getTableName() , 'contract_revision_id', 'civicrm_hrjob_contract_revision', 'id') ,
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
      self::$_fields = array(
        'id' => array(
          'name' => 'id',
          'type' => CRM_Utils_Type::T_INT,
          'title' => ts('Job Contract Id') ,
          'required' => true,
        ) ,
        'position' => array(
          'name' => 'position',
          'type' => CRM_Utils_Type::T_STRING,
          'title' => ts('Job Contract Position') ,
          'maxlength' => 127,
          'size' => CRM_Utils_Type::HUGE,
          'export' => true,
          'import' => true,
          'where' => 'civicrm_hrjob.position',
          'headerPattern' => '',
          'dataPattern' => '',
        ) ,
        'title' => array(
          'name' => 'title',
          'type' => CRM_Utils_Type::T_STRING,
          'title' => ts('Job Contract Title') ,
          'maxlength' => 127,
          'size' => CRM_Utils_Type::HUGE,
          'export' => true,
          'import' => true,
          'where' => 'civicrm_hrjob.title',
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
        'contract_type' => array(
          'name' => 'contract_type',
          'type' => CRM_Utils_Type::T_STRING,
          'title' => ts('Job Contract Type') ,
          'maxlength' => 63,
          'size' => CRM_Utils_Type::BIG,
          'export' => true,
          'import' => true,
          'where' => 'civicrm_hrjob.contract_type',
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
          'where' => 'civicrm_hrjob.period_type',
          'headerPattern' => '',
          'dataPattern' => '',
          'pseudoconstant' => array(
            'callback' => 'CRM_HRJob_SelectValues::periodType',
          )
        ) ,
        'period_start_date' => array(
          'name' => 'period_start_date',
          'type' => CRM_Utils_Type::T_DATE,
          'title' => ts('Job Contract Start Date') ,
          'export' => true,
          'import' => true,
          'where' => 'civicrm_hrjob.period_start_date',
          'headerPattern' => '',
          'dataPattern' => '',
        ) ,
        'period_end_date' => array(
          'name' => 'period_end_date',
          'type' => CRM_Utils_Type::T_DATE,
          'title' => ts('Job Contract End Date') ,
          'export' => true,
          'import' => true,
          'where' => 'civicrm_hrjob.period_end_date',
          'headerPattern' => '',
          'dataPattern' => '',
        ) ,
        'notice_amount' => array(
          'name' => 'notice_amount',
          'type' => CRM_Utils_Type::T_FLOAT,
          'title' => ts('Notice Period from Employer (Amount)') ,
          'export' => true,
          'import' => true,
          'where' => 'civicrm_hrjob.notice_amount',
          'headerPattern' => '',
          'dataPattern' => '',
        ) ,
        'notice_unit' => array(
          'name' => 'notice_unit',
          'type' => CRM_Utils_Type::T_STRING,
          'title' => ts('Notice Period from Employer (Unit)') ,
          'export' => true,
          'maxlength' => 63,
          'size' => CRM_Utils_Type::BIG,
          'import' => true,
          'where' => 'civicrm_hrjob.notice_unit',
          'headerPattern' => '',
          'dataPattern' => '',
          'pseudoconstant' => array(
            'callback' => 'CRM_HRJob_SelectValues::commonUnit',
          )
        ) ,
        'notice_amount_employee' => array(
          'name' => 'notice_amount_employee',
          'type' => CRM_Utils_Type::T_FLOAT,
          'title' => ts('Notice Period from Employee (Amount)') ,
          'import' => true,
          'where' => 'civicrm_hrjob.notice_amount_employee',
          'headerPattern' => '',
          'dataPattern' => '',
          'export' => true,
        ) ,
        'notice_unit_employee' => array(
          'name' => 'notice_unit_employee',
          'type' => CRM_Utils_Type::T_STRING,
          'title' => ts('Notice Period from Employee (Unit)') ,
          'maxlength' => 63,
          'size' => CRM_Utils_Type::BIG,
          'import' => true,
          'where' => 'civicrm_hrjob.notice_unit_employee',
          'headerPattern' => '',
          'dataPattern' => '',
          'export' => true,
          'pseudoconstant' => array(
            'callback' => 'CRM_HRJob_SelectValues::commonUnit',
          )
        ) ,
        'location' => array(
          'name' => 'location',
          'type' => CRM_Utils_Type::T_STRING,
          'title' => ts('Job Contract Normal Place of Work') ,
          'maxlength' => 127,
          'size' => CRM_Utils_Type::HUGE,
          'export' => true,
          'import' => true,
          'where' => 'civicrm_hrjob.location',
          'headerPattern' => '',
          'dataPattern' => '',
          'pseudoconstant' => array(
            'optionGroupName' => 'hrjob_location',
          )
        ) ,
        'is_primary' => array(
          'name' => 'is_primary',
          'type' => CRM_Utils_Type::T_BOOLEAN,
          'title' => ts('Job Contract Is Primary') ,
          'export' => true,
          'import' => true,
          'where' => 'civicrm_hrjob.is_primary',
          'headerPattern' => '',
          'dataPattern' => '',
        ) ,
        'contract_revision_id' => array(
          'name' => 'contract_revision_id',
          'type' => CRM_Utils_Type::T_INT,
          'title' => ts('Job Contract Revision Id') ,
          'required' => true,
          'FKClassName' => 'CRM_HRJob_DAO_HRJobContractRevision',
        ) ,
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
      self::$_fieldKeys = array(
        'id' => 'id',
        'position' => 'position',
        'title' => 'title',
        'funding_notes' => 'funding_notes',
        'contract_type' => 'contract_type',
        'period_type' => 'period_type',
        'period_start_date' => 'period_start_date',
        'period_end_date' => 'period_end_date',
        'notice_amount' => 'notice_amount',
        'notice_unit' => 'notice_unit',
        'notice_amount_employee' => 'notice_amount_employee',
        'notice_unit_employee' => 'notice_unit_employee',
        'location' => 'location',
        'is_primary' => 'is_primary',
        'contract_revision_id' => 'contract_revision_id',
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
            self::$_import['hrjob_data'] = & $fields[$name];
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
            self::$_export['hrjob_data'] = & $fields[$name];
          } else {
            self::$_export[$name] = & $fields[$name];
          }
        }
      }
    }
    return self::$_export;
  }
}