export default {
  cms: {
    route: {
      dashboardPage: '/cms/dashboard',
      loginPage: '/cms/login',
      userSettingPage: '/cms/user-setting'
    },
    loginTokenName: 'loginToken',
    drawerMenu: [
      {
        name: 'Dashboard',
        route: '/cms/dashboard',
        iconClassName: 'fas fa-home'
      },
      {
        name: 'User Setting',
        route: '/cms/user-setting',
        iconClassName: 'fas fa-users'
      }
    ],
    drawerActiveMenu: {
      dashboard: 'Dashboard',
      userSetting: 'User Setting'
    }
  }
}