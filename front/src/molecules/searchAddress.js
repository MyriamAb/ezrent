import Input from '../atoms/input'
import React, {useState, useEffect} from 'react'

export default function SearchAddress () {
    const [data, setAddress] = useState(null)
    const [result, setResult] = useState(null)

    function handle (e) {
        const newdata = {...data}
        newdata[e.target.name] = e.target.value
        setAddress(newdata)
    }   
        useEffect(() =>{
            if (data) {

                fetch('https://api-adresse.data.gouv.fr/search/?q=' + data.searchAddress,
                {
                    method: "GET",
                    headers: { "Content-type": "application/json" },
                })
                .then(response => response.json())
                .then(res => setResult(res));   
            }
    },[data])
    const listItems = result?.features.map((feature) =>
      <ul>{feature.properties.label}</ul>
    )
    return (
      <div>
      <label 
      for='address-input'
      id='address-label'
      className='combobox-label'
      />
      <div className="combobox-wrapper">     
        <div
        role="combobox"
        aria-expanded="false"
        aria-owns="address-listbox"
        aria-haspopup="listbox"
        id="address-combobox">
          <Input
            icon='search'
            iconPosition='left'
            placeholder='enter your adress'
            role="combobox"
            onChange={(e)=>handle(e)}
            name='searchAddress'
            value={data?.searchAddress ?? ''}
            autocomplete='list'
            controls='address-listbox'
            id='address-input'
            /> 
            </div>
          <ul 
            aria-labelledby="address-input"
            role="listbox"
            id="adress-listbox"
            className="listbox hidden"
            >
              {listItems}
          </ul>
      </div>
      </div>
    )
}

