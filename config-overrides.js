const Merge = require('webpack-merge');
const { override, fixBabelImports, addLessLoader, addPostcssPlugins, useEslintRc } = require('customize-cra');

module.exports = override(
  // 按需加载
  fixBabelImports('antd', { libraryDirectory: 'es', style: true }),
  fixBabelImports('antd-mobile', { libraryDirectory: 'es', style: true }),
  fixBabelImports('lodash', { libraryDirectory: '', camel2DashComponentName: false }),
  // 添加 less-loader
  addLessLoader({
    javascriptEnabled: true,
    // 全局 less 变量，会覆盖项目内同名变量，可用于主题定制
    modifyVars: {
      // 常用色
      '@ra-primary': '#1890ff', // 全局主色
      '@ra-success': '#52c41a', // 成功色
      '@ra-warning': ' #faad14', // 警告色
      '@ra-error': '#f5222d', // 错误色
      '@ra-font-size': '14px', // 主字号
      '@ra-color': 'rgba(0, 0, 0, 0.85)', // 主文本色
      '@ra-color-secondary': 'rgba(0, 0, 0, .45)', // 次文本色
      '@ra-disabled-color': 'rgba(0, 0, 0, .25)', // 失效色
      '@ra-disabled-color-back': 'rgba(0, 0, 0, .05)', // 失效背景色
      '@ra-border-color': '#eeeeee', // 边框色
      '@ra-border-color-dark': '#cccccc', // 边框色-深色
      '@ra-background': '#f1f1f1', // 背景色
      // 别名
      '@ra-p': '#1890ff', // 全局主色
      '@ra-s': '#52c41a', // 成功色
      '@ra-w': ' #faad14', // 警告色
      '@ra-e': '#f5222d', // 错误色
      '@ra-fs': '14px', // 主字号
      '@ra-c': 'rgba(0, 0, 0, 0.85)', // 主文本色
      '@ra-cs': 'rgba(0, 0, 0, .45)', // 次文本色
      '@ra-dc': 'rgba(0, 0, 0, .25)', // 失效色
      '@ra-dcb': 'rgba(0, 0, 0, .05)', // 失效背景色
      '@ra-bc': '#eeeeee', // 边框色
      '@ra-bcd': '#cccccc', // 边框色-深色
      '@ra-b': '#f1f1f1', // 背景色
    },
  }),
  // 添加 postcss 插件 - 根据实际情况手动清除注释
  // addPostcssPlugins([
  //   // 添加 postcss-pxtorem
  //   require('postcss-pxtorem')({
  //     rootValue: 100,
  //     propList: ['*'],
  //   }),
  // ]),
  // 允许二次配置 eslint
  useEslintRc(),
  config => {
    // 自定义配置
    config = Merge(config, {});

    if (process.env.NODE_ENV === 'production') {
      // 生产模式下的配置
      config = Merge(config, {
        output: {
          publicPath: '.', // 引用脚本相对路径
        },
      });

      // 全局删除 console
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    } else {
      // 开发模式下的配置
      config = Merge(config, {
        resolve: {
          alias: {
            'react-dom': '@hot-loader/react-dom',
          },
        },
      });
    }

    // 打印运行配置
    // const fs = require('fs');
    // fs.writeFileSync(`config-${process.env.NODE_ENV}.json`, JSON.stringify(config, null, 2));

    // 返回更改后的配置
    return config;
  }
);
