import Mock from 'mockjs';
export default [
  {
    // timeout: 500,
    url: "/mock/api/user/login",
    method: "post",
    statusCode: 200,
    response: ({}) => {
      return {
        code: 200,
        message: "ok",
        data: {
          'token': Mock.Random.string('lower',200),
        },
      }
    },
  },
  {
    // timeout: 500,
    url: "/mock/api/user/login",
    method: "post",
    statusCode: 200,
    response: ({}) => {
      return {
        code: 200,
        message: "ok",
      }
    },
  },
];