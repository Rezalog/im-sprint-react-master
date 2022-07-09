import React from 'react';
// TODO - import문을 이용하여 react-router-dom 라이브러리의 Link 컴포넌트를 불러옵니다.
import {Link} from 'react-router-dom';

const Sidebar = () => {
  return (
    <section className="sidebar">
      {/* TODO : About 메뉴 아이콘과 Mypage 메뉴 아이콘을 작성하고 Link 컴포넌트를 이용하여 경로(path)를 연결합니다. */}
        
      
        
        <nav>
          <ul>
            <li>
              <Link to="/"><i className="far fa-comment-dots">Tweets</i></Link>{/* Link 컴포넌트를 이용하여 경로를 연결합니다 */}
            </li>
            <li>
              <Link to="/about"><i className="far fa-question-circle">About</i></Link>
            </li>
            <li>
              <Link to="/mypage"><i className="far fa-user">MyPage</i></Link>
            </li>
          </ul>
        </nav>
    </section>
  );
};

export default Sidebar;
