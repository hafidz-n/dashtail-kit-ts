"use client";
import React from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { deleteProjectAction } from "@/action/project-action";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
} from "@/components/ui/avatar";
import { Icon } from "@iconify/react";
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";

const prioritiesColorMap = {
  high: "destructive",
  low: "info",
  medium: "warning",
};
import { useTheme } from "next-themes";
const ProjectGrid = ({ project, onEdit }: any) => {
  const [open, setOpen] = React.useState(false);
  async function onAction(id: any) {
    await deleteProjectAction(id);
  }
  const { theme: mode } = useTheme();

  return (
    <>
      <DeleteConfirmationDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onAction(project?.id)}
      />
      <Card>
        <CardHeader className="flex-row items-center gap-3 border-none mb-0">
          <div className="flex-1">
            <Avatar className="rounded h-12 w-12">
              <AvatarImage src={project?.logo?.src} alt="" />
              <AvatarFallback className="rounded uppercase bg-success/30 text-success">
                {project?.title?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className="flex-none h-6 w-6 bg-default-200 rounded-full hover:bg-default-300"
              >
                <MoreHorizontal className="h-4 w-4 text-default-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[196px]" align="end">
              <DropdownMenuItem className="cursor-pointer">
                <Link
                  href={{
                    pathname: `apps/${project?.id}`,
                  }}
                  className="w-full"
                >
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => setOpen(true)}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
              >
                Duplicate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="p-4 pt-0 pb-5">
          <Link
            href={{
              pathname: `apps/${project?.id}/overview`,
            }}
          >
            <div>
              <div className="text-sm font-semibold text-default-900 capitalize mb-1">
                {project?.title}
              </div>
              {project?.description && (
                <div className="text-xs text-default-500 max-h-[34px] overflow-hidden">
                  {project?.description}
                </div>
              )}
            </div>
          </Link>
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectGrid;
