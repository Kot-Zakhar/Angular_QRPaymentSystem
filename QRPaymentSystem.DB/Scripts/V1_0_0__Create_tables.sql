
DROP TABLE IF EXISTS `qr_payment_system_db`.`transactions`;
DROP TABLE IF EXISTS `qr_payment_system_db`.`money_accounts` ;
DROP TABLE IF EXISTS `qr_payment_system_db`.`users` ;

-- -----------------------------------------------------
-- Table `qr_payment_system_db`.`users`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `qr_payment_system_db`.`users` (
  `identity_id` VARCHAR(36) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NULL,
  PRIMARY KEY (`identity_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `qr_payment_system_db`.`money_accounts`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `qr_payment_system_db`.`money_accounts` (
  `id` VARCHAR(36) NOT NULL,
  `users_identity_id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_money_accounts_users`
    FOREIGN KEY (`users_identity_id`)
    REFERENCES `qr_payment_system_db`.`users` (`identity_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_money_accounts_users_idx` ON `qr_payment_system_db`.`money_accounts` (`users_identity_id` ASC);

-- -----------------------------------------------------
-- Table `qr_payment_system_db`.`transactions`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `qr_payment_system_db`.`transactions` (
  `id` VARCHAR(36) NOT NULL,
  `from_money_account_id` VARCHAR(36) NULL,
  `to_money_account_id` VARCHAR(36) NOT NULL,
  `amount` INT NOT NULL,
  `date` DATETIME NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_transactions_money_accounts1`
    FOREIGN KEY (`from_money_account_id`)
    REFERENCES `qr_payment_system_db`.`money_accounts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transactions_money_accounts2`
    FOREIGN KEY (`to_money_account_id`)
    REFERENCES `qr_payment_system_db`.`money_accounts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_transactions_money_accounts1_idx` ON `qr_payment_system_db`.`transactions` (`from_money_account_id` ASC);

CREATE INDEX `fk_transactions_money_accounts2_idx` ON `qr_payment_system_db`.`transactions` (`to_money_account_id` ASC);
