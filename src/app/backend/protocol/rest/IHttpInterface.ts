import { AxiosRequestConfig, AxiosResponse } from "axios";

export enum HttpMethods {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
  PATCH = "PATCH",
  HEAD = "HEAD",
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  NOT_ACCEPTABLE = 406,
  CONFLICT = 409,
  INTERNAL_ERROR = 500,
}

/**
 * Configures a request to be sent through the IHttpInterface.
 */
export interface IHttpRequestConfig extends AxiosRequestConfig {
  /**
   * The URL to which the request is to be sent.
   */
  url: string;

  /**
   * The HTTP method to use when sending the request.
   */
  httpMethod: HttpMethods;

  /**
   * Any data to be sent as the request's payload (in the body).
   */
  data?: any;

  /**
   * Setting this property to true can be used to avoid sending, in this particular request,
   * any authorization value (usually an "Authorization" header) previously set in the IHttpInterface.
   * Not setting this property is assumed as it being "false".
   */
  skipAuthentication?: boolean;

  headers?: any;
}

export type IHttpResponse = AxiosResponse;

interface IHttpInterface {
  send(request: IHttpRequestConfig): Promise<IHttpResponse>;
  setAuthorizationValue(authValue?: string): void;
  setRequestAuthorizationValue(request: IHttpRequestConfig, authValue?: string): void;
  setOutboundRequestInterceptor(interceptFn?: Function): void;
  setRequestSuccessInterceptor(interceptFn?: Function): void;
  setRequestErrorInterceptor(statusCodes: number[], interceptFn?: Function): void;
}

export default IHttpInterface;
