<?php

/**
 * File for CiviCRM APIv3 Job Contract utilitity functions
 *
 */

/**
 * Returns entity name by given BAO / DAO class name.
 * 
 * @param String $baoName
 * @return String
 */
function _civicrm_get_entity_name($baoName)
{
    $parts = explode('_', $baoName);
    return end($parts);
}

function _civicrm_get_table_name($className)
{
    preg_match_all('/((?:^|[A-Z])[a-z]+)/', $className, $matches);
    if (!empty($matches[0]))
    {
        return strtolower(end($matches[0]));
    }
    return null;
}

/**
 * Sets $params array to point at valid revision of given $params['jobcontract_id']
 * Job Contract.
 * 
 * @param array $params
 * @param String $table
 */
function _civicrm_hrjobcontract_api3_set_current_revision(array &$params, $table)
{
    if (!empty($params['jobcontract_id'])) {
        $revisionId = _civicrm_hrjobcontract_api3_get_current_revision_id($params['jobcontract_id'], $table);
        if ($revisionId) {
            $params['jobcontract_revision_id'] = $revisionId['values'];
        }
    }
}

/**
 * Creates new revision for given Job Contract Id.
 * If there is no previous revision the function creates new blank revision.
 * Otherwise the function creates new revision with previous entity values.
 * 
 * @param int $jobContractId
 */
function _civicrm_hrjobcontract_api3_create_revision($jobContractId)
{
    // Setting status of current revision:
    $pastRevisions = civicrm_api3('HRJobContractRevision', 'get', array(
      'sequential' => 1,
      'jobcontract_id' => $jobContractId,
      'status' => 1,
    ));
    foreach ($pastRevisions['values'] as $pastRevision)
    {
        civicrm_api3('HRJobContractRevision', 'create', array(
            'id' => $pastRevision['id'],
            'status' => 0,
        ));
    }
    
    $currentRevision = _civicrm_hrjobcontract_api3_get_current_revision((int)$jobContractId);
    if (empty($currentRevision))
    {
        $currentRevision = array('values' => array('jobcontract_id' => $jobContractId));
    }
    else
    {
        unset($currentRevision['values']['id']);
    }
    $currentRevision['values']['status'] = 1;
    $result = civicrm_api3('HRJobContractRevision', 'create', $currentRevision['values']);
    
    return $result;
}

function _civicrm_hrjobcontract_api3_get_current_revision($jobContractId)
{
    if ($jobContractId)
    {
        $revision = civicrm_api3('HRJobContractRevision', 'get', array(
          'sequential' => 1,
          'jobcontract_id' => $jobContractId,
          'options' => array('sort' => 'id DESC', 'limit' => 1),
        ));

        if (!empty($revision)) {
            $row = array_shift($revision['values']);
            if (!empty($row)) {
                return civicrm_api3_create_success($row);
            }
        }
    }
    return null;
}

function _civicrm_hrjobcontract_api3_get_current_revision_id($jobContractId, $table)
{
    $revision = _civicrm_hrjobcontract_api3_get_current_revision((int)$jobContractId);
    if (!empty($revision['values'][$table . '_revision_id'])) {
        return civicrm_api3_create_success((int)$revision['values'][$table . '_revision_id']);
    }
    return null;
}

/**
 * HRJobContract implementation of the "replace" action.
 *
 * Replace the old set of entities (matching some given keys) with a new set of
 * entities (matching the same keys).
 *
 * Note: This will verify that 'values' is present, but it does not directly verify
 * any other parameters.
 *
 * @param string $entity entity name
 * @param array $params params from civicrm_api, including:
 *   - 'values': an array of records to save
 *   - all other items: keys which identify new/pre-existing records
 * @return array|int
 */
function _civicrm_hrjobcontract_api3_replace($entity, $params) {

  $transaction = new CRM_Core_Transaction();
  try {
    if (!is_array($params['values'])) {
      throw new Exception("Mandatory key(s) missing from params array: values");
    }

    // Extract the keys -- somewhat scary, don't think too hard about it
    $baseParams = _civicrm_api3_generic_replace_base_params($params);

    // Lookup pre-existing records
    $preexisting = civicrm_api($entity, 'get', $baseParams, $params);
    if (civicrm_error($preexisting)) {
      $transaction->rollback();
      return $preexisting;
    }

    // Save the new/updated records
    $jobcontractRevisionId = null;
    $creates = array();
    foreach ($params['values'] as $replacement) {
      if (empty($replacement['id']))
      {
        $replacement['jobcontract_revision_id'] = $jobcontractRevisionId;
      }
      // Sugar: Don't force clients to duplicate the 'key' data
      $replacement = array_merge($baseParams, $replacement);
      //$action      = (isset($replacement['id']) || isset($replacement[$entity . '_id'])) ? 'update' : 'create';
      $action = 'create';
      $create      = civicrm_api($entity, $action, $replacement);
      if (civicrm_error($create)) {
        $transaction->rollback();
        return $create;
      }
      foreach ($create['values'] as $entity_id => $entity_value) {
        $creates[$entity_id] = $entity_value;
      }
      $entityData = CRM_Utils_Array::first($create['values']);
      $jobcontractRevisionId = $entityData['jobcontract_revision_id'];
    }

    // Remove stale records
    $staleIDs = array_diff(
      array_keys($preexisting['values']),
      array_keys($creates)
    );
    foreach ($staleIDs as $staleID) {
      $delete = civicrm_api($entity, 'delete', array(
          'version' => $params['version'],
          'id' => $staleID,
        ));
      if (civicrm_error($delete)) {
        $transaction->rollback();
        return $delete;
      }
    }

    return civicrm_api3_create_success($creates, $params);
  }
  catch(PEAR_Exception $e) {
    $transaction->rollback();
    return civicrm_api3_create_error($e->getMessage());
  }
  catch(Exception $e) {
    $transaction->rollback();
    return civicrm_api3_create_error($e->getMessage());
  }
}