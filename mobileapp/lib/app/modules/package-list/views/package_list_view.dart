import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:ustudy/app/widgets/CustomDrawer.dart';
import 'package:ustudy/app/widgets/PrimaryButton.dart';

import '../controllers/package_list_controller.dart';

class PackageListView extends GetView<PackageListController> {
  const PackageListView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(),
        drawer: CustomDrawer(),
        body: GetBuilder<PackageListController>(
          builder: (controller) {
            return Container(
                padding: EdgeInsets.all(20),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          "Packages",
                          style: TextStyle(fontWeight: FontWeight.w700),
                        ),

                      ],
                    ),
                    SizedBox(height: 20),
                    Expanded(
                      child: DataTable(
                        columns: [
                          DataColumn(label: Text('Name')),
                          DataColumn(label: Text('Size')),
                          DataColumn(label: Text('Status')),
                          DataColumn(label: Expanded(child: Text('Hit/Miss Rate',overflow: TextOverflow.ellipsis,))),
                        ],
                        rows: [
                          for(var i=0;i<controller.packages.length;i++)
                            DataRow(cells: [
                              DataCell(
                                Text(controller.packages[i]["id"].toString()),
                              ),
                              DataCell(Text(controller.packages[i]["packageName"])),
                              DataCell(Text(controller.packages[i]["hitMissRate"].toString())),
                              DataCell(Text(controller.packages[i]["misses"].toString())),
                            ]),
                        ],
                      ),
                    ),
                  ],
                ));
          },
        ));
  }
}
