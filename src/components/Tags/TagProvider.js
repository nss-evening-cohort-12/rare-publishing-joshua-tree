const getTags = () => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/tags`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("rare_token")}`
    }
  })
  .then((response) => resolve(response.json()))
  .catch((err) => reject(err));
});

const getTagById = (tagId) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/tags/${tagId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("rare_token")}`
    }
  })
  .then((response) => resolve(response.json()))
  .catch((err) => reject(err));
});

const addTag = (newTag) => {
  fetch("http://localhost:8000/tags", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_token")}`
    },
    body: JSON.stringify(newTag)
  })
  .then((response) => response.json());
};

const addTagToPost = (newPostTag) => {
  fetch("http://localhost:8000/post-tags", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_token")}`
    },
    body: JSON.stringify(newPostTag)
  })
  .then((response) => response.json());
};
  
const deleteTag = (tagId) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/tags/${tagId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("rare_token")}`
  }
  })
  .then(() => resolve())
  .catch((err) => reject(err))
});

const updateTag = (tagId, newTag) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/tags/${tagId}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_token")}`
    },
    body: JSON.stringify(newTag)
  })
  .then(() => resolve())
  .catch((err) => reject(err));
});

export default { getTags, getTagById, addTag, addTagToPost, deleteTag, updateTag }
