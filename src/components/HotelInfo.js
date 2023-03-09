
// import hotelArrivalInfo from './data/hotel_arrival_info.json'
// import hotelServices from './data/hotel_services.json'
// import hotelAccessibility from './data/hotel_accessibility.json'
import { React, useState, useEffect } from 'react'
const HotelInfo = () => {
    const [hotelArrivalInfo, setHotelArrivalInfo] = useState([]);
    const [hotelServices, setHotelServices] = useState([]);
    const [hotelAccessibility, setHotelAccessibility] = useState([]);

    const loadHotelArrivalInfo = async () => {
        const resp = await fetch('https://fq7nfs7qol.execute-api.us-east-2.amazonaws.com/Production/arrival-info')
        const respData = await resp.json();
        setHotelArrivalInfo(respData)
    }

    const loadHotelServices = async () => {
        const resp = await fetch('https://fq7nfs7qol.execute-api.us-east-2.amazonaws.com/Production/services')
        const respData = await resp.json();
        setHotelServices(respData)
    }

    const loadHotelAccessibility = async () => {
        const resp = await fetch('https://fq7nfs7qol.execute-api.us-east-2.amazonaws.com/Production/accessabilities')
        const respData = await resp.json();
        setHotelAccessibility(respData)
    }

    useEffect(() => {
        loadHotelArrivalInfo();
        loadHotelServices();
        loadHotelAccessibility();
    }, [])

    return (
        <div className="scene" id="hotelinfo">
            <article className="heading">
                <h1>Essential Info</h1>
            </article>
            <article id="usefulinfo">
                <section id="arrivalinfo">
                    <h2>Arrival Information</h2>
                    <ul>
                        {
                            hotelArrivalInfo.map((info, index) => {
                                return (
                                    <li key={index}><strong>{info.name}</strong> {info.description}</li>
                                )
                            })
                        }
                    </ul>
                </section>
                <section className="checklist" id="services">
                    <h2>Services and Amenities</h2>
                    <p>Our services and amenities are designed to make your travel easy, your stay comfortable, and your experience one-of-a-kind.</p>
                    <ul>
                        {
                            hotelServices.map((service, index) => {
                                return (
                                    <li key={index}>{service.name}</li>
                                )
                            })
                        }
                    </ul>
                </section>
                <section className="checklist" id="accessibility">
                    <h2>Accessibility</h2>
                    <p>We're committed to maintaining the same quality of service for every individual. We offer the following facilities for those with special needs:</p>
                    <ul>
                        {
                            hotelAccessibility.map((access, index) => {
                                return (
                                    <li key={index}>{access.name}</li>
                                )
                            })
                        }
                    </ul>
                </section>
            </article>
            <article id="greenprogram">
                <h2>Landon Green Program</h2>
                <p><strong>The Landon Hotel - London</strong> was recently renovated, and we considered the impact on the earth the entire way. From green building materials, to solar power, to energy-friendly lighting and appliances throughout the hotel - we’re saving energy in every socket, outlet, and switch. We’ve also initiated a recycling and composting program that reduces the load to local landfills, while providing valuable raw material for use in new products, or in the case of compost, for use in local gardens and landscapes.</p>
            </article>
        </div>
    )
}

export default HotelInfo