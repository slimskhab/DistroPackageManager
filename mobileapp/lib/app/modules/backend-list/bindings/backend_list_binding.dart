import 'package:get/get.dart';

import '../controllers/backend_list_controller.dart';

class BackendListBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<BackendListController>(
      () => BackendListController(),
    );
  }
}
