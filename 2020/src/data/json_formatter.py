import json

with open('./crossword.json') as f:
	data = json.load(f)

squares = data["squares"]

for square in squares:
	square["isPencil"] = False

with open('crossword_parsed.json', 'w') as json_f:
	json.dump(data, json_f)


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
