import { useEffect, useState } from 'react';
import '../css/ScrollWrapper.css';
import { FAVS_SCROLL_ID, LIST_TYPE_FAVOURITES, LIST_TYPE_MOVIES, MOVIES_SCROLL_ID, WATCHLIST_SCROLL_ID } from '../utils/constants';

const  ScrollWrapper=({children,listType})=> {

  
  const [showLeftButton,setShowLeftButton] = useState(false)
  const [showRighttButton,setShowRighttButton] = useState(true)

  const getScrollElement=()=>{
   return document.getElementById(listType===LIST_TYPE_MOVIES    ? MOVIES_SCROLL_ID:
                                 (listType===LIST_TYPE_FAVOURITES?FAVS_SCROLL_ID:
                                                                 WATCHLIST_SCROLL_ID
                                  ))
  }

  const UpdateButtons=(newScrollPosition)=>{
    const sv = getScrollElement()
    
    if(newScrollPosition-sv.scrollWidth<0) setShowRighttButton(true)
    else setShowRighttButton(false)
    
    if(newScrollPosition>0) setShowLeftButton(true)
    else setShowLeftButton(false)
  }

  const ScrollRight=()=>{
    const sv = getScrollElement()
    const newScrollPosition = sv.scrollLeft + (window.innerWidth - 100)
    sv.scrollLeft = newScrollPosition
    UpdateButtons(newScrollPosition)    
  }

  const ScrollLeft=()=>{
    const sv = getScrollElement()
    const newScrollPosition = sv.scrollLeft - (window.innerWidth - 100)
    sv.scrollLeft = newScrollPosition
    UpdateButtons(newScrollPosition)
  }




  useEffect(()=>{ 
    if(getScrollElement().scrollWidth === getScrollElement().offsetWidth ) setShowRighttButton(false) 
    else setShowRighttButton(true)
  },[children])

  return (
               
        <div className='list-with-buttons'>
          {showLeftButton && <div className="scroll-buttons" onClick={ScrollLeft}>
            <img  className="button-img" alt='left'
                  src={require("../assets/images/left.png")} height="30" width="30"/>
          </div>}
          
            {children}
         
          {showRighttButton && <div className="scroll-buttons" onClick={ScrollRight}>
            <img  className="button-img" src={require("../assets/images/right.png")} 
                  height="30" width="30" alt='right'/>
          </div>}
        </div>
      
  );
}

export default ScrollWrapper;
