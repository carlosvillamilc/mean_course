import { Component, EventEmitter, Output } from "@angular/core";
import { Post } from '../post.model'

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent{

  newPost = 'NO CONTENT';
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreated = new EventEmitter<Post>();
  onAddPost(){
    //alert('Post Added')
    const post: Post = {
      title : this.enteredTitle,
      content: this.enteredContent
    };
    this.postCreated.emit(post)
  }
  infoPost(){
    return 'InfoPost'
  }

}
