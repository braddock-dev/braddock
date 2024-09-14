import React, { ReactNode, useState } from "react";
import {
  GoogleOAuthProvider,
  TokenResponse,
  useGoogleLogin,
} from "@react-oauth/google";
import { Constants } from "@/app/utils/Constants";
import Logger from "@/app/utils/Logger";

const LOG_TAG = "UI-GoogleLoginButton";

const ERRORS_MAP: Record<string, string> = {
  popup_closed: Constants.ERRORS.LOGIN.SOCIAL_POPUP_CLOSED,
};

interface IGoogleLoginButtonProps {
  children: ReactNode;
  hasLoadedLib?: boolean;
  className?: string;

  onSuccess?(responseData: TokenResponse): void;

  onError?(error?: string): void;
}

function AuthButtonWrapper(props: IGoogleLoginButtonProps) {
  const onLoginSuccess = (result: TokenResponse) => {
    Logger.debug(LOG_TAG, "Google successful login.", result);
    props.onSuccess && props.onSuccess(result);
  };

  const onOAuthFailure = (
    result: Pick<TokenResponse, "error" | "error_description" | "error_uri">,
  ) => {
    Logger.error(LOG_TAG, `Google OAuth failure: ${result?.error}`, result);
    props.onError && props.onError(result.error);
  };

  const onNonOAuthFailure = (error?: any) => {
    const errorConstant =
      ERRORS_MAP[error?.type] || Constants.ERRORS.GENERIC.UNKNOWN;
    Logger.error(
      LOG_TAG,
      `Google non-OAuth failure: ${error?.type}, ${errorConstant}`,
      error,
    );
    props.onError && props.onError(errorConstant);
  };

  const doGoogleLogin = useGoogleLogin({
    onSuccess: onLoginSuccess,
    onNonOAuthError: onNonOAuthFailure,
    onError: onOAuthFailure,
  });

  const startAuth = () => {
    if (props.hasLoadedLib === false) {
      Logger.error(LOG_TAG, "Google lib not loaded.");
      props.onError &&
        props.onError(Constants.ERRORS.LOGIN.SOCIAL_LIB_NOT_LOADED);
      return;
    }

    doGoogleLogin();
  };

  return (
    <div className={props.className} onClick={startAuth}>
      {props.children}
    </div>
  );
}

function GoogleButtonProvider(props: IGoogleLoginButtonProps) {
  const [googleLibLoaded, setGoogleLibLoaded] = useState(false);

  return (
    <GoogleOAuthProvider
      clientId={Constants.EXTERNAL_CONFIGS.GOOGLE_CLIENT_ID}
      onScriptLoadSuccess={() => setGoogleLibLoaded(true)}
    >
      <AuthButtonWrapper
        hasLoadedLib={googleLibLoaded}
        onSuccess={props.onSuccess}
        onError={props.onError}
        className={props.className}
      >
        {props.children}
      </AuthButtonWrapper>
    </GoogleOAuthProvider>
  );
}

export default React.memo(GoogleButtonProvider);
