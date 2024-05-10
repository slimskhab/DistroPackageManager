
import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:percent_indicator/circular_percent_indicator.dart';
import 'package:ustudy/app/AppColors.dart';

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
              child: controller.isLoading?CircularProgressIndicator():GridView(
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2,crossAxisSpacing: 10,mainAxisSpacing: 10,),
                children: [
StatisticsCard(icon: Icons.file_copy_outlined,title: "N° Repos",content: "Repositories",number: "1.285",),
                  StatisticsCard(icon: Icons.file_open_outlined,title: "N° Packages",content: "Packages",number: controller.stats["totalPackages"] ?? "No Data",),
                  StatisticsCard(icon: Icons.person_outline,title: "Total Users",content: "Users",number: "1",),
                  Container(
                    decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(5),
                        border: Border.all(color: Colors.grey,width: 1)
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: EdgeInsets.symmetric(vertical: 10,horizontal: 20),
                          child: Text("Hit/Miss Rate",style: TextStyle(fontWeight: FontWeight.w700,fontSize: 16)),
                        ),
                        Row(
                          children: [
                            Expanded(child: Container(
                              height: 1,
                              color: Colors.grey,
                            ))

                          ],
                        ),
                        Align(
                          alignment: Alignment.center,
                          child: Container(
                            padding: EdgeInsets.all(5),
                            child:  CircularPercentIndicator(
                              radius: 45.0,
                              lineWidth: 10.0,
                              animation: true,
                              percent: 0.7,
                              center: new Text(
                                "70.0%",
                                style:
                                new TextStyle(fontWeight: FontWeight.bold, fontSize: 16.0),
                              ),

                              circularStrokeCap: CircularStrokeCap.round,
                              progressColor: AppColors.primaryColor,
                            ),
                          ),
                        )
                      ],
                    ),
                  )

                ],
              ),
            );
          },
        ));
  }
}
