// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  define: {
    'process.env.TOKEN': 'a11ad754-b231-497f-9268-787b1ba23e4f',
    'process.env.API_PREFIX': '/api',
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: '系统管理',
        dll: false,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
    [
      'umi-plugin-pro-block',
      {
        moveMock: false,
        moveService: false,
        modifyRequest: true,
        autoAddMenu: true,
      },
    ],
  ],
  block: {
    // 国内用户可以使用码云
    // defaultGitUrl: 'https://gitee.com/ant-design/pro-blocks',
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  devtool: 'source-map',
  targets: {
    ie: 11,
  },
  proxy: {
    '/api': {
      target: 'http://172.16.22.77/',
      changeOrigin: true,
    },
  },
};
