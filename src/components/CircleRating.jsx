import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


const CircleRating = ({ rating, className, fillColor }) => {
    return (
        <div className={`bg-black3 rounded-full p-[2px] text-[34px] ${className}`}>
            <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating}

                styles={buildStyles({
                    textSize: '34px',
                    rotation: 0.25,
                    fill: fillColor,
                    textColor: fillColor,

                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                })}
            />
        </div>
    )
}

export default CircleRating