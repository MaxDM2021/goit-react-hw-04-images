import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import Searchbar from 'components/Searchbar';
import ImageInfo from 'components/ImageInfo';

export default function App () {

  const [hitName, hitNameState] = useState('');
  const [page, setPage] = useState(1);

  const handleFormSubmit = hitName => {
    hitNameState( hitName );
  };


    return (
      <div style={{ maxWidth: 1170, margin: '0 auto', padding: 20 }}>
        <Searchbar qwe={handleFormSubmit} setPage={setPage}/>
        <ImageInfo hitName={hitName} page={page} setPage={setPage}/>

        <ToastContainer autoClose={3000} />
      </div>
    );
  }




// ======== Старая версия на классах ======

// import { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
// import Searchbar from 'components/Searchbar';
// import ImageInfo from 'components/ImageInfo';

// class App extends Component {
//   state = {
//     hitName: '',
//     // visible: true,
//   };

//   handleFormSubmit = hitName => {

//     this.setState({ hitName });
//   };


//   render() {
//     return (
//       <div style={{ maxWidth: 1170, margin: '0 auto', padding: 20 }}>
//         <Searchbar qwe={this.handleFormSubmit} />
//         <ImageInfo hitName={this.state.hitName} page={this.state.page}/>

//         <ToastContainer autoClose={3000} />
//       </div>
//     );
//   }
// }

// export default App;