// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  define: {
    'process.env.BASIC_TOKEN': 'Basic cG9ydGFsLWNsaWVudDpiNGZHOHRNQA==',
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
        title: '门户',
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
  ],
  proxy: {
    '/api': {
      target: 'http://172.16.22.77/',
      changeOrigin: true,
    },
  },
  devtool: 'source-map',
};
