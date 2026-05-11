import { Dropdown } from "primereact/dropdown";
import Basemap from "@arcgis/core/Basemap";
import { useState } from "react";
import Map from "@arcgis/core/Map";

interface Props {
    map: Map | null;
}

const basemaps = [
    { label: 'Ruas', value: 'streets-navigation-vector' },
    { label: 'Satélite', value: 'satellite' },
    { label: 'Híbrido', value: 'hybrid' },
    { label: 'Topográfico', value: 'topo-vector' },
    { label: 'Cinza escuro', value: 'dark-gray-vector' },
];

export default function BasemapSwitcher({ map }: Props) {
    const [selected, setSelected] = useState('streets-navigation-vector');

    const handleChange = (value: string) => {
        setSelected(value);
        if (map) {
            map.basemap = Basemap.fromId(value);
        }
    };

    return (
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}>
            <Dropdown
                value={selected}
                options={basemaps}
                onChange={(e) => handleChange(e.value)}
                style={{ width: 160 }}
            />
        </div>
    );
}