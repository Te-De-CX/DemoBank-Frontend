/* ─────────────────────────────────────────────────────────────────────
   toast.tsx  –  DigiBank toast primitives
   ───────────────────────────────────────────────────────────────────── */
   "use client";

   import * as React from "react";
   import * as ToastPrimitives from "@radix-ui/react-toast";
   import { cva, type VariantProps } from "class-variance-authority";
   import { X, CheckCircle2, AlertTriangle, Info } from "lucide-react";
   import { cn } from "@/lib/utils";
   
   const ToastProvider = ToastPrimitives.Provider;
   
   const ToastViewport = React.forwardRef<
     React.ElementRef<typeof ToastPrimitives.Viewport>,
     React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
   >(({ className, ...props }, ref) => (
     <ToastPrimitives.Viewport
       ref={ref}
       className={cn(
         "fixed bottom-5 right-5 z-[200] flex flex-col gap-2 w-[360px] max-w-[calc(100vw-2rem)]",
         className
       )}
       {...props}
     />
   ));
   ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
   
   const toastVariants = cva(
     [
       "group pointer-events-auto relative flex w-full items-start gap-3.5",
       "overflow-hidden rounded-2xl border px-5 py-4",
       "shadow-[0_16px_48px_rgba(0,0,0,0.5)] backdrop-blur-xl",
       "transition-all duration-300",
       "data-[state=open]:animate-in data-[state=open]:slide-in-from-right-full data-[state=open]:fade-in-80",
       "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full data-[state=closed]:fade-out-80",
       "data-[swipe=end]:animate-out data-[swipe=end]:slide-out-to-right-full",
       "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
       "data-[swipe=cancel]:translate-x-0",
     ],
     {
       variants: {
         variant: {
           default:
             "bg-[#1C1C2E]/90 border-white/8 text-white",
           destructive:
             "bg-[#1A0A0A]/90 border-red-500/20 text-white",
           success:
             "bg-[#0A1A12]/90 border-[#5CF0B0]/20 text-white",
         },
       },
       defaultVariants: { variant: "default" },
     }
   );
   
   const ICONS = {
     default: { Icon: Info, color: "text-white/50", bg: "bg-white/10" },
     destructive: { Icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/15" },
     success: { Icon: CheckCircle2, color: "text-[#5CF0B0]", bg: "bg-[#5CF0B0]/15" },
   };
   
   /* Accent bar on the left edge */
   const ACCENT = {
     default: "bg-white/20",
     destructive: "bg-red-500",
     success: "bg-[#5CF0B0]",
   };
   
   const Toast = React.forwardRef<
     React.ElementRef<typeof ToastPrimitives.Root>,
     React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
       VariantProps<typeof toastVariants>
   >(({ className, variant = "default", children, ...props }, ref) => {
     const { Icon, color, bg } = ICONS[variant ?? "default"];
     const accent = ACCENT[variant ?? "default"];
   
     return (
       <ToastPrimitives.Root
         ref={ref}
         className={cn(toastVariants({ variant }), className)}
         {...props}
       >
         {/* Left accent bar */}
         <div className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full ${accent}`} />
   
         {/* Icon */}
         <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${bg}`}>
           <Icon className={`h-4 w-4 ${color}`} />
         </div>
   
         {/* Content */}
         <div className="flex-1 min-w-0 pl-0.5">{children}</div>
   
         {/* Close */}
         <ToastClose />
       </ToastPrimitives.Root>
     );
   });
   Toast.displayName = ToastPrimitives.Root.displayName;
   
   const ToastAction = React.forwardRef<
     React.ElementRef<typeof ToastPrimitives.Action>,
     React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
   >(({ className, ...props }, ref) => (
     <ToastPrimitives.Action
       ref={ref}
       className={cn(
         "mt-2 inline-flex h-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 text-[12px] font-semibold text-white/70 transition-colors hover:bg-white/10 focus:outline-none",
         className
       )}
       {...props}
     />
   ));
   ToastAction.displayName = ToastPrimitives.Action.displayName;
   
   const ToastClose = React.forwardRef<
     React.ElementRef<typeof ToastPrimitives.Close>,
     React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
   >(({ className, ...props }, ref) => (
     <ToastPrimitives.Close
       ref={ref}
       className={cn(
         "shrink-0 self-start mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center",
         "text-white/20 hover:text-white/60 transition-colors",
         "opacity-0 group-hover:opacity-100 focus:opacity-100",
         className
       )}
       toast-close=""
       {...props}
     >
       <X className="h-3.5 w-3.5" />
     </ToastPrimitives.Close>
   ));
   ToastClose.displayName = ToastPrimitives.Close.displayName;
   
   const ToastTitle = React.forwardRef<
     React.ElementRef<typeof ToastPrimitives.Title>,
     React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
   >(({ className, ...props }, ref) => (
     <ToastPrimitives.Title
       ref={ref}
       className={cn("text-[14px] font-bold text-white tracking-tight leading-snug", className)}
       {...props}
     />
   ));
   ToastTitle.displayName = ToastPrimitives.Title.displayName;
   
   const ToastDescription = React.forwardRef<
     React.ElementRef<typeof ToastPrimitives.Description>,
     React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
   >(({ className, ...props }, ref) => (
     <ToastPrimitives.Description
       ref={ref}
       className={cn("text-[12px] text-white/45 mt-0.5 leading-relaxed", className)}
       {...props}
     />
   ));
   ToastDescription.displayName = ToastPrimitives.Description.displayName;
   
   type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
   type ToastActionElement = React.ReactElement<typeof ToastAction>;
   
   export {
     type ToastProps,
     type ToastActionElement,
     ToastProvider,
     ToastViewport,
     Toast,
     ToastTitle,
     ToastDescription,
     ToastClose,
     ToastAction,
   };
   
   
