// Components
import Product from '@components/component.Product';

export default function FrontOffice(props) {
  return (
    <Product 
      name='back-office'
      iconListBg='/static/images/backOffice-main-icon.jpg'
      iconListAlt='dhealth back office'
      {...props}
    />
  );
}
