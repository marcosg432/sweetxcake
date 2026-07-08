import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-primary text-white hover:bg-primary-dark border border-transparent",
  secondary:
    "bg-background text-primary border border-primary hover:bg-primary hover:text-white",
  action: "bg-secondary text-white hover:bg-secondary-dark border border-transparent",
} as const;

type ButtonVariant = keyof typeof variants;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300";

type ButtonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick">;

export function Button({
  variant = "primary",
  className,
  children,
  href,
  target,
  rel,
  type = "button",
  onClick,
  ...props
}: ButtonProps) {
  const styles = cn(baseStyles, variants[variant], className);

  if (href) {
    return (
      <Link
        href={href}
        className={styles}
        target={target}
        rel={rel}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={styles}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      {...props}
    >
      {children}
    </button>
  );
}
