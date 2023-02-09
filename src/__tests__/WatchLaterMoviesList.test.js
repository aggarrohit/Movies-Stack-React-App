import {render,screen, waitFor} from "@testing-library/react"
import WatchLaterMoviesList from "../components/WatchLaterMoviesList"
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
            refreshWatchLaterMoviesList : 1,
        }),
    }
})



test('WatchLaterMoviesList should render watch later movies list',async()=>{
    api.GetWatchLatersCall.mockResolvedValue(favourite_movies_mock_data)
    render(<WatchLaterMoviesList/>)
    await waitFor(()=>{
        expect(screen.getByText(/watch later movies/i)).not.toBeNull()
        screen.getByText("The Pursuit of Happyness")
    })
   
})




