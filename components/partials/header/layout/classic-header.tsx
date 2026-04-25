"use client";
import React from "react";
import { cn } from "@/lib/utils";

const ClassicHeader = ({ children, className }: any) => {
  return <header className={cn("z-50", className)}>{children}</header>;
};

export default ClassicHeader;
