import Link from 'next/link';

function ActionList(props) {
  const { data = [] } = props;

  return (
    <ul className="list-group-cms">
      {data.map(item => (
        <li className="list-group-cms-item" key={item.name}>
          <Link href={item.route}>
            <a>{item.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ActionList
