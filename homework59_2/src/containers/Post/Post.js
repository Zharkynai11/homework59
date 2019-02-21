import React, {Component} from 'react';
import './Post.css';

class Post extends Component {
      shouldComponentUpdate(nextProps, nextState) {
        console.log('[Post] ShouldUpdate');
        return nextProps.title !== this.props.title
      }
  render() {
    return (
      <article className="Post">
        
        <textarea className='text' ref="Film" name="text" defaultValue={this.props.title} onChange={this.props.change}></textarea>
        <button className='close'  onClick = {() =>this.props.del_post(this.props.post)}>X</button>
        
      </article>
    );
  }
}
export default Post;