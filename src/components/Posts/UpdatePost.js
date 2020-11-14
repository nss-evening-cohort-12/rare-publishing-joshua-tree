import React from 'react';

class UpdatePost extends React.Component {
  state = {
    post: {
      title: '',
      content: '',
      category_name: '',
      image_url: ''
    },
    categories: []
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
    const { post } = this.props;
    post.category_name = e.target.value;
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
      category_name,
    } = this.state.post;
    const {
      categories
    } = this.state
    

    // const category_names = ['test']
    const dropdown = categories.map((category) => <option value={category.category_name} key={category.id}>{category.category_name}</option>);

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
                id="catName"
                defaultValue={content}
                onChange={this.changeContentEvent}
                />
            <label htmlFor="">Category</label>
              <select className="selector" value={category_name} onChange={this.categoryChangeEvent}>
                {dropdown}
              </select>
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
