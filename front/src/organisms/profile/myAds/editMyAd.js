import React, { useEffect, useState } from "react";
import { Icon, Item, Grid, Container, Header, Image, Form, TextArea, Input, Button } from "semantic-ui-react";
import useRentals from "../../../context/rentals"
import useReservations from '../../../context/reservation'
import { useParams } from "react-router"
import useUser from '../../../context/user'
import ButtonImage from '../../../atoms/buttonImage'

function EditMyAd(props) {
  const rentalsContext = useRentals()
  const reservationContext = useReservations()
  var rentals = rentalsContext?.allRentals ?? null;
  const [rental, setRental] = useState({})
  const { id } = useParams()
  var ownerId = ''
  const userContext = useUser()
  const [edit, setEdit] = useState(false)
  const [adPictures, setAdPictures] = useState(() => [])
  const [data, setData] = useState({
    title:"",
    description:"",
    address:"",
    price: "", 
    start:"",
    end:""
  })
  const beforeAdPic = rentalsContext.picturesById(id)

  useEffect(() => {
    const res = rentals?.find(element => element.id == id) 
    setRental(res)
    
      if (res === null || res === undefined)
        return
      ownerId = res.owner_id

  }, [id, rentals, ownerId, userContext])

  useEffect(() => {
    setData({
      title: rental?.title,
      description:rental?.description,
      address:rental?.address,
      price: rental?.price, 
      start:rental?.start,
      end:rental?.end
    })
  },[rental])

  const styles = {
    container: {
      backgroundColor: '#FFFFFF'
    },
    container1: {
      backgroundImage: `url('https://i.ibb.co/LCFVjr4/background-home-resize.jpg')`
    },
    image: {
      width: 500,
      height: 500,
    }
  }

  function handleChange(e){
    const newdata={...data}
    newdata[e.target.name] = e.target.value
    setData(newdata)
  }

  function editForm(e, bool){
    e.preventDefault()
    setEdit(bool)
  }

  function editAd(e){
    console.log("entrée edit : "); console.log(data)
    rentalsContext.editRentals(id, data)
    if(adPictures.length>0){
        rentalsContext.postPictures({
          image_name: 'rental'+ id,
          data: {id: id},
        }, adPictures)
    }
    editForm(e,false)
  }

  function fileUploadInputChange(e) {
    e.preventDefault()
    let reader = new FileReader();
    reader.onload = function(e) {
      console.log("image upload : ")
      setAdPictures(prev => [...prev, e.target.result]);
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  
  function deleteChosenPic(e, index){
    e.preventDefault()
    var newdata = [...adPictures]
    newdata.splice(index, 1);
    console.log(newdata)
    setAdPictures(newdata) 
  }

  function deletePicDb(e, index){
    e.preventDefault()
    rentalsContext.deletePictures(index)
  }

  return (
    <div style={styles.container1}>
      <Container style={styles.container}>
        <Grid >
          <Grid.Row>
            <Grid.Column width={11}>
              <Header as='h1' style={{ marginTop:5 }}>
              {edit ===false ?
                rental?.title:
                <Input name="title" onChange={(e)=>handleChange(e)} value={data.title} placeholder='Enter the price' />
              } 
              </Header>
            </Grid.Column>
            <Grid.Column width={5}>
              <Icon name='usermap marker alternate' />
              {rental?.address}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          <Grid.Column  width={3}>
            Picture posted : 
            {beforeAdPic.map((pic, index) => (
            edit ===false ?
              <div>
                <Image src={pic.blob} avatar />
                <span> Picture {index} </span>
              </div>:
              <div>
                <Image src={pic.blob} avatar />
                <span> Picture {index} </span>
                <Button onClick={(e) => deletePicDb(e, pic.id)}> <Icon name='close' /> </Button>
              </div>
            ))
          }
          </Grid.Column>
          <Grid.Column  width={10}>
            <Image centered style={styles.image} src={'https://storage.googleapis.com/epc-photos/photo_5a1864ac-62a4-4a09-893a-6b5b85bc0d2d.png'} />
            </Grid.Column>
            <Grid.Column  width={3}>
              {edit ===false ?
              "":
              <div>
                <ButtonImage onChange={(e) => fileUploadInputChange(e)} id="adPictures" />
                New pictures : 
                {adPictures.map((pic, index) => (
                    <div>
                      <Image src={pic} avatar />
                      <span> Picture {index} </span>
                      <Button onClick={(e) => deleteChosenPic(e, index)}> <Icon name='close' /> </Button>
                    </div>
                  ))
                }
              </div>
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
       <Grid celled>
          <Grid.Row>
            <Grid.Column width={11}>
              <Item.Header as='h5'>Description</Item.Header>
              {edit ===false ?
              rental?.description:
              <Form>
                <TextArea name="description" onChange={(e)=>handleChange(e)} rows={2} value={data.description} placeholder='Enter a description' />
              </Form>
              }
            </Grid.Column>
            <Grid.Column width={5}>
            <Item.Header as='h5'>  Availability : </Item.Header>
              <Grid.Row>
                {`From : ${rental?.start?.slice(0,10)}`} <br/>
                {`To :  ${rental?.end?.slice(0,10)}` }
              </Grid.Row> <br/>
              <Grid.Row> 
                <Item.Header as='h5'>Price per day:</Item.Header>
                  $ {rental?.price }
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid centered>
        {edit ===false ?
          <Button content="Click to edit" icon='edit' labelPosition='left' onClick={(e) => editForm(e, true)}/>
          :
        <div>
          <Button content="Edit the ad" icon='edit' labelPosition='left'  onClick={(e) => editAd(e)} positive/>
          <Button content="Cancel" onClick={(e) => editForm(e, false)}/>
        </div>
        }
        </Grid>
    </Container>
    </div>
  )
}
export default EditMyAd