// Components
import Product from '@components/component.Product';

export default function FrontOffice(props) {
  return (
    <Product 
      name='front-office'
      iconListBg='/static/images/frontOffice-queuing.jpg'
      iconListAlt='dhealth front office'
      {...props}
    />
  );
}
