<?php

/**
 * HRJobContract.create API specification (optional)
 * This is used for documentation and validation.
 *
 * @param array $spec description of fields supported by this API call
 * @return void
 * @see http://wiki.civicrm.org/confluence/display/CRM/API+Architecture+Standards
 */
function _civicrm_api3_h_r_job_contract_create_spec(&$spec) {
  // $spec['some_parameter']['api.required'] = 1;
}

/**
 * HRJobContract.create API
 *
 * @param array $params
 * @return array API result descriptor
 * @throws API_Exception
 */
function civicrm_api3_h_r_job_contract_create($params) {
  return _civicrm_api3_basic_create(_civicrm_api3_get_BAO(__FUNCTION__), $params);
}

/**
 * HRJobContract.delete API
 *
 * @param array $params
 * @return array API result descriptor
 * @throws API_Exception
 */
function civicrm_api3_h_r_job_contract_delete($params) {
  return _civicrm_api3_basic_delete(_civicrm_api3_get_BAO(__FUNCTION__), $params);
}

/**
 * HRJobContract.get API
 *
 * @param array $params
 * @return array API result descriptor
 * @throws API_Exception
 */
function civicrm_api3_h_r_job_contract_get($params) {
    return _civicrm_api3_basic_get(_civicrm_api3_get_BAO(__FUNCTION__), $params);
    //civicrm_api3_create_success
    var_dump(_civicrm_api3_get_BAO(__FUNCTION__));
    $jobContractBAOName = _civicrm_api3_get_BAO(__FUNCTION__);
    $jobContractBAO = new $jobContractBAOName();
    $jobContractData = _civicrm_api3_dao_to_array($jobContractBAO, $params, FALSE);
    var_dump($jobContractData);
    
    $jobDataBAOName = _civicrm_api3_get_BAO('civicrm_api3_h_r_job_data_get');
    var_dump($jobDataBAOName);
    $jobDataBAO = new $jobDataBAOName();
    $jobDataData = _civicrm_api3_dao_to_array($jobDataBAO, $params, FALSE);
    var_dump($jobDataData);
}

/*
 * _civicrm_api3_basic_get( $className, $params, bool - success JSON / raw data JSON )
 * _civicrm_api3_get_BAO(__FUNCTION__)
 * *** _civicrm_api3_dao_to_array() *** - gets the data from DB
 */