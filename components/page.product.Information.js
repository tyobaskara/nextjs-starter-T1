// Components
import Product from '@components/component.Product';

export default function FrontOffice(props) {
  return (
    <Product 
      name='information'
      iconListBg='/static/images/Information-main-icon.jpg'
      iconListAlt='dhealth information'
      {...props}
    />
  );
}
