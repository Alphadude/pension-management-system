import { vendorNavLinks } from "@/lib/nav-links";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Stack, Text } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

const VendorDashboardNavigation = () => {
  const pathname = usePathname();

  return (
    <Stack gap={16} className="mt-8 flex-1">
      {vendorNavLinks.map((link, index) => (
        <Link
          key={`dashboard-nav-links-${index}`}
          href={link.href}
          className={cn(
            "font-poppins text-grey hover:text-primary flex items-center gap-x-2.5 py-3 pr-[7px] pl-4 text-base leading-[17px]",
            {
              "bg-primary rounded-[8px] text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:text-white":
                link.href === routes.vendorDashboard.root
                  ? pathname === routes.vendorDashboard.root
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

export default VendorDashboardNavigation;
