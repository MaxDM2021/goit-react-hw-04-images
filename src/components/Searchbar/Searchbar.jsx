
import { useState } from 'react';

import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import "components/Styles/styles.css"

// Как импортировать свою кастомную иконку из своего svg 
// import { ReactComponent as MyIcon } from './путь к svg';

// const styles = { form: { marginBottom: 20 } };

export default function Searchbar ({qwe}) {

  const [imageName, imageState] = useState('');

  const handleNameChange = event => {
    imageState(event.target.value.toLowerCase()); 
    }
    

  // const handleNameChange = e => {
  //   imageNameState(prevState => {
  //     return { ...prevState, imageName: e.target.value.toLowerCase()}});
  //   }

  const handleSubmit = event => {
    event.preventDefault();

    if (imageName.trim() === ''){
      return toast.error('Введите название изображения!');
      
    }

    qwe(imageName)
    imageState('');
  };

 
    return (
        <header className="Searchbar">
        <form onSubmit={handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
          <ImSearch />
            <span className="SearchForm-button-label">Search</span>
          </button>
      
          <input
            className="SearchForm-input"
            type="text"
            name="imageName"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={imageName}
            onChange={handleNameChange}
          />
        </form>
      </header>
    );
}


// ===== Стара 

// import { Component } from 'react';
// import { ImSearch } from 'react-icons/im';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
// import "components/Styles/styles.css"

// // Как импортировать свою кастомную иконку из своего svg 
// // import { ReactComponent as MyIcon } from './путь к svg';

// // const styles = { form: { marginBottom: 20 } };

// export default class Searchbar extends Component {
//   state = {
//     imageName: '',
    
//   };

//   handleNameChange = event => {
//     this.setState({ imageName: event.currentTarget.value.toLowerCase(),
      
//     });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     if (this.state.imageName.trim() === ''){
//       return toast.error('Введите название изображения!');
      
//     }

//     this.props.qwe(this.state.imageName)
//     this.setState({ imageName: ''});
//   };

//   render() {
//     return (
//         <header className="Searchbar">
//         <form onSubmit={this.handleSubmit} className="SearchForm">
//           <button type="submit" className="SearchForm-button">
//           <ImSearch />
//             <span className="SearchForm-button-label">Search</span>
//           </button>
      
//           <input
//             className="SearchForm-input"
//             type="text"
//             name="imageName"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.imageName}
//             onChange={this.handleNameChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }








