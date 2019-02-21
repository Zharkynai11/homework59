import React, {Component, Fragment} from 'react';
import './Blog.css';
import Post from "../Post/Post";
import { isString } from 'util';

let films = [
  {title: "Темное зеркало", id:1},{title: "Джеки и Я", id:2},{title: "Комбой", id:3},
  {title: "Титаник", id:4},{title: "Астрал", id:5},{title: "Вера", id:6},
  {title: "Мэри, где же ты была всю ночь?", id:7},{title: "Древа жизни", id:8},
  {title: "Лицом к лицу", id:9},{title: "Отпуск по обмену", id:10}

]

class Blog extends Component {
    state = {
        posts: [],
        postsFormShown: false,
        film: ""
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
        if (!this.load()) this.setState({posts: films});      
        else this.save(this.state.posts);
    }
    
             
    add_post = () => {
        this.state.posts.push({title: this.state.film, id: this.get_id()});
        this.setState({posts : this.state.posts});
        this.save(this.state.posts);
        /*const P_URL = 'http://kinoinfo.ru/api/film/';
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
        });*/
    }
    is_busy = (num) => {
      for (let i of this.state.posts){
        if (num==i.id) return true;
      }
      return false;
    }
    get_id = () => {
      for (let res=1;res<this.state.posts.length;res++)
      {
          if (!this.is_busy(res)) return res;
      }
      return this.state.posts.length+1;
    }
    change_input = (e) => {
        this.setState({film : e.target.value });
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
            if (newPosts[i].title == e.target.defaultValue){
                newPosts[i].title = e.target.value;
            }
        }
        this.setState({posts: newPosts});
        this.save(newPosts);
    }

    save = (posts) =>{
        localStorage.clear();
        if (posts.length==0) return 0;
        for (let i=0;i<posts.length;i++){
            localStorage.setItem('id',localStorage.getItem('id')+' '+posts[i].id);
            localStorage.setItem(posts[i].id+'-title',posts[i].title);
        }
        localStorage.setItem('id',localStorage.getItem('id').replace('null ',''));
        for (var key in localStorage) {
          console.log(key + ':' + localStorage[key]);
        }
    }
   
    load = () => {
        try {
          let newPosts=[];
        for (let i of localStorage.getItem('id').split(' ')){
          newPosts.push({id: i, title : localStorage.getItem(i+'-title')});
        }
        this.setState({posts: newPosts});
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
            <input onChange={this.change_input}></input>
            <button className="ToggleButton" onClick={this.add_post}>New post</button>
              {this.state.posts.map(post => (
                <Post key={post.id} title={post.title} post={post} del_post= {this.del_post} change={this.change_post}/>
              ))}
            </section>
            {postsForm}
          </Fragment>
        )
      }
}

export default Blog;