import { dioceseNavLinks } from "@/lib/nav-links";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Box, NavLink, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DioceseDashboardNavigation = () => {
  const pathname = usePathname();

  return (
    <Stack gap={16} className="mt-8 flex-1">
      {dioceseNavLinks.map((link, index) => {
        const isActive =
          link.href === routes.dioceseDashboard.root
            ? pathname === routes.dioceseDashboard.root
            : pathname.startsWith(link.href);

        // Render a NavLink with nested children for Settings
        if (link.href === routes.dioceseDashboard.settings) {
          const childrenLinks = [
            {
              label: "Diocese Settings",
              href: routes.dioceseDashboard.settings,
            },
            {
              label: "Profile Settings",
              href: routes.dioceseDashboard.profileSettings,
            },
          ];
          return (
            <Box
              key={`dashboard-nav-links-${index}`}
              className={cn("pr-2 pl-2")}
            >
              <NavLink
                label={
                  <Text
                    className={cn("font-poppins text-base leading-[17px]", {
                      "text-white": isActive,
                      "text-[#6B7280]": !isActive,
                    })}
                  >
                    {link.label}
                  </Text>
                }
                leftSection={
                  <link.icon
                    className={cn("mr-2", {
                      "text-white": isActive,
                      "text-[#6B7280]": !isActive,
                    })}
                  />
                }
                childrenOffset={28}
                defaultOpened={isActive}
                className={cn("rounded-[8px] px-2 py-1", {
                  "bg-primary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]":
                    isActive,
                })}
              >
                {childrenLinks.map((child, ci) => {
                  const childActive =
                    pathname === child.href || pathname.startsWith(child.href);
                  return (
                    <NavLink
                      key={`diocese-settings-child-${ci}`}
                      href={child.href}
                      label={
                        <Text
                          className={cn(
                            "font-poppins pl-[6px] text-sm leading-[17px]",
                            {
                              "text-white": childActive,
                              "text-[#6B7280]": !childActive,
                            },
                          )}
                        >
                          {child.label}
                        </Text>
                      }
                      className={cn("py-1")}
                      component={Link}
                    />
                  );
                })}
              </NavLink>
            </Box>
          );
        }

        return (
          <Link
            key={`dashboard-nav-links-${index}`}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "font-poppins text-grey hover:text-primary flex items-center gap-x-2.5 py-3 pr-[7px] pl-4 text-base leading-[17px]",
              {
                "bg-primary rounded-[8px] text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:text-white":
                  isActive,
              },
            )}
          >
            <link.icon />
            <Text inherit>{link.label}</Text>
          </Link>
        );
      })}
    </Stack>
  );
};

export default DioceseDashboardNavigation;
