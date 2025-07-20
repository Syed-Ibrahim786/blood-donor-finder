import React, { useState } from 'react'
import axios from 'axios'
import {State , City} from 'country-state-city'

export default function LocationGetter() {


    const state = State.getStatesOfCountry('IN');
    return state

}

export function cityGetter(state) {
        let code ;
        const stateValue = State.getStatesOfCountry('IN');

        stateValue.forEach((item)=>{
            if(state === item.name){
                 code = item.isoCode
            }
        })

       const  city= City.getCitiesOfState('IN' , `${code}`)
       return city

}
