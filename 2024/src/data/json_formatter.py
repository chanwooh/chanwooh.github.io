import json

def clearPuzzle(filepath):
    with open(filepath) as f:
        data = json.load(f)

    squares = data["squares"]

    for square in squares:
        square["across"]["puzzleIndex"] = None
        square["across"]["hint"] = ""
        square["across"]["relatedSquares"] = []
        square["across"]["isHead"] = False
        square["across"]["answerLength"] = 0
        square["across"]["nextClueSquareIndex"] = 0

        square["down"]["puzzleIndex"] = None
        square["down"]["hint"] = ""
        square["down"]["relatedSquares"] = []
        square["down"]["isHead"] = False
        square["down"]["answerLength"] = 0
        square["down"]["nextClueSquareIndex"] = 0

        square["guess"] = ""
        square["answer"] = ""
        square["isSelected"] = False
        square["isRelated"] = False
        square["type"] = ""
        square["isPencil"] = False

    with open('crossword_parsed.json', 'w') as json_f:
        json.dump(data, json_f)

def makeUnfinishedSquaresEMPTY(filepath):
    with open(filepath) as f:
        data = json.load(f)

    squares = data["squares"]

    for square in squares:
        if square["type"] == "":
            square["type"] = "EMPTY"

    with open('crossword_parsed.json', 'w') as json_f:
        json.dump(data, json_f)

def nonesorter(square):
  if not square["down"]["puzzleIndex"]:
      return (256, square["squareIndex"])
  return (square["down"]["puzzleIndex"], square["squareIndex"])

def fillOutDownNextClueSquareIndices(filepath):
    with open(filepath) as f:
      data = json.load(f)

    squares = data["squares"]
    currSquareIndex = 0
    currPuzzleIndex = 1

    vertical_order = sorted(squares, key=nonesorter)

    with open('crossword_sorted.json', 'w') as json_f:
      json.dump(data, json_f)

    for square in vertical_order:
      print("START: currSquareIndex=" + str(currSquareIndex) + ", currPuzzleIndex=" + str(currPuzzleIndex) + ", squareIndex=" + str(square["squareIndex"]) + ", puzzleIndex=" + str(square["down"]["puzzleIndex"]))
      if square["type"] == "EMPTY" and square["down"]["puzzleIndex"] is not None and square["down"]["puzzleIndex"] != currPuzzleIndex:
          for squareIdx in squares[currSquareIndex]["down"]["relatedSquares"]:
              squares[squareIdx]["down"]["nextClueSquareIndex"] = square["squareIndex"]
              print("SET " + str(squareIdx) + "'s next square to be " + str(square["squareIndex"]))
          currSquareIndex = square["squareIndex"]
          currPuzzleIndex = square["down"]["puzzleIndex"]
      print("END: currPuzzleIndex=" + str(currPuzzleIndex) + ", squareIndex=" + str(square["squareIndex"]) + ", puzzleIndex=" + str(square["down"]["puzzleIndex"]))
      print("------")

    for squareIdx in squares[currSquareIndex]["down"]["relatedSquares"]:
      squares[squareIdx]["down"]["nextClueSquareIndex"] = -1

    with open('crossword_parsed.json', 'w') as json_f:
      json.dump(data, json_f)

def fillOutRelatedDownSquares(filepath):
    with open(filepath) as f:
        data = json.load(f)

    squares = data["squares"]

    for idx, square in enumerate(squares):
        if square["down"]["puzzleIndex"] != None and square["down"]["isHead"] is True:
            relatedSquares = [idx + i*15 for i in range(0, square["down"]["answerLength"])]

            square["down"]["relatedSquares"] = relatedSquares

            for relatedSquareIdx in relatedSquares:
                squares[relatedSquareIdx]["down"]["puzzleIndex"] = square["down"]["puzzleIndex"]
                squares[relatedSquareIdx]["down"]["hint"] = square["down"]["hint"]
                squares[relatedSquareIdx]["down"]["relatedSquares"] = square["down"]["relatedSquares"]
                squares[relatedSquareIdx]["down"]["answerLength"] = square["down"]["answerLength"]

    with open('crossword_parsed.json', 'w') as json_f:
      json.dump(data, json_f)

def fillOutPreviousClueIndices(filepath):
    with open(filepath) as f:
      data = json.load(f)

    squares = data["squares"]
    for direction in ["across", "down"]:

        currSquareIndex = 0
        shouldContinue = True

        while shouldContinue:
            # Next index to fill out is current square's next clue
            nextSquareIndex = squares[currSquareIndex][direction]["nextClueSquareIndex"]

            # If the next square we need to go to is -1 we are on our last square to fill out
            # TODO: Need to fix this to properly mark the previous square, currently across and down are swapped
            if nextSquareIndex == -1:
                nextSquareIndex = 0
                currSquareIndex = currSquareIndex * -1
                shouldContinue = False
            
            # Get next clue's related clues, mark all of their previous clue index to our current clue index
            for relatedIdx in squares[nextSquareIndex][direction]["relatedSquares"]:
                squares[relatedIdx][direction]["previousClueSquareIndex"] = currSquareIndex
            
            # Iterate current to next square index
            currSquareIndex = nextSquareIndex

    with open('crossword_parsed.json', 'w') as json_f:
      json.dump(data, json_f)

def main():
    # 1. Run clearPuzzle
    # clearPuzzle(./khai_crossword.json)

    # MANUAL:
    # 2. Fill out answer and type for all cells
    # 3. Fill out across manually (can prob be automated)
    # 4. Fill out vertical heads only (puzzleIndex, hint, answerLength only)

    # 5. Run fillOutRelatedDownSquares
    # fillOutRelatedDownSquares('./wedding_crossword.json')

    # 6. Run fillOutDownNexClueSquareIndices
    # fillOutDownNextClueSquareIndices('./wedding_crossword.json')

    # 7. Run fillOutPreviousClueIndices
    fillOutPreviousClueIndices("./wedding_crossword.json")
    
    # 8. Fix first across/down's previous squares by swapping them

if __name__ == "__main__":
    main()


# with open('./crossword.json') as f:
# 	data = json.load(f)

# squares = data["squares"]

# for square in squares:
# 	square["isPencil"] = False

# with open('crossword_parsed.json', 'w') as json_f:
# 	json.dump(data, json_f)


# import json
# import copy

# def nonesorter(square):
# 	if not square["down"]["puzzleIndex"]:
# 		return (256, square["squareIndex"])
# 	return (square["down"]["puzzleIndex"], square["squareIndex"])

# with open('./crossword.json') as f:
# 	data = json.load(f)

# squares = data["squares"]
# currSquareIndex = 0
# currPuzzleIndex = 1

# vertical_order = sorted(squares, key=nonesorter)

# with open('crossword_sorted.json', 'w') as json_f:
# 	json.dump(data, json_f)

# for square in vertical_order:
# 	print("START: currSquareIndex=" + str(currSquareIndex) + ", currPuzzleIndex=" + str(currPuzzleIndex) + ", squareIndex=" + str(square["squareIndex"]) + ", puzzleIndex=" + str(square["down"]["puzzleIndex"]))
# 	if square["type"] == "EMPTY" and square["down"]["puzzleIndex"] is not None and square["down"]["puzzleIndex"] != currPuzzleIndex:
# 		for squareIdx in squares[currSquareIndex]["down"]["relatedSquares"]:
# 			squares[squareIdx]["down"]["nextClueSquareIndex"] = square["squareIndex"]
# 			print("SET " + str(squareIdx) + "'s next square to be " + str(square["squareIndex"]))
# 		currSquareIndex = square["squareIndex"]
# 		currPuzzleIndex = square["down"]["puzzleIndex"]
# 	print("END: currPuzzleIndex=" + str(currPuzzleIndex) + ", squareIndex=" + str(square["squareIndex"]) + ", puzzleIndex=" + str(square["down"]["puzzleIndex"]))
# 	print("------")

# for squareIdx in squares[currSquareIndex]["down"]["relatedSquares"]:
# 	squares[squareIdx]["down"]["nextClueSquareIndex"] = -1

# with open('crossword_parsed.json', 'w') as json_f:
# 	json.dump(data, json_f)
