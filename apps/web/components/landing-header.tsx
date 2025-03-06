import { useDarkMode } from "@/hooks/useDarkMode";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@workspace/ui/components/navigation-menu";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

export default function LandingHeader(): React.ReactElement {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <div className="w-full h-[50px] fixed top-0 right-0 z-50 left-0 backdrop-blur-lg flex flex-row justify-between items-center bg-transparent ">
      <div className="flex flex-row items-center gap-8 ml-6">
        <div className="flex items-center gap-1">
          <div className="flex items-center space-x-1">
            {theme === "dark" ? (
              <Image
                alt="logo"
                src={"/images/logo-light.svg"}
                width={40}
                height={40}
                className="rounded-md"
              />
            ) : (
              <Image
                alt="logo"
                src={"/images/logo.svg"}
                width={40}
                height={40}
                className="rounded-md"
              />
            )}
          </div>
          <span className="font-semibold">Frontend Forge</span>
        </div>
        <p className="text-gray-300 bp4:block hidden">|</p>
        <p className="text-sm hover:underline cursor-pointer bp1:block hidden">
          Get Started
        </p>

        <NavigationMenu className=" bp1:block hidden  ">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm bg-transparent hover:bg-transparet hover:underline px-2">
                Prepare
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-blue-700 p-6 no-underline outline-none focus:shadow-md"
                        href="/prepare/overview"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium text-white">
                          Preparation Guide
                        </div>
                        <p className="text-sm leading-tight text-white/90">
                          Comprehensive guides to prepare for frontend
                          interviews and technical challenges
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/prepare/javascript" title="JavaScript">
                    Master core concepts, ES6+ features, and best practices
                  </ListItem>
                  <ListItem href="/prepare/react" title="React">
                    Component patterns, hooks, state management and optimization
                  </ListItem>
                  <ListItem href="/prepare/css" title="CSS & Styling">
                    Advanced layouts, animations, and responsive design
                  </ListItem>
                  <ListItem href="/prepare/system-design" title="System Design">
                    Frontend architecture, performance and scalability
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex flex-row gap-4 mr-6 items-center">
        <p className="text-[14px] hover:underline bp4:block hidden cursor-pointer">
          Pricing
        </p>
        <p className="text-[14px] hover:underline cursor-pointer">Sign in/up</p>
        <div
          onClick={toggleTheme}
          className="rounded-full border-[1px] p-[7px] hover:bg-[#E4E4E7] dark:hover:bg-[#1f1f20] hover:border-gray-500 hover:scale-110 transition-all ease-in-out cursor-pointer duration-200 dark:border-[#27272A] border-[#E4E4E7]"
        >
          {theme === "dark" ? (
            <Moon className="w-4 h-4 text-gray-300 hover:text-white transition-all duration-200" />
          ) : (
            <Sun className="w-4 h-4 text-gray-700 hover:text-black transition-all duration-200" />
          )}
        </div>

        <Button
          variant="default"
          className="bg-[#E2FB75] bp3:block hidden rounded-full h-[33px] text-black hover:bg-[#E2FB75]/90"
        >
          <p className="text-[14px]">Get full access</p>
        </Button>
      </div>
    </div>
  );
}

interface ListItemProps {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  className,
  title,
  children,
  href,
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-slate-500 dark:text-slate-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
