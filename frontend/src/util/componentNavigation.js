import debtPayment from "../assets/debtPayment.png";
import education from "../assets/education.png";
import entertainment from "../assets/entertainment.png";
import foodAndDining from "../assets/foodAndDining.png";
import giftsAndDonations from "../assets/giftsAndDonations.png";
import healthAndFitness from "../assets/healthAndFitness.png";
import housing from "../assets/housing.png";
import insurance from "../assets/insurance.png";
import misc from "../assets/misc.png";
import personalCare from "../assets/personalCare.png";
import savingsAndInvestment from "../assets/savingsAndInvestment.png";
import transportation from "../assets/transportation.png";
import utilitiesAndBills from "../assets/utilitiesAndBills.png";
import refunds from "../assets/refunds.png"
import savingWithdrawals from "../assets/savingWithdrawals.png"
import businessIncome from "../assets/businessIncome.png"
import govtPayments from "../assets/govtPayments.png"
import investmentReturns from "../assets/investmentReturns.png"
import salaryAndWage from "../assets/salaryAndWage.png"


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
                name: "Misc-Out",
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
                name: "Business Income",
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
                name: "Misc-In",
                icon: misc
            }
        ],
    },

];