import React from 'react'
import './ResultSection.css'
import { useRecoilState } from 'recoil'
import { searchResultState } from '../atoms/searchResultAtom'
import { loadingState } from '../atoms/loadingAtom'
import Loading from './Loading'

const ResultSection = () => {

    const [searchResults, setSearchResults] = useRecoilState(searchResultState)
    const [isLoading, setIsLoading] = useRecoilState(loadingState)

    return (
        <div className="result-section">
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <>
                    {
                        searchResults.map(({id, advice}) => (
                            <div className="result-div bg-success">
                                <h4 key={id} className="text-warning">{advice}</h4>
                            </div>
                        ))
                    }
                    </> 
                )
            }
            
        </div>
    )
}

export default ResultSection
