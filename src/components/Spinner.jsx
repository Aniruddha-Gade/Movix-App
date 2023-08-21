import React from 'react';


const Spinner = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center text-white text-3xl gap-5'>
      <div className="custom-loader"></div>
      <p>Loading...!</p>
    </div>
  );
}

export default Spinner;
