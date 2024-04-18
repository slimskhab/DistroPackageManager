import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:ustudy/app/AppColors.dart';
import 'package:ustudy/app/routes/app_pages.dart';
import 'package:ustudy/main.dart';


class CustomDrawer extends StatelessWidget {
  CustomDrawer({super.key});


  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: Colors.white,
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          ListTile(
            title: Text(
              'Home',
              style: TextStyle(color: Colors.black),
            ),
            onTap: () {
              Get.toNamed(Routes.HOME);
            },
          ),

        ],
      ),
    );
  }
}
