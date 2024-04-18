import 'package:get/get.dart';

import '../controllers/repository_list_controller.dart';

class RepositoryListBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<RepositoryListController>(
      () => RepositoryListController(),
    );
  }
}
