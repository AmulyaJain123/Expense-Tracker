import debtPayment from "../../public/debtPayment.png";
import education from "../../public/education.png";
import entertainment from "../../public/entertainment.png";
import foodAndDining from "../../public/foodAndDining.png";
import giftsAndDonations from "../../public/giftsAndDonations.png";
import healthAndFitness from "../../public/healthAndFitness.png";
import housing from "../../public/housing.png";
import insurance from "../../public/insurance.png";
import misc from "../../public/misc.png";
import personalCare from "../../public/personalCare.png";
import savingsAndInvestment from "../../public/savingsAndInvestment.png";
import transportation from "../../public/transportation.png";
import utilitiesAndBills from "../../public/utilitiesAndBills.png";
import refunds from "../../public/refunds.png"
import savingWithdrawals from "../../public/savingWithdrawals.png"
import businessIncome from "../../public/businessIncome.png"
import govtPayments from "../../public/govtPayments.png"
import investmentReturns from "../../public/investmentReturns.png"
import salaryAndWage from "../../public/salaryAndWage.png"


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