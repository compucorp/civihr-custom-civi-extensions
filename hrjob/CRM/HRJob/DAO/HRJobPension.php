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
 *
 * Generated from xml/schema/CRM/HRJob/HRJobPension.xml
 * DO NOT EDIT.  Generated by GenCode.php
 */
require_once 'CRM/Core/DAO.php';
require_once 'CRM/Utils/Type.php';
class CRM_HRJob_DAO_HRJobPension extends CRM_Core_DAO
{
  /**
   * static instance to hold the table name
   *
   * @var string
   * @static
   */
  static $_tableName = 'civicrm_hrjob_pension';
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
   * Unique HRJobPension ID
   *
   * @var int unsigned
   */
  public $id;
  /**
   * FK to Job
   *
   * @var int unsigned
   */
  public $job_id;
  /**
   *
   * @var boolean
   */
  public $is_enrolled;
  /**
   * Employee Contribution Percentage
   *
   * @var float
   */
  public $ee_contrib_pct;
  /**
   * Employer Contribution Percentage
   *
   * @var float
   */
  public $er_contrib_pct;
  /**
   * Pension Type
   *
   * @var string
   */
  public $pension_type;
  /**
   * Employer Contribution Absolute Amount
   *
   * @var float
   */
  public $ee_contrib_abs;
  /**
   * Employee evidence note
   *
   * @var string
   */
  public $ee_evidence_note;
  /**
   * class constructor
   *
   * @access public
   * @return civicrm_hrjob_pension
   */
  function __construct()
  {
    $this->__table = 'civicrm_hrjob_pension';
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
        new CRM_Core_Reference_Basic(self::getTableName() , 'job_id', 'civicrm_hrjob', 'id') ,
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
          'title' => ts('Pension Id') ,
          'required' => true,
        ) ,
        'job_id' => array(
          'name' => 'job_id',
          'type' => CRM_Utils_Type::T_INT,
          'title' => ts('Job Id') ,
          'required' => true,
          'FKClassName' => 'CRM_HRJob_DAO_HRJob',
        ) ,
        'hrjob_is_enrolled' => array(
          'name' => 'is_enrolled',
          'type' => CRM_Utils_Type::T_BOOLEAN,
          'title' => ts('Pension: Is Enrolled') ,
          'export' => true,
          'import' => true,
          'where' => 'civicrm_hrjob_pension.is_enrolled',
          'headerPattern' => '',
          'dataPattern' => '',
        ) ,
        'ee_contrib_pct' => array(
          'name' => 'ee_contrib_pct',
          'type' => CRM_Utils_Type::T_FLOAT,
          'title' => ts('Employee Contribution Percentage') ,
          'export' => true,
          'import' => true,
          'where' => 'civicrm_hrjob_pension.ee_contrib_pct',
          'headerPattern' => '',
          'dataPattern' => '',
        ) ,
        'er_contrib_pct' => array(
          'name' => 'er_contrib_pct',
          'type' => CRM_Utils_Type::T_FLOAT,
          'title' => ts('Employer Contribution Percentage') ,
          'export' => true,
          'import' => true,
          'where' => 'civicrm_hrjob_pension.er_contrib_pct',
          'headerPattern' => '',
          'dataPattern' => '',
        ) ,
        'hrjob_pension_type' => array(
          'name' => 'pension_type',
          'type' => CRM_Utils_Type::T_STRING,
          'title' => ts('Pension Provider') ,
          'maxlength' => 63,
          'size' => CRM_Utils_Type::BIG,
          'export' => true,
          'import' => true,
          'where' => 'civicrm_hrjob_pension.pension_type',
          'headerPattern' => '',
          'dataPattern' => '',
          'pseudoconstant' => array(
            'optionGroupName' => 'hrjob_pension_type',
          )
        ) ,
        'ee_contrib_abs' => array(
          'name' => 'ee_contrib_abs',
          'type' => CRM_Utils_Type::T_FLOAT,
          'title' => ts('Employee Contribution Absolute Amount') ,
          'export' => true,
          'import' => true,
          'where' => 'civicrm_hrjob_pension.ee_contrib_abs',
          'headerPattern' => '',
          'dataPattern' => '',
        ) ,
        'ee_evidence_note' => array(
          'name' => 'ee_evidence_note',
          'type' => CRM_Utils_Type::T_STRING,
          'title' => ts('Pension Evidence Note') ,
          'maxlength' => 127,
          'export' => true,
          'import' => true,
          'size' => CRM_Utils_Type::HUGE,
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
        'job_id' => 'job_id',
        'is_enrolled' => 'hrjob_is_enrolled',
        'ee_contrib_pct' => 'ee_contrib_pct',
        'er_contrib_pct' => 'er_contrib_pct',
        'pension_type' => 'hrjob_pension_type',
        'ee_contrib_abs' => 'ee_contrib_abs',
        'ee_evidence_note' => 'ee_evidence_note',
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
            self::$_import['hrjob_pension'] = & $fields[$name];
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
            self::$_export['hrjob_pension'] = & $fields[$name];
          } else {
            self::$_export[$name] = & $fields[$name];
          }
        }
      }
    }
    return self::$_export;
  }
}
