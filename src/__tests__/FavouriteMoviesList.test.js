import {render,screen, waitFor} from "@testing-library/react"
import FavouriteMoviesList from "../components/FavouriteMoviesList"
import * as api from "../utils/network"
import { favourite_movies_mock_data } from "../__tests__data__/data"

jest.mock("../utils/network")

jest.mock('../hooks/useAuth', () => {
    const originalModule = jest.requireActual('../hooks/useAuth')
    return {
        __esModule: true,
        ...originalModule,
        default: () => ({
            accountId : "1234",
            sessionId : "abcd",
            refreshFavouriteMoviesList : 1,
        }),
    }
})


test('FavouriteMoviesList should render favourite movies list',async()=>{
    api.GetFavoritesCall.mockResolvedValue(favourite_movies_mock_data)
    render(<FavouriteMoviesList/>)
    await waitFor(()=>{
        expect(screen.getByText(/favourite movies/i)).not.toBeNull()
        screen.getByText("The Pursuit of Happyness")
    })
   
})



