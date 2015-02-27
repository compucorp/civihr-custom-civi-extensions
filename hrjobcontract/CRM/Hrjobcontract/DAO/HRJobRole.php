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
 * Generated from xml/schema/CRM/HRJob/HRJobRole.xml
 * DO NOT EDIT.  Generated by GenCode.php
 */
require_once 'CRM/Core/DAO.php';
require_once 'CRM/Utils/Type.php';
class CRM_Hrjobcontract_DAO_HRJobRole extends CRM_Hrjobcontract_DAO_Base
{
  /**
   * static instance to hold the table name
   *
   * @var string
   * @static
   */
  static $_tableName = 'civicrm_hrjobcontract_role';
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
   * Unique HRJobRole ID
   *
   * @var int unsigned
   */
  public $id;
  /**
   * Negotiated name for the role
   *
   * @var string
   */
  public $title;
  /**
   * Negotiated name for the role
   *
   * @var text
   */
  public $description;
  /**
   * Amount of time allocated for work (in a given week)
   *
   * @var float
   */
  public $hours;
  /**
   * Period during which hours are allocated (eg 5 hours per day; 5 hours per week)
   *
   * @var string
   */
  public $role_hours_unit;
  /**
   *
   * @var string
   */
  public $region;
  /**
   *
   * @var string
   */
  public $department;
  /**
   * Junior manager, senior manager, etc.
   *
   * @var string
   */
  public $level_type;
  /**
   * FK to Contact ID
   *
   * @var int unsigned
   */
  public $manager_contact_id;
  /**
   *
   * @var string
   */
  public $functional_area;
  /**
   *
   * @var string
   */
  public $organization;
  /**
   *
   * @var string
   */
  public $cost_center;
  /**
   * FK to Contact ID
   *
   * @var string
   */
  public $funder;
  /**
   * Percentage of Pay Assigned to this funder
   *
   * @var string
   */
  public $percent_pay_funder;
  /**
   * Percentage of Pay Assigned to this Role
   *
   * @var int unsigned
   */
  public $percent_pay_role;
  /**
   * Main work location
   *
   * @var string
   */
  public $location;

  /**
   * class constructor
   *
   * @access public
   * @return civicrm_hrjob_role
   */
  function __construct()
  {
    $this->__table = 'civicrm_hrjobcontract_role';
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
        new CRM_Core_Reference_Basic(self::getTableName() , 'manager_contact_id', 'civicrm_contact', 'id') ,
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
                  'title' => ts('Job Role Id') ,
                  'export' => false,
                  'import' => false,
                  'required' => true,
                ) ,
                'title' => array(
                  'name' => 'title',
                  'type' => CRM_Utils_Type::T_STRING,
                  'title' => ts('Role Title') ,
                  'export' => true,
                  'import' => true,
                  'maxlength' => 127,
                  'size' => CRM_Utils_Type::HUGE,
                  'headerPattern' => '/^role\s?title/i',
                ) ,
                'description' => array(
                  'name' => 'description',
                  'type' => CRM_Utils_Type::T_TEXT,
                  'title' => ts('Role Description') ,
                  'export' => true,
                  'import' => true,
                  'headerPattern' => '/^role\s?description/i',
                ) ,
                'hrjob_role_hours' => array(
                  'name' => 'hours',
                  'type' => CRM_Utils_Type::T_FLOAT,
                  'title' => ts('Role Hours Amount') ,
                  'export' => true,
                  'import' => true,
                  'headerPattern' => '/^role\s?hours\s?amount/i',
                ) ,
                'hrjob_role_unit' => array(
                  'name' => 'role_hours_unit',
                  'type' => CRM_Utils_Type::T_STRING,
                  'title' => ts('Role Hours Unit') ,
                  'export' => true,
                  'import' => true,
                  'maxlength' => 63,
                  'size' => CRM_Utils_Type::BIG,
                  'import' => true,
                  'where' => 'civicrm_hrjobcontract_role.role_hours_unit',
                  'headerPattern' => '',
                  'dataPattern' => '',
                  'export' => true,
                  'pseudoconstant' => array(
                    'callback' => 'CRM_Hrjobcontract_SelectValues::commonUnit',
                  ),
                  'headerPattern' => '/^role\s?hours\s?unit/i',
                ) ,
                'hrjob_region' => array(
                  'name' => 'region',
                  'type' => CRM_Utils_Type::T_STRING,
                  'title' => ts('Region') ,
                  'export' => true,
                  'import' => true,
                  'maxlength' => 127,
                  'size' => CRM_Utils_Type::HUGE,
                  'import' => true,
                  'where' => 'civicrm_hrjobcontract_role.region',
                  'headerPattern' => '',
                  'dataPattern' => '',
                  'export' => true,
                  'pseudoconstant' => array(
                    'optionGroupName' => 'hrjc_region',
                  ),
                  'headerPattern' => '/^region/i',
                ) ,
                'hrjob_role_department' => array(
                  'name' => 'department',
                  'type' => CRM_Utils_Type::T_STRING,
                  'title' => ts('Department') ,
                  'export' => true,
                  'import' => true,
                  'maxlength' => 127,
                  'size' => CRM_Utils_Type::HUGE,
                  'export' => true,
                  'where' => 'civicrm_hrjobcontract_role.department',
                  'headerPattern' => '',
                  'dataPattern' => '',
                  'pseudoconstant' => array(
                    'optionGroupName' => 'hrjc_department',
                  ),
                  'headerPattern' => '/^department/i',
                ) ,
                'hrjob_role_level_type' => array(
                  'name' => 'level_type',
                  'type' => CRM_Utils_Type::T_STRING,
                  'title' => ts('Level') ,
                  'export' => true,
                  'import' => true,
                  'maxlength' => 63,
                  'size' => CRM_Utils_Type::BIG,
                  'import' => true,
                  'where' => 'civicrm_hrjobcontract_role.level_type',
                  'headerPattern' => '',
                  'dataPattern' => '',
                  'export' => true,
                  'pseudoconstant' => array(
                    'optionGroupName' => 'hrjc_level_type',
                  ),
                  'headerPattern' => '/^level/i',
                ) ,
                'manager_contact_id' => array(
                  'name' => 'manager_contact_id',
                  'type' => CRM_Utils_Type::T_INT,
                  'title' => ts('Manager Contact Id') ,
                  'export' => true,
                  'import' => true,
                  'FKClassName' => 'CRM_Contact_DAO_Contact',
                  'headerPattern' => '/^manager\s?contact\s?id/i',
                ) ,
                'functional_area' => array(
                  'name' => 'functional_area',
                  'type' => CRM_Utils_Type::T_STRING,
                  'title' => ts('Functional Area') ,
                  'export' => true,
                  'import' => true,
                  'maxlength' => 127,
                  'size' => CRM_Utils_Type::HUGE,
                  'headerPattern' => '/^functional\s?area/i',
                ) ,
                'organization' => array(
                  'name' => 'organization',
                  'type' => CRM_Utils_Type::T_STRING,
                  'title' => ts('Organization') ,
                  'export' => true,
                  'import' => true,
                  'maxlength' => 127,
                  'size' => CRM_Utils_Type::HUGE,
                  'headerPattern' => '/^organization/i',
                ) ,
                'cost_center' => array(
                  'name' => 'cost_center',
                  'type' => CRM_Utils_Type::T_STRING,
                  'title' => ts('Cost Center') ,
                  'export' => true,
                  'import' => true,
                  'maxlength' => 127,
                  'size' => CRM_Utils_Type::HUGE,
                  'headerPattern' => '/^cost\s?center/i',
                ) ,
                'hrjob_funder' => array(
                  'name' => 'funder',
                  'type' => CRM_Utils_Type::T_STRING,
                  'title' => ts('Funder') ,
                  'export' => true,
                  'import' => true,
                  'maxlength' => 127,
                  'size' => CRM_Utils_Type::HUGE,
                  'import' => true,
                  'where' => 'civicrm_hrjobcontract_role.funder',
                  'headerPattern' => '',
                  'dataPattern' => '',
                  'headerPattern' => '/^funder/i',
                ) ,
                'hrjob_role_percent_pay_funder' => array(
                  'name' => 'percent_pay_funder',
                  'type' => CRM_Utils_Type::T_STRING,
                  'title' => ts('Percent of Pay Assigned to this funder') ,
                  'export' => true,
                  'import' => true,
                  'maxlength' => 127,
                  'size' => CRM_Utils_Type::HUGE,
                  'import' => true,
                  'where' => 'civicrm_hrjobcontract_role.percent_pay_funder',
                  'headerPattern' => '',
                  'dataPattern' => '',
                  'headerPattern' => '/^percent\s?of\s?pay\s?assigned\s?to\s?this\s?funder/i',
                ) ,
                'hrjob_role_percent_pay_role' => array(
                  'name' => 'percent_pay_role',
                  'type' => CRM_Utils_Type::T_INT,
                  'title' => ts('Percent of Pay Assigned to this Role') ,
                  'export' => true,
                  'import' => true,
                  'where' => 'civicrm_hrjobcontract_role.percent_pay_role',
                  'headerPattern' => '',
                  'dataPattern' => '',
                  'headerPattern' => '/^percent\s?of\s?pay\s?assigned\s?to\s?this\s?role/i',
                ) ,
                'location' => array(
                  'name' => 'location',
                  'type' => CRM_Utils_Type::T_STRING,
                  'title' => ts('Location') ,
                  'export' => true,
                  'import' => true,
                  'maxlength' => 127,
                  'size' => CRM_Utils_Type::HUGE,
                  'where' => 'civicrm_hrjobcontract_role.location',
                  'headerPattern' => '',
                  'dataPattern' => '',
                  'pseudoconstant' => array(
                    'optionGroupName' => 'hrjc_location',
                  ),
                  'headerPattern' => '/^location/i',
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
              'title' => 'title',
              'description' => 'description',
              'hours' => 'hrjob_role_hours',
              'role_hours_unit' => 'hrjob_role_unit',
              'region' => 'hrjob_region',
              'department' => 'hrjob_role_department',
              'level_type' => 'hrjob_role_level_type',
              'manager_contact_id' => 'manager_contact_id',
              'functional_area' => 'functional_area',
              'organization' => 'organization',
              'cost_center' => 'cost_center',
              'funder' => 'hrjob_funder',
              'percent_pay_funder' => 'hrjob_role_percent_pay_funder',
              'percent_pay_role' => 'hrjob_role_percent_pay_role',
              'location' => 'location',
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
            self::$_import['hrjobcontract_role'] = & $fields[$name];
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
            self::$_export['hrjobcontract_role'] = & $fields[$name];
          } else {
            self::$_export[$name] = & $fields[$name];
          }
        }
      }
    }
    return self::$_export;
  }
}
