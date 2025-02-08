import { getClassifications } from '../models/index.js';
 
const getNav = async () => {
    const classifications = await getClassifications();
    let nav = '<nav><ul>';
    classifications.forEach((row) => {
        const id = row.classification_id;
        const name = row.classification_name;
        nav += `<li><a href="/category/${id}">${name}</a></li>`
    });
    return `${nav}<li><a href="/">Home</a></li><li><a href="/About">About</a></li></ul></nav>`;
};
 
export { getNav };