import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const LoanCalculator: React.FC = () => {
  const [calculatorData, setCalculatorData] = useState({
    loanAmount: '',
    interestRate: '12',
    loanTerm: '',
    monthlyIncome: ''
  });

  const calculateLoan = () => {
    const amount = parseFloat(calculatorData.loanAmount);
    const rate = parseFloat(calculatorData.interestRate) / 100 / 12;
    const term = parseFloat(calculatorData.loanTerm);
    if (amount && rate && term) {
      const monthlyPayment = (amount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
      const totalPayment = monthlyPayment * term;
      const totalInterest = totalPayment - amount;
      return {
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2)
      };
    }
    return null;
  };
  const loanCalculation = calculateLoan();
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Loan Calculator</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Calculate Loan</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (TZS)</label>
              <input type="number" value={calculatorData.loanAmount} onChange={e => setCalculatorData({...calculatorData, loanAmount: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Enter loan amount" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (% per year)</label>
              <select value={calculatorData.interestRate} onChange={e => setCalculatorData({...calculatorData, interestRate: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                <option value="8">8%</option>
                <option value="10">10%</option>
                <option value="12">12%</option>
                <option value="15">15%</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term (months)</label>
              <input type="number" value={calculatorData.loanTerm} onChange={e => setCalculatorData({...calculatorData, loanTerm: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Enter loan term" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (TZS)</label>
              <input type="number" value={calculatorData.monthlyIncome} onChange={e => setCalculatorData({...calculatorData, monthlyIncome: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Enter monthly income" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Calculation Results</h4>
          {loanCalculation ? (
            <div className="space-y-4">
              <div className="bg-emerald-50 rounded-lg p-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Monthly Payment</p>
                  <p className="text-2xl font-bold text-emerald-600">{formatAmount(parseFloat(loanCalculation.monthlyPayment))}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Total Payment</p>
                  <p className="text-lg font-bold text-blue-600">{formatAmount(parseFloat(loanCalculation.totalPayment))}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Total Interest</p>
                  <p className="text-lg font-bold text-purple-600">{formatAmount(parseFloat(loanCalculation.totalInterest))}</p>
                </div>
              </div>
              {calculatorData.monthlyIncome && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Payment to Income Ratio</p>
                    <p className={`text-lg font-bold ${
                      (parseFloat(loanCalculation.monthlyPayment) / parseFloat(calculatorData.monthlyIncome)) > 0.4 
                        ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {((parseFloat(loanCalculation.monthlyPayment) / parseFloat(calculatorData.monthlyIncome)) * 100).toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-500">
                      {(parseFloat(loanCalculation.monthlyPayment) / parseFloat(calculatorData.monthlyIncome)) > 0.4 
                        ? 'High risk - exceeds 40%' : 'Acceptable ratio'
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>Enter loan details to see calculation results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
