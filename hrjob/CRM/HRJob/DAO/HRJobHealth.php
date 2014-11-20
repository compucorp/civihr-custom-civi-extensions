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
 * Generated from xml/schema/CRM/HRJob/HRJobHealth.xml
 * DO NOT EDIT.  Generated by GenCode.php
 */
require_once 'CRM/Core/DAO.php';
require_once 'CRM/Utils/Type.php';
class CRM_HRJob_DAO_HRJobHealth extends CRM_HRJob_DAO_Base
{
  /**
   * static instance to hold the table name
   *
   * @var string
   * @static
   */
  static $_tableName = 'civicrm_hrjob_health';
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
   * Unique HRJobHealth ID
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
   * FK to Contact ID for the organization or company which manages healthcare service
   *
   * @var int unsigned
   */
  public $provider;
  /**
   * .
   *
   * @var string
   */
  public $plan_type;
  /**
   *
   * @var text
   */
  public $description;
  /**
   *
   * @var text
   */
  public $dependents;
  /**
   * FK to Contact ID for the organization or company which manages life insurance service
   *
   * @var int unsigned
   */
  public $provider_life_insurance;
  /**
   * .
   *
   * @var string
   */
  public $plan_type_life_insurance;
  /**
   *
   * @var text
   */
  public $description_life_insurance;
  /**
   *
   * @var text
   */
  public $dependents_life_insurance;
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
   * @return civicrm_hrjob_health
   */
  function __construct()
  {
    $this->__table = 'civicrm_hrjob_health';
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
        new CRM_Core_Reference_Basic(self::getTableName() , 'provider', 'civicrm_contact', 'id') ,
        new CRM_Core_Reference_Basic(self::getTableName() , 'provider_life_insurance', 'civicrm_contact', 'id') ,
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
          'title' => ts('Job Health Id') ,
          'required' => true,
        ) ,
        'job_id' => array(
          'name' => 'job_id',
          'type' => CRM_Utils_Type::T_INT,
          'title' => ts('Job Id') ,
          'required' => true,
          'FKClassName' => 'CRM_HRJob_DAO_HRJob',
        ) ,
        'hrjob_health_provider' => array(
          'name' => 'provider',
          'type' => CRM_Utils_Type::T_INT,
          'title' => ts('Healthcare Provider') ,
          'export' => true,
          'import' => true,
          'where' => 'civicrm_hrjob_health.provider',
          'headerPattern' => '',
          'dataPattern' => '',
          'FKClassName' => 'CRM_Contact_DAO_Contact',
        ) ,
        'hrjob_health_plan_type' => array(
          'name' => 'plan_type',
          'type' => CRM_Utils_Type::T_STRING,
          'title' => ts('Healthcare Plan Type') ,
          'export' => true,
          'maxlength' => 63,
          'size' => CRM_Utils_Type::BIG,
          'import' => true,
          'where' => 'civicrm_hrjob_health.plan_type',
          'headerPattern' => '',
          'dataPattern' => '',
          'pseudoconstant' => array(
            'callback' => 'CRM_HRJob_SelectValues::planType',
          )
        ) ,
        'description' => array(
          'name' => 'description',
          'type' => CRM_Utils_Type::T_TEXT,
          'title' => ts('Description Health Insurance') ,
        ) ,
        'dependents' => array(
          'name' => 'dependents',
          'type' => CRM_Utils_Type::T_TEXT,
          'title' => ts('Healthcare Dependents') ,
          'export' => true,
          'import' => true,
        ) ,
        'hrjob_health_provider_life_insurance' => array(
          'name' => 'provider_life_insurance',
          'type' => CRM_Utils_Type::T_INT,
          'title' => ts('Life insurance Provider') ,
          'export' => true,
          'import' => true,
          'where' => 'civicrm_hrjob_health.provider_life_insurance',
          'headerPattern' => '',
          'dataPattern' => '',
          'FKClassName' => 'CRM_Contact_DAO_Contact',
        ) ,
        'hrjob_life_insurance_plan_type' => array(
          'name' => 'plan_type_life_insurance',
          'type' => CRM_Utils_Type::T_STRING,
          'title' => ts('Life insurance Plan Type') ,
          'export' => true,
          'maxlength' => 63,
          'size' => CRM_Utils_Type::BIG,
          'import' => true,
          'where' => 'civicrm_hrjob_health.plan_type_life_insurance',
          'headerPattern' => '',
          'dataPattern' => '',
          'pseudoconstant' => array(
            'callback' => 'CRM_HRJob_SelectValues::planTypeLifeInsurance',
          )
        ) ,
        'description_life_insurance' => array(
          'name' => 'description_life_insurance',
          'type' => CRM_Utils_Type::T_TEXT,
          'title' => ts('Description Life Insurance') ,
        ) ,
        'dependents_life_insurance' => array(
          'name' => 'dependents_life_insurance',
          'type' => CRM_Utils_Type::T_TEXT,
          'title' => ts('Life Insurance Dependents') ,
          'export' => true,
          'import' => true,
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
        'job_id' => 'job_id',
        'provider' => 'hrjob_health_provider',
        'plan_type' => 'hrjob_health_plan_type',
        'description' => 'description',
        'dependents' => 'dependents',
        'provider_life_insurance' => 'hrjob_health_provider_life_insurance',
        'plan_type_life_insurance' => 'hrjob_life_insurance_plan_type',
        'description_life_insurance' => 'description_life_insurance',
        'dependents_life_insurance' => 'dependents_life_insurance',
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
            self::$_import['hrjob_health'] = & $fields[$name];
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
            self::$_export['hrjob_health'] = & $fields[$name];
          } else {
            self::$_export[$name] = & $fields[$name];
          }
        }
      }
    }
    return self::$_export;
  }
}
