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