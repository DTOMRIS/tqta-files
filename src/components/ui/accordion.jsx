"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const Accordion = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-1", className)} {...props} />
))
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("border-b", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
    <summary
        ref={ref}
        className={cn(
            "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline cursor-pointer list-none [&::-webkit-details-marker]:hidden group",
            className
        )}
        {...props}
    >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
    </summary>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "overflow-hidden text-sm pb-4 pt-0",
            className
        )}
        {...props}
    >
        {children}
    </div>
))
AccordionContent.displayName = "AccordionContent"

// Helper to combine them easily if needed, but usually used as:
// <AccordionItem>
//   <details>
//     <AccordionTrigger>Title</AccordionTrigger>
//     <AccordionContent>Content</AccordionContent>
//   </details>
// </AccordionItem>

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
