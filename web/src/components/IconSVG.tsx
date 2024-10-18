import React from 'react';
import { ReactSVGElement } from 'react';
type Props = {
    SvgIcon: any,
    color?: string,
    width?: string,
    height?: string
}
// A general component to render any SVG by file path
const IconSVG = ({ SvgIcon, color = 'black', width = '100', height = '100' }: Props) => {
    return (
        <SvgIcon
            width={width}
            height={height}
            style={{ fill: color }} // Set the dynamic color
        />
    );
};

export default IconSVG;
