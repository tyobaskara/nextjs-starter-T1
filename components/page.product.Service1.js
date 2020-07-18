// Components
import Product from '@components/component.Product';

export default function FrontOffice(props) {
  return (
    <Product 
      name='service-1'
      iconListBg='/static/images/Service1-main-icon.jpg'
      iconListAlt='dhealth service 1'
      {...props}
    />
  );
}
