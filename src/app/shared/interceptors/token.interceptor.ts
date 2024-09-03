import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let newReq = req.clone({
    headers: req.headers.append(
      'token',
      localStorage.getItem('userToken') || ''
    ),
  });
  return next(newReq);
};
