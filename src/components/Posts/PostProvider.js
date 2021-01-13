const getPosts = () => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("rare_token")}`
    }
  })
  .then((response) => resolve(response.json()))
  .catch((err) => reject(err));
});

const getPostsById = (id) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/posts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("rare_token")}`
    }
  })
  .then((response) => resolve(response.json()))
  .catch((err) => reject(err));
});

const getMyPostsById = (id) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/posts?user_id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("rare_token")}`
    }
  })
  .then((response) => resolve(response.json()))
  .catch((err) => reject(err));
});

const createPost = (newPost) => new Promise((resolve, reject) => {
  fetch('http://localhost:8000/posts', {
    method: "POST",
    headers: {
      "Authorization": `Token ${localStorage.getItem("rare_token")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPost)
  })
  .then((response) => resolve(response.json()))
  .catch((err) => reject(err))
});

const deletePostTags = (postId) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/post-tags/${postId}`, {
    method: "DELETE",
  })
  .then(() => resolve())
  .catch((err) => reject(err))
});

const deletePost = (postId) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("rare_token")}`
  }    
  })
  .then(() => resolve())
  .catch((err) => reject(err))
});

const updatePost = post => {
  return fetch(`http://localhost:8000/post/${post.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("rare_token")}`
      },
      body: JSON.stringify(post)
  })
      .then(getPosts)     
}

export default { getPostsById, getPosts, getMyPostsById, createPost, deletePostTags, deletePost, updatePost }
