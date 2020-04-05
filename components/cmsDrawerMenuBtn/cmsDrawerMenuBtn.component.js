const CmsDrawerMenuBtn = props => {
  const { name, iconClassName, isActiveMenu = false, onMenuBtnClick } = props;
  const activeMenuClass = isActiveMenu ? 'cmsDrawer__btn active' : 'cmsDrawer__btn';

  return (
    <button className={activeMenuClass} onClick={onMenuBtnClick}>
      <i className={iconClassName}></i>
      <span>{name}</span>
    </button>
  );
};

export default CmsDrawerMenuBtn;
