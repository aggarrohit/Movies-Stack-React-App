import { useEffect, useState } from 'react';
import '../css/ScrollWrapper.css';
import { LIST_TYPE_FAVOURITES, LIST_TYPE_MOVIES } from '../utils/constants';

const  ScrollWrapper=({children,listType})=> {

  const getScrollElement=()=>{
   return document.getElementById(listType==LIST_TYPE_MOVIES? "movies-scroll":(listType==LIST_TYPE_FAVOURITES?"fav-scroll":"watchlist-scroll"))
  }

  const ScrollRight=()=>{
    const sv = getScrollElement()
    sv.scrollLeft = sv.scrollLeft + window.innerWidth - 100
  }

  const ScrollLeft=()=>{
    const sv = getScrollElement()
    sv.scrollLeft = sv.scrollLeft - window.innerWidth + 100
  }

  const [showButtons,setShowButtons] = useState(true)

  useEffect(()=>{ 
    if(getScrollElement().scrollWidth == getScrollElement().offsetWidth ) setShowButtons(false) 
    else setShowButtons(true)
  },[children])

  return (
               
        <div className='list-with-buttons'>
          {showButtons && <div className="scroll-buttons" onClick={ScrollLeft}>
            <img className="button-img" src={require("../assets/images/left.png")} height="30" width="30"/>
          </div>}
          
            {children}
         
          {showButtons && <div className="scroll-buttons" onClick={ScrollRight}>
            <img className="button-img" src={require("../assets/images/right.png")} height="30" width="30"/>
          </div>}
        </div>
      
  );
}

export default ScrollWrapper;
