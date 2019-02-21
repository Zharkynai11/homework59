import React, {Component} from 'react';
import './Post.css';

class Post extends Component {
      shouldComponentUpdate(nextProps, nextState) {
        console.log('[Post] ShouldUpdate');
        return nextProps.value !== this.props.value || 
               nextProps.category !== this.props.category;
      }
  render() {
    return (
      <article className="Post">
        
        <textarea className='text' name="text" defaultValue={this.props.value} onChange={this.props.change}></textarea>
        <button className='close'  onClick = {() =>this.props.del_post(this.props.post)}>X</button>
        <div className="Info">
          <div className="category">{this.props.category}</div>
        </div>
        
      </article>
    );
  }
}
export default Post;