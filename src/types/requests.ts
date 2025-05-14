//export enum RequestStatus {
//  IDLE = "idle",
//  PENDING = "pending",
//  SUCCESS = "success",
//  ERROR = "error"
//}

export const RequestStatus = {
  IDLE: "idle",
  PENDING: "pending",
  SUCCESS: "success",
  ERROR: "error"
} as const;

export type RequestStatusType = (typeof RequestStatus)[keyof typeof RequestStatus];

export type ErrorPayload = {
  message: string;
};

export interface AxiosOptions {
  accessToken?: string;
  baseURL?: string;
}
