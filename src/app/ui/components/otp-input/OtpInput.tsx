"use client";
import { OTPInput, SlotProps } from "input-otp";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface IOTPStepProps {
  onComplete: (...args: any[]) => void;
  disabled?: boolean;
  value?: string;
  onChange?: (...args: any[]) => void;
}
export function OtpInput(props: IOTPStepProps) {
  return (
    <OTPInput
      maxLength={4}
      containerClassName="group flex items-center has-[:disabled]:opacity-30"
      onComplete={props.onComplete}
      disabled={props.disabled}
      autoFocus
      value={props.value}
      onChange={props.onChange}
      render={({ slots }) => (
        <>
          <div className="flex">
            {slots.slice(0, 2).map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>

          <FakeDash />

          <div className="flex">
            {slots.slice(2).map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        </>
      )}
    />
  );
}

// Feel free to copy. Uses @shadcn/ui tailwind colors.
function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative w-10 h-14 text-[2rem]",
        "flex items-center justify-center",
        "transition-all duration-300",
        "border-border border-y border-r first:border-l first:rounded-l-md last:rounded-r-md",
        "group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20",
        "outline outline-0 outline-accent-foreground/20",
        { "outline-4 outline-white": props.isActive },
      )}
    >
      {props.char !== null && <div className={"text-white"}>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

// You can emulate a fake textbox caret!
function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
      <div className="w-px h-8 bg-white" />
    </div>
  );
}

// Inspired by Stripe's MFA input.
function FakeDash() {
  return (
    <div className="flex w-10 justify-center items-center">
      <div className="w-3 h-1 rounded-full bg-white" />
    </div>
  );
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
