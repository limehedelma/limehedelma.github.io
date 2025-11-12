"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Emil Vento",
    email: "limehedelma@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Limehedelma.com",
      logo: GalleryVerticalEnd,
      plan: "Portfolio",
    },
  ],
  navMain: [
      {
          title: "About Me",
          url: "#",
          icon: BookOpen,
      },
    {
      title: "Projects",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Soapbox Racing",
          url: "#",
        },
          {
              title: "Dank Sweeper",
              url: "#",
          },
        {
          title: "SAJL tulospalvelu",
          url: "#",
        },
          {
              title: "olli AI",
              url: "#",
          },
        {
          title: "Careeria 1989",
          url: "#",
        },
          {
              title: "Raccoon Loves Bubbles",
              url: "#",
          }
      ],
    },
      {
          title: "Contact",
          url: "#",
          icon: BookOpen,
          items: [
              {
                  title: "Gmail",
                  url: "#",
              },
              {
                  title: "Discord",
                  url: "#",
              },
              {
                  title: "Github",
                  url: "#",
              },
              {
                  title: "Itch.io",
                  url: "#",
              },
          ],
      },
  ],
    projects: [
        {
            title: "About Me",
            url: "#",
            icon: SquareTerminal,
        },
        {
            title: "Teams",
            url: "#",
            icon: Bot,
            isActive: true,
            items: [
                {
                    title: "Porvoon Butchers",
                    url: "#",
                },
                {
                    title: "Finland u17 National team",
                    url: "#",
                },
                {
                    title: "East City Giants u17",
                    url: "#",
                },
            ],
        },
        {
            title: "Acomplishments",
            url: "#",
            icon: BookOpen,
        },
        {
            title: " My Social Medias",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "Instagram",
                    url: "#",
                },
                {
                    title: "Tiktok",
                    url: "#",
                },
                {
                    title: "X",
                    url: "#",
                },
            ],
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects items={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
