import { CarouselProvider, Slider } from "pure-react-carousel";
import React, { useEffect, useState } from "react";
import ImageSlide from '../atoms/imageSlide'
import CustomDotGroup from "../atoms/cardDotGroup";
import "pure-react-carousel/dist/react-carousel.es.css"
import useRentals from '../context/rentals'

function ImageCarousel(props) {
  var slide = null
  const [nbSlides, setNbSlides] = useState(0)
  const [rentalImages, setRentalImages] = useState([])
  const RentalsContext = useRentals()
  const pictures = RentalsContext?.pictures
  const [tabImages, setTabImages] = useState([])

  useEffect(()=>{
    if (pictures == undefined) {
      return 
    }
    else {
      let tmp = [... rentalImages]
      for (let i=0; i < pictures?.length; i++){
        tmp.push({
          id : pictures[i]?.id,
          rental_id: pictures[i]?.rental_id,
          ad_pictures: pictures[i]?.image_blob === null ||  pictures[i]?.image_blob === undefined ? 
          "/noPicture.png":
          typeof(pictures[i]?.image_blob) === 'string' ?
          pictures[i]?.image_blob :
          new Buffer.from(pictures[i]?.image_blob?.data,'base64').toString()
        })
      }
      setRentalImages(tmp)
      displayPictures(rentalImages)
    }
  }, [pictures])
  
  console.log(rentalImages)
  function displayPictures(data) {
    if (data === null) {
      console.log('null')
      setTabImages(<ImageSlide src='/noPicture.png'/>)
    }
    else {
      let tmp = [...tabImages]
      data.forEach(el => {
        if (el.rental_id === props.rental_id) {
          if (el.id !== props.id) {
            setNbSlides(nbSlides + 1)
            for (let i = 0; i < data.length; i++){
              tmp.push (
                <ImageSlide key={data[i].id} index={data[i].id} src={data[i].ad_pictures} href={"/addetails/" + el.rental_id} />
                )
              }
            }
          } 
        })
        setTabImages(tmp)
      }
      return tabImages
    }
  return (
  <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1}
    totalSlides={nbSlides}
    styles={props.styles}
  >
      <Slider>
        {tabImages}
      </Slider>
    <CustomDotGroup slides={nbSlides} />
  </CarouselProvider>
  )
}

export default ImageCarousel;