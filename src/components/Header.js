
import { React, useState, useEffect } from 'react'
// import menuLinksData from './data/menu_links.json'

const Header = () => {

    const [menuLinksData, setMenuLinksData] = useState([]);
    const loadMenuLinksData = async () => {
        // Query the API gateway
        const resp = await fetch('https://fq7nfs7qol.execute-api.us-east-2.amazonaws.com/Production/menu-links')
        const respData = await resp.json();
        console.log(respData)
        // Assign response data to our state variable
        setMenuLinksData(respData)
    }


    useEffect(() => {
        // Load the menu links data from the API Gateway
        loadMenuLinksData();
    }, [])

    return (
        <header id="intro">
            <article className="fullheight">
                <div className="hgroup">
                    <h1>Landon Hotel</h1>
                    <h2>West London</h2>
                    <p><a href="#welcome"><img src="https://landonhotel.com/images/misc/arrow.png" alt="down arrow" /></a></p>
                </div>
            </article>

            <nav id="nav">
                <div className="navbar">
                    <div className="brand"><a href="#welcome">Landon <span>Hotel</span></a></div>
                    <ul>
                        {
                            menuLinksData.map((link, index) => {
                                return (
                                    <li key={index}>
                                        <a className={`icon ${link.class}`} href={`#${link.href}`}>
                                            <span>{link.text}</span>
                                        </a>
                                    </li>
                                );
                            })
                        }
                    </ul>

                </div>
            </nav>
        </header>
    )
}

export default Header