import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export interface EnhancedTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

const EnhancedTextarea = React.forwardRef<
  HTMLTextAreaElement,
  EnhancedTextareaProps
>(({ className, autoResize = true, value, onChange, ...props }, ref) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Combine refs
  React.useImperativeHandle(ref, () => textareaRef.current!);

  // Auto-resize functionality
  React.useEffect(() => {
    if (!autoResize || !textareaRef.current) return;

    const textarea = textareaRef.current;
    const adjustHeight = () => {
      textarea.style.height = "auto";
      const newHeight = Math.min(Math.max(textarea.scrollHeight, 80), 300); // min 80px, max 300px
      textarea.style.height = `${newHeight}px`;
    };

    adjustHeight();
  }, [value, autoResize]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="relative">
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
});

EnhancedTextarea.displayName = "EnhancedTextarea";

export { Textarea, EnhancedTextarea };
