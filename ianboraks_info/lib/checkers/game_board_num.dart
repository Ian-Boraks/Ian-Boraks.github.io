import 'package:flutter/material.dart';

class GameBoard extends StatelessWidget {
  static final List<String> _textList = [
    'Red - Select a piece to move',
    'Red - Select an empty space to move to',
    'Blue - Select a piece to move',
    'Blue - Select an empty space to move to',
  ];
  static int _textListIndex = 0;

  static getText() {
    if (_textListIndex >= _textList.length) {
      _textListIndex = 0;
    }
    return _textList[_textListIndex];
  }

  static _createColors() {
    List tempBoard = [];
    for (var y = 0; y < 8; y++) {
      int startInt = (y % 2) > 0 ? 1 : 0;
      List tempRow = [];
      for (var x = 0; x < 8; x++) {
        tempRow.add((x + startInt) % 2);
      }
      tempBoard.add(tempRow);
    }
    return tempBoard;
  }

  static final List boardColors = _createColors();

  static _createInitGameBoard() {
    List tempBoard = [];
    for (var y = 0; y < 8; y++) {
      int startInt = (y % 2) > 0 ? 1 : 0;
      List tempRow = [];
      if (y == 3 || y == 4) {
        for (var x = 0; x < 8; x++) {
          tempRow.add(-1);
        }
      } else {
        for (var x = 0; x < 8; x++) {
          tempRow.add(((x + startInt) % 2) == 1 ? (y > 4 ? 1 : 0) : -1);
        }
      }
      tempBoard.add(tempRow);
    }
    return tempBoard;
  }

  static final List _initGameBoard = _createInitGameBoard();

  List pastBoard = _initGameBoard;
  List currentBoard = _initGameBoard;
  static List pastPiecePos = [
    0,
    0
  ];

  _directionOfMovValid(selectedSpace) {
    final newy = selectedSpace[0];
    final oldy = pastPiecePos[0];

    if (_textListIndex == 1) {
      if (newy - oldy < 0) {
        return true;
      }
    } else {
      if (newy - oldy > 0) {
        return true;
      }
    }
    return false;
  }

  _isPieceJumping(selectedSpace) {
    bool notJumping = true;
    bool openPos = false;
    bool diagEnemy = false;

    final newy = selectedSpace[0];
    final newx = selectedSpace[1];

    final oldy = pastPiecePos[0];
    final oldx = pastPiecePos[1];

    final List diagonalSpace = [
      ((newy + oldy) / 2).floor(),
      ((newx + oldx) / 2).floor()
    ];

    final diagonalSpacePiece = currentBoard[diagonalSpace[0]][diagonalSpace[1]];

    if (newy == oldy + 1 || newy == oldy - 1) {
      if (newx == oldx + 1 || newx == oldx - 1) {
        notJumping = true;
        return null;
      }
    }

    if (newy == oldy + 2 || newy == oldy - 2) {
      if (newx == oldx + 2 || newx == oldx - 2) {
        openPos = true;
      }
    }

    if (_textListIndex == 1 && openPos) {
      if (diagonalSpacePiece == 1) {
        diagEnemy = true;
        currentBoard[diagonalSpace[0]][diagonalSpace[1]] = -1;
      }
    } else if (_textListIndex == 3) {
      if (diagonalSpacePiece == 0 && openPos) {
        diagEnemy = true;
        currentBoard[diagonalSpace[0]][diagonalSpace[1]] = -1;
      }
    }

    return diagEnemy && openPos;
  }

  void _selectPiece(int x, int y) {
    pastBoard = currentBoard;

    final selectedPiece = currentBoard[y][x];
    bool empty = currentBoard[y][x] == -1;

    if (selectedPiece != 1 && selectedPiece != 0 && !empty) {
      _textListIndex -= _textListIndex == 0 ? 0 : 1;
      currentBoard[pastPiecePos[0]][pastPiecePos[1]] = _textListIndex == 0 ? 0 : 1;
      return;
    }

    // print("X: $x, Y: $y, Empty: $empty");

    if (selectedPiece == 0 && _textListIndex == 0) {
      _textListIndex = 1;
      currentBoard[y][x] = -2;
      pastPiecePos = [
        y,
        x
      ];
    } else if (selectedPiece == -1 && _textListIndex == 1) {
      if (_directionOfMovValid([
        y,
        x
      ])) {
        return;
      }
      final isJumping = _isPieceJumping([
        y,
        x
      ]);
      if (isJumping != null) {
        if (isJumping) {
          _textListIndex = 2;
          currentBoard[y][x] = 0;
          currentBoard[pastPiecePos[0]][pastPiecePos[1]] = -1;
        }
      } else {
        _textListIndex = 2;
        currentBoard[y][x] = 0;
        currentBoard[pastPiecePos[0]][pastPiecePos[1]] = -1;
      }
    } else if (selectedPiece == 1 && _textListIndex == 2) {
      _textListIndex = 3;
      currentBoard[y][x] = -2;
      pastPiecePos = [
        y,
        x
      ];
    } else if (selectedPiece == -1 && _textListIndex == 3) {
      if (_directionOfMovValid([
        y,
        x
      ])) {
        return;
      }
      final isJumping = _isPieceJumping([
        y,
        x
      ]);
      if (isJumping != null) {
        if (isJumping) {
          _textListIndex = 0;
          currentBoard[y][x] = 1;
          currentBoard[pastPiecePos[0]][pastPiecePos[1]] = -1;
        }
      } else {
        _textListIndex = 0;
        currentBoard[y][x] = 1;
        currentBoard[pastPiecePos[0]][pastPiecePos[1]] = -1;
      }
    }
    // print(pastPiecePos);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(getText()),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(
              width: 300,
              height: 300,
              child: Table(
                columnWidths: const {
                  0: FlexColumnWidth(1.25),
                  1: FlexColumnWidth(1.25),
                  2: FlexColumnWidth(1.25),
                  3: FlexColumnWidth(1.25),
                  4: FlexColumnWidth(1.25),
                  5: FlexColumnWidth(1.25),
                  6: FlexColumnWidth(1.25),
                  7: FlexColumnWidth(1.25)
                },
                border: TableBorder.all(width: 1.0, color: Colors.black),
                children: [
                  for (int y = 0; y < 8; y++)
                    TableRow(
                      children: [
                        for (int x = 0; x < 8; x++)
                          TableCell(
                            child: Container(
                              width: 37.5,
                              height: 37.5,
                              child: Container(
                                child: ElevatedButton(
                                  style: ButtonStyle(
                                    backgroundColor: MaterialStateProperty.all<Color>(Colors.transparent),
                                  ),
                                  child: const Text(''),
                                  onPressed: () {
                                    _selectPiece(x, y);
                                    (context as Element).markNeedsBuild();
                                  },
                                ),
                                decoration: BoxDecoration(
                                  color: currentBoard[y][x] == 0
                                      ? Colors.red
                                      : currentBoard[y][x] == 1
                                          ? Colors.blue
                                          : currentBoard[y][x] == -2
                                              ? Colors.green
                                              : currentBoard[y][x] == -3
                                                  ? Colors.purple
                                                  : Colors.transparent,
                                  shape: BoxShape.circle,
                                ),
                              ),
                              decoration: BoxDecoration(
                                color: boardColors[y][x] > 0 ? Colors.black : Colors.white,
                              ),
                            ),
                          ),
                      ],
                    )
                ],
              ),
            ),
          ],
        ),
      ],
    );
  }
}
