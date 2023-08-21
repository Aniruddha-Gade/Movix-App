import React, { useState } from 'react'


const SwitchTabs = ({ data, onTabChange }) => {
    // initially selected tab will be index of first name from prop - data Array
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);


    const activeTab = (tab, index) => {
        // it will move by this value, as we declare fixed value - [100px]
        setLeft(index * 100)
        setTimeout(() => {
            setSelectedTab(index);
        }, 300);

        onTabChange(tab, index);
    }


    return (
        <div className='h-[34px] bg-white rounded-[20px] p-[2px] '>
            <div className='flex items-center h-[30px] relative '>
                {
                    data.map((tab, index) => (
                        <span
                            key={index}
                            onClick={() => activeTab(tab, index)}
                            className={`h-full flex text-black items-center justify-center w-[100px] text-sm relative z-[1] cursor-pointer 
                             tabItem ${selectedTab === index ? "active" : ""
                                }`}
                        >
                            {tab}
                        </span>
                    ))
                }

                {/* moving bg */}
                <span
                    style={{ left }}
                    className='h-[30px] w-[100px] rounded-[15px] absolute left-0 movingBg '
                />
            </div>
        </div>
    )
}

export default SwitchTabs




// import React, { useState } from "react";



// const SwitchTabs = ({ data, onTabChange }) => {
//     const [selectedTab, setSelectedTab] = useState(0);
//     const [left, setLeft] = useState(0);

//     const activeTab = (tab, index) => {
//         setLeft(index * 100);
//         setTimeout(() => {
//             setSelectedTab(index);
//         }, 300);
//         onTabChange(tab, index);
//     };

//     return (
//         <div className="switchingTabs">
//             <div className="tabItems">
//                 {data.map((tab, index) => (
//                     <span
//                         key={index}
//                         className={`tabItem ${
//                             selectedTab === index ? "active" : ""
//                         }`}
//                         onClick={() => activeTab(tab, index)}
//                     >
//                         {tab}
//                     </span>
//                 ))}
//                 <span className="movingBg" style={{ left }} />
//             </div>
//         </div>
//     );
// };

// export default SwitchTabs;