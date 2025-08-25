package com.zheslb.staffloan.service;

import com.zheslb.staffloan.dto.request.LoanApplicationDetailsRequestDTO;
import com.zheslb.staffloan.dto.response.LoanApplicationDetailsResponseDTO;
import com.zheslb.staffloan.model.LoanApplication;
import com.zheslb.staffloan.model.LoanApplicationDetails;
import com.zheslb.staffloan.exception.ResourceNotFoundException;
import com.zheslb.staffloan.repository.LoanApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LoanApplicationDetailsService {

    private final LoanApplicationRepository loanApplicationRepository;

    public LoanApplicationDetailsResponseDTO createLoanApplicationDetails(UUID applicationId,
            LoanApplicationDetailsRequestDTO detailsDTO) {
        LoanApplication application = loanApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));

        if (application.getDetails() != null) {
            throw new IllegalStateException("Loan application details already exist");
        }

        LoanApplicationDetails details = new LoanApplicationDetails();
        details.setLoanPurpose(detailsDTO.getLoanPurpose());
        details.setRequestedAmount(detailsDTO.getRequestedAmount());
        details.setMonthlyDeduction(detailsDTO.getMonthlyDeduction());
        details.setDeductionPeriod(detailsDTO.getDeductionPeriod());

        application.setDetails(details);
        LoanApplication saved = loanApplicationRepository.save(application);

        return mapToResponseDTO(saved.getDetails());
    }

    public LoanApplicationDetailsResponseDTO getDetailsByApplicationId(UUID applicationId) {
        LoanApplication application = loanApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));

        if (application.getDetails() == null) {
            throw new ResourceNotFoundException("Loan application details not found");
        }

        return mapToResponseDTO(application.getDetails());
    }

    public LoanApplicationDetailsResponseDTO updateLoanApplicationDetails(UUID applicationId,
            LoanApplicationDetailsRequestDTO detailsDTO) {
        LoanApplication application = loanApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));

        LoanApplicationDetails details = application.getDetails();
        if (details == null) {
            throw new ResourceNotFoundException("Loan application details not found");
        }

        details.setLoanPurpose(detailsDTO.getLoanPurpose());
        details.setRequestedAmount(detailsDTO.getRequestedAmount());
        details.setMonthlyDeduction(detailsDTO.getMonthlyDeduction());
        details.setDeductionPeriod(detailsDTO.getDeductionPeriod());

        LoanApplication saved = loanApplicationRepository.save(application);
        return mapToResponseDTO(saved.getDetails());
    }

    public void deleteLoanApplicationDetails(UUID applicationId) {
        LoanApplication application = loanApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));

        if (application.getDetails() == null) {
            throw new ResourceNotFoundException("Loan application details not found");
        }

        application.setDetails(null);
        loanApplicationRepository.save(application);
    }

    private LoanApplicationDetailsResponseDTO mapToResponseDTO(LoanApplicationDetails details) {
        LoanApplicationDetailsResponseDTO responseDTO = new LoanApplicationDetailsResponseDTO();
        responseDTO.setDetailsId(details.getDetailsId());
        responseDTO.setLoanPurpose(details.getLoanPurpose());
        responseDTO.setRequestedAmount(details.getRequestedAmount());
        responseDTO.setMonthlyDeduction(details.getMonthlyDeduction());
        responseDTO.setDeductionPeriod(details.getDeductionPeriod());
        return responseDTO;
    }
}
