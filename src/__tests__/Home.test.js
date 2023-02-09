import {render,screen} from "@testing-library/react"
import Home from "../screens/Home"
import userEvent from "@testing-library/user-event"


test('on initial render the search bar should be there',()=>{
    render(<Home/>)
    
    expect(screen.getByPlaceholderText(/search movies../i)).not.toBeNull()
})


test('on initial render movies heading should be there',()=>{
    render(<Home/>)
    
    expect(screen.getByText('Movies')).not.toBeNull()
})

test('on initial render Favourite movies heading should be there',()=>{
    render(<Home/>)
    
    expect(screen.getByText('Favourite Movies')).not.toBeNull()
})

test('on initial render Watch Later heading should be there',()=>{
    render(<Home/>)
    
    expect(screen.getByText('Watch Later Movies')).not.toBeNull()
})


test('on initial render search should be enabled',()=>{
    render(<Home/>)
    
    userEvent.type(screen.getByPlaceholderText(/search movies../i),'happy')
})

// test('on initial render login box should be visible',()=>{
//     render(<Home/>)
//     expect(screen.getByText('Login')).not.toBeNull()
//     // userEvent.type(screen.getByPlaceholderText(/search movies../i),'happy')
// })