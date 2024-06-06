"use client";

import {
  networkOptions,
  useNetworkUtils,
} from "@/components/shared/wallet/hooks/use-network-utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { ElementType, PropsWithChildren, forwardRef } from "react";
import * as React from "react";

type YetAnotherSelectTriggerProps = {
  Component?: ElementType;
  className?: string;
} & PropsWithChildren &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const YetAnotherSelectTrigger = forwardRef<
  HTMLButtonElement,
  YetAnotherSelectTriggerProps
>(({ children, Component = SelectTrigger, className }, ref) => {
  return (
    <Component ref={ref} className={cn("w-[108px] capitalize", className)}>
      {children}
    </Component>
  );
});
YetAnotherSelectTrigger.displayName = "YetAnotherSelectTrigger";

const _SelectNetwork = () => {
  const { network, setSepolia, setMainnet, setAnvil, setMadara } =
    useNetworkUtils();
  function handleValueChange(value: string) {
    switch (value) {
      case "mainnet":
        setMainnet();
        break;
      case "sepolia":
        setSepolia();
        break;
      case "anvil":
        setAnvil();
        break;
      case "madara":
        setMadara();
        break;
      default:
        setMainnet();
        break;
    }
  }

  return (
    <Select defaultValue={network} onValueChange={handleValueChange}>
      <YetAnotherSelectTrigger>
        <SelectValue placeholder={network} />
      </YetAnotherSelectTrigger>
      <SelectContent>
        <SelectGroup defaultValue={network}>
          {networkOptions.map((option) => (
            <SelectItem className={"capitalize"} key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default _SelectNetwork;

export const SelectNetwork = dynamic(
  () => import("@/components/shared/wallet/select-network"),
  {
    ssr: false,
    loading: () => (
      <Select>
        <YetAnotherSelectTrigger>
          <SelectValue placeholder={<Skeleton className={"h-2.5 w-12"} />} />
        </YetAnotherSelectTrigger>
      </Select>
    ),
  }
);
