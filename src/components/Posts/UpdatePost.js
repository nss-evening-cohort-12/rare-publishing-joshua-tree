import React from 'react';

class UpdatePost extends React.Component {
  state = {
    post: {
      title: '',
      content: '',
      category_id: 0,
      // category_name: '',
      image_url: ''
    },
    categories: [],
    selectedCategory: ''
  }


  componentDidMount() {
    Promise.all([
      fetch(`http://localhost:8088/posts/${this.props.match.params.postId}`),
      fetch(`http://localhost:8088/categories`)
    ]).then(function (responses) {
      return Promise.all(responses.map((response) => {
        return response.json();
      }));
    }).then((data) => {
      this.setState({ post: data[0], categories: data[1] });
    }).catch((error) => {
      console.error(error)
    })
  }


  changeTitleEvent = (e) => {
    e.preventDefault();
    const newPostTitle = Object.assign({}, this.state.post)        
    newPostTitle["title"] = e.target.value 
    this.setState({ post: newPostTitle });
  }

  changeContentEvent = (e) => {
    e.preventDefault();
    const newPostContent = Object.assign({}, this.state.post)        
    newPostContent["content"] = e.target.value 
    this.setState({ post: newPostContent });
  }

  categoryChangeEvent = (e) => {
    const value = e.target.value
    console.warn(value)
    const newPostCategory = Object.assign({}, this.state.post)        
    newPostCategory["category_id"] = e.target.value
    this.setState({ post: newPostCategory });
  }

  changeImgUrlEvent = (e) => {
    e.preventDefault();
    const newPostImg = Object.assign({}, this.state.post)        
    newPostImg["image_url"] = e.target.value 
    this.setState({ post: newPostImg });
  }

  updatePost = (e) => {
    e.preventDefault();

        return fetch(`http://localhost:8088/posts/${this.props.match.params.postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.post)
        })
            .then(() => this.props.history.push("/posts")) 
  }

  render() {
    const {
      title,
      content,
      category_id,
      image_url
    } = this.state.post;
    const {
      categories
    } = this.state
    

    const dropdown = categories.map((category) => <option value={category.id} text={category.category_name} key={category.id}>{category.category_name}</option>);

    return (
      <div className="EditTitle">
        <h1>Edit Post</h1>
        <form className="col-6 offset-3">
          <div className="form-group">
            <label htmlFor="">Title</label>
              <input
                type="text"
                className="form-control"
                id="postTitle"
                defaultValue={title}
                onChange={this.changeTitleEvent}
                />
            <label htmlFor="">Content</label>
              <input
                type="text"
                className="form-control"
                id="postContent"
                defaultValue={content}
                onChange={this.changeContentEvent}
                />
            <label htmlFor="">Category</label><br></br>
              <select className="selector" value={category_id} onChange={this.categoryChangeEvent}>
                {dropdown}
              </select><br></br>
              <label htmlFor="">Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="postImg"
                  defaultValue={image_url}
                  onChange={this.changeImgUrlEvent}
                  />
            </div>
          <button onClick={this.updatePost}>Save Changes</button>
          <button onClick={() => {
                this.props.history.push(`/posts`)
            }}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default UpdatePost;
