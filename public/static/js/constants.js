export default {
  cms: {
    route: {
      dashboardPage: '/cms/dashboard',
      loginPage: '/cms/login',
    },
    loginTokenName: 'loginToken',
    drawerMenu: [
      {
        name: 'Dashboard',
        route: '/cms/dashboard',
        iconClassName: 'fas fa-home'
      },
      {
        name: 'UserSetting',
        route: '/cms/user-setting',
        iconClassName: 'fas fa-users'
      }
    ]
  }
}