package com.zheslb.staffloan.repository;

import com.zheslb.staffloan.model.StaffProfile;
import com.zheslb.staffloan.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface StaffProfileRepository extends JpaRepository<StaffProfile, UUID> {

    Optional<StaffProfile> findByUser(User user);

    boolean existsByZanzibarId(String zanzibarId);

    boolean existsByUser(User user);
}
