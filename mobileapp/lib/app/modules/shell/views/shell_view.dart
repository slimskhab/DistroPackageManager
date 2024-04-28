import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:ustudy/app/widgets/CustomDrawer.dart';

import '../controllers/shell_controller.dart';

class ShellView extends GetView<ShellController> {
  const ShellView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(),
        drawer: CustomDrawer(),
        body: GetBuilder<ShellController>(
          builder: (controller) {
            return Container(
                padding: EdgeInsets.all(20),
                margin: EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color:Colors.black,
                  borderRadius: BorderRadius.circular(10)
                ),
                child: Container(
                  child:Column(
                    children: [
                      Expanded(child: ListView(children: [
                        Text("> Shell command",style: TextStyle(color: Color(0xff63de00)),),
                        Text("> ls",style: TextStyle(color: Color(0xff63de00)),),
                        Text("file1.txt file2.txt folder1 folder2",style: TextStyle(color: Color(0xff63de00)),)

                      ],)),
                      Row(
                        children: [
                          Text(">",style: TextStyle(color: Color(0xff63de00)),),
                          Expanded(child: TextFormField(decoration: InputDecoration(
                            focusedBorder: OutlineInputBorder(
                              borderSide: BorderSide(
                                color: Color(0xff63de00)
                              )
                            )
                          ),))
                        ],
                      )
                    ],
                  )
                ));
          },
        ));
  }
}
//    color: #63de00;
//     font-family: 'Fira Mono';
