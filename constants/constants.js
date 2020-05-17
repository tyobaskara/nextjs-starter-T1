export default {
  cms: {
    route: {
      dashboardPage: '/cms/dashboard',
      loginPage: '/cms/login',
      userSettingPage: '/cms/user-setting',
      editPagesHomeBannerPage: '/cms-edit-pages-home/banner'
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
      }
    ],
    drawerActiveMenu: {
      dashboard: 'Dashboard',
      userSetting: 'User Setting',
      editPages: 'Edit Pages'
    }
  }
}