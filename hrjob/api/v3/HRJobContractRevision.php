<?php

/**
 * HRJobContractRevision.create API specification (optional)
 * This is used for documentation and validation.
 *
 * @param array $spec description of fields supported by this API call
 * @return void
 * @see http://wiki.civicrm.org/confluence/display/CRM/API+Architecture+Standards
 */
function _civicrm_api3_h_r_job_contract_revision_create_spec(&$spec) {
  // $spec['some_parameter']['api.required'] = 1;
}

/**
 * HRJobContractRevision.create API
 *
 * @param array $params
 * @return array API result descriptor
 * @throws API_Exception
 */
function civicrm_api3_h_r_job_contract_revision_create($params) {
  return _civicrm_api3_basic_create(_civicrm_api3_get_BAO(__FUNCTION__), $params);
}

/**
 * HRJobContractRevision.delete API
 *
 * @param array $params
 * @return array API result descriptor
 * @throws API_Exception
 */
function civicrm_api3_h_r_job_contract_revision_delete($params) {
  return _civicrm_api3_basic_delete(_civicrm_api3_get_BAO(__FUNCTION__), $params);
}

/**
 * HRJobContractRevision.get API
 *
 * @param array $params
 * @return array API result descriptor
 * @throws API_Exception
 */
function civicrm_api3_h_r_job_contract_revision_get($params) {
  return _civicrm_api3_basic_get(_civicrm_api3_get_BAO(__FUNCTION__), $params);
}

function civicrm_api3_h_r_job_contract_revision_getrevisionid($params) {
    $jobContractId = !empty($params['job_contract_id']) ? $params['job_contract_id'] : null;
    if ($jobContractId) {
        $revision = civicrm_api3('HRJobContractRevision', 'get', array(
          'sequential' => 1,
          'job_contract_id' => $jobContractId,
          'options' => array('sort' => "id DESC", 'limit' => 1),
        ));
        
        if (!empty($revision['values'])) {
            $row = array_shift($revision['values']);
            if (!empty($row[$params['table'] . '_revision_id'])) {
                return civicrm_api3_create_success((int)$row[$params['table'] . '_revision_id']);
            }
        }
    }
    return null;
}
