/* checking for the undefineds and nulls through single call    */
export  const hasValue=(v)=>{
    if(typeof    v === 'undefined' 
              || v === null 
              || v===undefined 
      ){
      return false
    }else{
      return true
    }
  }