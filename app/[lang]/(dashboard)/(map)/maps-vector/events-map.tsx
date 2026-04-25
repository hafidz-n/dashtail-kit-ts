"use client"

import { useState } from "react";
import world from "./worldmap.json";
import { VectorMap } from "@south-paw/react-vector-maps";

const EventVMap = ({ height = 350 }: any) => {

    const [hovered, setHovered] = useState('None');
    const [focused, setFocused] = useState('None');
    const [clicked, setClicked] = useState('None');

    const layerProps = {
        onMouseEnter: ({ target }: any) => setHovered(target.attributes.name.value),
        onMouseLeave: ({ target }: any) => setHovered('None'),
        onFocus: ({ target }: any) => setFocused(target.attributes.name.value),
        onBlur: ({ target }: any) => setFocused('None'),
        onClick: ({ target }: any) => setClicked(target.attributes.name.value),
    };

    return (
        <div>
            <div className={`w-full h-[${height}px]`}>
                <VectorMap  {...world} layerProps={layerProps} className="h-full w-full object-cover dashtail-codeVmapInfo" />
            </div>
            <div className="text-center">
                <p className="text-sm font-medium text-card-foreground">Hovered: {hovered && <strong className="text-primary">{hovered}</strong>}</p>
                <p className="text-sm font-medium text-card-foreground">Focused: {focused && <strong className="text-primary">{focused}</strong>}</p>
                <p className="text-sm font-medium text-card-foreground">Clicked: {clicked && <strong className="text-primary">{clicked}</strong>}</p>
            </div>

        </div>
    )
};

export default EventVMap;