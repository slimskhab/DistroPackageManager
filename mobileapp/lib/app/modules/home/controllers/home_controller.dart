import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:ustudy/app/AppConsts.dart';

class HomeController extends GetxController {
  Map<String, dynamic> stats = {};
  bool isLoading = false;
  void fetchStats() async {
    isLoading = true;
    update();
    print("started");
    try {
      Dio dio = Dio();
      var response = await dio.get('${AppConsts.backEndUrl}/package/stats');
      print(response);
      if (response.data['status'] == 'success') {
        Map<String, dynamic> responseData =
            response.data['stats'].cast<Map<String, dynamic>>();
        stats = responseData;
        print(stats);
        update();
      } else {
        print('Failed to fetch packages: ${response.data['message']}');
      }
    } catch (e) {
      // Handle error here
      print('Failed to fetch packages: $e');
    } finally {
      isLoading = false;
      update();
    }
  }

  @override
  void onInit() {
    super.onInit();
    fetchStats();
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
