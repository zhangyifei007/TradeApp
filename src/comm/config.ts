interface Config {
  API_HOST: string;
  HOST_TITLE: string;
  QINIU_KEY: string;
  BAIDU_MAP_AK: string;
  AMAP_KEY: string;
  PUSHY_APP_KEY: {
    ios: string;
    android: string;
  };
  WECHAT_APP_ID: string;
}

const config: any = {
  development: {
    API_HOST: 'http://localhost/api',
    HOST_TITLE: '(开发环境)',
    QINIU_KEY: '',
    BAIDU_MAP_AK: '',
    AMAP_KEY: '',
    PUSHY_APP_KEY: {
      ios: '',
      android: '',
    },
    WECHAT_APP_ID: '',
  },
  production: {
    API_HOST: 'http://api.itsmycar.cn/v1/',
    HOST_TITLE: '(生产环境)',
    QINIU_KEY: '',
    BAIDU_MAP_AK: '',
    AMAP_KEY: '',
    PUSHY_APP_KEY: {
      ios: '',
      android: '',
    },
    WECHAT_APP_ID: '',
  },
};

const env = __DEV__ ? 'development' : 'production';
const exportConfig: Config = config[env];

export { exportConfig };
