import 'package:flutter/material.dart';

import 'package:get/get.dart';

import '../controllers/repository_list_controller.dart';

class RepositoryListView extends GetView<RepositoryListController> {
  const RepositoryListView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('RepositoryListView'),
        centerTitle: true,
      ),
      body: const Center(
        child: Text(
          'RepositoryListView is working',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
