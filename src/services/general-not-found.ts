import { ApiError } from '../exceptions';

export const notFound = () => {
  throw ApiError.NotFound();
}