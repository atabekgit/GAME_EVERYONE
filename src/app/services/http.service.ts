import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {forkJoin, map, Observable} from "rxjs";
import {environment as env} from 'src/environments/environment'
import {APIResponse, Game} from "../module";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getGameList(ordering: string, search?: string): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);
    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search)
    }
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    })
  }

  getGameDetail(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`)
    const gameTrRequest = this.http.get(`${env.BASE_URL}/games/${id}/movies`)
    const gameScRequest = this.http.get(`${env.BASE_URL}/games/${id}/screenshots`)
       return forkJoin({
         gameInfoRequest,
         gameTrRequest,
         gameScRequest
       }).pipe(map((resp:any)=>{
         return {
           ...resp["gameInfoRequest"],
           screenshots:resp["gameScRequest"]?.results,
           trailers:resp["gameTrRequest"]?.results,
         }
       }))
      }
}
