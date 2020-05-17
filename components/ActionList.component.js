import Link from 'next/link';

function ActionList(props) {
  const { data = [] } = props;

  return (
    <ul className="cmsList">
      {data.map(item => (
        <li className="cmsList__item" key={item.name}>
          <Link href={item.route}>
            <a>{item.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ActionList
