
脚手架搭建Vite：
    1.使用vite工作组件创建react-app，项目启动比create-react-app飞快
    npm init @vite/latest client -- -- template react (node 7.0版本以上-- -- )
    client项目名  react项目类型
    2.使用vite搭建完项目之后，需要npm i 安装依赖
    3.为更方便在vite工作组件进行引入，动态引入css,安装,配置到vite.config.js：
        npm i vite-plugin-style-import
    4.react组件实时刷新更新,配置到vite.config.js：
        npm i @vitejs/plugin-react-refresh
    5.安装less插件：npm i less -D
    vite识别less,需要配置在vite.config.js中:
        css: {
            modules: {
                localsConvention: "dashesOnly"
            },
            preprocessorOptions: {
            less: {
                javascriptEnabled: true
                }
            }
        }
        }


项目开发所需的插件：
    1.react-router-dom        react路由
    2.挑选适合的ui 框架         Zarm
        npm install zarm --save  下载框架
        引入css样式：
            全局引入：
                import 'zarm/dist/zarm.css';
            按需加载：(配置在vite.config.js中)
                plugins: [reactRefresh(), styleImport(
                    {
                    libs: [
                        {
                        libraryName: 'zarm',
                        esModule: true,
                        resolveStyle: (name) => {
                            return `zarm/es/${name}/style/css`
                        }
                        }
                    ]
                    }
                )],
        引入需要的组件同其他组件库相同，从组件库中import对应组件库中的组件；
        全局配置：在组件库中声明全局ConfigProvider，写在根组件app.jsx上进行引入，然后声明在跟组件上，随后进行全局配置，详细看Zarm官网组件。


移动端适配:
    1.安装lib-flexible,在入口文件引用，固定其所有移动端的rem:
        npm i lib-flexible -S
    2.安装postcss-pxtorem,自动将px转化成rem:
        npm i postcss-pxtorem -D
        在根目录client创建postcss.config.js并写对应的配置文件
