import { useState } from 'react';
import Thumbnail from '../component/Thumbnail';
import images from '../data/images'; // 제공되는 이미지를 이용하세요

function Gallery() {
  // console.log(images) // npm start를 통해 앱을 열어, 개발자 콘솔을 통해 이미지 목록을 확인할 수 있습니다
  // console.log(images[0]);
  // console.log(images[0].src);

  const handleClick = (image) => {
    // TIP: parameter로 이미지가 전달되어야 하며, 이벤트 객체는 쓰지 않습니다
    // TODO setHandleImage(image.target.src)
    return setHandleImage(image);
  };

  const [handleImage, setHandleImage] = useState(images[0]);
  // const [nonselected, selected] = useState('');
  // console.log(handleImage);

  return (
    <div>
      <h2>전체 목록</h2>
      <div id='list' className='flex'>
        { images.map( (el) => {
          return(<a key={el.id} onClick={()=>handleClick(el)} href="#">
                  <Thumbnail source={el.src}/></a>)}) 
        }
      </div>
      <div>
        {/* TODO: 아래 하드코딩된 내용 대신에, 목록 선택에 따른 이미지를 표시하세요 */}
        <h2>이미지 제목</h2>
        
        <img src={handleImage.src} id='current-image' alt='이미지가 없을 때 나오는 대체 텍스트' />
      </div>
    </div>
  );
}

export default Gallery;
