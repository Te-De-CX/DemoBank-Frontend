   /* ─────────────────────────────────────────────────────────────────────
      toaster.tsx  –  the global Toaster component
      ───────────────────────────────────────────────────────────────────── */
      import { useToast } from "@/components/ui/use-toast";
      import {
        Toast as T,
        // ToastClose as TC,
        ToastDescription as TD,
        ToastProvider as TP,
        ToastTitle as TT,
        ToastViewport as TV,
      } from "@/components/ui/toast";
      
      export function Toaster() {
        const { toasts } = useToast();
      
        return (
          <TP>
            {toasts.map(({ id, title, description, action, variant, ...props }) => (
              <T key={id} variant={variant} {...props}>
                <div>
                  {title && <TT>{title}</TT>}
                  {description && <TD>{description}</TD>}
                </div>
                {action}
              </T>
            ))}
            <TV />
          </TP>
        );
      }