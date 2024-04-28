import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';
import 'package:ustudy/app/AppConsts.dart';

class BackendListController extends GetxController {

  final List<Map<String, dynamic>> backEnds = [];

  TextEditingController name=TextEditingController();
  TextEditingController url=TextEditingController();
  void addBackEnd() async{
    try {
      Dio dio = Dio();
      var response = await dio.post('${AppConsts.backEndUrl}/backend/add',data: {
        "backEndTitle":name.text,
        "backEndUrl":url.text
      });
      if (response.data['status'] == 'success') {
        Map<String, dynamic> responseData = response.data['backEnd'];
        backEnds.add(responseData);
        Get.back();
        update();
      } else {
        // Handle error here if necessary
        print('Failed to fetch backends: ${response.data['message']}');
      }
    } catch (e) {
      // Handle error here
      print('Failed to fetch backends: $e');
    }
  }

  void fetchBackEnd() async {
    try {
      Dio dio = Dio();
      var response = await dio.get('${AppConsts.backEndUrl}/backend');
      print(response);
      if (response.data['status'] == 'success') {
        List<Map<String, dynamic>> responseData = (response.data['backEnds'] as List<dynamic>).cast<Map<String, dynamic>>();
        backEnds.assignAll(responseData);
        print(backEnds);
        update();
      } else {
        print('Failed to fetch backends: ${response.data['message']}');
      }
    } catch (e) {
      // Handle error here
      print('Failed to fetch backends: $e');
    }
  }

  @override
  void onInit() {
    super.onInit();
    fetchBackEnd();
  }

  @override
  void onReady() {
    super.onReady();
  }

  @override
  void onClose() {
    super.onClose();
  }

}
