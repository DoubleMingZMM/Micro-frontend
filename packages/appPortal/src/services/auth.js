import request from '@/utils/request';

export const module_name = '/auth';

/**
 * 登录
 * @param {*} username
 * @param {*} password
 */
export const postToken = async payload =>
  await request.post('/auth/oauth/token', {
    headers: {
      Authorization: process.env.BASIC_TOKEN,
    },
    params: {
      grant_type: 'password',
      ...payload,
      scope: 'web',
    },
  });
