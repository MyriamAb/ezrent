import React from 'react'
import InProcessAds from './inProcessAds'
import PastAds from './pastAds'


export default function MyAds(){
    return(
        <div>
           <InProcessAds/>
           <PastAds/>
        </div>
    )
}