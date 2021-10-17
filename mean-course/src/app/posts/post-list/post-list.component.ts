import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from "rxjs";
import { Post } from '../post.model'
import { PostsService } from "../posts.service";

@Component({
  selector:'app-post-list',
  templateUrl:'./post-list.component.html',
  styleUrls:['./post-list.component.css']
})



export class PostListComponent implements OnInit, OnDestroy{
  /*posts = [
    {title: "First Post", content: "This is the first post content"},
    {title: "Second Post", content: "This is the second post content"},
    {title: "Third Post", content: "This is the third post content"}
  ]*/
  isLoading = false;

  //Mat Paginator Input
  totalPosts = 0;
  postsPerPage = 1;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];

  //Mat Paginator Output
  //pageData: PageEvent;

  posts: Post[] = [];
  private postsSub: Subscription;


  constructor(public postsService: PostsService) {

  }

  ngOnInit(){
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
    this.isLoading = true;
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((postData: {posts: Post[], postsCount: number } ) =>{
      this.posts = postData.posts;
      this.isLoading = false;
      this.totalPosts = postData.postsCount;
    });
  }

  onChangePage(pageData: PageEvent){
    console.log(pageData);
    this.isLoading = true;
    console.log("prev currentPage" + this.currentPage);
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    console.log( "actual currentPage" + this.currentPage);
    this.postsService.getPosts(this.postsPerPage,this.currentPage);

  }

  onDelete(postId: string){
    console.log("PostList onDelete " + postId)
    this.postsService.deletePost(postId).subscribe(()=>{
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });

  }
  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

}
