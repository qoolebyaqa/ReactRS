import { IPokeItem } from "../types";

export const convertToCSV = (data: IPokeItem[]): string => {
  if (!data.length) {
    return '';
  }
  let dataToCSV = [...data];
  const refinedData = []
  const titleKeys = Object.keys(dataToCSV[0]);
  titleKeys.unshift('sequence'); 
  refinedData.push(titleKeys);
  dataToCSV.forEach(item => {
    refinedData.push([item.url.slice(item.url.indexOf('pokemon') + 8, -1), ...Object.values(item)])  
  })

  return refinedData.reduce((acc, cur) => {return acc + cur.join(', ') + '\n'}, '');
};