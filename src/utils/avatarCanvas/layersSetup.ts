import { layersOrder, format } from 'config/avatarLayers'

const layersSetup = () => {
  const layers = layersOrder.map((layerObj, index) => ({
    id: index,
    name: layerObj.name, // needed
    location: `layers/${layerObj.name}/`, // needed
    //  elements: getElements(`${layersDir}/${layerObj.name}/`),
    position: { x: 0, y: 0 },
    size: { width: format.width, height: format.height }, // needed
  }));

  return layers;
};

export default layersSetup