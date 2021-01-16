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


//stretch goal to refactor this later into one toggle function

const deactivateUser = (authUserObj) => new Promise((resolve, reject) => {
  authUserObj.is_active = false
  fetch(`http://localhost:8000/authusers/${authUserObj.id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_token")}`
    },
    body: JSON.stringify(authUserObj)
  })
  .then(() => resolve())
  .catch((err) => reject(err));
});

const reactivateUser = (authUserObj) => new Promise((resolve, reject) => {
  authUserObj.is_active = true
  fetch(`http://localhost:8000/authusers/${authUserObj.id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_token")}`
    },
    body: JSON.stringify(authUserObj)
  })
  .then(() => resolve())
  .catch((err) => reject(err));
});

const getUserById = (userId) => {
  return fetch(`http://localhost:8000/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("rare_token")}`
    }
  })
    .then(res => res.json())    
}

const getSingleSub = (authorId, followerId) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/subscriptions?author_id=${authorId}&follower_id=${followerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("rare_token")}`
    }
  })
  .then((response) => resolve(response.json()))
  .catch((err) => reject(err))
})

const createSubscription = (subscriptionObj) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("rare_token")}`
    },
    body: JSON.stringify(subscriptionObj)
  })
  .then((response) => resolve(response.json()))
  .catch((err) => reject(err))
});

export default { getTags, deactivateUser,reactivateUser, getUserById, getSingleSub, createSubscription }
