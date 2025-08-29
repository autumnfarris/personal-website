"use client";

import { usePathname } from "next/navigation";
import TreeWithLeaves from "./TreeWithLeaves";

export default function AutumnLeavesConditional() {
  const pathname = usePathname();
  
  // Only show leaves on the Home page
  if (pathname !== "/") {
    return null;
  }
  
  return <TreeWithLeaves />;
}