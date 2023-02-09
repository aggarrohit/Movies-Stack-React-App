import {render,screen, waitFor} from "@testing-library/react"
import MoviesList from "../components/MoviesList"
import * as api from "../utils/network"
import { favourite_movies_mock_data } from "../__tests__data__/data"

jest.mock("../utils/network")


test('MoviesList should render now playing movies list',async()=>{

    api.NowPlayingMoviesCall.mockResolvedValue(favourite_movies_mock_data)
    render(<MoviesList/>)
    await waitFor(()=>{
        screen.getByText("The Pursuit of Happyness")
    })
   
})




