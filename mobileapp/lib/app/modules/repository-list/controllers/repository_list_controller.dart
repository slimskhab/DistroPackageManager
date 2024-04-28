import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:ustudy/app/AppConsts.dart';

class RepositoryListController extends GetxController {

  List<String> backEndList = ["localhost","daz"]; // List to hold backEndTitles
  String currentBackEnd="localhost";
  final List<Map<String, dynamic>> repositories = []; // Observable list to hold the fetched backends

  void fetchBackEnd() async {
    try {
      Dio dio = Dio();
      var response = await dio.get('${AppConsts.backEndUrl}/backend');

      if (response.data['status'] == 'success') {
        List<dynamic> backEndsData = response.data['backEnds'];
        print(backEndList);
        backEndList = backEndsData.map((backEnd) => backEnd['backEndUrl'].toString()).toList();
        print(backEndList);
        currentBackEnd = backEndList.first;

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

  void fetchRepository() async {
    try {
      Dio dio = Dio();
      var response = await dio.get('${AppConsts.backEndUrl}/repository');
      if (response.data['status'] == 'success') {
        List<Map<String, dynamic>> responseData = (response.data['repositories'] as List<dynamic>).cast<Map<String, dynamic>>();
        repositories.assignAll(responseData);
        print(repositories);
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
    fetchRepository();
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
