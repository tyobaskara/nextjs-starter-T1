// Components
import Product from '@components/component.Product';

export default function FrontOffice(props) {
  return (
    <Product 
      name='service-2'
      iconListBg='/static/images/Service2-main-icon.jpg'
      iconListAlt='dhealth service 2'
      {...props}
    />
  );
}
