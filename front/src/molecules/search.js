import React, {useState, useEffect} from 'react'
import InputType from '../atoms/input'
import SelectType from '../atoms/select'
import Checkbox from '../atoms/checkbox'
import useRentals from '../context/rentals'

function Search(props) {
  const rentalsContext = useRentals()
  const [data, setData]= useState({search:"", location:"", minPrice:"", maxPrice:"", 
                                  dateFrom:"", dateTo:"", activities:""})
  const [globalFilter, setGlobalFilter] = useState(() => [])
  let filteredtab = rentalsContext.allRentals;

  const optionService = [
    { key: 'di', value: 'di', text: 'Select an activity' },
    { key: 'va', value: 'va', text: <Checkbox label="Vacation" value="vacation" /> },
    { key: 'pa', value: 'pa', text: <Checkbox label="Party" value="party" />},
    { key: 'ph', value: 'ph', text: <Checkbox label="Photo Shooting" value="photo_shooting" />},
    { key: 'mo', value: 'mo', text: <Checkbox label="Movie Shooting" value="movie_shooting" />},
    { key: 'ce', value: 'ce', text: <Checkbox label="Celebration" value="celebration" /> },
    { key: 'se', value: 'se', text: <Checkbox label="Seminaries" value="seminaries" /> },
    { key: 'bu', value: 'bu', text: <Checkbox label="Business trip" value="business_trip" /> }  
  ]

  function handle(e){
    e.preventDefault()
    const newdata = {...data}
    newdata[e.target.name] = e.target.value
    setData(newdata)
  }
  
  function parseDate(str) {
    var datesplit = str.slice(0, 10);
    var mdy = datesplit.split('-');
    return new Date(mdy[0], mdy[1]-1, mdy[2]); 
}

  useEffect(() => {
    console.log(data)
    setGlobalFilter([])
    if (data.search != ""){
       globalFilter.push("`${item.title.toLowerCase()}`.includes(data.search.toLowerCase())" )
    }
    if (data.location != ""){
       globalFilter.push("`${item.address.toLowerCase()}`.includes(data.location.toLowerCase())")
    }
    if (data.minPrice != ""){
       globalFilter.push("parseFloat(item.price) >= parseFloat(data.minPrice)")
    }
    if (data.maxPrice != ""){
      globalFilter.push("parseFloat(item.price) <= parseFloat(data.maxPrice)")
    }
    if (data.dateFrom != ""){
      globalFilter.push("parseDate(item.start).getTime() <= parseDate(data.dateFrom).getTime()")
    }
    if (data.dateTo != ""){
      globalFilter.push("(parseDate(item.end).getTime() >= parseDate(data.dateTo).getTime())")
    }

    if(globalFilter.length==0)
        rentalsContext.search(rentalsContext.allRentals)
    if(globalFilter.length==1)
        rentalsContext.search(filteredtab.filter(item => eval(globalFilter[0]) ))
    if(globalFilter.length==2)
        rentalsContext.search(filteredtab.filter(item => eval(globalFilter[0]) && eval(globalFilter[1]) ))
    if(globalFilter.length==3)
        rentalsContext.search(filteredtab.filter(item => eval(globalFilter[0]) && eval(globalFilter[1]) && eval(globalFilter[2]) ))
    if(globalFilter.length==4)
        rentalsContext.search(filteredtab.filter(item => eval(globalFilter[0]) && eval(globalFilter[1]) && eval(globalFilter[2]) && eval(globalFilter[3])))
    if(globalFilter.length==5)
      rentalsContext.search(filteredtab.filter(item => eval(globalFilter[0]) && eval(globalFilter[1]) 
      && eval(globalFilter[2]) && eval(globalFilter[3]) && eval(globalFilter[4]) ))
    if(globalFilter.length==6)
      rentalsContext.search(filteredtab.filter(item => eval(globalFilter[0]) && eval(globalFilter[1]) 
      && eval(globalFilter[2]) && eval(globalFilter[3] && eval(globalFilter[4]) && eval(globalFilter[5]) )))
  },[data])

  return (
    <div style={props.style}>
      <InputType onChange={(e)=>handle(e)} icon="search" iconPlaceholder="right" type="text" name="search" placeholder="Search" style={{width:200}}/>
      <InputType onChange={(e)=>handle(e)} icon="map marker alternate" iconPlaceholder="right" type="text" name="location" placeholder="Location" style={{width:200}} />
      <InputType onChange={(e)=>handle(e)} icon="euro sign" iconPlaceholder="right" type="text" name="minPrice" placeholder="Min Price" style={{width:100}}/>
      <InputType onChange={(e)=>handle(e)} icon="euro sign" iconPlaceholder="right" type="text" name="maxPrice" placeholder="Max Price" style={{ width: 100 }} />
      <InputType  onChange={(e)=>handle(e)} type="date" name="dateFrom" placeholder="From" style={{width:100}}/>
      <InputType  onChange={(e)=>handle(e)} type="date" name="dateTo" placeholder="To" style={{width:100}}/>
      <SelectType onChange={(e)=>handle(e)} name="activities" placeholder="Select an activity" options={optionService} style={{width:200}}/>
    </div>
    
  )
}

export default Search