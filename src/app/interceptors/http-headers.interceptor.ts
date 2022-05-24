import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   req = req.clone({
     setHeaders:{
       'x-rapidapi-key': 'fd6ff034c5msh078d695068c9b7ep1f72edjsn32c830393402',
       'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
     },
     setParams:{
       key:'e40e743af2c94b0c916a8aa618fb4473'
     }
   });
   return next.handle(req)
  }

}
