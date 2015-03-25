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
     `title` varchar(255)   DEFAULT NULL COMMENT 'Title or Project name for the Job Role.'

,
PRIMARY KEY ( `id` )

,

CONSTRAINT FK_civicrm_hrjobroles_job_contract_id FOREIGN KEY (`job_contract_id`) REFERENCES `civicrm_hrjobcontract`(`id`)
ON DELETE CASCADE
)  ENGINE=InnoDB DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;