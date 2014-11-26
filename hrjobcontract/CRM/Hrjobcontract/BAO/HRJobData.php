<?php

class CRM_Hrjobcontract_BAO_HRJobData extends CRM_Hrjobcontract_DAO_HRJobData {

  /**
   * Create a new HRJobData based on array-data
   *
   * @param array $params key-value pairs
   * @return CRM_HRJob_DAO_HRJobData|NULL
   *
  public static function create($params) {
    $className = 'CRM_HRJob_DAO_HRJobData';
    $entityName = 'HRJobData';
    $hook = empty($params['id']) ? 'create' : 'edit';

    CRM_Utils_Hook::pre($hook, $entityName, CRM_Utils_Array::value('id', $params), $params);
    $instance = new $className();
    $instance->copyValues($params);
    $instance->save();
    CRM_Utils_Hook::post($hook, $entityName, $instance->id, $instance);

    return $instance;
  } */
}
