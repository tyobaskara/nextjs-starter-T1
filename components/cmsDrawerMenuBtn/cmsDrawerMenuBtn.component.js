const linkTo = (router, route) => () => {
  router.push(route);
};

const CmsDrawerMenuBtn = props => {
  const { route, router, name, iconClassName, isActiveMenu = false } = props;
  const activeMenuClass = isActiveMenu ? 'cmsDrawer__btn active' : 'cmsDrawer__btn';

  return (
    <button className={activeMenuClass} onClick={linkTo(router, route)}>
      <i className={iconClassName}></i>
      <span>{name}</span>
    </button>
  );
};

export default CmsDrawerMenuBtn;
