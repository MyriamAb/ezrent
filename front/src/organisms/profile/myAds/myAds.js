import React, {useEffect, useState} from 'react'
import { Grid, Segment, Header, Button } from 'semantic-ui-react'
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