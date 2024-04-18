import 'package:flutter/material.dart';
import 'package:ustudy/app/AppColors.dart';

class QuizAnswer extends StatelessWidget {
   QuizAnswer({super.key,required this.onPressed,required this.title});
  void Function()? onPressed;
  String title;
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Container(
        child: Text(title,
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        padding: EdgeInsets.all(20),
        decoration: BoxDecoration(
            color: AppColors.primaryColor,
            borderRadius: BorderRadius.circular(50)),
        margin: EdgeInsets.only(bottom: 20),
      ),
    );
  }
}
