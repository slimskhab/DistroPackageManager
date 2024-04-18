import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:ustudy/app/widgets/CustomDrawer.dart';

import '../../../widgets/PrimaryButton.dart';
import '../controllers/backend_list_controller.dart';

class BackendListView extends GetView<BackendListController> {
  const BackendListView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(),
        drawer: CustomDrawer(),
        body: GetBuilder<BackendListController>(
          builder: (controller) {
            return Container(
                padding: EdgeInsets.all(20),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          "Backends",
                          style: TextStyle(fontWeight: FontWeight.w700),
                        ),
                        Row(
                          children: [
                            PrimaryButton(
                                onPressed: () {
                                  showDialog(context: (context), builder: (BuildContext context){
                                    return AlertDialog(
                                      title: Text("Add New Backend"),
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
                                title: "Add New Backend",
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
