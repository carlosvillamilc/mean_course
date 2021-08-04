import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model'
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdate = new Subject<Post[]>();

  constructor(private httpClient: HttpClient){

  }

  getPost(){
    //return [...this.posts];
    this.httpClient.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts').subscribe((postData) => {
      this.posts = postData.posts
      this.postsUpdate.next([...this.posts]);
    });
  }

  getPostUpdateListener(){
    return this.postsUpdate.asObservable();
  }

  addPost(title: string, content: string){
    const post: Post = {
      id: null,
      title: title,
      content: content
    }
    this.httpClient.post<{message: string}>('http://localhost:3000/api/posts',post).subscribe((responseData) =>{
      console.log(responseData.message);
      this.posts.push(post);
      this.postsUpdate.next([...this.posts]);
    });
  }
}
