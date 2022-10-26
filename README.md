# Book details from ISBN

## Description

A simple Google App Script for automatically querying book metadata through ISBN codes in Google Sheets. This script uses openlibrary.org's API for querying book information.

## Usage

From the main Sheets menu, go to Extensions > Apps Script, paste the code provided, save and execute (you need to grant the appropriate permissions).

After initial setup:

* type the desired ISBN code on an empty cell,

* and go to the new menu option 'Book Details from ISBN' > 'Get Book Details using ISBN'.

The script will fill the corresponding row with the book's title, author list, number of pages, and publisher, if available.
