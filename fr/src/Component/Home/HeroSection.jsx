import React from 'react'
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {

    const details = [
        {
          id: 1,
          title: "1,23,441",
          subTitle: "Live Job",
          icon: <FaSuitcase />,
        },
        {
          id: 2,
          title: "91220",
          subTitle: "Companies",
          icon: <FaBuilding />,
        },
        {
          id: 3,
          title: "2,34,200",
          subTitle: "Job Seekers",
          icon: <FaUsers />,
        },
        {
          id: 4,
          title: "1,03,761",
          subTitle: "Employers",
          icon: <FaUserPlus className='icon'/>,
        },
      ];

    return (
        <div className='row mt-5 hero'>
            <div className="px-5  text-start col-xl-5 col-md-5 col-sm-12 col-12">
                <div className='  text-success fw-bolder'>
                   <h1>Find a job that suits</h1> <h1> your interests and  </h1> <h1>skills</h1></div>
                <p className='mt-2'>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                    voluptate repellat modi quidem aliquid eaque ducimus ipsa et,
                    facere mollitia!
                </p>
            </div>

            <div className=" px-5 col-xl-5 col-md-5 col-sm-12 col-12">
                
                <img src="/heroS.jpg" className='img-fluid   mt-2' />
                </div>

                <div className="my-5 details d-flex justify-content-around flex-wrap">
          {details.map((element) => {
            return (
              <div className="col-xl-2 m-1 d-flex justify-content-center flex-column text-center p-2 col-md-2 col-sm-5 col-5 card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <h5>{element.title}</h5>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        </div>
    )
}

export default HeroSection
