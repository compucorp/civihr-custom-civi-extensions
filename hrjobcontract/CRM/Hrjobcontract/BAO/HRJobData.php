<?php

class CRM_Hrjobcontract_BAO_HRJobData extends CRM_Hrjobcontract_DAO_HRJobData {

    /**
     * Create a new HRJobData based on array-data
     *
     * @param array $params key-value pairs
     * @return CRM_HRJob_DAO_HRJobData|NULL
     *
     */
    public static function create($params) {
        $hook = empty($params['id']) ? 'create' : 'edit';
        
        $instance = parent::create($params);
        //echo 'instance:';
        //var_dump($instance);
        //echo 'id:';
        //var_dump($instance->id);
        //echo 'jobcontract_id:';
        //var_dump($instance->jobcontract_id);
        
        if (is_numeric(CRM_Utils_Array::value('is_primary', $params)) || empty($params['id'])) {
            CRM_Core_BAO_Block::handlePrimary($params, get_class());
        }
        
        $currentInstanceResult = civicrm_api3('HRJobData', 'get', array(
            'sequential' => 1,
            'id' => $instance->id,
        ));
        
        //echo 'currentInstance:';
        $currentInstance = CRM_Utils_Array::first($currentInstanceResult['values']);
        //var_dump($currentInstance);
        //echo 'current instance jobcontract_revision_id:';
        //var_dump($currentInstance['jobcontract_revision_id']);
        
        $revisionResult = civicrm_api3('HRJobContractRevision', 'get', array(
            'sequential' => 1,
            'id' => $currentInstance['jobcontract_revision_id'],
        ));
        $revision = CRM_Utils_Array::first($revisionResult['values']);
        //echo '################revision:';
        //var_dump($revision);
        //echo 'reivision data_id:';
        //var_dump($revision['data_revision_id']);
        
        $duplicate = CRM_Utils_Array::value('action', $params, $hook);
        if ($hook == 'create' && empty($revision['role_revision_id']) && $duplicate != 'duplicate') {
            civicrm_api3('HRJobRole', 'create', array('jobcontract_id' => $revision['jobcontract_id'],'title' => $instance->title, 'location'=> $instance->location, 'percent_pay_role' => 100));
        }
        
        return $instance;
    }
}
