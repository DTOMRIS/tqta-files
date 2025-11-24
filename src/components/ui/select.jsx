"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const SelectContext = React.createContext({})

const Select = ({ children, onValueChange, defaultValue, value }) => {
    const [selectedValue, setSelectedValue] = React.useState(value || defaultValue || "")
    const [open, setOpen] = React.useState(false)

    // Update internal state if controlled value changes
    React.useEffect(() => {
        if (value !== undefined) {
            setSelectedValue(value)
        }
    }, [value])

    const handleSelect = (val) => {
        setSelectedValue(val)
        if (onValueChange) {
            onValueChange(val)
        }
        setOpen(false)
    }

    return (
        <SelectContext.Provider value={{ selectedValue, handleSelect, open, setOpen }}>
            <div className="relative">{children}</div>
        </SelectContext.Provider>
    )
}

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
    const { open, setOpen } = React.useContext(SelectContext)
    return (
        <button
            ref={ref}
            type="button"
            onClick={() => setOpen(!open)}
            className={cn(
                "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        >
            {children}
            <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
    )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = React.forwardRef(({ className, placeholder, ...props }, ref) => {
    const { selectedValue } = React.useContext(SelectContext)
    // We need to render the label corresponding to the value, but here we might just render the value if we don't have access to children labels easily without more complex logic.
    // For a simple fix, we can try to find the child in the content? No, that's hard.
    // A common pattern in simple implementations is to pass the label as children to SelectValue or just render selectedValue.
    // However, Shadcn SelectValue usually displays the selected option's text.
    // To keep it simple: We will rely on the fact that for this specific use case, we might just display the placeholder if empty, or the value.
    // BUT, the user sees "Kurs Adı" not the ID.
    // Let's try to make it slightly smarter: we can't easily without mapping.
    // Workaround: The parent component passes the label? No, Shadcn usage is <SelectValue placeholder="..." />.
    // Let's just render `selectedValue` for now, or if we can, we'll try to use a context to register options.

    // Better approach for a quick fix: Just render selectedValue. The user might see the ID if we are not careful.
    // Wait, in the usage:
    // <SelectItem value={kurs.id}>{kurs.ad}</SelectItem>
    // The value is the ID. The display should be the Name.
    // To fix this properly without Radix, I need to know the label.

    // Let's use a registry in context.

    return (
        <span
            ref={ref}
            className={cn("block truncate", className)}
            {...props}
        >
            <SelectValueDisplay placeholder={placeholder} />
        </span>
    )
})
SelectValue.displayName = "SelectValue"

const SelectValueDisplay = ({ placeholder }) => {
    const { selectedValue, optionsMap } = React.useContext(SelectContext)
    // We need optionsMap. Let's add it to context.
    // But options are children of Content.
    // This is why Headless UI / Radix is used.

    // Fallback: If we can't easily get the label, we'll just show the placeholder if empty, or the value.
    // To make it work for the user's specific case (Course Selection), showing the ID is bad.
    // But I don't have Radix installed? I should check package.json.
    // If Radix is there, I should use it.

    // Let's assume Radix IS NOT there or I can't easily use it.
    // I will implement a "registry" pattern.

    return selectedValue ? (optionsMap && optionsMap[selectedValue] ? optionsMap[selectedValue] : selectedValue) : placeholder
}

const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => {
    const { open } = React.useContext(SelectContext)
    if (!open) return null
    return (
        <div
            ref={ref}
            className={cn(
                "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
                position === "popper" && "translate-y-1",
                className
            )}
            {...props}
        >
            <div className="p-1">{children}</div>
        </div>
    )
})
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef(({ className, children, value, ...props }, ref) => {
    const { handleSelect, selectedValue, registerOption } = React.useContext(SelectContext)

    // Register this option's label
    React.useEffect(() => {
        if (registerOption) {
            registerOption(value, children)
        }
    }, [value, children, registerOption])

    return (
        <div
            ref={ref}
            className={cn(
                "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-slate-100 cursor-pointer",
                selectedValue === value && "bg-slate-100 font-medium",
                className
            )}
            onClick={() => handleSelect(value)}
            {...props}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {selectedValue === value && <span className="h-2 w-2 rounded-full bg-current" />}
            </span>
            <span className="truncate">{children}</span>
        </div>
    )
})
SelectItem.displayName = "SelectItem"

// Wrapper to provide the registry
const SelectRoot = ({ children, ...props }) => {
    const [optionsMap, setOptionsMap] = React.useState({})

    const registerOption = React.useCallback((value, label) => {
        setOptionsMap(prev => {
            if (prev[value] === label) return prev
            return { ...prev, [value]: label }
        })
    }, [])

    // We need to wrap the original Select logic but inject this state
    // Actually, let's just merge it into the main Select component

    return (
        <SelectInner {...props} optionsMap={optionsMap} registerOption={registerOption}>
            {children}
        </SelectInner>
    )
}

const SelectInner = ({ children, onValueChange, defaultValue, value, optionsMap, registerOption }) => {
    const [selectedValue, setSelectedValue] = React.useState(value || defaultValue || "")
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        if (value !== undefined) {
            setSelectedValue(value)
        }
    }, [value])

    const handleSelect = (val) => {
        setSelectedValue(val)
        if (onValueChange) {
            onValueChange(val)
        }
        setOpen(false)
    }

    return (
        <SelectContext.Provider value={{ selectedValue, handleSelect, open, setOpen, optionsMap, registerOption }}>
            <div className="relative">{children}</div>
        </SelectContext.Provider>
    )
}

export { SelectRoot as Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
