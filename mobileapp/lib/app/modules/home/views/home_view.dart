
import 'package:flutter/material.dart';

import 'package:get/get.dart';

import 'package:ustudy/app/widgets/CustomDrawer.dart';
import 'package:ustudy/app/widgets/StatisticsCard.dart';

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
              child: GridView(
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2,crossAxisSpacing: 10,mainAxisSpacing: 10,childAspectRatio: 1.5),
                children: [
StatisticsCard(icon: Icons.file_copy_outlined,title: "Total Repositories",content: "Repositories",number: "1.285",),
                  StatisticsCard(icon: Icons.file_open_outlined,title: "Total Packages",content: "packages",number: "4.598",),
                  StatisticsCard(icon: Icons.person_outline,title: "Total Users",content: "Users",number: "285",),

                ],
              ),
            );
          },
        ));
  }
}
