export default function ArticleTag(props) {
  const { label } = props;
  const labelColor = label.toLowerCase() == 'article' ? 
    '#68b86f' : '#ff5c5c';

  return (
    <span 
      className='articleTag'
      style={{ backgroundColor: labelColor }}
    >
      {label}
    </span>
  );
}
