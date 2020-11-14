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

export default { addCommentToPost, getCommentsByPostId }
