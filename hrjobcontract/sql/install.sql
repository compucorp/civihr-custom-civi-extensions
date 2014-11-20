# CiviHR Job Contract Revision - MySQL Installation Script

# Creating new tables:

# --- civicrm_hrjob_contract ---

CREATE TABLE IF NOT EXISTS `civicrm_hrjob_contract` (
`id` int(10) unsigned NOT NULL COMMENT 'Unique HRJobContract ID',
  `contact_id` int(10) unsigned DEFAULT NULL COMMENT 'FK to Contact ID'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

ALTER TABLE `civicrm_hrjob_contract`
 ADD PRIMARY KEY (`id`);

ALTER TABLE `civicrm_hrjob_contract`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Unique HRJobContract ID',AUTO_INCREMENT=1;

ALTER TABLE `civicrm_hrjob_contract` 
ADD INDEX `FK_civicrm_hrjob_contract_contact_id` (`contact_id` ASC);
ALTER TABLE `civicrm_hrjob_contract` 
ADD CONSTRAINT `FK_civicrm_hrjob_contract_contact_id`
  FOREIGN KEY (`contact_id`)
  REFERENCES `civicrm_contact` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

# --- civicrm_hrjob_contract_revision ---

CREATE TABLE IF NOT EXISTS `civicrm_hrjob_contract_revision` (
`id` int(10) unsigned NOT NULL,
  `job_contract_id` int(10) unsigned NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `data_revision_id` int(10) unsigned DEFAULT NULL,
  `health_revision_id` int(10) unsigned DEFAULT NULL,
  `hour_revision_id` int(10) unsigned DEFAULT NULL,
  `leave_revision_id` int(10) unsigned DEFAULT NULL,
  `pay_revision_id` int(10) unsigned DEFAULT NULL,
  `pension_revision_id` int(10) unsigned DEFAULT NULL,
  `role_revision_id` int(10) unsigned DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `civicrm_hrjob_contract_revision`
 ADD PRIMARY KEY (`id`), ADD KEY `index_job_contract_id` (`job_contract_id`), ADD KEY `index_data_revision_id` (`data_revision_id`), ADD KEY `index_health_revision_id` (`health_revision_id`), ADD KEY `index_hour_revision_id` (`hour_revision_id`), ADD KEY `index_leave_revision_id` (`leave_revision_id`), ADD KEY `index_pay_revision_id` (`pay_revision_id`), ADD KEY `index_pension_revision_id` (`pension_revision_id`), ADD KEY `index_role_revision_id` (`role_revision_id`);

ALTER TABLE `civicrm_hrjob_contract_revision`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;

ALTER TABLE `civicrm_hrjob_contract_revision`
ADD CONSTRAINT `FK_civicrm_hrjob_revision_job_contract_id` FOREIGN KEY (`job_contract_id`) REFERENCES `civicrm_hrjob_contract` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;


# --- civicrm_hrjob_data ---

CREATE TABLE IF NOT EXISTS `civicrm_hrjob_data` (
`id` int(10) unsigned NOT NULL,
  `position` varchar(127) DEFAULT NULL,
  `title` varchar(127) DEFAULT NULL,
  `funding_notes` text,
  `contract_type` varchar(63) DEFAULT NULL,
  `period_type` varchar(63) DEFAULT NULL,
  `period_start_date` date DEFAULT NULL,
  `period_end_date` date DEFAULT NULL,
  `notice_amount` double DEFAULT '0',
  `notice_unit` varchar(63) DEFAULT NULL,
  `notive_amount_employee` double DEFAULT '0',
  `notice_unit_employee` varchar(63) DEFAULT NULL,
  `location` varchar(127) DEFAULT NULL,
  `is_primary` tinyint(4) DEFAULT '0',
  `contract_revision_id` int(10) unsigned DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `civicrm_hrjob_data`
 ADD PRIMARY KEY (`id`), ADD KEY `index_position` (`position`), ADD KEY `index_title` (`title`), ADD KEY `index_contract_typ` (`contract_type`), ADD KEY `index_period_type` (`period_type`), ADD KEY `index_location` (`location`), ADD KEY `index_is_primary` (`is_primary`), ADD KEY `index_contract_revision_id` (`contract_revision_id`);

ALTER TABLE `civicrm_hrjob_data`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;

ALTER TABLE `civicrm_hrjob_data`
ADD CONSTRAINT `FK_civicrm_hrjob_data_contract_revision_id` FOREIGN KEY (`contract_revision_id`) REFERENCES `civicrm_hrjob_contract_revision` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;



# Alter existing tables:

ALTER TABLE `civicrm_hrjob_health`
ADD COLUMN `contract_revision_id` INT(10) UNSIGNED NULL AFTER `dependents_life_insurance`,
ADD INDEX `index_contract_revision_id` (`contract_revision_id` ASC);
ALTER TABLE `civicrm_hrjob_health`
ADD CONSTRAINT `FK_civicrm_hrjob_health_contract_revision_id`
  FOREIGN KEY (`contract_revision_id`)
  REFERENCES `civicrm_hrjob_contract_revision` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `civicrm_hrjob_hour`
ADD COLUMN `contract_revision_id` INT(10) UNSIGNED NULL AFTER `fte_denom`,
ADD INDEX `index_contract_revision_id` (`contract_revision_id` ASC);
ALTER TABLE `civicrm_hrjob_hour`
ADD CONSTRAINT `FK_civicrm_hrjob_hour_contract_revision_id`
  FOREIGN KEY (`contract_revision_id`)
  REFERENCES `civicrm_hrjob_contract_revision` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `civicrm_hrjob_pay`
ADD COLUMN `contract_revision_id` INT(10) UNSIGNED NULL AFTER `pay_is_auto_est`,
ADD INDEX `index_contract_revision_id` (`contract_revision_id` ASC);
ALTER TABLE `civicrm_hrjob_pay`
ADD CONSTRAINT `FK_civicrm_hrjob_pay_contract_revision_id`
  FOREIGN KEY (`contract_revision_id`)
  REFERENCES `civicrm_hrjob_contract_revision` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `civicrm_hrjob_pension`
ADD COLUMN `contract_revision_id` INT(10) UNSIGNED NULL AFTER `ee_evidence_note`,
ADD INDEX `index_contract_revision_id` (`contract_revision_id` ASC);
ALTER TABLE `civicrm_hrjob_pension`
ADD CONSTRAINT `FK_civicrm_hrjob_pension_contract_revision_id`
  FOREIGN KEY (`contract_revision_id`)
  REFERENCES `civicrm_hrjob_contract_revision` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `civicrm_hrjob_leave`
ADD COLUMN `contract_revision_id` INT(10) UNSIGNED NULL AFTER `leave_amount`,
ADD INDEX `index_contract_revision_id` (`contract_revision_id` ASC);
ALTER TABLE `civicrm_hrjob_leave`
ADD CONSTRAINT `FK_civicrm_hrjob_leave_contract_revision_id`
  FOREIGN KEY (`contract_revision_id`)
  REFERENCES `civicrm_hrjob_contract_revision` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `civicrm_hrjob_role`
ADD COLUMN `contract_revision_id` INT(10) UNSIGNED NULL AFTER `location`,
ADD INDEX `index_contract_revision_id` (`contract_revision_id` ASC);
ALTER TABLE `civicrm_hrjob_role`
ADD CONSTRAINT `FK_civicrm_hrjob_role_contract_revision_id`
  FOREIGN KEY (`contract_revision_id`)
  REFERENCES `civicrm_hrjob_contract_revision` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;



# Drop Indexes:

#SET foreign_key_checks = 0;

#ALTER TABLE `civicrm_hrjob_hour`
#DROP INDEX `UI_job_id` ;

#ALTER TABLE `civicrm_hrjob_health`
#DROP INDEX `UI_job_id` ;

#ALTER TABLE `civicrm_hrjob_pay`
#DROP INDEX `UI_job_id` ;

#ALTER TABLE `civicrm_hrjob_pension`
#DROP INDEX `UI_job_id` ;

#SET foreign_key_checks = 1;



# Delete columns and indexes:

ALTER TABLE `civicrm_hrjob_hour` 
#DROP COLUMN `job_id`,
DROP INDEX `UI_job_id` ;

ALTER TABLE `civicrm_hrjob_health`
#DROP COLUMN `job_id`,
DROP INDEX `UI_job_id` ;

ALTER TABLE `civicrm_hrjob_pay`
#DROP COLUMN `job_id`,
DROP INDEX `UI_job_id` ;

ALTER TABLE `civicrm_hrjob_pension`
#DROP COLUMN `job_id`,
DROP INDEX `UI_job_id` ;


