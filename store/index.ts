import { create } from "zustand";
import { siteConfig } from "@/config/site";
import { persist, createJSONStorage } from "zustand/middleware";

type Theme = string;
type Layout = "vertical" | "horizontal" | "semibox" | string;
type NavbarType = "sticky" | "floating" | "static" | string;
type FooterType = "sticky" | "static" | "hidden" | string;
type SidebarType = "popover" | "classic" | "module" | string;

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  radius: number;
  setRadius: (value: number) => void;
  layout: Layout;
  setLayout: (value: Layout) => void;
  navbarType: NavbarType;
  setNavbarType: (value: NavbarType) => void;
  footerType: FooterType;
  setFooterType: (value: FooterType) => void;
  isRtl: boolean;
  setRtl: (value: boolean) => void;
}

interface SidebarState {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  sidebarType: SidebarType;
  setSidebarType: (value: SidebarType) => void;
  subMenu: boolean;
  setSubmenu: (value: boolean) => void;
  sidebarBg: string;
  setSidebarBg: (value: string) => void;
  mobileMenu: boolean;
  setMobileMenu: (value: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: siteConfig.theme,
      setTheme: (theme) => set({ theme }),
      radius: siteConfig.radius,
      setRadius: (value) => set({ radius: value }),
      layout: siteConfig.layout,
      setLayout: (value) => {
        set({ layout: value });
        if (value === "semibox") {
          useSidebar.setState({ sidebarType: "popover" });
        }
        if (value === "horizontal") {
          useSidebar.setState({ sidebarType: "classic" });
        }
        if (value === "horizontal") {
          useThemeStore.setState({ navbarType: "sticky" });
        }
      },
      navbarType: siteConfig.navbarType,
      setNavbarType: (value) => set({ navbarType: value }),
      footerType: siteConfig.footerType,
      setFooterType: (value) => set({ footerType: value }),
      isRtl: false,
      setRtl: (value) => set({ isRtl: value }),
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useSidebar = create<SidebarState>()(
  persist(
    (set) => ({
      collapsed: false,
      setCollapsed: (value) => set({ collapsed: value }),
      sidebarType:
        siteConfig.layout === "semibox" ? "popover" : siteConfig.sidebarType,
      setSidebarType: (value) => {
        set({ sidebarType: value });
      },
      subMenu: false,
      setSubmenu: (value) => set({ subMenu: value }),
      sidebarBg: siteConfig.sidebarBg,
      setSidebarBg: (value) => set({ sidebarBg: value }),
      mobileMenu: false,
      setMobileMenu: (value) => set({ mobileMenu: value }),
    }),
    {
      name: "sidebar-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
