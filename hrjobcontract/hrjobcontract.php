<?php

require_once 'hrjobcontract.civix.php';

/**
 * Implementation of hook_civicrm_config
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_config
 */
function hrjobcontract_civicrm_config(&$config) {
  _hrjobcontract_civix_civicrm_config($config);
}

/**
 * Implementation of hook_civicrm_xmlMenu
 *
 * @param $files array(string)
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_xmlMenu
 */
function hrjobcontract_civicrm_xmlMenu(&$files) {
  _hrjobcontract_civix_civicrm_xmlMenu($files);
}

/**
 * Implementation of hook_civicrm_install
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_install
 */
function hrjobcontract_civicrm_install() {
  _hrjobcontract_civix_civicrm_install();
}

/**
 * Implementation of hook_civicrm_uninstall
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_uninstall
 */
function hrjobcontract_civicrm_uninstall() {
  _hrjobcontract_civix_civicrm_uninstall();
}

/**
 * Implementation of hook_civicrm_enable
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_enable
 */
function hrjobcontract_civicrm_enable() {
  _hrjobcontract_civix_civicrm_enable();
}

/**
 * Implementation of hook_civicrm_disable
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_disable
 */
function hrjobcontract_civicrm_disable() {
  _hrjobcontract_civix_civicrm_disable();
}

/**
 * Implementation of hook_civicrm_upgrade
 *
 * @param $op string, the type of operation being performed; 'check' or 'enqueue'
 * @param $queue CRM_Queue_Queue, (for 'enqueue') the modifiable list of pending up upgrade tasks
 *
 * @return mixed  based on op. for 'check', returns array(boolean) (TRUE if upgrades are pending)
 *                for 'enqueue', returns void
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_upgrade
 */
function hrjobcontract_civicrm_upgrade($op, CRM_Queue_Queue $queue = NULL) {
  return _hrjobcontract_civix_civicrm_upgrade($op, $queue);
}

/**
 * Implementation of hook_civicrm_managed
 *
 * Generate a list of entities to create/deactivate/delete when this module
 * is installed, disabled, uninstalled.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_managed
 */
function hrjobcontract_civicrm_managed(&$entities) {
  _hrjobcontract_civix_civicrm_managed($entities);
}

/**
 * Implementation of hook_civicrm_caseTypes
 *
 * Generate a list of case-types
 *
 * Note: This hook only runs in CiviCRM 4.4+.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_caseTypes
 */
function hrjobcontract_civicrm_caseTypes(&$caseTypes) {
  _hrjobcontract_civix_civicrm_caseTypes($caseTypes);
}

/**
 * Implementation of hook_civicrm_alterSettingsFolders
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_alterSettingsFolders
 */
function hrjobcontract_civicrm_alterSettingsFolders(&$metaDataFolders = NULL) {
  _hrjobcontract_civix_civicrm_alterSettingsFolders($metaDataFolders);
}

/**
 * Implementation of hook_civicrm_pageRun
 */
function hrjobcontract_civicrm_pageRun($page) {
    if ($page instanceof CRM_Contact_Page_View_Summary) {
        CRM_Core_Resources::singleton()
            ->addScriptFile('org.civicrm.hrjobcontract', 'js/hrjobcontract.js');

        CRM_Core_Resources::singleton()
            ->addStyleFile('org.civicrm.hrjobcontract', 'css/hrjobcontract.css');
    }
}


/**
 * Implementation of hook_civicrm_tabs
 */
function hrjobcontract_civicrm_tabs(&$tabs) {
    $tabs[] = Array(
        'id'        => 'hrjobcontract',
        'url'       => CRM_Utils_System::url('civicrm/contact/view/hrjobcontract'),
        'title'     => ts('Job Contract'),
        'weight'    => 1
    );

}