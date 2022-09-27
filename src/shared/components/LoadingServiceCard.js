import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

const LoadingServiceCard = (props) => (
    <ContentLoader 
        speed={1}
        width={152}
        height={250}
        margin={4}
        viewBox="0 0 152 250"
        backgroundColor="#373535"
        foregroundColor="#B0B0B0"
        {...props}
    >
        <Rect x="0" y="0" rx="8" ry="8" width="152" height="150" /> 
        <Rect x="8" y="230" rx="8" ry="8" width="134" height="14" /> 
        <Rect x="8" y="192" rx="8" ry="8" width="62" height="12" /> 
        <Rect x="8" y="170" rx="8" ry="8" width="134" height="12" />
    </ContentLoader>
)

export default LoadingServiceCard

