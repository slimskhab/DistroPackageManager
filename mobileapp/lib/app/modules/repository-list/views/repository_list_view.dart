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
                                              Text("Backend Name"),
                                              TextFormField(),
                                            ],
                                          ),
                                          SizedBox(height: 10,),
                                          Column(
                                            crossAxisAlignment: CrossAxisAlignment.start,

                                            children: [
                                              Text("Backend Url"),
                                              TextFormField(),
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
                          DataColumn(label: Text('Id')),
                          DataColumn(label: Text('Title')),
                          DataColumn(label: Text('Url')),
                          DataColumn(label: Expanded(child: Text('N° Repos',overflow: TextOverflow.ellipsis,))),
                        ],
                        rows: [
                          DataRow(cells: [
                            DataCell(
                              Text('#1'),
                            ),
                            DataCell(Text('Title goes here')),
                            DataCell(Text('localhost:5001')),
                            DataCell(Text('0')),
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

