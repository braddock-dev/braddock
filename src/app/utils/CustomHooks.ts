"use client";

import { RefObject, useEffect, useState } from "react";
import { getPageScrollPosition } from "@/app/utils/functions";

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

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = getPageScrollPosition();
      setScrollPosition(scrollPosition);
    };

    setScrollPosition(getPageScrollPosition());
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
};

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback: (e: MouseEvent) => void,
  exceptElement?: React.RefObject<HTMLElement>,
) => {
  function handleClickOutside(event: any) {
    if (
      ref &&
      ref.current &&
      !ref.current.contains(event.target) &&
      !exceptElement?.current?.contains(event.target || null)
    ) {
      callback(event);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });

    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
};
