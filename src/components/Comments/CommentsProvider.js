const addCommentToPost = (newComment) => {
  fetch("http://localhost:8088/comments", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newComment)
  })
  .then((response) => response.json());
};

const getCommentsByPostId = (id) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8088/comments/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((response) => resolve(response.json()))
  .catch((err) => reject(err));
});

const deleteComment = (commentId) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8088/comments/${commentId}`, {
    method: "DELETE"
  })
  .then(() => resolve())
  .catch((err) => reject(err))
});

const getCommentById = (commentId) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8088/comments_e/${commentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((response) => resolve(response.json()))
  .catch((err) => reject(err));
});

const updateComment = (commentId, updateComment) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8088/comments/${commentId}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(updateComment)
  })
  .then(() => resolve())
  .catch((err) => reject(err));
});

export default { addCommentToPost, getCommentsByPostId, deleteComment, getCommentById, updateComment }
