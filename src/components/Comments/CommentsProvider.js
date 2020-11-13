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

export default { addCommentToPost }
