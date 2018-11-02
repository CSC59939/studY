
// LOGIN USER
export const loginUser = (user) => {
  return fetch("/api/auth/login", {
    method: "POST",
		headers: {
			'Content-Type': 'application/json',
			"Access-Control-Allow-Origin": '*'
		},
		body: JSON.stringify(user),
		credentials: "include"
	}).then((response) => {
    if (response.status !== 200) {
      return Promise.reject({ message: "Unable to Login" });
    } else { return response.json(); }
  }).catch(error => { 
    return error.json();
  });
}

// GET USER DATA
export const getUserData = (token) => {
  return fetch("/api/profile", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    }
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject({ message: "Unable to get user data" });
    } else { return response.json(); }
  }).catch(error => {
    return error.json();
  });
}

// REGISTER USER
export const registerUser = (newUser) => {
  return fetch("/api/auth/signup", {
    method: "POST",
		headers: {
      'Content-Type': 'application/json', 
      "Access-Control-Allow-Origin": '*'
    },
		body: JSON.stringify(newUser),
	}).then((response) => {
    if (response.status !== 201) {
      return Promise.reject({ message: "Unable to Register" });
    } else { return response.json(); }
  }).then(jsonData => { return jsonData; })
  .catch(error => { 
    return error.json();
  });
}