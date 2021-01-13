import React from 'react';
import './Posts.css'
import PostTag from './PostTag';

class UpdatePost extends React.Component {
  state = {
    post: {
      title: '',
      content: '',
      category: 0,
      image_url: '',
      approved: true,
      publication_date: '',
      tags: []
    },
    categories: [],
    selectedCategory: '',
    all_tags: [],
    checkboxTags: [],
    updateTags: []
  }


  componentDidMount() {
    Promise.all([
      fetch(`http://localhost:8000/posts/${this.props.match.params.postId}`, {
        headers: { "Authorization": `Token ${localStorage.getItem('rare_token')}` }
      }),
      fetch(`http://localhost:8000/categories`, {
        headers: { "Authorization": `Token ${localStorage.getItem('rare_token')}` }
      }),
      fetch(`http://localhost:8000/tags`, {
        headers: { "Authorization": `Token ${localStorage.getItem('rare_token')}` }
      }),
    ]).then(function (responses) {
        return Promise.all(responses.map((response) => {
          return response.json();
        }));
      }).then((data) => {
        this.setState({
          post: {
            title: data[0].title,
            content: data[0].content,
            category: data[0].category['id'],
            approved: true,
            publication_date: data[0].publication_date,
            tags: data[0].tags
          },
          categories: data[1],
          all_tags: data[2]
        });
        this.updateTag();
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
    const newPostCategory = Object.assign({}, this.state.post)        
    newPostCategory["category"] = parseInt(e.target.value)
    this.setState({ post: newPostCategory });
  }

  getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  }

  createImageString = (e) => {
    this.getBase64(e.target.files[0], (base64ImageString) => {
      const newPostImg = Object.assign({}, this.state.post)
      newPostImg["image_url"] = base64ImageString
      this.setState({ post: newPostImg })
    });
  }

  updatePost = (e) => {
    e.preventDefault();
    const uPost = this.state.post;
    uPost.tags = this.state.updateTags;

        return fetch(`http://localhost:8000/posts/${this.props.match.params.postId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem('rare_token')}`,
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(uPost)
        })
            .then(() => this.props.history.push("/posts")) 
  }

  handleCheck = (e) => {
    const value = e.target.id;
    let checked = this.state.updateTags;
    if (!checked.includes(Number(value))) {
      checked.push(Number(value))
      this.setState({updateTags: checked})
    }
    else {
      checked.splice(checked.indexOf(value), 1)
      this.setState({updateTags: checked})
    }
  };  
  
  updateTag = () => {
    const {all_tags, post} = this.state
    const tagBox = [];
    let checked = this.state.updateTags;
    all_tags.forEach(mainTag => {
      if (post.tags.find(tag => tag.id === mainTag.id)) {
        checked.push(Number(mainTag.id))
        this.setState({updateTags: checked})        
        tagBox.push({
          checked:true,
          tag: mainTag
        })
      }
      else {
        console.log(post.tags)
        tagBox.push({
          checked: false,
          tag: mainTag
        })
      }
    })
    this.setState({ checkboxTags: tagBox })
    this.setState({ post: checked})
  };
  

  render() {
    const {
      title,
      content,
      category
    } = this.state.post;
    const {
      categories
    } = this.state;
    const { all_tags } = this.state;
    const { checkboxTags } = this.state;
    

    const dropdown = categories.map((category) => <option value={category.id} text={category.category_name} key={category.id}>{category.label}</option>);

    const tag = checkboxTags.map((tagBox) => <PostTag key={tagBox.tag.id} id={tagBox.tag.id} tag={tagBox.tag} handleCheck={this.handleCheck} Checked={tagBox.checked}/>);

    // tag = allTags.map((tag) => <PostTag key={tag.id} id={tag.id} tag={tag} handleCheck={this.handleCheck}/>);

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
              <select className="selector" value={category} onChange={this.categoryChangeEvent}>
                {dropdown}
              </select><br></br>
                <p className="file-label-update" htmlFor="postImage" id="postImage">Update Post Image</p>
                <input onChange={this.createImageString} type="file" className="file-upload-update" id="postImage" />
                <label>Please select the tag</label>
                {tag}
            </div>
          <button onClick={this.updatePost} style={{ marginRight: "10px", padding: "5px" }}>Save Changes</button>
          <button onClick={() => {
                this.props.history.push(`/posts`)
            }} style={{ padding: "5px" }}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default UpdatePost;
