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
 * Generated from xml/schema/CRM/HRJob/HRJobHour.xml
 * DO NOT EDIT.  Generated by GenCode.php
 */
require_once 'CRM/Core/DAO.php';
require_once 'CRM/Utils/Type.php';
class CRM_HRJob_DAO_HRJobHour extends CRM_HRJob_DAO_Base//CRM_Core_DAO
{
  /**
   * static instance to hold the table name
   *
   * @var string
   * @static
   */
  static $_tableName = 'civicrm_hrjob_hour';
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
   * Unique HRJobHour ID
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
   * Full-Time, Part-Time, Casual
   *
   * @var string
   */
  public $hours_type;
  /**
   * Amount of time allocated for work (in given period)
   *
   * @var float
   */
  public $hours_amount;
  /**
   * Period during which hours are allocated (eg 5 hours per day; 5 hours per week)
   *
   * @var string
   */
  public $hours_unit;
  /**
   * Typically, employment at 40 hr/wk is 1 FTE
   *
   * @var float
   */
  public $hours_fte;
  /**
   * .
   *
   * @var int unsigned
   */
  public $fte_num;
  /**
   * .
   *
   * @var int unsigned
   */
  public $fte_denom;
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
   * @return civicrm_hrjob_hour
   */
  function __construct()
  {
    $this->__table = 'civicrm_hrjob_hour';
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
        new CRM_Core_Reference_Basic(self::getTableName() , 'contract_revision_id', 'civicrm_hrjob_contract', 'id') ,
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
              'title' => ts('Job Hours Id') ,
              'required' => true,
            ) ,
            'job_id' => array(
              'name' => 'job_id',
              'type' => CRM_Utils_Type::T_INT,
              'title' => ts('Job Id') ,
              'required' => true,
              'FKClassName' => 'CRM_HRJob_DAO_HRJob',
            ) ,
            'hrjob_hours_type' => array(
              'name' => 'hours_type',
              'type' => CRM_Utils_Type::T_STRING,
              'title' => ts('Hours Type') ,
              'maxlength' => 63,
              'size' => CRM_Utils_Type::BIG,
              'export' => true,
              'import' => true,
              'where' => 'civicrm_hrjob_hour.hours_type',
              'headerPattern' => '',
              'dataPattern' => '',
              'pseudoconstant' => array(
                'optionGroupName' => 'hrjob_hours_type',
              )
            ) ,
            'hrjob_hours_amount' => array(
              'name' => 'hours_amount',
              'type' => CRM_Utils_Type::T_FLOAT,
              'title' => ts('Actual Hours') ,
              'export' => true,
              'import' => true,
              'where' => 'civicrm_hrjob_hour.hours_amount',
              'headerPattern' => '',
              'dataPattern' => '',
            ) ,
            'hrjob_hours_unit' => array(
              'name' => 'hours_unit',
              'type' => CRM_Utils_Type::T_STRING,
              'title' => ts('Hours Unit') ,
              'export' => true,
              'maxlength' => 63,
              'size' => CRM_Utils_Type::BIG,
              'import' => true,
              'where' => 'civicrm_hrjob_hour.hours_unit',
              'headerPattern' => '',
              'dataPattern' => '',
              'pseudoconstant' => array(
                'callback' => 'CRM_HRJob_SelectValues::commonUnit',
              )
            ) ,
            'hrjob_hours_fte' => array(
              'name' => 'hours_fte',
              'type' => CRM_Utils_Type::T_FLOAT,
              'title' => ts('Full-Time Equivalence') ,
              'export' => true,
              'import' => true,
              'where' => 'civicrm_hrjob_hour.hours_fte',
              'headerPattern' => '',
              'dataPattern' => '',
            ) ,
            'hours_fte_num' => array(
              'name' => 'fte_num',
              'type' => CRM_Utils_Type::T_INT,
              'title' => ts('Full-Time Numerator Equivalence') ,
              'where' => 'civicrm_hrjob_hour.fte_num',
              'headerPattern' => '',
              'dataPattern' => '',
              'default' => '1',
            ) ,
            'hrjob_fte_denom' => array(
              'name' => 'fte_denom',
              'type' => CRM_Utils_Type::T_INT,
              'title' => ts('Full-Time Denominator Equivalence') ,
              'where' => 'civicrm_hrjob_hour.fte_denom',
              'headerPattern' => '',
              'dataPattern' => '',
              'default' => '1',
            ) ,
            /*'contract_revision_id' => array(
              'name' => 'contract_revision_id',
              'type' => CRM_Utils_Type::T_INT,
              'title' => ts('Job Contract Revision Id') ,
              'required' => true,
              'FKClassName' => 'CRM_HRJob_DAO_HRJobContractRevision',
            ) ,*/
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
      self::$_fieldKeys = array(
        'id' => 'id',
        'job_id' => 'job_id',
        'hours_type' => 'hrjob_hours_type',
        'hours_amount' => 'hrjob_hours_amount',
        'hours_unit' => 'hrjob_hours_unit',
        'hours_fte' => 'hrjob_hours_fte',
        'fte_num' => 'hours_fte_num',
        'fte_denom' => 'hrjob_fte_denom',
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
            self::$_import['hrjob_hour'] = & $fields[$name];
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
            self::$_export['hrjob_hour'] = & $fields[$name];
          } else {
            self::$_export[$name] = & $fields[$name];
          }
        }
      }
    }
    return self::$_export;
  }
}
