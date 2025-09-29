import { ComponentPropsWithoutRef } from "react";

type ButtonProps = {
  variant?: "solid" | "ghost";
} & ComponentPropsWithoutRef<"button">;

function Button({
  className = "",
  variant = "solid",
  type = "button",
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition";
  const variants = {
    solid: "bg-black text-white hover:bg-[var(--brand-muted)]",
    ghost: "border border-black/10 bg-[var(--brand-surface)] text-[var(--brand-ink)] hover:border-black/30 hover:bg-white",
  } as const;

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`.trim()}
      {...props}
    />
  );
}

export default Button;
export type { ButtonProps };
