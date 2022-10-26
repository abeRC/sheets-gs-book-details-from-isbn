/** Using an ISBN code, fetches book title, author list, 
 * number of pages and publisher using the openlibrary API. 
 * 
 * Usage: type the ISBN code on an empty cell, 
 * and go to the new menu option 'Book Details from ISBN' > 'Get Book Details using ISBN'.
 * The script will fill the corresponding row with the book's details, if available.
 * */

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Book Details from ISBN')
      .addItem('Get Book Details using ISBN', 'fillSheet')
      .addToUi();
}

function fillSheet() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var cell = sheet.getActiveCell();
  var value = cell.getValue();
  var isbn = value.toString(); 

  // Not a valid ISBN if not 10 or 13 digits long.
  if(isbn.trim().length != 10 && isbn.trim().length != 13){
    throw new Error("Invalid ISBN length: " + isbn);
  }

  var results = getBookDetails(isbn);
  Logger.log(results);

  sheet.getRange(cell.getRow(), cell.getColumn() + 1, 1, results.length).setValues([results]); // setValues takes a matrix of values
}

function getBookDetails (isbn) {
  // use openlibrary's  API to query ISBN info
  var url = `https://openlibrary.org/isbn/${isbn}.json`;
  var response = UrlFetchApp.fetch(url);
  var parsedJSON = JSON.parse(response);

  try {
    var title = (parsedJSON["full_title"]) || (parsedJSON["title"]);
    var publishers = String(parsedJSON["publishers"]);
    var pages = parsedJSON["number_of_pages"];
    var author_keys = parsedJSON["authors"].map(aut => aut["key"]);
    var authors = author_keys.map(key => {
      var author_url = `https://openlibrary.org/${key}.json`;
      var aut_response = UrlFetchApp.fetch(author_url);
      var name = JSON.parse(aut_response)["name"];
      return name;
    })
    var author_list = authors.join("; ");

    results = [title, author_list, pages, publishers];

  } catch (e){
    Logger.log(String(e));
    results = ["-", "-", "-", "-",];
  }
  return results
}

function test () {
  var results = getBookDetails("128546012X");
  Logger.log(results);
}