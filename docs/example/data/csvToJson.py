
import sys
import csv
import datetime
import re
import json

if __name__ == '__main__':
    
    min = 1
    max = 50
    items = []

    with open("exampleData.csv") as csvfile:
        reader = csv.reader(csvfile, delimiter=",")
        i = 0
        for row in reader:
            if i >= min and i <= max:
                items.append({ 'Id': i , 'Firstname': row[0], 'Lastname': row[1], 'Address': row[3], 'City':row[4], 'Phone': row[8], 'Web': row[11] } )
            i += 1

    # write output to text file
    outputFileName = "exampleData.json"
    with open(outputFileName, mode="w", newline='') as f:
        json.dump(items, f)
    