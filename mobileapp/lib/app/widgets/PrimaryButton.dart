import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:ustudy/app/AppColors.dart';

class PrimaryButton extends StatelessWidget {
  PrimaryButton({super.key,required this.onPressed,required this.title,required this.isLoading});
  void Function()? onPressed;
  String title;
  bool isLoading;
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(onPressed: onPressed, child: isLoading?CircularProgressIndicator():Text(title,style: GoogleFonts.montserrat(
        color: Colors.white,
        fontWeight: FontWeight.w700,
        fontSize: 16
    ),),style: ButtonStyle(
      backgroundColor: MaterialStateProperty.all<Color>(AppColors.primaryColor!),
      shape: MaterialStateProperty.all<RoundedRectangleBorder>(
        RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4.0), // Set the border radius of the button
        ),
      ),
      padding: MaterialStateProperty.all<EdgeInsetsGeometry>(
        EdgeInsets.symmetric(vertical: 20.0, horizontal: 24.0), // Set the padding of the button
      ),
    ),);
  }
}
