import request from '@/utils/request';

const module_name = '/upms';

/**
 * 用户列表
 * @param {*} size 分页大小
 * @param {*} current 当前页码
 * @param {*} username 用户名
 */
export const getUsers = async (currentPage = 1, pageSize = 10, searchQuery) =>
  await request.get(`${module_name}/user/page`, {
    params: { pageSize, currentPage, ...searchQuery },
  });

export const getMenus = async searchQuery =>
  await request.get(`${module_name}/menu/all`, {
    params: { ...searchQuery },
  });
export const getRoles = async (currentPage = 1, pageSize = 10, searchQuery) =>
  await request.get(`${module_name}/role/page`, {
    params: { pageSize, currentPage, ...searchQuery },
  });
export const getGroups = async (currentPage = 1, pageSize = 10, searchQuery) =>
  await request.get(`${module_name}/group`, {
    params: { pageSize, currentPage, ...searchQuery },
  });
