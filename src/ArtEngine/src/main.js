const fs = require("fs");
const pinataSDK = require('@pinata/sdk');
const PINATA_API_KEY = "ef5b7163a9f54eab46fb";
const PINATA_SECRET_API_KEY = "db217aab7232bf7b300a21d2de3896b7e90ddfdcb748506a32531c5ae166dcdb";
const pinata = pinataSDK(PINATA_API_KEY, PINATA_SECRET_API_KEY);
const { createCanvas, loadImage } = require("canvas");
const console = require("console");
const { description, layersOrder, format, rarity } = require("./config.js");
const { urlToHttpOptions } = require("url");

const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");

if (!process.env.PWD) {
  process.env.PWD = process.cwd();
}

const buildDir = `${process.env.PWD}/build`;
const metDataFile = '_metadata.json';
const layersDir = `${process.env.PWD}/layers`;

let metadata = [];
let attributes = [];
let hash = [];
let decodedHash = [];
const Exists = new Map();


const addRarity = _str => {
  let itemRarity;

  rarity.forEach((r) => {
    if (_str.includes(r.key)) {
      itemRarity = r.val;
    }
  });

  return itemRarity;
};

const cleanName = _str => {
  let name = _str.slice(0, -4);
  rarity.forEach((r) => {
    name = name.replace(r.key, "");
  });
  return name;
};

const getElements = path => {
  return fs
    .readdirSync(path)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
    .map((i, index) => {
      return {
        id: index + 1,
        name: cleanName(i),
        fileName: i,
        rarity: addRarity(i),
      };
    });
};

const layersSetup = layersOrder => {
  const layers = layersOrder.map((layerObj, index) => ({
    id: index,
    name: layerObj.name,
    location: `${layersDir}/${layerObj.name}/`,
    elements: getElements(`${layersDir}/${layerObj.name}/`),
    position: { x: 0, y: 0 },
    size: { width: format.width, height: format.height },
    number: layerObj.number
  }));

  return layers;
};

const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
};

const saveLayer = (_canvas, _edition) => {
  fs.writeFileSync(`${buildDir}/${_edition}.png`, _canvas.toBuffer("image/png"));
};

const addMetadata = (_ipfsHash, _edition) => {
  let dateTime = Date.now();
  let tempMetadata = {
    name: `#${_edition}`,
    description: description, //
    // image: `${_ipfsHash}`, //
    edition: _edition,
    date: dateTime,
    attributes: attributes,
  };
  metadata.push(tempMetadata);
  attributes = [];
};

const addAttributes = (_element, _layer) => {
  let tempAttr = {
    id: _element.id,
    layer: _layer.name,
    name: _element.name,
  };
  attributes.push(tempAttr);
  hash.push(_layer.id);
  hash.push(_element.id);
  decodedHash.push({ [_layer.id]: _element.id });
};

const drawLayer = async (_layer, _edition, _elementName) => {
  let element;
  for(let i=0; i<_layer.elements.length; i++){
    if(_layer.elements[i].name == _elementName.toString()){
      element = _layer.elements[i];
    }
  }
  if (element) {
    addAttributes(element, _layer);
    const image = await loadImage(`${_layer.location}${element.fileName}`);
    
    ctx.drawImage(
      image,
      _layer.position.x,
      _layer.position.y,
      _layer.size.width,
      _layer.size.height
    );
    saveLayer(canvas, _edition);
  }
};

const createFiles = async edition => {
  const layers = layersSetup(layersOrder);

  let numDupes = 0;
  let inputArray = [100, 202, 302, 402, 502, 602, 700];
 for (let i = 1; i <= edition; i++) {
  await drawLayer(layers[0], i, 'bg 1');
   await inputArray.forEach(async (j) => {
     if(j>=100 && j<200){
       let layer = layers[1];
       await drawLayer(layer, i, j); // element model ii (element name without .png)
     }
     else if(j>=200 && j<300){
       let layer = layers[2];
       await drawLayer(layer, i, j);
     }
     else if(j>=300 && j<400){
      let layer = layers[3];
      await drawLayer(layer, i, j);
    }
    else if(j>=400 && j<500){
      let layer = layers[4];
      await drawLayer(layer, i, j);
    }
    else if(j>=500 && j<600){
      let layer = layers[5];
      await drawLayer(layer, i, j);
    }
    else if(j>=600 && j<700){
      let layer = layers[6];
      await drawLayer(layer, i, j);
    }
    else if(j>=700 && j<800){
      let layer = layers[7];
      await drawLayer(layer, i, j);
    }
   });

  const readableStreamForFile = fs.createReadStream(`${buildDir}/${edition}.png`);
  const options = {};
  let IpfsHash = '';

  pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
    IpfsHash = String(result["IpfsHash"])
  }).catch((err) => {
    console.log(err)
  });

   let key = hash.toString();
   if (Exists.has(key)) {
     console.log(
       `Duplicate creation for edition ${i}. Same as edition ${Exists.get(
         key
       )}`
     );
     numDupes++;
     if (numDupes > edition) break; //prevents infinite loop if no more unique items can be created
     i--;
   } else {
     Exists.set(key, i);
     addMetadata(IpfsHash, i);
     console.log("Creating edition " + i);
   }
 }
};

const createMetaData = () => {
  fs.stat(`${buildDir}/${metDataFile}`, (err) => {
    if(err == null || err.code === 'ENOENT') {
      fs.writeFileSync(`${buildDir}/${metDataFile}`, JSON.stringify(metadata, null, 2));
    } else {
        console.log('Oh no, error: ', err.code);
    }
  });
};

module.exports = { buildSetup, createFiles, createMetaData };
