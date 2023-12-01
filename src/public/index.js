var map; // Mapbox map

mapboxgl.accessToken = "pk.eyJ1IjoibmhhdGhvYTE0IiwiYSI6ImNscDZjMnZ2cDBkY3AybHNoaTk4cnZ2eHMifQ.KhkP2ZxWJQ5CwtdIr8c_IA";

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true,
});

function successLocation(position) {
    setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
    setupMap([106.629664, 10.823099]);
}

function bottomController() {
    const toggleableLayerIds = ["billboard", "report-violation"];

    for (const id of toggleableLayerIds) {
        if (document.getElementById(id)) {
            console.log(true);
        } else {
            console.log(false);
        }
    }

    for (const id of toggleableLayerIds) {
        if (document.getElementById(id)) {
            continue;
        }

        const link = document.createElement("div");
        link.id = id;

        link.innerHTML = `
    <label class="switch">
      <input type="checkbox" id="${id}-checkbox" checked/>
      <span class="slider"></span>
    </label>
    <p>${id === "billboard" ? "BẢNG QUẢNG CÁO" : "BÁO CÁO VI PHẠM"}</p>
  `;

        // Append the link element to the document body or any desired container
        document.body.appendChild(link);
        const layers = document.getElementById("bottom-bar");
        layers.appendChild(link);

        link.onclick = function (e) {
            const clickedLayer = this.id;

            e.preventDefault();
            e.stopPropagation();

            const checkbox = document.getElementById(`${clickedLayer}-checkbox`);
            const visibility = map.getLayoutProperty(clickedLayer, "visibility");

            if ((visibility === "visible" || visibility === undefined) && checkbox.checked) {
                map.setLayoutProperty(clickedLayer, "visibility", "none");
                checkbox.checked = false; // Uncheck the checkbox
                toggleUnclusteredPointVisibility(clickedLayer, "none");
            } else {
                map.setLayoutProperty(clickedLayer, "visibility", "visible");
                checkbox.checked = true; // Check the checkbox
                toggleUnclusteredPointVisibility(clickedLayer, "visible");
            }

            map.triggerRepaint();
        };
    }
}

function toggleUnclusteredPointVisibility(clickedLayer, visibility) {
    if (clickedLayer === "billboard") {
        map.setLayoutProperty("unclustered-point-label", "visibility", visibility);
        map.setLayoutProperty("unclustered-point", "visibility", visibility);
    } else {
        map.setLayoutProperty("unclustered-point-label-reported", "visibility", visibility);
        map.setLayoutProperty("unclustered-point-reported", "visibility", visibility);
    }
}

function setupMap(center) {
    const bounds = [
        [106.38, 10.39], // Southwest coordinates
        [107.04, 11.17], // Northeast coordinates
    ];

    map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: center,
        zoom: 13,
        maxBounds: bounds,
    });

    map.addControl(new mapboxgl.NavigationControl());

    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        reverseGeocode: true,
        language: "en-US, vi-VN",
    });

    map.addControl(geocoder, "top-left");
    map.addControl(new mapboxgl.GeolocateControl());

    map.on("style.load", () => {
        map.on("click", (e) => {
            let l = map.getStyle().layers; // here you can get all the layers of the style
            var features = map.queryRenderedFeatures(e.point);

            if (features[0] != undefined && features[0].properties.name != undefined) {
                var url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${features[0].properties.name}.json?access_token=${mapboxgl.accessToken}`;

                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.features && data.features.length > 0) {
                            var address = data.features[0].place_name;

                            new mapboxgl.Popup()
                                .setLngLat(e.lngLat)
                                .setHTML("<strong>" + features[0].properties.name + "</strong><br>" + address)
                                .addTo(map);

                            map.easeTo({
                                center: e.lngLat,
                            });
                        } else {
                            console.log("No address found");
                        }
                    })
                    .catch((error) => {
                        console.log("Error:", error);
                    });
            }
        });
    });

    map.on("load", () => {
        //add bottomController
        bottomController();

        map.addSource("billboards", {
            type: "geojson",
            data: "./db.geojson",
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
        });

        map.addLayer({
            id: "clusters",
            type: "circle",
            source: "billboards",
            filter: ["has", "point_count"],
            paint: {
                "circle-color": ["step", ["get", "point_count"], "#51bbd6", 5, "#f1f075", 10, "#f28cb1"],
                "circle-radius": ["step", ["get", "point_count"], 20, 5, 30, 10, 40],
            },
        });

        map.addLayer({
            id: "cluster-count",
            type: "symbol",
            source: "billboards",
            filter: ["has", "point_count"],
            layout: {
                "text-field": ["get", "point_count_abbreviated"],
                "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                "text-size": 12,
            },
        });

        // unclustered-point-label
        map.addLayer({
            id: "unclustered-point-label",
            type: "symbol",
            source: "billboards",
            filter: ["all", ["!", ["has", "point_count"]], ["==", ["get", "reported"], 1]],
            layout: {
                "text-field": "QC",
                "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Regular"],
                "text-size": 10,
            },
            paint: {
                "text-color": "#ffffff",
            },
        });

        // unclustered-point-label-reported
        map.addLayer({
            id: "unclustered-point-label-reported",
            type: "symbol",
            source: "billboards",
            filter: ["all", ["!", ["has", "point_count"]], ["==", ["get", "reported"], 0]],
            layout: {
                "text-field": "QC",
                "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Regular"],
                "text-size": 10,
            },
            paint: {
                "text-color": "#ffffff",
            },
        });

        map.addLayer(
            {
                id: "unclustered-point",
                type: "circle",
                source: "billboards",
                filter: ["all", ["!", ["has", "point_count"]], ["==", ["get", "reported"], 1]],
                paint: {
                    "circle-color": ["match", ["get", "reported"], 1, "#0000ff", "#ffffff"],
                    "circle-radius": 10,
                    "circle-stroke-width": 1,
                    "circle-stroke-color": "#ffffff",
                },
            },
            "unclustered-point-label"
        );

        map.addLayer(
            {
                id: "unclustered-point-reported",
                type: "circle",
                source: "billboards",
                filter: ["all", ["!", ["has", "point_count"]], ["==", ["get", "reported"], 0]],
                paint: {
                    "circle-color": ["match", ["get", "reported"], 0, "#ff0000", "#ffffff"],
                    "circle-radius": 10,
                    "circle-stroke-width": 1,
                    "circle-stroke-color": "#ffffff",
                },
            },
            "unclustered-point-label-reported"
        );

        map.addLayer(
            {
                id: "billboard",
                type: "circle",
                source: "billboards",
                filter: ["all", ["!", ["has", "point_count"]], ["==", ["get", "reported"], 1]],
            },
            "unclustered-point"
        );

        map.addLayer(
            {
                id: "report-violation",
                type: "circle",
                source: "billboards",
                filter: ["all", ["!", ["has", "point_count"]], ["==", ["get", "reported"], 0]],
            },
            "unclustered-point-reported"
        );

        // inspect a cluster on click
        map.on("click", "clusters", (e) => {
            const features = map.queryRenderedFeatures(e.point, {
                layers: ["clusters"],
            });
            const clusterId = features[0].properties.cluster_id;
            map.getSource("billboards").getClusterExpansionZoom(clusterId, (err, zoom) => {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom,
                });
            });
        });

        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
        });

        map.on("mouseenter", ["unclustered-point", "unclustered-point-reported"], (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const isZoning = e.features[0].properties.isZoning === 1 ? "ĐÃ QUY HOẠCH" : "CHƯA QUY HOẠCH";
            const description = `<strong>${e.features[0].properties.billboardType}</strong><br>
                          ${e.features[0].properties.positionType}<br>
                          ${e.features[0].properties.address}<br>
                          <strong><em>${isZoning}</em></strong>`;

            // Ensure that if the map is zoomed out such that
            // multiple copies of the feature are visible, the
            // popup appears over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.on("mouseleave", ["unclustered-point", "unclustered-point-reported"], () => {
            map.getCanvas().style.cursor = "";
            popup.remove();
        });
    });
}
