import type { AxiosError } from 'axios';

export function getErrorStatus(error: AxiosError) {
  let status: string = '';

  if (error.response) {
    status = error.response.status.toString();
  }
  else if (error.request) {
    status = (error.request as { [key: string]: unknown; status: number }).status.toString();
  }
  else if (error.status) {
    status = error.status.toString();
  }

  return status;
}
