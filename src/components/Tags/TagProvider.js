const getTags = () => new Promise((resolve, reject) => {
  fetch(`http://localhost:8088/tags`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((response) => resolve(response.json()))
  .catch((err) => reject(err));
});

const getTagById = (tagId) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8088/tags/${tagId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((response) => resolve(response.json()))
  .catch((err) => reject(err));
});

const addTag = (newTag) => {
  fetch("http://localhost:8088/tags", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newTag)
  })
  .then((response) => response.json());
};

const addTagToPost = (newPostTag) => {
  fetch("http://localhost:8088/post-tags", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newPostTag)
  })
  .then((response) => response.json());
}
  
  export default { getTags, getTagById, addTag, addTagToPost }