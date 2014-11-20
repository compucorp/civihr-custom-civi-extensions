<?php

/**
 * File for CiviCRM APIv3 Job Contract utilitity functions
 *
 */

function civicrm_hrjobcontract_api3_setup_revision(array &$params, $table) {
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

function civicrm_hrjobcontract_api3_create_revision() {
    
}
