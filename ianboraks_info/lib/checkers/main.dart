// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';

import 'game_board_num.dart' as gb_num;

void main() => runApp(MyCheckers());

class MyCheckers extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _MyCheckersState();
  }
}

// LEADING _ makes it a private class
class _MyCheckersState extends State<MyCheckers> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: gb_num.GameBoard(),
      ),
    );
  }
}
