export interface LoginResponseValue {
  status: "success" | "2fa_required" | "fail";
  accessToken: string;
  refreshToken: string;
  user: SessionUser;
}

export interface GetAllUserResponse {
  status: string;
  results: number;
  page: number;
  total_pages: number;
  next_page: number | null;
  prev: number | null;
  doc: SessionUser[];
}

export interface GetUserResponse {
  status: string;
  doc: {
    user: SessionUser;
  };
}

export interface SessionUser {
  cacRegistration?: {
    status: string;
    url: string;
  };
  taxIdentificationNumber?: {
    status: string;
    url: string;
  };
  industryCertifications?: {
    status: string;
    url: string;
  };
  workPortfolio?: {
    status: string;
    url: string;
  };
  referenceLetters?: {
    status: string;
    url: string;
  };
  validGovernmentId?: {
    status: string;
    url: string;
  };
  utilityBills?: {
    status: string;
    url: string;
  };
  passportPhotograph?: {
    status: string;
    url: string;
  };
  profilePhoto?: {
    url: string;
  };
  birtCertificate?: {
    status: string;
    url: string;
  };
  baptismCertificate?: {
    status: string;
    url: string;
  };
  firstSchoolLeavingCertificate?: {
    status: string;
    url: string;
  };
  nationalIdentityCard?: {
    status: string;
    url: string;
  };
  _id: string;
  firstName: string;
  lastName: string;
  reoccuring?: boolean;
  businessType?: string;
  companyName?: string;
  serviceCategory?: string;
  parish: string;
  diocese: string;
  gender: string;
  dob: string;
  contactPerson: string;
  businessAddress: string;
  email: string;
  password: string;
  active: boolean;
  phoneNumber: string;
  pensionBalance: number;
  contributionBalance: number;
  role: UserRole;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  isPensioner: boolean;
  yearStarted?: string;
  basicSalary?: string;
  monthlyPension?: string;
  datePensionCommenced?: string;
  staffNumber?: string;
}

export type UserRole =
  | "venerable"
  | "finance"
  | "diocese"
  | "parish"
  | "vendor"
  | "contributor"
  | "pensioner";

export interface LoginFormValues {
  email: string;
  password: string;
}
export interface ForgetPasswordFormValues {
  email: string;
}

export interface VerifyOtpFormValues {
  email: string;
  otp: string | number;
}

export interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordRequestData extends ResetPasswordFormValues {
  resetPasswordToken: string;
}

export interface VerifyBankAccountRequestData {
  account_number: string;
  bank_code: string;
}

export interface UpdatePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  newConfirmPassword: string;
}

export interface ForgetPasswordResponse {
  status: string;
  message: string;
}

export interface OtpVerificationResponse {
  status: "success" | "error";
  message: string;
  resetPasswordToken: string;
  refreshToken: string;
}

export interface LoginOtpVerificationResponse {
  status: "success" | "error";
  message: string;
  accessToken: string;
  refreshToken: string;
  user: SessionUser;
}

export interface ResetPasswordResponse {
  status: string;
  data: {
    data: {
      birtCertificate: {
        status: string;
      };
      baptismCertificate: {
        status: string;
      };
      firstSchoolLeavingCertificate: {
        status: string;
      };
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      active: boolean;
      role: string;
      status: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
      otp: null;
      otpExpiration: string;
      confirmPassword: string;
      id: string;
    };
  };
}

export interface signupResponse {
  status: string;
  accessToken: string;
  refreshToken: string;
  data: {
    data: null;
  };
}
export interface SignupFormValues {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nextOfKinFirstName: string;
  nextOfKinLastName: string;
  nextOfKinPhoneNumber: string;
  nextOfKinEmail: string;
  password: string;
  confirmPassword: string;
  terms?: boolean;
  dateOfBirth: string | null;
  gender: string;
  diocese: string;
  parish: string;
  nationalIdentityNumber: string;
  birtCertificate: string | null;
  baptismCertificate: string | null;
  firstSchoolLeavingCertificate: string | null;
  nationalIdentityCard: string | null;
}

export interface UpdatePasswordResponse {
  status: string;
  accessToken: string;
  refreshToken: string;
  data: {
    data: {
      _id: string;
      confirmPassword: string;
      updatedAt: string;
      id: string;
    };
  };
}

export interface SupportFormValues {
  subject: string;
  message: string;
}

export interface ProfileOverview {
  status: string;
  doc: {
    user: {
      _id: string;
      firstName: string;
      middleName?: string;
      gender: string;
      dateOfBirth: string;
      diocese: string;
      parish: string;
      nextOfKinFirstName: string;
      nextOfKinLastName: string;
      nextOfKinPhoneNumber: string;
      nextOfKinEmail: string;
      birtCertificate: {
        status: string;
        url: string;
      };
      baptismCertificate: {
        status: string;
        url: string;
      };
      firstSchoolLeavingCertificate: {
        status: string;
        url: string;
      };
      cacRegistration: {
        status: string;
        url: string;
      };
      taxIdentificationNumber: {
        status: string;
        url: string;
      };
      industryCertifications: {
        status: string;
        url: string;
      };
      workPortfolio: {
        status: string;
        url: string;
      };
      referenceLetters: {
        status: string;
        url: string;
      };
      validGovernmentId: {
        status: string;
        url: string;
      };
      utilityBills: {
        status: string;
        url: string;
      };
      passportPhotograph: {
        status: string;
        url: string;
      };
      reoccuring: boolean;
      companyName: string;
      businessType: string;
      serviceCategory: string;
      contactPerson: string;
      businessAddress?: string;
      phoneNumber: string;
      lastName: string;
      email: string;
      active: boolean;
      role: string;
      wallet: number;
      status: string;
      createdAt: string;
      updatedAt: string;
      referralLink: string;
      __v: number;
      id: string;
    };
  };
}

export interface UpdateProfilePayload {
  diocese: string;
  parish: string;
  phoneNumber: string;
  email: string;
  gender: string;
  dob: string;
  businessType: string;
  businessAddress: string;
  contactPerson: string;
  serviceCategory: string;
  firstName: string;
  lastName: string;
}

export interface UpdateUserProfileResponse {
  status: string;
  user: {
    profilePhoto: {
      url: string;
    };
    cacRegistration: {
      status: string;
    };
    taxIdentificationNumber: {
      status: string;
    };
    industryCertifications: {
      status: string;
    };
    workPortfolio: {
      status: string;
    };
    referenceLetters: {
      status: string;
    };
    validGovernmentId: {
      url: string;
      status: string;
    };
    utilityBills: {
      url: string;
      status: string;
    };
    passportPhotograph: {
      url: string;
      status: string;
    };
    birtCertificate: {
      status: string;
    };
    baptismCertificate: {
      status: string;
    };
    nationalIdentityCard: {
      status: string;
    };
    firstSchoolLeavingCertificate: {
      status: string;
    };
    kycStatus: string;
    _id: string;
    reoccuring: boolean;
    businessType: string;
    companyName: string;
    serviceCategory: string;
    contactPerson: string;
    businessAddress: string;
    email: string;
    active: boolean;
    phoneNumber: string;
    pensionBalance: number;
    contributionBalance: number;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  };
}

export interface vendorSignupFormValues {
  reoccuring: string;
  businessType: string;
  companyName: string;
  serviceCategory: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  businessAddress: string;
  cacRegistration: null;
  taxIdentificationNumer: null;
  industryCertifications: null;
  workPortfolio: null;
  referenceLetters: null;
  validGovernmentId: null;
  utilityBills: null;
  passportPhotograph: null;
  terms?: boolean;
}

export interface paymentVoucherForm {
  voucherFile: null;
  note?: string;
  terms: boolean;
}

import { type SVGAttributes } from "react";

export interface IconProps extends SVGAttributes<SVGElement> {
  size?: string | number;
  color?: string;
}

export interface InvoicesFormData {
  date: string;
  lineItems: {
    description: string;
    quantity: number;
    unitCost: number;
  }[];
  totalAmount: number;
  bankName: string;
  accountName: string;
  accountNumber: number;
  userId: string;
}

export interface CreateInvoicesApiResponse {
  status: string;
  doc: {
    date: string;
    lineItems: {
      description: string;
      quantity: number;
      unitCost: number;
      totalCost: number;
      _id: string;
      id: string;
    }[];
    totalAmount: number;
    bankName: string;
    accountName: string;
    accountNumber: number;
    userId: string;
    status: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    invoiceNumber: string;
    __v: number;
    id: string;
  };
}

export interface GetInvoiceApiResponse {
  status: string;
  results: number;
  page: number;
  total_pages: number;
  next_page: number | null;
  prev: number | null;
  doc: {
    _id: string;
    date: string;
    lineItems: {
      description: string;
      quantity: number;
      unitCost: number;
      totalCost: number;
      _id: string;
      id: string;
    }[];
    totalAmount: number;
    bankName: string;
    accountName: string;
    accountNumber: number;
    userId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    invoiceNumber: string;
    id: string;
    paymentDate?: string;
  }[];
}
export interface GetInvoiceOverviewApiResponse {
  status: string;
  invoicesSubmitted: number;
  pendingPayments: number;
  paidPayments: number;
  lastPayment: null;
}

export interface BankListApiResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    slug: string;
    code: string;
    longcode: string;
    gateway: null | string;
    pay_with_bank: boolean;
    supports_transfer: boolean;
    available_for_direct_debit: boolean;
    active: boolean;
    country: string;
    currency: string;
    type: string;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface VerifyBankAccountApiResponse {
  status: boolean;
  message: string;
  data: {
    account_number: string;
    account_name: string;
  };
}

export interface QueryParams {
  page: number;
  search?: string;
  status?: string | null;
  year?: string | null;
  month?: string | null;
  role?: string | null;
  diocese?: string | null;
  parish?: string | null;
  gender?: string | null;
  yearOfBirth?: string | null;
  yearStarted?: string | null;
  basicSalary?: string | null;
  totalContribution?: string | null;
  staffNumber?: string | null;
  sex?: string | null;
  dob?: string | null;
  datePensionCommenced?: string | null;
  monthlyPension?: string | null;
  contributorId?: string | null;
}

export interface GetUserContributionsApiResponse {
  status: string;
  results: number;
  page: number;
  total_pages: number;
  next_page: number | null;
  prev: number | null;
  doc: {
    _id: string;
    user: SessionUser;
    year: number;
    month: string;
    contributionType: ContributionType;
    station: string;
    salary: number;
    type: "debit";
    createdAt: string;
    updatedAt: string;
    deduction: number;
    remittance: number;
    totalRemittance: number;
    status: string;
    id: string;
  }[];
}

export type ContributionType = "debit" | "credit";

export type ContributionTypeOptions = "active" | "retired" | "deceased";
export interface GenerateReportFormValues {
  startDate: null;
  endDate: null;
  reportType: "Quarterly" | "Monthly";
}

export interface Invoice {
  invoiceId: string;
  invoiceNumber: string;
  date: string;
  totalAmount: number;
  status: "paid" | "awaiting";
}

export interface ReportResponse {
  status: string;
  data: {
    startDate: string;
    endDate: string;
    invoices: Invoice[];
    reportType: string;
    status: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    reportName: string;
    __v: number;
  };
}

export interface ReportDoc {
  _id: string;
  startDate: string;
  endDate: string;
  invoices: Invoice[];
  reportType?: string;
  status: string;
  generatedOn: string;
  createdAt: string;
  updatedAt: string;
  reportName: string;
}

export interface ReportsResponse {
  status: string;
  results: number;
  total_pages: number;
  page: number;
  next_page: number | null;
  prev: number | null;
  doc: ReportDoc[];
}

export interface ParishDashboardOverviewResponse {
  status: string;
  doc: {
    totalContributors: number;
    contributorsThisMonth: number;
    totalPensioners: number;
    pensionersChangeFromLastMonth: string;
    contributorStatusChart: {
      name: string;
      value: number;
    }[];
  };
}
export interface Contribution {
  _id: string;
  user: SessionUser;
  year: number;
  month: string;
  contributionType: string;
  station: string;
  salary: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  deduction: number;
  remittance: number;
  totalRemittance: number;
  status: string;
  diocese: string;
  parish?: string;
  id: string;
}
export interface ContributionResponse {
  status: string;
  results: number;
  total_pages: number;
  page: number;
  next_page: string | null;
  prev: string | null;
  doc: Contribution[];
}

export interface ContributionSearchResponse {
  status: string;
  results: number;
  data: {
    contributions: Contribution[];
  };
}

export interface RemittanceUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  profilePhoto?: { url: string };
}

export interface RemittanceItem {
  user: RemittanceUser;
  salary: number;
  deduction: number;
  remittance: number;
  totalRemittance: number;
}

export interface RemittanceResponseData {
  remittance: RemittanceItem[];
}

export interface RemittanceResponse {
  data: RemittanceResponseData;
}

interface StatItem {
  name: string;
  value: number | null;
}

interface ParishGraphData {
  month: string;
  parish: string;
  total: number;
}

export interface FinanceDashboardOverviewResponse {
  status: string;
  doc: {
    totalContributor: number;
    activePensioners: number;
    activeParishes: number;
    percentageSignedVoucher: number | null;
    contributorData: StatItem[];
    pensionerData: StatItem[];
    topContributingParishGraphData: ParishGraphData[];
    paymentVoucherData: StatItem[];
  };
}
export interface ContributionDoc {
  user: string;
  year: string; // ISO date string
  month: string; // ISO date string
  contributionType: string;
  station: string;
  parish: string;
  salary: number;
  type: string;
  _id: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deduction: number;
  remittance: number;
  totalRemittance: number;
  status: string;
  __v: number;
  id: string;
}

export interface CreateContributionResponse {
  status: string;
  doc: ContributionDoc;
}
export interface Diocese {
  _id: string;
  id: string;
  name: string;
  parishCount: number;
  contributorCount: number;
  totalPensionPaid: number;
  totalPensioners: number;
  contactName: string;
  contactEmail: string;
  activePensioners: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface GetAllDiocesesResponse {
  status: string; // e.g. "success"
  results: number;
  total_pages: number;
  page: number;
  next_page: number | null;
  prev: number | null;
  doc: Diocese[];
}

export interface Parish {
  _id: string;
  id: string;
  name: string;
  diocese: string; // reference to Diocese ID
  status: string; // e.g. "active"
  contributorCount: number;
  totalPaidContributor: number;
  activeContributors: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface GetSingleParishResponse {
  status: string;
  doc: Parish;
}

export interface GetAllParishesResponse {
  status: string; // e.g. "success"
  results: number;
  total_pages: number;
  page: number;
  next_page: number | null;
  prev: number | null;
  doc: Parish[];
}
export interface VenerableDashboardOverviewResponse {
  status: string;
  doc: {
    totalDiocese: number;
    totalParish: number;
    totalContributor: number;
    totalPensioners: number;
    contributorUserStats: {
      name: string;
      value: number;
    }[];
    pensionerUserStats: {
      name: string;
      value: number;
    }[];
    topContributingParishGraphData: {
      month: string;
      parish: string;
      total: number;
    }[];
    paymentVoucherData: {
      name: string;
      value: number | null;
    }[];
  };
}

export interface CreateContributionFormValues {
  user: string;
  year: null;
  month: null;
  contributorType?: string;
  station: string;
  salary: number;
}
export interface ParishContributionResponse {
  status: string;
  results: number;
  data: {
    parishes: ParishContributionItem[];
  };
}

export interface ParishContributionItem {
  totalContributions: number;
  lastContributionDate: string; // ISO date string
  numberOfContributors: number;
  parishId: string;
  parishName: string;
}

export interface UpdateKycStatusPayload {
  field: string;
  status: "approved" | "rejected" | "pending";
}

export interface UpdateStatusFormValues {
  status: string;
  parishtransfernote: string;
}

export interface UpdateParishFormValues {
  parish: string;
  parishTransferNote: string;
}

export interface GetFinancePensionDisbursementOverviewResponse {
  status: string;
  data: {
    month: string;
    value: number;
  }[];
}

export interface GetFinancePensionManagementOverview {
  status: string;
  doc: {
    totalPensioners: number;
    totalAmountPaid: number;
    paymentsMade: number;
  };
}

export interface UserNotification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  isRead: boolean;
  metadata: {
    salary: number;
    deduction: number;
    remittance: number;
    totalRemittance: number;
  };
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface GetUserNotificationsResponse {
  status: "success" | "error";
  results: number;
  total_pages: number;
  page: number;
  next_page: number | null;
  prev: number | null;
  doc: UserNotification[];
}

export interface ContributionRecord {
  month: string | undefined;
  year: string | undefined;
  deadline: string;
  status: string;
  totalAmount: number;
  diocese: string;
  contributions: string[];
}

export interface CreateContributionResponse {
  status: string;
  doc: ContributionDoc;
}

export interface ContributionDoc {
  _id: string;
  month: string;
  year: string;
  deadline: string; // ISO date string
  status: string;
  totalAmount: number;
  diocese: string; // ObjectId
  contributions: string[]; // ObjectId[]
  contributorCount: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
