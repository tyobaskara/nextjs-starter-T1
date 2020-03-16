import { Component } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import MainLayout from '../components/_layouts/MainLayout';

// Containers
import Home from '../containers/Home';

const MySwal = withReactContent(Swal);

const showModal = () => {
  MySwal.fire({
    icon: 'success',
    customClass: {
      title: 'Swal-Custom-Class'
    },
    title: 'Swal Title',
    text: 'Swal Text',
    showConfirmButton: false
  });
  setTimeout(() => MySwal.close(), 5000);
};

const App = () => (
  <MainLayout>
    <Home showModal={showModal} />
  </MainLayout>
);

export default App;
