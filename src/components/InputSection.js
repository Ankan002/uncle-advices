import React, {useState} from 'react'
import './InputSection.css'
import {useRecoilState} from 'recoil'
import { searchResultState } from '../atoms/searchResultAtom'
import { loadingState } from '../atoms/loadingAtom'

const InputSection = () => {

    const [searchResults, setSearchResults] = useRecoilState(searchResultState)
    const [isLoading, setIsLoading] = useRecoilState(loadingState)
    const [inputBoxValue, setInputBoxValue] = useState('')

    const getRandomAdvice = async () => {
        if(isLoading){
            return
        }

        setIsLoading(true)
        const response = await fetch(`https://api.adviceslip.com/advice`, {
            method : 'GET'
        })

        const data = await response.json()

        const newResultArray = []
        newResultArray.push(data.slip)
        setSearchResults(newResultArray) 
        setIsLoading(false)   
    }

    const getSpecificAdvices = async (keyWord) => {
        if(isLoading){
            return
        }

        setIsLoading(true)

        const response = await fetch(`https://api.adviceslip.com/advice/search/${keyWord}`,{
            method : 'GET'
        })

        const data = await response.json()

        if(data?.message?.text === 'No advice slips found matching that search term.'){
            setSearchResults([{id:1, advice:'No Advices Found'}])
            setIsLoading(false)
            setInputBoxValue('')
            return
        }

        setSearchResults(data.slips)
        setInputBoxValue('')
        console.log(data)

        setIsLoading(false)
    }

    console.log(searchResults)

    const onRandomAdviceClick = () => {
        getRandomAdvice()
    }

    const onSearchAdviceClick = () => {
        if(inputBoxValue === undefined || inputBoxValue === '' ){
            return
        }
        getSpecificAdvices(inputBoxValue)
    }

    const changeInputBoxValue = (e) => {
        setInputBoxValue(e.target.value)
    }

    return (
        <div className="whole-input-section">
            <h1 className="text-warning mt-4">Uncle Advice</h1>
            <input className="form-control form-control-lg input-box" type="text" placeholder="Advice Search" aria-label=".form-control-lg example" value={inputBoxValue} onChange={(e) => changeInputBoxValue(e)} />
            <div className="buttons-group">
                <button type="button" className="btn btn-success button text-warning" onClick={onSearchAdviceClick}>Search</button>
                <button type="button" className="btn btn-warning button text-success" onClick={onRandomAdviceClick}>Random</button>
            </div>
        </div>
    )
}

export default InputSection
