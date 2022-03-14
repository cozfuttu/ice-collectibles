const description =
  "This is the description of your NFT project, remember to replace this";

const layersOrder = [
    { name: 'background', number: 1 },
    { name: 'torso', number: 2 },
    { name: 'arms', number: 12 },
    { name: 'head', number: 3 },
    { name: 'mouth', number: 1 },
    { name: 'nose', number: 3 },
    { name: 'eyes', number: 3 },
    { name: 'hair', number: 3 },
];
  
const format = {
    width: 1252,
    height: 1600
};

const rarity = [
    { key: "", val: "original" },
    { key: "_r", val: "rare" },
    { key: "_sr", val: "super rare" },
];

const defaultEdition = 5;

module.exports = { layersOrder, format, rarity, defaultEdition };