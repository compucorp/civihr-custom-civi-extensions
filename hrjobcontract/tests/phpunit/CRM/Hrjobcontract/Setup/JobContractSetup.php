<?php

require_once 'CiviTest/CiviUnitTestCase.php';

class Setup_JobContractSetup extends CiviUnitTestCase {
    public function setUp() {
        parent::setUp();
        
        $this->_createDBData();
    }
    
    /**
     * Create basic DB data such as civicrm settings and options.
     */
    protected function _createDBData() {
        
        // Creating civicrm settings:
        CRM_Core_DAO::executeQuery(
            "INSERT IGNORE INTO `civicrm_setting` (`group_name`, `name`, `value`, `domain_id`, `contact_id`, `is_domain`, `component_id`, `created_date`, `created_id`) VALUES
            ('hrjob', 'work_days_per_month', 'i:22;', 1, NULL, 1, NULL, '2014-12-01 03:01:02', NULL),
            ('hrjob', 'work_days_per_week', 'i:5;', 1, NULL, 1, NULL, '2014-12-01 03:01:02', NULL),
            ('hrjob', 'work_hour_per_day', 'i:8;', 1, NULL, 1, NULL, '2014-12-01 03:01:02', NULL),
            ('hrjob', 'work_months_per_year', 'i:12;', 1, NULL, 1, NULL, '2014-12-01 03:01:02', NULL),
            ('hrjob', 'work_weeks_per_year', 'i:50;', 1, NULL, 1, NULL, '2014-12-01 03:01:02', NULL)"
        );

        //Creating civicrm options:
        CRM_Core_DAO::executeQuery(
            "INSERT IGNORE INTO `civicrm_option_group` (`id`, `name`, `title`, `description`, `is_reserved`, `is_active`, `is_locked`) VALUES
            (100, 'hrjob_contract_type', 'Contract Type', NULL, 1, 1, NULL),
            (101, 'hrjob_level_type', 'Level', NULL, 1, 1, NULL),
            (102, 'hrjob_department', 'Department', NULL, 1, 1, NULL),
            (103, 'hrjob_hours_type', 'Hours Type', NULL, 1, 1, NULL),
            (104, 'hrjob_pay_scale', 'Pay Scale', NULL, 1, 1, NULL),
            (105, 'hrjob_pay_grade', 'Pay Grade', NULL, 1, 1, NULL),
            (106, 'hrjob_health_provider', 'Healthcare Provider', NULL, 1, 1, NULL),
            (107, 'hrjob_life_provider', 'Life Provider', NULL, 1, 1, NULL),
            (108, 'hrjob_location', 'Work Location', NULL, 1, 1, NULL),
            (109, 'hrjob_pension_type', 'Pension Type', NULL, 1, 1, NULL),
            (110, 'hrjob_region', 'Region', NULL, 1, 1, NULL)"
        );
        CRM_CORE_DAO::executeQuery(
            "INSERT IGNORE INTO `civicrm_option_value` (`id`, `option_group_id`, `label`, `value`, `name`, `grouping`, `filter`, `is_default`, `weight`, `description`, `is_optgroup`, `is_reserved`, `is_active`, `component_id`, `domain_id`, `visibility_id`) VALUES
            (821, 100, 'Employee - Temporary', 'Employee - Temporary', 'Employee_Temporary', NULL, NULL, 0, 3, NULL, 0, 0, 0, NULL, NULL, NULL),
            (822, 100, 'Employee - Permanent', 'Employee - Permanent', 'Employee_Permanent', NULL, NULL, 0, 4, NULL, 0, 0, 0, NULL, NULL, NULL),
            (823, 100, 'Contractor', 'Contractor', 'Contractor', NULL, NULL, 0, 2, NULL, 0, 0, 0, NULL, NULL, NULL),
            (824, 100, 'Volunteer', 'Volunteer', 'Volunteer', NULL, NULL, 0, 7, NULL, 0, 0, 0, NULL, NULL, NULL),
            (825, 100, 'Trustee', 'Trustee', 'Trustee', NULL, NULL, 0, 6, NULL, 0, 0, 0, NULL, NULL, NULL),
            (826, 100, 'Intern', 'Intern', 'Intern', NULL, NULL, 0, 5, NULL, 0, 0, 0, NULL, NULL, NULL),
            (827, 100, 'Apprentice', 'Apprentice', 'Apprentice', NULL, NULL, 0, 1, NULL, 0, 0, 0, NULL, NULL, NULL),
            (828, 101, 'Senior Manager', 'Senior Manager', 'Senior_Manager', NULL, NULL, 0, 1, NULL, 0, 0, 0, NULL, NULL, NULL),
            (829, 101, 'Junior Manager', 'Junior Manager', 'Junior_Manager', NULL, NULL, 0, 2, NULL, 0, 0, 0, NULL, NULL, NULL),
            (830, 101, 'Senior Staff', 'Senior Staff', 'Senior_Staff', NULL, NULL, 0, 3, NULL, 0, 0, 0, NULL, NULL, NULL),
            (831, 101, 'Junior Staff', 'Junior Staff', 'Junior_Staff', NULL, NULL, 0, 4, NULL, 0, 0, 0, NULL, NULL, NULL),
            (844, 102, 'Finance', 'Finance', 'Finance', NULL, NULL, 0, 1, NULL, 0, 0, 0, NULL, NULL, NULL),
            (845, 102, 'HR', 'HR', 'HR', NULL, NULL, 0, 2, NULL, 0, 0, 0, NULL, NULL, NULL),
            (846, 102, 'IT', 'IT', 'IT', NULL, NULL, 0, 3, NULL, 0, 0, 0, NULL, NULL, NULL),
            (847, 102, 'Fundraising', 'Fundraising', 'Fundraising', NULL, NULL, 0, 4, NULL, 0, 0, 0, NULL, NULL, NULL),
            (848, 102, 'Marketing', 'Marketing', 'Marketing', NULL, NULL, 0, 5, NULL, 0, 0, 0, NULL, NULL, NULL),
            (832, 103, 'Full Time', '8', 'Full_Time', NULL, NULL, 0, 1, NULL, 0, 0, 0, NULL, NULL, NULL),
            (833, 103, 'Part Time', '4', 'Part_Time', NULL, NULL, 0, 2, NULL, 0, 0, 0, NULL, NULL, NULL),
            (834, 103, 'Casual', '0', 'Casual', NULL, NULL, 0, 3, NULL, 0, 0, 0, NULL, NULL, NULL),
            (835, 104, 'NJC pay scale', 'NJC pay scale', 'NJC pay scale', NULL, NULL, 1, 1, NULL, 0, 0, 0, NULL, NULL, NULL),
            (836, 104, 'JNC pay scale', 'JNC pay scale', 'JNC pay scale', NULL, NULL, 0, 2, NULL, 0, 0, 0, NULL, NULL, NULL),
            (837, 104, 'Soulbury Pay Agreement', 'Soulbury Pay Agreement', 'Soulbury Pay Agreement', NULL, NULL, 0, 3, NULL, 0, 0, 0, NULL, NULL, NULL),
            (838, 105, 'Unpaid', '0', 'Unpaid', NULL, NULL, 0, 1, NULL, 0, 0, 0, NULL, NULL, NULL),
            (839, 105, 'Paid', '1', 'Paid', NULL, NULL, 0, 2, NULL, 0, 0, 0, NULL, NULL, NULL),
            (840, 106, 'Unknown', 'Unknown', 'Unknown', NULL, NULL, 0, 1, NULL, 0, 0, 0, NULL, NULL, NULL),
            (841, 107, 'Unknown', 'Unknown', 'Unknown', NULL, NULL, 0, 1, NULL, 0, 0, 0, NULL, NULL, NULL),
            (842, 108, 'Headquarters', 'Headquarters', 'Headquarters', NULL, NULL, 1, 1, NULL, 0, 0, 0, NULL, NULL, NULL),
            (843, 108, 'Home or Home-Office', 'Home', 'Home', NULL, NULL, 0, 1, NULL, 0, 0, 0, NULL, NULL, NULL),
            (849, 109, 'Employer Pension', 'Employer Pension', 'Employer Pension ', NULL, NULL, 1, 1, NULL, 0, 0, 0, NULL, NULL, NULL),
            (850, 109, 'Personal Pension', 'Personal Pension', 'Personal Pension', NULL, NULL, 0, 2, NULL, 0, 0, 0, NULL, NULL, NULL)"
        );

        // Creating test user:
        CRM_Core_DAO::executeQuery(
            "INSERT IGNORE INTO `civicrm_contact` (`id`, `contact_type`, `contact_sub_type`, `do_not_email`, `do_not_phone`, `do_not_mail`, `do_not_sms`, `do_not_trade`, `is_opt_out`, `legal_identifier`, `external_identifier`, `sort_name`, `display_name`, `nick_name`, `legal_name`, `image_URL`, `preferred_communication_method`, `preferred_language`, `preferred_mail_format`, `hash`, `api_key`, `source`, `first_name`, `middle_name`, `last_name`, `prefix_id`, `suffix_id`, `formal_title`, `communication_style_id`, `email_greeting_id`, `email_greeting_custom`, `email_greeting_display`, `postal_greeting_id`, `postal_greeting_custom`, `postal_greeting_display`, `addressee_id`, `addressee_custom`, `addressee_display`, `job_title`, `gender_id`, `birth_date`, `is_deceased`, `deceased_date`, `household_name`, `primary_contact_id`, `organization_name`, `sic_code`, `user_unique_id`, `employer_id`, `is_deleted`, `created_date`, `modified_date`) VALUES
            (229, 'Individual', NULL, 0, 0, 0, 0, 0, 0, NULL, NULL, 'Anderson, Amy', 'Amy Anderson', NULL, NULL, NULL, NULL, NULL, 'Both', NULL, NULL, NULL, 'Amy', 'X', 'Anderson', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2014-12-01 14:01:28', '2014-12-01 14:01:28')"
        );
        // Creating test provider:
        CRM_Core_DAO::executeQuery(
            "INSERT IGNORE INTO `civicrm_contact` (`id`, `contact_type`, `contact_sub_type`, `do_not_email`, `do_not_phone`, `do_not_mail`, `do_not_sms`, `do_not_trade`, `is_opt_out`, `legal_identifier`, `external_identifier`, `sort_name`, `display_name`, `nick_name`, `legal_name`, `image_URL`, `preferred_communication_method`, `preferred_language`, `preferred_mail_format`, `hash`, `api_key`, `source`, `first_name`, `middle_name`, `last_name`, `prefix_id`, `suffix_id`, `formal_title`, `communication_style_id`, `email_greeting_id`, `email_greeting_custom`, `email_greeting_display`, `postal_greeting_id`, `postal_greeting_custom`, `postal_greeting_display`, `addressee_id`, `addressee_custom`, `addressee_display`, `job_title`, `gender_id`, `birth_date`, `is_deceased`, `deceased_date`, `household_name`, `primary_contact_id`, `organization_name`, `sic_code`, `user_unique_id`, `employer_id`, `is_deleted`, `created_date`, `modified_date`) VALUES
            (158, 'Individual', NULL, 0, 0, 0, 0, 1, 0, NULL, NULL, 'Adams, Angelika', 'Dr. Angelika Adams', NULL, NULL, NULL, NULL, NULL, 'Both', '347992528', NULL, 'Sample Data', 'Angelika', 'O', 'Adams', 4, NULL, NULL, NULL, 1, NULL, 'Dear Angelika', 1, NULL, 'Dear Angelika', 1, NULL, 'Dr. Angelika Adams', NULL, 1, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, '2014-10-07 23:28:02')"
        );
        // Creating test provider_life_insurance:
        CRM_Core_DAO::executeQuery(
            "INSERT IGNORE INTO `civicrm_contact` (`id`, `contact_type`, `contact_sub_type`, `do_not_email`, `do_not_phone`, `do_not_mail`, `do_not_sms`, `do_not_trade`, `is_opt_out`, `legal_identifier`, `external_identifier`, `sort_name`, `display_name`, `nick_name`, `legal_name`, `image_URL`, `preferred_communication_method`, `preferred_language`, `preferred_mail_format`, `hash`, `api_key`, `source`, `first_name`, `middle_name`, `last_name`, `prefix_id`, `suffix_id`, `formal_title`, `communication_style_id`, `email_greeting_id`, `email_greeting_custom`, `email_greeting_display`, `postal_greeting_id`, `postal_greeting_custom`, `postal_greeting_display`, `addressee_id`, `addressee_custom`, `addressee_display`, `job_title`, `gender_id`, `birth_date`, `is_deceased`, `deceased_date`, `household_name`, `primary_contact_id`, `organization_name`, `sic_code`, `user_unique_id`, `employer_id`, `is_deleted`, `created_date`, `modified_date`) VALUES
            (284, 'Individual', NULL, 0, 0, 0, 0, 0, 0, NULL, NULL, 'Anderson, Cristina', 'Cristina Anderson', NULL, NULL, NULL, NULL, NULL, 'Both', NULL, NULL, NULL, 'Cristina', '', 'Anderson', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2014-12-01 14:02:19', '2014-12-01 14:02:19')"
        );
        
    }
}