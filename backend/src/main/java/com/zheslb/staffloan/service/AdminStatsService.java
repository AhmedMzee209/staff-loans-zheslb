
package com.zheslb.staffloan.service;

import com.zheslb.staffloan.dto.response.AdminStatsResponseDTO;
import com.zheslb.staffloan.enums.LoanStatus;
import com.zheslb.staffloan.enums.StageStatus;
import com.zheslb.staffloan.model.LoanApplication;
import com.zheslb.staffloan.repository.LoanApplicationRepository;
import com.zheslb.staffloan.repository.UserRepository;
import com.zheslb.staffloan.repository.ApprovalStageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminStatsService {
    private final UserRepository userRepository;
    private final LoanApplicationRepository loanApplicationRepository;
    private final ApprovalStageRepository approvalStageRepository;

    private java.time.Instant toInstant(Object dateTime) {
        if (dateTime instanceof java.time.OffsetDateTime) {
            return ((java.time.OffsetDateTime) dateTime).toInstant();
        } else if (dateTime instanceof java.time.Instant) {
            return (java.time.Instant) dateTime;
        }
        return null;
    }

    public AdminStatsResponseDTO getStats() {
        long totalUsers = userRepository.count();
        long totalApplications = loanApplicationRepository.count();
        long pendingReviews = approvalStageRepository.findByStatus(StageStatus.PENDING).size();
        long approvedApplications = loanApplicationRepository.findByStatus(LoanStatus.APPROVED).size();
        double approvalRate = totalApplications > 0 ? (approvedApplications * 100.0 / totalApplications) : 0.0;

        // This month

        LocalDate firstDayOfMonth = LocalDate.now().withDayOfMonth(1);
        OffsetDateTime monthStart = firstDayOfMonth.atStartOfDay().atOffset(ZoneOffset.UTC);
        long newUsersThisMonth = userRepository.findAll().stream()
                .map(u -> toInstant(u.getCreatedAt()))
                .filter(instant -> instant != null && instant.isAfter(monthStart.toInstant()))
                .count();
        long newApplicationsThisMonth = loanApplicationRepository.findAll().stream()
                .map(a -> toInstant(a.getCreatedAt()))
                .filter(instant -> instant != null && instant.isAfter(monthStart.toInstant()))
                .count();

        return AdminStatsResponseDTO.builder()
                .totalUsers(totalUsers)
                .newUsersThisMonth(newUsersThisMonth)
                .totalApplications(totalApplications)
                .newApplicationsThisMonth(newApplicationsThisMonth)
                .pendingReviews(pendingReviews)
                .approvalRate(approvalRate)
                .build();
    }
}
