import React from "react"

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
    fetch("http://localhost:8088/categories", {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((res) => this.setState({ categories: res }))
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
    this.setState({
      selectedCategory: e.target.value
    });
  }

  savePost = async (e) => {
    e.preventDefault();
    const { title, content, image_url } = this.state;

    const newPost = {
      user_id: 0,
      title,
      content,
      category_id: 0,
      image_url
    };

    await fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
      });
      console.warn('Adding a new post worked!');
      this.props.history.push('/posts');
  }

  render() {
    const { title, content, image_url, categories } = this.state;

    const categoryCards = categories.map((category) => 
      <div key={category.id}>
        <label>
        <input
          type="radio"
          value={category.id}
          checked={this.state.selectedOption === category.id}
          onChange={this.onValueChange}
        /> {category.category_name}
        </label>
      </div>
    );

    return (
      <div className="container--login">
        <section>
          <form className="form--login">
            <h1>Create a New Post</h1>
            <fieldset>
              <label htmlFor="postTitle">Name</label>
              <input value={title} onChange={this.changeTitleEvent} type="text" id="postTitle" className="form-control" placeholder="A Day In The Life" required autoFocus />
            </fieldset>
            <fieldset>
              <label htmlFor="postContent">Content</label>
              <textarea style={{height: '200px'}} name="message" rows="200" cols="20" value={content} onChange={this.changeContentEvent} type="text" id="postContent" className="form-control" placeholder="Today I went to the store..." required autoFocus />
            </fieldset>
              {categoryCards}
            <fieldset>
              <label htmlFor="postImage">Image URL (Optional)</label>
              <input value={image_url} onChange={this.changeImageEvent} type="text" id="postImage" className="form-control" placeholder="Paste image URL here" autoFocus />
            </fieldset>
            <fieldset style={{ textAlign:"center" }}>
              <button className="btn btn-1" type="submit" onClick={this.savePost}>Post</button>
            </fieldset>
          </form>
        </section>
      </div>
    )
  }
}

export default NewPost;