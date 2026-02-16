import { dashboardNavLinks } from "@/lib/nav-links";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Stack, Text } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardNavigation = () => {
  const pathname = usePathname();
  return (
    <Stack gap={16} className="mt-8 flex-1">
      {dashboardNavLinks.map((link, index) => (
        <Link
          key={`dashboard-nav-links-${index}`}
          href={link.href}
          className={cn(
            "font-poppins text-grey hover:text-primary flex items-center gap-x-[19px] px-4 py-3 text-base leading-[17px]",
            {
              "bg-primary rounded-[8px] text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:text-white":
                link.href === routes.dashboard.dashboard
                  ? pathname === routes.dashboard.dashboard
                  : pathname.startsWith(link.href),
            },
          )}
        >
          <link.icon />
          <Text inherit>{link.label}</Text>
        </Link>
      ))}
    </Stack>
  );
};

export default DashboardNavigation;
