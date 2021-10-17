import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[], postsCount: number }>();

  constructor(private httpClient: HttpClient, private router: Router){

  }

  getPosts(postsPerPage: number, currentPage: number){
    //return [...this.posts];
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    console.log(queryParams);
    this.httpClient
      .get<{message: string, posts: any, maxPosts: number}>('http://localhost:3000/api/posts'+queryParams)
      .pipe(
        map(postData => {
        return {
          posts: postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath
            }
          }),
          maxPosts: postData.maxPosts
        };
      }))
      .subscribe((transformedPostsData) => {
        this.posts = transformedPostsData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postsCount: transformedPostsData.maxPosts
        });
      });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  getPost(id: string){
    return this.httpClient.get<{_id: string, title: string, content: string, imagePath: string}>('http://localhost:3000/api/posts/'+id);

  }

  addPost(title: string, content: string, image: File){
    const postData = new FormData();
    postData.append("title",title);
    postData.append("content", content);
    postData.append("image", image, title);

    this.httpClient.post<{message: string, post: Post}>('http://localhost:3000/api/posts',postData).subscribe((responseData) =>{
      this.router.navigate(["/"])
    });
  }

  updatePost(id: string, title: string, content: string, image: File | string){
    let postData: Post | FormData;
    if (typeof(image) === 'object') {
      postData = new FormData();
      postData.append("id",id);
      postData.append("title",title);
      postData.append("content", content);
      postData.append("image", image, title);
    }
    else{
      postData = { id: id, title: title, content: content, imagePath: image };
    }
    this.httpClient.put<{message: string, postId: string}>('http://localhost:3000/api/posts/'+id,postData)
      .subscribe((response) =>{
        console.log("Updated!" + id)
        this.router.navigate(["/"])
    });
  }

  deletePost(postId: string){
    console.log("PostService deletePost " + postId)
    return this.httpClient.delete("http://localhost:3000/api/posts/" + postId);
  }

}


