import debtPayment from "../assets/transactionCategories/debtPayment.png";
import education from "../assets/transactionCategories/education.png";
import entertainment from "../assets/transactionCategories/entertainment.png";
import foodAndDining from "../assets/transactionCategories/foodAndDining.png";
import giftsAndDonations from "../assets/transactionCategories/giftsAndDonations.png";
import healthAndFitness from "../assets/transactionCategories/healthAndFitness.png";
import housing from "../assets/transactionCategories/housing.png";
import insurance from "../assets/transactionCategories/insurance.png";
import misc from "../assets/transactionCategories/misc.png";
import personalCare from "../assets/transactionCategories/personalCare.png";
import savingsAndInvestment from "../assets/transactionCategories/savingsAndInvestment.png";
import transportation from "../assets/transactionCategories/transportation.png";
import utilitiesAndBills from "../assets/transactionCategories/utilitiesAndBills.png";
import refunds from "../assets/transactionCategories/refunds.png"
import savingWithdrawals from "../assets/transactionCategories/savingWithdrawals.png"
import businessIncome from "../assets/transactionCategories/businessIncome.png"
import govtPayments from "../assets/transactionCategories/govtPayments.png"
import investmentReturns from "../assets/transactionCategories/investmentReturns.png"
import salaryAndWage from "../assets/transactionCategories/salaryAndWage.png"


export const createSplitHeirachy = [
    "Split Creation",
    "Adding Bills",
    "Split Results",
];

export const addBillHeirarchy = [
    "Divide Equally",
    "Divide Manually",
    "Divide by Ratio",
];

export const outgoingTransactionCategories = [
    {
        name: "Essentials",
        subCategories: [
            {
                name: "Housing",
                icon: housing,
            },
            {
                name: "Transportation",
                icon: transportation
            },
            {
                name: "Utility & Bills",
                icon: utilitiesAndBills
            },
            {
                name: "Health & Fitness",
                icon: healthAndFitness
            },
            {
                name: "Education",
                icon: education
            },
        ],
    },
    {
        name: "Lifestyle & Leisure",
        subCategories: [
            {
                name: "Food & Dining",
                icon: foodAndDining
            },
            {
                name: "Personal Care",
                icon: personalCare
            },
            {
                name: "Entertainment",
                icon: entertainment
            },
        ],
    },
    {
        name: "Financial Planning",
        subCategories: [
            {
                name: "Insurance",
                icon: insurance
            },
            {
                name: "Debt Payment",
                icon: debtPayment
            },
            {
                name: "Savings & Investment",
                icon: savingsAndInvestment
            },
        ],
    },
    {
        name: "Miscellaneous",
        subCategories: [
            {
                name: "Gifts & Donations",
                icon: giftsAndDonations
            },
            {
                name: "Misc",
                icon: misc
            },
        ],
    },
];

export const incomingTransactionCategories = [
    {
        name: "Major Earnings",
        subCategories: [
            {
                name: "Salary & Wage",
                icon: salaryAndWage,
            },
            {
                name: "Buisness Income",
                icon: businessIncome
            },
            {
                name: "Government Payments",
                icon: govtPayments
            }
        ],
    },
    {
        name: "Other Income",
        subCategories: [
            {
                name: "Refund & Reimbursements",
                icon: refunds
            },
            {
                name: "Investment Returns",
                icon: investmentReturns
            },
            {
                name: "Savings Withdrawals",
                icon: savingWithdrawals
            },
            {
                name: "Debt Taken",
                icon: debtPayment
            },
        ],
    },
    {
        name: "Miscellaneous",
        subCategories: [
            {
                name: "Gifts",
                icon: giftsAndDonations
            },
            {
                name: "Misc",
                icon: misc
            }
        ],
    },

];