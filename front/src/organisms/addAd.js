import AdPartie1 from '../molecules/createAdContentP1'
import AdPartie2 from '../molecules/createAdContentP2'
import React, { useRef, useState } from 'react'
import { Modal } from 'semantic-ui-react'
import Button from '../atoms/button'
import useRentals from '../context/rentals'
import Moment from 'moment';

export default function ModalMultiple() {
  const rentalsContext = useRentals()
  const [firstOpen, setFirstOpen] = useState(false)
  const [secondOpen, setSecondOpen] = useState(false)
  
  function submit(data){
    rentalsContext.postAd(data)
  }
  const [data, setData]= useState({
    address: '',
    title:"",
    description:"",
    capacity:'',
    services:[],
    price:'',
    start:'',
    end:'',
    picture:{},
    latitude:'',
    longitude:''
  })
  function handle(e, dataselect){
    const newdata={...data}
      if(String(dataselect?.id) === 'capacity'){
        newdata[dataselect.id] = dataselect.value
      }
      if(String(e.target?.id) === 'picture'){
        const { files } = e.target;
        if (files && files.length) {
          const filename = files[0].name;
          var parts = filename.split(".");
          const fileType = parts[parts.length - 1];
          console.log(fileType); //ex: zip, rar, jpg, svg etc.
          console.log(files[0])
          newdata[e.target.id] = files[0]
        }
      }
      if(e.target?.id ){
        newdata[e.target.id] = e.target.value
      }
      if(String(e.type) === 'click' && String(e.target.className) !== 'text' && String(e.target.className) !== 'item' && String(e.target.localName) !== "label")
      {
        newdata['address'] = e.target.innerText
      }
      if(String(e.type) === 'click' && String(e.target.localName) === "label")
      {
        newdata['services'].push(e.target.innerText)
      }
      if(e.target === undefined && e[0] === undefined) {
        console.log(e.target)
        console.log(e[0])
        let number = parseInt(e.price, 10);
        newdata['price'] = number
      }
      if(e[0]){
        newdata['start'] = Moment(e[0]).format('YYYY-MM-DD')
      }
      if(e[1]){
        newdata['end'] = Moment(e[1]).format('YYYY-MM-DD')
      }
      setData(newdata)
  }
  
  const inputFile = useRef(null);
  const onButtonClick = () => {
    inputFile.current.click();
  }

  console.log(data)
  return (
    <>
      <Button onClick={() => setFirstOpen(true)} content="Add an ad"></Button>
      <Modal
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
      >
        <Modal.Header>         
          Do you want rent a place? Good place for that
        </Modal.Header>
        <Modal.Content>
          <AdPartie1 onChange={e=>handle(e)} onChangeCapacity={handle} onInputChange={handle}/>
        </Modal.Content>
        <Modal.Actions>
          <Button 
          onClick={() => setFirstOpen(false)} 
          content='Cancel'
          basic color='red'
          icon='cancel'
          iconPosition='right'
          />
          <Button 
          onClick={() => setSecondOpen(true)} 
          content='Next Step'
          basic color='teal'
          icon='right chevron'
          iconPosition='right'
          />
        </Modal.Actions>

        <Modal
          open={secondOpen}
          size='small'
        >
          <Modal.Header>
            Do you want rent a place? Good place for that
          </Modal.Header>
          <Modal.Content>
            <AdPartie2 
            onChangePrice={(e) => handle(e)} 
            onChange={(e) => handle(e)} 
            onClick={onButtonClick} 
            refImage={inputFile} 
            onChangeImage={handle}
            id='picture'
          />
          </Modal.Content>
          <Modal.Actions>
          <Button
              icon='arrow left'
              content='Preceed'
              basic color='orange'
              onClick={() => {setSecondOpen(false); setFirstOpen(true)}}
            />
            <Button
              icon='check'
              content='All Done'
              basic color='green'
              onClick={() => {setSecondOpen(false); setFirstOpen(false); submit(data)}}
            />
          </Modal.Actions>
        </Modal>
      </Modal>
    </>
  )
}
