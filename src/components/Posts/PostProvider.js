const getPosts = () => new Promise((resolve, reject) => {
  fetch(`http://localhost:8088/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((response) => resolve(response.json()))
  .catch((err) => reject(err));
});

const getPostsById = (id) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8088/posts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((response) => resolve(response.json()))
  .catch((err) => reject(err));
});

const getMyPostsById = (id) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8088/posts?user_id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((response) => resolve(response.json()))
  .catch((err) => reject(err));
});

const createPost = (newPost) => {
  fetch('http://localhost:8088/posts', {
    method: "POST",
    header: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPost)
  })
  .then((response) => response.json());
};

const deletePostTags = (postId) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE",
  })
  .then(() => resolve())
  .catch((err) => reject(err))
});

const deletePost = (postId) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE"
  })
  .then(() => resolve())
  .catch((err) => reject(err))
});

export default { getPostsById, getPosts, getMyPostsById, createPost, deletePostTags, deletePost }
