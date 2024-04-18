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
              'Dashboard',
              style: TextStyle(color: Colors.black),
            ),
            onTap: () {
              Get.toNamed(Routes.HOME);
            },
          ),
          ListTile(
            title: Text(
              'Backend List',
              style: TextStyle(color: Colors.black),
            ),
            onTap: () {
              Get.toNamed(Routes.BACKEND_LIST);
            },
          ),
          ListTile(
            title: Text(
              'Repository List',
              style: TextStyle(color: Colors.black),
            ),
            onTap: () {
              Get.toNamed(Routes.REPOSITORY_LIST);
            },
          ),
          ListTile(
            title: Text(
              'Packages List',
              style: TextStyle(color: Colors.black),
            ),
            onTap: () {
              Get.toNamed(Routes.PACKAGE_LIST);
            },
          ),
          ListTile(
            title: Text(
              'Shell',
              style: TextStyle(color: Colors.black),
            ),
            onTap: () {
              Get.toNamed(Routes.SHELL);
            },
          ),ListTile(
            title: Text(
              'Statistics',
              style: TextStyle(color: Colors.black),
            ),
            onTap: () {
              Get.toNamed(Routes.STATISTICS);
            },
          ),
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
