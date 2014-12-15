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
 * Generated from xml/schema/CRM/HRJob/HRJobLeave.xml
 * DO NOT EDIT.  Generated by GenCode.php
 */
require_once 'CRM/Core/DAO.php';
require_once 'CRM/Utils/Type.php';
require_once 'api/v3/jobcontract_utils.php';
class CRM_Hrjobcontract_DAO_Base extends CRM_Core_DAO
{
  /**
   * static instance to hold the table name
   *
   * @var string
   * @static
   */
  static $_tableName = '';
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
   * Contract revision id
   * 
   * @var int
   */
  public $jobcontract_revision_id;
  /**
   * class constructor
   *
   * @access public
   * @return civicrm_hrjob_leave
   */
  function __construct()
  {
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
      self::$_fields = array(
        'jobcontract_revision_id' => array(
          'name' => 'jobcontract_revision_id',
          'type' => CRM_Utils_Type::T_INT,
          'title' => ts('Job Contract Revision Id') ,
          'required' => true,
          //'FKClassName' => 'CRM_Hrjobcontract_DAO_HRJobContractRevision',
        ) ,
      );
    }
    return self::$_fields;
  }
  
  static function setFields(array $fields)
  {
      self::$_fields = array_merge($fields, self::fields());
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
        'jobcontract_revision_id' => 'jobcontract_revision_id',
      );
    }
    return self::$_fieldKeys;
  }
  
  static function setFieldKeys(array $fieldKeys)
  {
      self::$_fieldKeys = array_merge($fieldKeys, self::fieldKeys());
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
            self::$_import[self::getTableName()] = & $fields[$name];
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
            self::$_export[self::getTableName()] = & $fields[$name];
          } else {
            self::$_export[$name] = & $fields[$name];
          }
        }
      }
    }
    return self::$_export;
  }
  
  public static function create($params)
  {
    $className = get_called_class();
    $entityName = _civicrm_get_entity_name($className);
    $tableName = _civicrm_get_table_name($className);
    $hook = empty($params['id']) ? 'create' : 'edit';
    $entitiesToCopy = array();
    
    if ($hook === 'create')
    {
        if (empty($params['jobcontract_id']) && empty($params['jobcontract_revision_id']))
        {
            throw new API_Exception("Cannot create entity: please specify jobcontract_id or id value");
        }
        
        if (empty($params['jobcontract_revision_id']))
        {
            $jobContractId = (int)$params['jobcontract_id'];
            
            // Handling entity with multiple values (such as HRJobRole):
            if (!empty($params['multiple_id']))
            {
                $multipleId = (int)$params['multiple_id'];
                // getting current revision:
                /*$revision = _civicrm_hrjobcontract_api3_get_current_revision($params['jobcontract_id']);
                if (!empty($revision['values'])) {
                    $currentEntityRevisionId = $revision['values'][$tableName . '_revision_id'];
                }
                
                // getting all current entities:
                $entities = civicrm_api3($entityName, 'get', array(
                    'sequential' => 1,
                    'jobcontract_revision_id' => $currentEntityRevisionId,
                ));*/
                
                $entities = civicrm_api3($entityName, 'get', array(
                    'sequential' => 1,
                    'jobcontract_id' => $jobContractId,
                ));
                
                if (!empty($entities['values']))
                {
                    // Copying all the values of current entity revision:
                    foreach ($entities['values'] as $entity) {
                        if ((int)$entity['id'] !== $multipleId) {
                            unset($entity['id']);
                            $instance = new $className();
                            $instance->copyValues($entity);
                            $entitiesToCopy[] = $instance;
                        }
                    }
                }
            }
            
            // Creating new revision:
            $newRevision = _civicrm_hrjobcontract_api3_create_revision($jobContractId);
            $params['jobcontract_revision_id'] = $newRevision['id'];
            
            // Updating currently saved revision with its 'id' as {table}_revision_id:
            $updatedRevision = civicrm_api3('HRJobContractRevision', 'create', array(
                'sequential' => 1,
                'id' => $newRevision['id'],
                $tableName . '_revision_id' => $newRevision['id'],
            ));
        }
        
        // Copying all the values (if any) of previous entity revision:
        foreach ($entitiesToCopy as $entityToCopy)
        {
            $entityToCopy->jobcontract_revision_id = $params['jobcontract_revision_id'];
            $entityToCopy->save();
        }
    }
    
    CRM_Utils_Hook::pre($hook, $entityName, CRM_Utils_Array::value('id', $params), $params);
    $instance = new $className();
    $instance->copyValues($params);
    $instance->save();
    CRM_Utils_Hook::post($hook, $entityName, $instance->id, $instance);
    
    return $instance;
  }
}
