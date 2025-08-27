package com.zheslb.staffloan.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatsResponseDTO {
    private long totalUsers;
    private long newUsersThisMonth;
    private long totalApplications;
    private long newApplicationsThisMonth;
    private long pendingReviews;
    private double approvalRate;
}
