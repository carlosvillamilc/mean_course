import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Post } from '../post.model'
import { PostsService } from "../posts.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent{

  newPost = 'NO CONTENT';
  enteredTitle = '';
  enteredContent = '';
  //@Output() postCreated = new EventEmitter<Post>();

  constructor(public postsService: PostsService){

  }
  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }
    //alert('Post Added')
    /*const post: Post = {
      title : form.value.title,
      content: form.value.content
    };
    this.postCreated.emit(post);*/
    this.postsService.addPost(form.value.title,form.value.content);
    form.resetForm()

  }
  infoPost(){
    return 'InfoPost'
  }

}
