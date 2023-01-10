import React, { useEffect, useState } from 'react';
import '../Styles/home.css';
import Wallpaper from './Wallpaper';
import QuickSearch from './QuickSeach';
import { mealtype } from '../OmitoData/mealtype';
import { location } from '../OmitoData/location';

import axios from 'axios';

const Home = () => {
    const[locations, setLocations] = useState([])
    const[mealtypes, setMealtypes] = useState([])

    useEffect(()=>{
        sessionStorage.clear();
        setLocations(location)
        setMealtypes(mealtype)
    },[])


    return (
        <>
            <div>
                <Wallpaper locationsData={locations} />
                <QuickSearch mealtypesData={mealtypes} />
            </div>
        </>
    )

}

export default Home;

// class Home extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             locations: [],
//             mealtypes: []
//         }
//     }

//     componentDidMount() {
//         sessionStorage.clear();
//         axios({
//             method: 'GET',
//             url: 'https://limitless-refuge-87216.herokuapp.com/locations',
//             headers: { 'Content-Type': 'application/json' }
//         })
//             .then(response => {
//                 this.setState({ locations: response.data.locations })
//             })
//             .catch()

//         axios({
//             method: 'GET',
//             url: 'https://limitless-refuge-87216.herokuapp.com/mealtypes',
//             headers: { 'Content-Type': 'application/json' }
//         })
//             .then(response => {
//                 this.setState({ mealtypes: response.data.mealtype })
//             })
//             .catch()
//     }
//     componentDidMount(){
//         this.setState({
//             mealtypes,
//             locations,    
//         })
//      }
//     render() {
//         const { locations, mealtypes } = this.state;
//         return (
//             <div>
//                 <Wallpaper locationsData={locations} />
//                 <QuickSearch mealtypesData={mealtypes} />
//             </div>
//         )
//     }
// }

// export default Home;