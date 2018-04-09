ALTER TABLE `crossing_borders`.`bevis` ADD COLUMN `id` INT NULL FIRST, ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);
ALTER TABLE `crossing_borders`.`bevis` CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT , ADD PRIMARY KEY (`id`);
ALTER TABLE `crossing_borders`.`bevis` ADD COLUMN `point` POINT NULL AFTER `end`;
UPDATE  bevis  SET point =  GeomFromText(CONCAT('POINT(',bevis.geometry,')')) where bevis.geometry <>'';