import {
  Application,
  Chart,
  Components,
  DashBoard,
  Stacks2,
  Map,
  Grid,
  Files,
  Graph,
  ClipBoard,
  Cart,
  Envelope,
  Messages,
  Monitor,
  ListFill,
  Calendar,
  Flag,
  Book,
  Note,
  ClipBoard2,
  Note2,
  Note3,
  BarLeft,
  BarTop,
  ChartBar,
  PretentionChartLine,
  PretentionChartLine2,
  Google,
  Pointer,
  Map2,
  MenuBar,
  Icons,
  ChartArea,
  Building,
  Building2,
  Sheild,
  Error,
  Diamond,
  Heroicon,
  LucideIcon,
  CustomIcon,
  Mail,
} from "@/components/svg";

export const menusConfig = {
  mainNav: [
    {
      title: "Data Manager",
      icon: ListFill,
      href: "/data-manager",
    },
    {
      title: "Dashboard Builder",
      icon: Graph,
      href: "/dashboard-builder",
    },
    {
      title: "Live Dashboard",
      icon: Monitor,
      href: "/live-dashboard",
    },
  ],
  sidebarNav: {
    modern: [
      {
        title: "Apps",
        icon: Application,
        href: "/apps",
      },
      // {
      //   title: "DataViz Pro",
      //   icon: DashBoard,
      //   child: [
      //     {
      //       title: "Data Manager",
      //       icon: ListFill,
      //       href: "/data-manager",
      //     },
      //     {
      //       title: "Dashboard Builder",
      //       icon: Graph,
      //       href: "/dashboard-builder",
      //     },
      //     {
      //       title: "Live Dashboard",
      //       icon: Monitor,
      //       href: "/live-dashboard",
      //     },
      //   ],
      // },
    ],
    classic: [
      {
        title: "Apps",
        icon: Application,
        href: "/apps",
      },
      // {
      //   title: "Data Manager",
      //   icon: ListFill,
      //   href: "/data-manager",
      // },
      // {
      //   title: "Dashboard Builder",
      //   icon: Graph,
      //   href: "/dashboard-builder",
      // },
      // {
      //   title: "Live Dashboard",
      //   icon: Monitor,
      //   href: "/live-dashboard",
      // },
    ],
    module: [
      {
        title: "Apps",
        icon: Application,
        href: "/apps",
      },
      // {
      //   title: "DataViz Pro",
      //   icon: DashBoard,
      //   child: [
      //     {
      //       title: "Data Manager",
      //       icon: ListFill,
      //       href: "/data-manager",
      //     },
      //     {
      //       title: "Dashboard Builder",
      //       icon: Graph,
      //       href: "/dashboard-builder",
      //     },
      //     {
      //       title: "Live Dashboard",
      //       icon: Monitor,
      //       href: "/live-dashboard",
      //     },
      //   ],
      // },
    ],
  },
};
