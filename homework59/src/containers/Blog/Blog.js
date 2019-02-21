import React, {Component, Fragment} from 'react';
import './Blog.css';
import Post from "../Post/Post";
import { isString } from 'util';
class Blog extends Component {
    state = {
        posts: [],
        postsFormShown: false
      };
      togglePostsForm = () => {
        this.setState(prevState => {
          return {postsFormShown: !prevState.postsFormShown};
        });
      };
      constructor(props) {
        super(props);
      }
    
      componentDidMount() {
        if (!this.load()){
        const P_URL = 'https://api.chucknorris.io/jokes/random';

        var m =[];
        for (var i=0;i<4;i++)
        {
        m.push(fetch(P_URL).then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Something went wrong with network request');
        }));
        }
        let updatedPosts = [];

        for (var u of m)
        {
            u.then(posts => {
                updatedPosts.push(posts);
                this.setState({posts: updatedPosts});
                this.save(updatedPosts);
            });
        }
        //Почему тут updatedPosts пустой?
    }
    }
             
    add_post = () => {
        const P_URL = 'https://api.chucknorris.io/jokes/random';
        var m = fetch(P_URL).then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Something went wrong with network request');
          });
          m.then(posts => {
            let newPosts = this.state.posts;
            newPosts.push(posts);
            this.setState({posts: newPosts});
            this.save(newPosts);
        });
    }
    del_post = (post) => {
        let newPosts = this.state.posts;
        newPosts.splice(newPosts.indexOf(post),1);
        this.setState({posts: newPosts});
        this.save(newPosts);
        

    }
    change_post = (e) => {
        let newPosts = this.state.posts;
        for (var i=0;i<newPosts.length; i++){
            if (newPosts[i].value == e.target.defaultValue){
                newPosts[i].value = e.target.value;
            }
        }
        this.setState({posts: newPosts});
        this.save(newPosts);
    }

    save = (posts) =>{
        localStorage.clear();
        let ct;
        if (posts.length==0) return 0;
        for (let i=0;i<posts.length;i++){
            localStorage.setItem('id',localStorage.getItem('id')+' '+posts[i].id)
            localStorage.setItem(posts[i].id+'-value',posts[i].value)
            if (posts[i].category==null) ct = '';
            else ct=posts[i].category;
            localStorage.setItem(posts[i].id+'-category',ct)
        }
        localStorage.setItem('id',localStorage.getItem('id').replace('null ',''));
    }
   
    load = () => {
        try {
        for (let i of localStorage.getItem('id').split(' ')){
            this.state.posts.push({id: i, value : localStorage.getItem(i+'-value'), category: localStorage.getItem(i+'-category')});
        }
        this.setState(this.state.posts);
        return true;
    }
    catch (err) {
        return false;
    }
    }

      render() {
        let postsForm = null;
    
        if (this.state.postsFormShown) {
          postsForm = (
            <section className="NewPost">
              <p>New post form will be here</p>
            </section>
          );
        }
    
        return (
          <Fragment>
            <section className="Posts">
              {this.state.posts.map(post => (
                <Post key={post.id} value={post.value} category={post.category} post={post} del_post= {this.del_post} change={this.change_post}/>
              ))}
            </section>
            <button className="ToggleButton" onClick={this.add_post}>
              New post
            </button>
            {postsForm}
          </Fragment>
        )
      }
}

export default Blog;