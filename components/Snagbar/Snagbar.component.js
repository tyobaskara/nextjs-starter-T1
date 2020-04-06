function Snagbar(props) {
  const { isShow, message = '{message}' } = props;
  const snagbarClass = isShow ? 'snagbar show' : 'snagbar';
  
  return (
    <div className={snagbarClass}>
      <span>{message}</span>
    </div>
  );
}

export default Snagbar
