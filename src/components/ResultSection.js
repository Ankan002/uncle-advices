import React from 'react'
import { useRecoilState } from 'recoil'
import { searchResultState } from '../atoms/searchResultAtom'
import { loadingState } from '../atoms/loadingAtom'
import Loading from './Loading'

const ResultSection = () => {

    const [searchResults, setSearchResults] = useRecoilState(searchResultState)
    const [isLoading, setIsLoading] = useRecoilState(loadingState)

    return (
        <div>
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <>
                    {
                        searchResults.map(({id, advice}) => (
                            <h3 key={id}>{advice}</h3>
                        ))
                    }
                    </> 
                )
            }
            
        </div>
    )
}

export default ResultSection
