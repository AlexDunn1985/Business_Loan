function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById("loanAmount").value);
    const interestType = document.getElementById("interestType").value;
    const interestRate = parseFloat(document.getElementById("interestRate").value) / 100;
    const loanTerm = parseInt(document.getElementById("loanTerm").value);
    const bankFee = parseFloat(document.getElementById("bankFee").value) / 100;

    let monthlyPayment = 0;
    let totalCost = 0;
    let bankFeeAmount = loanAmount * bankFee;
    let adjustedLoanAmount = loanAmount + bankFeeAmount;

    switch (interestType) {
        case 'APR':
            const monthlyRateAPR = interestRate / 12;
            monthlyPayment = adjustedLoanAmount * (monthlyRateAPR / (1 - Math.pow(1 + monthlyRateAPR, -loanTerm)));
            totalCost = monthlyPayment * loanTerm;
            break;

        case 'Monthly':
            monthlyPayment = adjustedLoanAmount * interestRate;
            totalCost = monthlyPayment * loanTerm;
            break;

        case 'Factor':
            totalCost = adjustedLoanAmount * (1 + interestRate);
            monthlyPayment = totalCost / loanTerm;
            break;

        case 'Yield':
            totalCost = adjustedLoanAmount * Math.pow((1 + interestRate), (loanTerm / 12));
            monthlyPayment = totalCost / loanTerm;
            break;

        default:
            totalCost = 0;
            monthlyPayment = 0;
    }

    document.getElementById("results").innerHTML = `
        Loan Amount with Bank Fee: £${adjustedLoanAmount.toFixed(2)}<br>
        Monthly Payment: £${monthlyPayment.toFixed(2)}<br>
        Total Cost of Loan: £${totalCost.toFixed(2)}
    `;
}
