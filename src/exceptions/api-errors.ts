export class ApiError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static BadRequest(message: string) {
    return new ApiError(400, message);
  }
}