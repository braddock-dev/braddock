"use client";

import { useEffect } from "react";
import styles from "./ResponsivenessProvider.module.scss";
import { useIsDeviceSize } from "@/app/utils/CustomHooks";
import {
  responsivenessActions,
  ResponsivenessType,
  useResponsiveness,
} from "@/app/store/responsivenessStore";

const mobileBreakpoint = styles["screen-sm-min"];
const smallTabletBreakpoint = styles["screen-md-min"];
const tabletBreakpoint = styles["screen-lg-min"];
const largeTabletBreakpoint = styles["screen-xl-min"];

const ResponsivenessProvider = (props: { children: React.ReactNode }) => {
  const isMobile = useIsDeviceSize(mobileBreakpoint);
  const isSmallTablet = useIsDeviceSize(smallTabletBreakpoint);
  const isTablet = useIsDeviceSize(tabletBreakpoint);
  const isLargeTablet = useIsDeviceSize(largeTabletBreakpoint);

  const setTypeScreen = useResponsiveness(responsivenessActions.setTypeScreen);
  const setTypeScreenLandscape = useResponsiveness(
    responsivenessActions.setTypeScreenLandscape,
  );

  useEffect(() => {
    //  Note: This conditions order is important
    if (isMobile.isDeviceSize) {
      saveIsMobileSetting(ResponsivenessType.MOBILE);
      return;
    }
    if (isSmallTablet.isDeviceSize) {
      saveIsMobileSetting(ResponsivenessType.SMALL_TABLET);
      return;
    }
    if (isTablet.isDeviceSize) {
      saveIsMobileSetting(ResponsivenessType.TABLET);
      return;
    }
    if (isLargeTablet.isDeviceSize) {
      saveIsMobileSetting(ResponsivenessType.LARGE_TABLET);
      return;
    }

    saveIsMobileSetting(ResponsivenessType.DESKTOP);
  }, [
    isMobile.isDeviceSize,
    isSmallTablet.isDeviceSize,
    isTablet.isDeviceSize,
    isLargeTablet.isDeviceSize,
  ]);

  useEffect(() => {
    if (isMobile.isDeviceSizeInLandscape) {
      saveIsMobileSettingLandscape(ResponsivenessType.MOBILE);
      return;
    }

    saveIsMobileSettingLandscape(undefined);
  }, [isMobile.isDeviceSizeInLandscape]);

  const saveIsMobileSetting = (type: ResponsivenessType) => {
    setTypeScreen(type);
  };

  const saveIsMobileSettingLandscape = (
    type: ResponsivenessType | undefined,
  ) => {
    setTypeScreenLandscape(type);
  };

  return <>{props.children}</>;
};

export default ResponsivenessProvider;
