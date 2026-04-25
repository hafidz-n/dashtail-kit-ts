"use client"

import world from "./worldmap.json";
import { VectorMap } from "@south-paw/react-vector-maps";

const LayerLinks = ({ height = 350 }: any) => {
    const onClick = ({ target }: any) => {
        const name = target.attributes.name.value;
        window.open(`https://www.google.com/search?q=${name}%20nz`)
    }

    return (
        <div className={`w-full h-[${height}px]`}>
            <VectorMap {...world} layerProps={{ onClick }} className="h-full w-full object-cover dashtail-codeVmapSuccess" />
        </div>
    );
};

export default LayerLinks;
