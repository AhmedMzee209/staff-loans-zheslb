-- Migration to add profile_image column to staff_profiles
ALTER TABLE staff_profiles ADD COLUMN profile_image VARCHAR(255);
