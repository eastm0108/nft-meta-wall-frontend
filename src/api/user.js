import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/users/sign_in",
    method: "post",
    data,
  });
}

export function logout() {
  return request({
    url: "/logout",
    method: "post",
  });
}

export function register(data) {
  return request({
    url: "/users/sign_up",
    method: "post",
    data,
  });
}

export function getProfile(id) {
  return request({
    url: `/users/profile/${id}`,
    method: "get",
  });
}

export function updatePassword(data) {
  return request({
    url: "/users/password",
    method: "post",
    data,
  });
}

export function updateProfile(data) {
  return request({
    url: "/users/profile",
    method: "patch",
    data,
  });
}


export function getFollowers(data) {
  return request({
    url: "/users/followers",
    method: "get",
    data,
  });
}

export function updateFollower(data) {
  return request({
    url: "/users/follow",
    method: "post",
    data,
  });
}