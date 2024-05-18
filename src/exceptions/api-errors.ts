import { HTTP_STATUSES } from '../constants';

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors: any[] = []
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static BadRequest(message: string, errors: any[] = []) {
    return new ApiError(HTTP_STATUSES.BAD_REQUEST_400, message, errors);
  }

  static NotFound(message: string = 'Source not found') {
    return new ApiError(HTTP_STATUSES.NOT_FOUND_404, message);
  }

  static Unauthorized(message: string = 'Unauthoruzed') {
    return new ApiError(HTTP_STATUSES.UNAUTHORIZED_401, message);
  }
}
