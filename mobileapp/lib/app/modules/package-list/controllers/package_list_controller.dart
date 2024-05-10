import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:ustudy/app/AppConsts.dart';

class PackageListController extends GetxController {
  //TODO: Implement PackageListController
  final List<Map<String, dynamic>> packages = [];

  void fetchPackages() async {
    print("started");
    try {
      Dio dio = Dio();
      var response = await dio.get('${AppConsts.backEndUrl}/package');
      print(response);
      if (response.data['status'] == 'success') {
        List<Map<String, dynamic>> responseData = (response.data['packages'] as List<dynamic>).cast<Map<String, dynamic>>();
        packages.assignAll(responseData);
        print(packages);
        update();
      } else {
        print('Failed to fetch packages: ${response.data['message']}');
      }
    } catch (e) {
      // Handle error here
      print('Failed to fetch packages: $e');
    }
  }
  final count = 0.obs;
  @override
  void onInit() {
    super.onInit();
    fetchPackages();
    print("dzadazd");
  }

  @override
  void onReady() {
    super.onReady();
  }

  @override
  void onClose() {
    super.onClose();
  }

  void increment() => count.value++;
}
