"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect if the current device size is equal or lower than the specified breakpoint.
 * @param breakpoint The breakpoint to check.
 * @returns An object with `isDeviceSize` as true if the current device size satisfies the specified breakpoint and `isDeviceSizeInLandscape` as true if the current device size satisfies the specified breakpoint but in landscape mode.
 * @example
 * const isMobile = useIsDeviceSize($screen-sm-min);
 * const isTablet = useIsDeviceSize($screen-md-min);
 */
export const useIsDeviceSize = (breakpoint: string) => {
  const [isDeviceSize, setIsDeviceSize] = useState<boolean>(false);
  const [isDeviceSizeInLandscape, setIsDeviceSizeInLandscape] =
    useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: calc(${breakpoint} - 1px))`,
    );
    const landscapeMediaQuery = window.matchMedia(
      `(max-height: calc(${breakpoint} - 1px)) and (orientation: landscape)`,
    );

    const listener = () => {
      setIsDeviceSize(mediaQuery.matches);
    };
    mediaQuery.addEventListener("change", listener, { passive: true });
    listener();

    const landscapeListener = () => {
      setIsDeviceSizeInLandscape(landscapeMediaQuery.matches);
    };
    landscapeMediaQuery.addEventListener("change", landscapeListener, {
      passive: true,
    });
    landscapeListener();

    return () => {
      mediaQuery.removeEventListener("change", listener);
      landscapeMediaQuery.removeEventListener("change", landscapeListener);
    };
  }, [breakpoint]);

  return { isDeviceSize, isDeviceSizeInLandscape };
};
