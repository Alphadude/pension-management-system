import { Analytics02Icon } from "@/components/icons/analytics-02-icon";
import { ChurchIcon } from "@/components/icons/church-icon";
import { MoneyIcon } from "@/components/icons/money-icon";
import { MonthlyContributionIcon } from "@/components/icons/monthly-contribution-icon";
import { PackOutlineIcon } from "@/components/icons/pack-outline-icon";
import { Payment02Icon } from "@/components/icons/payment-02-icon";
import { ProfileThinIcon } from "@/components/icons/profile-thin-icon";
import { TransactionIcon } from "@/components/icons/transaction-icon";
import { UsersIcon } from "@/components/icons/users-icon";
import { LayoutDashboardIcon, SettingsIcon } from "lucide-react";
import { routes } from "./routes";

export const dashboardNavLinks = [
  {
    label: "Dashboard",
    href: routes.dashboard.dashboard,
    icon: LayoutDashboardIcon,
  },
  {
    label: "Profile",
    href: routes.dashboard.profile,
    icon: ProfileThinIcon,
  },
  {
    label: "Help & Support",
    href: routes.dashboard.support,
    icon: PackOutlineIcon,
  },
];

export const vendorNavLinks = [
  {
    label: "Dashboard",
    href: routes.vendorDashboard.root,
    icon: LayoutDashboardIcon,
  },
  {
    label: "Payment Voucher",
    href: routes.vendorDashboard.paymentVoucher,
    icon: Payment02Icon,
  },
  {
    label: "Transaction History",
    href: routes.vendorDashboard.transactionHistory,
    icon: TransactionIcon,
  },
  {
    label: "Reports",
    href: routes.vendorDashboard.reports,
    icon: Analytics02Icon,
  },
  {
    label: "Profile",
    href: routes.vendorDashboard.profile,
    icon: ProfileThinIcon,
  },
  {
    label: "Help & Support",
    href: routes.vendorDashboard.support,
    icon: PackOutlineIcon,
  },
];

export const parishNavLinks = [
  {
    label: "Dashboard",
    href: routes.parishDashboard.root,
    icon: LayoutDashboardIcon,
  },
  {
    label: "Monthly Contribution",
    href: routes.parishDashboard.monthlyContribution,
    icon: MonthlyContributionIcon,
  },
  {
    label: "Monthly Remittance",
    href: routes.parishDashboard.monthlyRemittance,
    icon: MoneyIcon,
  },
  {
    label: "Pensioners",
    href: routes.parishDashboard.pensioners,
    icon: UsersIcon,
  },
  {
    label: "Settings",
    href: routes.parishDashboard.settings,
    icon: SettingsIcon,
  },
  {
    label: "Help & Support",
    href: routes.parishDashboard.support,
    icon: PackOutlineIcon,
  },
];

export const dioceseNavLinks = [
  {
    label: "Dashboard",
    href: routes.dioceseDashboard.root,
    icon: LayoutDashboardIcon,
  },
  {
    label: "Diocese Management",
    href: routes.dioceseDashboard.dioceseManagement,
    icon: MonthlyContributionIcon,
  },
  {
    label: "Parish Management",
    href: routes.dioceseDashboard.ParishManagement,
    icon: UsersIcon,
  },
  {
    label: "Monthly Remittance",
    href: routes.dioceseDashboard.monthlyRemittance,
    icon: MoneyIcon,
  },
  {
    label: "Settings",
    href: routes.dioceseDashboard.settings,
    icon: PackOutlineIcon,
  },
  {
    label: "Help & Support",
    href: routes.parishDashboard.support,
    icon: PackOutlineIcon,
  },
];

export const venerableNavLinks = [
  {
    label: "Dashboard",
    href: routes.venerableDashboard.root,
    icon: LayoutDashboardIcon,
  },
  {
    label: "Diocese Directory",
    href: routes.venerableDashboard.dioceseDirectory,
    icon: ChurchIcon,
  },
  {
    label: "User Management",
    href: routes.venerableDashboard.userManagement,
    icon: UsersIcon,
  },
  {
    label: "System Users",
    href: routes.venerableDashboard.systemUsers,
    icon: UsersIcon,
  },
  {
    label: "Settings",
    href: routes.venerableDashboard.settings,
    icon: SettingsIcon,
  },
  {
    label: "Help & Support",
    href: routes.venerableDashboard.support,
    icon: PackOutlineIcon,
  },
];

export const financeNavLinks = [
  {
    label: "Dashboard",
    href: routes.financeDashboard.root,
    icon: LayoutDashboardIcon,
  },
  {
    label: "Pension Management",
    href: routes.financeDashboard.pensionManagement,
    icon: MonthlyContributionIcon,
  },
  // {
  //   label: "Vendor Management",
  //   href: routes.financeDashboard.vendorManagement,
  //   icon: MoneyIcon,
  // },
  {
    label: "Monthly Contributions",
    href: routes.financeDashboard.monthlyContributions,
    icon: UsersIcon,
  },
  {
    label: "Settings",
    href: routes.financeDashboard.settings,
    icon: SettingsIcon,
  },
  {
    label: "Help & Support",
    href: routes.financeDashboard.support,
    icon: PackOutlineIcon,
  },
];
