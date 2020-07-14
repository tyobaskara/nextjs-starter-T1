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
      },
      {
        name: 'Edit Pages',
        route: '/cms/edit-pages',
        iconClassName: 'fas fa-file-code'
      },
      {
        name: 'Message Center',
        route: '/cms/message-center',
        iconClassName: 'far fa-envelope'
      }
    ],
    drawerActiveMenu: {
      dashboard: 'Dashboard',
      userSetting: 'User Setting',
      editPages: 'Edit Pages',
      messageCenter: 'Message Center'
    }
  }
}