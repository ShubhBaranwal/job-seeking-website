import React from 'react'
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";



const PopularCategories = () => {
    const categories = [
        {
          id: 1,
          title: "Graphics & Design",
          subTitle: "305 Open Positions",
          icon: <MdOutlineDesignServices className='icon'/>,
        },
        {
          id: 2,
          title: "Mobile App Development",
          subTitle: "500 Open Positions",
          icon: <TbAppsFilled className='icon' />,
        },
        {
          id: 3,
          title: "Frontend Web Development",
          subTitle: "200 Open Positions",
          icon: <MdOutlineWebhook className='icon' />,
        },
        {
          id: 4,
          title: "MERN STACK Development",
          subTitle: "1000+ Open Postions",
          icon: <FaReact className='icon' />,
        },
        {
          id: 5,
          title: "Account & Finance",
          subTitle: "150 Open Positions",
          icon: <MdAccountBalance className='icon' />,
        },
        {
          id: 6,
          title: "Artificial Intelligence",
          subTitle: "867 Open Positions",
          icon: <GiArtificialIntelligence className='icon' />,
        },
        {
          id: 7,
          title: "Video Animation",
          subTitle: "50 Open Positions",
          icon: <MdOutlineAnimation className='icon' />,
        },
        {
          id: 8,
          title: "Game Development",
          subTitle: "80 Open Positions",
          icon: <IoGameController className='icon' />,
        },
      ];

    return (
    <div className='row my-5 d-flex justify-content-center'>
      <h1 className='text-center text-success my-3'>POPULAR CATEGORIES</h1>
{categories.map((item)=>{
    return <div key={item.id} className="col-xl-3   m-4 p-4 shadow-lg bg-light text-center col-md-4 col-sm-6 col-6">
    {/* <img src="./vite.svg" width="50px" className='img-fluid m-auto' alt="" /> */}
    {item.icon}
    <div>
        <h2>{item.title}</h2>
<p>{item.subTitle}</p>
    </div>
</div>
})

}

    
    </div>
  )
}

export default PopularCategories
