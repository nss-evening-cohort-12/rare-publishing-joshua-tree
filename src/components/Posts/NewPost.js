import React from "react";
import './Posts.css';

import PostProvider from "./PostProvider";

class NewPost extends React.Component {
  state = {
    user_id: 0,
    title: '',
    content: '',
    category_id: 0,
    image_url: '',
    categories: [],
    selectedCategory: ''
  }

  componentDidMount() {
    fetch("http://localhost:8000/categories", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("rare_token")}`
      }
    })
    .then((response) => response.json())
    .then((res) => this.setState({ categories: res }))
  }

  componentDidUpdate() {
    if (this.state.selectedCategory !== '') {
      const value = this.state.selectedCategory;
      const newNum = parseInt(value)
      document.getElementById(newNum).style.backgroundColor = '#3498db';
    }
  }

  changeTitleEvent = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  changeContentEvent = (e) => {
    e.preventDefault();
    this.setState({ content: e.target.value });
  }

  changeImageEvent = (e) => {
    e.preventDefault();
    this.setState({ image_url: e.target.value });
  }

  onValueChange = (e) => {
    const value = e.target.id;
    this.setState({ selectedCategory: value });
    const boxes = document.getElementsByClassName('category-box');

    for (let i = 0; i < boxes.length; i++) {
      if (value === this.state.selectedCategory) {
        document.getElementById(value).style.backgroundColor = '#3498db';
      } else {
        boxes[i].style.backgroundColor = '#fff';
      }
    }
  }

  imageInputWatcher = (e) => {
    this.setState({ image_url: e.target.files[0] });
    console.warn(this.state.image_url)
  }

  savePost = async (e) => {
    e.preventDefault();
    const { title, content, image_url, selectedCategory } = this.state;
    const category = parseInt(selectedCategory);
    const user = parseInt(localStorage.getItem("rare_user_id"));

    // let form = document.getElementById('newPost')

    var formData = new FormData();
    formData.append('title', title);
    formData.append('content', content)
    formData.append('image_url', image_url, image_url.name)
    formData.append('approved', true)
    formData.append('rare_user', user)
    formData.append('category', category)


    // const newPost = {
    //   title,
    //   content,
    //   image_url,
    //   approved: true,
    //   rare_user: user,
    //   category: category
    // };

    await PostProvider.createPost(formData)

    PostProvider.getPosts()
      .then((response) => {
          this.props.history.push(`/posts/${response[0].id}`)
    })
  }

  render() {
    const { title, content, image_url, categories } = this.state;

    const categoryCards = categories.map((category) => 
      <div
        className="category-box boxes"
        id={category.id}
        key={category.id}
        onClick={this.onValueChange}
      >{category.label}
      </div>
    );

    return (
      <div className="container--login">
        <section>
          <form onSubmit={this.savePost} className="form--login" id="newPost" name="newPost" method="post" encType="multipart/form-data">
            <h1>Create a New Post</h1>
            <fieldset>
              <label htmlFor="postTitle">Name</label>
              <input value={title} onChange={this.changeTitleEvent} type="text" id="postTitle" className="form-control" placeholder="A Day In The Life" required autoFocus />
            </fieldset>
            <fieldset>
              <label htmlFor="postContent">Content</label>
              <textarea style={{height: '200px'}} name="message" rows="200" cols="20" value={content} onChange={this.changeContentEvent} type="text" id="postContent" className="form-control" placeholder="Today I went to the store..." required autoFocus />
            </fieldset>
              <label>Choose a category</label>
              {categoryCards}
            <fieldset className="custom-file">
              <input onChange={this.imageInputWatcher} type="file" className="custom-file-input" id="postImage" />
              <label className="custom-file-label" htmlFor="postImage" id="postImage">Choose Image</label>
            </fieldset>
              { /* <label htmlFor="postImage">Image URL (Optional)</label>
              <input value={image_url} onChange={this.changeImageEvent} type="text" id="postImage" className="form-control" placeholder="Paste image URL here" autoFocus /> */ }
            <fieldset style={{ textAlign:"center" }}>
              <button className="btn btn-1" type="submit">Post</button>
            </fieldset>
          </form>
        </section>
      </div>
    )
  }
}

export default NewPost;