
import 'package:flutter/material.dart';

import 'package:get/get.dart';

import 'package:ustudy/app/widgets/CustomDrawer.dart';

import '../controllers/home_controller.dart';


class HomeView extends GetView<HomeController> {
  const HomeView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
        drawer: CustomDrawer(),
        body: GetBuilder<HomeController>(
          builder: (controller) {
            return Container(
              padding: EdgeInsets.all(20),
              child: ListView(
                children: [
                 Text("dzadza")

                ],
              ),
            );
          },
        ));
  }
}
