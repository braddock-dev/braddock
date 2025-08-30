"use client";

import * as React from "react";
import { ChartContainer, ChartContainerProps } from "recharts";

import { cn } from "@/lib/utils";

export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

export function Chart({ className, children, ...props }: ChartContainerProps) {
  return (
    <ChartContainer className={cn("h-full w-full", className)} {...props}>
      {children}
    </ChartContainer>
  );
}

export function ChartTooltip({ className, children, ...props }: React.ComponentProps<typeof ChartContainer>) {
  return (
    <ChartContainer className={cn("h-full w-full", className)} {...props}>
      {children}
    </ChartContainer>
  );
}

export function ChartTooltipContent({
  className,
  label,
  hideLabel = false,
  hideIndicator = false,
  indicator = "line",
  payload,
  nameKey = "name",
  labelKey = "label",
  ...props
}: {
  label: string;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "line" | "dot" | "dashed";
  payload: {
    name: string;
    value: number;
    fill: string;
  }[];
  nameKey?: string;
  labelKey?: string;
} & React.ComponentProps<"div">) {
  const tooltipLabel = hideLabel ? null : <div className="font-medium">{label}</div>;

  if (!payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl transition-all ease-in-out hover:-translate-y-0.5",
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const indicatorColor = item.fill;

          return (
            <div
              key={index}
              className={cn(
                "[&>svg]:text-muted-foreground flex w-full items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center"
              )}
            >
              <>
                {!hideIndicator && (
                  <div
                    className={cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", {
                      "h-2.5 w-2.5": indicator === "dot",
                      "w-1": indicator === "line",
                      "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                      "my-0.5": nestLabel && indicator === "dashed",
                    })}
                    style={
                      {
                        "--color-bg": indicatorColor,
                        "--color-border": indicatorColor,
                      } as React.CSSProperties
                    }
                  />
                )}
                <div className={cn("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center")}>
                  <div className="grid gap-1.5">
                    {nestLabel ? tooltipLabel : null}
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-foreground font-mono font-medium tabular-nums">{item.value.toLocaleString()}</span>
                </div>
              </>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ChartLegend({ className, children, ...props }: React.ComponentProps<typeof ChartContainer>) {
  return (
    <ChartContainer className={cn("h-full w-full", className)} {...props}>
      {children}
    </ChartContainer>
  );
}

export function ChartLegendContent({
  className,
  payload,
  nameKey = "name",
  ...props
}: {
  payload: {
    name: string;
    fill: string;
  }[];
  nameKey?: string;
} & React.ComponentProps<"div">) {
  if (!payload?.length) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)} {...props}>
      {payload.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
          <span className="text-sm text-muted-foreground">{item.name}</span>
        </div>
      ))}
    </div>
  );
}
