const ButtonComponent = props => (
  <button className={props.className} onClick={props.onClick}>{props.children}</button>
)

export default ButtonComponent;
