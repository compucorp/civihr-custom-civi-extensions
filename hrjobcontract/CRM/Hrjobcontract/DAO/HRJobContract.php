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
 */
require_once 'CRM/Core/DAO.php';
require_once 'CRM/Utils/Type.php';
class CRM_Hrjobcontract_DAO_HRJobContract extends CRM_Core_DAO
{
  /**
   * static instance to hold the table name
   *
   * @var string
   * @static
   */
  static $_tableName = 'civicrm_hrjobcontract';
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
   * FK to Contact
   *
   * @var int unsigned
   */
  public $contact_id;

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
   * @return civicrm_hrjob_hour
   */
  function __construct()
  {
    $this->__table = 'civicrm_hrjobcontract';
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
    self::$_links = static ::createReferenceColumns(__CLASS__);
    self::$_links[] = new CRM_Core_Reference_Basic(self::getTableName() , 'contact_id', 'civicrm_contact', 'id');
    
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
          'required' => false,
          'where' => 'civicrm_hrjobcontract.id',
        ) ,
        'contact_id' => array(
          'name' => 'contact_id',
          'type' => CRM_Utils_Type::T_INT,
          'title' => ts('Contact Id') ,
          'required' => false,
          'export' => true,
          'import' => true,
          'headerPattern' => '/contact(.?id)?/i',
          'FKClassName' => 'CRM_Contact_DAO_Contact',
        ) ,
        'is_primary' => array(
          'name' => 'is_primary',
          'type' => CRM_Utils_Type::T_BOOLEAN,
          'title' => ts('Is Primary?') ,
          'export' => true,
          'import' => true,
          'where' => 'civicrm_hrjobcontract.is_primary',
          'headerPattern' => '',
          'dataPattern' => '',
        ) ,
        'deleted' => array(
          'name' => 'deleted',
          'type' => CRM_Utils_Type::T_INT,
          'title' => ts('Is deleted?') ,
          'export' => true,
          'import' => true,
          'where' => 'civicrm_hrjobcontract.deleted',
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
        'contact_id' => 'contact_id',
        'is_primary' => 'is_primary',
        'deleted' => 'deleted',
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
            self::$_import['hrjobcontract'] = & $fields[$name];
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
            self::$_export['hrjobcontract'] = & $fields[$name];
          } else {
            self::$_export[$name] = & $fields[$name];
          }
        }
      }
    }
    return self::$_export;
  }
  
  static function handlePrimary($instance, array $params) // TODO!
  {
      return null; //// TODO!
        $isPrimary = 0;
        if (is_numeric(CRM_Utils_Array::value('is_primary', $params)))
        {
            $isPrimary = (int)$params['is_primary'];
        }
        
        $revisionResult = civicrm_api3('HRJobContractRevision', 'get', array(
            'sequential' => 1,
            'id' => $instance->jobcontract_revision_id,
        ));
        $revision = CRM_Utils_Array::first($revisionResult['values']);
        if (empty($revision))
        {
            // No revision found (id = ' . $instance->jobcontract_revision_id . '), returning.
            return false;
        }
        
        $jobcontractResult = civicrm_api3('HRJobContract', 'get', array(
            'sequential' => 1,
            'id' => $revision['jobcontract_id'],
        ));
        $jobcontract = CRM_Utils_Array::first($jobcontractResult['values']);
        if (empty($jobcontract))
        {
            // No job contract found (id = ' . $revision['jobcontract_id'] . '), returning.
            return false;
        }
        
        $hrOtherPrimaryJobContracts = CRM_Core_DAO::executeQuery(
            'SELECT c.id, c.contact_id, r.status, d.id AS details_id, d.is_primary FROM civicrm_hrjobcontract_details d
            JOIN civicrm_hrjobcontract_revision r ON d.jobcontract_revision_id = r.id
            JOIN civicrm_hrjobcontract c ON r.jobcontract_id = c.id
            WHERE c.contact_id = %1 AND r.status = 1 AND d.is_primary = 1 AND c.id <> %2',
            array(
                1 => array($jobcontract['contact_id'], 'Integer'),
                2 => array($jobcontract['id'], 'Integer'),
            )
        );
        
        $primaries = array();
        while ($hrOtherPrimaryJobContracts->fetch())
        {
            $primaries[$hrOtherPrimaryJobContracts->id] = $hrOtherPrimaryJobContracts->details_id;
        }
        
        if (empty($primaries))
        {
            // There is no primary contract, setting current one to primary.
            $instance->is_primary = 1;
            $instance->save();
            return true;
        }
        
        if ($isPrimary)
        {
            // Setting other primaries to 0.
            foreach ($primaries as $key => $value)
            {
                $createParams = array(
                    'jobcontract_id' => $key,
                    'is_primary' => 0,
                );
                if (!empty($params['id']))
                {
                    $createParams['id'] = $value;
                }
                CRM_Hrjobcontract_BAO_HRJobDetails::create($createParams);
            }
        }
        
        $instance->is_primary = $isPrimary;
        $instance->save();
        
        return (bool)$isPrimary;
  }
}
