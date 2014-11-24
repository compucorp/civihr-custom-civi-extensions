<?php

/**
 * File for CiviCRM APIv3 Job Contract utilitity functions
 *
 */

function _civicrm_hrjobcontract_api3_setup_revision(array &$params, $table) {
    if (!empty($params['job_contract_id'])) {
        $revisionId = civicrm_api3('HRJobContractRevision', 'getrevisionid', array(
          'sequential' => 1,
          'job_contract_id' => $params['job_contract_id'],
          'table' => $table,
          'options' => array('sort' => "id DESC", 'limit' => 1),
        ));
        if ($revisionId) {
            $params['contract_revision_id'] = $revisionId['values'];
        }
    }
}

function _civicrm_hrjobcontract_api3_create_revision($jobContractId) {
    $currentRevision = civicrm_api3_h_r_job_contract_revision_getcurrentrevision(
       array('job_contract_id' => (int)$jobContractId, 'sequential' => 1, 'prettyprint' => 1, 'check_permissions' => true, 'version' => 3)
    );
    var_dump($currentRevision);
    unset($currentRevision['values']['id']);
    $result = civicrm_api3('HRJobContractRevision', 'create', $currentRevision['values']);
    var_dump($result);
}
