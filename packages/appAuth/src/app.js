export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
export const patchRoutes = routes => {
  routes.forEach(item => {
    const { name, path, _title, title } = item;
    // 根目录不用命名
    if (!name && path && path.length > 1) item.name = title || _title || '';
    if (item.routes) patchRoutes(item.routes);
  });
};
