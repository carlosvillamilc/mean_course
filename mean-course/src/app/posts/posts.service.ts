import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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
    this.httpClient
      .get<{message: string, posts: any}>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        })
      }))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
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
    this.httpClient.post<{message: string, postId: string}>('http://localhost:3000/api/posts',post).subscribe((responseData) =>{
      console.log(responseData.message);
      const id = responseData.postId;
      post.id = id;
      this.posts.push(post);
      this.postsUpdate.next([...this.posts]);
    });
  }

  deletePost(postId: string){
    console.log("PostService deletePost " + postId)
    this.httpClient.delete("http://localhost:3000/api/posts/" + postId)
    .subscribe(() => {
      console.log("Deleted!" + postId);
      const updatedPosts = this.posts.filter(post => post.id != postId);
      this.posts = updatedPosts;
      this.postsUpdate.next([...this.posts]);
    })
  }

}


