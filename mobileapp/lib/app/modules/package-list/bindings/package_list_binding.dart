import 'package:get/get.dart';

import '../controllers/package_list_controller.dart';

class PackageListBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<PackageListController>(
      () => PackageListController(),
    );
  }
}
