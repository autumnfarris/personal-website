"use client";

import { usePathname } from "next/navigation";
import AutumnLeaves from "./AutumnLeaves";

export default function AutumnLeavesConditional() {
  const pathname = usePathname();
  
  // Don't show leaves on the experience page
  if (pathname === "/experience") {
    return null;
  }
  
  return <AutumnLeaves />;
}