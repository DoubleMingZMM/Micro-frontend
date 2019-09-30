import request from '@/utils/request';

const module_name = '/auth';

export const getToken = async (username, password) =>
  await request.post(`${module_name}/oauth/token`, {
    params: { grant_type: 'password', username, password, scope: 'webp' },
  });
