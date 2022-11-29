import Carousel from 'react-bootstrap/Carousel';
export default function ImageGallery({ images }) {
  return (
    <Carousel fade>
      {images.map((item, index) =>
        <Carousel.Item key={index} style={{width: '100%', height: '300px'}}>
          <img
            // className="d-block h-100 w-100"
            style={{width: '100%', height: '100%'}}
            src={item}
            alt="First slide"
          />
        </Carousel.Item>
      )}
    </Carousel>
  );
}