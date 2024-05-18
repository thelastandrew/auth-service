export enum HTTP_STATUSES {
  OK_200 = 200,
  CREATED_201 = 201,
  NO_CONTENT_204 = 204,

  BAD_REQUEST_400 = 400,
  UNAUTHORIZED_401 = 401,
  NOT_FOUND_404 = 404,

  UNEXPECTED_500 = 500,
}

export enum ROUTES {
  REGISTRATION = '/registration',
  LOGIN = '/login',
  LOGOUT = '/logout',
  REFRESH = '/refresh',
  USERS = '/users',
}
