import json

def clearPuzzle():
    with open('./khai_crossword.json') as f:
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

def makeUnfinishedSquaresEMPTY():
    with open('./khai_crossword.json') as f:
        data = json.load(f)

    squares = data["squares"]

    for square in squares:
        if square["type"] == "":
            square["type"] = "EMPTY"

    with open('crossword_parsed.json', 'w') as json_f:
        json.dump(data, json_f)

def main():
    makeUnfinishedSquaresEMPTY()

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
