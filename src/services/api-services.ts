import { paystackServer, server } from "@/lib/axios-util";
import type {
  BankListApiResponse,
  ContributionRecord,
  CreateContributionFormValues,
  CreateInvoicesApiResponse,
  FinanceDashboardOverviewResponse,
  ForgetPasswordFormValues,
  GenerateReportFormValues,
  GetAllDiocesesResponse,
  GetAllParishesResponse,
  GetFinancePensionDisbursementOverviewResponse,
  GetFinancePensionManagementOverview,
  GetInvoiceApiResponse,
  GetInvoiceOverviewApiResponse,
  GetSingleParishResponse,
  GetUserContributionsApiResponse,
  GetUserNotificationsResponse,
  InvoicesFormData,
  ParishContributionResponse,
  ParishDashboardOverviewResponse,
  RemittanceResponse,
  ReportsResponse,
  ResetPasswordRequestData,
  UpdateKycStatusPayload,
  UpdateParishFormValues,
  UpdatePasswordFormValues,
  UpdateProfilePayload,
  UpdateStatusFormValues,
  UpdateUserProfileResponse,
  VenerableDashboardOverviewResponse,
  VerifyBankAccountApiResponse,
  VerifyBankAccountRequestData,
  VerifyOtpFormValues,
} from "@/types/common";

const apis = {
  auth: {
    signup: (data: FormData) => server.post("/users/signup", data),
    vendorSignup: (data: FormData) => server.post("/users/vendor-signup", data),
    forgetPassword: (data: ForgetPasswordFormValues) =>
      server.post("/users/forgot-password", data),
    verifyOtp: (data: VerifyOtpFormValues) =>
      server.post("/users/verify-otp", data),
    verifyLoginOtp: (data: VerifyOtpFormValues) =>
      server.post("/users/verify-login-otp", data),
    resetPassword: (data: ResetPasswordRequestData) =>
      server.patch(`/users/reset-password/${data.resetPasswordToken}`, data),
    updatePassword: (data: UpdatePasswordFormValues) =>
      server.patch("/users/update-password", data),
  },
  paystack: {
    getBankList: () => paystackServer.get<BankListApiResponse>("/bank"),
    verifyBankAccount: (data: VerifyBankAccountRequestData) =>
      paystackServer.get<VerifyBankAccountApiResponse>(
        `/bank/resolve?account_number=${data?.account_number}&bank_code=${data?.bank_code}`,
      ),
  },
  users: {
    updateProfile: (data: Partial<UpdateProfilePayload> | FormData) =>
      server.patch<UpdateUserProfileResponse>("/users/updateMe", data),
    profileOverview: () => server.get("/users/me"),
    getAllUsers: (query: string) => server.get(`/users${query}`),
    getPendingUsers: (query: string) =>
      server.get(`/users/pending-users${query}`),
    getUser: (uuid: string) => server.get(`/users/${uuid}`),
    updateKycStatus: (id: string, data: UpdateKycStatusPayload) =>
      server.patch(`/users/${id}/documents`, data),
    updateUserStatus: (data: UpdateStatusFormValues, id: string) =>
      server.patch<UpdateStatusFormValues>(`/users/${id}/update-status`, data),
    updateUserParish: (data: UpdateParishFormValues, id: string) =>
      server.patch<UpdateParishFormValues>(`/users/${id}/update-parish`, data),
    deleteUser: (id: string) => server.delete(`/users/${id}`),
    getUserNotification: (userId: string, query: string) =>
      server.get<GetUserNotificationsResponse>(
        `/notifications/${userId}/all${query}`,
      ),
  },
  invoice: {
    createInvoice: (data: InvoicesFormData) =>
      server.post<CreateInvoicesApiResponse>("/invoices", data),
    getInvoice: (query: string) =>
      server.get<GetInvoiceApiResponse>(`/invoices${query}`),
    getInvoiceOverview: () =>
      server.get<GetInvoiceOverviewApiResponse>("/invoices/get-overview"),
  },
  paymentVoucher: {
    uploadPaymentVoucher: (data: FormData) =>
      server.post("/payment-voucher/upload", data),
  },
  contributor: {
    getUserContributions: (query: string, uuid: string) =>
      server.get<GetUserContributionsApiResponse>(
        `/contributions/${uuid}/all${query}`,
      ),
  },
  report: {
    generateReport: (data: GenerateReportFormValues) =>
      server.post("/reports/generate", data),
    getAllReports: (query: string) =>
      server.get<ReportsResponse>(`/reports${query}`),
  },
  parish: {
    getDashboardOverview: () =>
      server.get<ParishDashboardOverviewResponse>(
        "/dashboard/parish/get-overview",
      ),
    getAllParishes: (query: string) =>
      server.get<GetAllParishesResponse>(`/parish${query}`),
    getParishById: (id: string) =>
      server.get<GetSingleParishResponse>(`/parish/${id}`),
    importContributors: (data: FormData) =>
      server.post("/parish/import-contributors", data),
    createParish: (data: { name: string }) =>
      server.post<GetSingleParishResponse>("/parish/create", data),
    createSubmission: (data: ContributionRecord) =>
      server.post("/submissions", data),
  },
  contributions: {
    getAllContributions: (query: string) =>
      server.get(`/contributions${query}`),
    searchContributions: (name: string, query: string) =>
      server.get(`/contributions/search/${name}${query}`),
    getMonthlyRemittance: (query: string) =>
      server.get<RemittanceResponse>(
        `/contributions/monthly-remittance${query}`,
      ),
    createContribution: (data: CreateContributionFormValues) =>
      server.post("/contributions", data),
    getAllParishContributions: () =>
      server.get<ParishContributionResponse>(
        "/contributions/get-parish-contributions",
      ),
  },
  finance: {
    getDashboardOverview: () =>
      server.get<FinanceDashboardOverviewResponse>(
        "/dashboard/finance/get-overview",
      ),
    getFinancePensionDisbursementOverview: () =>
      server.get<GetFinancePensionDisbursementOverviewResponse>(
        "/dashboard/get-pension-disbursement",
      ),
    getFinancePensionManagementOverview: () =>
      server.get<GetFinancePensionManagementOverview>(
        "/dashboard/get-pension-management-overview",
      ),
  },
  diocese: {
    getAllDioceses: () => server.get<GetAllDiocesesResponse>("/diocese"),
    getDioceseById: (id: string) =>
      server.get<GetAllDiocesesResponse>(`/diocese/${id}`),
  },

  venerable: {
    getDashboardOverview: () =>
      server.get<VenerableDashboardOverviewResponse>(
        "/dashboard/venerable/get-overview",
      ),
  },
};

export default apis;
