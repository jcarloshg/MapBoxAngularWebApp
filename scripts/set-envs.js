const { mkdirSync, writeFileSync, } = require('fs');
require('dotenv').config();

const targetPath = 'src/environment/environments.ts';
const folderPath = 'src/environment';

const envFileContent = `
export const environment = {
  mapbox_key: "${process.env['MAPBOX_KEY']}",
  other: "propertied"
}
`;

mkdirSync(folderPath, { recursive: true, });
writeFileSync(targetPath, envFileContent);
