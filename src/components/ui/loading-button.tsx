import React from "react";
import { VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { Button, buttonVariants } from "./button";
import { cn } from "@/lib/utils";

export type LoadingButtonProps = {
  loading?: boolean;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export default function LoadingButton({
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={disabled || loading}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {loading && <Loader2 className="size-5 animate-spin" />}
      {props.children}
    </Button>
  );
}
