import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';

import '../modules/backend-list/bindings/backend_list_binding.dart';
import '../modules/backend-list/views/backend_list_view.dart';
import '../modules/home/bindings/home_binding.dart';
import '../modules/home/views/home_view.dart';
import '../modules/package-list/bindings/package_list_binding.dart';
import '../modules/package-list/views/package_list_view.dart';
import '../modules/repository-list/bindings/repository_list_binding.dart';
import '../modules/repository-list/views/repository_list_view.dart';
import '../modules/shell/bindings/shell_binding.dart';
import '../modules/shell/views/shell_view.dart';
import '../modules/statistics/bindings/statistics_binding.dart';
import '../modules/statistics/views/statistics_view.dart';

part 'app_routes.dart';

class AppPages {
  AppPages._();

  static String INITIAL = Routes.HOME;

  static final routes = [
    GetPage(
      name: _Paths.HOME,
      page: () => const HomeView(),
      binding: HomeBinding(),
    ),
    GetPage(
      name: _Paths.BACKEND_LIST,
      page: () => const BackendListView(),
      binding: BackendListBinding(),
    ),
    GetPage(
      name: _Paths.REPOSITORY_LIST,
      page: () => const RepositoryListView(),
      binding: RepositoryListBinding(),
    ),
    GetPage(
      name: _Paths.PACKAGE_LIST,
      page: () => const PackageListView(),
      binding: PackageListBinding(),
    ),
    GetPage(
      name: _Paths.SHELL,
      page: () => const ShellView(),
      binding: ShellBinding(),
    ),
    GetPage(
      name: _Paths.STATISTICS,
      page: () => const StatisticsView(),
      binding: StatisticsBinding(),
    ),
  ];
}
