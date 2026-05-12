import {useEffect, useRef, useState} from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import {when} from "@arcgis/core/core/reactiveUtils";
import {getWellByName, getWellsForMap} from "../services/wellService.ts";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import type {Well, WellMapFilter} from "../types/Well.ts";
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils";
import type Extent from "@arcgis/core/geometry/Extent";
import "@arcgis/core/assets/esri/themes/dark/main.css";
import WellPanel from "../components/WellPanel.tsx";
import {getWellColor} from "../utils/wellColors.ts";
import MapLegend from "../components/MapLegend.tsx";
import { ProgressSpinner } from 'primereact/progressspinner';
import {Message} from "primereact/message";
import FilterPanel, {type WellTextFilter} from "../components/FilterPanel.tsx";
import {Button} from "primereact/button";
import BasemapSwitcher from "../components/BasemapSwitcher.tsx";

export default function MapPage() {
    const mapRef = useRef<HTMLDivElement>(null);
    const textFilterRef = useRef<WellTextFilter>({});
    const viewRef = useRef<MapView | null>(null);
    const mapSwitcher = useRef<Map | null>(null);

    const [selectedWell, setSelectedWell] = useState<Well | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filterPanelVisible, setFilterPanelVisible] = useState(false);
    const [ , setTextFilter] = useState<WellTextFilter>({});

    useEffect(() => {
        const map = new Map({
            basemap: "streets-navigation-vector"
        });
        mapSwitcher.current = map;

        const view = new MapView({
            container: mapRef.current,
            map: map,
            center: [-40, -10], // centro do Brasil
            zoom: 5
        });

        viewRef.current = view;

        //Layers (Camadas)
        const wellsLayer = new GraphicsLayer();
        map.add(wellsLayer)

        //O when fica "escutando" uma condição.
        // Quando ela se torna verdadeira, executa uma função.
        //É como um addEventListener do JavaScript puro, mas para propriedades de objetos em vez de eventos do DOM.
        /*
        usuário arrasta o mapa
        → view.stationary = false (mapa em movimento)
        → usuário solta
        → view.stationary = true (mapa parou)
        → when dispara
        → pegamos o extent
        → chamamos a API com as coordenadas visíveis
        → plotamos os poços
        * */

        when(
            () => view.stationary === true,
            () => {
                if (view.extent) {
                    const geoExtent = webMercatorUtils.webMercatorToGeographic(view.extent) as Extent;
                    //Filtros BoundyBox
                    const filter: WellMapFilter = {
                        minLatitude: geoExtent.ymin,
                        maxLatitude: geoExtent.ymax,
                        minLongitude: geoExtent.xmin,
                        maxLongitude: geoExtent.xmax,
                        Zoom: view.zoom,
                        state: textFilterRef.current.state ?? undefined,
                        basin: textFilterRef.current.basin ?? undefined,
                        status: textFilterRef.current.status ?? undefined,
                    };

                    setLoading(true);
                    getWellsForMap(filter).then((wells) => {
                        console.log('total de poços:', wells.length);
                        //console.log('poços', wells);
                        wellsLayer.removeAll(); // limpa os pontos anteriores

                        wells.forEach((well) => {

                            //Estilização do Ponto
                            const point = new Point({
                                longitude: well.longitude,
                                latitude: well.latitude
                            });

                            //Estilização do Simbolo
                            const symbol = new SimpleMarkerSymbol({
                                color: getWellColor(well.status),
                                size: 6
                            });

                            //Legenda
                            const graphic = new Graphic({
                                geometry: point,
                                symbol: symbol,
                                attributes: {
                                    name: well.name,
                                    status: well.status,
                                },
                                popupTemplate: {
                                    title: "{name}",
                                    content: "Status: {status}"
                                }
                            });

                            wellsLayer.add(graphic);
                        });
                        setLoading(false);
                    }).catch(() => {
                        setError('Erro ao carregar os poços. Tente novamente.');
                        setLoading(false);
                    });
                }
            }
        );

        // Popup do mapa buscando por nome
        view.on("click", (event) => {
            view.hitTest(event).then((response) => {
                const result = response.results.find(r => r.type === "graphic");
                if (result && result.type === "graphic") {
                    const name = result.graphic.attributes?.name;
                    if (name) {
                        getWellByName(name).then((well) => {
                            setSelectedWell(well)
                            //console.log('detalhe do poço', well);
                            // if (view.popup) {
                            //     view.popup.open({
                            //         title: well.name,
                            //         content: `
                            //         <table>
                            //             <tr><td><b>Operador</b></td><td>${well.operator || 'N/A'}</td></tr>
                            //             <tr><td><b>Bacia</b></td><td>${well.basin || 'N/A'}</td></tr>
                            //             <tr><td><b>Estado</b></td><td>${well.state || 'N/A'}</td></tr>
                            //             <tr><td><b>Status</b></td><td>${well.status || 'N/A'}</td></tr>
                            //             <tr><td><b>Classificação</b></td><td>${well.classification || 'N/A'}</td></tr>
                            //             <tr><td><b>Latitude</b></td><td>${well.latitude}</td></tr>
                            //             <tr><td><b>Longitude</b></td><td>${well.longitude}</td></tr>
                            //         </table>
                            //     `,
                            //         location: event.mapPoint
                            //     });
                            // }
                        });

                    }
                }
            });
        });

    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
            {selectedWell && (
                <WellPanel
                    well={selectedWell}
                    onClose={() => setSelectedWell(null)}
                />
            )}
            {/*Legenda do Mapa*/}
            <MapLegend />

            {loading && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000
                }}>
                    <ProgressSpinner />
                </div>
            )}

            {error && (
                <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
                    <Message severity="error" text={error} />
                </div>
            )}

            <Button
                icon="pi pi-filter"
                style={{ position: 'absolute', top: 10, left: 60, zIndex: 1000 }}
                onClick={() => setFilterPanelVisible(true)}
            />

            <FilterPanel
                visible={filterPanelVisible}
                onClose={() => setFilterPanelVisible(false)}
                onApply={(filter) => {
                    textFilterRef.current = filter;
                    setTextFilter(filter);
                    setFilterPanelVisible(false);
                    viewRef.current?.goTo(viewRef.current.extent); // força o when disparar
                }}
            />
            <BasemapSwitcher map={mapSwitcher.current} />
        </div>

    );
}