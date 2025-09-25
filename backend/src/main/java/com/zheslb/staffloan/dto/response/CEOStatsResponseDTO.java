package com.zheslb.staffloan.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CEOStatsResponseDTO {
    private long totalApplications;
    private long pendingCEOReview;
    private long approvedByCEO;
    private long rejectedLoans;
    private double totalAmountApproved;
    private double averageProcessingTime; // in days
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ApplicationsByPriority {
        private long high;
        private long medium;
        private long low;
        private long unassigned;
    }
    
    private ApplicationsByPriority applicationsByPriority;
}