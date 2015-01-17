<?php

require_once 'jobcontract_utils.php';

/**
 * HRJobContractRevision.create API specification (optional)
 * This is used for documentation and validation.
 *
 * @param array $spec description of fields supported by this API call
 * @return void
 * @see http://wiki.civicrm.org/confluence/display/CRM/API+Architecture+Standards
 */
function _civicrm_api3_h_r_job_contract_revision_create_spec(&$spec) {
  $spec['jobcontract_id']['api.required'] = 1;
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

/**
 * HRJobContractRevision.getcurrentrevision API
 *
 * @param array $params
 * @return array API result descriptor
 * @throws API_Exception
 */
function civicrm_api3_h_r_job_contract_revision_getcurrentrevision($params) {
    if (empty($params['jobcontract_id']))
    {
        throw new API_Exception("Cannot get current revision: missing jobcontract_id value");
    }
    return _civicrm_hrjobcontract_api3_get_current_revision((int)$params['jobcontract_id']);
}

