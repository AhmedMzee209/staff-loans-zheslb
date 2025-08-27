package com.zheslb.staffloan.controller;

import com.zheslb.staffloan.dto.response.AdminStatsResponseDTO;
import com.zheslb.staffloan.service.AdminStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/admin/stats")
@RequiredArgsConstructor
public class AdminStatsController {
    private final AdminStatsService adminStatsService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public AdminStatsResponseDTO getStats() {
        return adminStatsService.getStats();
    }
}
