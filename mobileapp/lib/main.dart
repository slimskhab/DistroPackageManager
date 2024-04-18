import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';

import 'app/routes/app_pages.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

void main() async{
  WidgetsFlutterBinding.ensureInitialized();


  runApp(
    GetMaterialApp(
      theme: ThemeData(
        iconTheme: IconThemeData(color: Colors.black),
        scaffoldBackgroundColor: Colors.white,
        textTheme: TextTheme(
          displayLarge: GoogleFonts.montserrat(color:Colors.black),
          displayMedium: GoogleFonts.montserrat(color:Colors.black),
          displaySmall: GoogleFonts.montserrat(color:Colors.black),
          bodyLarge: GoogleFonts.montserrat(color:Colors.black),
          bodyMedium: GoogleFonts.montserrat(color:Colors.black),
          bodySmall: GoogleFonts.montserrat(color:Colors.black),
        ),
      ),
      title: "Distro Package Cacher",
      debugShowCheckedModeBanner: false,
      initialRoute: AppPages.INITIAL,
      getPages: AppPages.routes,
    ),
  );
}

