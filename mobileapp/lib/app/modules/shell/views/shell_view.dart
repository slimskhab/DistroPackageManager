import 'package:flutter/material.dart';

import 'package:get/get.dart';

import '../controllers/shell_controller.dart';

class ShellView extends GetView<ShellController> {
  const ShellView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('ShellView'),
        centerTitle: true,
      ),
      body: const Center(
        child: Text(
          'ShellView is working',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
