import '../css/Home.css';
import React,{useEffect} from 'react'
import MoviesList from '../components/MoviesList';
import FavouriteMoviesList from '../components/FavouriteMoviesList';
import WatchLaterMoviesList from '../components/WatchLaterMoviesList';

function Home() {

  const testString = "av(cd){cas}[vsgbcadv"

  const brackets = ["(",")","{","}","[","]"]

  let isOk = true

  let openBrackets = []

  const NewTestCode=()=>{

    const arr = [20,40,10]
    arr.sort((a,b)=>{
      console.log('arr inside is : '+arr)
      console.log(`a is ${a} and b is ${b}`)
      return a-b
    })
    console.log('arr is : '+arr)
    
    const bracketsString = testString.split("").filter((ch)=>brackets.includes(ch))
    // console.log(bracketsString)
    CheckBracketString(bracketsString)
    
  }


  const CheckBracketString=(bracketsString)=>{
    for (let i = 0; i < bracketsString.length; i++) {
      const ch = bracketsString[i]
      if(i===0 && CheckIfClosingBracket(ch)){
        // console.log("here 1")
        isOk = false
      }else
      if(i===bracketsString-1 && CheckIfOpeningBracket(ch)){
        // console.log("here 2")
        isOk = false
      }else{
        if(CheckIfOpeningBracket(ch)){
          openBrackets.push(ch)
        }else if(CheckIfClosingBracket(ch) && openBrackets.length==0){
            isOk = false
            // console.log("here 3")
        }else if(CheckIfOtherThanThisClosingBracket(openBrackets[openBrackets.length-1],ch)){
          isOk = false
          // console.log("here 4")
        }else{
          // console.log("ch : "+ch)
          // console.log("openBrackets 1 : "+openBrackets)
          openBrackets.pop()
          // console.log("openBrackets 2 : "+openBrackets)
          // openBrackets.pop()
          // console.log("openBrackets 3 : "+openBrackets)
        }
      }
    }
    // console.log("openBrackets : "+openBrackets)
    // console.log("isOk : "+isOk)
    if(openBrackets.length==0 && isOk){
      console.log("correct hai")
    }else{
      console.log("false hai")
    }
  }


//  const TestCode=()=>{
//   console.log("test code")

  
//   let isOk = true
//   for (let i = 0; i < testString.length; i++) {

//       if(i===testString.length-1){
//         isOk = !CheckIfOpeningBracket(testString[i])
//         if(!isOk){
//           break
//         }
//       }
//       else
//        if(CheckIfOpeningBracket(testString[i])){
//         isOk = CheckForClosingBracket(i,testString[i])
//         if(!isOk){
//           break
//         }
//        }
//   }
//   console.log("isOk = "+isOk)
//  }

//  const CheckForClosingBracket=(j,ob)=>{
//   for (let i = j+1; i < testString.length; i++){

//     if(CheckIfOpeningBracket(testString[i])){
//       CheckForClosingBracket(i,testString[i])
//     }
//     else
//     if(testString[i]===GetClosingBracket(ob)){
//       return true
//     }else if(CheckIfOtherThanThisClosingBracket(ob,testString[i])){
//       return false
//     }
//   }
//   return false
//  }

 const GetClosingBracket=(ob)=>{
  switch(ob){
    case "(" : return ")"
    case "{" : return "}"
    case "[" : return "]"
    default: return ""
  }
 }

 const CheckIfOtherThanThisClosingBracket=(ob,ch)=>{
  switch(ob){
    case "(" : if(ch==="}" || ch==="]") return true 
    else return false
    case "{" : if(ch===")" || ch==="]") return true 
    else return false
    case "[" : if(ch==="}" || ch===")") return true 
    else return false
    default: return false
  }
 }

 const CheckIfOpeningBracket=(ch)=>{
  if(ch==="(" || ch==="{" || ch==="["){
    return ch
  }
  return false
 }

 const CheckIfClosingBracket=(ch)=>{
  if(ch===")" || ch==="}" || ch==="]"){
    return true
  }
  return false
 }

 useEffect(()=>{
  NewTestCode()
 },[])


  return (
   <></>
      // <div className="Home">
        
      //   <MoviesList/>/* this element has the header and search bar also */
      //   <FavouriteMoviesList/>
      //   <WatchLaterMoviesList/>
        
      // </div>
   
  );
}

export default Home;
