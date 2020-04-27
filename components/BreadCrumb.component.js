import Link from 'next/link';

function BreadCrumb(props) {
  const { data = [] } = props;

  return (
    <nav>
      <ol className="breadcrumb">
        {data.map((item, index) => {
          const isActive = index === data.length - 1;
          const listClass = isActive ? 'breadcrumb-item active' : 'breadcrumb-item';
          
          return (
            <li className={listClass} key={item.name}>
              <Link href={item.route}>
                <a>{item.name}</a>
              </Link>
            </li>  
          );
        })}
      </ol>
    </nav>
  )
}

export default BreadCrumb;
