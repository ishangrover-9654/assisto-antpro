import request from 'umi-request';

export async function fakeAccountLogin(params) {
  const resp = request('/api/auth/login', {
    method: 'POST',
    data: params,
  });

  resp
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log('in error ', error);
    });
  return resp;
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
