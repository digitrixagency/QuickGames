const xlsx = require('xlsx');

function excelToJson(filePath) {
  // Read the Excel file
  const workbook = xlsx.readFile(filePath);

  // Get the first sheet
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Convert sheet to JSON
  let data = xlsx.utils.sheet_to_json(sheet);

  // Define default values for each argument
  const defaultValues = {
    title: '',
    video_url: '',
    image_url: '',
    description: '',
    rating: 0,
    category: '',
    subcategory: '',
    launch_year: '',
    technology: '',
    game_url: '',
    played: 0
  };
  
  // Convert launch_year from int to string and handle undefined values
  data = data.map(item => {
    const newItem = {};
    Object.keys(defaultValues).forEach(key => {
      newItem[key] = typeof item[key] !== 'undefined' ? item[key] : defaultValues[key];
    });
    if (typeof newItem.launch_year === 'number') {
        newItem.launch_year = String(newItem.launch_year);
    }
    return newItem;
  });

  return data;
}



module.exports =excelToJson;