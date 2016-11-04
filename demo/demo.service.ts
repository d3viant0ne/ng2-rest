import {Injectable} from '@angular/core';
import {Http, Request, Response} from '@angular/http';
import {RESTClient, BaseUrl, DefaultHeaders, GET, POST, Body, Query, Produces, MediaType} from '../src/rest.module';
import {Observable} from 'rxjs/Observable';

// https://github.com/typicode/jsonplaceholder#how-to

@Injectable()
@BaseUrl('https://jsonplaceholder.typicode.com')
@DefaultHeaders({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})
export class DemoService extends RESTClient {

  constructor(protected http: Http) {super(http)}

  protected requestInterceptor(req: Request) {
    // if (SessionFactory.getInstance().isAuthenticated) {
    //   req.headers.append('jwt', SessionFactory.getInstance().credentials.jwt);
    // }
  }

  protected responseInterceptor(res: Observable<Response>): Observable<Response> {
    // do sg with responses
    return res
  }

  @GET('/posts')
  @Produces<Post[]>(res => <Post[]>res.json())
  public getPosts(@Query('userId') userId?: number): Observable<Post[]> {
    return null;
  }

  @POST('/posts')
  // @Produces(MediaType.JSON)
  public createPost(@Body post: Post): Observable<Response> {
    return null;
  }
}

export class Post {

  constructor(
    public userId: number,
    public title: string,
    public body: string,
    public id?: number
  ) {}
}
