import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:ustudy/app/widgets/CustomDrawer.dart';
import 'package:ustudy/app/widgets/PrimaryButton.dart';

import '../controllers/repository_list_controller.dart';

class RepositoryListView extends GetView<RepositoryListController> {
  const RepositoryListView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(),
        drawer: CustomDrawer(),
        body: GetBuilder<RepositoryListController>(
          builder: (controller) {
            return Container(
                padding: EdgeInsets.all(20),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          "Repositories",
                          style: TextStyle(fontWeight: FontWeight.w700),
                        ),
                        Row(
                          children: [
                            PrimaryButton(
                                onPressed: () {
                                  showDialog(context: (context), builder: (BuildContext context){
                                    return AlertDialog(
                                      title: Text("Add New Repository"),
                                      content: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        mainAxisSize: MainAxisSize.min,
                                        children: [
                                          Column(
                                            crossAxisAlignment: CrossAxisAlignment.start,
                                            children: [
                                              Text("Repository Name"),
                                              TextFormField(),
                                            ],
                                          ),
                                          SizedBox(height: 10,),
                                          Column(
                                            crossAxisAlignment: CrossAxisAlignment.start,

                                            children: [
                                              Text("Repository Url"),
                                              TextFormField(),
                                            ],
                                          ),
                                          SizedBox(height: 10,),
                                          Column(
                                            crossAxisAlignment: CrossAxisAlignment.start,

                                            children: [
                                              Text("Back-end Url"),

                                      DropdownButton(
                                          value: controller.currentBackEnd,
                                          items: controller.backEndList
                                              .map((e) => DropdownMenuItem(
                                            child: Text(
                                              e.toString(),
                                              style: TextStyle(
                                                  color: Colors.black),
                                            ),
                                            value: e,
                                          ))
                                              .toList(),
                                          onChanged: (element) {
                                            controller.currentBackEnd = element!;
                                            controller.update();
                                          }),



                                            ],
                                          ),
                                          SizedBox(height: 10,),
                                          Align(alignment: Alignment.centerRight,child: PrimaryButton(onPressed: (){}, title: "Submit", isLoading: false))
                                        ],
                                      ),

                                    );
                                  });
                                },
                                title: "Add New Repository",
                                isLoading: false)
                          ],
                        )
                      ],
                    ),
                    SizedBox(height: 20),
                    Expanded(
                      child: DataTable(
                        columns: [
                          DataColumn(label: Text('Name')),
                          DataColumn(label: Text('Size')),
                          DataColumn(label: Expanded(child:Text('N° Packages',overflow: TextOverflow.ellipsis,))),
                          DataColumn(label: Expanded(child: Text('Status',overflow: TextOverflow.ellipsis,))),
                        ],
                        rows: [
                          for(var i=0;i<controller.repositories.length;i++)
                            DataRow(cells: [
                              DataCell(
                                Text(controller.repositories[i]["repositoryTitle"]),
                              ),
                              DataCell(Text(controller.repositories[i]["repositorySize"].toString())),
                              DataCell(Text(controller.repositories[i]["numberOfPackages"].toString())),
                              DataCell(Text(controller.repositories[i]["repositoryStatus"])),
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

