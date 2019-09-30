import request from '@/utils/request';

export const module_name = '/upms';

export const getMenuTree = async () => await request.get(`${module_name}/menu/tree`);
