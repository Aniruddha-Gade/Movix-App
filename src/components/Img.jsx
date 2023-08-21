import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const Img = ({ src, className, alt }) => {
    return (
        <LazyLoadImage
            className={className || 'absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden'}
            alt={alt || 'Image'}
            effect='blur'
            src={src}
        />
    )
}


export default Img