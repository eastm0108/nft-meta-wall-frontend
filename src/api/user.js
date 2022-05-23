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
