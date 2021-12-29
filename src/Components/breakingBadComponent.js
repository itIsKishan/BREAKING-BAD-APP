import React, { useState, useEffect } from 'react'
import axios from 'axios'

const BreBadComponent = () =>{
    const [ data, setData ] = useState([])
    const [ search, setSearch ] = useState('')

    //filter data
    const filterCharacter =  data.filter((charc) =>{
        return charc.name.toLowerCase().includes(search) || charc.nickname.toLowerCase().includes(search) || charc.portrayed.toLowerCase().includes(search)
    })

    //handle search
    const handleInputChange = (e) =>{
        setSearch(e.target.value)
    }

    // fetch data from api
    const fetch = async() =>{
        let response
        try{
            response = await axios.get('https://www.breakingbadapi.com/api/characters')
            console.log('data',response.data)
            setData(response.data)
        } catch (err) {
            console.log('err',err)
        }
    }

    useEffect(() =>{
        fetch()
    },[])
    
    return(
        <div className='img-container'>
            <input type = 'search' id = 'searchCharacter' value = { search } placeholder='Search Character' onChange={ handleInputChange } />

            {
                filterCharacter.map((char) =>{

                    return(

                        <div className = 'container'>
                                <img src = { char.img } alt='character' />
                            <div className = 'info'>
                                <b>Actor Name : { char.portrayed } </b><br/>
                                <b>Character Name : { char.name } </b><br/>
                                <b>Nick Name : { char.nickname } </b><br/>
                                <b>Appeared Episode : { char.appearance.join() } </b><br/>
                                <b>Potrayed Role : { char.occupation.join()} </b><br/>
                            </div>
                        </div>

                    )
                })
            }
        </div>
    )
}

export default BreBadComponent