DROP TABLE IF EXISTS `civicrm_hrjobroles`;

-- /*******************************************************
-- *
-- * civicrm_hrjobroles
-- *
-- * HR Job Roles
-- *
-- *******************************************************/
CREATE TABLE `civicrm_hrjobroles` (


  `id` int unsigned NOT NULL AUTO_INCREMENT  COMMENT 'Unique HrJobRoles ID',
  `job_contract_id` int unsigned NOT NULL   COMMENT 'FK to Contract',
  `title` varchar(255)   DEFAULT NULL COMMENT 'Title or Project name for the Job Role.',
  `description` text    COMMENT 'Negotiated name for the role',
  `hours` double   DEFAULT 0 COMMENT 'Amount of time allocated for work (in a given week)',
  `role_hours_unit` varchar(63)    COMMENT 'Period during which hours are allocated (eg 5 hours per day; 5 hours per week)',
  `region` varchar(127)    ,
  `department` varchar(127)    ,
  `level_type` varchar(63)    COMMENT 'Junior manager, senior manager, etc.',
  `manager_contact_id` int unsigned    COMMENT 'FK to Contact ID',
  `functional_area` varchar(127)    ,
  `organization` varchar(127)    ,
  `cost_center` varchar(255)    COMMENT 'Cost Center option group value',
  `cost_center_val_type` varchar(127)    COMMENT 'Cost Center value type (fixed or %)',
  `percent_pay_cost_center` varchar(127)   DEFAULT 0 COMMENT 'Percentage of Pay Assigned to this cost center',
  `amount_pay_cost_center` varchar(127)   DEFAULT 0 COMMENT 'Amount of Pay Assigned to this cost center',
  `funder` int unsigned    COMMENT 'FK to Contact ID',
  `funder_val_type` varchar(127)    COMMENT 'Funder value type (fixed or %)',
  `percent_pay_funder` varchar(127)   DEFAULT 0 COMMENT 'Percentage of Pay Assigned to this funder',
  `amount_pay_funder` varchar(127)   DEFAULT 0 COMMENT 'Amount of Pay Assigned to this funder',
  `location` varchar(127)    COMMENT 'Main work location'
  ,
  PRIMARY KEY ( `id` )

  ,     INDEX `index_region`(
  region
)
  ,     INDEX `index_department`(
  department
)
  ,     INDEX `index_level_type`(
  level_type
)
  ,     INDEX `index_functional_area`(
  functional_area
)
  ,     INDEX `index_organization`(
  organization
)
  ,     INDEX `index_cost_center`(
  cost_center
)
  ,     INDEX `index_cost_center_val_type`(
  cost_center_val_type
)
  ,     INDEX `index_funder_val_type`(
  funder_val_type
)
  ,     INDEX `index_location`(
  location
)

  ,           CONSTRAINT FK_civicrm_hrjobroles_manager_contact_id FOREIGN KEY (`manager_contact_id`) REFERENCES `civicrm_contact`(`id`) ON DELETE SET NULL,
              CONSTRAINT FK_civicrm_hrjobroles_funder FOREIGN KEY (`funder`) REFERENCES `civicrm_contact`(`id`) ON DELETE SET NULL,
              CONSTRAINT FK_civicrm_hrjobroles_job_contract_id FOREIGN KEY (`job_contract_id`) REFERENCES `civicrm_hrjobcontract`(`id`)  ON DELETE CASCADE
)  ENGINE=InnoDB DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;