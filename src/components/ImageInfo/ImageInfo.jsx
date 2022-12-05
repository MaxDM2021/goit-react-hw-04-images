import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import ImageFallbackView from 'components/ImageFallbackView';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import ImageAPI from 'components/ImageApi';
import Button from 'components/Button';
import 'components/Styles/styles.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

// 'idle' - простой
// 'pending' - ожидается
// 'resolve' - выполнилось с результамом (хорошо)
// 'resjected' - отклонено!

export default function ImageInfo({ hitName}) {
  const [request, setRequest] = useState('');
  const [hits, setHits] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [alt, setAlt] = useState('');
  const [modal, setModal] = useState('');
  const load = false;

  useEffect((prevProps, prevState) => {
    const prevName = prevProps.hitName;
    const nextName = hitName;
    const prevPage = prevState.page;
    const nextPage = page;

    const fetchAPI = () => {
      const nextName = hitName;

      ImageAPI.fetchImage(nextName, page)
        .then(response => {
          resetPage();
          console.log(response);
          setRequest(prev => {
            setHits([...prev.hits, ...response?.hits]);
            setTotal(response?.totalHits);
            setStatus(
              response?.totalHits === 0 ? Status.REJECTED : Status.RESOLVED
            );
          });
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    };

    if (prevPage !== nextPage) {
      fetchAPI();
    }

    if (prevName !== nextName) {
      setStatus(Status.PENDING);
      setHits([]);
      setTotal(0);
      fetchAPI(nextName);
    }

    if (page === 1 && prevState.total < total) {
      toast.success(`You found ${total} pictures`);
    }
  }, [hitName, page, total]);

  // =========================================================================

  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  // };

  const toggleModal = event => {
    if (event.target.nodeName !== 'IMG') {
      return;
    }
    setModal(event.target.dataset.src);
    setAlt(event.target.getAttribute('alt'));
  };

  const resetModal = () => {
    setModal('');
    setAlt('');
  };

  const loadMore = () => {
    setPage(prevState => {
      return { page: prevState.page + 1 };
    });
    console.log(request);
  };

  const resetPage = () => {
    setPage(1);
  };

  // const { hits, error, status, modal, alt, total, Load, page } = this.state;
  // const { hitName } = this.props;
  const totalCond = total > 0 && Math.ceil(total / 12) !== page && !load;

  if (status === Status.IDLE) {
    return <div className="Falltitle">Enter the name of the picture!</div>;
  }

  if (status === Status.PENDING) {
    return <Loader hitName={hitName} />;
  }

  if (status === Status.REJECTED) {
    return (
      <ImageFallbackView
        message={
          error?.message || `No picture with name${hitName}!!`
        }
      />
    );
  }

  if (status === Status.RESOLVED && hits.length > 0) {
    return (
      <>
        <ImageGallery images={hits} showModal={toggleModal} />
        {modal !== '' && <Modal src={modal} alt={alt} onClose={resetModal} />}
        {totalCond > 0 && <Button loadMore={loadMore} />}
      </>
    );
  }
}

// ===== Старый вариант 1 на классах

// import { Component } from 'react';
// import { toast } from 'react-toastify';
// import ImageFallbackView from 'components/ImageFallbackView';
// import ImageGallery from 'components/ImageGallery';
// import Modal from 'components/Modal';
// import Loader from 'components/Loader';
// import ImageAPI from 'components/ImageApi';
// import Button from 'components/Button';
// import 'components/Styles/styles.css';

// class ImageInfo extends Component {
//   state = {
//     request: '',
//     hits: [],
//     error: null,
//     status: 'idle',
//     Load: false,
//     page: 1,
//     total: 0,
//     alt: '',
//     modal: '',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevName = prevProps.hitName;
//     const nextName = this.props.hitName;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     if (prevName !== nextName) {
//       this.setState({ status: 'pending', hits: [], total: 0 });
//       this.fetchAPI(nextName);
//     }

//     if (prevPage !== nextPage) {
//       this.fetchAPI();
//     }

//     if (this.state.page === 1 && prevState.total < this.state.total) {
//       toast.success(`You found ${this.state.total} pictures`);
//     }
//   }

//   fetchAPI = () => {
//     const nextName = this.props.hitName;

//     ImageAPI.fetchImage(nextName, this.state.page)
//       .then(response => {
//         this.resetPage();
//         console.log(response);
//         this.setState(prev => ({
//           hits: [...prev.hits, ...response?.hits],
//           total: response?.totalHits,
//           status: response?.totalHits === 0 ? 'rejected' : 'resolved',
//         }));
//       })
//       .catch(error => this.setState({ error, status: 'rejected' }));
//   };

//   // toggleModal = () => {
//   //   this.setState(({ showModal }) => ({
//   //     showModal: !showModal,
//   //   }));
//   // };

//   toggleModal = event => {
//     if (event.target.nodeName !== 'IMG') {
//       return;
//     }
//     this.setState({
//       modal: event.target.dataset.src,
//       alt: event.target.getAttribute('alt'),
//     });
//   };

//   resetModal = () => {
//     this.setState({
//       modal: '',
//       alt: '',
//     });
//   };

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//     console.log(this.state.request);
//   };

//   resetPage = () => {
//     this.setState(() => ({
//       page: 1,
//     }));
//   };

//   // 'idle' - простой
//   // 'pending' - ожидается
//   // 'resolve' - выполнилось с результамом (хорошо)
//   // 'resjected' - отклонено!

//   render() {
//     const { hits, error, status, modal, alt, total, Load, page } = this.state;
//     const { hitName } = this.props;
//     const totalCond = total > 0 && Math.ceil(total / 12) !== page && !Load;

//     if (status === 'idle') {
//       return <div className="Falltitle">Enter the name of the picture!</div>;
//     }

//     if (status === 'pending') {
//       return <Loader hitName={hitName} />;
//     }

//     if (status === 'rejected') {
//       return (
//         <ImageFallbackView
//           message={
//             error?.message || `No picture with name${this.props.hitName}!!`
//           }
//         />
//       );
//     }

//     if (status === 'resolved' && hits.length > 0) {
//       return (
//         <>
//           <ImageGallery images={hits} showModal={this.toggleModal} />
//           {modal !== '' && (
//             <Modal src={modal} alt={alt} onClose={this.resetModal} />
//           )}
//           {totalCond > 0 && <Button loadMore={this.loadMore} />}
//         </>
//       );
//     }
//   }
// }

// export default ImageInfo;

// ===== END =====

// ===== Старый Вариант 2 на классах =====

// import { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
// import Searchbar from 'components/Searchbar';
// import ImageAPI from './ImageApi';
// import ImageGallery from './ImageGallery';
// import Modal from './Modal';
// import ImageFallbackView from './ImageFallbackView';
// import Button from './Button';
// import Loader from './Loader';

//  class App extends Component {
//   state = {
//     hitName: '',
//     hits: [],
//     error: null,
//     page: 1,
//     total: 0,
//     alt: '',
//     modal: '',
//     Load: false
//     // visible: true,

//   };

//   handleFormSubmit = hitName => {
//     this.setState({ hitName, page: 1, hits: [] });
//   };

//    loadMore = () => {
//      this.setState(prevState => ({
//        page: prevState.page + 1,
//      }));
//    };
//    toggleModal = event => {
//      if (event.target.nodeName !== 'IMG') {
//        return;
//      }
//      this.setState({
//        modal: event.target.dataset.src,
//        alt: event.target.getAttribute('alt'),
//      });
//    };

//    resetModal = () => {
//      this.setState({
//        modal: '',
//        alt: '',
//      });
//    };

//    componentDidUpdate(_, prevState) {
//      const prevName = prevState.hitName;
//      const nextName = this.state.hitName;
//      const prevPage = prevState.page;
//      const nextPage = this.state.page;

//      if (prevName !== nextName || prevPage !== nextPage ) {
//        this.setState({Load: true})

//        ImageAPI.fetchImage(nextName, this.state.page)
//          .then(response => {
//            console.log(response);
//            this.setState(prev=>({
//              hits: [...prev.hits, ...response?.hits],
//              total: response?.totalHits,
//              // page: response?.page,
//              status: 'resolved',
//            }));
//          })
//          .catch(error => this.setState({ error}))
//          .finally(()=>this.setState({Load: false}))
//      }
//    }

//   render() {
//   const {modal, error, alt, Load, hits, total, hitName}=this.state

//     return (
//       <div style={{ maxWidth: 1170, margin: '0 auto', padding: 20 }}>
//         <Searchbar qwe={this.handleFormSubmit} />
//         <ToastContainer autoClose={3000} />
//         {hits.length > 0 && <ImageGallery images={hits} showModal={this.toggleModal} />}
//         {Load && <Loader hitName={hitName} />}
//         {error && <ImageFallbackView message={this.state.error.message} />}
//         {hits.length > 0 && total > hits.length && !Load && <Button loadMore={this.loadMore} />}
//         {modal !== '' && (
//           <Modal src={modal} alt={alt} onClose={this.resetModal} />
//         )}
//       </div>
//     );
//   }
// }

// export default App
